import Link from "next/link";

import { Button } from "@recipe-manager/ui";

const highlights = [
  {
    title: "Offline-first by design",
    description:
      "Your recipes, pantry, and plans stay available even without a connection. Sync happens securely when you are ready."
  },
  {
    title: "Discovery that respects privacy",
    description:
      "Find new recipes across the web with a crawler that honors robots.txt and keeps your browsing local-first."
  },
  {
    title: "Smart grocery planning",
    description:
      "Combine ingredients across recipes, normalize units, and build aisle-friendly shopping lists in seconds."
  }
];

export default function MarketingHome() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/10 via-background to-background">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-24 text-center">
          <span className="inline-flex items-center rounded-full border border-brand/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
            Recipe Atlas
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            The local-first recipe manager for serious home cooks
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Capture, organize, and cook with confidence. Recipe Atlas brings Paprika-class features with modern
            discovery and ingredient intelligence—all while keeping your data private.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="https://play.google.com">Download for Android</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View Plans</Link>
            </Button>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Available on Web · Android · Windows
          </p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          {highlights.map((highlight) => (
            <div key={highlight.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">{highlight.title}</h2>
              <p className="text-sm text-muted-foreground">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-muted/40 py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-3xl font-semibold text-foreground">Be first in line</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Join the beta and help shape the future of cooking intelligence. We never sell data and will only reach out with product updates.
          </p>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-border/60 bg-background px-4 py-2 text-sm outline-none focus:border-brand"
              aria-label="Email address"
              required
            />
            <Button type="submit" className="sm:w-auto">
              Notify me
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
