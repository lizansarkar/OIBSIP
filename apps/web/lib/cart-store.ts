import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PizzaSize } from "@workspace/shared";

export interface CartCustomization {
  base: { id: string; name: string; price: number };
  sauce: { id: string; name: string; price: number };
  cheese: { id: string; name: string; price: number };
  vegetables: Array<{ id: string; name: string; price: number }>;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. productId or custom timestamp)
  productId?: string;
  name: string;
  description?: string;
  image: string;
  price: number; // unit price
  quantity: number;
  size: PizzaSize;
  isCustom?: boolean;
  customization?: CartCustomization;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        // Seed initial items for realistic demonstration
        {
          id: "seed-pepperoni",
          productId: "prod-1",
          name: "Artisanal Pepperoni",
          description: "San Marzano, fior di latte, hot artisanal salami, hot honey",
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80",
          price: 18.5,
          quantity: 1,
          size: "12-inch Medium",
        },
      ],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (item) => {
        const currentItems = get().items;
        const itemId = item.id || `${item.productId || "item"}-${item.size}-${Date.now()}`;

        // Check if identical standard item exists
        const existingIndex = currentItems.findIndex(
          (i) => !i.isCustom && i.productId === item.productId && i.size === item.size
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const found = updated[existingIndex];
          if (found) {
            found.quantity += item.quantity || 1;
          }
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...currentItems, { ...item, id: itemId }],
            isOpen: true,
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, delta) => {
        const updated = get()
          .items.map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];

        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 40 ? 0 : 4.5; // Free delivery over $40
      },

      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      },
    }),
    {
      name: "crust_co_cart_storage",
    }
  )
);
