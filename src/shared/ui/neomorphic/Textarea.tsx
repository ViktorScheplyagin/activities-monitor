import { cn } from "@/shared/lib/utils";
import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "flex min-h-[80px] w-full rounded-xl bg-background shadow-inset-mini outline-none px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus:shadow-inset focus:px-4",
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";
