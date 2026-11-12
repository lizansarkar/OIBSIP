"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { SAMPLE_PRODUCTS } from "@workspace/shared";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { PizzaCard } from "@/components/pizza-card";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Sparkles,
  Flame,
  ChefHat,
  Truck,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categories = [
    { id: "all", label: "All Menu" },
    { id: "pizza", label: "Signature Pizzas" },
    { id: "sides", label: "Appetizers & Sides" },
    { id: "desserts", label: "Artisanal Desserts" },
    { id: "beverages", label: "Craft Beverages" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col bg-[#0D0E0D] text-[#F7F5EF]">
      <Header />
      <CartSheet />

      <main className="flex-1">
        {/* 1. Exact Visual Recreation of Reference Mockup */}
        <HeroSection />

        {/* 2. Full Menu Showcase Section */}
        <section id="menu" className="container mx-auto px-4 py-16 sm:px-6 lg:px-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                <Flame className="h-4 w-4" /> Fresh Out of The Oven
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
                Our Signature Creations
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-black shadow-md shadow-primary/20 scale-105"
                        : "border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <PizzaCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 3. Interactive Custom Pizza Builder Banner */}
        <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-surface to-surface-elevated p-8 md:p-12 shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="warning" className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Unleash Your Inner Pizzaiolo
                </Badge>
                <h3 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
                  Build Your Own Custom Pizza
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Choose from 5 artisanal dough bases (including 48h living sourdough & four-cheese stuffed crust), 5 signature sauces, imported Italian cheeses, and over 15 gourmet farm-fresh vegetables and meats.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/custom-builder" className="cursor-pointer">
                    <Button className="h-12 px-7 rounded-xl bg-primary hover:bg-primary-hover text-black font-extrabold text-sm amber-glow-sm cursor-pointer">
                      Open Custom Pizza Builder
                    </Button>
                  </Link>
                  <Link href="/menu" className="cursor-pointer">
                    <Button variant="outline" className="h-12 px-6 rounded-xl border-border bg-surface text-sm font-semibold cursor-pointer">
                      See Preset Pizzas
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                  <Image
                    src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&auto=format&fit=crop&q=80"
                    alt="Custom pizza toppings"
                    fill
                    className="object-cover rounded-2xl shadow-2xl border-2 border-border/60"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works (The 3-Step Process) */}
        <section className="border-t border-border/80 bg-surface/40 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Uncompromising Quality
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl mt-1">
                How We Deliver Perfection
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-3xl border border-border bg-surface p-6 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ChefHat className="h-7 w-7" />
                </div>
                <h4 className="font-heading text-lg font-bold">1. Handcrafted Dough</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cold-fermented for 48 hours for maximum digestibility, delicate blistered air pockets, and authentic Neapolitan flavor.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-surface p-6 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Flame className="h-7 w-7" />
                </div>
                <h4 className="font-heading text-lg font-bold">2. 450°C Stone Oven</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Baked in our custom Italian stone-deck ovens in under 90 seconds to lock in moisture, bubbling cheese, and smoky char.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-surface p-6 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10 text-warning">
                  <Truck className="h-7 w-7" />
                </div>
                <h4 className="font-heading text-lg font-bold">3. Thermal 30-Min Delivery</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dispatched in heated thermal containment boxes so your crust arrives piping hot and delightfully crispy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Customer Testimonials */}
        <section id="reviews" className="container mx-auto px-4 py-16 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Community Love
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl mt-1">
              What Our Pizza Lovers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Marcus Vance",
                role: "Food Critic & Sommelier",
                comment:
                  "Hands down the best crust in the city. The cold fermentation gives it an incredible tangy aroma and the truffle carbonara pizza is pure heaven.",
                rating: 5,
              },
              {
                name: "Sophia Rossi",
                role: "Italian Cuisine Enthusiast",
                comment:
                  "As someone raised in Naples, I am very picky about my Margherita. CRUST & CO. nails the San Marzano sweetness and fior di latte melt flawlessly.",
                rating: 5,
              },
              {
                name: "David Chen",
                role: "Verified Customer",
                comment:
                  "Arrived in 24 minutes, steaming hot. The custom pizza builder is so intuitive and let me choose exactly the cheese blend and veggies I wanted.",
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-border bg-surface p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center gap-1 text-warning">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning stroke-warning" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "{t.comment}"
                </p>
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {t.role}
                    </span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
