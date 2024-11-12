export const Select = ({
  options,
  ...props
}: {
  options: { value: number; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      className="p-2 rounded bg-gray-200 dark:bg-gray-600 dark:text-white"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
