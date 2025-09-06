import {
  FormField as FormFieldRoot,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui";
import { FieldValues, Control, Path } from "react-hook-form";

interface FormField<T extends FieldValues> {
  control: Control<T>;
  name: Path<T> & string;
  label?: string;
  InputComponent: React.ElementType;
  inputProps?: React.ComponentProps<React.ElementType>;
}

export const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  InputComponent,
  inputProps,
}: FormField<T>) => {
  return (
    <FormFieldRoot
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputComponent {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
