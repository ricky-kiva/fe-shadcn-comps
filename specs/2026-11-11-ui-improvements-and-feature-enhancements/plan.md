# Implementation Plan: UI Improvements & Feature Enhancements

## Overview

This implementation plan decomposes the custom UI and UX enhancements for SHADCN Explorer into three minimal, sequential, verifiable task groups. The goal is to soften the light mode theme, consolidate sorting into a unified dropdown while removing the redundant settings menu, add a dynamically adapting responsive grid column selector, transform component filtering into a hierarchical tree with tri-state selection, and polish component interactivity and drag-and-drop hint UX.

---

## Dependency Graph

```
Task Group 1: Theme, Header Navigation & Sorting Consolidation
    │
    ▼
Task Group 2: Dynamic Grid Column Selector & Responsive Layout
    │
    ▼
Task Group 3: Hierarchical Tree Filter & Micro-Interaction Polish
```

---

## Task Groups

### Task Group 1: Theme, Header Navigation & Sorting Consolidation

#### Task 1.1: Softened Light Mode Canvas & Category Sorting Infrastructure
**Description:** Update light mode canvas variable in `src/index.css` from pure `#ffffff` to a softer white (`#fafafa`). Add `getCategoryOrder()` in `src/data/components.ts` sorting items primarily by category then alphabetically by name. Extend `SortMode` in `GalleryContext.tsx` to include `"category"` (`"alphabetical" | "category" | "custom"`).
**Acceptance criteria:**
- [ ] Light mode `--canvas` is set to `#fafafa` in `src/index.css` with clean contrast against ink `#171717`.
- [ ] `getCategoryOrder()` in `src/data/components.ts` returns 53 IDs grouped by category and sorted alphabetically within categories.
- [ ] `GalleryContext` supports `sortMode: "category"`, disables drag handles when active, and persists `sortMode` in `localStorage`.
**Verification:**
- [ ] Unit tests in `tests/sorting-category.test.ts`.
**Dependencies:** None
**Files likely touched:**
- `src/index.css`
- `src/data/components.ts`
- `src/context/GalleryContext.tsx`
- `tests/sorting-category.test.ts`
**Estimated scope:** S (3 files)

---

#### Task 1.2: Unified Sort Dropdown & Settings Consolidation
**Description:** Replace the binary `SortToggle` and separate `SettingsDropdown` in `src/components/layout/` with a unified `SortDropdown.tsx`. The menu lists `Alphabetical` (default), `Category`, `Custom`, a visual `<Separator />`, and a `Reset Custom Order` action. Remove `SettingsDropdown.tsx` from `Header.tsx`.
**Acceptance criteria:**
- [ ] `SortDropdown.tsx` displays current sort mode with a dropdown icon.
- [ ] Clicking options switches between `Alphabetical`, `Category`, and `Custom`.
- [ ] Divider separates sort modes from the `Reset Custom Order` action.
- [ ] Settings icon/menu is removed from the header.
**Verification:**
- [ ] Unit tests in `tests/sort-dropdown.test.tsx`.
**Dependencies:** Task 1.1
**Files likely touched:**
- `src/components/layout/SortDropdown.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/SettingsDropdown.tsx` (removed/retired)
- `tests/sort-dropdown.test.tsx`
**Estimated scope:** S (3 files)

---

### Checkpoint 1: Theme & Sorting Consolidated
- [ ] Light mode displays softer white background.
- [ ] Sort dropdown seamlessly switches between Alphabetical, Category, and Custom modes.
- [ ] `Reset Custom Order` functions directly from the sort dropdown.
- [ ] Header has zero redundant settings menus.

---

### Task Group 2: Dynamic Grid Column Selector & Responsive Layout

#### Task 2.1: Dynamic Column State & Auto-Adaptation Engine
**Description:** Add column count state in `GalleryContext.tsx` with dynamic maximum computation. The maximum is calculated dynamically from container/window width based on a minimum cell width (~170px–180px) without causing horizontal overflow. Default to the maximum fitting columns and automatically adapt when the window is resized.
**Acceptance criteria:**
- [ ] Columns state `gridColumns: number` with minimum of 1.
- [ ] Maximum columns dynamically determined by viewport width (min 1, max up to 6+ on wide viewports).
- [ ] Automatically updates max and clamps active column count upon window resize.
- [ ] Column preference persists in `localStorage` (`shadcn_explorer_grid_columns`).
**Verification:**
- [ ] Unit tests in `tests/columns.test.ts`.
**Dependencies:** Task Group 1
**Files likely touched:**
- `src/context/GalleryContext.tsx`
- `tests/columns.test.ts`
**Estimated scope:** S (2 files)

---

