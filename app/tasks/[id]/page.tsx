import { TaskPage as TaskPageComponent } from "@/pages/task";

export default function TaskPage({ params }: { params: { id: string } }) {
  return <TaskPageComponent id={params.id} />;
}
