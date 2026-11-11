# Implementation Plan: Component Registry, Card System & Drag-and-Drop

## Overview

This implementation plan decomposes Phase 3 ("Component Registry, Card System & Drag-and-Drop") into four sequential, verifiable task groups. The goal is to enrich the centralized component registry with full metadata, implement state management for custom component ordering with `localStorage` persistence, build the sortable card wrapper with isolated drag handle bindings, and integrate the `@dnd-kit` 2D grid sorting engine with `DragOverlay`.

---

## Dependency Graph

```
Task Group 1: Component Registry & Metadata Architecture
    │
    ▼
Task Group 2: Custom Order State & LocalStorage Persistence
    │
    ▼
Task Group 3: Sortable Card Wrapper & Drag Handle Binding
    │
    ▼
Task Group 4: DndContext Grid Engine & DragOverlay Integration
```

---

## Task Groups

### Task Group 1: Component Registry & Metadata Architecture

#### Task 1.1: Comprehensive Component Registry & Helper Utilities
**Description:** Expand `src/data/components.ts` with complete metadata (`id`, `name`, `category`, `description`, `defaultIndex`) for all 53 standard core shadcn components. Provide helper utilities `getInitialOrder()`, `getAlphabeticalOrder()`, and `getComponentById()`.
**Acceptance criteria:**
- [ ] Contains all 53 standard core components with unique `id`s and valid categories.
- [ ] `defaultIndex` reflects the default sequence from `INITIAL-IDEA.md`.
- [ ] `getInitialOrder()` returns array of 53 IDs in default sequence.
- [ ] `getAlphabeticalOrder()` returns array of 53 IDs in alphabetical order.
- [ ] Named exports: `export const COMPONENT_REGISTRY`, `export function getInitialOrder()`, `export function getAlphabeticalOrder()`.
**Verification:**
- [ ] Unit tests in `tests/components.test.ts`.
**Dependencies:** Phase 2 baseline
**Files likely touched:**
- `src/data/components.ts`
- `tests/components.test.ts`
**Estimated scope:** S (2 files)

---

### Checkpoint 1: Registry Integrity Verified
- [ ] `npm test` passes all component registry unit tests.

---

### Task Group 2: Custom Order State & LocalStorage Persistence

#### Task 2.1: Custom Order State in `GalleryContext`
**Description:** Extend `src/context/GalleryContext.tsx` to manage `customOrder: string[]` initialized from `localStorage` (`shadcn_explorer_custom_order`) falling back to `getInitialOrder()`. Implement `reorderComponents(activeId, overId)` using `arrayMove` and update `resetOrder()` to restore default order.
**Acceptance criteria:**
- [ ] `customOrder` defaults to the 53 IDs in initial order if no stored order exists.
- [ ] `reorderComponents(activeId, overId)` shifts the active item to the target index using `arrayMove` and updates `localStorage`.
- [ ] `resetOrder()` resets `customOrder` to `getInitialOrder()`, clears storage, and sets `sortMode` to `"alphabetical"`.
- [ ] Named export `export function useGallery()` exposes `customOrder`, `reorderComponents`, `resetOrder`.
**Verification:**
- [ ] Unit tests in `tests/gallery.test.tsx` verifying reordering and persistence.
**Dependencies:** Task 1.1
**Files likely touched:**
- `src/context/GalleryContext.tsx`
- `tests/gallery.test.tsx`
**Estimated scope:** S (2 files)

---

### Checkpoint 2: Custom Order State Verified
- [ ] Unit tests verify `reorderComponents` moves items accurately and persists to `localStorage`.

---

### Task Group 3: Sortable Card Wrapper & Drag Handle Binding

