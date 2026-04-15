# SKILL.md — AI-Based Enhanced E-Commerce Web App (Aura)

This document maps the **skills & technologies** used in this repository to **specific code locations** (evidence) and summarizes architecture.

---

## Repository Snapshot (What the code shows)

| Area | Observed Implementation |
|---|---|
| App Type | Frontend SPA (React + Create React App) |
| Routing | React Router (`src/App.js`) |
| Styling | Tailwind CSS (config present + utility classes throughout components/pages) |
| State Management | React Context for cart/auth (`src/context/*`) |
| Data Source | Static mock data (`src/data/products.js`, `src/data/mockData.js`) |
| “AI Feature” | AI Stylist page calls OpenAI endpoint or uses mock data (`src/pages/AiStylistPage.js`, `src/config/env.js`) |
| Persistence | `localStorage` for user/cart (`AuthContext`, `CartContext`) |
| Deployment | Vercel (`vercel.json`, README homepage link) |

---

## 1) Architecture Infographic (High-level)

```text
                 ┌─────────────────────────────────────┐
                 │            React SPA (CRA)           │
                 │         src/index.js → App.js        │
                 └─────────────────────────────────────┘
                                  │
                                  ▼
        ┌───────────────────────────────────────────────────────┐
        │                   Routing (React Router)              │
        │  /  /shop  /product/:id  /search  /checkout  /profile │
        │  /ai-stylist  /trends  /order-confirmation            │
        └───────────────────────────────────────────────────────┘
                 │                          │
                 │                          │
                 ▼                          ▼
   ┌──────────────────────────┐   ┌─────────────────────────────┐
   │  Context: Auth + Cart     │   │   Data Layer (Mock Data)     │
   │ AuthContext: localStorage │   │ products.js, mockData.js     │
   │ CartContext: localStorage │   └─────────────────────────────┘
   └──────────────────────────┘
                 │
                 ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ AI Stylist (Prototype)                                      │
   │ - Upload image (base64)                                     │
   │ - If env keys missing => mock recommendations               │
   │ - Else => POST OpenAI chat/completions (vision model prompt)│
   └─────────────────────────────────────────────────────────────┘
```

---

## 2) Tech Stack Table (from package.json + code)

| Category | Technology | Evidence |
|---|---|---|
| Frontend Framework | React 19 | `package.json`, `src/index.js` |
| Routing | react-router-dom | `package.json`, `src/App.js` |
| Styling | TailwindCSS + PostCSS + Autoprefixer | `tailwind.config.js`, `postcss.config.js`, Tailwind utility classes in pages/components |
| UI Components | Headless UI, Heroicons | `package.json` |
| Testing | React Testing Library + Jest DOM | `package.json`, `src/setupTests.js`, `src/App.test.js` |
| Deployment | Vercel | `vercel.json`, repo homepage points to Vercel |
| AI/API (prototype) | OpenAI API call from client | `src/pages/AiStylistPage.js` |
| Images | Unsplash key support + image fallback utilities | `src/config/env.js`, `src/utils/imageUtils.js`, `test-unsplash*.js` |

---

## 3) Skills-to-Code Evidence Matrix (Structured)

