const discoveries = [
  {
    id: "1",
    title: "Gochujang Butter Shrimp",
    source: "Serious Eats",
    fetchedAt: "2h ago",
    canonicalUrl: "https://www.seriouseats.com/gochujang-butter-shrimp"
  },
  {
    id: "2",
    title: "Charred Citrus Salad",
    source: "Bon Appétit",
    fetchedAt: "6h ago",
    canonicalUrl: "https://www.bonappetit.com/story/charred-citrus-salad"
  }
];

export default function DiscoveryPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Discovery Queue</h1>
        <p className="text-sm text-muted-foreground">
          Fresh recipes sourced from the web, deduplicated and ready to import.
        </p>
      </header>
      <div className="space-y-3">
        {discoveries.map((item) => (
          <article key={item.id} className="rounded-xl border border-border/60 bg-background/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{item.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {item.source} · {item.fetchedAt}
                </p>
              </div>
              <a
                href={item.canonicalUrl}
                className="text-xs font-medium text-brand hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Preview
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
