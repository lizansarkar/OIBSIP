"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast.success("Password reset link dispatched!", {
        description: `Check your inbox at ${email}`,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-2xl space-y-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
          </Link>

          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
              Reset Your Password
            </h1>
            <p className="text-xs text-muted-foreground">
              Enter the email associated with your account and we'll send a secure one-time reset link.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-5 text-center space-y-3">
              <CheckCircle2 className="h-8 w-8 text-secondary mx-auto" />
              <h3 className="font-heading text-sm font-bold text-foreground">
                Check Your Email
              </h3>
              <p className="text-xs text-muted-foreground">
                We've sent a password reset link to <strong className="text-foreground">{email}</strong>. It will expire in 15 minutes.
              </p>
              <Link href="/login" className="block pt-2">
                <Button variant="outline" className="text-xs w-full">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Your Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary-hover text-black font-extrabold text-xs rounded-xl amber-glow-sm"
              >
                Send Reset Link
              </Button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
