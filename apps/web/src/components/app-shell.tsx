"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@recipe-manager/ui";

const navItems = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/recipes", label: "Recipes" },
  { href: "/app/pantry", label: "Pantry" },
  { href: "/app/grocery", label: "Grocery" },
  { href: "/app/planner", label: "Planner" },
  { href: "/app/discovery", label: "Discovery" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border/60 bg-background/95 backdrop-blur transition-transform lg:static lg:translate-x-0 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-6">
          <Link href="/app" className="text-lg font-semibold">
            Recipe Atlas
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsNavOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-brand/10 text-brand" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/80 px-6 backdrop-blur">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsNavOpen((open) => !open)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-foreground">Your kitchen command center</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost">Sync</Button>
            <Button variant="outline">Feedback</Button>
          </div>
        </header>
        <main className="flex-1 bg-muted/10 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
