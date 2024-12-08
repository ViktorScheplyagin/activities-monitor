import { Button, Card } from "@/shared/ui";
import { useMemo, useState } from "react";
import { TaskData } from "@/entities/task";
import { formatSeconds } from "../lib/formatSeconds";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

type Props = TaskData & {
  isFocused: boolean;
  onClick: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const Task = ({
  onClick,
  onEdit,
  onDelete,
  title,
  description,
  time,
  id,
  isFocused,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeText = useMemo(() => formatSeconds(time), [time]);

  const handleEdit = () => {
    onEdit?.(id);
    setIsOpen(false);
  };
  const handleDelete = () => {
    onDelete?.(id);
    setIsOpen(false);
  };

  return (
    <div className="m-2">
      <Card
        onClick={() => onClick(id)}
        className={`cursor-pointer dark:text-white box-border relative ${
          isFocused ? "border-2 border-yellow-500" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xl font-bold">{title}</div>
            <div className="text-sm">{description}</div>
            <div className="text-sm">{timeText}</div>
          </div>

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                type="button"
                className="px-2 py-1 rounded"
                onClick={(e) => {
                  // Prevent the click event from bubbling up to the Card component
                  // Without this, clicking the menu button would also trigger the Card's onClick
                  e.stopPropagation();
                }}
              >
                <MoreHorizontal size={20} className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
    </div>
  );
};
