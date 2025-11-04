"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "next-themes";

import { QueryProvider } from "./query-client-provider";
import { initI18n } from "@/src/lib/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const instance = initI18n();
    const applyDirection = () => {
      if (typeof document !== "undefined") {
        document.documentElement.dir = instance.dir();
      }
    };
    applyDirection();
    instance.on("languageChanged", applyDirection);
    return () => {
      instance.off("languageChanged", applyDirection);
    };
  }, []);

  const i18n = initI18n();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <I18nextProvider i18n={i18n} defaultNS="translation">
        <QueryProvider>{children}</QueryProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}
