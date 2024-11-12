import { Card } from "@/shared/ui/Card";
import { useMemo } from "react";

interface Props {
  title: string;
  status: "active" | "completed" | "todo";
  description?: string;
  time?: number;
}

function getStatusBorderColor(status: Props["status"]) {
  if (status === "active") return "border-blue-500";
  if (status === "completed") return "border-green-500";
  if (status === "todo") return "border-gray-500";
}

function formatSeconds(time: Props["time"]) {
  if (time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  return "N/A";
}

export const Task = ({ title, status, description, time }: Props) => {
  const timeText = useMemo(() => formatSeconds(time), [time]);
  const statusBorderColor = useMemo(
    () => getStatusBorderColor(status),
    [status]
  );

  return (
    <div className="p-4">
      <Card className={`p-4 dark:text-white border-2 ${statusBorderColor}`}>
        <div className="text-xl font-bold">{title}</div>
        <div className="text-sm">{description}</div>
        <div className="text-sm">{timeText}</div>
      </Card>
    </div>
  );
};
