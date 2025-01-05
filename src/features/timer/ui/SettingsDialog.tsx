import { Dialog } from "@/shared/ui/dialog";
import { Settings } from "./Settings";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsDialog = ({ isOpen, onClose }: Props) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className="space-y-6">
                <Settings />
            </div>
        </Dialog>
    );
};
