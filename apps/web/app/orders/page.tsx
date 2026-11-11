"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Clock, Eye, ShoppingBag, ArrowRight } from "lucide-react";

export default function OrdersListPage() {
  const mockOrders = [
    {
      id: "ORD-938201",
      date: "Today, 6:45 PM",
      status: "In Kitchen",
      items: "1x Artisanal Pepperoni (12\"), 1x Truffle Breadsticks",
      total: 27.0,
      payment: "Paid (Razorpay)",
    },
    {
      id: "ORD-847291",
      date: "Nov 9, 2026",
      status: "Delivered",
      items: "2x Margherita D.O.P. (14\"), 2x Sparkling Blood Orange",
      total: 42.0,
      payment: "Paid (Razorpay)",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-extrabold sm:text-4xl">
                Your Order History
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                View past culinary deliveries and track active orders in real time.
              </p>
            </div>
            <Link href="/menu">
              <Button className="bg-primary hover:bg-primary-hover text-black font-bold text-xs rounded-xl">
                Order Again
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {mockOrders.map((ord) => (
              <div
                key={ord.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-border bg-surface p-6 shadow-sm hover:border-primary/40 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-foreground">
                      #{ord.id}
                    </span>
                    <Badge
                      variant={ord.status === "Delivered" ? "success" : "warning"}
                      className="text-[10px]"
                    >
                      {ord.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-foreground font-medium">{ord.items}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{ord.date}</span>
                    <span>·</span>
                    <span>{ord.payment}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                  <span className="font-heading text-lg font-extrabold text-foreground">
                    ${ord.total.toFixed(2)}
                  </span>
                  <Link href={`/orders/${ord.id}`}>
                    <Button variant="outline" className="h-9 px-3.5 text-xs rounded-xl flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Track Order</span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