#### Task 2.2: Column Selector UI & Dynamic Grid Rendering
**Description:** Implement `src/components/layout/ColumnSelector.tsx` allowing users to decrement or increment grid columns between 1 and the dynamic maximum. Update `ComponentGrid.tsx` to render with dynamic inline `gridTemplateColumns` or matching dynamic grid classes.
**Acceptance criteria:**
- [ ] `ColumnSelector.tsx` displays current column count with `+` and `-` controls.
- [ ] Disables `-` when at 1; disables `+` when at the dynamic maximum.
- [ ] `ComponentGrid.tsx` adjusts column layout instantly without page reload or horizontal overflow.
**Verification:**
- [ ] Integration tests in `tests/grid-columns.test.tsx`.
**Dependencies:** Task 2.1
**Files likely touched:**
- `src/components/layout/ColumnSelector.tsx`
- `src/components/layout/Header.tsx`
- `src/components/gallery/ComponentGrid.tsx`
- `tests/grid-columns.test.tsx`
**Estimated scope:** M (4 files)

---

### Checkpoint 2: Responsive Columns Verified
- [ ] Column selector allows users to choose between 1 and dynamic max.
- [ ] Grid resizes dynamically without horizontal overflow across screen sizes.
- [ ] `npm test` and `npx tsc --noEmit` pass with zero errors.

---

### Task Group 3: Hierarchical Tree Filter & Micro-Interaction Polish

#### Task 3.1: Hierarchical Tree Filter Component
**Description:** Redesign `src/components/layout/ComponentFilter.tsx` into an expandable, hierarchical tree structure. Each category has an expand/collapse toggle and a tri-state checkbox (checked, unchecked, indeterminate). Selecting a category selects/deselects all child components; selecting/deselecting child components dynamically updates parent category state.
**Acceptance criteria:**
- [ ] Tree view groups all 53 components under their respective categories.
- [ ] Category checkbox selects/deselects all components in that category.
- [ ] Partial child selection displays an indeterminate state on the category checkbox.
- [ ] Expanding/collapsing a category is independent of selection state.
- [ ] Real-time search filters both category titles and component names.
- [ ] Active filter selection persists in `localStorage`.
**Verification:**
- [ ] Unit tests in `tests/tree-filter.test.tsx`.
**Dependencies:** Task Group 1
**Files likely touched:**
- `src/components/layout/ComponentFilter.tsx`
- `tests/tree-filter.test.tsx`
**Estimated scope:** M (2 files)

---

#### Task 3.2: Component Interactivity Polish & Custom Drag Hint UX
**Description:** Upgrade interactive previews in `src/components/previews/` to be fully functional (e.g., `CalendarPreview` date selection, `ComboboxPreview` searchable popover with selectable options, `ChartPreview` interactive hover states). In `ComponentCard.tsx` and `GalleryContext.tsx`, configure drag handles to appear on cell hover (`opacity-0 group-hover:opacity-100`), with an initial 2.5-second simultaneous visual flash-and-fadeout hint when Custom mode is first activated.
**Acceptance criteria:**
- [ ] `CalendarPreview`: Clicking dates updates selected date highlight.
- [ ] `ComboboxPreview`: Interactive popover displays selectable frameworks and updates trigger text.
- [ ] `ChartPreview`: Hovering points reveals tooltip with date and value.
- [ ] In Custom mode, drag handles are hidden by default and appear on hover.
- [ ] Switching to Custom mode triggers a temporary 2.5s simultaneous hint displaying drag handles across all cells before fading to hover-only.
**Verification:**
- [ ] Unit tests in `tests/interactivity-and-drag-hint.test.tsx`.
- [ ] `npm test` passes all tests.
- [ ] `npm run build` succeeds cleanly.
**Dependencies:** Task 3.1
**Files likely touched:**
- `src/components/previews/forms/CalendarPreview.tsx`
- `src/components/previews/forms/ComboboxPreview.tsx`
- `src/components/previews/data-display/ChartPreview.tsx`
- `src/components/gallery/ComponentCard.tsx`
- `src/context/GalleryContext.tsx`
- `tests/interactivity-and-drag-hint.test.tsx`
**Estimated scope:** M (5-6 files)

---

### Checkpoint 3: Complete Custom Enhancements
- [ ] All interactive components respond naturally to clicks and hovers.
- [ ] Hierarchical tree filter operates seamlessly with tri-state checkboxes.
- [ ] Custom mode hover handles and initial fadeout hint work reliably.
- [ ] Full automated test suite passes with 100% compliance.

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Dynamic columns causing layout thrashing during drag reorder** | Medium | Compute grid template columns via CSS variables or inline styles and pass `gridColumns` to `@dnd-kit`'s `rectSortingStrategy`. |
| **Tree filter performance with 53 items** | Low | Memoize category groups and child lookups; avoid re-rendering entire tree on individual checkbox clicks. |
| **Indeterminate checkbox visual styling across themes** | Low | Use Radix Checkbox primitive with `checked="indeterminate"` and a custom minus icon indicator. |
| **Drag hint timer leaking across unmounts** | Low | Manage timeout using `useEffect` with cleanup on component unmount. |
