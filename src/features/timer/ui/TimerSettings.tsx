import {
    DialogContent,
    Dialog,
    DialogTrigger,
    DialogTitle,
    Button,
} from "@/shared/ui/neomorphic";
import { Settings } from "./Settings";
import { SettingsIcon } from "lucide-react";

export const TimerSettings = () => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
                <SettingsIcon />
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogTitle>Timer Settings</DialogTitle>
            <Settings />
        </DialogContent>
    </Dialog>
);
