"use client";

import * as React from "react";
import { OrderStatus } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Bike,
  Flame,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: string;
  total: number;
  payment: string;
  status: OrderStatus;
  time: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState<AdminOrder[]>([
    {
      id: "ORD-938201",
      customer: "Alex Mercer",
      phone: "+1 555-392-1084",
      address: "742 Evergreen Terrace, Apt 4B",
      items: "1x Artisanal Pepperoni (12\"), 1x Truffle Breadsticks",
      total: 27.0,
      payment: "Paid (Razorpay)",
      status: OrderStatus.PREPARING,
      time: "8 mins ago",
    },
    {
      id: "ORD-938198",
      customer: "Elena Vasquez",
      phone: "+1 555-827-4910",
      address: "108 Bleeker St, Suite 12",
      items: "1x Truffle Carbonara (14\"), 2x Craft Sodas",
      total: 32.5,
      payment: "Paid (Razorpay)",
      status: OrderStatus.OUT_FOR_DELIVERY,
      time: "21 mins ago",
    },
    {
      id: "ORD-938190",
      customer: "Marcus Vance",
      phone: "+1 555-192-3847",
      address: "45 Wallaby Way, Brooklyn",
      items: "1x Custom Living Sourdough Pizza",
      total: 24.5,
      payment: "Cash on Delivery",
      status: OrderStatus.DELIVERED,
      time: "48 mins ago",
    },
    {
      id: "ORD-938185",
      customer: "Sarah Jenkins",
      phone: "+1 555-674-9281",
      address: "12 Riverside Drive, Apt 2A",
      items: "1x Margherita D.O.P. (12\"), 1x Tiramisù",
      total: 25.5,
      payment: "Paid (Razorpay)",
      status: OrderStatus.DELIVERED,
      time: "1 hour ago",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = React.useState<string>("All");

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      )
    );
    toast.success(`Order #${orderId} status updated to "${newStatus}"!`);
  };

  const filteredOrders =
    selectedFilter === "All"
      ? orders
      : orders.filter((o) => o.status === selectedFilter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
          Live Order Fulfillment
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Dispatch, update cooking milestones, and track rider deliveries.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {[
          "All",
          OrderStatus.PENDING,
          OrderStatus.CONFIRMED,
          OrderStatus.PREPARING,
          OrderStatus.OUT_FOR_DELIVERY,
          OrderStatus.DELIVERED,
        ].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedFilter(status)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === status
                ? "bg-primary text-black"
                : "border border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-elevated/40 text-muted-foreground">
                <th className="py-3.5 px-5 font-semibold">Order ID</th>
                <th className="py-3.5 px-4 font-semibold">Customer & Address</th>
                <th className="py-3.5 px-4 font-semibold">Ordered Items</th>
                <th className="py-3.5 px-4 font-semibold">Total & Payment</th>
                <th className="py-3.5 px-4 font-semibold">Status Stage</th>
                <th className="py-3.5 px-5 text-right font-semibold">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-surface-elevated/30 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-mono font-bold text-foreground block">
                      #{ord.id}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {ord.time}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-foreground block">
                      {ord.customer}
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      {ord.address}
                    </span>
                    <span className="text-[10px] text-secondary">
                      {ord.phone}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <span className="text-foreground font-medium block">
                      {ord.items}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-heading font-extrabold text-foreground block text-sm">
                      ${ord.total.toFixed(2)}
                    </span>
                    <Badge variant="subtle" className="text-[10px] mt-0.5">
                      {ord.payment}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        ord.status === OrderStatus.DELIVERED
                          ? "success"
                          : ord.status === OrderStatus.PREPARING
                          ? "warning"
                          : ord.status === OrderStatus.OUT_FOR_DELIVERY
                          ? "secondary"
                          : "default"
                      }
                      className="text-[10px]"
                    >
                      {ord.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <select
                      value={ord.status}
                      onChange={(e) =>
                        handleStatusChange(ord.id, e.target.value as OrderStatus)
                      }
                      className="rounded-xl border border-border bg-surface-elevated px-2.5 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={OrderStatus.PENDING}>Pending</option>
                      <option value={OrderStatus.CONFIRMED}>Confirmed</option>
                      <option value={OrderStatus.PREPARING}>Preparing</option>
                      <option value={OrderStatus.OUT_FOR_DELIVERY}>Out for Delivery</option>
                      <option value={OrderStatus.DELIVERED}>Delivered</option>
                      <option value={OrderStatus.CANCELLED}>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
