# Implementation Plan: Foundation & Design System Setup

## Overview

This implementation plan decomposes Phase 1 ("Foundation & Design System Setup") into structured, vertically ordered, and verifiable task groups. The goal is to establish the complete Vite + React + TypeScript pipeline, install security-audited dependencies, configure Tailwind CSS with `DESIGN.md` tokens, configure shadcn/ui via `components.json`, and verify the baseline with a smoke harness.

---

## Dependency Graph

```
Task Group 1: Scaffolding & TypeScript Configuration
    │
    ▼
Task Group 2: Dependency Installation & Socket Audit
    │
    ▼
Task Group 3: Styling Engine & DESIGN.md Token Mapping
    │
    ▼
Task Group 4: shadcn CLI Config & Foundational Smoke Harness
```

---

## Task Groups

### Task Group 1: Scaffolding & TypeScript Configuration

#### Task 1.1: Project Manifest & Scaffolding Scripts
**Description:** Create `package.json` with project metadata, dependencies structure, and executable scripts (`dev`, `build`, `preview`, `lint`, `tsc`).
**Acceptance criteria:**
- [ ] `package.json` is configured as `"type": "module"`.
- [ ] Scripts defined: `dev`, `build`, `preview`, `lint`, `tsc: "tsc --noEmit"`, and `test: "vitest run"`.
**Verification:**
- [ ] Validate JSON syntax: `node -e "JSON.parse(require('fs').readFileSync('package.json'))"`
**Dependencies:** None
**Files likely touched:**
- `package.json`
**Estimated scope:** XS (1 file)

---

