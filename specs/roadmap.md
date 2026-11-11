# Implementation Roadmap: SHADCN Explorer

This roadmap outlines the high-level implementation order for SHADCN Explorer, structured into five cohesive phases appropriate for the project scope.

---

## Phase 1: Foundation & Design System Setup

**Goal:** Establish a clean, reproducible Vite + React + TypeScript foundation integrated with Tailwind CSS and the Vercel-inspired design tokens from `DESIGN.md`.

- **Milestones:**
  1. Scaffold project structure, Vite configuration with `@/` path aliasing, and strict TypeScript settings.
  2. Configure Tailwind CSS with `DESIGN.md` design tokens:
     - Color variables (ink `#171717`, light/dark canvases, subtle hairline borders).
     - Typography classes (Geist Sans display tracking, Geist Mono code/labels).
     - Stacked elevation shadow definitions and corner radius tokens.
  3. Initialize shadcn/ui CLI configuration (`components.json`) and core helper utility (`cn()` in `src/lib/utils.ts`).
  4. Verify all initial dependencies using Socket CLI (`socket`) and Context7 CLI (`ctx7`).
- **Exit Criteria:**
  - `npm run dev`, `npx tsc --noEmit`, and `npm run build` succeed with zero errors.
  - Theme variables and base tokens render correctly in both dark and light modes.

---

## Phase 2: Application Shell, Controls & Grid Foundation

**Goal:** Build the outer application structure including the header controls, fixed footer, responsive grid container, and theme provider.

- **Milestones:**
  1. **Theme Provider:** Implement persistent dark/light theme toggle with **dark mode as default**.
  2. **Header:**
     - Left: Application logo (`src/assets/logo-1-1.png`) and title (`SHADCN Explorer`).
     - Right: Sort toggle button (Alphabetical vs. Custom), search/filter input, theme toggle, and settings dropdown.
     - Settings actions: "Reset Custom Order" and "Reset Component Filter".
  3. **Footer:** Subtle fixed bottom bar with gradient fade into transparency and creator links (GitHub, Instagram, LinkedIn, Buy me a Coffee, Rickyslash).
  4. **Component Grid Container:** Responsive grid layout maintaining uniform square cell dimensions across viewports with subtle hairline dividers.
- **Exit Criteria:**
  - Header, footer, and grid layout respond cleanly across mobile, tablet, and desktop viewports.
  - Theme toggles smoothly between dark and light modes with persistent state.

---

## Phase 3: Component Registry, Card System & Drag-and-Drop

**Goal:** Establish the centralized component catalog, reusable preview cards, and drag-and-drop reordering mechanics.

- **Milestones:**
  1. **Centralized Registry:** Create `src/data/components.ts` covering the standard core components from `INITIAL-IDEA.md`.
  2. **Reusable ComponentCard:**
     - Uniform aspect-ratio cell container.
     - Isolated drag handle icon in top-right corner.
     - Centered preview display area with overflow protection.
     - Subtle monospace component title at the bottom.
  3. **Drag-and-Drop Engine:**
     - Integrate audited drag-and-drop library (`@dnd-kit`).
     - Constrain drag initiation strictly to the drag handle icon.
     - Provide visual feedback for the dragged item and potential drop position.
     - Update custom order state immediately on drop.
  4. **Sorting & Filtering Orchestration:**
     - Alphabetical mode: Automatically sort components alphabetically and disable manual dragging.
     - Custom mode: Enable drag handles and preserve user-defined component arrangement.
     - Component filtering: Dropdown menu with checkboxes and search, persisting active selection in `localStorage` (`shadcn_explorer_component_filter`).
     - Reset actions to restore default custom order and clear active filters.
- **Exit Criteria:**
  - Dragging only activates via the drag handle and successfully rearranges cells in Custom mode.
  - Alphabetical mode sorts deterministically and disables dragging.
  - Component filter persists selection in `localStorage`, updates grid instantaneously, and resets work reliably.

---

## Phase 4: Component Inventory Implementation & Asset Integration

**Goal:** Populate the gallery with authentic, representative shadcn component previews and required media assets.

- **Milestones:**
  1. **shadcn Component Installation:** Systematically install base shadcn/ui components via CLI or source primitives.
  2. **Interactive Preview Implementation:**
     - Create realistic, interactive preview components with authentic sample data and states.
     - Verify components adhere to dark-mode-first aesthetic and hairline border discipline.
  3. **Media & Stock Assets:**
     - Download required component stock images from `https://picsum.photos/{width}/{height}`.
     - Save into `src/assets/` following `stock-{component_name}-{integer_revision}-{integer_nth_image}`.
  4. **Coverage Audit:**
     - Map every component against the standard core inventory from `INITIAL-IDEA.md`.
     - Confirm all non-standard and extended items are excluded from rendering.
- **Exit Criteria:**
  - All standard core components have visually polished, interactive, centered previews.

---

## Phase 5: Verification, Quality Review & Launch Readiness

**Goal:** Execute full verification, quality reviews, performance optimization, and launch preparation per `AGENTS.md`.

- **Milestones:**
  1. **Functional & Regression Verification:**
     - Verify drag-and-drop responsiveness, filter queries, sort switching, reset operations, and theme toggling.
     - Cross-browser and responsive viewport testing.
  2. **Quality & Review Pipeline (with explicit user approval gates):**
     - Step 1: `code-review-and-quality` audit.
     - Step 2: `code-simplification` refactor upon confirmation.
     - Step 3: `performance-optimization` check upon confirmation.
     - Step 4: `security-and-hardening` audit upon confirmation.
  3. **Shipping & Launch:**
     - Prepare launch-readiness checklist via `shipping-and-launch`.
     - Present Go/No-Go recommendation for deployment.
- **Exit Criteria:**
  - Clean build (`npm run build`), clean typecheck (`npx tsc --noEmit`), and zero console errors.
  - User reviews and approves the launch-readiness checklist.
