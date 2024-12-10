import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  onChange: (value: SelectOption["value"]) => void;
  value: SelectOption["value"];
  placeholder?: string;
  testId: string;
}

export const Select = ({
  options,
  className,
  onChange,
  value,
  placeholder,
  testId,
}: SelectProps) => {
  return (
    <SelectRoot onValueChange={onChange} value={value.toString()}>
      <SelectTrigger className={className} data-testid={testId}>
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
  );
};
