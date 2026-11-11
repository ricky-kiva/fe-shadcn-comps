# Implementation Plan: Component Inventory Implementation & Asset Integration

## Overview

This implementation plan decomposes Phase 4 ("Component Inventory Implementation & Asset Integration") into five sequential, verifiable task groups. The goal is to download and organize required local stock media assets, install verified base headless component dependencies via Socket CLI, build high-fidelity interactive previews for all 53 standard core shadcn components, wire them into the centralized preview registry, and audit full coverage across the gallery.

---

## Dependency Graph

```
Task Group 1: Media Assets & Base Component Primitives Infrastructure
    │
    ├──► Task Group 2: Form & Input Component Previews (18 components)
    │        │
    ├──► Task Group 3: Data Display & Feedback Component Previews (12 components)
    │        │
    └──► Task Group 4: Layout, Navigation & Overlay Component Previews (23 components)
             │
             ▼
Task Group 5: Preview Registry Wiring, Grid Integration & Coverage Audit (53 components)
```

---

## Task Groups

### Task Group 1: Media Assets & Base Component Primitives Infrastructure

#### Task 1.1: Curate and Download Local Stock Photography Assets
**Description:** Download required stock photographic assets from `https://picsum.photos/{width}/{height}` for components requiring authentic visual imagery (`Card`, `Avatar`, `Aspect Ratio`, `Carousel`, `Item`). Save each file locally in `src/assets/` following the mandated naming format: `stock-{component_name}-{integer_revision}-{integer_nth_image}.jpg`.
**Acceptance criteria:**
- [ ] `stock-card-1-1.jpg` downloaded and stored in `src/assets/`.
- [ ] `stock-avatar-1-1.jpg` downloaded and stored in `src/assets/`.
- [ ] `stock-aspect-ratio-1-1.jpg` downloaded and stored in `src/assets/`.
- [ ] `stock-carousel-1-1.jpg` and `stock-carousel-1-2.jpg` downloaded and stored in `src/assets/`.
- [ ] `stock-item-1-1.jpg` downloaded and stored in `src/assets/`.
- [ ] All downloaded images are optimized in size (JPEG format, appropriate resolutions).
**Verification:**
- [ ] Static file inspection verifies presence and naming convention in `src/assets/`.
**Dependencies:** Phase 3 baseline
**Files likely touched:**
- `src/assets/stock-*.jpg`
**Estimated scope:** S (media files only)

---

#### Task 1.2: Audit and Install Headless Primitives via Socket CLI
**Description:** Inspect and install required headless dependencies for advanced components (e.g., `@radix-ui/react-slider`, `@radix-ui/react-switch`, `@radix-ui/react-dialog`, `@radix-ui/react-tooltip`, etc.) using Socket CLI (`socket`) to ensure zero vulnerabilities or supply chain risks before installing.
**Acceptance criteria:**
- [ ] Run `socket package score npm <pkg>` for every added package.
- [ ] All packages pass with 0 high-severity security vulnerabilities.
- [ ] `package.json` updated with audited dependencies.
**Verification:**
- [ ] `npm run build` compiles without dependency resolution errors.
**Dependencies:** Task 1.1
**Files likely touched:**
- `package.json`
- `package-lock.json`
**Estimated scope:** S (config files)

---

### Checkpoint 1: Assets & Dependencies Verified
- [ ] All required stock media files exist in `src/assets/` following naming rules.
- [ ] Dependencies verified via Socket CLI and installed cleanly.
- [ ] `npm test` and `npx tsc --noEmit` pass with zero errors.

---

### Task Group 2: Form & Input Component Previews (18 components)

