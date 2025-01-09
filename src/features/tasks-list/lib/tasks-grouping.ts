import { TaskData } from "@/entities/task";

export const sortTasksByDate = (tasks: TaskData[]) => {
    return [...tasks].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

export const groupTasksByDate = (tasks: TaskData[]) => {
    return tasks.reduce(
        (groups, task) => {
            const date = new Date(task.createdAt).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(task);
            return groups;
        },
        {} as Record<string, TaskData[]>
    );
};
