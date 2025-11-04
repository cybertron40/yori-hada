import Link from "next/link";

import { Button } from "@recipe-manager/ui";

const featureList = [
  "Offline-first syncing across devices",
  "Ingredient-aware recommendations",
  "Smart grocery planning",
  "Privacy-first discovery from the web"
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 px-6 py-24 text-center">
        <p className="rounded-full border border-border px-4 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          Local-first recipe intelligence
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Cook smarter with Recipe Atlas
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Import from the web, plan your meals, and keep your pantry in sync. Recipe Atlas keeps
          everything fast, private, and available offline on every device.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/app">Launch App</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/register">Get Started</Link>
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
