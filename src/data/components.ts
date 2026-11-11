export type ComponentCategory =
  | "Layout"
  | "Forms"
  | "Data Display"
  | "Navigation"
  | "Feedback"
  | "Overlay";

export interface ComponentDefinition {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  defaultIndex: number;
}

export const COMPONENT_REGISTRY: readonly ComponentDefinition[] = [
  {
    id: "accordion",
    name: "Accordion",
    category: "Layout",
    description: "Vertically stacked set of interactive headings that each reveal a section of content.",
    defaultIndex: 0,
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Displays a callout for user attention with status styling.",
    defaultIndex: 1,
  },
  {
    id: "alert-dialog",
    name: "Alert Dialog",
    category: "Overlay",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    defaultIndex: 2,
  },
  {
    id: "aspect-ratio",
    name: "Aspect Ratio",
    category: "Layout",
    description: "Displays content within a desired fixed aspect ratio container.",
    defaultIndex: 3,
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Data Display",
    description: "An image element with a fallback for representing the user.",
    defaultIndex: 4,
  },
  {
    id: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Displays a badge or a component that looks like a badge.",
    defaultIndex: 5,
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "Displays the path to the current resource using a hierarchy of links.",
    defaultIndex: 6,
  },
  {
    id: "button",
    name: "Button",
    category: "Forms",
    description: "Displays a button or a component that looks like a button.",
    defaultIndex: 7,
  },
  {
    id: "button-group",
    name: "Button Group",
    category: "Forms",
    description: "Groups related buttons together into a single cohesive control.",
    defaultIndex: 8,
  },
  {
    id: "calendar",
    name: "Calendar",
    category: "Forms",
    description: "A date field component that allows users to enter and edit dates.",
    defaultIndex: 9,
  },
  {
    id: "card",
    name: "Card",
    category: "Layout",
    description: "Displays a card with header, content, and footer sections.",
    defaultIndex: 10,
  },
  {
    id: "carousel",
    name: "Carousel",
    category: "Data Display",
    description: "A motion-enabled carousel with swipe and scroll controls.",
    defaultIndex: 11,
  },
  {
    id: "chart",
    name: "Chart",
    category: "Data Display",
    description: "Beautiful and accessible charts built using Recharts.",
    defaultIndex: 12,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description: "A control that allows the user to toggle between checked and not-checked.",
    defaultIndex: 13,
  },
  {
    id: "collapsible",
    name: "Collapsible",
    category: "Layout",
    description: "An interactive component which can be expanded and collapsed.",
    defaultIndex: 14,
  },
  {
    id: "combobox",
    name: "Combobox",
    category: "Forms",
    description: "Autocomplete input and command palette with a list of suggestions.",
    defaultIndex: 15,
  },
  {
    id: "command",
    name: "Command",
    category: "Overlay",
    description: "Fast, composable, unstyled command menu for interactive filtering.",
    defaultIndex: 16,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    category: "Overlay",
    description: "Displays a menu to the user activated via right-click or long-press.",
    defaultIndex: 17,
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "Overlay",
    description: "A window overlaid on either the primary window or another dialog window.",
    defaultIndex: 18,
  },
  {
    id: "drawer",
    name: "Drawer",
    category: "Overlay",
    description: "A sliding sheet/drawer component built on top of Vaul.",
    defaultIndex: 19,
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Overlay",
    description: "Displays an accessible dropdown menu triggered by an action element.",
    defaultIndex: 20,
  },
  {
    id: "field",
    name: "Field",
    category: "Forms",
    description: "Accessible form field container with label, control, and validation message.",
    defaultIndex: 21,
  },
  {
    id: "hover-card",
    name: "Hover Card",
    category: "Overlay",
    description: "Allows sighted users to preview content available behind a link.",
    defaultIndex: 22,
  },
  {
    id: "input",
    name: "Input",
    category: "Forms",
    description: "Displays a standard form input field or styled equivalent.",
    defaultIndex: 23,
  },
  {
    id: "input-group",
    name: "Input Group",
    category: "Forms",
    description: "Combines text inputs with addons, buttons, or icons in a unified row.",
    defaultIndex: 24,
  },
  {
    id: "input-otp",
    name: "Input OTP",
    category: "Forms",
    description: "Accessible one-time password component with clipboard integration.",
    defaultIndex: 25,
  },
  {
    id: "item",
    name: "Item",
    category: "Data Display",
    description: "Structured item container for metadata, media previews, and actions.",
    defaultIndex: 26,
  },
  {
    id: "kbd",
    name: "Kbd",
    category: "Data Display",
    description: "Represents keyboard keys or combinations for shortcuts and actions.",
    defaultIndex: 27,
  },
  {
    id: "label",
    name: "Label",
    category: "Forms",
    description: "Renders an accessible label associated with form controls.",
    defaultIndex: 28,
  },
  {
    id: "menubar",
    name: "Menubar",
    category: "Navigation",
    description: "A visually persistent menu bar common in desktop and web applications.",
    defaultIndex: 29,
  },
  {
    id: "native-select",
    name: "Native Select",
    category: "Forms",
    description: "Renders an HTML native select element with styled trigger and options.",
    defaultIndex: 30,
  },
  {
    id: "navigation-menu",
    name: "Navigation Menu",
    category: "Navigation",
    description: "A collection of links and flyouts for website navigation.",
    defaultIndex: 31,
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Pagination component with page navigation, next, and previous buttons.",
    defaultIndex: 32,
  },
  {
    id: "popover",
    name: "Popover",
    category: "Overlay",
    description: "Displays rich content in a portal, triggered by an interaction button.",
    defaultIndex: 33,
  },
  {
    id: "progress",
    name: "Progress",
    category: "Feedback",
    description: "Displays an indicator showing the completion progress of a task.",
    defaultIndex: 34,
  },
  {
    id: "radio-group",
    name: "Radio Group",
    category: "Forms",
    description: "A set of checkable radio buttons where only one item can be active.",
    defaultIndex: 35,
  },
  {
    id: "resizable",
    name: "Resizable",
    category: "Layout",
    description: "Accessible resizable panel groups and layouts with keyboard support.",
    defaultIndex: 36,
  },
  {
    id: "scroll-area",
    name: "Scroll Area",
    category: "Layout",
    description: "Augments native scroll functionality with custom cross-browser styling.",
    defaultIndex: 37,
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    description: "Displays a list of options for the user to pick from, triggered by a button.",
    defaultIndex: 38,
  },
  {
    id: "separator",
    name: "Separator",
    category: "Layout",
    description: "Visually or semantically separates content with a hairline rule.",
    defaultIndex: 39,
  },
  {
    id: "sheet",
    name: "Sheet",
    category: "Overlay",
    description: "Extends Dialog component to display content complementing the screen.",
    defaultIndex: 40,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    category: "Layout",
    description: "A composable, mobile-friendly navigation sidebar component.",
    defaultIndex: 41,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Displays a subtle loading placeholder while content is fetched.",
    defaultIndex: 42,
  },
  {
    id: "slider",
    name: "Slider",
    category: "Forms",
    description: "An input where the user selects a value or range from a slider track.",
    defaultIndex: 43,
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "Feedback",
    description: "Indicates an active loading state for background operations.",
    defaultIndex: 44,
  },
  {
    id: "switch",
    name: "Switch",
    category: "Forms",
    description: "A control that allows the user to toggle between checked and not-checked.",
    defaultIndex: 45,
  },
  {
    id: "table",
    name: "Table",
    category: "Data Display",
    description: "A responsive table component for structured data rows and headers.",
    defaultIndex: 46,
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "A set of layered sections of content known as tab panels.",
    defaultIndex: 47,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "Forms",
    description: "Displays a multi-line form textarea for extended textual input.",
    defaultIndex: 48,
  },
  {
    id: "toast",
    name: "Toast",
    category: "Feedback",
    description: "A succinct message that is displayed temporarily at the screen edge.",
    defaultIndex: 49,
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "Forms",
    description: "A two-state button that can be either on or off.",
    defaultIndex: 50,
  },
  {
    id: "toggle-group",
    name: "Toggle Group",
    category: "Forms",
    description: "A set of two-state buttons that can be toggled on or off together.",
    defaultIndex: 51,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlay",
    description: "A popup that displays information related to an element when hovered.",
    defaultIndex: 52,
  },
];

// Retain CORE_COMPONENTS string array for backward compatibility
export const CORE_COMPONENTS = COMPONENT_REGISTRY.map((c) => c.name);
export type CoreComponentName = (typeof CORE_COMPONENTS)[number];

const COMPONENT_BY_ID: Record<string, ComponentDefinition> = Object.fromEntries(
  COMPONENT_REGISTRY.map((comp) => [comp.id, comp])
);

export function getComponentById(id: string): ComponentDefinition | undefined {
  return COMPONENT_BY_ID[id];
}

export function getInitialOrder(): string[] {
  return COMPONENT_REGISTRY.map((c) => c.id);
}

export function getAlphabeticalOrder(): string[] {
  return [...COMPONENT_REGISTRY]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => c.id);
}

export function getCategoryOrder(): string[] {
  return [...COMPONENT_REGISTRY]
    .sort((a, b) => {
      const catCompare = a.category.localeCompare(b.category);
      if (catCompare !== 0) return catCompare;
      return a.name.localeCompare(b.name);
    })
    .map((c) => c.id);
}
