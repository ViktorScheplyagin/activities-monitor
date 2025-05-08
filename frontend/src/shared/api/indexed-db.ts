import { TaskData } from "@/entities/task";

const DB_NAME = "pomodoro_db";
const DB_VERSION = 1;
const TASKS_STORE = "tasks";

type CreateTaskData = Pick<TaskData, "title" | "description" | "tags">;
type QueryFilters = "name" | "description";

class IndexedDBService {
    private db: IDBDatabase | null = null;

    async init(): Promise<void> {
        if (this.db) return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(TASKS_STORE)) {
                    const store = db.createObjectStore(TASKS_STORE, {
                        keyPath: "id",
                    });
                    store.createIndex("title", "title", { unique: false });
                    store.createIndex("status", "status", { unique: false });
                }
            };
        });
    }

    private async getStore(
        mode: IDBTransactionMode = "readonly"
    ): Promise<IDBObjectStore> {
        if (!this.db) await this.init();
        const transaction = this.db!.transaction(TASKS_STORE, mode);
        return transaction.objectStore(TASKS_STORE);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllTasks(
        query?: string,
        filters?: QueryFilters[]
    ): Promise<TaskData[]> {
        const store = await this.getStore();
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                let tasks = request.result as TaskData[];

                if (query) {
                    tasks = this._filterTasks(tasks, query, filters);
                }

                resolve(tasks);
            };
        });
    }

    private _filterTasks(
        tasks: TaskData[],
        query: string,
        filters?: QueryFilters[]
    ): TaskData[] {
        const searchQuery = query.toLowerCase();

        tasks = tasks.filter((task) => {
            let isNameMatch = false;
            let isDescriptionMatch = false;

            if (filters?.includes("name")) {
                isNameMatch = task.title.toLowerCase().includes(searchQuery);
            }
            if (filters?.includes("description")) {
                isDescriptionMatch = task.description
                    .toLowerCase()
                    .includes(searchQuery);
            }
            return isNameMatch || isDescriptionMatch;
        });

        return tasks;
    }

    async getTaskById(id: string): Promise<TaskData | null> {
        const store = await this.getStore();
        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result || null);
        });
    }

    async createTask(task: CreateTaskData): Promise<TaskData> {
        const store = await this.getStore("readwrite");
        const newTask: TaskData = {
            ...task,
            id: crypto.randomUUID(),
            status: "in-progress",
            time: 0,
            createdAt: new Date(),
        };

        return new Promise((resolve, reject) => {
            const request = store.add(newTask);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(newTask);
        });
    }

    async updateTask(
        id: string,
        updates: Partial<TaskData>
    ): Promise<TaskData> {
        const store = await this.getStore("readwrite");

        return new Promise((resolve, reject) => {
            const getRequest = store.get(id);

            getRequest.onerror = () => reject(getRequest.error);
            getRequest.onsuccess = () => {
                const task = getRequest.result;
                if (!task) {
                    reject(new Error("Task not found"));
                    return;
                }

                const updatedTask: TaskData = {
                    ...task,
                    ...updates,
                    updatedAt: new Date(),
                };

                const putRequest = store.put(updatedTask);
                putRequest.onerror = () => reject(putRequest.error);
                putRequest.onsuccess = () => resolve(updatedTask);
            };
        });
    }

    async deleteTask(id: string): Promise<{ status: number }> {
        const store = await this.getStore("readwrite");
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onerror = () =>
                reject({ status: 500, error: request.error });
            request.onsuccess = () => resolve({ status: 200 });
        });
    }
}

export const db = new IndexedDBService();
