import { useTimerStore } from "./store";

export const useSettings = () => {
    // Get values and setters from the store
    const workMinutes = useTimerStore((state) => state.workMinutes);
    const workSeconds = useTimerStore((state) => state.workSeconds);
    const breakMinutes = useTimerStore((state) => state.breakMinutes);
    const breakSeconds = useTimerStore((state) => state.breakSeconds);
    const longBreakMinutes = useTimerStore((state) => state.longBreakMinutes);
    const longBreakSeconds = useTimerStore((state) => state.longBreakSeconds);

    const setWorkMinutes = useTimerStore((state) => state.setWorkMinutes);
    const setWorkSeconds = useTimerStore((state) => state.setWorkSeconds);
    const setBreakMinutes = useTimerStore((state) => state.setBreakMinutes);
    const setBreakSeconds = useTimerStore((state) => state.setBreakSeconds);
    const setLongBreakMinutes = useTimerStore(
        (state) => state.setLongBreakMinutes
    );
    const setLongBreakSeconds = useTimerStore(
        (state) => state.setLongBreakSeconds
    );

    const applyWorkTime = useTimerStore((state) => state.applyWorkTime);
    const applyBreakTime = useTimerStore((state) => state.applyBreakTime);
    const applyLongBreakTime = useTimerStore(
        (state) => state.applyLongBreakTime
    );

    // Input validation helpers
    const validateMinutesInput = (
        value: string,
        setter: (value: string) => void
    ) => {
        const numValue = parseInt(value);
        if (value === "" || (numValue >= 0 && numValue <= 99)) {
            setter(value);
        }
    };

    const validateSecondsInput = (
        value: string,
        setter: (value: string) => void
    ) => {
        const numValue = parseInt(value);
        if (value === "" || (numValue >= 0 && numValue <= 59)) {
            setter(value);
        }
    };

    return {
        // Values
        workMinutes,
        workSeconds,
        breakMinutes,
        breakSeconds,
        longBreakMinutes,
        longBreakSeconds,

        // Methods
        setWorkMinutes: (value: string) =>
            validateMinutesInput(value, setWorkMinutes),
        setWorkSeconds: (value: string) =>
            validateSecondsInput(value, setWorkSeconds),
        setBreakMinutes: (value: string) =>
            validateMinutesInput(value, setBreakMinutes),
        setBreakSeconds: (value: string) =>
            validateSecondsInput(value, setBreakSeconds),
        setLongBreakMinutes: (value: string) =>
            validateMinutesInput(value, setLongBreakMinutes),
        setLongBreakSeconds: (value: string) =>
            validateSecondsInput(value, setLongBreakSeconds),

        // Apply methods
        applyWorkTime,
        applyBreakTime,
        applyLongBreakTime,
    };
};
