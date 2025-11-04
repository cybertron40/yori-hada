# Ingredient Parsing & Normalization

## Parsing Pipeline

1. **Tokenization:** Split raw ingredient strings into quantity, unit, item, preparation, and notes.
   - Recognize unicode fractions (¼, ½, ¾, etc.) and convert to rational numbers.
   - Support ranges using en/em dashes and hyphens (`1-2`, `1–2`). Both lower and upper bounds stored; default quantity uses midpoint.
   - Detect descriptors (e.g., "finely chopped") as `note` while keeping `prep` for verbs (`chopped`, `minced`).

2. **Quantity Handling:**
   - Represent amounts as `quantity_num` and `quantity_den`; integers only for deterministic math.
   - Scaling multiplies numerator, keeps denominator, and reduces fraction via GCD. Ranges scale both endpoints.
   - Derived display uses fraction formatting (`1 1/2`) with fallback to decimal when denominator > 16.

3. **Unit Recognition:**
   - Unit lexicon includes: tsp, tbsp, cup, ml, l, g, kg, oz, lb, pinch, dash, can, clove, bunch, slice, piece, stick.
   - Mapping table defines canonical unit type (mass, volume, count) and conversion factors (e.g., `tbsp → ml`).
   - Custom per-ingredient overrides handle density-specific conversions (e.g., flour measured in cups to grams).

4. **Ingredient Canonicalization:**
   - Alias table (`ingredient_aliases`) maps synonyms ("scallions" ↔ "green onions").
   - Normalizer lowers case, strips punctuation, matches to canonical ingredient row.
   - When unresolved, ingredient stored with `item` = raw text and flagged for review.

5. **Metadata Enrichment:**
   - If nutrition mapping exists, attach `nutrition_food_id` (FDC ID) for downstream calculations.
   - Allergen detection triggers when canonical ingredient belongs to flagged group (gluten, dairy, nuts, shellfish, soy, egg).

## Grocery Merge Logic

1. Aggregate selected recipes or planner entries → produce ingredient list with canonical IDs and normalized units.
2. Convert all units to canonical target per ingredient (mass or volume) leveraging conversion map.
3. Merge items with identical canonical ingredient + unit.
4. Sum quantities via rational arithmetic, reduce to mixed fraction for display.
5. Combine notes (e.g., "diced", "for garnish") into set to maintain context.
6. Provide UI toggles to switch to alternative units (metric vs imperial) when conversions are lossless.

## Scaling

- Scaling factor `f` multiplies all ingredient numerators (and range bounds), denominator unchanged.
- After multiplication, divide numerator & denominator by GCD to reduce fraction.
- For mixed numbers, compute `whole = floor(num / den)`; render as `whole remainder/den` when `whole > 0`.
- Persist scaled values in view models only—base recipe remains canonical to preserve sync stability.

## Substitutions

- `substitution_map` table encodes bidirectional pairs with strength (0–1).
- During coverage scoring, treat pantry ingredient `a` as `strength` match for recipe ingredient `b` when mapping exists.
- UI suggests substitution inline, summarizing expected flavor differences.
