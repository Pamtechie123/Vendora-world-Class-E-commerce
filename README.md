# Vendora — Multi-Vendor E-Commerce Platform

The Home page implementation of Vendora, built with **React 18 + TypeScript +
Tailwind CSS + Framer Motion + React Router**, following the brand system and
page-by-page plan from the Vendora brochure.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually **http://localhost:5173**).

Other scripts:

```bash
npm run build     # type-check + production build to /dist
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

## What's built so far

**Home page (`/`)** — fully implemented:

- Sticky header: utility bar, AI-styled search, nav, wishlist/cart badges, mobile menu
- Hero section with promo banners and trust indicators
- Dynamic category grid (10 categories)
- Flash Sales (with live countdown timer)
- Daily Deals
- Featured Brands
- Recommended Picks (personalized-style section)
- Trending Now
- Popular Collections
- Best Sellers
- New Arrivals
- Top-Rated Stores
- Customer Testimonials
- Blog & Buying Guides
- Newsletter signup (working form state)
- App download promo
- Full footer with company info, trust badges, and sitemap links

Every product/category/store/testimonial shown is placeholder data in
`src/data/mockData.ts` — swap this for real API data when the backend is
ready. Product photography is stand-in gradient tiles (`ProductImage.tsx`) —
swap in real `<img>` tags once you have product photos.

**Routing scaffold** — in place so navigation works end-to-end, with
"coming soon" placeholders ready to be built out next, page by page:

| Route             | Status      | Notes                                   |
|--------------------|------------|------------------------------------------|
| `/`                | ✅ Built    | Home page                                |
| `/products`        | 🔲 Placeholder | Category/search listing + filters   |
| `/product/:id`      | 🔲 Placeholder | Product detail page                 |
| `/cart`            | 🔲 Placeholder | Shopping cart                        |
| `/wishlist`        | 🔲 Placeholder | Saved items                          |
| `/login`           | 🔲 Placeholder | Auth (email/phone/social/OTP/2FA)   |

## Suggested build order (matches the platform plan)

1. ~~Home page~~ ✅
2. Product Listing / Category page (search results, smart filters)
3. Product Detail page (gallery, variants, reviews, Q&A)
4. Cart & Checkout flow
5. Authentication (signup/login/OTP/2FA)
6. Customer Portal (orders, wishlist, wallet, addresses)
7. Seller Portal
8. Admin Portal
9. Delivery Partner Portal
10. Customer Service Portal

## Project structure

```
src/
├── components/
│   ├── common/       Reusable UI: ProductCard, StarRating, SectionHeader, etc.
│   ├── home/          Home-page-only sections (Hero, ProductSection, etc.)
│   └── layout/        Header, Footer, page Layout wrapper
├── data/               Mock data (swap for real API calls)
├── pages/               One file per route
├── types/               Shared TypeScript interfaces
├── App.tsx              Route definitions
├── main.tsx              App entry point
└── index.css             Tailwind directives + global styles
```

## Brand tokens (Tailwind config)

| Token        | Hex       | Use                          |
|--------------|-----------|-------------------------------|
| `primary`    | `#2563EB` | Trust, links, primary actions |
| `secondary`  | `#10B981` | Success, growth, badges       |
| `accent`     | `#F97316` | CTAs, promotions, discounts   |
| `surface`    | `#F8FAFC` | Section backgrounds           |
| `ink`        | `#1E293B` | Body text                     |

Use them directly as Tailwind classes, e.g. `bg-primary`, `text-accent`,
`border-secondary-light`.
