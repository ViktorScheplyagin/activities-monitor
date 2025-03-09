import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "outline-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-translate duration-300 hover:shadow-lifted active:transform-none disabled:hover:shadow-box disabled:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-box active:shadow-inset",
                destructive: cn(
                    "bg-primary text-red-500 dark:text-red-600 shadow-box active:shadow-inset",
                    "active:[text-shadow:0_0_10px_rgba(220,30,30,0.5),0_0_15px_rgba(220,30,30,0.3),0_0_25px_rgba(220,30,30,0.2)]",
                    "dark:active:[text-shadow:0_0_5px_rgba(220,38,38,0.8),0_0_10px_rgba(220,38,38,0.5),0_0_20px_rgba(220,38,38,0.3)]"
                ),
                outline:
                    "bg-background border border-input active:shadow-inset active:border-primary",
                ghost: cn(
                    "active:shadow-inset",
                    "shadow-[inset_0px_0_2px_#8e8e8e]",
                    "hover:text-accent-foreground hover:shadow-box hover:border-none",
                    "dark:shadow-[inset_0px_0_2px_#333] dark:hover:shadow-box"
                ),
            },
            size: {
                default: "h-9 px-4 py-3",
                sm: "h-9 px-4 py-2",
                lg: "h-12 px-8 py-4",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            isLoading = false,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className }),
                    "disabled:opacity-50 disabled:cursor-default disabled:active:shadow-box"
                )}
                ref={ref}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2
                        data-testid="button-loader"
                        className="animate-spin"
                    />
                ) : (
                    children
                )}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
