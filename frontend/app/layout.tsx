import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// ===== Fonts =====
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Posts App",
  description: "Simple CRUD posts app",
};

// ===== Root Layout =====
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-slate-100 text-slate-900">
        <main className="flex-1">
       {children}
        </main>

    <Toaster position="top-right" />
    </body>
    </html>
  );
}