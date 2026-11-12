"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Badge } from "@workspace/ui/components/badge";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDeliveryFee,
  } = useCartStore();

  const [promoCode, setPromoCode] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "CRUST20") {
      setDiscountPercent(20);
      toast.success("Promo code CRUST20 applied! 20% discount unlocked.");
    } else {
      toast.error("Invalid promo code. Try 'CRUST20' for 20% off.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Menu
              </Link>
              <h1 className="font-heading text-3xl font-extrabold sm:text-4xl">
                Your Shopping Cart
              </h1>
            </div>

            {items.length > 0 && (
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive cursor-pointer"
              >
                Clear Cart
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface p-12 text-center space-y-4 max-w-md mx-auto">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h2 className="font-heading text-xl font-bold">
                Your cart is currently empty
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You haven't added any pizzas or sides yet. Discover our artisanal wood-fired specialties.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Link href="/menu" className="cursor-pointer">
                  <Button className="bg-primary hover:bg-primary-hover text-black font-bold text-xs rounded-xl cursor-pointer">
                    Explore Menu
                  </Button>
                </Link>
                <Link href="/custom-builder" className="cursor-pointer">
                  <Button variant="outline" className="text-xs rounded-xl cursor-pointer">
                    Build Custom Pizza
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
              {/* Item List (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-3xl border border-border bg-surface p-4 sm:p-5 shadow-sm transition-all hover:border-border/80"
                  >
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 112px"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading text-base font-bold text-foreground">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-xs text-secondary font-semibold block mt-0.5">
                          {item.size}
                        </span>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-2">
                        <span className="font-heading text-base font-extrabold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs font-bold min-w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Checkout Card (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-3xl border border-border bg-surface p-6 shadow-xl space-y-5">
                  <h3 className="font-heading text-lg font-bold">
                    Order Summary
                  </h3>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Promo Code (CRUST20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-8 text-xs uppercase"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      className="text-xs font-bold px-3 shrink-0"
                    >
                      Apply
                    </Button>
                  </form>

                  {discountPercent > 0 && (
                    <div className="rounded-xl border border-secondary/40 bg-secondary/10 p-2.5 text-xs text-secondary font-semibold flex items-center justify-between">
                      <span>CRUST20 Discount Applied</span>
                      <span>-20%</span>
                    </div>
                  )}

                  {/* Calculations Breakdown */}
                  <div className="space-y-2 text-xs border-t border-border pt-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-medium text-foreground">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-secondary">
                        <span>Discount (20%)</span>
                        <span className="font-medium">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-foreground">
                        {deliveryFee === 0 ? (
                          <span className="text-secondary font-bold">FREE</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-foreground border-t border-border pt-3">
                      <span>Total Amount</span>
                      <span className="font-heading text-xl text-primary font-extrabold">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block w-full cursor-pointer">
                    <Button className="w-full h-12 bg-primary hover:bg-primary-hover text-black font-extrabold text-sm rounded-xl amber-glow-sm flex items-center justify-center gap-2 cursor-pointer">
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-secondary" />
                    <span>Razorpay Secure Test Checkout · 100% Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