| Skill | What it looks like in this repo | Evidence (files) |
|---|---|---|
| SPA Architecture | Single-page app entry + root render | `src/index.js` |
| Client-side Routing | Multiple pages via `<Routes>` / `<Route>` | `src/App.js` |
| Component-based UI | Reusable UI components (header/footer/product cards/cart sidebar/toast) | `src/components/Header.js`, `src/components/Footer.js`, `src/components/ProductCard.js`, `src/components/CartSidebar.js`, `src/components/Toast.js` |
| State Management (Context API) | Global auth + cart providers wrapping the app | `src/App.js`, `src/context/AuthContext.js`, `src/context/CartContext.js` |
| Persistence (localStorage) | Remember user + cart across refresh | `src/context/AuthContext.js` (`aura_user`, `aura_users`), `src/context/CartContext.js` (`aura_cart`) |
| Auth UX (prototype) | Login/register simulated; profile/wishlist available | `src/context/AuthContext.js`, `src/components/auth/*`, `src/pages/ProfilePage.js` |
| E-Commerce Flows | Browse, filter, search, cart, checkout, order confirmation | `src/pages/ShopPage.js`, `src/pages/SearchPage.js`, `src/components/CartSidebar.js`, `src/pages/CheckoutPage.js`, `src/pages/OrderConfirmationPage.js` |
| Filtering & Sorting | Category + price range + sorting logic | `src/pages/ShopPage.js`, `src/pages/SearchPage.js` |
| AI Feature Integration | Upload image + send prompt with preferences; fallback to mock | `src/pages/AiStylistPage.js`, `src/config/env.js`, `src/data/mockData.js` |
| Environment Config | Reads env vars + validates in production | `src/config/env.js`, `src/utils/debug.js` |
| Defensive Programming | Checks for missing product fields before adding to cart, safe array handling | `src/components/ProductCard.js`, `src/context/CartContext.js` |
| UI Responsiveness | Tailwind responsive classes + mobile menu | `src/components/Header.js`, pages using `md:`/`lg:` layouts |
| Deployment Readiness | Vercel build script + config | `package.json` (`vercel-build`), `vercel.json` |

---

## 4) Flow Diagrams + Step Tables

### A) AI Stylist Flow (Image → Env Validation → OpenAI or Mock → UI)

#### Infographic (AI Stylist)

```text
User
 │
 │ 1) Upload image (<= 5MB)  ────────────────┐
 ▼                                            │
AiStylistPage (state: image, preferences, ...)│
src/pages/AiStylistPage.js                    │
 │                                            │
 │ 2) on mount: debugConfig + validateConfig   │
 │    - show config error only if prod & missing
 ▼
config/env.js + utils/debug.js
 │
 │ 3) "Get Style Recommendations" click
 ▼
Decision:
 ├─ If (useMockData || !openaiApiKey) ─────────────► setRecommendations(mockAIRecommendations)
 │                                                   usingMockData=true
 │                                                   (Demo mode banner)
 │
 └─ Else: fetch OpenAI chat/completions
        - model: "gpt-4-vision-preview"
        - sends text prompt + image_url(base64 data URL)
        - parses response.choices[0].message.content
        - fallback to mock on error
                     │
                     ▼
Recommendations UI (rendered list)
```

#### Structured table (AI Stylist Steps → Evidence)

| Step | What happens | Key logic (functions/state) | Evidence |
|---:|---|---|---|
| 1 | User uploads an image | `handleImageUpload`, `FileReader`, size check `5MB` | `src/pages/AiStylistPage.js` |
| 2 | Env/debug runs on mount | `React.useEffect`, `debugConfig()`, `validateConfig()` | `src/pages/AiStylistPage.js`, `src/utils/debug.js`, `src/config/env.js` |
| 3 | Decide mock vs real | `if (config.useMockData || !config.openaiApiKey)` | `src/pages/AiStylistPage.js`, `src/config/env.js` |
| 4 | Real OpenAI call | `fetch('https://api.openai.com/v1/chat/completions')` + bearer token | `src/pages/AiStylistPage.js` |
| 5 | Parse and render | `setRecommendations([recommendation])` then map in JSX | `src/pages/AiStylistPage.js` |
| 6 | Error fallback | catch → set error msg → use `mockAIRecommendations` | `src/pages/AiStylistPage.js`, `src/data/mockData.js` |

---

### B) Shopping Flow (Filters → Product Card → Add to Cart → Sidebar → Checkout → Confirmation)

#### Infographic (Shopping)

