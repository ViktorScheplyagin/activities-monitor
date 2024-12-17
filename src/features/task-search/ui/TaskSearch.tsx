import { Checkbox, Input, Label } from "@/shared/ui";
import { useTaskSearch } from "../model/use-task-search";

export const TaskSearch = () => {
  const { query, filters, setQuery, toggleFilter } = useTaskSearch();

  return (
    <div className="space-y-4">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks..."
      />
      <div className="flex gap-4">
        <Label className="flex items-center gap-2" htmlFor="name">
          <Checkbox
            id="name"
            checked={filters.includes("name")}
            onClick={() => toggleFilter("name")}
          />
          Search in names
        </Label>
        <Label className="flex items-center gap-2" htmlFor="description">
          <Checkbox
            id="description"
            checked={filters.includes("description")}
            onClick={() => toggleFilter("description")}
          />
          Search in descriptions
        </Label>
      </div>
    </div>
  );
};
