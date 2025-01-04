export type SearchFilter = "name" | "description";

export interface SearchParams {
    query?: string;
    filters?: SearchFilter[];
}
