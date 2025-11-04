import { Sparkles } from "lucide-react";

const suggestions = [
  {
    title: "Sheet Pan Harissa Chicken",
    reason: "Uses chicken thighs and chickpeas in your pantry",
    readiness: "40 min total",
    match: 0.86
  },
  {
    title: "Spring Pea Risotto",
    reason: "Matches arborio rice and vegetable stock",
    readiness: "35 min total",
    match: 0.74
  },
  {
    title: "Coconut Lentil Soup",
    reason: "High pantry coverage and 25 min cook time",
    readiness: "25 min total",
    match: 0.69
  }
];

export async function SuggestionsPanel() {
  // TODO: call ingredient-based recommendation service
  await new Promise((resolve) => setTimeout(resolve, 300));

  return (
    <aside className="sticky top-24 space-y-4">
      <header className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand" />
        <div>
          <h2 className="text-base font-semibold text-foreground">Suggested tonight</h2>
          <p className="text-xs text-muted-foreground">Based on your pantry and schedule</p>
        </div>
      </header>
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <article
            key={suggestion.title}
            className="rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{suggestion.title}</h3>
              <span className="text-xs font-medium text-brand">{Math.round(suggestion.match * 100)}% match</span>
            </div>
            <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
            <p className="mt-2 text-xs text-muted-foreground">{suggestion.readiness}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}
