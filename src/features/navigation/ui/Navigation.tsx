import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

export const Navigation = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <div className="flex items-center gap-4">
            <Link
                href="/"
                className={cn(
                    "px-4 py-2 rounded-lg transition-all duration-300",
                    isHome
                        ? "shadow-inset pointer-events-none"
                        : "shadow-box hover:shadow-inset"
                )}
            >
                Home
            </Link>
        </div>
    );
};
