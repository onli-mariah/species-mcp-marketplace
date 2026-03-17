# INSTRUCTIONS.md — Species.market
> Source of truth for the Species.market rebrand.
> Read this before making ANY changes to the codebase.

---

## 🧠 Project Overview

**Species.market** is being reframed from a currency/product site into a **developer use-case exploration tool** — a living example of what can be built on top of the Onli ecosystem.

The centerpiece is the `/develop` React Flow workflow canvas, which demonstrates the full architecture of a marketplace built on Onli. The landing page exists to contextualize that canvas and funnel developers toward it.

**One-line positioning:**
> "Species is a headless marketplace built on Onli — an example of what's possible."

---

## 🏗️ Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 15 (App Router) | All routes live in `/app` as folders |
| React | 19 | Modern patterns only |
| TypeScript | 5.9 | Strict — always type props and returns |
| Tailwind CSS | 4.1 | CSS variables via `@theme` — no hardcoded colors |
| Framer Motion | latest | Use for all animations — subtle and minimal |
| React Flow | @xyflow/react | Powers the `/develop` canvas — restyle only |
| Radix UI + Lucide | latest | UI primitives and icons |
| pnpm | latest | ONLY package manager — never npm or yarn |

---

## 🎨 Design System — White Brutalism

Species.market uses a **white brutalism minimalist** aesthetic that matches Onli.cloud and Onli.you.

### Visual Language
- **Background:** Off-white / light gray — `#f5f5f5` or `#fafafa`
- **Text:** Near-black — `#0a0a0a` or `#111111`
- **Accents:** Subtle gray borders, no color splashes
- **Typography:** Clean sans-serif, lowercase preferred for labels, sparse hierarchy
- **Navigation:** Pill-shaped labels, minimal — matches Onli.cloud exactly
- **Layout:** Grid-based, architectural, generous whitespace
- **Imagery:** Functional or none — no dramatic hero photography
- **Motion:** Framer Motion only — subtle fade-ins and reveals, nothing bouncy or cinematic
- **Borders:** Thin `1px` gray — used sparingly for structure
- **Buttons:** Minimal — outlined or plain, never filled with color unless primary CTA

### Reference Sites
- onli.cloud — primary aesthetic reference
- onli.you — secondary reference

### What This Is NOT
- No dark backgrounds
- No dramatic full-bleed imagery
- No warrior/cinematic vibes (that's Neich)
- No neon, gradients, or crypto aesthetics

---

## 📁 Page Structure

### Pages to Build / Restyle:

**`/` (Landing Page)**
- Hero: Clean, full-width, minimal — headline + one-line positioning statement
- Explainer section: What is Species? What is Onli? Why does this exist?
- Feature/capability callouts: 3–4 cards highlighting what the demo showcases
- CTAs: "Explore the Workflow" → `/develop`, links to Onli.cloud and Onli.you, Contact

**`/develop` (Workflow Canvas)**
- Keep React Flow canvas fully interactive — restyle only
- Apply white brutalism theme: light background, dark nodes, clean typography
- Inspector panel and sidebar should match the new aesthetic
- This is the main product of the site — it must feel polished

### Navigation
- **Logo:** "species.market" — lowercase, minimal weight
- **Links:** Home · Develop · Onli.cloud (external) · Onli.you (external)
- **Style:** Pill-shaped labels on light background — matches Onli.cloud nav exactly
- **No CTA button** in nav — keep it clean

### Routes to REMOVE or IGNORE:
- `/earlybird` — not needed
- `/events` — not needed
- `/documentation` — not needed for this phase
- Any countdown timer — remove entirely
- Any waitlist form — remove entirely
- Any "request invite" CTAs — not relevant to Species

---

## ✍️ Copy Direction

### Hero
- Headline: Clean, declarative, developer-facing
- Example direction: *"Build anything. Species shows you how."*
- Subline: *"A headless marketplace built on Onli — open for exploration."*

### Explainer Section
- What is Species? A demo marketplace, not a product for sale
- What is Onli? True digital property infrastructure — no blockchain
- Why Species? To show developers the full stack of what's possible

### Feature Callouts (3–4 cards)
Highlight capabilities visible in the `/develop` canvas:
- Marketplace API
- Authenticator / Security
- Asset Delivery
- Floor Manager / Matching Service

### CTAs
- Primary: "Explore the Workflow" → `/develop`
- Secondary: "Build on Onli" → `onli.cloud`
- Tertiary: "Get Onli.You" → `onli.you`
- Footer: Contact link

---

## 🚫 Copy Guardrails

| ✅ Say this | ❌ Not this |
|------------|------------|
| "built on Onli" | "powered by blockchain" |
| "true digital property" | "NFT" or "token" |
| "Onli Appliance" | "smart contract" |
| "example marketplace" | "Species is Onli's currency" |
| "developer use case" | "waitlist" or "invite only" |
| "actual possession" | "on-chain" |

---

## 🔗 Ecosystem Context

| Brand | URL | Role |
|-------|-----|------|
| Onli.You | onli.you | Owner app — digital identity & vaults |
| Onli.Cloud | onli.cloud | Orchestration layer — where appliances plug in |
| Species.market | species.market | Developer use-case: example marketplace on Onli |
| Neich.market | neich.market | Separate project — native currency appliance |

Species.market is part of the Onli ecosystem but is **not** the same codebase as Neich going forward. They share an origin repo but are now separate identities.