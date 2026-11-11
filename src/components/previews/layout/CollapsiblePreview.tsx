import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";

export function CollapsiblePreview() {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <CollapsiblePrimitive.Root
      open={open}
      onOpenChange={setOpen}
      className="w-full max-w-[155px] space-y-1 rounded-sm border border-border bg-canvas p-1.5 shadow-xs text-left"
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-[11px] font-medium text-foreground truncate">
          @ricky starred 3 repos
        </span>
        <CollapsiblePrimitive.Trigger asChild>
          <button
            type="button"
            className="h-5 w-5 rounded-xs flex items-center justify-center hover:bg-canvas-soft transition-colors"
          >
            <ChevronsUpDown className="h-3 w-3 text-neutral-400" />
            <span className="sr-only">Toggle</span>
          </button>
        </CollapsiblePrimitive.Trigger>
      </div>

      <div className="rounded-xs border border-border/80 bg-canvas-soft px-2 py-0.5 font-mono text-[9px] text-foreground">
        @radix-ui/primitives
      </div>

      <CollapsiblePrimitive.Content className="space-y-1 overflow-hidden animate-in fade-in-0">
        <div className="rounded-xs border border-border/80 bg-canvas-soft px-2 py-0.5 font-mono text-[9px] text-foreground">
          @shadcn/ui
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
