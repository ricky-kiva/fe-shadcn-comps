import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

export function NavigationMenuPreview() {
  return (
    <NavigationMenuPrimitive.Root className="relative z-10 flex max-w-max flex-1 items-center justify-center">
      <NavigationMenuPrimitive.List className="flex items-center gap-1 rounded-sm border border-border bg-canvas p-1 shadow-xs">
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger className="group inline-flex h-6 items-center justify-center rounded-xs px-2 font-sans text-xs font-medium text-foreground hover:bg-canvas-soft outline-none">
            <span>Getting Started</span>
            <ChevronDown className="relative top-px ml-1 h-3 w-3 text-neutral-400 transition duration-200 group-data-[state=open]:rotate-180" />
          </NavigationMenuPrimitive.Trigger>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link
            href="#"
            className="inline-flex h-6 items-center justify-center rounded-xs px-2 font-sans text-xs font-medium text-neutral-400 hover:text-foreground hover:bg-canvas-soft transition-colors"
          >
            Docs
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}
