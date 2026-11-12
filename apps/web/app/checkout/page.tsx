"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Badge } from "@workspace/ui/components/badge";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Truck,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } =
    useCartStore();

  const [mounted, setMounted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [completedOrderId, setCompletedOrderId] = React.useState("");

  // Form States
  const [name, setName] = React.useState("Alex Mercer");
  const [email, setEmail] = React.useState("alex.mercer@example.com");
  const [phone, setPhone] = React.useState("+1 (555) 392-1084");
  const [address, setAddress] = React.useState("742 Evergreen Terrace");
  const [apartment, setApartment] = React.useState("Apt 4B");
  const [city, setCity] = React.useState("New York");
  const [postalCode, setPostalCode] = React.useState("10001");
  const [instructions, setInstructions] = React.useState(
    "Please leave at the door and ring the bell once."
  );
  const [paymentMethod, setPaymentMethod] = React.useState<"razorpay" | "cod">(
    "razorpay"
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !city || !postalCode) {
      toast.error("Please fill in all mandatory delivery fields.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a simulated order reference
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;

      if (paymentMethod === "razorpay") {
        // Razorpay Test Mode Simulation
        toast.info("Connecting to Razorpay Test Gateway...", {
          description: "Initiating sandbox payment session",
        });

        // Simulate secure verification
        await new Promise((r) => setTimeout(r, 1600));
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }

      // Success
      setCompletedOrderId(orderId);
      setOrderComplete(true);
      clearCart();

      // Launch celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      toast.success("Order Placed Successfully!", {
        description: `Order #${orderId} has been sent to our kitchen.`,
      });
    } catch {
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-3xl border border-secondary/40 bg-surface p-8 text-center space-y-5 shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/15 text-secondary">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="success" className="text-xs">
                Order Confirmed
              </Badge>
              <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
                Thank You For Your Order!
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your order <span className="font-mono font-bold text-foreground">#{completedOrderId}</span> has been received and our chefs are firing up the 450°C stone oven.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-elevated p-4 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-bold text-foreground">25-30 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="font-semibold text-secondary">
                  {paymentMethod === "razorpay" ? "Paid (Razorpay Test)" : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery To:</span>
                <span className="font-medium text-foreground truncate max-w-[200px]">
                  {address}, {city}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link href={`/orders/${completedOrderId}`}>
                <Button className="w-full bg-primary hover:bg-primary-hover text-black font-extrabold text-xs h-11 rounded-xl amber-glow-sm">
                  Track Live Order Status
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full text-xs h-11 rounded-xl">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Cart
          </Link>

          <div className="mb-8">
            <h1 className="font-heading text-3xl font-extrabold sm:text-4xl">
              Checkout & Delivery
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Please provide your delivery address and choose your test payment method.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
              {/* Left 7 cols: Customer Details & Address */}
              <div className="lg:col-span-7 space-y-6">
                {/* Contact Information */}
                <div className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    1. Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    2. Delivery Address
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 742 Evergreen Terrace"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="apartment">Apartment / Suite</Label>
                      <Input
                        id="apartment"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="e.g. Apt 4B"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="instructions">Delivery Instructions</Label>
                      <Input
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Gate code, ring bell, contactless drop-off"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="rounded-3xl border border-border bg-surface p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-base font-bold text-foreground">
                      3. Payment Method
                    </h3>
                    <Badge variant="subtle" className="text-[10px]">
                      Test Mode Enabled
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("razorpay")}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        paymentMethod === "razorpay"
                          ? "border-primary bg-primary/10 ring-1 ring-primary"
                          : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground block">
                          Razorpay Test Checkout
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          Cards, UPI, NetBanking
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        paymentMethod === "cod"
                          ? "border-secondary bg-secondary/10 ring-1 ring-secondary"
                          : "border-border bg-surface-elevated/40 hover:bg-surface-elevated"
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                        <Banknote className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground block">
                          Cash on Delivery
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          Pay cash to rider upon arrival
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Order Review & Final Button */}
              <div className="lg:col-span-5 space-y-4 sticky top-28">
                <div className="rounded-3xl border border-border bg-surface p-6 shadow-xl space-y-4">
                  <h3 className="font-heading text-base font-bold">
                    Order Summary ({items.length} items)
                  </h3>

                  <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start gap-2 border-b border-border/40 pb-2.5"
                      >
                        <div>
                          <span className="font-semibold text-foreground">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-muted-foreground block text-[11px]">
                            {item.size}
                          </span>
                        </div>
                        <span className="font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs border-t border-border pt-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-medium text-foreground">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-foreground">
                        {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-foreground border-t border-border pt-3">
                      <span>Total Amount</span>
                      <span className="font-heading text-xl text-primary font-extrabold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full h-12 bg-primary hover:bg-primary-hover text-black font-extrabold text-sm rounded-xl amber-glow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4 animate-spin" />
                        Verifying & Securing Order...
                      </span>
                    ) : (
                      <span>Place Order · ${total.toFixed(2)}</span>
                    )}
                  </Button>

                  <div className="rounded-xl border border-border/60 bg-surface-elevated/40 p-3 text-[11px] text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Truck className="h-3.5 w-3.5 text-secondary" />
                      <span>Guaranteed Fresh & Hot</span>
                    </div>
                    <p>
                      Your order will be prepared immediately upon confirmation. You will receive real-time status updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
