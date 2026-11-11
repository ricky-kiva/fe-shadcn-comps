import * as React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { ComponentCard } from "./ComponentCard";
import { cn } from "@/lib/utils";

// 53 standard core shadcn components from INITIAL-IDEA.md
export const DEFAULT_COMPONENTS = [
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
  "Tooltip",
];

export function ComponentGrid({ className }: { className?: string }) {
  const { searchQuery, sortMode, resetFilter } = useGallery();

  // Filter components by search query
  const filteredComponents = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let list = [...DEFAULT_COMPONENTS];

    if (sortMode === "alphabetical") {
      list.sort((a, b) => a.localeCompare(b));
    }

    if (!query) return list;

    return list.filter((name) => name.toLowerCase().includes(query));
  }, [searchQuery, sortMode]);

  if (filteredComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-canvas-soft text-neutral-400 mb-3">
          <SearchX className="h-5 w-5" />
        </div>
        <h3 className="font-sans text-sm font-semibold text-foreground">
          No components found
        </h3>
        <p className="mt-1 font-sans text-xs text-neutral-400 max-w-xs">
          No components match &ldquo;{searchQuery}&rdquo;. Try another search term.
        </p>
        <button
          type="button"
          onClick={resetFilter}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-sm border border-border bg-canvas px-3 py-1.5",
            "font-mono text-xs text-foreground hover:bg-canvas-soft transition-colors"
          )}
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-400" />
          <span>Clear filter</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        "gap-px bg-border border border-border rounded-md overflow-hidden shadow-stacked",
        className
      )}
    >
      {filteredComponents.map((name) => (
        <ComponentCard
          key={name}
          id={name.toLowerCase().replace(/\s+/g, "-")}
          name={name}
          isDraggable={sortMode === "custom"}
        />
      ))}
    </div>
  );
}
