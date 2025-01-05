import { Select } from "./Select";
import { TIMER_OPTIONS } from "../constants/timerOptions";
import { useTimerStore } from "../model/store";

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
        <div className="flex flex-col gap-4">
            <Select
                testId="work-duration"
                options={TIMER_OPTIONS.work}
                value={workDuration}
                onChange={handleWorkDurationChange}
                placeholder="Work duration"
                label="Work duration"
            />
            <Select
                testId="break-duration"
                options={TIMER_OPTIONS.break}
                value={breakDuration}
                onChange={handleBreakDurationChange}
                placeholder="Break duration"
                label="Break duration"
            />
            <Select
                testId="long-break-duration"
                options={TIMER_OPTIONS.longBreak}
                value={longBreakDuration}
                onChange={handleLongBreakDurationChange}
                placeholder="Long break duration"
                label="Long break duration"
            />
        </div>
    );
};
