import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    buttonVariants,
} from "@/shared/ui/neomorphic";
import { useTaskDeleteStore } from "../model/store";

export const TaskDelete = () => {
    const isOpen = useTaskDeleteStore((state) => state.isOpen);
    const setIsOpen = useTaskDeleteStore((state) => state.setIsOpen);
    const setTargetTaskId = useTaskDeleteStore(
        (state) => state.setTargetTaskId
    );
    const deleteTask = useTaskDeleteStore((state) => state.deleteTask);

    const handleClose = () => {
        setIsOpen(false);
        setTargetTaskId(null);
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. Are you sure?
                </AlertDialogDescription>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deleteTask}
                        className={buttonVariants({ variant: "destructive" })}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
