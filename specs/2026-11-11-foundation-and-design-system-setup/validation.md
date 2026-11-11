# Validation Plan: Foundation & Design System Setup

## 1. Objective & Gate Criteria

This validation specification defines the concrete, repeatable checks required to confirm that Phase 1 ("Foundation & Design System Setup") is complete, functioning, and ready to be merged into `main`.

The implementation will be declared successful and merge-ready only when every automated gate and visual audit criteria listed below passes.

---

## 2. Automated Quality Gates

Every command below must be executed and exit with code 0:

| Gate | Command | Expected Output / Criteria |
|---|---|---|
| **Static Type Check** | `npx tsc --noEmit` | Clean exit (code 0) with zero TypeScript errors or warnings. |
| **Production Build** | `npm run build` | Vite produces production bundle in `dist/` without chunk errors, missing exports, or unresolved imports. |
| **Development Server** | `npm run dev` | Local development server starts and serves HMR on localhost without runtime exceptions. |
| **Package Security** | `socket package score npm <pkg>` | All newly installed dependencies verified clean with zero high-severity CVEs or supply-chain red flags. |
| **Code Style & Exports** | Static inspection | Named exports exclusively across all components and modules (no default exports). |

---

## 3. Design System Token & Styling Verification

A smoke test screen (`src/App.tsx`) must visually verify that the `DESIGN.md` design tokens are functioning correctly:

### A. Dark Mode Default
- [ ] Root HTML / body element mounts with `.dark` active by default.
- [ ] Background resolves to the dark canvas (`#000000` / `#0a0a0a`) and text resolves to `#ffffff` / `#ededed`.
- [ ] No flash of light theme on initial page load.

### B. Color & Hairline Border Tokens
- [ ] Primary ink color `#171717` is available as a CSS variable and Tailwind utility.
- [ ] Subtle 1px hairline borders (`#262626` in dark mode, `#ebebeb` in light mode) render cleanly on sample containers.
- [ ] No harsh 2px+ borders or unvetted accent colors.

### C. Typography Hierarchy & Tracking
- [ ] Headline renders in Geist Sans with display negative letter-spacing (`-2.4px` at 48px).
- [ ] Technical labels and monospace elements render in Geist Mono at 12–13px.
- [ ] Font fallbacks gracefully degrade to system sans-serif without layout breaks.

### D. Utility Helpers (`cn()`)
- [ ] `cn()` correctly concatenates strings, handles conditional booleans, and resolves conflicting Tailwind utility classes (e.g., `cn("p-4", "p-2")` correctly yields `"p-2"` via `tailwind-merge`).

---

## 4. Assets & Public Branding Verification

- [ ] **Favicon:** `public/favicon.png` displays correctly in the browser tab and page metadata (`<link rel="icon">`).
- [ ] **Logo:** `src/assets/logo-1-1.png` renders sharply in the smoke test component without 404 errors or layout shifts.

---

## 5. shadcn/ui CLI Compatibility Verification

- [ ] `components.json` is located at the project root and adheres to official shadcn schema.
- [ ] Running `npx shadcn@latest info` executes cleanly and outputs:
  - Tailwind CSS file correctly mapped to `src/index.css`.
  - Aliases correctly mapped (`@/components`, `@/lib/utils`, `@/ui`).
  - Icon library set to `lucide`.
- [ ] Dry-run installation check succeeds: `npx shadcn@latest add button --dry-run` successfully resolves targets to `src/components/ui/button.tsx` without path errors.

---

## 6. Pre-Merge Checklist

Before opening the Pull Request to merge Phase 1:

- [ ] All 4 Task Groups in `plan.md` completed.
- [ ] All automated quality gates passed (`tsc`, `build`, `dev`).
- [ ] No `any` type overrides introduced in TypeScript.
- [ ] No boilerplate files from default templates left behind (no counter demo, no default Vite logo assets).
- [ ] Secret scan passed: `git diff --staged -i -G'password|secret|api_key|token' --name-only` returns clean.
- [ ] Commit history is atomic, follows conventional commit format, and references the phase issue.
