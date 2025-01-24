import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Label, FormField } from "@/shared/ui";
import { TagsCombobox } from "@/features/tags";
import { Input, Textarea, Button } from "@/shared/ui/neomorphic";
import { taskFormSchema, type TaskFormValues } from "../model/schema";
import { useTaskCreateStore } from "../model/store";

export const TaskCreateForm = () => {
    const createTask = useTaskCreateStore((state) => state.createTask);

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: "",
            description: "",
            tags: [],
        },
    });

    const handleSubmit = async (values: TaskFormValues) => {
        await createTask(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 p-6"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                {...field}
                                placeholder="Task title"
                            />
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...field}
                                placeholder="Task description"
                                className="resize-none"
                            />
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <div className="space-y-2">
                            <TagsCombobox
                                selectedTagIds={field.value}
                                onTagsChange={field.onChange}
                            />
                        </div>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        Create Task
                    </Button>
                </div>
            </form>
        </Form>
    );
};
