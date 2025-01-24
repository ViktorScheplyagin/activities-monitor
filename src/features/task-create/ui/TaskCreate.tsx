import { Button } from "@/shared/ui/neomorphic";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import { TaskCreateForm } from "./TaskCreateForm";

export const TaskCreate = () => {
    return (
        <Dialog>
            <div className="mb-4 flex justify-end">
                <DialogTrigger asChild>
                    <Button>New Task</Button>
                </DialogTrigger>
            </div>

            <DialogContent className="w-96">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl">
                        Create New Task
                    </DialogTitle>
                </DialogHeader>

                <TaskCreateForm />
            </DialogContent>
        </Dialog>
    );
};
