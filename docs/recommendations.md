# Ingredient-Based Recommendations

## Scoring Model

For recipe `r` and pantry `P`:

```
coverage(r, P) = (Σ weight(i) for i ∈ matches(P, r)) / (Σ weight(i) for i ∈ r)
missing_cost(r, P) = Σ weight(i) for i ∈ r \ matches(P, r)
score(r, P) = α * coverage(r, P) - β * missing_cost(r, P) - γ * (total_minutes(r) / 60)
```

- Default coefficients: α = 1.0, β = 0.75, γ = 0.25 (feature flagged via remote config).
- `weight(i)` defaults to 1.0, boosted for essential ingredients (proteins, mains) using category metadata.
- Prep time penalty uses total minutes; long recipes decay score faster.

### Matches & Substitutions

- Direct match when pantry contains canonical ingredient with sufficient quantity.
- Substitution graph: if `(a, b, strength)` exists and pantry has `a`, treat as partial match with weight `strength`.
- For partially matched ranges, proportionally reduce contribution (e.g., half quantity available → 0.5 weight).

### Tie-Breakers

1. Cosine similarity between binary ingredient vectors of candidate recipes and recently cooked recipes.
2. Recency freshness: prefer recipes not cooked in last 7 days.
3. Rating/favorites weighting.

### Implementation Outline

1. Build pantry vector `v_p` (binary/counted) with canonical ingredient IDs.
2. Precompute recipe ingredient matrix `M` (sparse) stored in Postgres; expose via sync to clients.
3. On-device scoring (mobile/desktop) using local SQLite to avoid network dependency. Web can run server-side for multi-user contexts.
4. Cache top-N recommendations per device; invalidate when pantry change log updates or planner selection changes.

## UX Considerations

- Display coverage percentage and missing ingredients list.
- Offer quick add-to-grocery for missing items.
- Provide substitution disclaimers with ability to decline suggestion globally.
- Privacy mode: scoring remains local; optional aggregated analytics executed only with opt-in telemetry.
