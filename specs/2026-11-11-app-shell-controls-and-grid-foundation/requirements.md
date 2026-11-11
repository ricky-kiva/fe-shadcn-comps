# Requirements: Application Shell, Controls & Grid Foundation

## 1. Feature Overview & Objective

Phase 2 of the SHADCN Explorer roadmap builds the primary application shell, responsive grid container, navigation header controls, fixed footer, and theme management system. 

The objective is to establish the full outer visual and interaction architecture so that users can switch themes, filter components, toggle sort modes, and view the responsive grid layout before individual component previews and drag-and-drop interactions are populated in Phases 3 and 4.

---

## 2. Context & Design System Alignment (`DESIGN.md`)

- **Vercel-Inspired Aesthetic:** Stark ink-on-canvas palette (`#171717` ink, `#000000`/`#0a0a0a` dark canvas, `#ffffff`/`#fafafa` light canvas).
- **Hairline Dividers:** 1px subtle borders (`#262626` in dark mode, `#ebebeb` in light mode).
- **Typography:** Geist Sans for interface copy, Geist Mono for badges and technical labels.
- **Button Radii:** In-app controls strictly utilize 6px square-ish corners (`rounded-sm`), avoiding marketing 100px pills within the application surface.
- **Elevation:** Stacked subtle shadow offsets (`shadow-stacked`).
- **Dark Mode Default:** The application initializes in dark mode on first visit and persists user preferences in `localStorage`.

---

## 3. Functional Scope

### In Scope

1. **Theme Provider & Theme Switching:**
   - Client-side theme provider supporting `dark` and `light` themes with **dark mode as default**.
   - Synchronizes `.dark` class directly on `document.documentElement` (`<html>`).
   - Persists user selection in `localStorage` under key `shadcn_explorer_theme`.
   - Smooth, instant theme toggling without page reload or layout shift.

2. **Application Header (`src/components/layout/Header.tsx`):**
   - Compact, sticky navigation header (`h-14`) with backdrop blur (`backdrop-blur-md`) and bottom hairline border.
   - **Left Side:**
     - Application icon (`src/assets/logo-1-1.png`).
     - Application title: `SHADCN Explorer` in Geist Sans (`text-sm font-semibold tracking-tight`).
   - **Right Side:**
     - **Sort Button:** Toggles between `Alphabetical` and `Custom` mode. Displays current mode with subtle icon/label.
     - **Component Filter (`ComponentFilter.tsx`):** Compact real-time search input with magnifying glass icon and clear button (`Esc` to clear).
     - **Theme Toggle (`ThemeToggle.tsx`):** Compact icon button switching between Sun (light) and Moon (dark) icons.
     - **Settings Button (`SettingsDropdown.tsx`):** Gear/slider icon opening a dropdown menu containing:
       - *Reset Custom Order:* Restores default alphabetical order.
       - *Reset Component Filter:* Clears search filter and reveals all components.

3. **Subtle Fixed Footer (`src/components/layout/Footer.tsx`):**
   - Fixed to the bottom center of the viewport with a top gradient fading into transparency (`mask-image` or gradient border).
   - Understated monospace/caption text: `Made with ♡ by Rickyslash`.
   - Recognizable clickable social icons with accessible labels:
     - GitHub: `https://github.com/ricky-kiva`
     - Instagram: `https://www.instagram.com/r.ckyslash/`
     - LinkedIn: `https://www.linkedin.com/in/ricky-fadel/`
     - Buy me a Coffee: `https://ko-fi.com/rickyslash`
     - Rickyslash portfolio: `https://rickyslash.my.id`
   - Opens in new tab with `target="_blank" rel="noopener noreferrer"`.
   - Content container includes bottom padding (`pb-20`) so footer never obstructs grid cards.

4. **Responsive Component Grid Container (`src/components/gallery/ComponentGrid.tsx`):**
   - Responsive multi-column grid maintaining strictly uniform square cells (`aspect-square`).
   - Breakpoint scaling:
     - Mobile (<640px): 1 column
     - Small (640px+): 2 columns
     - Medium (768px+): 3 columns
     - Large (1024px+): 4 columns
     - Extra Large (1280px+): 5 columns
   - Thin hairline borders separating cells.
   - Graceful empty state when search filter returns zero matches.

5. **State Management (`src/context/GalleryContext.tsx`):**
   - Centralizes `sortMode` (`"alphabetical" | "custom"`), `searchQuery` (`string`), and reset actions.

### Out of Scope

- Implementing the 53 specific shadcn component previews (Phase 4).
- Drag-and-drop pointer event handlers and reordering collision detection (Phase 3).
- Remote backend APIs or user account sync.

---

## 4. Key Architectural Decisions

| Decision | Selected Approach | Rationale |
|---|---|---|
| **Theme Management** | Custom React Context (`ThemeContext`) | Lightweight, zero-dependency solution tailored to the dark-mode default requirement with instant `localStorage` synchronization. |
| **Gallery State** | Context API (`GalleryContext`) | Clean separation of concerns; enables Header controls, Grid, and Settings dropdown to coordinate without prop-drilling deeper than 2 levels. |
| **Icons** | `lucide-react` | Clean, accessible SVG icons (`Sun`, `Moon`, `Search`, `SlidersHorizontal`, `ArrowDownAZ`, `Shuffle`, `Github`, `Linkedin`, `Coffee`, etc.). |
| **Grid Cell Geometry** | CSS `aspect-square` with CSS Grid | Enforces identical width and height per cell across all viewport sizes without JavaScript resize listeners. |
| **Dropdown Menu** | Accessible lightweight popover / menu | Native keyboard navigation (`ArrowDown`, `ArrowUp`, `Escape`, `Enter`) with click-outside listener. |

---

## 5. Non-Functional Requirements & Constraints

- **Accessibility (WCAG 2.1 AA):** All buttons and icon-only triggers include `aria-label` or visible accessible text. Full keyboard navigability (Tab, Enter, Escape).
- **Performance Budget:** Search filtering responds in <50ms. Zero layout thrashing during theme toggle or window resizing.
- **Type Safety:** 100% strict TypeScript typing. Zero `any` assertions.
- **Code Style:** Named exports exclusively across all components, hooks, and contexts.
