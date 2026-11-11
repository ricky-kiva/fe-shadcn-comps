import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export function AlertDialogPreview() {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "h-7 px-3 rounded-sm font-sans text-xs font-medium transition-colors",
            "border border-border bg-canvas text-destructive hover:bg-canvas-soft shadow-xs"
          )}
        >
          Delete Account
        </button>
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in-0" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-sm border border-border bg-canvas p-4 shadow-stacked animate-in fade-in-0 zoom-in-95">
          <AlertDialogPrimitive.Title className="font-sans text-sm font-semibold text-foreground">
            Are you absolutely sure?
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="mt-1 font-sans text-xs text-neutral-400">
            This action cannot be undone. This will permanently delete your account.
          </AlertDialogPrimitive.Description>
          <div className="mt-4 flex justify-end gap-2">
            <AlertDialogPrimitive.Cancel asChild>
              <button
                type="button"
                className="h-7 px-3 rounded-xs border border-border bg-canvas font-sans text-xs text-foreground hover:bg-canvas-soft"
              >
                Cancel
              </button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <button
                type="button"
                className="h-7 px-3 rounded-xs bg-destructive text-destructive-foreground font-sans text-xs font-medium hover:bg-destructive/90"
              >
                Continue
              </button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
