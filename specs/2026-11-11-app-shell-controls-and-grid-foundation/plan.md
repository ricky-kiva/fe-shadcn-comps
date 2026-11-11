# Implementation Plan: Application Shell, Controls & Grid Foundation

## Overview

This implementation plan decomposes Phase 2 ("Application Shell, Controls & Grid Foundation") into four sequential, verifiable task groups. The goal is to build the complete outer application surface — the persistent dark-mode-first Theme Provider, the interactive Header with search/sort/theme/settings controls, the subtle fixed bottom Footer, and the responsive uniform-cell Grid container.

---

## Dependency Graph

```
Task Group 1: Theme & Gallery State Architecture
    │
    ▼
Task Group 2: Header Architecture & Navigation Controls
    │
    ▼
Task Group 3: Fixed Footer with Gradient Transparency Mask
    │
    ▼
Task Group 4: Responsive Grid Container & Shell Integration
```

---

## Task Groups

### Task Group 1: Theme & Gallery State Architecture

#### Task 1.1: Theme Provider & `useTheme` Hook
**Description:** Implement `src/context/ThemeContext.tsx` providing dark/light theme state, synchronizing `.dark` on `document.documentElement`, and persisting preference in `localStorage`.
**Acceptance criteria:**
- [ ] Dark mode is the default theme if no stored preference exists.
- [ ] Toggling theme updates state, updates `localStorage`, and adds/removes `.dark` class on `document.documentElement`.
- [ ] Named exports: `export function ThemeProvider(...)`, `export function useTheme()`.
**Verification:**
- [ ] Vitest unit tests in `tests/theme.test.ts`.
**Dependencies:** Phase 1 foundation
**Files likely touched:**
- `src/context/ThemeContext.tsx`
- `tests/theme.test.ts`
**Estimated scope:** S (2 files)

---

#### Task 1.2: Gallery State Context & `useGallery` Hook
**Description:** Implement `src/context/GalleryContext.tsx` providing state for `sortMode` (`"alphabetical" | "custom"`), `searchQuery` (`string`), and action handlers for `setSortMode`, `setSearchQuery`, `resetOrder`, and `resetFilter`.
**Acceptance criteria:**
- [ ] Initial state defaults to `sortMode: "alphabetical"` and `searchQuery: ""`.
- [ ] `resetOrder` resets sort to `"alphabetical"`.
- [ ] `resetFilter` clears search query to `""`.
- [ ] Named exports: `export function GalleryProvider(...)`, `export function useGallery()`.
**Verification:**
- [ ] Vitest unit tests in `tests/gallery.test.ts`.
**Dependencies:** None
**Files likely touched:**
- `src/context/GalleryContext.tsx`
- `tests/gallery.test.ts`
**Estimated scope:** S (2 files)

---

### Checkpoint 1: State Architecture Verified
- [ ] `npm test` passes all theme and gallery state unit tests.

---

### Task Group 2: Header Architecture & Navigation Controls

#### Task 2.1: Header Shell & Branding Component
**Description:** Create `src/components/layout/Header.tsx` implementing a sticky top bar (`h-14`) with backdrop blur, bottom hairline border, application logo (`src/assets/logo-1-1.png`), and title.
**Acceptance criteria:**
- [ ] Header mounts logo with alt text and title in Geist Sans (`text-sm font-semibold tracking-tight`).
- [ ] Container scales responsively with clean spacing across viewports.
**Verification:**
- [ ] Component renders cleanly in test harness.
**Dependencies:** Task 1.1, Task 1.2
**Files likely touched:**
- `src/components/layout/Header.tsx`
**Estimated scope:** S (1 file)

---

#### Task 2.2: Component Filter & Sort Toggle Controls
**Description:** Implement `src/components/layout/ComponentFilter.tsx` (compact search input with clear button) and `src/components/layout/SortToggle.tsx` (button toggling Alphabetical vs Custom).
**Acceptance criteria:**
- [ ] Filter input updates `searchQuery` in `GalleryContext`. Includes search icon and clear button when query is non-empty.
- [ ] Sort toggle switches between `"alphabetical"` and `"custom"`, showing visual indicator of active mode.
- [ ] Uses 6px rounded corners (`rounded-sm`), subtle border, and keyboard accessibility (`Escape` clears input).
**Verification:**
- [ ] Unit tests for filter state and keyboard events.
**Dependencies:** Task 1.2
**Files likely touched:**
- `src/components/layout/ComponentFilter.tsx`
- `src/components/layout/SortToggle.tsx`
**Estimated scope:** S (2 files)

---

