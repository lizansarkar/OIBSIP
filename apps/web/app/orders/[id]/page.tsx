"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Bike,
  Home,
  PhoneCall,
  Flame,
  ArrowLeft,
} from "lucide-react";

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = (params?.id as string) || "ORD-782910";

  // Simulated live tracking progress: 0 (Pending) -> 1 (Confirmed) -> 2 (Preparing) -> 3 (Out for Delivery) -> 4 (Delivered)
  const [currentStep, setCurrentStep] = React.useState(2);

  const steps = [
    {
      title: "Order Received",
      time: "10 mins ago",
      desc: "Order confirmed and sent to kitchen",
      icon: Clock,
    },
    {
      title: "Handcrafted & Prepped",
      time: "6 mins ago",
      desc: "Dough stretched & toppings assembled",
      icon: ChefHat,
    },
    {
      title: "Wood-Fired at 450°C",
      time: "In Progress",
      desc: "Baking in authentic stone oven",
      icon: Flame,
    },
    {
      title: "Out for Delivery",
      time: "Estimated 15m",
      desc: "Rider dispatched with thermal bag",
      icon: Bike,
    },
    {
      title: "Delivered Hot",
      time: "Estimated 25m",
      desc: "Handed over to your doorstep",
      icon: Home,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Store
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
                  Order Status: #{orderId}
                </h1>
                <Badge variant="warning" className="animate-pulse text-xs">
                  In Kitchen Oven
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a href="tel:+18006921574">
                <Button variant="outline" className="h-10 text-xs rounded-xl flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-secondary" />
                  <span>Call Kitchen</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Delivery ETA Card */}
          <div className="rounded-3xl border border-secondary/40 bg-secondary/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Estimated Delivery Arrival
              </span>
              <div className="font-heading text-4xl font-extrabold text-foreground">
                20 — 25 Minutes
              </div>
              <p className="text-xs text-muted-foreground">
                Delivering to 742 Evergreen Terrace, Apt 4B, New York
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary text-black">
              <Bike className="h-8 w-8" />
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
            <h3 className="font-heading text-lg font-bold mb-6">
              Live Fulfillment Timeline
            </h3>

            <div className="relative border-l-2 border-border/80 ml-4 sm:ml-6 space-y-8 pb-4">
              {steps.map((step, index) => {
                const isPassed = index < currentStep;
                const isCurrent = index === currentStep;
                const IconComp = step.icon;

                return (
                  <div key={step.title} className="relative pl-8 sm:pl-10">
                    {/* Step Marker */}
                    <div
                      className={`absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                        isPassed
                          ? "border-secondary bg-secondary text-black shadow-md"
                          : isCurrent
                          ? "border-primary bg-primary text-black ring-4 ring-primary/20 animate-pulse"
                          : "border-border bg-surface text-muted-foreground"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <IconComp className="h-4 w-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-bold ${
                            isCurrent
                              ? "text-primary font-extrabold"
                              : isPassed
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
