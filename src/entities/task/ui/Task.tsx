import { Card } from "@/shared/ui";
import { useMemo, useState } from "react";
import { TaskData } from "@/entities/task";
import { getStatusIcon } from "../lib/getStatusIcon";
import { formatSeconds } from "../lib/formatSeconds";

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
  status,
  description,
  time,
  id,
  isFocused,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeText = useMemo(() => formatSeconds(time), [time]);
  const statusIcon = useMemo(() => getStatusIcon(status), [status]);

  const handleClick = () => onClick(id);
  const handleEdit = () => {
    onEdit?.(id);
    setIsMenuOpen(false);
  };
  const handleDelete = () => {
    onDelete?.(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="m-2">
      <Card
        onClick={handleClick}
        className={`cursor-pointer dark:text-white box-border relative ${
          isFocused ? "border-2 border-yellow-500" : ""
        }`}
      >
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              {statusIcon}
            </div>
            <div className="text-xl font-bold">{title}</div>
            <div className="text-sm">{description}</div>
            <div className="text-sm">{timeText}</div>
          </div>

          <div className="flex items-center px-2 relative">
            <button
              className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              •••
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
