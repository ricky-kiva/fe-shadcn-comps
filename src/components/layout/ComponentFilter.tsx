import * as React from "react";
import { Filter, Search, Check, RotateCcw } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { CORE_COMPONENTS } from "@/data/components";
import { cn } from "@/lib/utils";

export function ComponentFilter({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchInDropdown, setSearchInDropdown] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const {
    selectedComponents,
    toggleComponentFilter,
    selectAllFilters,
    clearFilters,
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

  const displayedList = React.useMemo(() => {
    const q = searchInDropdown.trim().toLowerCase();
    if (!q) return CORE_COMPONENTS;
    return CORE_COMPONENTS.filter((name) => name.toLowerCase().includes(q));
  }, [searchInDropdown]);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Filter components by checkboxes"
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-canvas px-2.5 text-xs font-medium text-foreground",
          "hover:bg-canvas-soft transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
          isOpen && "bg-canvas-soft border-neutral-400 dark:border-neutral-600",
          isFiltered && "border-foreground/30 font-semibold"
        )}
      >
        <Filter className="h-3.5 w-3.5 text-neutral-400" />
        <span>Filter</span>
        {isFiltered && (
          <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 px-1 font-mono text-[10px] text-foreground">
            {selectedComponents.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            "absolute right-0 mt-1.5 w-64 rounded-sm border border-border bg-canvas p-2 text-xs text-foreground",
            "shadow-stacked z-50 flex flex-col gap-2 animate-in fade-in duration-150"
          )}
        >
          {/* Header & internal search */}
          <div className="relative flex items-center">
            <Search
              className="pointer-events-none absolute left-2 h-3.5 w-3.5 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchInDropdown}
              onChange={(e) => setSearchInDropdown(e.target.value)}
              placeholder="Search components..."
              aria-label="Search component checklist"
              className={cn(
                "h-7 w-full rounded-xs border border-border bg-canvas-soft pl-7 pr-2 text-xs text-foreground",
                "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600"
              )}
            />
          </div>

          {/* Quick actions */}
          <div className="flex items-center justify-between border-b border-border pb-1.5 px-0.5 text-[11px] font-mono text-neutral-500">
            <button
              type="button"
              onClick={() => selectAllFilters([...CORE_COMPONENTS])}
              className="hover:text-foreground transition-colors"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <RotateCcw className="h-2.5 w-2.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Scrollable checklist */}
          <div className="flex max-h-56 flex-col overflow-y-auto pr-1">
            {displayedList.length === 0 ? (
              <div className="py-4 text-center text-xs text-neutral-500">
                No matching components
              </div>
            ) : (
              displayedList.map((name) => {
                const isChecked = selectedComponents.includes(name);
                return (
                  <label
                    key={name}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-xs px-2 py-1.5 cursor-pointer text-xs select-none",
                      "hover:bg-canvas-soft transition-colors",
                      isChecked && "bg-canvas-soft font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleComponentFilter(name)}
                        className="h-3.5 w-3.5 rounded-xs border-border accent-neutral-800 dark:accent-neutral-200 cursor-pointer"
                      />
                      <span>{name}</span>
                    </div>
                    {isChecked && (
                      <Check className="h-3 w-3 text-neutral-400" aria-hidden="true" />
                    )}
                  </label>
                );
              })
            )}
          </div>

          {/* Summary footer */}
          <div className="border-t border-border pt-1.5 text-center font-mono text-[10px] text-neutral-500">
            {isFiltered
              ? `${selectedComponents.length} of ${CORE_COMPONENTS.length} visible`
              : "Showing all components"}
          </div>
        </div>
      )}
    </div>
  );
}
