"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@recipe-manager/ui";

export default function LandingPage() {
  const { t } = useTranslation();
  const featureList = [
    t("features.offline"),
    t("features.recommendations"),
    t("features.grocery"),
    t("features.privacy")
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 px-6 py-24 text-center">
        <p className="rounded-full border border-border px-4 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          {t("app.tagline")}
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {t("app.name")}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Import from the web, plan your meals, and keep your pantry in sync. Recipe Atlas keeps
          everything fast, private, and available offline on every device.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/app">{t("actions.launchApp")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/register">{t("actions.getStarted")}</Link>
          </Button>
        </div>
        <ul className="grid w-full gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {featureList.map((feature) => (
            <li
              key={feature}
              className="rounded-xl border border-border/50 bg-background/60 px-5 py-4 text-left shadow-sm"
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
