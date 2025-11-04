import "./globals.css";

import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    template: "%s | Recipe Atlas",
    default: "Recipe Atlas – Discover, plan, and cook"
  },
  description:
    "Recipe Atlas is a privacy-first recipe manager with smart discovery, meal planning, and ingredient-based suggestions."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