```text
ShopPage
src/pages/ShopPage.js
  │
  │ 1) Load products from mock data
  │    - allProductsData
  ▼
Filter/Sort pipeline (useMemo)
  - category filter
  - price filter
  - sorting (price asc/desc or default)
  │
  │ 2) Render ProductCard grid
  ▼
ProductCard
src/components/ProductCard.js
  │
  │ 3) Add to cart button
  │    - validates required fields
  ▼
CartContext.addToCart
src/context/CartContext.js
  │
  │ 4) Update state + persist to localStorage ("aura_cart")
  │ 5) Open Cart sidebar after delay (setIsCartOpen(true))
  ▼
CartSidebar
src/components/CartSidebar.js
  │
  │ 6) Update quantity / remove
  │ 7) Proceed to /checkout
  ▼
CheckoutPage → OrderConfirmationPage
src/pages/CheckoutPage.js / src/pages/OrderConfirmationPage.js
```

#### Structured table (Shopping Steps → Evidence)

| Step | What happens | Key logic | Evidence |
|---:|---|---|---|
| 1 | Load product catalog | `allProductsData` import | `src/pages/ShopPage.js`, `src/data/products.js` |
| 2 | Filter + sort + paginate | `useMemo` for filtered list; pagination state | `src/pages/ShopPage.js` |
| 3 | Add-to-cart from card | `handleAddToCart` validates `id/name/price`, calls `addToCart` | `src/components/ProductCard.js` |
| 4 | Cart update logic | Ensures array safety; merges quantities; constructs cart item shape | `src/context/CartContext.js` |
| 5 | Persist cart | `useEffect` saves `aura_cart` | `src/context/CartContext.js` |
| 6 | Sidebar UI | Renders items, subtotal, quantity changes | `src/components/CartSidebar.js` |
| 7 | Checkout navigation | `<Link to="/checkout">` | `src/components/CartSidebar.js`, routes in `src/App.js` |
| 8 | Route-level integration | Routes include shop/product/checkout/confirm | `src/App.js` |

---

### C) Auth Flow (Register/Login Modal → localStorage → Session → Wishlist/Logout)

#### Infographic (Auth)

```text
Header (top nav)
src/components/Header.js
  │
  │ Click user icon
  ▼
Decision (useAuth):
  ├─ Not authenticated → open AuthModal
  │       src/components/auth/AuthModal (dir exists)
  │
  └─ Authenticated → show dropdown
          - Profile / Wishlist / Logout
                  │
                  ▼
AuthContext
src/context/AuthContext.js
  │
  │ register/login simulate async delay
  │ save users list to localStorage: "aura_users"
  │ save current user to localStorage: "aura_user"
  ▼
App-wide session
(AuthProvider wraps App)
src/App.js
```

#### Structured table (Auth Steps → Evidence)

| Step | What happens | Key logic | Evidence |
|---:|---|---|---|
| 1 | Provider wraps app | `<AuthProvider>` wraps routes | `src/App.js` |
| 2 | Load session on startup | Reads `localStorage.getItem('aura_user')` | `src/context/AuthContext.js` |
| 3 | Register | Simulated delay; stores user in `aura_users`; sets `user` | `src/context/AuthContext.js` |
| 4 | Login | Simulated delay; validates against `aura_users`; sets `user` | `src/context/AuthContext.js` |
| 5 | Persist user | `useEffect` writes/removes `aura_user` when `user` changes | `src/context/AuthContext.js` |
| 6 | Wishlist toggle | `addToWishlist(productId)` updates profile | `src/context/AuthContext.js`, used by `src/components/ProductCard.js` |
| 7 | Header behavior | Not logged in opens modal; logged in shows dropdown + logout | `src/components/Header.js` |

---

## 5) Environment Variables (as implemented)

Expected client env vars (Create React App style):

```env
REACT_APP_OPENAI_API_KEY=...
REACT_APP_UNSPLASH_API_KEY=...
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_USE_MOCK_DATA=true
```

Evidence: `src/config/env.js`, `src/utils/debug.js`