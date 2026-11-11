import * as React from "react";
import {
  Filter,
  Search,
  Check,
  Minus,
  ChevronRight,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { COMPONENT_REGISTRY, type ComponentCategory } from "@/data/components";
import { cn } from "@/lib/utils";

const CATEGORIES: readonly ComponentCategory[] = [
  "Forms",
  "Data Display",
  "Feedback",
  "Layout",
  "Navigation",
  "Overlay",
];
const EXPANDED_CATEGORIES_STORAGE_KEY = "shadcn_explorer_expanded_categories";

function loadInitialExpandedCategories(): Record<string, boolean> {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem(EXPANDED_CATEGORIES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch {
    // fallback
  }
  return {
    Forms: true,
    "Data Display": true,
    Feedback: true,
    Layout: true,
    Navigation: true,
    Overlay: true,
  };
}

export function ComponentFilter({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedCategories, setExpandedCategories] = React.useState<
    Record<string, boolean>
  >(loadInitialExpandedCategories);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const {
    selectedComponents,
    setSelectedComponents,
    toggleComponentFilter,
    resetFilter,
  } = useGallery();

  const isFiltered = selectedComponents.length > 0;

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleCategoryExpand = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = { ...prev, [cat]: !prev[cat] };
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(
            EXPANDED_CATEGORIES_STORAGE_KEY,
            JSON.stringify(next)
          );
        }
      } catch {
        // fallback
      }
      return next;
    });
  };

  const categoriesWithComponents = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return CATEGORIES.map((cat) => {
      const allComponentsInCat = COMPONENT_REGISTRY.filter(
        (c) => c.category === cat
      );

      const filteredComponents = q
        ? allComponentsInCat.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.category.toLowerCase().includes(q)
          )
        : allComponentsInCat;

      const selectedCount = allComponentsInCat.filter((c) =>
        selectedComponents.includes(c.name)
      ).length;

      let state: "checked" | "indeterminate" | "unchecked" = "unchecked";
      if (selectedCount === allComponentsInCat.length && selectedCount > 0) {
        state = "checked";
      } else if (selectedCount > 0) {
        state = "indeterminate";
      }

      return {
        category: cat,
        components: filteredComponents,
        allComponents: allComponentsInCat,
        state,
        selectedCount,
        totalCount: allComponentsInCat.length,
      };
    }).filter((group) => group.components.length > 0);
  }, [searchQuery, selectedComponents]);

  const handleToggleCategory = (
    catComponents: typeof COMPONENT_REGISTRY[number][],
    currentState: "checked" | "indeterminate" | "unchecked"
  ) => {
    const names = catComponents.map((c) => c.name);

    if (currentState === "checked") {
      // Deselect all in category
      setSelectedComponents((prev) => prev.filter((name) => !names.includes(name)));
    } else {
      // Select all in category
      setSelectedComponents((prev) => Array.from(new Set([...prev, ...names])));
    }
  };

  const handleSelectAll = () => {
    setSelectedComponents(COMPONENT_REGISTRY.map((c) => c.name));
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="tree"
        aria-expanded={isOpen}
        aria-label="Filter components by category tree"
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-sm border bg-canvas px-2.5 text-xs text-foreground",
          "hover:bg-canvas-soft transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 shadow-xs",
          isFiltered
            ? "border-foreground/40 font-semibold"
            : "border-border font-medium"
        )}
      >
        <Filter className="h-3.5 w-3.5 text-neutral-400" />
        <span className="hidden sm:inline">
          {isFiltered ? `Filter (${selectedComponents.length})` : "Filter"}
        </span>
        {isFiltered && (
          <span className="sm:hidden font-mono text-[10px]">
            ({selectedComponents.length})
          </span>
        )}
      </button>

      {isOpen && (
        <div
          role="region"
          aria-label="Component Filter Hierarchy"
          className={cn(
            "absolute right-0 mt-1.5 w-72 rounded-sm border border-border bg-canvas p-2 text-xs text-foreground",
            "shadow-stacked z-50 animate-in fade-in duration-150 flex flex-col gap-2"
          )}
        >
          {/* Search box inside dropdown */}
          <div className="relative flex items-center">
            <Search className="absolute left-2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category or component..."
              className={cn(
                "h-7 w-full rounded-xs border border-border bg-canvas-soft pl-7 pr-2 font-sans text-xs text-foreground",
                "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-foreground transition-colors"
              )}
            />
          </div>

          {/* Action buttons: Select all / Reset */}
          <div className="flex items-center justify-between px-1 text-[11px] font-mono border-b border-border pb-1.5">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-neutral-400 hover:text-foreground transition-colors cursor-pointer"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={resetFilter}
              className="text-neutral-400 hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Tree hierarchy list */}
          <div className="max-h-64 overflow-y-auto space-y-1 pr-1 font-sans">
            {categoriesWithComponents.length === 0 ? (
              <div className="py-6 text-center text-neutral-400 font-mono text-xs">
                No matching components
              </div>
            ) : (
              categoriesWithComponents.map((group) => {
                const isExpanded =
                  expandedCategories[group.category] || searchQuery.trim().length > 0;

                return (
                  <div key={group.category} className="space-y-0.5">
                    {/* Category Header Row */}
                    <div className="flex items-center justify-between rounded-xs px-1 py-1 hover:bg-canvas-soft/80 group transition-colors">
                      <div className="flex items-center gap-1.5 flex-1 select-none">
                        <button
                          type="button"
                          onClick={() => toggleCategoryExpand(group.category)}
                          aria-label={`Toggle ${group.category} category`}
                          className="h-4 w-4 flex items-center justify-center text-neutral-400 hover:text-foreground"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </button>

                        {/* Tri-state Checkbox for Category */}
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={
                            group.state === "indeterminate" ? "mixed" : group.state === "checked"
                          }
                          onClick={() =>
                            handleToggleCategory(group.allComponents, group.state)
                          }
                          className={cn(
                            "flex h-3.5 w-3.5 items-center justify-center rounded-xs border transition-colors",
                            group.state === "checked"
                              ? "bg-foreground border-foreground text-background"
                              : group.state === "indeterminate"
                              ? "bg-foreground border-foreground text-background"
                              : "border-border bg-canvas hover:border-neutral-400"
                          )}
                        >
                          {group.state === "checked" && (
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          )}
                          {group.state === "indeterminate" && (
                            <Minus className="h-2.5 w-2.5 stroke-[3]" />
                          )}
                        </button>

                        <span
                          onClick={() => toggleCategoryExpand(group.category)}
                          className="font-medium text-xs text-foreground cursor-pointer"
                        >
                          {group.category}
                        </span>
                      </div>

                      <span className="font-mono text-[10px] text-neutral-400">
                        {group.selectedCount}/{group.totalCount}
                      </span>
                    </div>

                    {/* Children Component Rows */}
                    {isExpanded && (
                      <div className="pl-6 space-y-0.5 border-l border-border/60 ml-2.5">
                        {group.components.map((comp) => {
                          const isSelected = selectedComponents.includes(comp.name);

                          return (
                            <label
                              key={comp.id}
                              className="flex items-center gap-2 rounded-xs px-1.5 py-1 text-xs hover:bg-canvas-soft cursor-pointer select-none transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleComponentFilter(comp.name)}
                                className="sr-only"
                              />
                              <div
                                className={cn(
                                  "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-xs border transition-colors",
                                  isSelected
                                    ? "bg-foreground border-foreground text-background"
                                    : "border-border bg-canvas"
                                )}
                              >
                                {isSelected && (
                                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                                )}
                              </div>
                              <span
                                className={cn(
                                  "truncate",
                                  isSelected
                                    ? "text-foreground font-medium"
                                    : "text-neutral-400"
                                )}
                              >
                                {comp.name}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
