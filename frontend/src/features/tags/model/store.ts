import { Tag } from "@/entities/tag";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TagsState {
    tags: Tag[];
    addTag: (name: string) => Tag | null;
    removeTag: (id: string) => void;
    renameTag: (renamingTagId: string, newName: string) => Tag | null;
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

            renameTag: (renamingTagId, newName) => {
                const newNameTrimmed = newName.trim();
                if (!newNameTrimmed) return null;

                let updatedTag: Tag | null = null;

                set((state) => {
                    const isNewNameExist = state.tags.some(
                        (tag) => tag.name === newNameTrimmed
                    );

                    // if the new name is already taken, change nothing
                    if (isNewNameExist) return state;

                    const updatedTags = state.tags.map((tag) => {
                        if (tag.id === renamingTagId) {
                            updatedTag = {
                                ...tag,
                                name: newNameTrimmed,
                            };
                            return updatedTag;
                        }
                        return tag;
                    });

                    return { tags: updatedTags };
                });

                return updatedTag;
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
