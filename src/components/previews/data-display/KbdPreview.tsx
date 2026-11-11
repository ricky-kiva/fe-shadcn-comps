export function KbdPreview() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1.5">
        <kbd className="inline-flex h-6 items-center justify-center rounded-xs border border-border bg-canvas px-1.5 font-mono text-[11px] font-semibold text-foreground shadow-xs">
          ⌘K
        </kbd>
        <kbd className="inline-flex h-6 items-center justify-center rounded-xs border border-border bg-canvas px-1.5 font-mono text-[11px] font-medium text-neutral-400 shadow-xs">
          Shift
        </kbd>
      </div>
      <kbd className="inline-flex h-5 items-center justify-center rounded-xs border border-border/80 bg-canvas-soft px-1.5 font-mono text-[10px] text-neutral-400">
        Esc
      </kbd>
    </div>
  );
}
