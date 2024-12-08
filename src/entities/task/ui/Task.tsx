import { Card } from "@/shared/ui";
import { useMemo } from "react";
import { TaskData } from "@/entities/task";
import { getStatusIcon } from "../lib/getStatusIcon";
import { formatSeconds } from "../lib/formatSeconds";

type Props = TaskData & { isFocused: boolean; onClick: (id: string) => void };

export const Task = ({
  onClick,
  title,
  status,
  description,
  time,
  id,
  isFocused,
}: Props) => {
  const timeText = useMemo(() => formatSeconds(time), [time]);
  const statusIcon = useMemo(() => getStatusIcon(status), [status]);
  const handleClick = () => onClick(id);

  return (
    <div className="m-2">
      <Card
        onClick={handleClick}
        className={`cursor-pointer dark:text-white box-border ${
          isFocused ? "border-2 border-yellow-500" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <span>Status:</span>
          {statusIcon}
        </div>
        <div className="text-xl font-bold">{title}</div>
        <div className="text-sm">{description}</div>
        <div className="text-sm">{timeText}</div>
      </Card>
    </div>
  );
};
