"use client";

import { SessionProvider } from "next-auth/react";
import Script from "next/script"; // ✅ IMPORT THIS
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-full flex flex-col">

        {/* ✅ Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {/* ✅ Session Provider */}
        <SessionProvider>
          {children}
        </SessionProvider>

      </body>
    </html>
  );
}