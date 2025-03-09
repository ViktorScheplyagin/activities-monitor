"use client";
import { TaskStatus } from "@/entities/task/api/dto/task";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui";
import { Button } from "@/shared/ui/neomorphic";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
interface Props {
    onDeleteClick: () => void;
    onStatusChange: (status: TaskStatus) => void;
    status: TaskStatus;
    disabled?: boolean;
}

export const TaskMenu = ({
    onDeleteClick,
    onStatusChange,
    status,
    disabled,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const isDone = status === "done";
    const nextStatus = isDone ? "in-progress" : "done";
    const nextStatusText = isDone ? "Back in progress" : "Mark as done";

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                asChild
                disabled={disabled}
                className="outline-none"
            >
                <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <span onClick={() => onStatusChange(nextStatus)}>
                        {nextStatusText}
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span
                        className="text-red-500 dark:text-red-600"
                        onClick={() => {
                            onDeleteClick();
                            setIsOpen(false);
                        }}
                    >
                        Delete task
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
