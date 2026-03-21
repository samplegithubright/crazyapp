import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
        
        
        </body>
    </html>
  );
}
