import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

export function ContextMenuPreview() {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger className="flex h-14 w-full max-w-[145px] items-center justify-center rounded-sm border border-dashed border-border bg-canvas-soft/40 p-2 text-center font-mono text-[10px] text-neutral-400 select-none hover:border-foreground/30 transition-colors">
        Right click here
      </ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content className="z-50 min-w-[120px] overflow-hidden rounded-sm border border-border bg-canvas p-1 shadow-stacked animate-in fade-in-0">
          <ContextMenuPrimitive.Item className="flex cursor-pointer select-none items-center rounded-xs px-2 py-1 font-sans text-xs text-foreground outline-none hover:bg-canvas-soft">
            Back
          </ContextMenuPrimitive.Item>
          <ContextMenuPrimitive.Item className="flex cursor-pointer select-none items-center rounded-xs px-2 py-1 font-sans text-xs text-foreground outline-none hover:bg-canvas-soft">
            Reload
          </ContextMenuPrimitive.Item>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
