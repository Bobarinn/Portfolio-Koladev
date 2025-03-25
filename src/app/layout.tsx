import type { Metadata, Viewport } from "next";
import { Space_Grotesk as FontSans, Fira_Code as FontMono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ChatProvider } from "@/components/chat/ChatProvider";

// Load Space_Grotesk with all weights
const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Kolade Abobarin | Full-Stack Developer & AI Specialist",
  description: "Full-Stack Developer & AI Specialist building at the intersection of No-Code, Traditional Code, and AI.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180' }
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("dark", fontSans.variable, fontMono.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
        {children}
        <Toaster position="top-right" />
        <ChatProvider />
      </body>
    </html>
  );
}
