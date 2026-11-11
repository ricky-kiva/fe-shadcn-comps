# Requirements: UI Improvements & Feature Enhancements

## 1. Feature Overview & Objective

This specification details a custom suite of user interface and experience enhancements for **SHADCN Explorer**. The enhancements modernize the gallery layout, elevate component interactivity, soften the light mode theme, unify sorting and filter hierarchies, and introduce visual ergonomics for drag-and-drop reordering.

The objective is to make the explorer feel significantly more responsive, tactile, and cohesive without departing from Vercel's minimalist ink-and-canvas design language (`DESIGN.md`).

---

## 2. Context & Design System Alignment (`DESIGN.md`)

- **Softened Light Mode Palette:**
  - The current pure white canvas (`#ffffff`) is too stark and harsh on high-brightness displays.
  - Soften light mode canvas background to `#fafafa` (or `#f8f8f9`), maintaining a bright, crisp white aesthetic while eliminating visual glare.
  - Ensure dark mode (`#000000` / `#0a0a0a`) and hairline borders (`#262626` dark / `#ebebeb` light) remain razor-sharp with standard WCAG AA contrast.
- **Micro-Interaction Fidelity:**
  - Every component that visually suggests interactivity must behave functionally in place (e.g., Calendar day selection, Combobox dropdown search, Interactive SVG chart points).
  - Eliminate all mock or dead controls.
- **Header Ergonomics:**
  - Header operates at full width without artificial max-width constraints.
  - Retire the redundant settings gear menu; integrate "Reset Custom Order" directly beneath a separator in the unified Sort dropdown, and keep filter clearing inside the Filter dropdown.

---

## 3. Functional Scope

### In Scope

#### 1. Responsive Grid Layout & Dynamic Column Selector
- Add an interactive Grid Column Selector control in the gallery header/toolbar.
- Minimum selectable column count: **1**.
- Maximum column count: dynamically calculated based on available viewport width and a minimum cell width threshold (~160px–180px) to prevent horizontal scrolling and cell squishing.
- Default to the calculated maximum columns that fit the current screen.
- Automatically recalculate and adapt the maximum column boundary and active column count when the viewport is resized.
- Update `ComponentGrid` layout dynamically according to the selected column count.

#### 2. Component Interactivity & Micro-Interactions
- Ensure all interactive previews are fully functional rather than static mocks:
  - **Calendar:** Allows users to click and select dates, updating selected state highlight.
  - **Combobox:** Interactive search input with expandable popover list of selectable options.
  - **Chart:** Interactive hover state displaying live data values and tooltips on SVG points.
  - **Other Form & Action Controls:** Ensure active states update cleanly on click or drag without interfering with the parent grid.

#### 3. Softer Light Mode Background
- Update `--canvas` / light mode background variable from `#ffffff` to `#fafafa` (or equivalent soft white tone).
- Retain high contrast for ink text (`#171717`) and hairline cell dividers.

#### 4. Unified Sort Dropdown & Settings Consolidation
- Add **Component Category** as a sorting option alongside **Alphabetical** and **Custom**:
  - `Alphabetical`: Deterministically sorts all 53 components by name (default).
  - `Category`: Groups and sorts components by category (`Forms`, `Data Display`, `Feedback`, `Layout`, `Navigation`, `Overlay`), then alphabetically within each category. Drag handles disabled.
  - `Custom`: Enables user-defined drag-and-drop ordering.
- Convert the sort button in the header into a clean dropdown menu:
  - Option 1: Alphabetical (default)
  - Option 2: Category
  - Option 3: Custom (last sorting option)
  - Divider (`<Separator />`)
  - Option 4: "Reset Custom Order" action.
- Remove the separate Settings dropdown icon from the header (its functionality is now consolidated).

#### 5. Hierarchical Tree-Like Filter Menu
- Redesign the Component Filter dropdown into an expandable, hierarchical tree structure:
  ```text
  ▼ Forms (18)
      ☑ Button
      ☑ Button Group
      ...
  ▼ Data Display (7)
      ☑ Avatar
      ☐ Badge
  ```
- **Hierarchical Selection Logic:**
  - Selecting a category checkbox selects all components within that category.
  - Deselecting a category checkbox deselects all its child components.
  - Support partial/indeterminate checkbox states when some (but not all) components in a category are selected.
  - Selecting/deselecting individual components updates the parent category's state dynamically (checked, unchecked, or indeterminate).
  - Multiple categories and components across different categories can be selected simultaneously.
  - Categories can be expanded and collapsed independently of their selection state.
  - Real-time text search filters both category names and child component names.

#### 6. Custom Sorting & Drag-and-Drop UX Polish
- When **Custom** sorting is active:
  - The `GripVertical` drag handle is hidden by default and appears smoothly on cell hover (`opacity-0 group-hover:opacity-100`).
  - **First-Time Visual Hint:** When the user switches to Custom mode for the first time, briefly display the drag handles across all cells simultaneously for ~2.5 seconds, then gradually fade them out to hover-only.
  - Drag handle remains isolated from the centered component preview slot.

---

### Out of Scope

- Non-standard components (e.g., chat primitives, code editors, external REPLs).
- Remote database sync (persists client-side via `localStorage`).
- Heavy charting dependencies (keep charts lightweight, native SVG with smooth micro-interactions).

---

## 4. Key Architectural Decisions

| Decision | Selected Approach | Rationale |
|---|---|---|
| **Dynamic Column Calculation** | `useResizeObserver` / `window.innerWidth` calculation | Computes `maxColumns = Math.max(1, Math.min(6, Math.floor(containerWidth / 180)))` to eliminate horizontal scroll across all screens. |
| **Grid Column Styling** | Dynamic inline style `gridTemplateColumns: repeat(columns, minmax(0, 1fr))` | Allows seamless 1-to-N column transitions beyond fixed Tailwind static class limits. |
| **Sorting State Machine** | `SortMode = "alphabetical" | "category" | "custom"` in `GalleryContext` | Centralizes sorting logic and persistence; category sorting utilizes static registry metadata. |
| **Hierarchical Tree Filter** | Component category tree map with tri-state checkboxes | Allows both bulk category selection and granular per-component filtering with clear indeterminate visual feedback. |
| **Drag Hint Animation** | Transient state flag in `GalleryContext` with 2.5s timer | Provides clear affordance on mode entry without visual clutter during regular browsing. |
| **Softer White Canvas** | Update `:root` `--canvas: #fafafa` in `src/index.css` | Delivers softer light mode without modifying dark mode tokens or component-level colors. |

---

## 5. Non-Functional Requirements

- **Accessibility:** Radix primitives for tri-state checkboxes and dropdown menus with WAI-ARIA compliance.
- **Performance:** 60fps transitions during grid resize and column adjustments.
- **Type Safety:** 100% strict TypeScript types; zero `any` assertions.
- **Persistence:** Column preference, sort mode, and tree filter selections persist in `localStorage`.
