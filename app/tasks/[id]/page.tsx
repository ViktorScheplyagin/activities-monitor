import { TaskPage } from "@/pages/task";

export default function Page({ params }: { params: { id: string } }) {
  return <TaskPage id={params.id} />;
}
