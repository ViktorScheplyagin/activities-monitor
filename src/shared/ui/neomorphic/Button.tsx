import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "text-primary-foreground px-4 py-2 text-sm font-medium rounded-lg",
        "bg-background border border-background",
        "cursor-pointer transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:shadow-none",
        "shadow-box",
        "active:shadow-inset",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
};
