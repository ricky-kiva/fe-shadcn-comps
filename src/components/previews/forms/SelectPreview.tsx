import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function SelectPreview() {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  return (
    <div className="w-full max-w-[145px]">
      <SelectPrimitive.Root value={value} onValueChange={setValue}>
        <SelectPrimitive.Trigger
          aria-label="Select fruit"
          className={cn(
            "flex h-7 w-full items-center justify-between rounded-sm border border-border bg-canvas px-2.5",
            "font-sans text-xs text-foreground shadow-xs cursor-pointer hover:bg-canvas-soft transition-colors"
          )}
        >
          <SelectPrimitive.Value placeholder="Select a fruit" />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-50 min-w-[145px] overflow-hidden rounded-sm border border-border bg-canvas p-1 shadow-stacked animate-in fade-in-0"
          >
            <SelectPrimitive.Viewport>
              <SelectPrimitive.Item
                value="apple"
                className="relative flex cursor-pointer select-none items-center rounded-xs py-1 pl-6 pr-2 font-sans text-xs outline-none hover:bg-canvas-soft focus:bg-canvas-soft"
              >
                <span className="absolute left-1.5 flex h-3.5 w-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="h-3 w-3" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>Apple</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
              <SelectPrimitive.Item
                value="banana"
                className="relative flex cursor-pointer select-none items-center rounded-xs py-1 pl-6 pr-2 font-sans text-xs outline-none hover:bg-canvas-soft focus:bg-canvas-soft"
              >
                <span className="absolute left-1.5 flex h-3.5 w-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="h-3 w-3" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>Banana</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
