# Validation Plan: UI Improvements & Feature Enhancements

## 1. Objective & Gate Criteria

This validation specification defines the acceptance criteria and verification procedures required to declare the UI Improvements & Feature Enhancements feature complete and ready to merge into `main`.

The feature work will be approved only when all automated quality gates pass and each functional scenario in the verification matrix below is confirmed.

---

## 2. Automated Quality Gates

Every command below must execute cleanly and exit with code 0:

| Gate | Command | Expected Output / Criteria |
|---|---|---|
| **Unit & Integration Tests** | `npm test` (`vitest run`) | All unit tests covering sorting, column engine, tree filter, and micro-interactions execute and pass with zero failures. |
| **Static Type Check** | `npx tsc --noEmit` | Clean exit (code 0) with zero TypeScript errors or warnings under strict compiler mode. |
| **Production Build** | `npm run build` | Vite compiles production bundle in `dist/` without module resolution errors or bundle chunk warnings. |
| **Code Style & Exports** | Static inspection | Named exports exclusively across all components, hooks, and data registries. |

---

## 3. Functional Verification Matrix

### A. Responsive Grid & Dynamic Column Selector
- [ ] Grid column selector appears in the top navigation bar with current column count and `+` / `-` controls.
- [ ] Minimum column count is clamped to 1 (`-` button disabled when at 1).
- [ ] Maximum column count dynamically reflects the maximum columns that fit within the viewport without horizontal overflow.
- [ ] Viewport resizing dynamically recalculates the maximum column boundary and clamps active columns if necessary.
- [ ] Adjusting column count modifies grid layout immediately and cleanly.

### B. Component Interactivity
- [ ] **Calendar:** Clicking dates in the calendar selects and highlights the clicked date.
- [ ] **Combobox:** Clicking the combobox opens an interactive popover with searchable options; selecting an option updates the control value.
- [ ] **Chart:** Hovering over chart data points displays an interactive tooltip with point details.
- [ ] Interacting with component controls (buttons, inputs, sliders, toggles) does not initiate grid drag reordering.

### C. Light Mode Softer White Background
- [ ] Light mode background renders with a soft white tone (`#fafafa`) rather than stark pure white (`#ffffff`).
- [ ] Clear visual contrast is preserved between background, hairline borders (`#ebebeb`), and ink text (`#171717`).
- [ ] Dark mode styling remains unaffected (`#000000` / `#0a0a0a`).

### D. Sorting Options & Header Consolidation
- [ ] Sort toggle is replaced with a Sort dropdown menu displaying current active sorting mode.
- [ ] **Alphabetical** is the default option and deterministically sorts all components by name.
- [ ] **Component's Category** option sorts components by category, then alphabetically by name within each category.
- [ ] **Custom** is the last sorting option and enables drag-and-drop reordering.
- [ ] A divider separates the Custom option from the **Reset Custom** action.
- [ ] Clicking **Reset Custom** restores the default order and resets sort mode to Alphabetical.
- [ ] The standalone Settings icon and menu have been cleanly removed from the header.

### E. Hierarchical Tree-Like Filter
- [ ] Component filter displays an expandable, tree-like hierarchy grouped by category.
- [ ] Each category features an expand/collapse chevron and a tri-state checkbox.
- [ ] Selecting a category checkbox automatically selects all components within that category.
- [ ] Deselecting a category checkbox deselects all its components.
- [ ] When some (but not all) components in a category are selected, the category checkbox displays an indeterminate state.
- [ ] Expanding/collapsing a category operates independently of its selection state.
- [ ] Multiple categories and individual components across different categories can be selected simultaneously.
- [ ] Search input filters both category titles and child component names in real time.

### F. Custom Sorting & Drag-and-Drop UX
- [ ] In Custom mode, the `GripVertical` drag handle is hidden by default and displays on cell hover.
- [ ] When switching to Custom mode for the first time, all drag handles are displayed simultaneously for ~2.5 seconds, then gradually fade out.
- [ ] Subsequent cell interactions display the drag handle on individual cell hover only.
- [ ] Drag handles remain visually distinct (`cursor-grab` and `cursor-grabbing`).

---

## 4. Pre-Merge Checklist

Before opening the Pull Request to merge this feature:

- [ ] All 3 Task Groups in `plan.md` completed.
- [ ] All automated quality gates pass: `npm test`, `npx tsc --noEmit`, `npm run build`.
- [ ] Production preview verified with `npx vite preview`.
- [ ] Secret scan passed: `git diff --staged -i -G'password|secret|api_key' --name-only` returns clean.
- [ ] Commit history is atomic, follows conventional commit format, and references the feature issue.
