# Validation Plan: Component Registry, Card System & Drag-and-Drop

## 1. Objective & Gate Criteria

This validation specification defines the acceptance criteria and verification procedures required to declare Phase 3 ("Component Registry, Card System & Drag-and-Drop") complete and ready to merge into `main`.

Phase 3 will be approved only when all automated gates pass and each functional scenario in the verification matrix below is confirmed.

---

## 2. Automated Quality Gates

Every command below must execute cleanly and exit with code 0:

| Gate | Command | Expected Output / Criteria |
|---|---|---|
| **Unit Tests (Vitest)** | `npm test` (`vitest run`) | All unit tests covering registry, custom order state, and sortable cards execute and pass with zero failures. |
| **Static Type Check** | `npx tsc --noEmit` | Clean exit (code 0) with zero TypeScript errors or warnings under strict compiler mode. |
| **Production Build** | `npm run build` | Vite compiles production bundle in `dist/` without module resolution errors or missing chunk warnings. |
| **Code Style & Exports** | Static inspection | Named exports exclusively across all components, hooks, and data registries. |

---

## 3. Functional Verification Matrix

### A. Component Registry Integrity
- [ ] Centralized registry contains all 53 standard core components with unique `id`, `name`, `category`, and `description`.
- [ ] `getInitialOrder()` returns all 53 component IDs matching the initial sequence from `INITIAL-IDEA.md`.
- [ ] `getAlphabeticalOrder()` returns all 53 component IDs sorted alphabetically.

### B. Drag Handle Isolation & Interaction
- [ ] Dragging is strictly initiated when clicking/dragging the `GripVertical` handle icon in the top-right corner.
- [ ] Clicking, selecting text, or interacting inside the centered preview area does **NOT** initiate dragging.
- [ ] Drag handle displays `cursor-grab` on hover and `cursor-grabbing` while actively dragged.
- [ ] In `Alphabetical` mode, drag handles are visually subdued and manual dragging is disabled.
- [ ] In `Custom` mode, drag handles are fully interactive.

### C. Drag-and-Drop Reordering Physics & DragOverlay
- [ ] Dragging a component cell renders a floating `<DragOverlay>` copy elevated above the grid with `shadow-stacked`.
- [ ] Origin cell in the grid dims slightly (`opacity-40`) to mark its placeholder position.
- [ ] Dragging across neighboring cells triggers smooth layout transitions governed by `rectSortingStrategy`.
- [ ] Releasing the drag (drop event) immediately settles the card in its new position and updates `customOrder`.
- [ ] Pressing `Escape` during a drag cancels the operation and returns the card to its original position.

### D. Custom Order Persistence
- [ ] Rearranging cards in Custom mode persists the new order to `localStorage` under `shadcn_explorer_custom_order`.
- [ ] Reloading the browser page in Custom mode preserves the exact user-defined arrangement.
- [ ] Switching to Alphabetical mode and back to Custom mode preserves the user-defined arrangement.
- [ ] Clicking "Reset Custom Order" in the Settings dropdown restores the default registry sequence and updates `localStorage`.

### E. Keyboard Reordering Accessibility
- [ ] Focusing the drag handle via keyboard (`Tab`) and pressing `Space` initiates drag mode.
- [ ] Pressing Arrow keys (`Left`, `Right`, `Up`, `Down`) shifts the target drop position across grid columns and rows.
- [ ] Pressing `Space` or `Enter` drops the card in the selected position.
- [ ] Pressing `Escape` cancels the keyboard drag without altering card order.

---

## 4. Pre-Merge Checklist

Before opening the Pull Request to merge Phase 3:

- [ ] All 4 Task Groups in `plan.md` completed.
- [ ] All automated quality gates passed (`npm test`, `npx tsc --noEmit`, `npm run build`).
- [ ] Zero `any` assertions in TypeScript code.
- [ ] Secret scan passed: `git diff --staged -i -G'password|secret|api_key' --name-only` returns clean.
- [ ] Commit history is atomic, follows conventional commit format, and references the phase issue.
