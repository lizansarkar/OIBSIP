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
  Pizza,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { toggleCart, getItemCount, getSubtotal } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [callbackModal, setCallbackModal] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;
  const subtotal = mounted ? getSubtotal() : 0;

  const navLinks = [
    { label: "Menu", href: "/menu" },
    { label: "Deals", href: "/#deals" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contacts", href: "/#contacts" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0D0E0D]/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Left: Mobile/Tablet Hamburger + Brand Logo (Inspired by Screenshot) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-[#8BBF55] hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <div className="space-y-1.5 flex flex-col justify-center items-center">
                <span className="block h-0.5 w-6 bg-[#8BBF55] rounded-full" />
                <span className="block h-0.5 w-4 bg-[#8BBF55] rounded-full mr-2" />
                <span className="block h-0.5 w-6 bg-[#8BBF55] rounded-full" />
              </div>
            )}
          </button>

          {/* Brand Logo: Pizza slice outline + Mario / Crust & Co. */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center text-[#F7F5EF] group-hover:text-primary transition-colors">
              <Pizza className="h-7 w-7 stroke-[1.8]" />
            </div>
            <span className="font-heading text-2xl font-extrabold tracking-tight text-[#F7F5EF] font-sans">
              Mario <span className="text-xs font-semibold uppercase tracking-widest text-[#AAAFA5] block text-[9px] -mt-1">CRUST & CO.</span>
            </span>
          </Link>
        </div>

        {/* Center: Clean Nav Links matching the screenshot ("Меню", "Акции", "Отзывы", "Контакты") */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#F7F5EF] font-semibold"
                    : "text-[#AAAFA5] hover:text-[#F7F5EF]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Phone Hotline + Green Cart Button matching Screenshot */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Phone Hotline with Call Back text */}
          <div className="hidden sm:flex items-center gap-2.5 text-left">
            <a
              href="tel:+10936921574"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8BBF55]/15 text-[#8BBF55] hover:scale-105 transition-transform cursor-pointer"
              title="Call Kitchen Hotline"
            >
              <PhoneCall className="h-4 w-4" />
            </a>
            <div className="leading-tight">
              <a
                href="tel:+10936921574"
                className="text-xs font-bold text-[#F7F5EF] hover:text-primary transition-colors block cursor-pointer"
              >
                +1 (093) 692-15-74
              </a>
              <button
                onClick={() => setCallbackModal(true)}
                className="text-[10px] text-[#8BBF55] hover:underline block font-medium cursor-pointer"
              >
                Call back anytime
              </button>
            </div>
          </div>

          <ThemeToggle />

          {/* Account Shortcut */}
          <Link
            href="/login"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#171816] text-[#AAAFA5] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Account / Admin Portal"
          >
            <User className="h-4 w-4" />
          </Link>

          {/* Cart Pill (Exact match to green basket in screenshot) */}
          <button
            onClick={toggleCart}
            className="h-10 px-4 rounded-xl border border-[#8BBF55]/30 bg-[#8BBF55]/10 hover:bg-[#8BBF55]/20 text-[#8BBF55] font-bold green-glow-sm flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="h-4 w-4 stroke-[2.2]" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#8BBF55] text-[10px] font-black text-black">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-xs font-extrabold tracking-wide text-white">
              {itemCount > 0 ? `$${subtotal.toFixed(2)}` : "Cart"}
            </span>
          </button>
        </div>
      </div>

      {/* Quick Callback Modal */}
      {callbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setCallbackModal(false)}
          />
          <div className="relative z-50 w-full max-w-sm rounded-3xl border border-white/10 bg-[#171816] p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold text-white">
              Request a Callback
            </h3>
            <p className="text-xs text-[#AAAFA5]">
              Leave your phone number and our artisanal kitchen will call you within 2 minutes.
            </p>
            <input
              type="tel"
              placeholder="+1 (000) 000-0000"
              className="w-full rounded-xl border border-white/10 bg-[#20221E] px-3.5 py-2.5 text-xs text-white placeholder:text-[#70766D] focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCallbackModal(false)}
                className="cursor-pointer text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setCallbackModal(false);
                  alert("Thank you! Our kitchen team is calling you shortly.");
                }}
                className="bg-[#8BBF55] hover:bg-[#8BBF55]/90 text-black font-bold text-xs cursor-pointer"
              >
                Call Me
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#171816] px-5 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#F7F5EF] hover:text-primary transition-colors cursor-pointer py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/custom-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-primary hover:underline cursor-pointer py-1"
            >
              Custom Pizza Builder ✨
            </Link>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[#8BBF55] font-semibold">+1 (093) 692-15-74</span>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#AAAFA5] hover:text-white cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