#### Task 1.2: TypeScript & Vite Configuration with Path Aliasing
**Description:** Configure `vite.config.ts` and TypeScript compiler configurations (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`) with strict typing and `@/` path alias pointing to `./src`.
**Acceptance criteria:**
- [ ] `vite.config.ts` configures `@vitejs/plugin-react` and `resolve.alias` for `@` -> `path.resolve(__dirname, "./src")`.
- [ ] `tsconfig.json` includes strict type-checking flags (`strict: true`, `noImplicitAny: true`, `target: ES2022`).
- [ ] `compilerOptions.paths` maps `"@/*": ["./src/*"]`.
**Verification:**
- [ ] TypeScript config validity check: `npx tsc --showConfig`
**Dependencies:** Task 1.1
**Files likely touched:**
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
**Estimated scope:** S (3–4 files)

---

### Checkpoint 1: Scaffolding Ready
- [ ] Config files parsed without syntax or resolution errors.

---

### Task Group 2: Dependency Installation & Socket Security Audit

#### Task 2.1: Audit & Install Production & Dev Dependencies
**Description:** Verify required packages via Socket CLI (`socket`) and install them.
- Production: `react`, `react-dom`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
- Development: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`.
**Acceptance criteria:**
- [ ] All packages pass Socket security audit without high-severity alerts.
- [ ] `package-lock.json` generated and consistent.
- [ ] `node_modules` successfully populated.
**Verification:**
- [ ] Verify node_modules: `npm ls --depth=0`
**Dependencies:** Task 1.1, Task 1.2
**Files likely touched:**
- `package.json`
- `package-lock.json`
**Estimated scope:** S (2 files)

---

### Checkpoint 2: Dependencies Installed & Audited
- [ ] All packages installed cleanly with zero vulnerability alerts from Socket.

---

### Task Group 3: Styling Engine & DESIGN.md Token Mapping

#### Task 3.1: Tailwind & PostCSS Configuration
**Description:** Initialize `tailwind.config.js` and `postcss.config.js` to process utility styles across `index.html` and `src/**/*.{ts,tsx}`.
**Acceptance criteria:**
- [ ] Tailwind content array covers `index.html` and `src/**/*.{ts,tsx}`.
- [ ] PostCSS config includes `tailwindcss` and `autoprefixer`.
- [ ] `darkMode: "class"` configured to support dark-mode-first switching.
**Verification:**
- [ ] Tailwind config resolution verified.
**Dependencies:** Task 2.1
**Files likely touched:**
- `tailwind.config.js`
- `postcss.config.js`
**Estimated scope:** S (2 files)

---

#### Task 3.2: CSS Token Mapping & Typography Architecture
**Description:** Create `src/index.css` defining CSS custom properties from `DESIGN.md` (ink `#171717`, light/dark canvases, hairline borders `#ebebeb`/`#262626`, stacked elevation shadows, and Geist font styles).
**Acceptance criteria:**
- [ ] `:root` and `.dark` blocks declare exact color hexes from `DESIGN.md`.
- [ ] Hairline border tokens mapped (`border-border`).
- [ ] Elevation shadow utilities configured.
- [ ] Dark mode set as default on `:root` / `html.dark`.
**Verification:**
- [ ] CSS builds cleanly without syntax errors during test build.
**Dependencies:** Task 3.1
**Files likely touched:**
- `src/index.css`
**Estimated scope:** S (1 file)

---

#### Task 3.3: Canonical `cn()` Utility Implementation
**Description:** Implement `src/lib/utils.ts` exporting the standard `cn(...inputs)` helper combining `clsx` and `tailwind-merge`.
**Acceptance criteria:**
- [ ] `cn()` handles conditional classes, undefined values, and resolves conflicting Tailwind classes deterministically.
- [ ] Named export `export function cn(...)` used (no default export).
**Verification:**
- [ ] Unit tests via Vitest: `npm test` (`vitest run`).
**Dependencies:** Task 2.1
**Files likely touched:**
- `src/lib/utils.ts`
**Estimated scope:** XS (1 file)

---

### Checkpoint 3: Styling & Utilities Operational
- [ ] Tailwind pipeline compiles `src/index.css` with custom properties.
- [ ] `src/lib/utils.ts` cleanly exports `cn()`.

---

### Task Group 4: shadcn/ui CLI Initialization & Smoke Verification

#### Task 4.1: shadcn/ui Configuration (`components.json`)
**Description:** Create `components.json` specifying the project paths, Tailwind file, aliases (`@/components`, `@/lib/utils`, `@/ui`), and Lucide icon library.
**Acceptance criteria:**
- [ ] `components.json` conforms to official shadcn schema.
- [ ] Aliases match `@/` structure (`@/components/ui`, `@/lib/utils`).
- [ ] `iconLibrary` set to `"lucide"`.
**Verification:**
- [ ] Validated with `npx shadcn@latest info`
**Dependencies:** Task 1.2, Task 3.2, Task 3.3
**Files likely touched:**
- `components.json`
**Estimated scope:** XS (1 file)

---

#### Task 4.2: Foundational Smoke Harness & Entry Point
**Description:** Create `index.html`, `src/main.tsx`, and `src/App.tsx` rendering a minimal smoke verification layout that displays:
- Application title (`SHADCN Explorer`) using Geist display negative tracking (`-2.4px`).
- Dark mode background (`#000000` / `#0a0a0a`) and ink borders.
- Verified display of `src/assets/logo-1-1.png` and `public/favicon.png`.
**Acceptance criteria:**
- [ ] `index.html` references `public/favicon.png` and mounts `src/main.tsx`.
- [ ] `src/App.tsx` uses named export `export function App()`.
- [ ] Application renders with default dark mode styling and zero console errors.
**Verification:**
- [ ] `npm run build` generates optimized bundle in `dist/`.
- [ ] `npx tsc --noEmit` exits with 0 errors.
- [ ] `npm run dev` serves page on localhost without runtime errors.
**Dependencies:** Task 4.1
**Files likely touched:**
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
**Estimated scope:** S (3 files)

---

### Checkpoint 4: Phase 1 Complete
- [ ] `npx tsc --noEmit` passes clean.
- [ ] `npm run build` succeeds.
- [ ] Dev server runs without console warnings or runtime exceptions.
- [ ] Ready for Phase 2 (Application Shell, Controls & Grid Foundation).

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Path alias mismatch with shadcn CLI** | Medium | Explicitly verify `components.json` paths and `tsconfig.json` mappings with `npx shadcn@latest info`. |
| **Tailwind v4 vs v3 configuration syntax** | Medium | Use standard Vite + Tailwind configuration compatible with PostCSS and current shadcn CLI templates. |
| **Font availability for Geist typography** | Low | Import Google Font / Geist CDN fallback in `index.html` or `src/index.css` alongside system sans fallbacks per `DESIGN.md`. |
