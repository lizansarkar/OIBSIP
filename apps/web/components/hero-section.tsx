"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Flame,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:py-20 lg:py-24">
      {/* Background Ember Glow Atmosphere */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />

      {/* Decorative Garnish: Left Rustic Flank (Inspired by Reference Screenshot) */}
      <div className="pointer-events-none absolute -left-16 top-1/4 hidden lg:block opacity-65 xl:opacity-85 transition-transform hover:scale-105">
        <div className="relative h-72 w-52 overflow-hidden rounded-r-3xl shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=500&auto=format&fit=crop&q=80"
            alt="Fresh heirloom ingredients on rustic board"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Flame className="h-4 w-4" />
              <span>Wood-Fired at 450°C · 48h Fermented Dough</span>
            </div>

            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08]">
              The Art of{" "}
              <span className="relative inline-block text-primary">
                Perfect Pizza
                <span className="absolute left-0 -bottom-1 h-1 w-full rounded-full bg-primary/40 blur-[2px]" />
              </span>
              .
            </h1>

            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed max-w-xl">
              Baked in authentic Italian stone ovens with organic certified flour,
              heirloom San Marzano tomatoes, and artisanal fior di latte.
              Delivered piping hot within 30 minutes.
            </p>

            {/* Special Promo Banner */}
            <div className="flex items-center gap-3 rounded-2xl border border-secondary/30 bg-secondary/10 p-3.5 max-w-lg">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-black font-bold text-xs">
                20% OFF
              </div>
              <div className="text-xs">
                <span className="font-bold text-foreground block">
                  Limited Time Welcome Offer
                </span>
                <span className="text-muted-foreground">
                  Use promo code{" "}
                  <code className="text-secondary font-mono font-bold bg-secondary/20 px-1 py-0.5 rounded">
                    CRUST20
                  </code>{" "}
                  at checkout for 20% off your entire order.
                </span>
              </div>
            </div>

            {/* Action Buttons (Glowing Amber Button matching screenshot) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/menu">
                <Button className="h-13 px-8 rounded-2xl bg-primary hover:bg-primary-hover text-black font-extrabold text-base amber-glow transition-all active:scale-95 flex items-center gap-2.5">
                  <span>Explore Our Menu</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/custom-builder">
                <Button
                  variant="outline"
                  className="h-13 px-7 rounded-2xl border-border bg-surface hover:bg-surface-elevated text-foreground font-bold text-base transition-all active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Build Your Pizza</span>
                </Button>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60 max-w-lg">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-foreground">
                  Award Winning
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary shrink-0" />
                <span className="text-xs font-semibold text-foreground">
                  30 Min Delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-warning shrink-0" />
                <span className="text-xs font-semibold text-foreground">
                  100% Organic
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Wood-Fired Pizza with Interactive Radial Callouts */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center">
            {/* Ambient circular glow */}
            <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-primary/20 blur-[80px]" />

            <div className="relative h-[320px] w-[320px] sm:h-[440px] sm:w-[440px] md:h-[480px] md:w-[480px] animate-in fade-in zoom-in duration-700">
              <Image
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop&q=80"
                alt="Signature Wood-Fired Artisanal Pizza"
                fill
                priority
                className="object-cover rounded-full shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-white/5"
                sizes="(max-width: 640px) 320px, (max-width: 768px) 440px, 480px"
              />

              {/* Interactive Callout 1 (Top Left) */}
              <div className="absolute top-4 -left-4 sm:top-8 sm:-left-8 z-10 flex items-center gap-2 rounded-full border border-secondary/40 bg-surface/90 px-3.5 py-1.5 backdrop-blur-md shadow-xl transition-transform hover:scale-105">
                <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-ping" />
                <span className="text-xs font-bold text-foreground">
                  48h Cold Fermented Sourdough
                </span>
              </div>

              {/* Interactive Callout 2 (Middle Left) */}
              <div className="absolute top-1/2 -left-6 sm:-left-12 -translate-y-1/2 z-10 flex items-center gap-2 rounded-full border border-secondary/40 bg-surface/90 px-3.5 py-1.5 backdrop-blur-md shadow-xl transition-transform hover:scale-105">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                <span className="text-xs font-bold text-foreground">
                  San Marzano Heirloom Sauce
                </span>
              </div>

              {/* Interactive Callout 3 (Bottom Left) */}
              <div className="absolute bottom-10 -left-2 sm:bottom-14 sm:-left-6 z-10 flex items-center gap-2 rounded-full border border-secondary/40 bg-surface/90 px-3.5 py-1.5 backdrop-blur-md shadow-xl transition-transform hover:scale-105">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                <span className="text-xs font-bold text-foreground">
                  Fior di Latte & Buffalo Mozzarella
                </span>
              </div>

              {/* Interactive Callout 4 (Bottom Right) */}
              <div className="absolute -bottom-4 right-6 sm:bottom-4 sm:right-0 z-10 flex items-center gap-2 rounded-full border border-primary/40 bg-surface/90 px-3.5 py-1.5 backdrop-blur-md shadow-xl transition-transform hover:scale-105">
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-xs font-bold text-foreground">
                  Stone Oven Baked at 450°C
                </span>
              </div>
            </div>

            {/* Decorative Garnish: Floating Basil Leaf (Bottom Right of Screenshot) */}
            <div className="pointer-events-none absolute -bottom-10 right-0 hidden sm:block opacity-75">
              <div className="relative h-20 w-20">
                <Image
                  src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=200&auto=format&fit=crop&q=80"
                  alt="Fresh basil garnish"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
