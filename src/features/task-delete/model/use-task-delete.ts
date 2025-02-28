import { useEffect } from "react";
import { useTaskDeleteStore } from "./store";

interface Options {
    onDelete?: () => void;
}

export const useTaskDelete = (options?: Options) => {
    const { isOpen, setIsOpen, setTargetTaskId, lastDeletedTaskId } =
        useTaskDeleteStore();

    const openDialogFor = (taskId: string) => {
        setIsOpen(true);
        setTargetTaskId(taskId);
    };

    useEffect(() => {
        if (lastDeletedTaskId) {
            options?.onDelete?.();
        }
    }, [lastDeletedTaskId]);

    return { isOpen, openDialogFor };
};
