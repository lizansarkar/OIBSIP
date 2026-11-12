"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@workspace/shared";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Plus, Star, Sparkles, Flame, Check } from "lucide-react";
import { toast } from "sonner";

interface PizzaCardProps {
  product: ProductItem;
}

export function PizzaCard({ product }: PizzaCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.basePrice,
      quantity: 1,
      size: "12-inch Medium",
    });

    setAdded(true);
    toast.success(`Added ${product.name} to cart!`, {
      description: "12-inch Medium · Stone-baked to order",
    });

    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col pt-16">
      {/* Elevated Card Background */}
      <div className="relative flex flex-1 flex-col rounded-3xl border border-border bg-surface p-5 pt-20 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Popping Out Round Pizza Image (Inspired by reference screenshot) */}
        <Link
          href={`/menu/${product.slug}`}
          className="absolute -top-14 left-1/2 -translate-x-1/2 block cursor-pointer"
        >
          <div className="relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-2 border-border/60 bg-muted/20 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 130px, 150px"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="flex items-center justify-between mb-2">
          {product.isChefSpecial ? (
            <Badge variant="warning" className="gap-1 text-[10px]">
              <Sparkles className="h-3 w-3" /> Chef's Pick
            </Badge>
          ) : product.isPopular ? (
            <Badge variant="default" className="gap-1 text-[10px] bg-primary text-black">
              <Flame className="h-3 w-3" /> Best Seller
            </Badge>
          ) : (
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              {product.category}
            </span>
          )}

          <div className="flex items-center gap-1 text-xs font-semibold text-warning">
            <Star className="h-3.5 w-3.5 fill-warning stroke-warning" />
            <span>{product.rating}</span>
            <span className="text-muted-foreground text-[10px]">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <Link href={`/menu/${product.slug}`} className="block group-hover:text-primary transition-colors cursor-pointer">
          <h3 className="font-heading text-lg font-bold text-foreground leading-snug">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {product.ingredients.join(", ")}
        </p>

        {/* Footer: Price & Add To Cart Button */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-border/60">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
              Starting from
            </span>
            <span className="font-heading text-xl font-extrabold text-foreground">
              ${product.basePrice.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            className={`h-10 px-4 rounded-xl font-bold transition-all cursor-pointer ${
              added
                ? "bg-success text-white"
                : "bg-primary hover:bg-primary-hover text-black amber-glow-sm active:scale-95"
            }`}
          >
            {added ? (
              <span className="flex items-center gap-1 text-xs">
                <Check className="h-4 w-4" /> Added
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs">
                <Plus className="h-4 w-4 stroke-[2.5]" /> Add
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
