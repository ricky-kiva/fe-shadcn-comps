import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SheetPreview() {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "h-7 px-3 rounded-sm font-sans text-xs font-medium transition-colors",
            "border border-border bg-canvas text-foreground hover:bg-canvas-soft shadow-xs"
          )}
        >
          Open Sheet
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-xs border-l border-border bg-canvas p-4 shadow-stacked animate-in slide-in-from-right text-left">
          <div className="flex items-center justify-between">
            <DialogPrimitive.Title className="font-sans text-sm font-semibold text-foreground">
              Sidebar Sheet
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="h-5 w-5 rounded-xs flex items-center justify-center text-neutral-400 hover:text-foreground">
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Description className="mt-1 font-sans text-xs text-neutral-400">
            Slide out sheet overlay content.
          </DialogPrimitive.Description>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
