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

        // Apply methods
        applyWorkTime,
        applyBreakTime,
        applyLongBreakTime,
    } = useSettings();

    const commonInputProps = {
        type: "number",
        min: "0",
        max: "99",
        className: "text-center",
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <Label htmlFor="work-minutes">Work duration</Label>
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            id="work-minutes"
                            value={workMinutes}
                            onChange={(e) => setWorkMinutes(e.target.value)}
                            onBlur={applyWorkTime}
                            data-testid="work-minutes"
                            placeholder="Min"
                        />
                    </div>
                    <span className="text-xl">:</span>
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            id="work-seconds"
                            value={workSeconds}
                            onChange={(e) => setWorkSeconds(e.target.value)}
                            onBlur={applyWorkTime}
                            data-testid="work-seconds"
                            placeholder="Sec"
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
                            id="break-minutes"
                            value={breakMinutes}
                            onChange={(e) => setBreakMinutes(e.target.value)}
                            onBlur={applyBreakTime}
                            data-testid="break-minutes"
                            placeholder="Min"
                        />
                    </div>
                    <span className="text-xl">:</span>
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            id="break-seconds"
                            value={breakSeconds}
                            onChange={(e) => setBreakSeconds(e.target.value)}
                            onBlur={applyBreakTime}
                            data-testid="break-seconds"
                            placeholder="Sec"
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
                            id="long-break-minutes"
                            value={longBreakMinutes}
                            onChange={(e) =>
                                setLongBreakMinutes(e.target.value)
                            }
                            onBlur={applyLongBreakTime}
                            data-testid="long-break-minutes"
                            placeholder="Min"
                        />
                    </div>
                    <span className="text-xl">:</span>
                    <div className="flex-1">
                        <Input
                            {...commonInputProps}
                            id="long-break-seconds"
                            value={longBreakSeconds}
                            onChange={(e) =>
                                setLongBreakSeconds(e.target.value)
                            }
                            onBlur={applyLongBreakTime}
                            data-testid="long-break-seconds"
                            placeholder="Sec"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
