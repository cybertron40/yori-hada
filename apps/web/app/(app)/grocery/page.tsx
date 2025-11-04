const grocery = [
  {
    aisle: "Produce",
    items: [
      { id: "1", name: "Lemons", quantity: "4" },
      { id: "2", name: "Italian Parsley", quantity: "1 bunch" }
    ]
  },
  {
    aisle: "Pantry",
    items: [{ id: "3", name: "Farro", quantity: "500 g" }]
  }
];

export default function GroceryPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Grocery Lists</h1>
        <p className="text-sm text-muted-foreground">
          Combine ingredients across recipes, respect aisle ordering, and sync offline.
        </p>
      </header>
      <div className="space-y-5">
        {grocery.map((section) => (
          <section key={section.aisle} className="rounded-xl border border-border/60 bg-background/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {section.aisle}
            </h2>
            <ul className="mt-3 space-y-2">
              {section.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm text-foreground">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.quantity}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
