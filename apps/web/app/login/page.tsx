"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Flame, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("customer@crustandco.com");
  const [password, setPassword] = React.useState("password123");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If logging in as admin or demo
      if (email.includes("admin")) {
        toast.success("Welcome back, Administrator!", {
          description: "Redirecting to Management Console...",
        });
        setTimeout(() => router.push("/admin"), 1000);
      } else {
        toast.success("Logged in successfully!", {
          description: `Welcome back, ${email}`,
        });
        setTimeout(() => router.push("/menu"), 1000);
      }
    } catch {
      toast.error("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Flame className="h-6 w-6" />
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-muted-foreground">
              Track orders, earn crust rewards, or access the admin console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary-hover text-black font-extrabold text-xs rounded-xl amber-glow-sm flex items-center justify-center gap-2"
            >
              <span>{loading ? "Signing in..." : "Sign In"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Quick Demo Credentials Pill */}
          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-3.5 text-xs space-y-1.5">
            <span className="font-bold text-foreground block">
              💡 Quick Testing Credentials:
            </span>
            <div className="flex justify-between text-muted-foreground">
              <span>Admin:</span>
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@crustandco.com");
                  setPassword("admin12345");
                }}
                className="text-secondary font-mono hover:underline"
              >
                admin@crustandco.com (Click to load)
              </button>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Customer:</span>
              <button
                type="button"
                onClick={() => {
                  setEmail("customer@crustandco.com");
                  setPassword("password123");
                }}
                className="text-primary font-mono hover:underline"
              >
                customer@crustandco.com (Click to load)
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
