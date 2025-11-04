const pantry = [
  { id: "1", name: "Chickpeas", quantity: "4 cans", location: "Pantry", expires: "Sep 21" },
  { id: "2", name: "Greek Yogurt", quantity: "1 tub", location: "Fridge", expires: "Jul 02" },
  { id: "3", name: "Fresh Dill", quantity: "1 bunch", location: "Fridge", expires: "Jun 15" }
];

export default function PantryPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Pantry</h1>
        <p className="text-sm text-muted-foreground">
          Track quantities, expirations, and auto-decrement when recipes are marked cooked.
        </p>
      </header>
      <div className="grid gap-3 lg:grid-cols-2">
        {pantry.map((item) => (
          <div key={item.id} className="rounded-xl border border-border/60 bg-background/80 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.quantity}</p>
              </div>
              <span className="text-xs text-muted-foreground">{item.location}</span>
            </div>
            <p className="mt-3 text-xs text-amber-600">Expires {item.expires}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
