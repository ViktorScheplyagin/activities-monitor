import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

export const Navigation = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isCompleted = pathname === "/completed";

    return (
        <div className="flex items-center gap-4">
            <Link
                href="/"
                className={cn(
                    "px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-lifted active:transform-none",
                    isHome ? "shadow-inset pointer-events-none" : "shadow-box"
                )}
            >
                Home
            </Link>
            <Link
                href="/completed"
                className={cn(
                    "px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-lifted active:transform-none",
                    isCompleted
                        ? "shadow-inset pointer-events-none"
                        : "shadow-box"
                )}
            >
                Completed
            </Link>
        </div>
    );
};
