"use client";

import { Button } from "@/shared/ui/neomorphic";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import { TaskCreateForm } from "./TaskCreateForm";
import { useTaskCreateStore } from "../model/store";
import { useEffect } from "react";

interface TaskCreateProps {
    onTaskCreated: () => void;
}

export const TaskCreate = ({ onTaskCreated }: TaskCreateProps) => {
    const isEditorOpen = useTaskCreateStore((state) => state.isEditorOpen);
    const isTaskCreated = useTaskCreateStore((state) => state.isTaskCreated);
    const closeEditor = useTaskCreateStore((state) => state.closeEditor);
    const openEditor = useTaskCreateStore((state) => state.openEditor);

    useEffect(() => {
        if (isTaskCreated) {
            onTaskCreated();
            closeEditor();
        }
    }, [isTaskCreated, onTaskCreated]);

    return (
        <Dialog open={isEditorOpen} onOpenChange={closeEditor}>
            <div className="mb-4 flex justify-end">
                <Button onClick={openEditor}>New Task</Button>
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
