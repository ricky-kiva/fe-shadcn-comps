export function SkeletonPreview() {
  return (
    <div className="flex items-center gap-2.5 w-full max-w-[140px] animate-pulse">
      <div className="h-8 w-8 rounded-full bg-canvas-soft border border-border shrink-0" />
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2.5 w-4/5 rounded-xs bg-canvas-soft" />
        <div className="h-2 w-3/5 rounded-xs bg-canvas-soft/80" />
      </div>
    </div>
  );
}
