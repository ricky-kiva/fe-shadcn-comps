import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export function DrawerPreview() {
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
          Open Drawer
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 rounded-t-lg border-t border-border bg-canvas p-4 shadow-stacked animate-in slide-in-from-bottom">
          <div className="mx-auto h-1 w-12 rounded-full bg-border mb-3" />
          <DialogPrimitive.Title className="font-sans text-sm font-semibold text-foreground text-center">
            Drawer Navigation
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-1 font-sans text-xs text-neutral-400 text-center">
            Swipeable bottom sheet presentation.
          </DialogPrimitive.Description>
          <div className="mt-4 flex justify-center">
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                className="h-7 px-4 rounded-xs border border-border bg-canvas font-sans text-xs text-foreground hover:bg-canvas-soft"
              >
                Close
              </button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
