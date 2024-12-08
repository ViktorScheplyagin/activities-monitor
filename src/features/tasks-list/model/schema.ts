import * as z from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
