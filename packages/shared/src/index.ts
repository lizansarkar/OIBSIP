import { z } from "zod";

// User & Auth Types
export const UserRole = {
  CUSTOMER: "customer",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// Order Status Workflow
export const OrderStatus = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

// Payment Status
export const PaymentStatus = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// Ingredient Categories for Custom Pizza Builder
export const IngredientCategory = {
  BASE: "base",
  SAUCE: "sauce",
  CHEESE: "cheese",
  VEGETABLE: "vegetable",
  MEAT: "meat",
  TOPPING: "topping",
} as const;

export type IngredientCategory =
  (typeof IngredientCategory)[keyof typeof IngredientCategory];

// Pizza Size & Crust Definitions
export const PizzaSize = {
  SMALL: "10-inch Small",
  MEDIUM: "12-inch Medium",
  LARGE: "14-inch Large",
} as const;

export type PizzaSize = (typeof PizzaSize)[keyof typeof PizzaSize];

// Base API Response Format
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

// Health Check Response
export interface HealthStatus {
  status: "ok" | "degraded" | "down";
  uptime: number;
  environment: string;
  database: "connected" | "disconnected" | "connecting";
  timestamp: string;
}

// Validation Schemas
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: "pizza" | "sides" | "desserts" | "beverages";
  description: string;
  ingredients: string[];
  basePrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  calories: string;
}

