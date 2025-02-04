import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { type PropsWithChildren } from "react";
import { Toaster } from "@ssms/components/ui/Sonner";
import { QueryClientProvider } from "@ssms/components/features/QueryClientProvider";
import { AppwriteProvider } from "@ssms/components/features/AppwriteProvider";

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

export const metadata: Metadata = {
  title: "Service Slip",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster richColors position="top-center" />
        <QueryClientProvider>
          <AppwriteProvider>{children}</AppwriteProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