#### Task 2.3: Theme Toggle & Settings Dropdown
**Description:** Implement `src/components/layout/ThemeToggle.tsx` (switching between Sun and Moon icons) and `src/components/layout/SettingsDropdown.tsx` (menu containing Reset Custom Order and Reset Component Filter).
**Acceptance criteria:**
- [ ] Theme toggle switches dark/light mode with appropriate `aria-label`.
- [ ] Settings icon button opens accessible dropdown menu with subtle hairline border and stacked elevation shadow.
- [ ] Clicking "Reset Custom Order" triggers `resetOrder()` and closes menu.
- [ ] Clicking "Reset Component Filter" triggers `resetFilter()` and closes menu.
- [ ] Closes on outside click or `Escape` key.
**Verification:**
- [ ] Unit tests for dropdown open/close and action dispatching.
**Dependencies:** Task 1.1, Task 1.2
**Files likely touched:**
- `src/components/layout/ThemeToggle.tsx`
- `src/components/layout/SettingsDropdown.tsx`
**Estimated scope:** S (2 files)

---

### Checkpoint 2: Header Controls Operational
- [ ] Header renders all four right-side controls (Sort, Filter, Theme, Settings).
- [ ] All controls update state and fire reset callbacks reliably.

---

### Task Group 3: Fixed Footer with Gradient Transparency Mask

#### Task 3.1: Footer Component with Social & Creator Links
**Description:** Create `src/components/layout/Footer.tsx` fixed to bottom center of viewport, featuring a top gradient fade into transparency and 5 clickable social icons with accessible labels.
**Acceptance criteria:**
- [ ] Fixed positioning (`fixed bottom-0 left-0 right-0 z-20`) with top gradient fade (`bg-gradient-to-t from-canvas to-transparent`).
- [ ] Monospace caption: `Made with ♡ by Rickyslash` linking to `https://rickyslash.my.id`.
- [ ] 5 accessible social links with Lucide icons (GitHub, Instagram, LinkedIn, Buy me a Coffee, Rickyslash).
- [ ] Links open in new tab (`target="_blank" rel="noopener noreferrer"`).
**Verification:**
- [ ] Component renders without console warnings; links verified against URLs.
**Dependencies:** None
**Files likely touched:**
- `src/components/layout/Footer.tsx`
**Estimated scope:** S (1 file)

---

### Checkpoint 3: Footer Complete
- [ ] Footer renders fixed at bottom center with subtle styling and functional links.

---

### Task Group 4: Responsive Grid Container & Shell Integration

#### Task 4.1: ComponentGrid Layout Container
**Description:** Create `src/components/gallery/ComponentGrid.tsx` rendering a responsive CSS grid of uniform square cells (`aspect-square`) separated by hairline borders.
**Acceptance criteria:**
- [ ] Grid columns scale from 1 (mobile) to 2 (sm), 3 (md), 4 (lg), and 5 (xl).
- [ ] Every cell enforces strict square dimensions (`aspect-square`).
- [ ] Renders empty state message when search filter finds no matching components.
**Verification:**
- [ ] Visual verification of grid geometry across viewport breakpoints.
**Dependencies:** Task 1.2
**Files likely touched:**
- `src/components/gallery/ComponentGrid.tsx`
**Estimated scope:** S (1 file)

---

#### Task 4.2: Application Shell Integration
**Description:** Update `src/App.tsx` to wrap the application in `ThemeProvider` and `GalleryProvider`, rendering Header, ComponentGrid with representative placeholder cards, and Footer with appropriate bottom padding (`pb-20`).
**Acceptance criteria:**
- [ ] `src/App.tsx` coordinates full shell layout without horizontal overflow.
- [ ] Theme toggling flips colors across Header, Grid, and Footer seamlessly.
- [ ] Filter input filters visible placeholder cards in real time.
- [ ] Reset actions restore cards and search state.
**Verification:**
- [ ] `npm test` passes with zero failures.
- [ ] `npx tsc --noEmit` exits with 0 errors.
- [ ] `npm run build` generates production bundle in `dist/`.
**Dependencies:** Task 2.1, Task 2.2, Task 2.3, Task 3.1, Task 4.1
**Files likely touched:**
- `src/App.tsx`
**Estimated scope:** S (1 file)

---

### Checkpoint 4: Phase 2 Complete
- [ ] `npm test` passes cleanly.
- [ ] `npm run build` succeeds.
- [ ] Shell, Header, Controls, Footer, and Grid verified across light and dark modes.
- [ ] Ready for Phase 3 (Component Registry, Card System & Drag-and-Drop).

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Fixed footer overlapping grid cards** | Medium | Apply generous bottom padding (`pb-24`) to main content area so bottom-row cards remain fully visible and clickable. |
| **Theme toggle flash during load** | Low | Read initial theme synchronously in `ThemeProvider` from `localStorage` defaulting to `"dark"`. |
| **Dropdown menu positioning & outside clicks** | Low | Implement lightweight, accessible click-outside and keydown listener or Radix dropdown primitive. |
