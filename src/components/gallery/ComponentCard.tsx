import * as React from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentCardProps {
  id: string;
  name: string;
  isDraggable?: boolean;
  isDragging?: boolean;
  showDragHint?: boolean;
  scale?: number;
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
      scale = 1.0,
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
          "group relative flex aspect-square w-full min-w-[200px] items-center justify-center bg-canvas p-6 select-none transition-colors overflow-hidden",
          "hover:bg-canvas-soft/80",
          isDragging && "opacity-40",
          className
        )}
      >
        {/* Drag handle (hover-only in Custom mode with temporary simultaneous hint support) */}
        {isDraggable && (
          <div
            aria-label={`Drag handle for ${name}`}
            style={{
              transform:
                scale > 1.2
                  ? `scale(${Math.min(1.3, Math.sqrt(scale))})`
                  : undefined,
            }}
            className={cn(
              "absolute top-2.5 right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-xs text-neutral-500 hover:text-foreground cursor-grab active:cursor-grabbing transition-opacity duration-300 origin-top-right",
              showDragHint ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            {...dragHandleProps}
          >
            <GripVertical className="h-3.5 w-3.5" />
          </div>
        )}

        {/* Centered preview slot (strictly dead-center and proportionally scaled) */}
        <div className="flex flex-1 items-center justify-center w-full h-full max-h-[calc(100%-2.5rem)] overflow-hidden">
          <div
            className="flex items-center justify-center transition-transform duration-150 ease-out origin-center pointer-events-auto"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            {children ?? (
              <div className="flex flex-col items-center justify-center gap-1.5 text-neutral-400">
                <div className="h-8 w-16 rounded-xs border border-dashed border-border bg-canvas-soft flex items-center justify-center">
                  <span className="font-mono text-[10px] text-neutral-500">Preview</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom subtle label (scales gracefully with cell expansion) */}
        <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none px-2">
          <span
            style={{
              fontSize:
                scale > 1
                  ? `${Math.min(16, 12 * Math.sqrt(scale))}px`
                  : undefined,
            }}
            className="font-mono text-xs tracking-tight text-neutral-400 group-hover:text-foreground transition-colors truncate block"
          >
            {name}
          </span>
        </div>
      </div>
    );
  }
);
