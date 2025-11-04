import {
  pgTable,
  text,
  uuid,
  timestamp,
  integer,
  boolean,
  numeric,
  jsonb,
  date,
  primaryKey
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`)
});

export const recipes = pgTable("recipe", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  servings: integer("servings"),
  yieldText: text("yield_text"),
  cuisine: text("cuisine"),
  course: text("course"),
  totalMinutes: integer("total_minutes"),
  prepMinutes: integer("prep_minutes"),
  cookMinutes: integer("cook_minutes"),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  sourceUrl: text("source_url"),
  sourceName: text("source_name"),
  author: text("author"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).$onUpdateFn(() => sql`now()`),
  isPrivate: boolean("is_private").default(false)
});

export const recipeImages = pgTable("recipe_image", {
  id: uuid("id").defaultRandom().primaryKey(),
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  width: integer("width"),
  height: integer("height"),
  alt: text("alt")
});

export const recipeTags = pgTable("recipe_tag", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull()
});

export const recipeTagMap = pgTable(
  "recipe_tag_map",
  {
    recipeId: uuid("recipe_id").references(() => recipes.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id").references(() => recipeTags.id, { onDelete: "cascade" })
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.tagId] })
  })
);

export const ingredients = pgTable("ingredient", {
  id: uuid("id").defaultRandom().primaryKey(),
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  rawText: text("raw_text").notNull(),
  quantityNum: integer("quantity_num"),
  quantityDen: integer("quantity_den"),
  unit: text("unit"),
  item: text("item").notNull(),
  prep: text("prep"),
  note: text("note"),
  groupLabel: text("group_label"),
  orderIndex: integer("order_index").notNull()
});

export const directions = pgTable("direction", {
  id: uuid("id").defaultRandom().primaryKey(),
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  timerSeconds: integer("timer_seconds"),
  imageUrl: text("image_url"),
  orderIndex: integer("order_index").notNull()
});

export const equipment = pgTable("equipment", {
  id: uuid("id").defaultRandom().primaryKey(),
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  name: text("name").notNull()
});

export const nutrition = pgTable("nutrition", {
  recipeId: uuid("recipe_id").primaryKey().references(() => recipes.id, { onDelete: "cascade" }),
  calories: integer("calories"),
  proteinG: integer("protein_g"),
  fatG: integer("fat_g"),
  carbsG: integer("carbs_g"),
  sodiumMg: integer("sodium_mg"),
  fiberG: integer("fiber_g"),
  sugarG: integer("sugar_g"),
  cholesterolMg: integer("cholesterol_mg")
});

export const pantryItems = pgTable("pantry_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  quantityNum: integer("quantity_num"),
  quantityDen: integer("quantity_den"),
  unit: text("unit"),
  location: text("location"),
  expiresOn: date("expires_on"),
  updatedAt: timestamp("updated_at").default(sql`now()`).$onUpdateFn(() => sql`now()`)
});

export const groceryLists = pgTable("grocery_list", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`)
});

export const groceryItems = pgTable("grocery_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  listId: uuid("list_id").notNull().references(() => groceryLists.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  quantityNum: integer("quantity_num"),
  quantityDen: integer("quantity_den"),
  unit: text("unit"),
  aisle: text("aisle"),
  checked: boolean("checked").default(false),
  note: text("note")
});

export const plannerEntries = pgTable("planner_entry", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  recipeId: uuid("recipe_id").references(() => recipes.id, { onDelete: "set null" }),
  date: date("date").notNull(),
  mealSlot: text("meal_slot").notNull(),
  serves: integer("serves"),
  note: text("note")
});

export const importLog = pgTable("import_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  status: text("status").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`)
});

export const discoveryQueue = pgTable("discovery_queue", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull().unique(),
  status: text("status").notNull(),
  nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }),
  attempts: integer("attempts").default(0),
  lastError: text("last_error")
});

export const substitutionMap = pgTable("substitution_map", {
  id: uuid("id").defaultRandom().primaryKey(),
  a: text("a").notNull(),
  b: text("b").notNull(),
  strength: numeric("strength", { precision: 3, scale: 2 }).default(sql`0.5`)
});

export const syncChanges = pgTable("sync_change", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  table: text("table").notNull(),
  pk: text("pk").notNull(),
  changedAt: timestamp("changed_at", { withTimezone: true }).default(sql`now()`),
  op: text("op").notNull(),
  payloadJson: jsonb("payload_json"),
  clientId: text("client_id").notNull()
});

export const indexes = {
  recipeUserUpdated: sql`create index if not exists recipe_user_updated_idx on "recipe" ("user_id", "updated_at")`,
  recipeSearchVector: sql`create index if not exists recipe_search_idx on "recipe" using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')))`
};
