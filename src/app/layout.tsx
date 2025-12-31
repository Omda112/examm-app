import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import QueryProvider from "@/context/query.provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: "EXAMM APP",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono?.variable ?? ""} ${
          inter?.variable ?? ""
        } font-sans`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
