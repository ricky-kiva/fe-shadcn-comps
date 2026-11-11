import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { CalendarDays } from "lucide-react";

export function HoverCardPreview() {
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <button
          type="button"
          className="font-sans text-xs font-semibold text-foreground underline decoration-neutral-500 underline-offset-4 hover:decoration-foreground transition-colors cursor-pointer"
        >
          @nextjs
        </button>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          sideOffset={4}
          className="z-50 w-64 rounded-sm border border-border bg-canvas p-3 shadow-stacked outline-none animate-in fade-in-0"
        >
          <div className="flex gap-2.5 text-left">
            <div className="h-8 w-8 rounded-full bg-canvas-soft border border-border flex items-center justify-center font-mono text-xs font-bold text-foreground shrink-0">
              N
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs font-semibold text-foreground">
                Next.js
              </span>
              <p className="font-sans text-[11px] text-neutral-400 leading-tight">
                The React Framework for the Web – created and maintained by @vercel.
              </p>
              <div className="flex items-center gap-1 font-mono text-[9px] text-neutral-500 pt-1">
                <CalendarDays className="h-3 w-3" />
                <span>Joined December 2021</span>
              </div>
            </div>
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}
