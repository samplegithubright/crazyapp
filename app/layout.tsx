"use client";

import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className="min-h-full flex flex-col">

                <SessionProvider>{children}</SessionProvider>
                


            </body>
        </html>
    );
}
