import { useEffect } from "react";
import { useTaskDeleteStore } from "./store";

interface Options {
    onTaskDelete?: () => void;
}

export const useTaskDelete = (options?: Options) => {
    const {
        isOpen,
        isTaskDeleted: lastDeletedTaskId,
        setIsOpen,
        setTargetTaskId,
        setIsTaskDeleted: setLastDeletedTaskId,
    } = useTaskDeleteStore();

    const openDialogFor = (taskId: string) => {
        setIsOpen(true);
        setTargetTaskId(taskId);
    };

    useEffect(() => {
        if (lastDeletedTaskId) {
            options?.onTaskDelete?.();
            setLastDeletedTaskId(false);
        }
    }, [lastDeletedTaskId]);

    return { isOpen, openDialogFor };
};
