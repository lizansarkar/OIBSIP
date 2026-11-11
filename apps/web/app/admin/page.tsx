"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  DollarSign,
  ShoppingBag,
  Pizza,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AdminOverviewPage() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$14,892.50",
      change: "+18.4% this week",
      icon: DollarSign,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Total Orders",
      value: "682",
      change: "+24 today",
      icon: ShoppingBag,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Active Products",
      value: "10 Pizzas & Sides",
      change: "100% Available",
      icon: Pizza,
      color: "text-foreground",
      bg: "bg-surface-elevated",
    },
    {
      label: "Low Stock Items",
      value: "2 Ingredients",
      change: "Requires Restock",
      icon: AlertTriangle,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-938201",
      customer: "Alex Mercer",
      items: "Artisanal Pepperoni (12\"), Garlic Sticks",
      amount: "$27.00",
      status: "In Kitchen",
      time: "8 mins ago",
    },
    {
      id: "ORD-938198",
      customer: "Elena Vasquez",
      items: "Truffle Carbonara (14\"), 2x Craft Sodas",
      amount: "$32.50",
      status: "Out for Delivery",
      time: "21 mins ago",
    },
    {
      id: "ORD-938190",
      customer: "Marcus Vance",
      items: "Custom Sourdough with Prosciutto di Parma",
      amount: "$24.50",
      status: "Delivered",
      time: "48 mins ago",
    },
    {
      id: "ORD-938185",
      customer: "Sarah Jenkins",
      items: "Margherita D.O.P. (12\"), Tiramisù",
      amount: "$25.50",
      status: "Delivered",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
          Operations Dashboard
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Real-time performance, orders pipeline, and kitchen fulfillment status.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-3xl border border-border bg-surface p-6 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  {stat.label}
                </span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <div className="font-heading text-2xl font-extrabold text-foreground">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-secondary mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Alerts Banner */}
      <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-foreground">
              Inventory Notice: 2 items below safety threshold (5 units).
            </span>
            <p className="text-muted-foreground">
              Artisanal Pepperoni (4kg left) and Campania Buffalo Mozzarella (3 units left).
            </p>
          </div>
        </div>
        <Link href="/admin/inventory">
          <Button variant="outline" className="text-xs h-8 px-3 rounded-lg border-warning/40 shrink-0">
            Replenish Stock
          </Button>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-3xl border border-border bg-surface p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Recent Orders Feed
            </h3>
            <p className="text-xs text-muted-foreground">
              Updated live from customer checkout sessions
            </p>
          </div>
          <Link href="/admin/orders">
            <Button variant="outline" className="h-8 px-3 text-xs rounded-xl">
              <span>View All Orders</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Items</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Elapsed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-foreground">
                    #{ord.id}
                  </td>
                  <td className="py-3.5 font-medium">{ord.customer}</td>
                  <td className="py-3.5 text-muted-foreground max-w-xs truncate">
                    {ord.items}
                  </td>
                  <td className="py-3.5 font-heading font-bold text-foreground">
                    {ord.amount}
                  </td>
                  <td className="py-3.5">
                    <Badge
                      variant={
                        ord.status === "Delivered"
                          ? "success"
                          : ord.status === "In Kitchen"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {ord.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-muted-foreground">{ord.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
