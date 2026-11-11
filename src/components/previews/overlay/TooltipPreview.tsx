import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function TooltipPreview() {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-canvas",
              "text-neutral-400 hover:text-foreground hover:bg-canvas-soft transition-colors shadow-xs"
            )}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add to library</span>
          </button>
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={4}
            className="z-50 overflow-hidden rounded-xs bg-foreground px-2 py-1 font-sans text-[11px] font-medium text-background shadow-stacked animate-in fade-in-0"
          >
            <p>Add to library</p>
            <TooltipPrimitive.Arrow className="fill-foreground" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
