import * as React from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentCardProps {
  id: string;
  name: string;
  isDraggable?: boolean;
  isDragging?: boolean;
  showDragHint?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ComponentCard = React.forwardRef<HTMLDivElement, ComponentCardProps>(
  function ComponentCard(
    {
      id,
      name,
      isDraggable = true,
      isDragging = false,
      showDragHint = false,
      dragHandleProps,
      children,
      className,
      style,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        style={style}
        data-component-id={id}
        className={cn(
          "group relative flex aspect-square w-full items-center justify-center bg-canvas p-6 select-none transition-colors",
          "hover:bg-canvas-soft/80",
          isDragging && "opacity-40",
          className
        )}
      >
        {/* Drag handle (hover-only in Custom mode with temporary simultaneous hint support) */}
        {isDraggable && (
          <div
            aria-label={`Drag handle for ${name}`}
            className={cn(
              "absolute top-2.5 right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-xs text-neutral-500 hover:text-foreground cursor-grab active:cursor-grabbing transition-opacity duration-300",
              showDragHint ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            {...dragHandleProps}
          >
            <GripVertical className="h-3.5 w-3.5" />
          </div>
        )}

        {/* Centered preview slot (strictly dead-center) */}
        <div className="flex flex-1 items-center justify-center w-full h-full max-h-[calc(100%-2.5rem)] overflow-hidden">
          {children ?? (
            <div className="flex flex-col items-center justify-center gap-1.5 text-neutral-400">
              <div className="h-8 w-16 rounded-xs border border-dashed border-border bg-canvas-soft flex items-center justify-center">
                <span className="font-mono text-[10px] text-neutral-500">Preview</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom subtle label */}
        <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none px-2">
          <span className="font-mono text-xs tracking-tight text-neutral-400 group-hover:text-foreground transition-colors truncate block">
            {name}
          </span>
        </div>
      </div>
    );
  }
);
