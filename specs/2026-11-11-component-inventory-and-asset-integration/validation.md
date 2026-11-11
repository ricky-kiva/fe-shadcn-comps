# Validation Plan: Component Inventory Implementation & Asset Integration

## 1. Objective & Gate Criteria

This validation specification defines the acceptance criteria and verification procedures required to declare Phase 4 ("Component Inventory Implementation & Asset Integration") complete and ready to merge into `main`.

Phase 4 will be approved only when all automated gates pass, all 53 standard core shadcn components display live, interactive, polished previews, and each functional scenario in the verification matrix below is confirmed.

---

## 2. Automated Quality Gates

Every command below must execute cleanly and exit with code 0:

| Gate | Command | Expected Output / Criteria |
|---|---|---|
| **Unit & Coverage Tests** | `npm test` (`vitest run`) | All preview tests and the 53-component coverage audit test execute and pass with zero failures. |
| **Static Type Check** | `npx tsc --noEmit` | Clean exit (code 0) with zero TypeScript errors or warnings under strict compiler mode. |
| **Production Build** | `npm run build` | Vite compiles production bundle in `dist/` without unresolved imports, missing assets, or chunk warnings. |
| **Code Style & Exports** | Static inspection | Named exports exclusively across all preview components and registry modules. |
| **Package Security** | `socket package score npm <pkg>` | All newly installed dependencies verified clean with zero high-severity CVEs or supply-chain alerts. |

---

## 3. Functional Verification Matrix

### A. Media Assets & Local Stock Photos
- [ ] Stock photos for `Card`, `Avatar`, `Aspect Ratio`, `Carousel`, and `Item` exist locally in `src/assets/`.
- [ ] Asset filenames strictly adhere to `stock-{component_name}-{integer_revision}-{integer_nth_image}.jpg`.
- [ ] All stock images load without broken image icons in both dev and production preview servers.

### B. 53 Interactive Component Previews
- [ ] Every component cell displays an authentic, representative preview rather than a placeholder or bare title.
- [ ] Previews fit neatly within the `aspect-square` cell boundaries without clipping or overflowing adjacent cells.
- [ ] Previews remain strictly centered in the cell, maintaining spacing from the top-right drag handle and bottom title.
- [ ] Interactive form controls (e.g., switches, checkboxes, sliders, buttons, inputs) respond to user interactions locally.

### C. Drag Handle Isolation & Interaction
- [ ] Interacting with interactive preview controls (clicking buttons, typing in inputs, dragging sliders) does **NOT** trigger grid cell dragging.
- [ ] Dragging is strictly initiated when clicking/dragging the `GripVertical` handle icon in the top-right corner.
- [ ] When a cell is dragged in Custom mode, the floating `DragOverlay` displays the live preview with `shadow-stacked` elevation.

### D. Design System Discipline (`DESIGN.md`)
- [ ] All previews adhere to Vercel minimalist styling: ink primary (`#171717`), dark canvas (`#000000` / `#0a0a0a`), and 1px hairline borders (`#262626` dark, `#ebebeb` light).
- [ ] Text elements use Geist Sans and technical labels/shortcuts use Geist Mono.
- [ ] No extraneous neon gradients, marketing banners, or unvetted accent colors.
- [ ] Previews look cohesive and intentional in both Dark and Light modes.

### E. Coverage & Non-Standard Component Exclusion
- [ ] All 53 standard core shadcn components cataloged in `INITIAL-IDEA.md` and `src/data/components.ts` are rendered.
- [ ] Zero non-standard or extended components (chat primitives like `Attachment`, `Bubble`, `Message`, `Questionnaire`, `Trace`, `Code Block`, etc.) are rendered.
- [ ] Automated coverage test in `tests/coverage.test.ts` passes with 100% compliance.

---

## 4. Pre-Merge Checklist

Before opening the Pull Request to merge Phase 4:

- [ ] All 5 Task Groups in `plan.md` completed.
- [ ] All automated quality gates pass: `npm test`, `npx tsc --noEmit`, `npm run build`.
- [ ] Production preview verified with `npx vite preview`.
- [ ] Secret scan passed: `git diff --staged -i -G'password|secret|api_key' --name-only` returns clean.
- [ ] Commit history is atomic, follows conventional commit format, and references the phase issue.
