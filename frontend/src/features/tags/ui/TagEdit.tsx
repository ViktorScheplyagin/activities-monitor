import * as React from "react";
import { Button, Input } from "@/shared/ui/neomorphic";

interface TagEditProps {
    tagName: string;
    setTagName: (name: string) => void;
    handleSaveTag: () => void;
    cancelEditing: () => void;
    editMode: "create" | "rename";
}

export function TagEdit({
    tagName,
    setTagName,
    handleSaveTag,
    cancelEditing,
    editMode,
}: TagEditProps) {
    return (
        <div className="flex flex-col gap-2">
            <Input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder={
                    editMode === "create" ? "New tag name..." : "Rename tag..."
                }
                className="block"
                autoFocus
            />
            <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" onClick={cancelEditing}>
                    Cancel
                </Button>
                <Button
                    size="sm"
                    onClick={handleSaveTag}
                    disabled={!tagName.trim()}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
