import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/neomorphic";
import { useSettings } from "../model/useSettings";

export const Settings = () => {
    const {
        // Values
        workMinutes,
        workSeconds,
        breakMinutes,
        breakSeconds,
        longBreakMinutes,
        longBreakSeconds,

        // Methods
        setWorkMinutes,
        setWorkSeconds,
        setBreakMinutes,
        setBreakSeconds,
        setLongBreakMinutes,
        setLongBreakSeconds,
    } = useSettings();

    const commonInputProps = {
        type: "number",
        className: "text-center",
        placeholder: "00",
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <Label htmlFor="work-minutes">Work duration</Label>
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            min="1"
                            max="99"
                            id="work-minutes"
                            value={workMinutes}
                            onChange={(e) => setWorkMinutes(e.target.value)}
                        />
                    </div>
                    <span className="text-xl">:</span>
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            min="0"
                            max="59"
                            id="work-seconds"
                            value={workSeconds}
                            onChange={(e) => setWorkSeconds(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="break-minutes">Break duration</Label>
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            min="1"
                            max="99"
                            id="break-minutes"
                            value={breakMinutes}
                            onChange={(e) => setBreakMinutes(e.target.value)}
                        />
                    </div>
                    <span className="text-xl">:</span>
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            min="0"
                            max="59"
                            id="break-seconds"
                            value={breakSeconds}
                            onChange={(e) => setBreakSeconds(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="long-break-minutes">Long break duration</Label>
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            min="1"
                            max="99"
                            id="long-break-minutes"
                            value={longBreakMinutes}
                            onChange={(e) =>
                                setLongBreakMinutes(e.target.value)
                            }
                        />
                    </div>
                    <span className="text-xl">:</span>
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            min="0"
                            max="59"
                            id="long-break-seconds"
                            value={longBreakSeconds}
                            onChange={(e) =>
                                setLongBreakSeconds(e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
