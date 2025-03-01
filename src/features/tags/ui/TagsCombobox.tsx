import * as React from "react";
import { Check, Plus } from "lucide-react";
import { Button, Input } from "@/shared/ui/neomorphic";
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
        isCreatingNew,
        newTagName,
        tags,
        setNewTagName,
        handleSelect,
        handleCreateNewTag,
        cancelNewTag,
    } = useCombobox({ selectedTagIds, onTagsChange });

    // TODO: split the combobox into a separate components
    return (
        <Command className="rounded-lg border">
            <CommandInput placeholder="Search tags..." />
            <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                    {isCreatingNew ? (
                        // TODO: move the tag creation to a separate component, remove related logic from the useCombobox hook
                        <div className="flex flex-col gap-2">
                            <Input
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                placeholder="New tag name..."
                                className="block"
                            />
                            <div className="flex justify-end gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelNewTag}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleCreateNewTag}
                                    disabled={!newTagName.trim()}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
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
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedTagIds.includes(tag.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {tag.name}
                                </CommandItem>
                            ))}
                        </>
                    )}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
