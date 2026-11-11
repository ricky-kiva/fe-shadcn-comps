# Validation Plan: Application Shell, Controls & Grid Foundation

## 1. Objective & Gate Criteria

This validation specification defines the acceptance criteria and verification procedures required to declare Phase 2 ("Application Shell, Controls & Grid Foundation") complete and ready to merge into `main`.

Phase 2 will be approved only when all automated gates pass and each functional scenario in the verification matrix below is confirmed.

---

## 2. Automated Quality Gates

Every command below must execute cleanly and exit with code 0:

| Gate | Command | Expected Output / Criteria |
|---|---|---|
| **Unit Tests (Vitest)** | `npm test` (`vitest run`) | All unit tests covering theme and gallery state execute and pass with zero failures. |
| **Static Type Check** | `npx tsc --noEmit` | Clean exit (code 0) with zero TypeScript errors or warnings under strict compiler mode. |
| **Production Build** | `npm run build` | Vite compiles production bundle in `dist/` without module resolution errors or missing chunk warnings. |
| **Code Style & Exports** | Static inspection | Named exports exclusively across all components, hooks, and contexts. |

---

## 3. Functional Verification Matrix

### A. Theme Management (`ThemeProvider` & `ThemeToggle`)
- [ ] Application loads in **Dark Mode** by default on initial visit without stored settings.
- [ ] Clicking the Theme Toggle switches to **Light Mode**:
  - `html` element removes `.dark` class.
  - Background smoothly transitions to light canvas (`#ffffff`), text to `#171717`.
  - Sun icon toggles to Moon icon.
- [ ] Reloading the browser page preserves the chosen theme preference from `localStorage`.

### B. Header Controls
- [ ] **Branding:** Logo (`src/assets/logo-1-1.png`) renders cleanly with title `SHADCN Explorer` in Geist Sans.
- [ ] **Sort Button:**
  - Clicking toggles between `Alphabetical` and `Custom` mode.
  - Active mode is visibly distinct.
- [ ] **Component Filter:**
  - Typing in the input filters visible cards in real time (<50ms latency).
  - Clear icon button appears when query is not empty; clicking it clears query.
  - Pressing `Escape` while focused clears the query and restores all cards.
- [ ] **Settings Dropdown:**
  - Clicking the settings gear/slider icon opens dropdown menu with stacked shadow and hairline border.
  - Pressing `Escape` or clicking outside closes the menu.
  - Clicking "Reset Custom Order" sets sort back to Alphabetical and closes menu.
  - Clicking "Reset Component Filter" clears active search query and closes menu.

### C. Responsive Grid Container (`ComponentGrid`)
- [ ] Every grid cell strictly maintains an identical square width and height (`aspect-square`).
- [ ] Thin hairline borders (`#262626` in dark mode, `#ebebeb` in light mode) separate cells.
- [ ] Responsive column layout verified across screen widths:
  - Mobile (<640px): 1 column
  - Tablet / SM (640px–767px): 2 columns
  - MD (768px–1023px): 3 columns
  - LG (1024px–1279px): 4 columns
  - XL (1280px+): 5 columns
- [ ] Empty state renders centered feedback message when a filter query matches no components.

### D. Fixed Footer
- [ ] Fixed to the bottom center of the viewport with a top gradient fading into transparency.
- [ ] Displays `Made with ♡ by Rickyslash` linking to `https://rickyslash.my.id`.
- [ ] All 5 social icons (GitHub, Instagram, LinkedIn, Buy me a Coffee, Rickyslash) are present, clickable, have accessible labels, and open in new tabs (`target="_blank" rel="noopener noreferrer"`).
- [ ] Main content scroll area includes sufficient bottom padding (`pb-24`) so footer never obstructs bottom-row grid cards.

---

## 4. Pre-Merge Checklist

Before opening the Pull Request to merge Phase 2:

- [ ] All 4 Task Groups in `plan.md` completed.
- [ ] All automated quality gates passed (`npm test`, `npx tsc --noEmit`, `npm run build`).
- [ ] Zero `any` assertions in TypeScript code.
- [ ] Secret scan passed: `git diff --staged -i -G'password|secret|api_key' --name-only` returns clean.
- [ ] Commit history is atomic, follows conventional commit format, and references the phase issue.
