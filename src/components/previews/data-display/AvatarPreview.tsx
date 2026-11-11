import * as AvatarPrimitive from "@radix-ui/react-avatar";
import stockAvatar from "@/assets/stock-avatar-1-1.jpg";
import { cn } from "@/lib/utils";

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-2">
      <AvatarPrimitive.Root
        data-avatar-root="true"
        className={cn(
          "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border bg-canvas-soft shadow-xs"
        )}
      >
        <AvatarPrimitive.Image
          src={stockAvatar}
          alt="Avatar user"
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          delayMs={600}
          className="flex h-full w-full items-center justify-center rounded-full bg-canvas-soft font-mono text-xs font-medium text-foreground"
        >
          RK
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      <div className="flex flex-col text-left">
        <span className="font-sans text-xs font-medium text-foreground leading-none">
          Ricky
        </span>
        <span className="font-mono text-[10px] text-neutral-400 mt-0.5">
          @rickyslash
        </span>
      </div>
    </div>
  );
}
