# Requirements: Component Inventory Implementation & Asset Integration

## 1. Feature Overview & Objective

Phase 4 of the SHADCN Explorer roadmap populates the gallery grid with authentic, representative, interactive previews and required media assets for all 53 standard core shadcn components.

The objective is to replace the temporary placeholder boxes with realistic, polished component implementations that showcase shadcn/ui capabilities within the minimalist Vercel ink-and-canvas design system (`DESIGN.md`). Every component preview must be centered, interactive where appropriate, visually representative, and isolated from drag handle interference.

---

## 2. Context & Design System Alignment (`DESIGN.md`)

- **Vercel Ink-and-Canvas Discipline:**
  - Dark mode first: canvas background `#000000` / `#0a0a0a`, ink primary `#171717`, subtle hairline borders (`#262626` in dark mode, `#ebebeb` in light mode).
  - Typography: Geist Sans for body/controls, Geist Mono for code labels and technical tags.
  - Subtle stacked elevation shadows (`shadow-stacked`) for overlays and elevated surfaces.
- **Micro-Scale Visual Previews:**
  - Every component preview must fit within the `aspect-square` grid cell (with maximum height constrained to prevent overlapping the drag handle or bottom monospace label).
  - Previews must be self-contained: interactive states (toggled switches, entered input text, active tabs, hovered tooltips) operate locally without side effects on sibling grid cells.
- **Stock Assets & Media Discipline:**
  - Where components require photography (e.g., `Card`, `Avatar`, `Carousel`, `Aspect Ratio`, `Item`), stock assets must be downloaded from `https://picsum.photos/{width}/{height}` and saved locally in `src/assets/`.
  - File naming must strictly follow: `stock-{component_name}-{integer_revision}-{integer_nth_image}.jpg` (e.g., `stock-card-1-1.jpg`, `stock-avatar-1-1.jpg`).
- **Drag Handle Isolation:**
  - Previews must not register drag listeners or intercept drag gestures from the top-right `GripVertical` handle.
  - Interactive controls (buttons, inputs, sliders, toggles) must respond to clicks without triggering grid drag reordering.

---

## 3. Functional Scope

### In Scope

1. **Media Asset Integration:**
   - Download curated stock images from `picsum.photos` with dimensions appropriate for square cell previews (e.g., 200x200 for avatars, 400x225 for aspect ratio and cards).
   - Store assets in `src/assets/` using the mandated convention `stock-{component_name}-{integer_revision}-{integer_nth_image}`.

2. **Base shadcn & Radix Primitives Setup:**
   - Install and audit required dependencies (`@radix-ui/react-*`, `embla-carousel-react`, `recharts`, etc.) using Socket CLI (`socket`).
   - Scaffold or update base UI components in `src/components/ui/` adhering to `components.json`.

