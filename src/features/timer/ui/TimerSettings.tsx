import { DialogContent, Dialog, DialogTrigger } from "@/shared/ui/dialog";
import { Settings } from "./Settings";
import { Button } from "@/shared/ui/neomorphic";
import { SettingsIcon } from "lucide-react";

export const TimerSettings = () => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
                <SettingsIcon />
            </Button>
        </DialogTrigger>

        <DialogContent>
            <Settings />
        </DialogContent>
    </Dialog>
);
