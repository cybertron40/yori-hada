import Link from "next/link";

import { Button } from "@recipe-manager/ui";

const recipes = [
  {
    id: "1",
    title: "Charred Broccolini Pasta",
    tags: ["Vegetarian", "Weeknight"],
    rating: 4.7,
    totalMinutes: 25
  },
  {
    id: "2",
    title: "Harissa Roast Chicken",
    tags: ["Dinner", "Spicy"],
    rating: 4.9,
    totalMinutes: 55
  }
];

export default function RecipesPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Recipes</h1>
          <p className="text-sm text-muted-foreground">
            Organize imports, tags, and rich notes with offline-first editing.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import from URL</Button>
          <Button>Add Recipe</Button>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="rounded-xl border border-border/60 bg-background/80 p-5 shadow-sm">
            <h2 className="truncate text-lg font-semibold text-foreground">{recipe.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {recipe.totalMinutes} min · {recipe.rating.toFixed(1)}★
            </p>
            <div className="mt-2 flex flex-wrap gap-1 text-xs text-muted-foreground">
              {recipe.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand/10 px-2 py-1 text-brand">
                  {tag}
                </span>
              ))}
            </div>
            <Button asChild variant="ghost" className="mt-4 w-full">
              <Link href={`/app/recipes/${recipe.id}`}>Open</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
