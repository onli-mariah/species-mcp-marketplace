# CONTEXT.md — Species.market
> The "why" behind the "what." Business and brand context for AI-assisted development.

---

## 🏢 What Species.market Is Now

Species.market is a **developer use-case exploration tool** — a working example of a headless marketplace built on the Onli ecosystem. It is not a product for sale. It is not Onli's currency. It exists to show developers what is possible when building on Onli infrastructure.

**Positioning statement:**
> "Species is a headless marketplace built on Onli — an example of what's possible."

---

## 🔄 What It Used to Be (and What to Remove)

Species.market was previously positioned as a micro-currency/appliance in the Onli ecosystem — Onli's native currency. Due to trademark issues, that positioning has been retired.

### Remove all references to:
- Species as a currency, stablecoin, or financial instrument
- "Your first intelligent asset"
- Waitlists, invite codes, or early access
- Countdown timers
- Pricing or treasury language
- Any "native currency of Onli" framing

---

## 🧱 The Onli Ecosystem

**Onli** creates true digital property — without blockchain, miners, or centralized intermediaries. Assets are singular, owned, and transferred by a change in possession, just like physical objects.

| Property | URL | Role |
|----------|-----|------|
| Onli.You | onli.you | Owner-facing app — digital identity & vaults |
| Onli.Cloud | onli.cloud | Orchestration layer — where appliances plug in |
| Species.market | species.market | Developer demo: example marketplace on Onli |
| Neich.market | neich.market | Separate site — Onli's native currency appliance |

---

## 🎯 Target Audience

Species.market speaks to **developers and technical builders** who are evaluating Onli as a platform. They want to understand:
- What the architecture looks like
- How the components connect
- What they could build on top of Onli
- How to get started with Onli.cloud

---

## 🗺️ The /develop Canvas — What It Shows

The React Flow workflow canvas is the centerpiece of the site. It demonstrates the full service architecture of a marketplace built on Onli. Key nodes include:

| Node | Role |
|------|------|
| Developer UI | Front-end submission layer |
| Authenticator | Security gate & Onli ID verification |
| Marketplace API | Core ingress gateway (v4.1) |
| Validator | Schema + firewall checks |
| Classifier | Buy / sell / transfer routing |
| Matching Service | Counterparty resolution |
| Cashier Service | Payment confirmation |
| Asset Delivery Service | Ownership transfer + Onli Cloud sync |
| Floor Manager Service | Final event composition |

This canvas is **fully interactive** — developers can click nodes to inspect logic, headers, and TypeScript interfaces. It must remain functional at all times.

---

## 🎨 Aesthetic Reference — White Brutalism

Species.market should feel like a sibling to **Onli.cloud**. Key visual characteristics observed on Onli.cloud:

- Off-white/light gray full-page background
- Pill-shaped navigation labels, lowercase
- Sparse typography — lots of breathing room
- Minimal or no hero imagery
- Small uppercase tracking labels for section identifiers
- Clean sans-serif throughout
- No color accents — monochromatic palette
- Subtle layout grid — content feels architectural
- Photography when used: editorial, black and white, studio quality

---

## 📄 Landing Page Content Plan

### Hero
- **Label:** `species.market`
- **Headline:** *"Build anything. Species shows you how."*
- **Subline:** *"A headless marketplace built on Onli — open for exploration."*
- **CTA:** "Explore the Workflow →" linking to `/develop`

### Explainer Section
Three columns or a clean two-column layout:
- **What is Species?** A working demo of a marketplace appliance built on Onli infrastructure.
- **What is Onli?** True digital property — singular, owned, transferred by possession. No blockchain.
- **Why explore it?** To understand the full service architecture behind a real Onli-powered product.

### Feature Callouts (4 cards)
Pulled from the canvas nodes:
1. **Marketplace API** — Single-endpoint ingress with full validation and routing
2. **Authenticator** — Onli ID verification and security enforcement
3. **Asset Delivery** — Ownership transfer synced to Onli Cloud vaults
4. **Floor Manager** — Event composition and final settlement

### CTA Section
- "Explore the Workflow" → `/develop`
- "Build on Onli.cloud" → `onli.cloud` (external)
- "Get Onli.You" → `onli.you` (external)
- "Get in touch" → mailto or contact form (placeholder for now)

---

## 🔗 External Links

| Destination | URL | Context |
|-------------|-----|---------|
| Onli.cloud | https://onli.cloud | Where developers build appliances |
| Onli.you | https://onli.you | Where owners manage their assets |
| Apple App Store | TBD | Onli.You app download |