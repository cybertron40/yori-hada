import { addDays, format } from "date-fns";

const start = new Date();
const planner = Array.from({ length: 7 }).map((_, idx) => {
  const date = addDays(start, idx);
  return {
    date,
    meals: [
      { slot: "Breakfast", recipe: "Greek Yogurt Parfait" },
      { slot: "Dinner", recipe: "Sheet Pan Harissa Chicken" }
    ].slice(0, idx % 3 === 0 ? 2 : 1)
  };
});

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Meal Planner</h1>
        <p className="text-sm text-muted-foreground">
          Drag and drop recipes, visualize the week, and export to your calendar.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {planner.map((day) => (
          <article key={day.date.toISOString()} className="rounded-xl border border-border/60 bg-background/80 p-4">
            <h2 className="text-sm font-semibold text-muted-foreground">
              {format(day.date, "EEEE, MMM d")}
            </h2>
            <ul className="mt-3 space-y-2">
              {day.meals.map((meal) => (
                <li key={`${day.date.toISOString()}-${meal.slot}`} className="rounded-lg border border-border/40 bg-muted/40 px-3 py-2 text-sm text-foreground">
                  <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                    {meal.slot}
                  </span>
                  {meal.recipe}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
