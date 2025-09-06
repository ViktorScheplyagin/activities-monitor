import type { Metadata } from "next";
import "./globals.css";
import { LayoutContent } from "./LayoutContent";

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
        <html lang="en">
            <LayoutContent>{children}</LayoutContent>
        </html>
    );
}
