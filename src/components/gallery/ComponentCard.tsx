import * as React from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentCardProps {
  id: string;
  name: string;
  isDraggable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ComponentCard({
  id,
  name,
  isDraggable = true,
  children,
  className,
}: ComponentCardProps) {
  return (
    <div
      data-component-id={id}
      className={cn(
        "group relative flex flex-col items-center justify-between",
        "aspect-square w-full bg-canvas p-4 transition-colors select-none",
        "hover:bg-canvas-soft/80",
        className
      )}
    >
      {/* Top action row */}
      <div className="flex w-full items-center justify-end">
        {isDraggable && (
          <div
            aria-label={`Drag handle for ${name}`}
            className="flex h-6 w-6 items-center justify-center rounded-xs text-neutral-500 hover:text-foreground cursor-grab active:cursor-grabbing transition-colors"
          >
            <GripVertical className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      {/* Centered preview slot */}
      <div className="flex flex-1 items-center justify-center w-full my-auto overflow-hidden">
        {children ?? (
          <div className="flex flex-col items-center justify-center gap-1.5 text-neutral-400">
            <div className="h-8 w-16 rounded-xs border border-dashed border-border bg-canvas-soft flex items-center justify-center">
              <span className="font-mono text-[10px] text-neutral-500">Preview</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom subtle label */}
      <div className="w-full text-center pt-1">
        <span className="font-mono text-xs tracking-tight text-neutral-400 group-hover:text-foreground transition-colors">
          {name}
        </span>
      </div>
    </div>
  );
}
