import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
