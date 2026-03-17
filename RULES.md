# RULES.md — Species.market
> Hard guardrails for AI-assisted development.
> Follow on every task. No exceptions.

---

## 🔴 NEVER DO

| Rule | Why |
|------|-----|
| Never refactor `workflow-canvas.tsx` logic | It's complex and working — styling changes ONLY |
| Never modify `app/api/` routes | Backend is out of scope for this phase |
| Never use `npm` or `yarn` | pnpm only — mixing breaks the lockfile |
| Never hardcode hex color values in components | Use CSS variables / Tailwind tokens only |
| Never install new packages without explicit instruction | Ask first |
| Never add dark backgrounds, dramatic imagery, or cinematic motion | That's Neich — Species is white brutalism |
| Never reference Species as a currency or Onli product | It is a developer demo only |
| Never use blockchain, Web3, NFT, or crypto language | Onli is NOT blockchain |
| Never delete files — move or rename only | Hard to recover from in AI sessions |
| Never add countdown timers or waitlist forms | Not relevant to Species post-rebrand |

---

## 🟡 ALWAYS DO

| Rule | Why |
|------|-----|
| Always use `cn()` from `lib/utils.ts` for className merging | Keeps Tailwind classes clean |
| Always use TypeScript — type all props and returns | Strict codebase — no `any` |
| Always use Framer Motion for animations | Already configured — subtle reveals only |
| Always use Radix UI / existing `ui/` components for primitives | Don't reinvent what exists |
| Always use Lucide React for icons | Already installed |
| Always keep motion subtle — fades and slides only | White brutalism is calm, not cinematic |
| Always use lowercase for nav labels and UI labels | Matches Onli.cloud convention |
| Always add `"use client"` when using hooks or browser APIs | Required for Next.js App Router + React 19 |
| Always keep the `/develop` canvas as the hero feature | It is the main point of the site |

---

## 🟢 CONVENTIONS

### Component Structure
```tsx
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionProps {
  title: string
  description?: string
}

export function Section({ title, description }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full py-24 px-6", "bg-background text-foreground")}
    >
      <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg">{description}</p>
      )}
    </motion.section>
  )
}
```

### Typography Scale (White Brutalism)
- **Section labels:** `text-xs uppercase tracking-widest text-muted-foreground`
- **Headlines:** `text-4xl font-light` or `text-5xl font-extralight`
- **Body:** `text-base text-foreground/80`
- **Nav links:** `text-sm lowercase`

### Color Tokens to Define in globals.css
```css
:root {
  --background: oklch(0.98 0 0);       /* near-white */
  --foreground: oklch(0.08 0 0);       /* near-black */
  --muted: oklch(0.94 0 0);            /* light gray panels */
  --muted-foreground: oklch(0.45 0 0); /* mid gray text */
  --border: oklch(0.88 0 0);           /* subtle borders */
}
```

### Commit Message Format
```
[species] short description of change
```
Examples:
- `[species] restyle landing page hero to white brutalism`
- `[species] apply white theme to develop canvas nodes`
- `[species] add feature callout cards to landing page`

---

## 📋 Pre-Task Checklist
> Run this mentally before every Antigravity task:

```
[ ] I have read INSTRUCTIONS.md
[ ] This change is for Species.market only
[ ] I am NOT touching workflow-canvas.tsx logic
[ ] I am NOT modifying app/api/ routes
[ ] I am using pnpm if installing anything
[ ] I am using CSS variables — no hardcoded colors
[ ] My motion is subtle — no cinematic or dramatic animations
[ ] My copy does not reference Species as a currency
[ ] I am NOT adding blockchain / Web3 / crypto language
```

---

## 💬 Effective Antigravity Prompts for This Project

**Be explicit about the aesthetic:**
> ✅ "Restyle the hero section to match white brutalism — off-white background, near-black text, no imagery, lowercase nav labels, subtle fade-in animation."

**Protect the canvas:**
> ✅ "Apply the white brutalism color tokens to the React Flow canvas nodes and edges in workflow-canvas.tsx. Change colors only — do not touch any logic, event handlers, or data structures."

**Scope your tasks tightly:**
> ✅ "Only change the landing page. Do not touch /develop or any other route."

**Ask for a plan on big tasks:**
> ✅ "Before making changes, show me your plan for restyling the /develop canvas to white brutalism."