#### Task 2.1: Basic Form Controls Previews
**Description:** Implement self-contained, interactive previews for basic form controls: `Button`, `Button Group`, `Checkbox`, `Switch`, `Toggle`, `Toggle Group`, and `Slider` in `src/components/previews/forms/`.
**Acceptance criteria:**
- [ ] `ButtonPreview`: Renders primary, secondary, and outline variant examples.
- [ ] `ButtonGroupPreview`: Renders segmented button group with active state.
- [ ] `CheckboxPreview`: Interactive toggleable checkbox with checked state label.
- [ ] `SwitchPreview`: Smooth animated toggle switch responding to click.
- [ ] `TogglePreview`: Two-state icon toggle button with pressed state.
- [ ] `ToggleGroupPreview`: Segmented toggle group with single selection.
- [ ] `SliderPreview`: Interactive horizontal slider with thumb.
- [ ] All previews adhere to Vercel design system tokens and fit cleanly inside the aspect-square card.
**Verification:**
- [ ] Unit tests in `tests/previews-forms.test.tsx`.
**Dependencies:** Task 1.2
**Files likely touched:**
- `src/components/previews/forms/*.tsx`
- `tests/previews-forms.test.tsx`
**Estimated scope:** M (7-8 files)

---

#### Task 2.2: Advanced Input & Field Previews
**Description:** Implement previews for text and selection controls: `Input`, `Input Group`, `Input OTP`, `Textarea`, `Label`, `Field`, `Combobox`, `Select`, `Native Select`, `Radio Group`, and `Calendar` in `src/components/previews/forms/`.
**Acceptance criteria:**
- [ ] `InputPreview`: Clean text input with placeholder and focus ring.
- [ ] `InputGroupPreview`: Text input with embedded search icon and clear button.
- [ ] `InputOtpPreview`: 4-digit segmented OTP input boxes.
- [ ] `TextareaPreview`: Compact multi-line textarea.
- [ ] `LabelPreview`: Accessible label element associated with control.
- [ ] `FieldPreview`: Field container with label, input, and helper message.
- [ ] `ComboboxPreview`: Searchable popover selector with sample list.
- [ ] `SelectPreview`: Radix-based accessible dropdown selector.
- [ ] `NativeSelectPreview`: Cleanly styled HTML select element.
- [ ] `RadioGroupPreview`: Mutually exclusive options with active indicator.
- [ ] `CalendarPreview`: Compact month calendar widget with selected day.
**Verification:**
- [ ] Unit tests in `tests/previews-forms.test.tsx`.
**Dependencies:** Task 2.1
**Files likely touched:**
- `src/components/previews/forms/*.tsx`
- `tests/previews-forms.test.tsx`
**Estimated scope:** M (11 files)

---

### Checkpoint 2: Form Previews Verified
- [ ] All 18 Form component previews render interactively without errors.
- [ ] `npm test` passes all form preview unit tests.

---

### Task Group 3: Data Display & Feedback Component Previews (12 components)

#### Task 3.1: Data Display Component Previews
**Description:** Implement previews for data display components in `src/components/previews/data-display/`: `Avatar`, `Badge`, `Carousel`, `Chart`, `Item`, `Kbd`, and `Table`.
**Acceptance criteria:**
- [ ] `AvatarPreview`: Stock photo avatar with fallback initials.
- [ ] `BadgePreview`: Status badges (default, secondary, outline).
- [ ] `CarouselPreview`: Swipeable/scrollable mini carousel with local stock imagery.
- [ ] `ChartPreview`: Minimalist SVG area/sparkline chart with ink gradient.
- [ ] `ItemPreview`: Structured item container with thumbnail and metadata.
- [ ] `KbdPreview`: Monospace keyboard shortcut badges (`⌘K`).
- [ ] `TablePreview`: Compact table with header and two sample rows.
**Verification:**
- [ ] Unit tests in `tests/previews-data-display.test.tsx`.
**Dependencies:** Task 1.1
**Files likely touched:**
- `src/components/previews/data-display/*.tsx`
- `tests/previews-data-display.test.tsx`
**Estimated scope:** M (8 files)

---

