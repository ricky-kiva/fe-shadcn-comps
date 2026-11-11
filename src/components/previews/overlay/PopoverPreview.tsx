import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export function PopoverPreview() {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "h-7 px-3 rounded-sm font-sans text-xs font-medium transition-colors",
            "border border-border bg-canvas text-foreground hover:bg-canvas-soft shadow-xs"
          )}
        >
          Open Popover
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={4}
          className="z-50 w-60 rounded-sm border border-border bg-canvas p-3 shadow-stacked outline-none animate-in fade-in-0 text-left"
        >
          <div className="space-y-1.5">
            <h4 className="font-sans text-xs font-semibold text-foreground">
              Dimensions
            </h4>
            <p className="font-sans text-[11px] text-neutral-400">
              Set the width and height for the canvas layer.
            </p>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
