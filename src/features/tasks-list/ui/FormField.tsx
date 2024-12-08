import { Input, Textarea } from "@/shared/ui";
import {
  FormControl,
  FormField as RootFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { TaskFormValues } from "../model/schema";
import { Control } from "react-hook-form";

interface Props {
  control: Control<TaskFormValues>;
  name: keyof TaskFormValues;
  label: string;
  type?: "input" | "textarea";
  rows?: number;
}

export const FormField = ({
  control,
  name,
  label,
  type = "input",
  rows = 3,
}: Props) => {
  return (
    <RootFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "input" ? (
              <Input {...field} />
            ) : (
              <Textarea {...field} rows={rows} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