3. **53 Interactive Component Previews (`src/components/previews/`):**
   - **Forms (18 components):**
     - `Button`: Primary, secondary, outline, and destructive button states.
     - `Button Group`: Segmented button control with active state.
     - `Calendar`: Mini month calendar view with selected date highlight.
     - `Checkbox`: Accessible checkbox with checked/unchecked interactive toggle.
     - `Combobox`: Compact autocomplete input with searchable dropdown popover.
     - `Field`: Accessible labeled field container with helper text.
     - `Input`: Sleek text input with placeholder and focus ring.
     - `Input Group`: Input with embedded search icon and clear button.
     - `Input OTP`: 4-digit one-time password segmented input boxes.
     - `Label`: Styled label element associated with controls.
     - `Native Select`: Styled HTML select element.
     - `Radio Group`: Mutually exclusive option selector.
     - `Select`: Radix-based accessible select dropdown.
     - `Slider`: Horizontal range slider with draggable thumb.
     - `Switch`: Smooth animated toggle switch.
     - `Textarea`: Multi-line text field with subtle scrollbar.
     - `Toggle`: Two-state icon button.
     - `Toggle Group`: Segmented single/multiple toggle group.
   - **Data Display (7 components):**
     - `Avatar`: Stock photo avatar with fallback initials.
     - `Badge`: Status badges (default, secondary, outline).
     - `Carousel`: Mini swipeable carousel with stock cards.
     - `Chart`: Clean SVG sparkline / area chart with ink gradients.
     - `Item`: Structured item container with thumbnail and metadata.
     - `Kbd`: Monospace keyboard shortcut badges (e.g., `⌘K`).
     - `Table`: Mini table with header and structured rows.
   - **Feedback (5 components):**
     - `Alert`: Callout alert with status icon and descriptive text.
     - `Progress`: Determinate progress bar showing percentage completion.
     - `Skeleton`: Subtle pulse shimmer placeholder for content.
     - `Spinner`: Smooth rotating SVG loading indicator.
     - `Toast`: Mini toast notification card.
   - **Layout (8 components):**
     - `Accordion`: Two-item collapsible accordion with chevron animation.
     - `Aspect Ratio`: 16:9 media container rendering a local stock photo.
     - `Card`: Micro card with header, stock image, and action footer.
     - `Collapsible`: Expandable panel with trigger button.
     - `Resizable`: Two-panel resizable preview with draggable divider.
     - `Scroll Area`: Custom styled scroll container with overflow text.
     - `Separator`: Hairline horizontal and vertical dividers.
     - `Sidebar`: Mini sidebar navigation preview with icons and active item.
   - **Navigation (5 components):**
     - `Breadcrumb`: Slash-delimited path navigation hierarchy.
     - `Menubar`: Horizontal desktop-style application menu bar.
     - `Navigation Menu`: Navigation bar with animated hover flyouts.
     - `Pagination`: Compact page selector with Prev/Next buttons.
     - `Tabs`: Layered tab panels with animated active indicator.
   - **Overlay (10 components):**
     - `Alert Dialog`: Trigger button opening confirmation alert modal.
     - `Command`: Compact command palette search bar with suggestions.
     - `Context Menu`: Surface demonstrating right-click menu trigger.
     - `Dialog`: Trigger button opening accessible modal window.
     - `Drawer`: Slide-over bottom drawer trigger.
     - `Dropdown Menu`: Trigger button opening action dropdown.
     - `Hover Card`: Card displaying rich preview content on hover.
     - `Popover`: Trigger button opening floating popover card.
     - `Sheet`: Side-panel drawer opening from screen edge.
     - `Tooltip`: Hoverable element displaying informative tooltip bubble.

4. **Centralized Preview Registry & Grid Wiring:**
   - Create `src/components/previews/index.tsx` mapping every component `id` to its dedicated preview component.
   - Wire `ComponentGrid` / `SortableComponentCard` to render the mapped preview component dynamically.

5. **Coverage Audit:**
   - Verify all 53 standard core components from `INITIAL-IDEA.md` render correctly.
   - Confirm all non-standard/extended components are excluded.

### Out of Scope

- Non-standard components (e.g., chat primitives, `Questionnaire`, `Trace`, `Code Block`).
- Backend data persistence or API endpoints.
- Arbitrary stock images hotlinked to external CDNs in production (all assets must be locally stored in `src/assets/`).

---

## 4. Key Architectural Decisions

| Decision | Selected Approach | Rationale |
|---|---|---|
| **Preview Modularity** | Dedicated component per preview (`src/components/previews/*.tsx`) | Keeps preview logic isolated, cleanly testable, and prevents single-file bloat across 53 components. |
| **Component Registry Mapping** | `PREVIEW_REGISTRY: Record<string, React.ComponentType>` | Provides $O(1)$ dynamic lookup in `ComponentGrid` by component ID, enabling seamless fallback handling. |
| **Asset Location** | Stored in `src/assets/` and imported as static modules | Bundled and hashed by Vite, eliminating external network dependencies, CORS issues, or broken image links. |
| **Overlay Portals** | Contained or container-bound portals where applicable | Prevents popovers and tooltips from clipping inside small grid cells or shifting neighboring grid items. |
| **Interactive State Isolation** | Local `useState` per preview | Prevents interaction in one preview from triggering re-renders in other cells. |

---

## 5. Non-Functional Requirements

- **Visual Consistency:** Strict adherence to `DESIGN.md` (ink `#171717`, hairline borders, Geist fonts, zero garish gradients).
- **Responsive Geometry:** All previews must fit neatly inside the aspect-square container across all breakpoints (1 to 6 columns).
- **Type Safety:** 100% strict TypeScript types for all preview props and registry mappings. Zero `any` assertions.
- **Bundle Optimization:** Tree-shaken component imports with zero unnecessary runtime overhead.
- **Code Style:** Named exports exclusively across components and modules.