export const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    slug: "artisanal-pepperoni",
    name: "Artisanal Pepperoni",
    category: "pizza",
    description:
      "Crafted with hand-sliced artisan pepperoni, fior di latte mozzarella, crushed San Marzano heirloom tomatoes, and hot clover honey drizzle.",
    ingredients: [
      "San Marzano Tomatoes",
      "Fior di Latte Mozzarella",
      "Artisanal Pepperoni",
      "Wild Oregano",
      "Hot Chili Infused Honey",
    ],
    basePrice: 18.5,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 184,
    isPopular: true,
    isSpicy: true,
    calories: "1,180 kcal",
  },
  {
    id: "prod-2",
    slug: "truffle-carbonara",
    name: "Truffle Carbonara",
    category: "pizza",
    description:
      "Silky egg yolk emulsion, crispy cured Italian guanciale, aged pecorino romano, cracked black pepper, and white truffle oil drizzle.",
    ingredients: [
      "Creamy White Truffle Sauce",
      "Cured Guanciale",
      "Pecorino Romano",
      "Fior di Latte",
      "Farm Egg Yolk",
      "Black Summer Truffle",
    ],
    basePrice: 21.0,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    rating: 4.95,
    reviewsCount: 220,
    isPopular: true,
    isChefSpecial: true,
    calories: "1,290 kcal",
  },
  {
    id: "prod-3",
    slug: "margherita-dop",
    name: "Margherita D.O.P.",
    category: "pizza",
    description:
      "The gold standard of Neapolitan tradition. Certified D.O.P. San Marzano tomatoes, fresh buffalo mozzarella, fragrant Genovese basil, and extra virgin olive oil.",
    ingredients: [
      "San Marzano D.O.P. Tomatoes",
      "Campania Buffalo Mozzarella",
      "Fresh Genovese Basil",
      "Cold-Pressed Extra Virgin Olive Oil",
      "Sea Salt Flakes",
    ],
    basePrice: 16.5,
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80",
    rating: 4.85,
    reviewsCount: 312,
    isVegetarian: true,
    calories: "980 kcal",
  },
  {
    id: "prod-4",
    slug: "quattro-formaggi-royale",
    name: "Quattro Formaggi Royale",
    category: "pizza",
    description:
      "A rich symphony of four artisanal Italian cheeses: fior di latte, aged gorgonzola dolce, creamy taleggio, and 24-month parmigiano reggiano.",
    ingredients: [
      "Fior di Latte",
      "Gorgonzola Dolce",
      "Aged Taleggio",
      "Parmigiano Reggiano",
      "Wildflower Honey",
      "Toasted Walnuts",
    ],
    basePrice: 19.5,
    image:
      "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=800&auto=format&fit=crop&q=80",
    rating: 4.88,
    reviewsCount: 145,
    isVegetarian: true,
    calories: "1,240 kcal",
  },
  {
    id: "prod-5",
    slug: "prosciutto-e-fichi",
    name: "Prosciutto & Black Fig",
    category: "pizza",
    description:
      "Sweet Mission black figs, 24-month aged Prosciutto di Parma, creamy goat cheese, baby wild arugula, and aged balsamic glaze.",
    ingredients: [
      "Prosciutto di Parma",
      "Caramelized Black Figs",
      "Whipped Goat Cheese",
      "Organic Baby Arugula",
      "Modena Balsamic Glaze",
    ],
    basePrice: 22.5,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    rating: 4.92,
    reviewsCount: 98,
    isChefSpecial: true,
    calories: "1,110 kcal",
  },
  {
    id: "prod-6",
    slug: "diavola-flame",
    name: "Diavola Flame",
    category: "pizza",
    description:
      "Spicy Calabrian 'nduja paste, crushed chili flakes, spicy soppressata salami, roasted red sweet peppers, and smoked scamorza cheese.",
    ingredients: [
      "Spicy Calabrian 'Nduja",
      "Soppressata Piccante",
      "Charred Sweet Bell Peppers",
      "Smoked Scamorza",
      "Pickled Jalapeños",
    ],
    basePrice: 19.0,
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80",
    rating: 4.79,
    reviewsCount: 167,
    isSpicy: true,
    calories: "1,220 kcal",
  },
  {
    id: "prod-7",
    slug: "garlic-herb-crust-sticks",
    name: "Truffle Garlic Breadsticks",
    category: "sides",
    description:
      "Freshly baked sourdough dough knots tossed in roasted garlic butter, parsley, parmigiano reggiano, served with warm marinara.",
    ingredients: [
      "Sourdough Knots",
      "Roasted Garlic Butter",
      "Parmigiano Reggiano",
      "Warm Marinara Dip",
    ],
    basePrice: 8.5,
    image:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 230,
    isVegetarian: true,
    calories: "520 kcal",
  },
  {
    id: "prod-8",
    slug: "crispy-calamari-fritti",
    name: "Crispy Calamari Fritti",
    category: "sides",
    description:
      "Golden fried tender calamari rings with charred lemon halves, herb dusting, and house smoked garlic aioli.",
    ingredients: [
      "Tender Calamari",
      "Charred Lemon",
      "Smoked Garlic Aioli",
      "Fresh Italian Parsley",
    ],
    basePrice: 12.0,
    image:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    rating: 4.82,
    reviewsCount: 110,
    calories: "640 kcal",
  },
  {
    id: "prod-9",
    slug: "authentic-tiramisu",
    name: "Artisanal Classic Tiramisù",
    category: "desserts",
    description:
      "Espresso-soaked Savoiardi ladyfingers layered with velvety mascarpone zabaglione and dusted with premium Valrhona cocoa powder.",
    ingredients: [
      "Italian Ladyfingers",
      "Dark Espresso Roast",
      "Mascarpone Cream",
      "Valrhona Cocoa Powder",
    ],
    basePrice: 9.0,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80",
    rating: 4.96,
    reviewsCount: 340,
    isPopular: true,
    isVegetarian: true,
    calories: "480 kcal",
  },
  {
    id: "prod-10",
    slug: "blood-orange-san-pellegrino",
    name: "Sparkling Blood Orange Soda",
    category: "beverages",
    description:
      "Crisp, imported Italian sparkling fruit beverage made with Mediterranean blood oranges and sparkling spring water.",
    ingredients: [
      "Italian Mineral Water",
      "Sicilian Blood Orange Juice",
      "Raw Cane Sugar",
    ],
    basePrice: 4.5,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80",
    rating: 4.75,
    reviewsCount: 89,
    calories: "120 kcal",
  },
];

