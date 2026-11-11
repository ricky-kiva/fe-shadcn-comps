import * as SeparatorPrimitive from "@radix-ui/react-separator";

export function SeparatorPreview() {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[140px] text-center">
      <div className="font-sans text-xs font-medium text-foreground">
        Radix UI
      </div>
      <SeparatorPrimitive.Root className="h-px w-full bg-border" />
      <div className="flex h-4 items-center gap-2 font-mono text-[10px] text-neutral-400">
        <span>Blog</span>
        <SeparatorPrimitive.Root
          orientation="vertical"
          className="h-full w-px bg-border"
        />
        <span>Docs</span>
        <SeparatorPrimitive.Root
          orientation="vertical"
          className="h-full w-px bg-border"
        />
        <span>Source</span>
      </div>
    </div>
  );
}
