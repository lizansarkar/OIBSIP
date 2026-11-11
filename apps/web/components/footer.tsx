"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full border-t border-border bg-surface text-foreground mt-auto">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-border bg-surface-elevated/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold">450°C Stone Oven</h4>
                <p className="text-xs text-muted-foreground">
                  Blistered Neapolitan wood-fired crust
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold">30-Min Fast Delivery</h4>
                <p className="text-xs text-muted-foreground">
                  Insulated thermal carriers right to your doorstep
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-success/10 text-success">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold">100% Organic Produce</h4>
                <p className="text-xs text-muted-foreground">
                  San Marzano tomatoes & fior di latte
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-warning/10 text-warning">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Handcrafted Daily</h4>
                <p className="text-xs text-muted-foreground">
                  48-hour cold fermented living sourdough
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-black shadow-md shadow-primary/20">
                <Flame className="h-5 w-5 fill-black stroke-black" />
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight">
                CRUST <span className="text-primary">&</span> CO.
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Artisanal stone-baked pizzeria dedicated to culinary excellence. Handcrafted dough, premium imported cheeses, and heirloom Italian toppings delivered fresh and piping hot.
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>482 Artisan Way, Culinary District, Metro NY</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-secondary" />
                <span>+1 (800) 692-1574 / +1 (800) CRUST-CO</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-warning" />
                <span>orders@crustandco.com</span>
              </div>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h5 className="font-heading text-sm font-bold mb-4">Our Menu</h5>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/menu" className="hover:text-primary transition-colors">
                  Signature Pizzas
                </Link>
              </li>
              <li>
                <Link href="/custom-builder" className="hover:text-primary transition-colors">
                  Custom Pizza Builder
                </Link>
              </li>
              <li>
                <Link href="/menu?category=sides" className="hover:text-primary transition-colors">
                  Appetizers & Sides
                </Link>
              </li>
              <li>
                <Link href="/menu?category=desserts" className="hover:text-primary transition-colors">
                  Artisanal Desserts
                </Link>
              </li>
              <li>
                <Link href="/menu?category=beverages" className="hover:text-primary transition-colors">
                  Craft Sodas & Drinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="font-heading text-sm font-bold mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/orders" className="hover:text-primary transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-primary transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Customer Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-secondary hover:underline font-semibold">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <a href="#reviews" className="hover:text-primary transition-colors">
                  Customer Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h5 className="font-heading text-sm font-bold mb-4">Secret VIP Club</h5>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Get secret chef specials, secret crust drops, and 20% off your first delivery.
            </p>
            {subscribed ? (
              <div className="rounded-xl border border-secondary/40 bg-secondary/10 p-3 text-xs text-secondary font-medium">
                🎉 Welcome to CRUST & CO. VIP Club! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary hover:bg-primary-hover px-3 py-2 text-xs font-bold text-black transition-colors"
                >
                  Join VIP Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 CRUST & CO. Artisanal Pizza. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-medium text-foreground">
              Oasis Infobyte Internship — Level 3 Web Development Project
            </span>
            <span>·</span>
            <Link href="/admin" className="hover:text-primary">
              Admin Gateway
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
