"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

export function HeroSection() {
  const { addItem } = useCartStore();
  const [activeCategory, setActiveCategory] = React.useState<string>("pizza");

  const categories = [
    { id: "all", label: "All menu" },
    { id: "pizza", label: "Pizza" },
    { id: "snacks", label: "Sides & Snacks" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Beverages" },
  ];

  const handleQuickAdd = (
    name: string,
    price: number,
    image: string,
    ingredients: string
  ) => {
    addItem({
      name,
      price,
      image,
      description: ingredients,
      quantity: 1,
      size: "12-inch Medium",
    });
    toast.success(`Added ${name} to your cart!`, {
      description: "Baked to perfection in our 450°C stone oven.",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#0D0E0D] text-[#F7F5EF] pt-4 pb-16 lg:pb-24 select-none">
      {/* 1. Ember Sparks Floating in Corners (Inspired by Reference Screenshot) */}
      <div className="ember-particle top-10 left-12 h-2 w-2" style={{ animationDelay: "0s" }} />
      <div className="ember-particle top-36 left-28 h-1.5 w-1.5" style={{ animationDelay: "1.2s" }} />
      <div className="ember-particle bottom-24 left-16 h-2 w-2" style={{ animationDelay: "2.4s" }} />
      <div className="ember-particle top-8 right-32 h-1.5 w-1.5" style={{ animationDelay: "0.8s" }} />
      <div className="ember-particle bottom-12 right-24 h-2.5 w-2.5" style={{ animationDelay: "1.8s" }} />

      {/* 2. Left Flank: Rustic Cutting Board with Fresh Tomatoes, Peppers, and Basil */}
      <div className="pointer-events-none absolute -left-20 sm:-left-16 md:-left-10 top-12 lg:top-20 z-10 w-48 sm:w-64 lg:w-80 h-72 sm:h-96 lg:h-[460px] opacity-90 transition-transform duration-700 hover:scale-105">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=700&auto=format&fit=crop&q=85"
            alt="Fresh tomatoes, chili peppers, and basil on dark wooden board"
            fill
            priority
            className="object-cover rounded-r-full shadow-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            sizes="(max-width: 640px) 190px, (max-width: 1024px) 250px, 320px"
          />
          {/* Subtle gradient feather to blend seamlessly with dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D0E0D]/90" />
        </div>
      </div>

      {/* 3. Bottom Right Flank: Fresh Floating Basil Leaves with Soft Shadow */}
      <div className="pointer-events-none absolute -bottom-8 -right-6 lg:-bottom-12 lg:-right-4 z-10 w-44 sm:w-56 lg:w-72 h-44 sm:h-56 lg:h-72 opacity-90">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=85"
            alt="Fresh aromatic basil leaves"
            fill
            className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            sizes="(max-width: 640px) 180px, 280px"
          />
        </div>
      </div>

      {/* Hero Canvas Grid */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-12 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[460px] lg:min-h-[520px] gap-8 lg:gap-4">
          {/* Left Column: Headline, Subtext, Glowing Orange CTA Button */}
          <div className="lg:col-span-6 xl:col-span-6 pl-0 sm:pl-16 md:pl-28 lg:pl-32 xl:pl-36 space-y-7 text-left">
            {/* Bold Headline (Exact Match: "Лучшая пицца в Гайсине" -> "The Best Pizza in Town") */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F7F5EF] leading-[1.08]">
                Best Pizza
              </h1>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F7F5EF] leading-[1.08]">
                in Town
              </h1>
            </div>

            {/* 2-Line Subtitle in Crisp Secondary Text */}
            <div className="space-y-1.5 text-xs sm:text-sm text-[#AAAFA5] font-normal leading-relaxed max-w-sm">
              <p>Baked & delivered. To your door in 30 mins!</p>
              <p className="text-[#8BBF55] font-medium">20% discount on your second pizza</p>
            </div>

            {/* THE FAMOUS GLOWING ORANGE BUTTON (Pixel-perfect recreation) */}
            <div className="pt-2">
              <Link href="/menu" className="inline-block cursor-pointer">
                <button
                  className="relative group cursor-pointer h-12 sm:h-13 px-8 sm:px-10 rounded-full bg-[#FF8A1F] hover:bg-[#F4770B] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 transform active:scale-95 shadow-[0_0_40px_10px_rgba(255,138,31,0.45)] hover:shadow-[0_0_55px_15px_rgba(255,138,31,0.6)]"
                >
                  <span className="relative z-10 font-black">EXPLORE MENU</span>
                  {/* Additional soft radiant aura blur */}
                  <span className="absolute inset-0 rounded-full bg-[#FF8A1F] blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Sliced Overhead Pizza with Concentric Green Radar Callouts */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center py-6">
            {/* Ambient Warm Underglow */}
            <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#FF8A1F]/15 blur-[90px] pointer-events-none" />

            <div className="relative w-[310px] h-[310px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px]">
              {/* Concentric Guide Arc Line (SVG overlay concentric with pizza edge) */}
              <svg
                className="absolute -inset-4 sm:-inset-6 lg:-inset-8 w-[calc(100%+32px)] sm:w-[calc(100%+48px)] lg:w-[calc(100%+64px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] lg:h-[calc(100%+64px)] pointer-events-none z-10"
                viewBox="0 0 500 500"
                fill="none"
              >
                {/* Thin delicate guide arc */}
                <path
                  d="M 250 30 A 220 220 0 0 0 35 320"
                  stroke="#8BBF55"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                  strokeDasharray="4 3"
                />
              </svg>

              {/* Pizza Image with Real Slices Cut */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 border-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=950&auto=format&fit=crop&q=85"
                  alt="Wood-Fired Artisanal Pizza cut into slices"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 310px, (max-width: 1024px) 420px, 460px"
                />
              </div>

              {/* 4 Green Pointer Indicators (Matching the Russian text in screenshot translated to English) */}

              {/* Dot 1: Top ("Только свежие продукты" -> "Only fresh ingredients") */}
              <div className="absolute -top-3 left-6 sm:top-2 sm:-left-4 z-20 flex items-center gap-2 group cursor-pointer">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#8BBF55]/30 ring-2 ring-[#8BBF55] animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8BBF55]" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#F7F5EF] bg-[#171816]/90 border border-white/10 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
                  Only fresh ingredients
                </span>
              </div>

              {/* Dot 2: Upper Mid ("Бесплатная доставка" -> "Free 30-min delivery") */}
              <div className="absolute top-28 -left-8 sm:top-36 sm:-left-12 z-20 flex items-center gap-2 group cursor-pointer">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#8BBF55]/30 ring-2 ring-[#8BBF55]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8BBF55]" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#F7F5EF] bg-[#171816]/90 border border-white/10 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
                  Free 30-min delivery
                </span>
              </div>

              {/* Dot 3: Lower Mid ("Напиток в подарок" -> "Craft soda as a gift") */}
              <div className="absolute top-56 -left-6 sm:top-68 sm:-left-10 z-20 flex items-center gap-2 group cursor-pointer">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#8BBF55]/30 ring-2 ring-[#8BBF55]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8BBF55]" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#F7F5EF] bg-[#171816]/90 border border-white/10 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
                  Craft soda as a gift
                </span>
              </div>

              {/* Dot 4: Bottom ("Эксклюзивные рецепты" -> "Exclusive 48h recipes") */}
              <div className="absolute -bottom-2 left-4 sm:bottom-4 sm:-left-2 z-20 flex items-center gap-2 group cursor-pointer">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#8BBF55]/30 ring-2 ring-[#8BBF55]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8BBF55]" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#F7F5EF] bg-[#171816]/90 border border-white/10 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
                  Exclusive 48h recipe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Category Filter Pills Bar (Centered exactly as in screenshot) */}
        <div className="mt-10 sm:mt-14 flex items-center justify-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap px-4 py-1.5 rounded-full ${
                  isActive
                    ? "border border-[#8BBF55] text-[#F7F5EF] bg-transparent shadow-[0_0_15px_rgba(139,191,85,0.2)]"
                    : "text-[#AAAFA5] hover:text-[#F7F5EF] border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 5. Bottom Preview Cards (Exact Match to Pepperoni and Carbonara in the Screenshot) */}
        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {/* Card 1: Pepperoni */}
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#171816] p-4 sm:p-5 shadow-2xl hover:border-white/20 transition-all duration-300 w-full sm:w-[360px] md:w-[380px]">
            {/* Round Pizza Plate */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-full border-2 border-white/10 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop&q=80"
                alt="Pepperoni pizza"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1.5">
              <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                Pepperoni
              </h3>
              <p className="text-[11px] text-[#AAAFA5] line-clamp-2 leading-tight">
                Mozzarella, sausage, tomatoes, oregano, chili
              </p>
              <div className="pt-1">
                <span className="font-heading text-sm sm:text-base font-extrabold text-white">
                  $14.50 <span className="text-[10px] text-[#AAAFA5] font-normal">/ 120 грн</span>
                </span>
              </div>
              <button
                onClick={() =>
                  handleQuickAdd(
                    "Pepperoni",
                    14.5,
                    "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop&q=80",
                    "Mozzarella, sausage, tomatoes, oregano, chili"
                  )
                }
                className="w-full mt-2 h-8 rounded-full bg-[#FF8A1F] hover:bg-[#F4770B] text-black font-extrabold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_18px_rgba(255,138,31,0.35)] active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Card 2: Carbonara */}
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#171816] p-4 sm:p-5 shadow-2xl hover:border-white/20 transition-all duration-300 w-full sm:w-[360px] md:w-[380px]">
            {/* Round Pizza Plate */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-full border-2 border-white/10 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1573821663912-569905455b1c?w=400&auto=format&fit=crop&q=80"
                alt="Carbonara pizza"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1.5">
              <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                Carbonara
              </h3>
              <p className="text-[11px] text-[#AAAFA5] line-clamp-2 leading-tight">
                Mozzarella, cured bacon, tomatoes, oregano, farm egg
              </p>
              <div className="pt-1">
                <span className="font-heading text-sm sm:text-base font-extrabold text-white">
                  $13.50 <span className="text-[10px] text-[#AAAFA5] font-normal">/ 110 грн</span>
                </span>
              </div>
              <button
                onClick={() =>
                  handleQuickAdd(
                    "Carbonara",
                    13.5,
                    "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=400&auto=format&fit=crop&q=80",
                    "Mozzarella, cured bacon, tomatoes, oregano, farm egg"
                  )
                }
                className="w-full mt-2 h-8 rounded-full bg-[#FF8A1F] hover:bg-[#F4770B] text-black font-extrabold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_18px_rgba(255,138,31,0.35)] active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
