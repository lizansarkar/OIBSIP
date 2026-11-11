"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@workspace/ui/components/button";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    getItemCount,
  } = useCartStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className="relative z-50 flex h-full w-full max-w-md flex-col bg-surface border-l border-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Your Order</h2>
              <p className="text-xs text-muted-foreground">
                {itemCount} {itemCount === 1 ? "item" : "items"} in cart
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Delivery Progress */}
        <div className="bg-surface-elevated px-5 py-3 border-b border-border">
          {subtotal >= 40 ? (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
              <Sparkles className="h-3.5 w-3.5" /> You unlocked FREE delivery!
            </p>
          ) : (
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Add ${(40 - subtotal).toFixed(2)} more for FREE delivery</span>
                <span>{Math.min(100, Math.round((subtotal / 40) * 100))}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 40) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Your cart is empty
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                Explore our handcrafted wood-fired pizzas or customize your own masterpiece.
              </p>
              <Button
                onClick={closeCart}
                className="mt-2 bg-primary text-black hover:bg-primary-hover font-semibold rounded-xl"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl border border-border bg-surface-elevated/40 p-3.5 transition-all hover:border-border/80"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-foreground leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs text-secondary font-medium mt-0.5">
                        {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {item.customization && (
                    <div className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
                      {item.customization.base.name} · {item.customization.sauce.name} ·{" "}
                      {item.customization.cheese.name}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                    <span className="font-heading text-sm font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-semibold text-foreground min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3 bg-surface">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Charge</span>
                <span className="font-medium text-foreground">
                  {deliveryFee === 0 ? (
                    <span className="text-secondary font-semibold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                <span>Total Amount</span>
                <span className="font-heading text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" onClick={closeCart} className="block w-full">
              <Button className="w-full h-12 bg-primary hover:bg-primary-hover text-black font-bold rounded-xl amber-glow-sm flex items-center justify-center gap-2">
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
