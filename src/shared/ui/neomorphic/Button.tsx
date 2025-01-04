import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-box active:shadow-inset",
                destructive:
                    "bg-destructive text-destructive-foreground active:shadow-inset-destructive",
                outline:
                    "border border-input bg-background shadow-box active:shadow-inset",
                ghost: "hover:bg-accent hover:text-accent-foreground active:shadow-inset",
            },
            size: {
                default: "h-11 px-6 py-3",
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
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:shadow-none"
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
