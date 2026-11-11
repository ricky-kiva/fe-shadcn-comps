# Mission: SHADCN Explorer

## 1. Why & Problem Statement

Browsing and evaluating components in modern design systems is often fragmented. In the shadcn/ui ecosystem, components are distributed across individual documentation pages, requiring developers and designers to constantly switch contexts, navigate separate links, and imagine how various elements work together.

There is currently no unified, distraction-free environment where engineers and designers can visually survey, compare, and experiment with the entire shadcn component suite at a glance.

**SHADCN Explorer** bridges this gap by providing an instant, single-view visual gallery. It transforms component exploration into an immediate, tactile browsing experience.

---

## 2. Vision

To build a minimalist, highly refined component gallery following Vercel's stark ink-and-canvas design philosophy (`DESIGN.md`).

- **Restraint Over Clutter:** A pure focus on the components themselves, free from superfluous marketing fluff, noisy color palettes, or heavy shadows.
- **Immediate Utility:** Every component is presented in a uniform responsive cell with an interactive, representative preview and realistic data.
- **Tactile Exploration:** Users can fluidly search, filter, switch between alphabetical order and custom drag-and-drop arrangement, and toggle dark/light themes seamlessly.

---

## 3. Target Audience

1. **Frontend Engineers:** Rapidly assessing which shadcn component best fits their feature requirements without reading through multiple documentation pages.
2. **UI/UX Designers & Design Technologists:** Auditing component behaviors, visual hierarchy, styling consistency, and spatial relationships in both light and dark themes.
3. **Open-Source Contributors & Evaluators:** Exploring the breadth and interactive states of shadcn components within a single, cohesive interface.

---

## 4. Scope

### In Scope

- **Responsive Component Grid:**
  - Strict uniform square cells separated by subtle hairline borders.
  - Centered previews with subtle component names positioned near the bottom.
  - Dedicated drag handles on every cell to enable custom reordering without interfering with component interactions.
- **Sorting & Reordering:**
  - **Alphabetical Sort:** Deterministic alphabetical layout with manual drag reordering temporarily disabled.
  - **Custom Sort:** User-defined layout driven by drag-and-drop, preserving user reordering.
  - **Order Reset:** Instant reset back to the default component sequence via header settings.
- **Search & Filtering:**
  - Instant text filter to narrow down displayed components by title.
  - Filter reset option in header settings to restore the full component collection.
- **Theme Support:**
  - Default: **Dark mode**, adhering to Vercel's `#171717` ink palette.
  - Full toggle support for Light mode with smooth, clean transitions.
- **Header & Footer:**
  - Compact header with application branding, sort toggle, search filter, theme toggle, and settings dropdown.
  - Understated fixed bottom footer with gradient fade into transparency and creator/social links.
- **Representative Previews:**
  - Realistic interactive states for all standard core shadcn components from the inventory in `INITIAL-IDEA.md`.
  - Offline-first stock asset downloads from `picsum.photos` stored locally in `src/assets/`.

### Out of Scope (Explicit Non-Goals)

- **Non-Standard & Extended Components:** Do not render non-standard or extended component sets (e.g., chat primitives like `Attachment`, `Bubble`, `Marker`, `Message`, `Message Scroller`, non-registry items like `Questionnaire`, `Trace`, `Code Block`, and documentation guides/recipes like `Data Table`, `Date Picker`, `Typography`). Only standard core shadcn/ui components are supported.
- **Backend Services & Persistence:** No remote database, user accounts, authentication, or cloud sync. All preference persistence is client-side (`localStorage`).
- **Live Code Editor / Sandbox:** This is a visual explorer and preview gallery, not an in-browser code editor or REPL.
- **Synthetic Components:** If an item is not part of standard core shadcn/ui, do not fabricate artificial implementations.
- **Extraneous Aesthetics:** No neon gradients, decorative 3D cards, heavy drop shadows, or unvetted accent colors that violate `DESIGN.md`.
