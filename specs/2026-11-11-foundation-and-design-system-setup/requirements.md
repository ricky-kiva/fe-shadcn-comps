# Requirements: Foundation & Design System Setup

## 1. Feature Overview & Objective

Phase 1 of the SHADCN Explorer roadmap establishes the technical and architectural foundation of the project. The objective is to initialize a clean, reproducible Vite + React + TypeScript application fully configured with Tailwind CSS, the Vercel-inspired design tokens from `DESIGN.md`, and the configuration required for shadcn/ui CLI tooling.

This foundation ensures that all subsequent feature phases (Header/Shell, Grid & Drag-and-Drop, and Component Previews) build upon verified types, uniform token variables, and a functioning build pipeline.

---

## 2. Context & Architectural Rationale

- **Vite + React 19/18 + TypeScript:** Provides an instantaneous development loop (sub-second HMR) and strict compile-time type verification.
- **Path Aliasing (`@/*`):** Standardizes all project imports to root `src/` directory, preventing fragile relative pathing (`../../..`) and adhering to shadcn/ui import conventions.
- **Vercel Design System (`DESIGN.md`):** Rather than using generic Tailwind defaults, colors, shadows, and typography tokens are explicitly mapped to CSS variables, enforcing the `#171717` ink identity, hairline borders, and dark-mode-first aesthetic.
- **shadcn/ui Configuration (`components.json`):** Configures the project so that official shadcn components can be installed seamlessly via CLI into `src/components/ui`.

---

## 3. Scope

### In Scope
1. **Build & Tooling Scaffolding:**
   - `package.json` with scripts: `dev`, `build`, `preview`, `lint`, and `tsc`.
   - `vite.config.ts` configured with React plugin and `@/` path alias pointing to `./src`.
   - `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json` with strict type checking enabled (`strict: true`, `noImplicitAny: true`).
2. **Dependency Installation & Safety Audit:**
   - Production dependencies: `react`, `react-dom`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, and `@dnd-kit` primitives (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`).
   - Development dependencies: `typescript`, `@types/react`, `@types/react-dom`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`.
   - Security verification using Socket CLI (`socket`).
3. **Styling & Token Architecture:**
   - Tailwind configuration integrated with `src/index.css`.
   - CSS custom properties representing the `DESIGN.md` token set:
     - Primary ink: `#171717`
     - Light canvas: `#ffffff`, canvas-soft: `#fafafa`
     - Dark canvas: `#000000`, canvas-soft: `#0a0a0a`
     - Hairline borders: `#ebebeb` (light), `#262626` (dark)
     - Radii: 6px (`--radius-sm`), 8px (`--radius-md`), 12px (`--radius-lg`), full pills (`--radius-full`)
     - Stacked elevation shadows.
     - Typography: Geist Sans, Geist Mono, with display negative tracking (`-2.4px`).
4. **Core Utilities & shadcn CLI Integration:**
   - `src/lib/utils.ts` exporting the canonical `cn()` helper (`clsx` + `tailwind-merge`).
   - `components.json` configured for shadcn/ui (style, aliases, Tailwind CSS path, Lucide icons).
5. **Foundational Smoke Harness:**
   - `src/main.tsx` and `src/App.tsx` displaying a minimal verification screen showing design token resolution, dark-mode default, and branding asset loading (`logo-1-1.png`, `favicon.png`).

### Out of Scope
- Full application shell (Header, Filter, Theme Toggle, Footer) — deferred to Phase 2.
- Component Grid and Drag-and-Drop sorting engine — deferred to Phase 3.
- Populating the 53 core component preview implementations — deferred to Phase 4.
- Non-standard/extended components (chat primitives, non-registry items) — permanently excluded.

---

## 4. Key Architectural Decisions

| Decision | Selected Approach | Rationale |
|---|---|---|
| **Bundler** | Vite (ESM) | Fastest dev start, standard shadcn/ui template target, small footprint. |
| **Path Alias** | `@/*` -> `./src/*` | Matches official shadcn/ui CLI requirements and keeps import paths uniform. |
| **Styling Tokens** | CSS Custom Properties in `src/index.css` | Allows runtime theme flipping (dark/light) while Tailwind utility classes consume semantic variables (`bg-background`, `border-border`). |
| **Default Theme** | Dark mode default | Mandated by `INITIAL-IDEA.md` and `DESIGN.md`. Root element initializes with `dark` class. |
| **Icon Library** | `lucide-react` | Standard iconography for shadcn/ui with clean stroke geometry matching Geist typography. |
| **Drag & Drop Engine** | `@dnd-kit` | Verified via Socket scan (99 supply chain, 100 vulnerability); built for 2D responsive grid sorting. |

---

## 5. Non-Functional Requirements & Constraints

- **Type Safety:** Zero TypeScript compiler errors (`npx tsc --noEmit` returns exit code 0). No `any` assertions.
- **Code Style:** Named exports exclusively across application files.
- **Security:** All installed npm packages must pass Socket CLI verification without high-severity or unvetted CVE alerts.
- **Zero Extraneous Scaffolding:** No template bloat (no default Vite SVG counters or sample CSS files).
