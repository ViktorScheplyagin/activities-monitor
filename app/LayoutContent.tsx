"use client";

import { Header } from "@/widgets/Header";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        document.body.style.pointerEvents = "auto";
    }, [pathname]);

    return (
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
        >
            <Header />
            <div className="container mx-auto py-8">{children}</div>
        </body>
    );
}
