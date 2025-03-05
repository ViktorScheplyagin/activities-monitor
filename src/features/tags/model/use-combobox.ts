import { useState } from "react";
import { useTagsStore } from "./store";

interface UseTagsComboboxProps {
    selectedTagIds: string[];
    onTagsChange: (tags: string[]) => void;
}

type EditMode = "create" | "rename";

export const useCombobox = ({
    selectedTagIds,
    onTagsChange,
}: UseTagsComboboxProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editMode, setEditMode] = useState<EditMode>("create");
    const [tagName, setTagName] = useState("");
    const [editingTagId, setEditingTagId] = useState<string | null>(null);

    const { tags, addTag, renameTag } = useTagsStore();

    const handleSelect = (tagId: string) => {
        if (tagId === "new") {
            startCreatingTag();
            return;
        }

        const isSelected = selectedTagIds.includes(tagId);
        onTagsChange(
            isSelected
                ? selectedTagIds.filter((id) => id !== tagId)
                : [...selectedTagIds, tagId]
        );
    };

    const startCreatingTag = () => {
        setIsEditing(true);
        setEditMode("create");
        setTagName("");
        setEditingTagId(null);
    };

    const startRenamingTag = (tagId: string, currentName: string) => {
        setIsEditing(true);
        setEditMode("rename");
        setTagName(currentName);
        setEditingTagId(tagId);
    };

    const handleSaveTag = () => {
        if (editMode === "create") {
            const newTag = addTag(tagName);
            if (newTag) {
                onTagsChange([...selectedTagIds, newTag.id]);
            }
        } else if (editMode === "rename" && editingTagId) {
            renameTag(editingTagId, tagName);
        }

        cancelEditing();
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setTagName("");
        setEditingTagId(null);
    };

    return {
        // State
        isEditing,
        editMode,
        tagName,
        editingTagId,
        tags,

        // Actions
        setTagName,
        handleSelect,
        startCreatingTag,
        startRenamingTag,
        handleSaveTag,
        cancelEditing,
    };
};
