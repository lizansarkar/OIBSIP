"use client";

import * as React from "react";
import { SAMPLE_PRODUCTS, type ProductItem } from "@workspace/shared";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartSheet } from "@/components/cart-sheet";
import { PizzaCard } from "@/components/pizza-card";
import { Input } from "@workspace/ui/components/input";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Search, SlidersHorizontal, Sparkles, Flame, X } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"popular" | "price-asc" | "price-desc">("popular");
  const [filterVegOnly, setFilterVegOnly] = React.useState(false);
  const [filterSpicyOnly, setFilterSpicyOnly] = React.useState(false);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "pizza", label: "Pizzas" },
    { id: "sides", label: "Sides" },
    { id: "desserts", label: "Desserts" },
    { id: "beverages", label: "Beverages" },
  ];

  const filteredProducts = SAMPLE_PRODUCTS.filter((item) => {
    // Category filter
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }
    // Search filter
    if (
      searchQuery.trim() &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    // Tag filters
    if (filterVegOnly && !item.isVegetarian) return false;
    if (filterSpicyOnly && !item.isSpicy) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.basePrice - b.basePrice;
    if (sortBy === "price-desc") return b.basePrice - a.basePrice;
    return b.rating - a.rating; // Popular default
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <CartSheet />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="warning" className="gap-1.5 text-xs">
              <Flame className="h-3.5 w-3.5" /> Full Artisanal Menu
            </Badge>
            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">
              Handcrafted With Passion
            </h1>
            <p className="text-sm text-muted-foreground">
              Every pizza is freshly hand-stretched to order using 48-hour cold fermented living dough and baked in our 450°C stone ovens.
            </p>
          </div>

          {/* Search, Filter & Sort Controls */}
          <div className="mb-10 space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search input */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search pizzas, ingredients, sauces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-9 bg-surface-elevated rounded-xl h-11"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "popular" | "price-asc" | "price-desc")}
                  aria-label="Sort products by"
                  className="rounded-xl border border-border bg-surface-elevated px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-auto"
                >
                  <option value="popular">Sort: Highest Rated & Popular</option>
                  <option value="price-asc">Sort: Price (Low to High)</option>
                  <option value="price-desc">Sort: Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Category Pills & Dietary Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? "bg-primary text-black"
                        : "border border-border bg-surface-elevated text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterVegOnly(!filterVegOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    filterVegOnly
                      ? "border-secondary bg-secondary/20 text-secondary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🌱 Vegetarian Only
                </button>

                <button
                  onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    filterSpicyOnly
                      ? "border-destructive bg-destructive/20 text-destructive"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🌶️ Spicy Only
                </button>
              </div>
            </div>
          </div>

          {/* Custom Pizza Builder Callout Box */}
          <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-black">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground">
                  Looking for something completely custom?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Select your own dough, sauce, cheese, and farm vegetables in our interactive builder.
                </p>
              </div>
            </div>
            <Link href="/custom-builder">
              <Button className="h-9 px-5 rounded-xl bg-secondary hover:bg-secondary/90 text-black font-bold text-xs shrink-0">
                Open Pizza Builder
              </Button>
            </Link>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface p-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold">No items found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No items matched your current search and filter settings. Try clearing your filters or searching for something else.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFilterVegOnly(false);
                  setFilterSpicyOnly(false);
                }}
                variant="outline"
                className="text-xs"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <PizzaCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
