import { Button } from "@/shared/ui";

interface DefaultActionsProps {
  onCancel: (() => void) | undefined;
  cancelText?: string;
  submitText?: string;
  isSubmitting: boolean;
}

export const DefaultActions = ({
  onCancel,
  cancelText,
  submitText,
  isSubmitting,
}: DefaultActionsProps) => (
  <div className="flex justify-end gap-4">
    {onCancel && (
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelText || "Cancel"}
      </Button>
    )}
    <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
      {submitText || "Save Changes"}
    </Button>
  </div>
);
