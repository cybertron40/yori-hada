import { Calendar, ChefHat, Refrigerator, ShoppingCart } from "lucide-react";

const cards = [
  {
    title: "Recipes",
    description: "Saved favorites ready to cook",
    value: "128",
    icon: ChefHat,
    trend: "+5 new this week"
  },
  {
    title: "Pantry Items",
    description: "Tracked ingredients",
    value: "57",
    icon: Refrigerator,
    trend: "3 expiring soon"
  },
  {
    title: "Planner",
    description: "Meals scheduled",
    value: "7",
    icon: Calendar,
    trend: "This week is full"
  },
  {
    title: "Grocery",
    description: "Items left to shop",
    value: "12",
    icon: ShoppingCart,
    trend: "Auto-compiled from planner"
  }
];

export function OverviewCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.title}
            className="rounded-xl border border-border/60 bg-background/80 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                <p className="text-2xl font-semibold text-foreground">{card.value}</p>
              </div>
              <Icon className="h-8 w-8 text-brand" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{card.description}</p>
            <p className="mt-1 text-xs font-medium text-brand">{card.trend}</p>
          </article>
        );
      })}
    </section>
  );
}
