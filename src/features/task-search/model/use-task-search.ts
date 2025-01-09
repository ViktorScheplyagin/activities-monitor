import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTaskSearchStore } from "./store";

export const useTaskSearch = () => {
    const searchParams = useSearchParams();

    const query = useTaskSearchStore((state) => state.query);
    const filters = useTaskSearchStore((state) => state.filters);
    const setQuery = useTaskSearchStore((state) => state.setQuery);
    const toggleFilter = useTaskSearchStore((state) => state.toggleFilter);

    // Sync URL with store state
    useEffect(() => {
        const params = searchParams
            ? new URLSearchParams(searchParams)
            : new URLSearchParams();

        params.set("q", query);
        params.set("in", filters.join(","));
        window.history.replaceState(null, "", `?${params.toString()}`);
    }, [query, filters]);

    return {
        query,
        filters,
        setQuery,
        toggleFilter,
    };
};
