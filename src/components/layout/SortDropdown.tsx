import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  ArrowDownAZ,
  Layers,
  GripVertical,
  ChevronDown,
  RotateCcw,
  Check,
} from "lucide-react";
import { useGallery, type SortMode } from "@/context/GalleryContext";
import { cn } from "@/lib/utils";

export function SortDropdown({ className }: { className?: string }) {
  const { sortMode, setSortMode, resetOrder } = useGallery();

  const getSortLabel = (mode: SortMode) => {
    switch (mode) {
      case "alphabetical":
        return "Alphabetical";
      case "category":
        return "Category";
      case "custom":
        return "Custom";
    }
  };

  const renderSortIcon = (mode: SortMode) => {
    switch (mode) {
      case "alphabetical":
        return <ArrowDownAZ className="h-3.5 w-3.5 text-neutral-400" />;
      case "category":
        return <Layers className="h-3.5 w-3.5 text-neutral-400" />;
      case "custom":
        return <GripVertical className="h-3.5 w-3.5 text-neutral-400" />;
    }
  };

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={`Current sort mode: ${getSortLabel(sortMode)}. Open sort options.`}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-canvas px-2.5 text-xs font-medium text-foreground",
            "hover:bg-canvas-soft transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 shadow-xs",
            className
          )}
        >
          {renderSortIcon(sortMode)}
          <span className="hidden sm:inline">{getSortLabel(sortMode)}</span>
          <ChevronDown className="h-3 w-3 text-neutral-400 opacity-60" />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={6}
          className="z-50 min-w-[170px] overflow-hidden rounded-sm border border-border bg-canvas p-1 shadow-stacked animate-in fade-in-0 text-left"
        >
          {/* Alphabetical */}
          <DropdownMenuPrimitive.Item
            onClick={() => setSortMode("alphabetical")}
            className={cn(
              "flex cursor-pointer select-none items-center justify-between rounded-xs px-2 py-1.5 font-sans text-xs outline-none transition-colors",
              sortMode === "alphabetical"
                ? "bg-canvas-soft text-foreground font-medium"
                : "text-neutral-400 hover:text-foreground hover:bg-canvas-soft/60"
            )}
          >
            <div className="flex items-center gap-2">
              <ArrowDownAZ className="h-3.5 w-3.5 text-neutral-400" />
              <span>Alphabetical</span>
            </div>
            {sortMode === "alphabetical" && (
              <Check className="h-3 w-3 text-foreground" />
            )}
          </DropdownMenuPrimitive.Item>

          {/* Component's Category */}
          <DropdownMenuPrimitive.Item
            onClick={() => setSortMode("category")}
            className={cn(
              "flex cursor-pointer select-none items-center justify-between rounded-xs px-2 py-1.5 font-sans text-xs outline-none transition-colors",
              sortMode === "category"
                ? "bg-canvas-soft text-foreground font-medium"
                : "text-neutral-400 hover:text-foreground hover:bg-canvas-soft/60"
            )}
          >
            <div className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-neutral-400" />
              <span>Category</span>
            </div>
            {sortMode === "category" && (
              <Check className="h-3 w-3 text-foreground" />
            )}
          </DropdownMenuPrimitive.Item>

          {/* Custom */}
          <DropdownMenuPrimitive.Item
            onClick={() => setSortMode("custom")}
            className={cn(
              "flex cursor-pointer select-none items-center justify-between rounded-xs px-2 py-1.5 font-sans text-xs outline-none transition-colors",
              sortMode === "custom"
                ? "bg-canvas-soft text-foreground font-medium"
                : "text-neutral-400 hover:text-foreground hover:bg-canvas-soft/60"
            )}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-3.5 w-3.5 text-neutral-400" />
              <span>Custom</span>
            </div>
            {sortMode === "custom" && (
              <Check className="h-3 w-3 text-foreground" />
            )}
          </DropdownMenuPrimitive.Item>

          {/* Divider */}
          <DropdownMenuPrimitive.Separator className="h-px bg-border my-1" />

          {/* Reset Custom */}
          <DropdownMenuPrimitive.Item
            onClick={resetOrder}
            className="flex cursor-pointer select-none items-center gap-2 rounded-xs px-2 py-1.5 font-sans text-xs text-neutral-400 hover:text-foreground hover:bg-canvas-soft outline-none transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-400" />
            <span>Reset Custom</span>
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