#### Task 3.2: Feedback Component Previews
**Description:** Implement previews for feedback components in `src/components/previews/feedback/`: `Alert`, `Progress`, `Skeleton`, `Spinner`, and `Toast`.
**Acceptance criteria:**
- [ ] `AlertPreview`: Callout alert with status icon and message.
- [ ] `ProgressPreview`: Determinate progress bar showing ~65% completion.
- [ ] `SkeletonPreview`: Subtle pulse shimmer placeholder for content.
- [ ] `SpinnerPreview`: Smooth rotating SVG loading indicator.
- [ ] `ToastPreview`: Mini toast notification card with title and action.
**Verification:**
- [ ] Unit tests in `tests/previews-feedback.test.tsx`.
**Dependencies:** Task 3.1
**Files likely touched:**
- `src/components/previews/feedback/*.tsx`
- `tests/previews-feedback.test.tsx`
**Estimated scope:** S (6 files)

---

### Checkpoint 3: Data Display & Feedback Verified
- [ ] All 12 Data Display and Feedback component previews render cleanly.
- [ ] `npm test` passes all data display and feedback unit tests.

---

### Task Group 4: Layout, Navigation & Overlay Component Previews (23 components)

#### Task 4.1: Layout Component Previews
**Description:** Implement previews for layout components in `src/components/previews/layout/`: `Accordion`, `Aspect Ratio`, `Card`, `Collapsible`, `Resizable`, `Scroll Area`, `Separator`, and `Sidebar`.
**Acceptance criteria:**
- [ ] `AccordionPreview`: Two-item collapsible accordion with smooth chevron.
- [ ] `AspectRatioPreview`: 16:9 media container rendering a local stock photo.
- [ ] `CardPreview`: Micro card with header, stock image, and action button.
- [ ] `CollapsiblePreview`: Expandable panel with trigger button.
- [ ] `ResizablePreview`: Two-panel resizable preview with draggable divider.
- [ ] `ScrollAreaPreview`: Custom styled scroll container with overflow text.
- [ ] `SeparatorPreview`: Hairline horizontal and vertical dividers.
- [ ] `SidebarPreview`: Mini sidebar navigation preview with active item.
**Verification:**
- [ ] Unit tests in `tests/previews-layout.test.tsx`.
**Dependencies:** Task 1.1
**Files likely touched:**
- `src/components/previews/layout/*.tsx`
- `tests/previews-layout.test.tsx`
**Estimated scope:** M (9 files)

---

#### Task 4.2: Navigation Component Previews
**Description:** Implement previews for navigation components in `src/components/previews/navigation/`: `Breadcrumb`, `Menubar`, `Navigation Menu`, `Pagination`, and `Tabs`.
**Acceptance criteria:**
- [ ] `BreadcrumbPreview`: Slash-delimited path navigation hierarchy.
- [ ] `MenubarPreview`: Horizontal desktop-style application menu bar.
- [ ] `NavigationMenuPreview`: Navigation bar with animated hover flyouts.
- [ ] `PaginationPreview`: Compact page selector with Prev/Next buttons.
- [ ] `TabsPreview`: Layered tab panels with animated active indicator.
**Verification:**
- [ ] Unit tests in `tests/previews-navigation.test.tsx`.
**Dependencies:** Task 4.1
**Files likely touched:**
- `src/components/previews/navigation/*.tsx`
- `tests/previews-navigation.test.tsx`
**Estimated scope:** S (6 files)

---

#### Task 4.3: Overlay Component Previews
**Description:** Implement previews for overlay components in `src/components/previews/overlay/`: `Alert Dialog`, `Command`, `Context Menu`, `Dialog`, `Drawer`, `Dropdown Menu`, `Hover Card`, `Popover`, `Sheet`, and `Tooltip`.
**Acceptance criteria:**
- [ ] Self-contained portal/popover triggers for all 10 overlay components.
- [ ] Overlays render cleanly without clipping or interfering with neighboring grid cells.
- [ ] Tooltip and hover card previews activate on hover/focus.
- [ ] Modal/sheet triggers open accessible overlays with dismiss controls.
**Verification:**
- [ ] Unit tests in `tests/previews-overlay.test.tsx`.
**Dependencies:** Task 4.2
**Files likely touched:**
- `src/components/previews/overlay/*.tsx`
- `tests/previews-overlay.test.tsx`
**Estimated scope:** M (11 files)

