import { format } from "date-fns";

const planner = [
  {
    date: new Date(),
    meals: [
      { slot: "Breakfast", recipe: "Overnight Oats" },
      { slot: "Lunch", recipe: "Roasted Veggie Bowl" },
      { slot: "Dinner", recipe: "Lemon Herb Salmon" }
    ]
  },
  {
    date: new Date(Date.now() + 86400000),
    meals: [
      { slot: "Breakfast", recipe: "Green Smoothie" },
      { slot: "Dinner", recipe: "Mushroom Risotto" }
    ]
  }
];

export async function PlannerPreview() {
  // TODO: fetch planner entries from server actions or React Query
  await new Promise((resolve) => setTimeout(resolve, 300));
  return (
    <section className="rounded-xl border border-border/60 bg-background/80 p-6 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Meal planner</h2>
        <span className="text-sm text-muted-foreground">Next 7 days</span>
      </header>
      <div className="space-y-4">
        {planner.map((day) => (
          <div key={day.date.toISOString()} className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              {format(day.date, "EEEE, MMM d")}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {day.meals.map((meal) => (
                <div key={`${day.date.toISOString()}-${meal.slot}`} className="rounded-lg border border-border/40 bg-muted/40 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{meal.slot}</p>
                  <p className="text-sm font-medium text-foreground">{meal.recipe}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
