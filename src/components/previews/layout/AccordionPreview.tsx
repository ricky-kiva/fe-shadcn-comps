import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionPreview() {
  return (
    <div className="w-full max-w-[155px]">
      <AccordionPrimitive.Root
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full divide-y divide-border rounded-sm border border-border bg-canvas shadow-xs"
      >
        <AccordionPrimitive.Item value="item-1" className="overflow-hidden">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "flex flex-1 items-center justify-between py-1.5 px-2 font-sans text-[11px] font-medium text-foreground transition-all hover:bg-canvas-soft",
                "[&[data-state=open]>svg]:rotate-180"
              )}
            >
              <span>Is it accessible?</span>
              <ChevronDown className="h-3 w-3 shrink-0 text-neutral-400 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden px-2 pb-1.5 pt-0 font-sans text-[10px] text-neutral-400 animate-in fade-in-0">
            Yes. It adheres to WAI-ARIA.
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </div>
  );
}
