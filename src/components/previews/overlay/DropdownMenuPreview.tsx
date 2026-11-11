import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function DropdownMenuPreview() {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-7 items-center gap-1.5 rounded-sm border border-border bg-canvas px-2.5",
            "font-sans text-xs font-medium text-foreground shadow-xs hover:bg-canvas-soft transition-colors"
          )}
        >
          <span>Options</span>
          <ChevronDown className="h-3 w-3 text-neutral-400" />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={4}
          className="z-50 min-w-[130px] overflow-hidden rounded-sm border border-border bg-canvas p-1 shadow-stacked animate-in fade-in-0"
        >
          <DropdownMenuPrimitive.Item className="flex cursor-pointer select-none items-center rounded-xs px-2 py-1 font-sans text-xs text-foreground outline-none hover:bg-canvas-soft">
            New File
          </DropdownMenuPrimitive.Item>
          <DropdownMenuPrimitive.Item className="flex cursor-pointer select-none items-center rounded-xs px-2 py-1 font-sans text-xs text-foreground outline-none hover:bg-canvas-soft">
            Preferences
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
