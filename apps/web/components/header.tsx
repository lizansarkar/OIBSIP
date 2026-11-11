"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@workspace/ui/components/button";
import {
  PhoneCall,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  User,
  Flame,
  Sparkles,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { toggleCart, getItemCount, getSubtotal } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;
  const subtotal = mounted ? getSubtotal() : 0;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Build Pizza", href: "/custom-builder", highlight: true },
    { label: "Deals & Offers", href: "/#offers" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground hover:text-foreground md:hidden"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-black shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <Flame className="h-6 w-6 fill-black stroke-black" />
            </div>
            <div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-foreground block leading-none">
                CRUST <span className="text-primary">&</span> CO.
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mt-0.5">
                Artisanal Wood-Fired
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                } ${link.highlight ? "border border-primary/30 text-primary" : ""}`}
              >
                {link.highlight && (
                  <Sparkles className="inline-block h-3.5 w-3.5 mr-1 text-primary" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Hotline, Theme, Account & Cart Button */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Hotline (inspired by reference image) */}
          <div className="hidden xl:flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-2xl bg-surface border border-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div className="text-left text-xs leading-tight pr-2">
              <a
                href="tel:+18006921574"
                className="font-bold text-foreground hover:text-primary transition-colors block"
              >
                +1 (800) 692-1574
              </a>
              <span className="text-[10px] text-secondary font-medium">
                Call back anytime
              </span>
            </div>
          </div>

          <ThemeToggle />

          {/* Account / Admin Access */}
          <Link
            href="/login"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors"
            title="Customer / Admin Account"
          >
            <User className="h-4 w-4" />
          </Link>

          {/* Cart Pill (High Contrast Green Button matching screenshot) */}
          <Button
            onClick={toggleCart}
            className="h-10 px-3.5 sm:px-4 rounded-xl bg-secondary hover:bg-secondary/90 text-black font-bold green-glow-sm flex items-center gap-2.5 transition-all active:scale-95"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="h-4 w-4 stroke-[2.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-extrabold text-secondary">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
              {itemCount > 0 ? `$${subtotal.toFixed(2)}` : "Cart"}
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 py-5 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-sm font-medium text-foreground hover:bg-surface-elevated transition-colors"
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Customizer
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <PhoneCall className="h-3.5 w-3.5 text-secondary" />
              <span>+1 (800) 692-1574</span>
            </div>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary font-semibold"
            >
              Sign In / Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
