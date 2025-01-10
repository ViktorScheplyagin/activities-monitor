import { TaskStatus } from "@/entities/task/api/dto/task";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

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
    const isDone = status === "done";
    const nextStatus = isDone ? "in-progress" : "done";
    const nextStatusText = isDone ? "Back in progress" : "Mark as done";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={disabled}>
                <EllipsisVertical />
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
                        onClick={onDeleteClick}
                    >
                        Delete task
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
