import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DialogPreview() {
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
          Edit Profile
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-sm border border-border bg-canvas p-4 shadow-stacked animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center justify-between">
            <DialogPrimitive.Title className="font-sans text-sm font-semibold text-foreground">
              Edit Profile
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="h-5 w-5 rounded-xs flex items-center justify-center text-neutral-400 hover:text-foreground">
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Description className="mt-1 font-sans text-xs text-neutral-400">
            Make changes to your profile here. Click save when done.
          </DialogPrimitive.Description>
          <div className="mt-4 flex justify-end">
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                className="h-7 px-3 rounded-xs bg-foreground text-background font-sans text-xs font-medium hover:bg-foreground/90"
              >
                Save changes
              </button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
