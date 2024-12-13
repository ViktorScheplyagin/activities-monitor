import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  onChange: (value: string) => void;
  value: SelectOption["value"];
  placeholder?: string;
  testId: string;
  label?: string;
  triggerClassName?: string;
}

export const Select = ({
  options,
  className,
  triggerClassName,
  onChange,
  value,
  placeholder,
  testId,
  label,
}: SelectProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <SelectRoot onValueChange={onChange} value={value.toString()}>
        <SelectTrigger data-testid={testId} className={triggerClassName}>
          <SelectValue placeholder={placeholder || "Select option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
};
