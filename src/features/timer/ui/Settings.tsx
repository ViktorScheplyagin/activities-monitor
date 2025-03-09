import { TIMER_OPTIONS } from "../constants/timerOptions";
import { useTimerStore } from "../model/store";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/neomorphic";
import { Label } from "@/shared/ui/label";

export const Settings = () => {
    const workDuration = useTimerStore((state) => state.workDuration);
    const breakDuration = useTimerStore((state) => state.breakDuration);
    const longBreakDuration = useTimerStore((state) => state.longBreakDuration);
    const setWorkDuration = useTimerStore((state) => state.setWorkDuration);
    const setBreakDuration = useTimerStore((state) => state.setBreakDuration);
    const setLongBreakDuration = useTimerStore(
        (state) => state.setLongBreakDuration
    );
    const setTimeLeft = useTimerStore((state) => state.setTimeLeft);

    const handleWorkDurationChange = (value: string) => {
        setWorkDuration(Number(value));
        setTimeLeft(Number(value));
    };

    const handleBreakDurationChange = (value: string) => {
        setBreakDuration(Number(value));
        setTimeLeft(Number(value));
    };

    const handleLongBreakDurationChange = (value: string) => {
        setLongBreakDuration(Number(value));
        setTimeLeft(Number(value));
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <Label htmlFor="work-duration">Work duration</Label>
                <RadioGroup
                    id="work-duration"
                    value={workDuration.toString()}
                    onValueChange={handleWorkDurationChange}
                    className="flex gap-4"
                    data-testid="work-duration"
                >
                    {TIMER_OPTIONS.work.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={option.value.toString()}
                                id={`work-${option.value}`}
                            />
                            <Label
                                htmlFor={`work-${option.value}`}
                                className="cursor-pointer"
                            >
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="break-duration">Break duration</Label>
                <RadioGroup
                    id="break-duration"
                    value={breakDuration.toString()}
                    onValueChange={handleBreakDurationChange}
                    className="flex gap-4"
                    data-testid="break-duration"
                >
                    {TIMER_OPTIONS.break.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={option.value.toString()}
                                id={`break-${option.value}`}
                            />
                            <Label
                                htmlFor={`break-${option.value}`}
                                className="cursor-pointer"
                            >
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="long-break-duration">Long break duration</Label>
                <RadioGroup
                    id="long-break-duration"
                    value={longBreakDuration.toString()}
                    onValueChange={handleLongBreakDurationChange}
                    className="flex gap-4"
                    data-testid="long-break-duration"
                >
                    {TIMER_OPTIONS.longBreak.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={option.value.toString()}
                                id={`long-break-${option.value}`}
                            />
                            <Label
                                htmlFor={`long-break-${option.value}`}
                                className="cursor-pointer"
                            >
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
};
