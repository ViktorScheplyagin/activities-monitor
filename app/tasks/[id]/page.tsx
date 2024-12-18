import { TaskPage as TaskPageComponent } from "@/pages-layer/task";

export default function TaskPage({ params }: { params: { id: string } }) {
  return <TaskPageComponent id={params.id} />;
}
