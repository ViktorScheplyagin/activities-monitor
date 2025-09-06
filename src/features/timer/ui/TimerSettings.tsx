import {
    DialogContent,
    Dialog,
    DialogTrigger,
    DialogTitle,
    Button,
} from "@/shared/ui/neomorphic";
import { Settings } from "./Settings";
import { SettingsIcon } from "lucide-react";
import { useTimerStore } from "../model/store";

export const TimerSettings = () => {
    const applyBreakTime = useTimerStore((state) => state.applyBreakTime);
    const applyWorkTime = useTimerStore((state) => state.applyWorkTime);
    const applyLongBreakTime = useTimerStore(
        (state) => state.applyLongBreakTime
    );

    const applySettings = () => {
        applyBreakTime();
        applyWorkTime();
        applyLongBreakTime();
    };

    return (
        <Dialog onOpenChange={applySettings}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <SettingsIcon />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>Timer Settings</DialogTitle>
                <div className="flex justify-center">
                    <div className="w-40">
                        <Settings />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
