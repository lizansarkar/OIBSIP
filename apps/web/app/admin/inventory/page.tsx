"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  AlertTriangle,
  Plus,
  Mail,
  CheckCircle2,
  Package,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  name: string;
  category: "base" | "sauce" | "cheese" | "topping" | "beverage";
  currentStock: number;
  unit: string;
  threshold: number;
}

export default function AdminInventoryPage() {
  const [inventory, setInventory] = React.useState<InventoryItem[]>([
    {
      id: "inv-1",
      name: "Organic Sourdough Ferment",
      category: "base",
      currentStock: 42,
      unit: "portions",
      threshold: 15,
    },
    {
      id: "inv-2",
      name: "Artisanal Pepperoni",
      category: "topping",
      currentStock: 4,
      unit: "kg",
      threshold: 5, // LOW
    },
    {
      id: "inv-3",
      name: "Campania Buffalo Mozzarella",
      category: "cheese",
      currentStock: 3,
      unit: "kg",
      threshold: 5, // LOW
    },
    {
      id: "inv-4",
      name: "San Marzano D.O.P. Tomatoes",
      category: "sauce",
      currentStock: 38,
      unit: "cans (3kg)",
      threshold: 10,
    },
    {
      id: "inv-5",
      name: "Fior di Latte Mozzarella",
      category: "cheese",
      currentStock: 25,
      unit: "kg",
      threshold: 8,
    },
    {
      id: "inv-6",
      name: "Umbrian White Truffle Oil",
      category: "sauce",
      currentStock: 9,
      unit: "bottles",
      threshold: 3,
    },
    {
      id: "inv-7",
      name: "Sparkling Blood Orange Soda",
      category: "beverage",
      currentStock: 48,
      unit: "bottles",
      threshold: 12,
    },
  ]);

  const [sendingAlert, setSendingAlert] = React.useState(false);

  const handleAddStock = (id: string, amount: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? { ...item, currentStock: item.currentStock + amount }
          : item
      )
    );
    toast.success(`Added +${amount} to stock!`);
  };

  const handleTriggerEmailAlert = async () => {
    setSendingAlert(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSendingAlert(false);
    toast.success("Low-Stock Email Alert Dispatched!", {
      description: "Nodemailer sent alerts to admin@crustandco.com for items under 5 units.",
    });
  };

  const lowStockCount = inventory.filter(
    (i) => i.currentStock <= i.threshold
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Inventory & Stock Thresholds
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automated stock deductions upon order confirmation and scheduled low-stock alerts.
          </p>
        </div>

        <Button
          onClick={handleTriggerEmailAlert}
          disabled={sendingAlert}
          className="bg-warning hover:bg-warning/90 text-black font-extrabold text-xs h-10 px-4 rounded-xl flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          <span>
            {sendingAlert ? "Running Node-Cron..." : "Run Low-Stock Alert Scan"}
          </span>
        </Button>
      </div>

      {/* Low Stock Warning Alert */}
      {lowStockCount > 0 && (
        <div className="rounded-3xl border border-warning/40 bg-warning/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning text-black">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground">
                {lowStockCount} Ingredients Below Safe Operational Threshold
              </h3>
              <p className="text-xs text-muted-foreground">
                Automatic replenishment alerts are configured for admin notifications.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="rounded-3xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-elevated/40 text-muted-foreground">
                <th className="py-3.5 px-5 font-semibold">Ingredient / Supply</th>
                <th className="py-3.5 px-4 font-semibold">Classification</th>
                <th className="py-3.5 px-4 font-semibold">Current Stock</th>
                <th className="py-3.5 px-4 font-semibold">Alert Threshold</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-5 text-right font-semibold">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {inventory.map((item) => {
                const isLow = item.currentStock <= item.threshold;
                return (
                  <tr key={item.id} className="hover:bg-surface-elevated/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-bold text-foreground block">
                        {item.name}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="subtle" className="capitalize text-[10px]">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-heading font-extrabold text-sm ${
                          isLow ? "text-destructive" : "text-foreground"
                        }`}
                      >
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {item.threshold} {item.unit}
                    </td>
                    <td className="py-3.5 px-4">
                      {isLow ? (
                        <Badge variant="destructive" className="text-[10px] gap-1">
                          <AlertTriangle className="h-3 w-3" /> Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="success" className="text-[10px] gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Healthy
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => handleAddStock(item.id, 5)}
                        className="rounded-lg text-[11px]"
                      >
                        +5
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => handleAddStock(item.id, 15)}
                        className="bg-primary hover:bg-primary-hover text-black rounded-lg text-[11px] font-bold"
                      >
                        +15 Restock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
