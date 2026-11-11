import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComboboxPreview() {
  return (
    <div className="w-full max-w-[145px]">
      <div
        className={cn(
          "flex h-7 w-full items-center justify-between rounded-sm border border-border bg-canvas px-2.5",
          "font-sans text-xs text-foreground shadow-xs cursor-pointer hover:bg-canvas-soft transition-colors"
        )}
      >
        <span className="truncate text-neutral-400">Select framework...</span>
        <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
      </div>
    </div>
  );
}
