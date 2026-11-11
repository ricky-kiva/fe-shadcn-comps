import { GripVertical } from "lucide-react";

export function ResizablePreview() {
  return (
    <div className="flex h-16 w-full max-w-[155px] rounded-sm border border-border bg-canvas overflow-hidden shadow-xs">
      <div className="flex-1 flex items-center justify-center p-1 bg-canvas-soft/40 font-mono text-[9px] text-neutral-400">
        Panel One
      </div>
      <div className="w-1.5 bg-border hover:bg-neutral-400 flex items-center justify-center cursor-col-resize transition-colors">
        <GripVertical className="h-2.5 w-2.5 text-neutral-500" />
      </div>
      <div className="flex-1 flex items-center justify-center p-1 bg-canvas-soft/80 font-mono text-[9px] text-foreground font-medium">
        Panel Two
      </div>
    </div>
  );
}
