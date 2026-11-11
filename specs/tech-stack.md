# Tech Stack & Architectural Constraints: SHADCN Explorer

## 1. Core Technologies

| Category | Selection | Rationale |
|---|---|---|
| **Framework** | **React 19 / 18** | Standard ecosystem requirement for shadcn/ui and modern headless component primitives. |
| **Language** | **TypeScript (Strict Mode)** | Complete type safety across component metadata, preview contracts, and state management. No `any`. |
| **Build Tool** | **Vite** | Fast ESM dev server, lightning-fast HMR, and optimized production bundling. |
| **Styling** | **Tailwind CSS** | Atomic utility styling supporting design tokens and custom CSS variables defined in `DESIGN.md`. |
| **Component Primitives** | **shadcn/ui & Radix UI** | Accessible, headless, unstyled primitives with high customizability and ARIA compliance. |
| **Icons** | **Lucide React** | Consistent, lightweight, clean iconography aligned with shadcn/ui conventions. |
| **Drag & Drop** | **@hello-pangea/dnd** or **@dnd-kit** | Smooth, accessible drag-and-drop grid reordering. Verified via Socket CLI before install. |
| **Theme Management** | **Lightweight Context / next-themes** | Seamless dark/light theme switching with persistent client-side storage and dark mode as default. |

---

## 2. Executable Commands

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Static type check
npx tsc --noEmit

# Code linting
npm run lint

# Unit & integration testing
npm test
```

---

## 3. Project Directory Structure

```
fe-shadcn-comps/
├── .agents/               # Agent configurations and skill definitions
├── public/                # Public static assets (favicon.png, etc.)
├── src/
│   ├── assets/            # Branding assets (logo-1-1.png) and downloaded stock images
│   ├── components/
│   │   ├── gallery/       # ComponentGrid, ComponentCard, DragHandle, GridControls
│   │   ├── layout/        # Header, Footer, ThemeToggle, SettingsMenu
│   │   ├── previews/      # Individual, dedicated preview implementations per shadcn component
│   │   └── ui/            # Installed base shadcn/ui components (button, card, dialog, etc.)
│   ├── data/
│   │   └── components.ts  # Centralized inventory metadata (ids, titles, categories, preview components)
│   ├── hooks/             # Custom hooks (useComponentOrder, useTheme, useComponentFilter)
│   ├── lib/               # Utility functions (cn, formatters, storage helpers)
│   ├── styles/            # Global styles and Tailwind token mappings
│   ├── App.tsx            # Main shell application layout
│   └── main.tsx           # Application entry point
├── specs/                 # Constitution specifications (mission, tech-stack, roadmap)
├── AGENTS.md              # AI agent rules, workflows, and skills mapping
├── DESIGN.md              # Design system tokens and aesthetic specification
├── INITIAL-IDEA.md         # Initial project idea and component inventory
├── package.json           # Project manifest and scripts
├── tsconfig.json          # Strict TypeScript compiler options
└── vite.config.ts         # Vite bundler configuration with `@/` path aliasing
```

---

## 4. Code Style & Component Pattern

- **Named Exports Only:** Avoid default exports across components and modules.
- **Utility Styling:** Use `cn()` helper (`clsx` + `tailwind-merge`) exclusively for dynamic classes.
- **Isolated Drag Trigger:** Dragging must strictly originate from the drag handle icon, preventing accidental grid dragging when interacting with interactive component previews.

```tsx
import * as React from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  id: string;
  name: string;
  isDraggable?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  children: React.ReactNode;
}

export function ComponentCard({
  id,
  name,
  isDraggable = true,
  dragHandleProps,
  children,
}: ComponentCardProps) {
  return (
    <div
      data-component-id={id}
      className={cn(
        "group relative flex flex-col items-center justify-between",
        "aspect-square w-full rounded-md border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-neutral-950 p-4 transition-colors"
      )}
    >
      <div className="flex w-full items-center justify-end">
        {isDraggable && (
          <div
            {...dragHandleProps}
            aria-label={`Reorder ${name}`}
            className="cursor-grab text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300 active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center w-full my-auto overflow-hidden">
        {children}
      </div>

      <div className="w-full text-center pt-2">
        <span className="font-mono text-xs tracking-tight text-neutral-500 dark:text-neutral-400">
          {name}
        </span>
      </div>
    </div>
  );
}
```

---

## 5. Design System Integration (`DESIGN.md`)

- **Palette:** Ink primary (`#171717`) on light canvas (`#ffffff`), dark canvas (`#000000` / `#0a0a0a`).
- **Hairlines:** Thin 1px subtle borders (`#ebebeb` light / `#262626` dark).
- **Typography:**
  - Display / Headings: Geist Sans with aggressive negative letter-spacing (`-2.4px` at 48px, `-1.28px` at 32px), weight 600 max.
  - Body & Labels: Geist Sans weights 400 / 500.
  - Technical / Captions: Geist Mono at 12–13px.
- **Elevation:** Stacked subtle shadow offsets (4–12% opacity) layered with an inset hairline ring. Never single heavy drop shadows.
- **Pill Radii:** In-app controls use 6px (`rounded-sm`); marketing badges/toggles use pills (`rounded-full`).

---

## 6. Asset Guidelines

- **Stock Images:** Downloaded directly from `https://picsum.photos/{width}/{height}` with appropriate dimensions.
- **File Naming & Path:** Saved in `src/assets/` as:
  `stock-{component_name}-{integer_revision}-{integer_nth_image}`
  *(e.g., `src/assets/stock-card-1-1.jpg`, `src/assets/stock-avatar-1-2.jpg`).*
- **Branding Assets:** Stored locally in `public/favicon.png` and `src/assets/logo-1-1.png`.

---

## 7. Architectural Boundaries

- **Always:**
  - Run type checking (`npx tsc --noEmit`) and lint checks before committing.
  - Audit every new npm package with Socket CLI (`socket`) before installing.
  - Consult verified documentation with Context7 CLI (`ctx7`) before implementing unfamiliar APIs.
  - Follow Git branch and PR conventions per `AGENTS.md`.
- **Ask First:**
  - Introducing heavy third-party libraries or animation engines.
  - Changing project routing architecture or state persistence strategies.
  - Omitting any component from the 71-item inventory if unavailable in shadcn/ui.
- **Never:**
  - Commit API keys, `.env` files, or secrets.
  - Use `any` type overrides in TypeScript.
  - Implement makeshift or fake mocks for missing shadcn components without user consultation.
  - Mix marketing 100px pill buttons and in-app 6px controls within the same screen surface.

---

## 8. Performance Budgets

- **Filter Latency:** Real-time search response in under 50ms across all 71 component cards.
- **Drag Performance:** Smooth 60fps drag-and-drop animation without layout thrashing.
- **Bundle Optimization:** Tree-shaken component imports with code-splitting for heavier previews (e.g., Charts, Data Tables).