export const BUILDER_OPTIONS = {
  bases: [
    {
      id: "base-1",
      name: "48hr Sourdough Classic",
      price: 12.0,
      description: "Airy, blistered crust with tangy fermented sourdough flavor.",
      image:
        "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "base-2",
      name: "Traditional Neapolitan",
      price: 11.5,
      description: "Soft, pillowy edge with thin delicate center.",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "base-3",
      name: "Crispy Thin Roman Crust",
      price: 11.0,
      description: "Ultra-crisp cracker-thin crust for maximum crunch.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "base-4",
      name: "Four-Cheese Stuffed Crust",
      price: 14.5,
      description: "Hand-braided crust edges oozing with melted fontina & mozzarella.",
      image:
        "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "base-5",
      name: "Gluten-Free Herb Crust",
      price: 13.5,
      description: "Crispy cauliflower, almond flour and rosemary gluten-free blend.",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80",
    },
  ],
  sauces: [
    {
      id: "sauce-1",
      name: "San Marzano Heirloom Tomato",
      price: 1.5,
      description: "Crushed sweet Italian plum tomatoes with fresh basil and sea salt.",
    },
    {
      id: "sauce-2",
      name: "Spicy Arrabbiata Piccante",
      price: 2.0,
      description: "Fiery slow-simmered tomato sauce with Calabrian red chili peppers.",
    },
    {
      id: "sauce-3",
      name: "Creamy White Truffle Alfredo",
      price: 3.0,
      description: "Rich mascarpone, heavy cream, garlic, and Umbrian white truffle oil.",
    },
    {
      id: "sauce-4",
      name: "Genovese Basil Pesto D.O.P.",
      price: 2.5,
      description: "Vibrant basil, toasted pine nuts, extra virgin olive oil, and parmesan.",
    },
    {
      id: "sauce-5",
      name: "Smoky Bourbon Chipotle BBQ",
      price: 2.0,
      description: "Smoky sweet reduction with caramelized garlic and aged oak barrel undertones.",
    },
  ],
  cheeses: [
    {
      id: "cheese-1",
      name: "Fior di Latte Whole Milk",
      price: 2.5,
      description: "Creamy whole milk fresh mozzarella with rich melt.",
    },
    {
      id: "cheese-2",
      name: "Campania Buffalo Mozzarella",
      price: 4.0,
      description: "Authentic imported buffalo mozzarella with distinct delicate sweetness.",
    },
    {
      id: "cheese-3",
      name: "Aged Gorgonzola Dolce",
      price: 3.5,
      description: "Soft blue veined Italian cheese offering rich, savory complexity.",
    },
    {
      id: "cheese-4",
      name: "Smoked Scamorza & Fontina",
      price: 3.0,
      description: "Delightfully smoky cow's milk cheese with velvety pull.",
    },
    {
      id: "cheese-5",
      name: "Plant-Based Organic Melt",
      price: 3.0,
      description: "Artisanal dairy-free cashew and oat mozzarella.",
    },
  ],
  vegetables: [
    { id: "veg-1", name: "Heirloom Cherry Tomatoes", price: 1.5 },
    { id: "veg-2", name: "Roasted Wild Portobello", price: 2.0 },
    { id: "veg-3", name: "Charred Sweet Bell Peppers", price: 1.5 },
    { id: "veg-4", name: "Sweet Balsamic Onions", price: 1.5 },
    { id: "veg-5", name: "Fire-Roasted Jalapeños", price: 1.5 },
    { id: "veg-6", name: "Kalamata Black Olives", price: 1.5 },
    { id: "veg-7", name: "Organic Baby Spinach", price: 1.5 },
    { id: "veg-8", name: "Fresh Genovese Arugula", price: 1.5 },
  ],
  meats: [
    { id: "meat-1", name: "Artisanal Pepperoni", price: 3.0 },
    { id: "meat-2", name: "Prosciutto di Parma 24mo", price: 4.5 },
    { id: "meat-3", name: "Spicy Italian Fennel Sausage", price: 3.0 },
    { id: "meat-4", name: "Crispy Smoked Bacon Lardons", price: 3.0 },
    { id: "meat-5", name: "Calabrian Spicy 'Nduja", price: 3.5 },
  ],
};
