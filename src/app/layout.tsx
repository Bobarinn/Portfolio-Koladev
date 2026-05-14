import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const fontSans = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Kolade Abobarin | Bubble.io Developer & AI Automation",
  description:
    "Independent Bubble.io developer and AI automation builder for startups and founders: MVPs, integrations, workflows, and scalable no-code products.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' }
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
      <body
        className="min-h-screen bg-background font-sans text-foreground antialiased overflow-x-hidden engineer-surface"
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
