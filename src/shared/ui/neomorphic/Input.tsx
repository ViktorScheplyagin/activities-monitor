import { cn } from "@/shared/lib/utils";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                className={cn(
                    "flex h-10 w-full border-input shadow-inset-mini outline-none rounded-xl bg-background px-3 py-2 text-base dark:border-zinc-700",
                    "focus:shadow-inset focus:px-4",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
                    "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
