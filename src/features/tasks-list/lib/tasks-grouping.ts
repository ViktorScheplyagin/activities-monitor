import { TaskData } from "@/entities/task";

export const sortTasksByDate = (tasks: TaskData[]) => {
    return [...tasks].sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
};

export const groupTasksByDate = (tasks: TaskData[]) => {
    return tasks.reduce(
        (groups, task) => {
            const date = new Date(
                task.updatedAt || task.createdAt
            ).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(task);
            return groups;
        },
        {} as Record<string, TaskData[]>
    );
};
