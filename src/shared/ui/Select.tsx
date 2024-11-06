export const Select = ({
  options,
  onChange,
}: {
  options: { value: number; label: string }[];
  onChange: (value: number) => void;
}) => {
  return (
    <select
      className="p-2 rounded bg-gray-200 dark:bg-gray-600 dark:text-white"
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
