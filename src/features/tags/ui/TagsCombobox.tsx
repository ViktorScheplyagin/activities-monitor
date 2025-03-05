import * as React from "react";
import { Check, Plus, Pencil } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/shared/ui";
import { cn } from "@/lib/utils";
import { useCombobox } from "../model/use-combobox";
import { CommandList } from "cmdk";
import { TagEdit } from "./TagEdit";

// TODO: move this to a separate feature
interface TagsComboboxProps {
    selectedTagIds: string[];
    onTagsChange: (tags: string[]) => void;
}

export function TagsCombobox({
    selectedTagIds,
    onTagsChange,
}: TagsComboboxProps) {
    const {
        isEditing,
        editMode,
        tagName,
        tags,
        setTagName,
        handleSelect,
        startRenamingTag,
        handleSaveTag,
        cancelEditing,
    } = useCombobox({ selectedTagIds, onTagsChange });

    // TODO: split the combobox into a separate components
    return (
        <Command className="rounded-lg border">
            <CommandInput placeholder="Search tags..." />
            <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                    {isEditing ? (
                        <TagEdit
                            tagName={tagName}
                            setTagName={setTagName}
                            handleSaveTag={handleSaveTag}
                            cancelEditing={cancelEditing}
                            editMode={editMode}
                        />
                    ) : (
                        <>
                            <CommandItem
                                value="new"
                                onSelect={() => handleSelect("new")}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create new tag
                            </CommandItem>
                            {tags.map((tag) => (
                                <CommandItem
                                    key={tag.id}
                                    value={tag.name}
                                    onSelect={() => handleSelect(tag.id)}
                                    className="group flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedTagIds.includes(tag.id)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {tag.name}
                                    </div>
                                    <div
                                        className="h-4 w-4 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            startRenamingTag(tag.id, tag.name);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </div>
                                </CommandItem>
                            ))}
                        </>
                    )}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
