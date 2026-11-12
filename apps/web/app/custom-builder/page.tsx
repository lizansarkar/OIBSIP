"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BUILDER_OPTIONS, PizzaSize } from "@workspace/shared";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartSheet } from "@/components/cart-sheet";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Sparkles,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Flame,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export default function CustomPizzaBuilderPage() {
  const { addItem } = useCartStore();

  // Customization State
  const [selectedSize, setSelectedSize] = React.useState<PizzaSize>(
    PizzaSize.MEDIUM
  );
  const [selectedBase, setSelectedBase] = React.useState(
    BUILDER_OPTIONS.bases[0]!
  );
  const [selectedSauce, setSelectedSauce] = React.useState(
    BUILDER_OPTIONS.sauces[0]!
  );
  const [selectedCheese, setSelectedCheese] = React.useState(
    BUILDER_OPTIONS.cheeses[0]!
  );
  const [selectedVeggies, setSelectedVeggies] = React.useState<
    Array<(typeof BUILDER_OPTIONS.vegetables)[0]>
  >([BUILDER_OPTIONS.vegetables[0]!, BUILDER_OPTIONS.vegetables[1]!]);
  const [selectedMeats, setSelectedMeats] = React.useState<
    Array<(typeof BUILDER_OPTIONS.meats)[0]>
  >([]);
  const [quantity, setQuantity] = React.useState(1);

  // Toggle multi-select vegetable
  const toggleVeggie = (veg: (typeof BUILDER_OPTIONS.vegetables)[0]) => {
    if (selectedVeggies.some((v) => v.id === veg.id)) {
      setSelectedVeggies(selectedVeggies.filter((v) => v.id !== veg.id));
    } else {
      setSelectedVeggies([...selectedVeggies, veg]);
    }
  };

  // Toggle multi-select meat
  const toggleMeat = (meat: (typeof BUILDER_OPTIONS.meats)[0]) => {
    if (selectedMeats.some((m) => m.id === meat.id)) {
      setSelectedMeats(selectedMeats.filter((m) => m.id !== meat.id));
    } else {
      setSelectedMeats([...selectedMeats, meat]);
    }
  };

  // Dynamic Price Calculation
  const sizeMultiplier =
    selectedSize === PizzaSize.SMALL
      ? 0.8
      : selectedSize === PizzaSize.LARGE
      ? 1.25
      : 1.0;

  const ingredientsSum =
    selectedBase.price +
    selectedSauce.price +
    selectedCheese.price +
    selectedVeggies.reduce((sum, v) => sum + v.price, 0) +
    selectedMeats.reduce((sum, m) => sum + m.price, 0);

  const unitPrice = ingredientsSum * sizeMultiplier;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!selectedBase || !selectedSauce || !selectedCheese) {
      toast.error("Please select a base, sauce, and cheese!");
      return;
    }

    addItem({
      name: `Custom ${selectedBase.name.split(" ")[0]} Pizza`,
      description: `${selectedSauce.name}, ${selectedCheese.name}, with ${selectedVeggies.length} veggies & ${selectedMeats.length} meats`,
      image: selectedBase.image || "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&auto=format&fit=crop&q=80",
      price: unitPrice,
      quantity,
      size: selectedSize,
      isCustom: true,
      customization: {
        base: selectedBase,
        sauce: selectedSauce,
        cheese: selectedCheese,
        vegetables: [...selectedVeggies, ...selectedMeats],
      },
    });

    toast.success("Custom creation added to cart!", {
      description: `${selectedSize} · Total: $${totalPrice.toFixed(2)}`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <CartSheet />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="warning" className="gap-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> Interactive Studio
            </Badge>
            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">
              Build Your Dream Pizza
            </h1>
            <p className="text-sm text-muted-foreground">
              Select your artisanal dough, secret sauce, imported cheese, and farm-fresh toppings.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            {/* Left 8 Cols: Step By Step Selection */}
            <div className="lg:col-span-8 space-y-8">
              {/* Step 1: Size */}
              <section className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">
                    1. Choose Pizza Size
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Required
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { size: PizzaSize.SMALL, label: "10-inch Small", desc: "6 slices (1-2 people)" },
                    { size: PizzaSize.MEDIUM, label: "12-inch Medium", desc: "8 slices (2-3 people)" },
                    { size: PizzaSize.LARGE, label: "14-inch Large", desc: "10 slices (3-4 people)" },
                  ].map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        selectedSize === s.size
                          ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary"
                          : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground">
                          {s.label}
                        </span>
                        {selectedSize === s.size && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {s.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Step 2: Bases (Min 5 Options) */}
              <section className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">
                    2. Select Artisanal Base (5 Handcrafted Options)
                  </h3>
                  <span className="text-xs text-muted-foreground">Select 1</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {BUILDER_OPTIONS.bases.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <button
                        key={base.id}
                        onClick={() => setSelectedBase(base)}
                        className={`flex gap-3 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary"
                            : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                        }`}
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                          <Image
                            src={base.image}
                            alt={base.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground">
                              {base.name}
                            </span>
                            <span className="text-xs font-bold text-primary">
                              ${base.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                            {base.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 3: Sauces (Min 5 Options) */}
              <section className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">
                    3. Signature Sauce (5 Crafted Sauces)
                  </h3>
                  <span className="text-xs text-muted-foreground">Select 1</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {BUILDER_OPTIONS.sauces.map((sauce) => {
                    const isSelected = selectedSauce.id === sauce.id;
                    return (
                      <button
                        key={sauce.id}
                        onClick={() => setSelectedSauce(sauce)}
                        className={`rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary"
                            : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">
                            {sauce.name}
                          </span>
                          <span className="text-xs font-semibold text-primary">
                            +${sauce.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                          {sauce.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 4: Cheese Selection */}
              <section className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">
                    4. Artisan Cheese Blend
                  </h3>
                  <span className="text-xs text-muted-foreground">Select 1</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {BUILDER_OPTIONS.cheeses.map((cheese) => {
                    const isSelected = selectedCheese.id === cheese.id;
                    return (
                      <button
                        key={cheese.id}
                        onClick={() => setSelectedCheese(cheese)}
                        className={`rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary"
                            : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">
                            {cheese.name}
                          </span>
                          <span className="text-xs font-semibold text-primary">
                            +${cheese.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                          {cheese.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 5: Farm Vegetables (Multi-Select) */}
              <section className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">
                    5. Farm-Fresh Vegetables
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Multi-select ({selectedVeggies.length} selected)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {BUILDER_OPTIONS.vegetables.map((veg) => {
                    const isSelected = selectedVeggies.some((v) => v.id === veg.id);
                    return (
                      <button
                        key={veg.id}
                        onClick={() => toggleVeggie(veg)}
                        className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-secondary bg-secondary/15 ring-1 ring-secondary"
                            : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-foreground truncate">
                            {veg.name}
                          </span>
                          {isSelected && <Check className="h-3 w-3 text-secondary shrink-0" />}
                        </div>
                        <span className="text-[11px] text-muted-foreground block mt-1">
                          +${veg.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 6: Gourmet Meats & Extras */}
              <section className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">
                    6. Gourmet Meats (Optional)
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Multi-select ({selectedMeats.length} selected)
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {BUILDER_OPTIONS.meats.map((meat) => {
                    const isSelected = selectedMeats.some((m) => m.id === meat.id);
                    return (
                      <button
                        key={meat.id}
                        onClick={() => toggleMeat(meat)}
                        className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/15 ring-1 ring-primary"
                            : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-foreground truncate">
                            {meat.name}
                          </span>
                          {isSelected && <Check className="h-3 w-3 text-primary shrink-0" />}
                        </div>
                        <span className="text-[11px] text-muted-foreground block mt-1">
                          +${meat.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right 4 Cols: Live Order Summary Sticky Card */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="rounded-3xl border border-border bg-surface p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h3 className="font-heading text-lg font-bold">
                    Live Pizza Summary
                  </h3>
                  <Badge variant="warning" className="text-[10px]">
                    Custom Built
                  </Badge>
                </div>

                {/* Selected Layers Stack */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-semibold">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base</span>
                    <span className="font-semibold">{selectedBase.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sauce</span>
                    <span className="font-semibold">{selectedSauce.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cheese</span>
                    <span className="font-semibold">{selectedCheese.name}</span>
                  </div>

                  {selectedVeggies.length > 0 && (
                    <div className="pt-2 border-t border-border/60">
                      <span className="text-muted-foreground block mb-1">
                        Vegetables ({selectedVeggies.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedVeggies.map((v) => (
                          <span
                            key={v.id}
                            className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-md text-[10px] font-semibold"
                          >
                            {v.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMeats.length > 0 && (
                    <div className="pt-2 border-t border-border/60">
                      <span className="text-muted-foreground block mb-1">
                        Meats ({selectedMeats.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedMeats.map((m) => (
                          <span
                            key={m.id}
                            className="bg-primary/15 text-primary px-2 py-0.5 rounded-md text-[10px] font-semibold"
                          >
                            {m.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity & Total */}
                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Quantity</span>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-2 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-xs font-bold min-w-5 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      Calculated Total
                    </span>
                    <span className="font-heading text-2xl font-extrabold text-primary">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-black font-extrabold text-sm amber-glow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add Custom Pizza to Cart</span>
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    Prices are securely verified on the server upon checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
