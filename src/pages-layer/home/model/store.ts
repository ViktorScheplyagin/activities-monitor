import { TaskData } from "@/entities/task";
import { create } from "zustand";

export type HomePageStore = {
  tasks: TaskData[];
  focusedTask: TaskData | null;
  setTasks: (tasks: TaskData[]) => void;
  setFocusedTask: (taskId: string | null) => void;
};

const mockTasks: TaskData[] = [
  {
    id: "2",
    title: "Write unit tests",
    status: "todo",
    description: "Create test coverage for core components",
    time: 0,
  },
  {
    id: "3",
    title: "Update documentation",
    status: "completed",
    description: "Update README with new API endpoints",
    time: 300, // 5 minutes
  },
  {
    id: "4",
    title: "Update tests",
    status: "paused",
    description: "Update README with new API endpoints",
    time: 300, // 5 minutes
  },
];

export const useHomePageStore = create<HomePageStore>((set, get) => ({
  tasks: mockTasks,
  focusedTask: null,
  setTasks: (tasks) => set({ tasks }),
  setFocusedTask: (id) =>
    set({ focusedTask: get().tasks.find((task) => task.id === id) }),
}));