#### Task 3.1: Sortable Card Wrapper Component
**Description:** Implement `src/components/gallery/SortableComponentCard.tsx` wrapping `ComponentCard` with `@dnd-kit/sortable`'s `useSortable({ id })`.
**Acceptance criteria:**
- [ ] Configures `useSortable({ id, disabled: !isDraggable })`.
- [ ] Converts transform coordinates via `CSS.Transform.toString(transform)`.
- [ ] Binds `listeners` and `attributes` exclusively to the `GripVertical` drag handle, NOT to the root card container.
- [ ] When `isDragging` is true, dims the origin card slightly (`opacity-40`) to maintain visual placeholder clarity.
- [ ] Preserves dead-center positioning of the preview slot.
**Verification:**
- [ ] Vitest unit tests in `tests/card.test.tsx`.
**Dependencies:** Task 1.1, Task 2.1
**Files likely touched:**
- `src/components/gallery/SortableComponentCard.tsx`
- `src/components/gallery/ComponentCard.tsx`
- `tests/card.test.tsx`
**Estimated scope:** S (3 files)

---

### Checkpoint 3: Sortable Card Functional
- [ ] Unit tests confirm drag listeners are isolated to the handle and card styles apply correctly.

---

### Task Group 4: DndContext Grid Engine & DragOverlay Integration

#### Task 4.1: DndContext & SortableContext Grid Integration
**Description:** Update `src/components/gallery/ComponentGrid.tsx` to wrap items in `DndContext` and `SortableContext` configured with `rectSortingStrategy`. Configure pointer and keyboard sensors.
**Acceptance criteria:**
- [ ] `DndContext` uses `closestCenter` collision detection algorithm.
- [ ] Sensors configured: `PointerSensor` with `activationConstraint: { distance: 5 }` and `KeyboardSensor` with `sortableKeyboardCoordinates`.
- [ ] When `sortMode === "alphabetical"`, drag handles are disabled/locked and grid orders by `getAlphabeticalOrder()`.
- [ ] When `sortMode === "custom"`, drag handles are enabled and grid orders by `customOrder`.
- [ ] `onDragEnd` triggers `reorderComponents(active.id, over.id)` only when in Custom mode.
**Verification:**
- [ ] Integration tests in `tests/grid.test.tsx`.
**Dependencies:** Task 2.1, Task 3.1
**Files likely touched:**
- `src/components/gallery/ComponentGrid.tsx`
- `tests/grid.test.tsx`
**Estimated scope:** S (2 files)

---

#### Task 4.2: DragOverlay Floating Preview
**Description:** Implement `<DragOverlay>` inside `ComponentGrid.tsx` displaying the active dragged component card with floating elevation (`shadow-stacked`, `cursor-grabbing`) during active drag operations.
**Acceptance criteria:**
- [ ] `onDragStart` sets `activeId`, `onDragEnd` and `onDragCancel` clear `activeId`.
- [ ] `DragOverlay` renders identical aspect-square card with floating shadow and cursor-grabbing.
- [ ] Drops transition cleanly back into the grid without layout jumps.
**Verification:**
- [ ] `npm test` passes all tests with zero failures.
- [ ] `npx tsc --noEmit` exits with 0 errors.
- [ ] `npm run build` succeeds cleanly.
**Dependencies:** Task 4.1
**Files likely touched:**
- `src/components/gallery/ComponentGrid.tsx`
**Estimated scope:** S (1 file)

---

### Checkpoint 4: Phase 3 Complete
- [ ] `npm test` passes cleanly.
- [ ] `npm run build` succeeds.
- [ ] Drag-and-drop reordering works smoothly in Custom mode and locks in Alphabetical mode.
- [ ] Ready for Phase 4 (Component Inventory Implementation & Asset Integration).

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Click events on previews triggering drag** | High | Attach `listeners` strictly to the `GripVertical` handle icon, and configure `PointerSensor` with `distance: 5`. |
| **Grid item layout jumping during 2D sort** | Medium | Use `rectSortingStrategy` and `<DragOverlay>` to decouple dragging rendering from grid reflow. |
| **Filtered items breaking global custom order** | Medium | When filtering is active, `reorderComponents` maps indices back to the global `customOrder` array cleanly. |
| **Touch devices conflicting with scroll** | Low | Drag handle requires intentional 5px drag gesture, leaving standard vertical swipe available for page scrolling. |
