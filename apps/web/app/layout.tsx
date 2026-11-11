import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "@workspace/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@workspace/ui/lib/utils";
import { Toaster } from "sonner";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRUST & CO. | Artisanal Wood-Fired Pizza Delivery",
  description:
    "Experience the art of authentic pizza. 48-hour cold fermented dough, stone-baked at 450°C, topped with farm-fresh organic ingredients. Delivered hot in 30 minutes.",
  keywords: [
    "pizza delivery",
    "wood-fired pizza",
    "artisanal pizza",
    "CRUST & CO.",
    "custom pizza builder",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(headingFont.variable, bodyFont.variable, "font-sans")}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              className: "border border-border bg-surface text-foreground",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
