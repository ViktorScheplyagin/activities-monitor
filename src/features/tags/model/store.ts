import { Tag } from "@/entities/tag";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TagsState {
    tags: Tag[];
    addTag: (name: string) => Tag | null;
    removeTag: (id: string) => void;
    selectedTags: string[];
    toggleTag: (tagId: string) => void;
}

export const useTagsStore = create<TagsState>()(
    persist(
        (set) => ({
            tags: [],
            selectedTags: [],

            addTag: (name) => {
                const trimmedName = name.trim();
                if (!trimmedName) return null;

                let newTag: Tag | null = null;

                set((state) => {
                    // Check for duplicates
                    if (state.tags.some((tag) => tag.name === trimmedName)) {
                        return state;
                    }

                    newTag = {
                        id: crypto.randomUUID(),
                        name: trimmedName,
                    };

                    return {
                        tags: [...state.tags, newTag],
                    };
                });

                return newTag;
            },

            removeTag: (id) =>
                set((state) => ({
                    tags: state.tags.filter((tag) => tag.id !== id),
                    selectedTags: state.selectedTags.filter(
                        (tagId) => tagId !== id
                    ),
                })),

            toggleTag: (tagId) =>
                set((state) => ({
                    selectedTags: state.selectedTags.includes(tagId)
                        ? state.selectedTags.filter((id) => id !== tagId)
                        : [...state.selectedTags, tagId],
                })),
        }),
        {
            name: "tags-storage",
        }
    )
);
