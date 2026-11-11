# Requirements: Component Registry, Card System & Drag-and-Drop

## 1. Feature Overview & Objective

Phase 3 of the SHADCN Explorer roadmap implements the centralized data registry, the sortable card system, and the 2D multi-column drag-and-drop reordering engine using `@dnd-kit`.

The objective is to enable users to view the complete catalog of 53 standard core shadcn components, freely rearrange the component grid order via drag-and-drop handles in **Custom** mode, toggle between deterministic **Alphabetical** sort and user-defined custom order, and persist custom arrangements across browser reloads.

---

## 2. Context & Design System Alignment (`DESIGN.md`)

- **Vercel-Inspired Restraint:** Clean, stark ink-on-canvas surfaces with thin 1px hairline borders (`#262626` in dark mode, `#e5e5e5` in light mode).
- **Isolated Drag Interaction:** Dragging is strictly initiated via the designated `GripVertical` drag handle in the top-right corner. The center preview slot is completely isolated from drag listeners, ensuring that component preview interactions in Phase 4 never trigger accidental grid dragging.
- **Visual Drag Feedback:**
  - The dragged item in the grid dims slightly (`opacity-40` or subtle outline) to indicate its original origin.
  - A floating `DragOverlay` renders above the grid with a subtle stacked elevation shadow (`shadow-stacked`), a faint border highlight, and a grabbing cursor (`cursor-grabbing`).
  - Drop transitions animate smoothly without jarring layout shifts or horizontal scroll jumps.
- **Sorting Modes:**
  - **Alphabetical Mode:** Deterministically sorts all 53 components by name. Drag handles are visually subdued and manual reordering is locked.
  - **Custom Mode:** Restores the user's custom drag-and-drop arrangement and unlocks drag handles.
  - **Reset Custom Order:** Restores the default component order from the registry and clears saved custom order from storage.

---

## 3. Functional Scope

### In Scope

1. **Centralized Component Registry (`src/data/components.ts`):**
   - Full TypeScript data structure (`ComponentDefinition`) defining:
     - `id`: unique kebab-case identifier (e.g., `"accordion"`, `"alert"`, `"button"`).
     - `name`: official display title (e.g., `"Accordion"`, `"Alert Dialog"`, `"Button"`).
     - `category`: grouping category (`"Layout"`, `"Forms"`, `"Data Display"`, `"Navigation"`, `"Feedback"`, `"Overlay"`).
     - `description`: concise explanation of component role.
     - `defaultIndex`: initial integer sequence reflecting the default inventory order from `INITIAL-IDEA.md`.
   - Comprehensive metadata map for all 53 standard core shadcn components.
   - Helper utilities: `getInitialOrder()`, `getAlphabeticalOrder()`, `getComponentById()`.

2. **Custom Order State Management (`src/context/GalleryContext.tsx`):**
   - Manages state for `customOrder: string[]` (array of component IDs).
   - Synchronizes `customOrder` with `localStorage` under key `shadcn_explorer_custom_order`.
   - Action handler `reorderComponents(activeId: string, overId: string)`: computes new order using `arrayMove`.
   - Action handler `resetOrder()`: resets `sortMode` to `"alphabetical"`, resets `customOrder` to default sequence, and updates `localStorage`.

3. **Sortable Card Architecture (`src/components/gallery/SortableComponentCard.tsx`):**
   - Integrates `useSortable({ id })` from `@dnd-kit/sortable`.
   - Translates coordinates using `CSS.Transform.toString(transform)` from `@dnd-kit/utilities`.
   - Binds drag `listeners` and `attributes` strictly to the `GripVertical` drag handle element.
   - Preserves mathematical center alignment of the preview slot regardless of dragging state.

4. **2D Grid Drag-and-Drop Engine (`src/components/gallery/ComponentGrid.tsx`):**
   - Wraps the grid in `DndContext` with `closestCenter` collision detection.
   - Wraps cards in `SortableContext` configured with `rectSortingStrategy` for 2D multi-column grid reordering.
   - Configures pointer and keyboard sensors:
     - `PointerSensor`: activation constraint `distance: 5` to prevent accidental clicks from initiating drags.
     - `KeyboardSensor`: configured with `sortableKeyboardCoordinates` for full WCAG keyboard reordering.
   - Implements `DragOverlay` rendering an identical square card with stacked elevation and active grabbing cursor.
   - Cleanly handles `onDragStart`, `onDragOver`, `onDragEnd`, and `onDragCancel`.

5. **Sorting & Filtering Interoperability:**
   - Filter dropdown selection filters the visible grid items while preserving the underlying custom order.
   - Switching from Alphabetical back to Custom mode seamlessly restores the custom order.

### Out of Scope

- Installing and authoring the 53 specific shadcn component preview contents (Phase 4).
- Downloading stock images from picsum.photos (Phase 4).
- Remote database or cloud sync (pure client-side `localStorage`).

---

## 4. Key Architectural Decisions

| Decision | Selected Approach | Rationale |
|---|---|---|
| **DND Engine** | `@dnd-kit/core` + `@dnd-kit/sortable` | Built for modern 2D grid sorting via `rectSortingStrategy`, modular hooks, and React 19 compatibility. Verified with Socket CLI (100 vulnerability, 99 supply chain). |
| **Collision Detection** | `closestCenter` algorithm | Standard for grid sorting; accurately identifies target drop cells in both row and column directions. |
| **Sensor Activation** | `PointerSensor` with `distance: 5` | Prevents pointer down/click events from accidentally initiating dragging when users interact with the card. |
| **Drag Overlay** | `<DragOverlay>` portal component | Decouples the active dragging element from DOM re-renders, enabling smooth 60fps drag physics without grid layout thrashing. |
| **Order Persistence** | `localStorage` key `shadcn_explorer_custom_order` | Persists user-defined arrangement across sessions without backend dependencies. |

---

## 5. Non-Functional Requirements & Constraints

- **Performance:** 60fps drag animation; zero layout thrashing or main-thread blocking (<16ms frame budget).
- **Accessibility (WCAG 2.1 AA):** Full keyboard navigation support for reordering via `KeyboardSensor` (`Space` to pick up, `Arrows` to reorder, `Space`/`Enter` to drop, `Escape` to cancel).
- **Type Safety:** 100% strict TypeScript types for all registry entries, drag event payloads, and order arrays. Zero `any` assertions.
- **Code Style:** Named exports exclusively across components and modules.