---

### Checkpoint 4: Layout, Navigation & Overlay Verified
- [ ] All 23 Layout, Navigation, and Overlay component previews render cleanly.
- [ ] `npm test` passes all layout, navigation, and overlay unit tests.

---

### Task Group 5: Preview Registry Wiring, Grid Integration & Coverage Audit

#### Task 5.1: Centralized Preview Registry
**Description:** Create `src/components/previews/index.ts` mapping each component ID from `src/data/components.ts` to its dedicated preview component.
**Acceptance criteria:**
- [ ] Export `PREVIEW_REGISTRY: Record<string, React.ComponentType>`.
- [ ] Contains mappings for all 53 standard core component IDs.
- [ ] Export fallback preview component for any unmapped ID.
**Verification:**
- [ ] Unit tests in `tests/preview-registry.test.ts`.
**Dependencies:** Task Groups 2, 3, 4
**Files likely touched:**
- `src/components/previews/index.ts`
- `tests/preview-registry.test.ts`
**Estimated scope:** S (2 files)

---

#### Task 5.2: Grid Live Preview Wiring
**Description:** Update `src/components/gallery/ComponentGrid.tsx` and `SortableComponentCard.tsx` to dynamically render the corresponding preview component from `PREVIEW_REGISTRY` instead of the fallback placeholder.
**Acceptance criteria:**
- [ ] Every cell renders its live preview centered in the preview slot.
- [ ] Drag handle in top-right remains strictly isolated and interactive.
- [ ] Clicking on preview controls (buttons, inputs) does not initiate grid drag.
**Verification:**
- [ ] `npm test` passes all tests.
- [ ] `npx tsc --noEmit` exits with 0 errors.
- [ ] `npm run build` succeeds cleanly.
**Dependencies:** Task 5.1
**Files likely touched:**
- `src/components/gallery/ComponentGrid.tsx`
- `src/components/gallery/SortableComponentCard.tsx`
**Estimated scope:** S (2 files)

---

#### Task 5.3: Component Coverage Audit
**Description:** Write an automated coverage audit test in `tests/coverage.test.ts` verifying that exactly the 53 standard core components from `INITIAL-IDEA.md` have registered previews, and no non-standard or extended components (chat primitives, questionnaires, etc.) are included.
**Acceptance criteria:**
- [ ] Confirms 53 registered previews match `COMPONENT_REGISTRY` IDs 1:1.
- [ ] Asserts zero excluded non-standard components exist in the registry.
- [ ] Verifies every preview component renders without runtime errors.
**Verification:**
- [ ] `npm test` passes coverage audit test.
**Dependencies:** Task 5.2
**Files likely touched:**
- `tests/coverage.test.ts`
**Estimated scope:** S (1 file)

---

### Checkpoint 5: Phase 4 Complete
- [ ] All 53 standard core components have live, centered, interactive previews.
- [ ] Full coverage audit test passes with 100% compliance.
- [ ] `npm test` passes all unit and integration tests.
- [ ] `npm run build` succeeds cleanly.
- [ ] Ready for Phase 5 (Verification, Quality Review & Launch Readiness).

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Overlay portals (Dialog, Sheet, Popover) causing layout jumps inside grid** | Medium | Use Radix UI portal triggers that attach overlays to `document.body` or floating layers, keeping the cell layout unaffected. |
| **Interactive controls in previews triggering drag reordering** | High | Drag handle listeners remain strictly isolated to the `GripVertical` icon in `SortableComponentCard`, and `PointerSensor` enforces a 5px movement constraint. |
| **Stock image network failures during builds** | Medium | Download stock images ahead of time and store locally in `src/assets/`, imported as static Vite assets. |
| **Heavy bundle size from 53 previews** | Medium | Keep previews focused, lightweight, and composed using shared headless primitives and Tailwind utilities. |

---

## Open Questions

- *None*: The inventory of 53 components is strictly fixed and cataloged in `src/data/components.ts` and `INITIAL-IDEA.md`.
