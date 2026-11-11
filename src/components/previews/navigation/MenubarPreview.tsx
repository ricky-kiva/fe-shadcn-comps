import * as MenubarPrimitive from "@radix-ui/react-menubar";

export function MenubarPreview() {
  return (
    <MenubarPrimitive.Root className="flex h-7 items-center rounded-sm border border-border bg-canvas p-1 shadow-xs divide-x divide-border/60">
      <MenubarPrimitive.Menu>
        <MenubarPrimitive.Trigger className="px-2 font-sans text-xs font-medium text-foreground hover:bg-canvas-soft rounded-xs cursor-pointer outline-none">
          File
        </MenubarPrimitive.Trigger>
      </MenubarPrimitive.Menu>
      <MenubarPrimitive.Menu>
        <MenubarPrimitive.Trigger className="px-2 font-sans text-xs font-medium text-neutral-400 hover:text-foreground hover:bg-canvas-soft rounded-xs cursor-pointer outline-none">
          Edit
        </MenubarPrimitive.Trigger>
      </MenubarPrimitive.Menu>
      <MenubarPrimitive.Menu>
        <MenubarPrimitive.Trigger className="px-2 font-sans text-xs font-medium text-neutral-400 hover:text-foreground hover:bg-canvas-soft rounded-xs cursor-pointer outline-none">
          View
        </MenubarPrimitive.Trigger>
      </MenubarPrimitive.Menu>
    </MenubarPrimitive.Root>
  );
}
