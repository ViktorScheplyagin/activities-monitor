import dynamic from "next/dynamic";
const TaskSearch = dynamic(() => import("./ui/TaskSearch"), {
  ssr: false,
});

export { TaskSearch };
export { useTaskSearchStore } from "./model/store";
