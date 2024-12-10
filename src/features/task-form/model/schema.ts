import { TaskStatus } from "@prisma/client";
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z.nativeEnum(TaskStatus).optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
