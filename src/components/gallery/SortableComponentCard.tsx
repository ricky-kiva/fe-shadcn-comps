import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentCard } from "./ComponentCard";

export interface SortableComponentCardProps {
  id: string;
  name: string;
  isDraggable?: boolean;
  showDragHint?: boolean;
  scale?: number;
  children?: React.ReactNode;
  className?: string;
}

export function SortableComponentCard({
  id,
  name,
  isDraggable = true,
  showDragHint = false,
  scale = 1.0,
  children,
  className,
}: SortableComponentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isDraggable,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ComponentCard
      ref={setNodeRef}
      style={style}
      id={id}
      name={name}
      isDraggable={isDraggable}
      isDragging={isDragging}
      showDragHint={showDragHint}
      scale={scale}
      dragHandleProps={{
        ...attributes,
        ...listeners,
      }}
      className={className}
    >
      {children}
    </ComponentCard>
  );
}
