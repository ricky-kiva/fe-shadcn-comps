# Project: SHADCN Explorer

## Overview

Build a minimalist web application called **SHADCN Explorer** that serves as a visual gallery for browsing shadcn components.

The main purpose is to let users quickly browse, preview, and explore multiple shadcn components in a single interface.

## Tech Stack
- React
- Vite
- TypeScript
- shadcn/ui
- Tailwind CSS

## Design Guidelines

- Follow the minimalist design direction described in `DESIGN.md`.
- Use shadcn/ui components and design conventions throughout the application.
- Prioritize visual consistency, clean spacing, and subtle borders.
- Avoid unnecessary decoration, excessive visual elements, or complicated layouts.
- The default theme must be **dark mode**.
- Support switching between dark and light themes.

## Layout & Features

### 1. Header

A minimal header containing:

**Left side:**
- Application icon.
- Application title: `SHADCN Explorer`.

**Right side:**
- **Sort button:** Toggle between:
  - Alphabetical
  - Custom (user-defined drag-and-drop order)
- **Component filter:** Allow users to filter the displayed components.
- **Theme toggle:** Switch between dark and light themes.
- **Settings button:** A small settings icon that opens a dropdown menu containing:
  - **Reset Custom Order:** Restore the default alphabetical component order.
  - **Reset Component Filter:** Clear all active filters and display every component.

Keep the header compact and visually unobtrusive.

### 2. Main Content — Component Grid

Display the component collection in a responsive grid.

Requirements:
- Each cell must have identical width and height.
- Separate cells using thin, subtle borders.
- Each cell displays exactly one shadcn component.
- Components should be centered within their respective cells.
- Maintain consistent spacing and alignment across the grid.
- The grid should adapt to different viewport sizes while preserving the overall layout.
- Component names should be displayed subtly within each cell, preferably near the bottom.
- Add a small drag handle icon to each cell to indicate that it can be dragged and reordered.

**Drag-and-Drop Behavior:**
- Allow users to drag cells using their drag handles to customize the component order.
- Only the drag handle should initiate dragging, avoiding accidental dragging when interacting with the component preview.
- Visually indicate the dragged cell and its potential drop position.
- Update the grid immediately when a cell is dropped.
- Preserve the custom order when switching between sorting modes where appropriate.
- When Alphabetical sorting is active, display components alphabetically and temporarily disable manual reordering.
- When Custom sorting is active, use the user's custom order.
- Resetting the custom order must restore the default alphabetical order.

Every component should have a meaningful, representative preview rather than merely displaying its name or an empty placeholder.

Use appropriate sample content and states to demonstrate each component's appearance and functionality.

### 3. Footer

Add a subtle footer fixed to the bottom center of the viewport.

Design:
- Small, understated text.
- A thin top area with a gradient fading into transparency.
- Keep the footer visually separated from the component grid without obstructing its content.

Content:

GitHub Icon · Instagram Icon · LinkedIn Icon · Buy me a Coffee Icon · Made with ♡ by Rickyslash

Links:
- GitHub: https://github.com/ricky-kiva
- Instagram: https://www.instagram.com/r.ckyslash/
- LinkedIn: https://www.linkedin.com/in/ricky-fadel/
- Buy me a Coffee: https://ko-fi.com/rickyslash
- Rickyslash: https://rickyslash.my.id

Use recognizable icons and make each corresponding item clickable.

## Component Inventory

The grid must include all the following components, with one component per cell.

Preserve this order when using the **Custom** sorting option.

```ts
const components = [
  "Accordion",
  "Alert",
  "Alert Dialog",
  "Aspect Ratio",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Button Group",
  "Calendar",
  "Card",
  "Carousel",
  "Chart",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "Command",
  "Context Menu",
  "Dialog",
  "Drawer",
  "Dropdown Menu",
  "Field",
  "Hover Card",
  "Input",
  "Input Group",
  "Input OTP",
  "Item",
  "Kbd",
  "Label",
  "Menubar",
  "Native Select",
  "Navigation Menu",
  "Pagination",
  "Popover",
  "Progress",
  "Radio Group",
  "Resizable",
  "Scroll Area",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Slider",
  "Spinner",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Toast",
  "Toggle",
  "Toggle Group",
  "Tooltip"
];

## Implementation Expectations

- Build reusable components and maintain a clean project structure.
- Keep the component inventory centralized and easy to maintain.
- Avoid duplicating layout or styling logic.
- Ensure sorting, filtering, and theme switching work correctly.
- Use actual shadcn components wherever available.
- For components not available in the installed shadcn library, do not implement and let me know.
- Ensure all previews are visually representative and use realistic sample data.
- Avoid implementing unnecessary backend functionality. This is primarily a frontend showcase application.

## Getting Started

Before implementation:

1. Inspect the existing project structure and configuration.
2. Read `DESIGN.md` and follow its design guidelines.
3. Identify the available shadcn components and their installation requirements.
4. Plan the component gallery structure before implementing it.

Then implement the application, verify the functionality, and ensure the final result is visually consistent with the intended design.