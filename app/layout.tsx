import type { Metadata } from "next";
import "./globals.css";
import { LayoutContent } from "./LayoutContent";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Pomodoro App",
    description: "A simple pomodoro timer app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body>
                <Suspense fallback={<div>Loading...</div>}>
                    <LayoutContent>{children}</LayoutContent>
                </Suspense>
            </body>
        </html>
    );
}
