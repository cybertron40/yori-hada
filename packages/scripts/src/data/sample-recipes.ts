import { randomUUID } from "node:crypto";

interface SampleRecipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  cuisine: string;
  course: string;
  totalMinutes: number;
  tags: string[];
  imageUrl: string;
}

const baseImage = "https://images.unsplash.com";

const titles: Array<Omit<SampleRecipe, "id" | "slug"> & { slug?: string }> = [
  {
    title: "Harissa Roast Chicken with Citrus",
    description: "Crisp-skinned chicken roasted with harissa, oranges, and fennel.",
    cuisine: "Middle Eastern",
    course: "Dinner",
    totalMinutes: 70,
    tags: ["spicy", "sheet-pan"],
    imageUrl: `${baseImage}/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Miso-Ginger Salmon Bowls",
    description: "Broiled salmon with miso glaze over sesame rice and pickled veggies.",
    cuisine: "Japanese",
    course: "Dinner",
    totalMinutes: 30,
    tags: ["omega-3", "weeknight"],
    imageUrl: `${baseImage}/photo-1512058564366-c9e9fb98a7b6?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Coconut Turmeric Lentil Soup",
    description: "Creamy red lentil soup with coconut milk, turmeric, and lime.",
    cuisine: "Indian",
    course: "Dinner",
    totalMinutes: 35,
    tags: ["vegan", "gluten-free"],
    imageUrl: `${baseImage}/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Charred Broccolini Pasta",
    description: "Spring pasta with charred broccolini, lemon zest, and toasted almonds.",
    cuisine: "Italian",
    course: "Dinner",
    totalMinutes: 25,
    tags: ["vegetarian", "30-min"],
    imageUrl: `${baseImage}/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Gochujang Glazed Meatballs",
    description: "Sweet and spicy meatballs with gochujang glaze over rice noodles.",
    cuisine: "Korean",
    course: "Dinner",
    totalMinutes: 40,
    tags: ["freezer-friendly", "crowd-pleaser"],
    imageUrl: `${baseImage}/photo-1604908177453-7462957e9e4d?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Smoky Black Bean Soup",
    description: "One-pot black bean soup with chipotle, lime, and cilantro.",
    cuisine: "Latin",
    course: "Dinner",
    totalMinutes: 45,
    tags: ["vegan", "meal-prep"],
    imageUrl: `${baseImage}/photo-1604908177521-402de5d7b458?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Za'atar Roasted Carrots",
    description: "Honey-roasted carrots with za'atar, yogurt, and pistachios.",
    cuisine: "Middle Eastern",
    course: "Side",
    totalMinutes: 35,
    tags: ["vegetarian", "sheet-pan"],
    imageUrl: `${baseImage}/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Lemon Ricotta Pancakes",
    description: "Fluffy ricotta pancakes with lemon zest and maple syrup.",
    cuisine: "American",
    course: "Breakfast",
    totalMinutes: 25,
    tags: ["brunch", "comfort"],
    imageUrl: `${baseImage}/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Green Goddess Grain Bowl",
    description: "Quinoa bowl with green goddess dressing and roasted vegetables.",
    cuisine: "California",
    course: "Lunch",
    totalMinutes: 35,
    tags: ["vegetarian", "meal-prep"],
    imageUrl: `${baseImage}/photo-1542444459-db65f263f076?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Tamarind Tofu Stir-Fry",
    description: "Crispy tofu tossed in tamarind glaze with bok choy and peppers.",
    cuisine: "Thai",
    course: "Dinner",
    totalMinutes: 30,
    tags: ["vegan", "stir-fry"],
    imageUrl: `${baseImage}/photo-1484981184820-2e84ea0a1950?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Smoked Paprika Chili",
    description: "Hearty beef and bean chili with smoked paprika and cocoa.",
    cuisine: "Tex-Mex",
    course: "Dinner",
    totalMinutes: 90,
    tags: ["meal-prep", "comfort"],
    imageUrl: `${baseImage}/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Herbed Focaccia",
    description: "Olive oil focaccia with rosemary, flaky salt, and garlic.",
    cuisine: "Italian",
    course: "Bread",
    totalMinutes: 120,
    tags: ["baking", "vegetarian"],
    imageUrl: `${baseImage}/photo-1542834758-6aa6f3e79fbb?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Citrus Farro Salad",
    description: "Warm farro salad with grapefruit, fennel, and mint.",
    cuisine: "Mediterranean",
    course: "Lunch",
    totalMinutes: 40,
    tags: ["vegetarian", "meal-prep"],
    imageUrl: `${baseImage}/photo-1542444459-db65f263f076?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Maple Tahini Granola",
    description: "Crispy granola with tahini, maple syrup, and pistachios.",
    cuisine: "American",
    course: "Breakfast",
    totalMinutes: 50,
    tags: ["meal-prep", "vegan"],
    imageUrl: `${baseImage}/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Shaved Brussels Sprout Salad",
    description: "Crunchy salad with lemon, pecorino, and toasted walnuts.",
    cuisine: "American",
    course: "Side",
    totalMinutes: 20,
    tags: ["vegetarian", "quick"],
    imageUrl: `${baseImage}/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Sesame Soba with Tofu",
    description: "Cold soba noodles with sesame dressing and crisp tofu.",
    cuisine: "Japanese",
    course: "Lunch",
    totalMinutes: 25,
    tags: ["vegan", "meal-prep"],
    imageUrl: `${baseImage}/photo-1512058564366-c9e9fb98a7b6?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Citrus Olive Oil Cake",
    description: "Moist olive oil cake infused with orange zest and rosemary.",
    cuisine: "Mediterranean",
    course: "Dessert",
    totalMinutes: 70,
    tags: ["baking", "make-ahead"],
    imageUrl: `${baseImage}/photo-1589308078050-002c51eb2445?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Sweet Potato Breakfast Hash",
    description: "Skillet hash with sweet potatoes, chorizo, and poached eggs.",
    cuisine: "American",
    course: "Breakfast",
    totalMinutes: 35,
    tags: ["brunch", "cast-iron"],
    imageUrl: `${baseImage}/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Roasted Beet & Goat Cheese Tart",
    description: "Savory tart with roasted beets, herbed goat cheese, and thyme.",
    cuisine: "French",
    course: "Lunch",
    totalMinutes: 75,
    tags: ["vegetarian", "entertaining"],
    imageUrl: `${baseImage}/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Spiced Chickpea Wraps",
    description: "Roasted chickpeas with yogurt sauce wrapped in warm flatbread.",
    cuisine: "Middle Eastern",
    course: "Lunch",
    totalMinutes: 30,
    tags: ["vegetarian", "portable"],
    imageUrl: `${baseImage}/photo-1542444459-db65f263f076?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Ginger Scallion Noodles",
    description: "Quick noodles with ginger scallion sauce and crispy mushrooms.",
    cuisine: "Chinese",
    course: "Dinner",
    totalMinutes: 20,
    tags: ["weeknight", "vegetarian"],
    imageUrl: `${baseImage}/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Roasted Garlic Cauliflower Steaks",
    description: "Charred cauliflower steaks with roasted garlic and herb oil.",
    cuisine: "American",
    course: "Dinner",
    totalMinutes: 40,
    tags: ["vegan", "sheet-pan"],
    imageUrl: `${baseImage}/photo-1512058564366-c9e9fb98a7b6?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Spicy Peanut Udon",
    description: "Chewy udon noodles in spicy peanut sauce with crunchy vegetables.",
    cuisine: "Fusion",
    course: "Dinner",
    totalMinutes: 25,
    tags: ["weeknight", "vegan"],
    imageUrl: `${baseImage}/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Lemon Herb Salmon Packs",
    description: "Foil-pack salmon with lemon, dill, and baby potatoes.",
    cuisine: "American",
    course: "Dinner",
    totalMinutes: 35,
    tags: ["weeknight", "meal-prep"],
    imageUrl: `${baseImage}/photo-1514516430032-7f39d83169aa?auto=format&fit=crop&w=900&q=80`
  },
  {
    title: "Dark Chocolate Tahini Brownies",
    description: "Fudgy brownies swirled with tahini and sesame brittle.",
    cuisine: "Dessert",
    course: "Dessert",
    totalMinutes: 55,
    tags: ["baking", "crowd-pleaser"],
    imageUrl: `${baseImage}/photo-1514516430032-7f39d83169aa?auto=format&fit=crop&w=900&q=80`
  }
];

export const sampleRecipes: SampleRecipe[] = titles.map((item) => {
  const slug = item.slug ?? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: randomUUID(),
    slug,
    ...item
  };
});
