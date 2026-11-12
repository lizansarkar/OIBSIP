"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { SAMPLE_PRODUCTS, PizzaSize } from "@workspace/shared";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartSheet } from "@/components/cart-sheet";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Star,
  Plus,
  Minus,
  ArrowLeft,
  Flame,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

export default function PizzaDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = React.useState<PizzaSize>(
    PizzaSize.MEDIUM
  );
  const [quantity, setQuantity] = React.useState(1);

  // Price adjustment based on size
  const sizeMultiplier =
    selectedSize === PizzaSize.SMALL
      ? 0.8
      : selectedSize === PizzaSize.LARGE
      ? 1.25
      : 1.0;

  const unitPrice = product.basePrice * sizeMultiplier;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: unitPrice,
      quantity,
      size: selectedSize,
    });

    toast.success(`Added ${quantity}x ${product.name} to cart!`, {
      description: `${selectedSize} · Total: $${totalPrice.toFixed(2)}`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <CartSheet />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Back link */}
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Full Menu</span>
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            {/* Left: Product Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] overflow-hidden rounded-full border-4 border-border shadow-2xl bg-surface">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 320px, 420px"
                />
              </div>
            </div>

            {/* Right: Info & Selectors */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                {product.isChefSpecial && (
                  <Badge variant="warning" className="gap-1 text-xs">
                    <Sparkles className="h-3 w-3" /> Chef's Signature
                  </Badge>
                )}
                {product.isPopular && (
                  <Badge variant="default" className="gap-1 text-xs bg-primary text-black">
                    <Flame className="h-3 w-3" /> Best Seller
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-xs font-semibold text-warning">
                  <Star className="h-3.5 w-3.5 fill-warning stroke-warning" />
                  <span>{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <div>
                <h1 className="font-heading text-3xl font-extrabold sm:text-4xl text-foreground">
                  {product.name}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Ingredients List */}
              <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Artisanal Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-elevated px-2.5 py-1 text-xs text-foreground"
                    >
                      <CheckCircle2 className="h-3 w-3 text-secondary" />
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              {product.category === "pizza" && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Select Size
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { size: PizzaSize.SMALL, label: "10-Inch Small", slices: "6 Slices" },
                      { size: PizzaSize.MEDIUM, label: "12-Inch Medium", slices: "8 Slices" },
                      { size: PizzaSize.LARGE, label: "14-Inch Large", slices: "10 Slices" },
                    ].map((item) => (
                      <button
                        key={item.size}
                        onClick={() => setSelectedSize(item.size)}
                        className={`rounded-2xl border p-3 text-center transition-all cursor-pointer ${
                          selectedSize === item.size
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-border bg-surface hover:bg-surface-elevated"
                        }`}
                      >
                        <span className="block text-xs font-bold text-foreground">
                          {item.label}
                        </span>
                        <span className="block text-[11px] text-muted-foreground mt-0.5">
                          {item.slices}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      Total Price
                    </span>
                    <span className="font-heading text-3xl font-extrabold text-primary">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-elevated hover:text-foreground cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-heading text-sm font-bold min-w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-elevated hover:text-foreground cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover text-black font-extrabold text-sm amber-glow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Cart (${totalPrice.toFixed(2)})</span>
                  </Button>

                  <Link href="/custom-builder" className="cursor-pointer">
                    <Button
                      variant="outline"
                      className="h-12 rounded-xl border-border bg-surface text-xs font-semibold px-4 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4 mr-1 text-primary" />
                      Customize in Builder
                    </Button>
                  </Link>
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
