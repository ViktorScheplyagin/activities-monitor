import { useState } from "react";
import { useTagsStore } from "./store";

interface UseTagsComboboxProps {
    selectedTagIds: string[];
    onTagsChange: (tags: string[]) => void;
}

export const useCombobox = ({
    selectedTagIds,
    onTagsChange,
}: UseTagsComboboxProps) => {
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newTagName, setNewTagName] = useState("");

    const { tags, addTag } = useTagsStore();

    const handleSelect = (tagId: string) => {
        if (tagId === "new") {
            setIsCreatingNew(true);
            return;
        }

        const isSelected = selectedTagIds.includes(tagId);
        onTagsChange(
            isSelected
                ? selectedTagIds.filter((id) => id !== tagId)
                : [...selectedTagIds, tagId]
        );
    };

    const handleCreateNewTag = () => {
        const newTag = addTag(newTagName);
        if (newTag) {
            onTagsChange([...selectedTagIds, newTag.id]);
            setNewTagName("");
            setIsCreatingNew(false);
        }
    };

    const cancelNewTag = () => {
        setIsCreatingNew(false);
        setNewTagName("");
    };

    return {
        // State
        isCreatingNew,
        newTagName,
        tags,

        // Actions
        setNewTagName,
        handleSelect,
        handleCreateNewTag,
        cancelNewTag,
    };
};
