"use client";

import * as React from "react";
import Image from "next/image";
import { SAMPLE_PRODUCTS, type ProductItem } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Flame,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<ProductItem[]>(SAMPLE_PRODUCTS);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showAddModal, setShowAddModal] = React.useState(false);

  // New product form
  const [newName, setNewName] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<"pizza" | "sides" | "desserts" | "beverages">("pizza");
  const [newPrice, setNewPrice] = React.useState("17.50");
  const [newDesc, setNewDesc] = React.useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      slug: newName.toLowerCase().replace(/\s+/g, "-"),
      name: newName,
      category: newCategory,
      description: newDesc || "Authentic freshly prepared menu selection.",
      ingredients: ["San Marzano", "Fior di Latte", "Fresh Basil"],
      basePrice: parseFloat(newPrice),
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviewsCount: 1,
      calories: "1,100 kcal",
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    setNewName("");
    setNewPrice("17.50");
    setNewDesc("");
    toast.success(`Product "${newName}" added to menu catalog!`);
  };

  const handleDelete = (id: string, name: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.info(`Removed "${name}" from active menu.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Product & Menu Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure pizzas, prices, categories, and inventory availability.
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-primary-hover text-black font-extrabold text-xs h-10 px-4 rounded-xl amber-glow-sm flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Pizza / Item</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 text-xs h-10 rounded-xl"
        />
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-elevated/40 text-muted-foreground">
                <th className="py-3.5 px-5 font-semibold">Item</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Base Price</th>
                <th className="py-3.5 px-4 font-semibold">Rating</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-surface-elevated/30 transition-colors">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-foreground block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground line-clamp-1 max-w-xs">
                          {item.ingredients.join(", ")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="subtle" className="capitalize text-[10px]">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-heading font-extrabold text-foreground">
                    ${item.basePrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-medium text-warning">
                    ★ {item.rating} ({item.reviewsCount})
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-secondary font-semibold text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5" /> In Stock
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right space-x-2">
                    <button
                      onClick={() => toast.info(`Editing price for ${item.name}`)}
                      className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative z-50 w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold">
              Add New Pizza or Menu Item
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Item Name</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Burrata & Wild Honey"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-input bg-surface-elevated px-3 py-2 text-xs"
                  >
                    <option value="pizza">Pizza</option>
                    <option value="sides">Sides</option>
                    <option value="desserts">Desserts</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Base Price ($)</label>
                  <Input
                    type="number"
                    step="0.5"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <Input
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Gourmet toppings, flour origin, and flavor profile"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-black font-bold text-xs"
                >
                  Save & Publish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
