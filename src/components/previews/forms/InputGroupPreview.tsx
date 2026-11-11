import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function InputGroupPreview() {
  return (
    <div className="w-full max-w-[150px]">
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className={cn(
            "h-7 w-full rounded-sm border border-border bg-canvas pl-7 pr-7 font-sans text-xs text-foreground",
            "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-foreground transition-colors shadow-xs"
          )}
        />
        <kbd className="absolute right-1.5 rounded-xs border border-border bg-canvas-soft px-1 font-mono text-[9px] text-neutral-400">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
