# 🍕 CRUST & CO. — Artisanal Wood-Fired Pizza Delivery Platform

[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-ef4444.svg)](https://turbo.build)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.4-black.svg)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.3.1-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://mongoosejs.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com)

**Submission for:** Oasis Infobyte Web Development & Designing Internship — **Level 3**  
**Repository:** `OIBSIP/WebDev-L3-PizzaDeliveryApp`  
**Brand Identity:** **CRUST & CO.** — The Art of Perfect Pizza  

---

## 📖 1. Project Overview

**CRUST & CO.** is a production-quality, full-stack artisanal pizza delivery platform inspired by high-end dark culinary aesthetics. Built as a unified high-performance **Turborepo monorepo**, it delivers two complete, responsive experiences:

1. **Customer Storefront:** An immersive, food-focused pizza ordering experience featuring an interactive split-screen hero section with radial pizza callouts, a live custom pizza studio (bases, sauces, cheeses, veggies, meats), persistent cart drawer, discount coupon engine (`CRUST20`), Razorpay test gateway, and real-time order tracking timeline.
2. **Admin Operations Dashboard:** A role-protected management console for tracking live revenue KPIs, monitoring orders through cooking/dispatch stages, catalog CRUD management, and node-cron automated inventory alerts via Nodemailer.

---

## 🎨 2. Visual Design System

The platform strictly implements the custom design tokens derived from the reference architecture:

### Color Palette (CSS Variables)
- **Dark Canvas (Default):** `#101110`
- **Surface:** `#191B18`
- **Elevated Surface:** `#22251F`
- **Primary Text:** `#F7F5EF`
- **Secondary Text:** `#AAAFA5`
- **Primary Accent (Warm Oven Amber):** `#FF8A1F` (Hover: `#F4770B`)
- **Secondary Accent (Fresh Basil Green):** `#8BBF55`
- **Success / Warning / Destructive:** `#3BAA70` / `#E8A23A` / `#E05252`

### Typography Hierarchy
- **Headings:** `Plus Jakarta Sans` (weights: 600, 700, 800)
- **Body & Meta:** `Inter` (weights: 400, 500, 600)
- **Code & IDs:** `Geist Mono`

---

## 🚀 3. Features Breakdown

### A. Customer Experience
- **Hero Showcase:** Asymmetric split-screen hero with glowing amber CTA buttons, fresh heirloom produce flank, and overhead wood-fired pizza with interactive radial pointer lines highlighting key craft features.
- **Category Filter Pills:** Smooth pill filtering across *All Menu*, *Signature Pizzas*, *Appetizers & Sides*, *Artisanal Desserts*, and *Craft Beverages*.
- **Interactive Custom Pizza Builder:**
  - 5 Artisanal Dough Bases (48h Sourdough, Neapolitan, Roman Thin, Stuffed Crust, Gluten-Free)
  - 5 Handcrafted Sauces (San Marzano, Spicy Arrabbiata, White Truffle Alfredo, Pesto D.O.P., Bourbon BBQ)
  - 5 Artisan Cheeses (Fior di Latte, Buffalo Mozzarella, Gorgonzola, Smoked Scamorza, Vegan Cashew)
  - 8 Farm-Fresh Vegetables & 5 Gourmet Meats
  - Dynamic client & server price recalculation with live visual stack summary.
- **Cart & Slide-over Drawer:** Persistent cart using `zustand` (`persist` middleware), live subtotal, free delivery milestone bar, and instant checkout link.
- **Checkout & Payment:** Contact validation, delivery address, order notes, coupon engine (`CRUST20` for 20% off), and **Razorpay Sandbox Test Mode** integration with confetti celebration.
- **Order Tracking:** Real-time fulfillment timeline (Order Received ➔ Prepped ➔ In 450°C Stone Oven ➔ Out for Delivery ➔ Delivered Hot).

### B. Admin Console (`/admin`)
- **Operations Dashboard:** Live revenue metrics, total orders, active catalog status, and low-stock warning banners.
- **Product Management:** Add new pizzas, adjust base pricing, manage ingredients, and toggle item availability.
- **Order Pipeline:** Move orders between milestones (*Pending*, *Confirmed*, *Preparing*, *Out for Delivery*, *Delivered*, *Cancelled*).
- **Inventory & Automated Cron Alerts:** Monitor stock quantities, trigger manual restock (+5, +15), and execute scheduled `node-cron` inventory scanners that dispatch formatted low-stock emails via `nodemailer` to `ADMIN_EMAIL`.

---

## 🏗️ 4. Monorepo Architecture

```
pizza-lelo/
├── apps/
│   ├── web/                               # Next.js 16 (React 19) Frontend Application
│   │   ├── app/
│   │   │   ├── (customer)/                # Customer Experience
│   │   │   │   ├── page.tsx               # Homepage (Hero, Pills, Featured Cards)
│   │   │   │   ├── menu/page.tsx          # Full Menu with Search, Tags & Sorting
│   │   │   │   ├── menu/[slug]/page.tsx   # Product Detail with Size Selector
│   │   │   │   ├── custom-builder/        # Step-by-Step Custom Pizza Studio
│   │   │   │   ├── cart/page.tsx          # Full Shopping Cart View
│   │   │   │   ├── checkout/page.tsx      # Razorpay Test Checkout
│   │   │   │   ├── orders/page.tsx        # Customer Order History
│   │   │   │   ├── orders/[id]/page.tsx   # Live Fulfillment Timeline Tracker
│   │   │   │   ├── login/page.tsx         # Customer & Admin Login Gateway
│   │   │   │   ├── register/page.tsx      # Registration with Verification
│   │   │   │   └── forgot-password/       # Secure Token Password Reset
│   │   │   └── admin/                     # Protected Admin Console
│   │   │       ├── layout.tsx             # Admin Sidebar & Verification Badge
│   │   │       ├── page.tsx               # KPI Overview & Orders Feed
│   │   │       ├── products/page.tsx      # Product Catalog CRUD
│   │   │       ├── orders/page.tsx        # Order Fulfillment Status Pipeline
│   │   │       └── inventory/page.tsx     # Stock Levels & Low-Stock Alerts
│   │   ├── components/                    # Header, Footer, Hero, PizzaCard, CartSheet, ThemeToggle
│   │   └── lib/                           # Typed API Client, Zustand Cart Store
│   │
│   └── api/                               # Express + TypeScript API Server
│       ├── src/
│       │   ├── config/                    # db.ts (Mongoose), env.ts (Environment Config)
│       │   ├── middleware/                # auth.ts, role.ts, error.ts (Centralized Error Handler)
│       │   ├── models/                    # User, Product, Ingredient, Order, Inventory
│       │   ├── routes/                    # auth, products, ingredients, orders, payments, admin
│       │   ├── services/                  # mailer.ts (Nodemailer), cron.ts (Node-Cron Low-Stock Alert)
│       │   └── server.ts                  # Express Application Entry Point
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── shared/                            # Cross-Monorepo Types, Enums & Schemas
│   │   ├── src/index.ts                   # ProductItem, BUILDER_OPTIONS, OrderStatus, Zod Schemas
│   │   └── package.json
│   ├── ui/                                # Centralized Shadcn Design System
│   │   ├── src/components/                # Button, Badge, Card, Input, Label, Table, etc.
│   │   └── src/styles/globals.css         # CSS Variables (Dark & Light Theme Tokens)
│   ├── eslint-config/
│   └── typescript-config/
│
├── .env.example                           # Root Environment Template
├── turbo.json                             # Turborepo Build Pipelines
└── package.json                           # Workspace Definitions & Scripts
```

---

## 🛠️ 5. Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Monorepo Build System** | Turborepo (`turbo@^2.11.10`), npm workspaces |
| **Frontend Framework** | Next.js 16.4.4 (App Router, Turbopack), React 19.3.1 |
| **Styling & Design System**| Tailwind CSS v4, `@workspace/ui` (shadcn/ui), Radix UI primitives |
| **Icons & Typography** | Lucide React, Plus Jakarta Sans, Inter |
| **State Management** | Zustand (with persistent localStorage middleware) |
| **Feedback & FX** | Sonner (Toast notifications), Canvas-Confetti |
| **Backend Framework** | Express 4.21, TypeScript 5, tsx |
| **Database & ODM** | MongoDB, Mongoose 8.x (with resilient in-memory fallback) |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), Bcrypt password hashing, Cookie-Parser |
| **Security & Utilities** | Helmet, CORS, Express-Rate-Limit, Morgan |
| **Payments** | Razorpay SDK (Sandbox Test Mode, HMAC-SHA256 signature verification) |
| **Automation & Alerts** | Node-Cron, Nodemailer |

