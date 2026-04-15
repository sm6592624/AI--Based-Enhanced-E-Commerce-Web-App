---
title: "Aura — Skills & Technologies → Code Evidence Map"
description: >
  USE THIS SKILL whenever you need to understand, modify, review, or explain the
  Aura (AI-Based Enhanced E-Commerce Web App) React SPA.  It maps every skill
  and technology to the exact source files that prove it, describes feature flows
  step-by-step, and flags known gaps.  Reach for it before reading raw code.
last_verified_commit: "e828ce7"
last_verified_date: "2026-04-15"
---

# Aura — Skills & Technologies → Code Evidence Map

> **One-liner:** A React 19 SPA (Create React App) that demo's an AI-powered
> personal stylist, full e-commerce shopping flow, and prototype auth — all
> backed by mock data with optional live OpenAI / Unsplash integration.

---

## Table of Contents

1. [Repository Snapshot](#1-repository-snapshot)
2. [Architecture Diagram](#2-architecture-diagram)
3. [Tech Stack Evidence Table](#3-tech-stack-evidence-table)
4. [Skills → Evidence Matrix](#4-skills--evidence-matrix)
5. [Feature Flows](#5-feature-flows)
   - [AI Stylist Flow](#a-ai-stylist-flow)
   - [Shopping Flow](#b-shopping-flow)
   - [Auth Flow](#c-auth-flow)
6. [Environment Variables](#6-environment-variables)
7. [Known Gaps & Risks](#7-known-gaps--risks)
8. [Suggested Next Steps](#8-suggested-next-steps)
9. [Mini Eval Prompts](#9-mini-eval-prompts)

---

## 1. Repository Snapshot

| Dimension | Value |
|---|---|
| **App type** | Client-side SPA (React 19 + Create React App) |
| **Entry point** | `src/index.js` → `src/App.js` |
| **Routing** | `react-router-dom` v7 — nine routes (`src/App.js`) |
| **Styling** | Tailwind CSS 3 + PostCSS + Autoprefixer |
| **State management** | React Context API (`src/context/AuthContext.js`, `src/context/CartContext.js`) |
| **Data layer** | Static mock catalogues (`src/data/products.js`, `src/data/mockData.js`) |
| **AI feature** | AI Stylist — calls OpenAI Vision API or falls back to mock (`src/pages/AiStylistPage.js`) |
| **Image service** | Optional Unsplash API with fallback utilities (`src/config/env.js`, `src/utils/imageUtils.js`) |
| **Persistence** | `localStorage` (`aura_user`, `aura_users`, `aura_cart`) |
| **Testing** | React Testing Library + Jest DOM (`src/setupTests.js`, `src/App.test.js`) |
| **Deployment** | Vercel (`vercel.json`, `package.json` `vercel-build` script) |

---

## 2. Architecture Diagram

```text
┌────────────────────────────────────────────────────────────┐
│                     React SPA (CRA)                        │
│                 src/index.js  →  src/App.js                │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│                  Routing (react-router-dom)                 │
│  /  /shop  /product/:id  /search  /trends  /ai-stylist     │
│  /profile  /checkout  /order-confirmation                  │
└────────┬──────────────────────────────┬────────────────────┘
         │                              │
         ▼                              ▼
┌─────────────────────────┐  ┌──────────────────────────────┐
│  Context Providers       │  │  Data Layer (mock)            │
│  AuthContext → localStorage│  │  src/data/products.js         │
│  CartContext → localStorage│  │  src/data/mockData.js         │
└────────┬────────────────┘  └──────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│  AI Stylist (prototype)                                     │
│  • Upload image (base64, ≤ 5 MB)                            │
│  • Env keys present → POST OpenAI chat/completions (Vision) │
│  • Env keys absent  → mock recommendations from mockData.js │
└────────────────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│  Vercel (deployment)                                        │
│  vercel.json  •  SPA fallback to /index.html                │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Tech Stack Evidence Table

| Category | Technology | Version / Config | Evidence |
|---|---|---|---|
| Frontend framework | React | 19.1 | `package.json`, `src/index.js` |
| Routing | react-router-dom | 7.7 | `package.json`, `src/App.js` |
| Styling | Tailwind CSS | 3.4 | `tailwind.config.js`, `postcss.config.js`, utility classes in components/pages |
| UI primitives | Headless UI | 2.2 | `package.json` |
| Icons | Heroicons | 2.2 | `package.json`, `src/assets/icons.js` |
| Testing | React Testing Library + Jest DOM | 16.3 / 6.6 | `package.json`, `src/setupTests.js`, `src/App.test.js` |
| Build tooling | Create React App (react-scripts) | 5.0 | `package.json` |
| AI integration | OpenAI API (client-side fetch) | — | `src/pages/AiStylistPage.js` |
| Image service | Unsplash API (optional) | — | `src/config/env.js`, `src/utils/imageUtils.js` |
| Deployment | Vercel | v2 config | `vercel.json`, `package.json` (`vercel-build`) |

---

## 4. Skills → Evidence Matrix

| Skill | Manifestation in Repo | Key Files |
|---|---|---|
| **SPA architecture** | Single entry point, client-side rendering | `src/index.js`, `src/App.js` |
| **Client-side routing** | Declarative `<Routes>` / `<Route>` for nine pages | `src/App.js` |
| **Component-based UI** | Reusable Header, Footer, ProductCard, CartSidebar, Toast | `src/components/Header.js`, `src/components/Footer.js`, `src/components/ProductCard.js`, `src/components/CartSidebar.js`, `src/components/Toast.js` |
| **State management (Context API)** | `AuthProvider` + `CartProvider` wrap the app | `src/context/AuthContext.js`, `src/context/CartContext.js`, `src/App.js` |
| **Persistence (localStorage)** | Cart (`aura_cart`), user session (`aura_user`), user registry (`aura_users`) | `src/context/CartContext.js`, `src/context/AuthContext.js` |
| **Auth UX (prototype)** | Modal login/register with simulated delay; profile & wishlist | `src/components/auth/AuthModal.js`, `src/components/auth/LoginForm.js`, `src/components/auth/RegisterForm.js`, `src/pages/ProfilePage.js` |
| **E-commerce flows** | Browse → filter → search → cart → checkout → confirmation | `src/pages/ShopPage.js`, `src/pages/SearchPage.js`, `src/components/CartSidebar.js`, `src/pages/CheckoutPage.js`, `src/pages/OrderConfirmationPage.js` |
| **Filtering & sorting** | Category, price range, sort order via `useMemo` | `src/pages/ShopPage.js`, `src/pages/SearchPage.js` |
| **AI feature integration** | Image upload → OpenAI Vision prompt; graceful mock fallback | `src/pages/AiStylistPage.js`, `src/config/env.js`, `src/data/mockData.js` |
| **Environment configuration** | Central config with dev/prod validation | `src/config/env.js`, `src/utils/debug.js` |
| **Defensive programming** | Field validation before cart add; safe array checks | `src/components/ProductCard.js`, `src/context/CartContext.js` |
| **Responsive design** | Tailwind responsive utilities (`md:`, `lg:`), mobile menu | `src/components/Header.js`, layout classes across pages |
| **Custom hooks** | Router preload hook (currently disabled for debugging) | `src/hooks/useRouterPreload.js` |
| **Deployment readiness** | Vercel SPA config with static asset caching | `vercel.json`, `package.json` |

---

## 5. Feature Flows

### A) AI Stylist Flow

**Path:** User uploads image → env validation → OpenAI call _or_ mock → UI renders recommendations.

```text
User
 │  1) Upload image (≤ 5 MB)
 ▼
AiStylistPage  ──── src/pages/AiStylistPage.js
 │  2) useEffect → debugConfig() + validateConfig()
 ▼
config/env.js + utils/debug.js
 │  3) Click "Get Style Recommendations"
 ▼
Decision
 ├─ useMockData || !openaiApiKey ──► mock recommendations (mockData.js)
 │                                   Demo-mode banner shown
 └─ Else ──► fetch OpenAI chat/completions (gpt-4-vision-preview)
              Parse response → setRecommendations
              On error → fallback to mock
```

| Step | Action | Logic / State | Evidence |
|---:|---|---|---|
| 1 | Upload image | `handleImageUpload`, `FileReader`, 5 MB size check | `src/pages/AiStylistPage.js` |
| 2 | Validate env on mount | `useEffect` → `debugConfig()`, `validateConfig()` | `src/pages/AiStylistPage.js`, `src/utils/debug.js`, `src/config/env.js` |
| 3 | Decide mock vs live | `config.useMockData` or `!config.openaiApiKey` | `src/pages/AiStylistPage.js`, `src/config/env.js` |
| 4 | Call OpenAI (live path) | `fetch('https://api.openai.com/v1/chat/completions')` + bearer token | `src/pages/AiStylistPage.js` |
| 5 | Render results | `setRecommendations([…])` mapped in JSX | `src/pages/AiStylistPage.js` |
| 6 | Error fallback | `catch` → error message → `mockAIRecommendations` | `src/pages/AiStylistPage.js`, `src/data/mockData.js` |

---

### B) Shopping Flow

**Path:** Browse catalogue → filter/sort → add to cart → sidebar → checkout → confirmation.

```text
ShopPage  ──── src/pages/ShopPage.js
 │  1) Import allProductsData
 ▼
Filter / Sort pipeline (useMemo)
 │  2) Render ProductCard grid
 ▼
ProductCard  ──── src/components/ProductCard.js
 │  3) Add-to-cart (validates id/name/price)
 ▼
CartContext.addToCart  ──── src/context/CartContext.js
 │  4) Merge quantities, persist to localStorage ("aura_cart")
 │  5) Open CartSidebar after short delay
 ▼
CartSidebar  ──── src/components/CartSidebar.js
 │  6) Adjust quantity / remove items
 │  7) Navigate to /checkout
 ▼
CheckoutPage → OrderConfirmationPage
```

| Step | Action | Logic | Evidence |
|---:|---|---|---|
| 1 | Load catalogue | `allProductsData` import | `src/pages/ShopPage.js`, `src/data/products.js` |
| 2 | Filter + sort + paginate | `useMemo` pipeline; pagination state | `src/pages/ShopPage.js` |
| 3 | Add to cart | `handleAddToCart` validates required fields → `addToCart` | `src/components/ProductCard.js` |
| 4 | Cart state update | Array safety checks; quantity merge; cart item shape | `src/context/CartContext.js` |
| 5 | Persist cart | `useEffect` → `localStorage.setItem('aura_cart', …)` | `src/context/CartContext.js` |
| 6 | Sidebar UI | Renders items, subtotal, quantity controls | `src/components/CartSidebar.js` |
| 7 | Checkout navigation | `<Link to="/checkout">` | `src/components/CartSidebar.js`, `src/App.js` |
| 8 | Order confirmation | Route renders confirmation page | `src/pages/CheckoutPage.js`, `src/pages/OrderConfirmationPage.js` |

---

### C) Auth Flow

**Path:** Header icon → modal (login/register) → localStorage session → profile/wishlist.

```text
Header  ──── src/components/Header.js
 │  Click user icon
 ▼
Decision (useAuth)
 ├─ Not authenticated → AuthModal  ──── src/components/auth/AuthModal.js
 │       LoginForm / RegisterForm
 └─ Authenticated → dropdown (Profile / Wishlist / Logout)
 ▼
AuthContext  ──── src/context/AuthContext.js
 │  register/login → simulated async delay
 │  Persist: "aura_users" (registry), "aura_user" (session)
 ▼
App-wide session  (AuthProvider wraps App in src/App.js)
```

| Step | Action | Logic | Evidence |
|---:|---|---|---|
| 1 | Provider wraps app | `<AuthProvider>` around routes | `src/App.js` |
| 2 | Restore session | `localStorage.getItem('aura_user')` on mount | `src/context/AuthContext.js` |
| 3 | Register | Simulated delay → store in `aura_users` → set `user` | `src/context/AuthContext.js` |
| 4 | Login | Simulated delay → validate against `aura_users` → set `user` | `src/context/AuthContext.js` |
| 5 | Persist user | `useEffect` writes/removes `aura_user` | `src/context/AuthContext.js` |
| 6 | Wishlist toggle | `addToWishlist(productId)` updates user profile | `src/context/AuthContext.js`, `src/components/ProductCard.js` |
| 7 | Header behaviour | Unauthenticated → modal; authenticated → dropdown + logout | `src/components/Header.js` |

---

## 6. Environment Variables

All variables follow Create React App's `REACT_APP_` prefix convention.

| Variable | Required | Default | Purpose | Evidence |
|---|---|---|---|---|
| `REACT_APP_OPENAI_API_KEY` | No* | — | Enables live AI Stylist calls | `src/config/env.js` |
| `REACT_APP_UNSPLASH_API_KEY` | No* | — | Enables live product images | `src/config/env.js`, `src/utils/imageUtils.js` |
| `REACT_APP_API_BASE_URL` | No | `http://localhost:3001/api` | Backend API root (unused in prototype) | `src/config/env.js` |
| `REACT_APP_USE_MOCK_DATA` | No | `true` when Unsplash key absent | Force mock-data mode | `src/config/env.js` |

> \* When both API keys are absent the app runs fully in **demo mode** with
> mock data.  In production (`NODE_ENV=production`), `validateConfig()` logs
> errors for missing keys and throws — so they are effectively **required in
> production** but optional during local development.

Reference template: `.env.example`

---

## 7. Known Gaps & Risks

> ⚠️ This is a **prototype / portfolio project**, not production-hardened.

| Area | Gap | Impact |
|---|---|---|
| **Security** | OpenAI API key exposed to the browser (`src/pages/AiStylistPage.js` sends it in a client-side `fetch`) | Key can be extracted from DevTools; should proxy through a backend |
| **Auth** | No real backend; passwords stored in plain-text `localStorage` | Not suitable for real users |
| **Payments** | Checkout collects form data but performs no payment processing | Order confirmation is cosmetic |
| **Testing** | Only a default CRA smoke test exists (`src/App.test.js`) | Low coverage; regressions possible |
| **Backend** | `REACT_APP_API_BASE_URL` is configured but no backend server exists in this repo | API calls (if any beyond OpenAI) would fail |
| **Accessibility** | No explicit ARIA audit; relies on Headless UI defaults | May not meet WCAG 2.1 AA |
| **SEO** | Client-rendered SPA with no SSR or meta-tag management | Limited discoverability |

---

## 8. Suggested Next Steps

1. **Move API keys server-side** — add a small Express/Vercel-serverless proxy so secrets never reach the browser.
2. **Add real auth** — integrate an identity provider (e.g. Firebase Auth, Auth0) to replace `localStorage` passwords.
3. **Expand test coverage** — unit tests for Context reducers, integration tests for shopping & auth flows.
4. **Accessibility audit** — run axe-core or Lighthouse and fix flagged issues.
5. **Payment integration** — wire Stripe or a similar provider into the checkout flow.
6. **SSR / meta tags** — consider Next.js migration or `react-helmet` for SEO.

---

## 9. Mini Eval Prompts

Use these prompts to quickly verify understanding of the codebase:

| # | Prompt | Expected answer touches |
|---|---|---|
| 1 | _"How does the AI Stylist decide whether to call OpenAI or use mock data?"_ | `src/config/env.js` `useMockData` flag, `src/pages/AiStylistPage.js` conditional branch |
| 2 | _"Trace what happens when a user clicks 'Add to Cart' on a product card."_ | `src/components/ProductCard.js` validation → `CartContext.addToCart` → `localStorage` persist → `CartSidebar` opens |
| 3 | _"Where are user credentials stored and why is that a risk?"_ | `localStorage` keys `aura_user` / `aura_users` in `src/context/AuthContext.js`; plain-text, client-side only |
| 4 | _"What would you change first to make this production-ready?"_ | Move OpenAI key behind a backend proxy; replace localStorage auth; add tests |
| 5 | _"Which environment variables does the app read and what happens if they are all missing?"_ | Four `REACT_APP_*` vars in `src/config/env.js`; app falls back to demo/mock mode in dev, throws in production |
