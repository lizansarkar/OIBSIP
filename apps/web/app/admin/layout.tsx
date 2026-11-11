"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Flame,
  LayoutDashboard,
  Pizza,
  ShoppingBag,
  Package,
  ArrowLeft,
  Bell,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Menu & Products", href: "/admin/products", icon: Pizza },
    { label: "Live Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Inventory & Stock", href: "/admin/inventory", icon: Package },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-surface p-6 justify-between">
        <div className="space-y-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-black shadow-md shadow-primary/20">
              <Flame className="h-5 w-5 fill-black stroke-black" />
            </div>
            <div>
              <span className="font-heading text-lg font-extrabold tracking-tight block leading-none">
                CRUST <span className="text-primary">&</span> CO.
              </span>
              <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-primary text-black shadow-md shadow-primary/10"
                      : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="space-y-3 pt-6 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Storefront</span>
          </Link>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              <span>Admin Verified</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-4 sm:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Link href="/admin" className="font-heading font-bold text-sm">
                CRUST & CO. Admin
              </Link>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-muted-foreground">
              Oasis Infobyte L3 · Management Operations
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/inventory"
              className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground"
              title="Low Stock Alerts"
            >
              <Bell className="h-4 w-4 text-warning" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full bg-destructive" />
            </Link>
            <div className="text-right text-xs">
              <span className="font-bold text-foreground block">Admin Manager</span>
              <span className="text-[10px] text-secondary font-medium">Head Pizzaiolo</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