---

## ⚡ 6. Local Setup Instructions

### Prerequisites
- Node.js `>= 20.9.0`
- npm `>= 10.9.0`
- MongoDB (optional for local DB; server operates with resilient seed data if offline)

### Step 1: Clone Repository
```bash
git clone https://github.com/lizansarkar/OIBSIP.git
cd pizza-lelo
```

### Step 2: Install All Workspace Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env` in the root and in `apps/api`:
```bash
cp .env.example .env
```

### Step 4: Run Monorepo in Development Mode
To launch both frontend (Next.js on port 3000) and backend (Express on port 5000) simultaneously:
```bash
npm run dev
```

- **Customer Website:** [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 7. Demo & Testing Credentials

The application includes built-in one-click demo credentials on the `/login` page:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@crustandco.com` | `admin12345` | Full Admin Console (`/admin`), Inventory Restock, Order Pipeline |
| **Customer** | `customer@crustandco.com` | `password123` | Ordering, Custom Builder, Cart, Checkout, Tracking |

---

## 🧪 8. Quality & Verification Checks

Run comprehensive type-checking and production compilation across the entire monorepo:

```bash
# Typecheck all 4 packages (shared, ui, api, web)
npm run typecheck

# Full production build
npm run build
```

---

## 📜 9. License & Submission Info

Developed by **Lizan Sarkar** for **Oasis Infobyte Web Development & Designing Internship — Level 3**.  
All rights reserved © 2026 CRUST & CO. Artisanal Wood-Fired Pizza.
