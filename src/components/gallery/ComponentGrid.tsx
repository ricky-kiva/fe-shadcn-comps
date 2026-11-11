import * as React from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SearchX, RotateCcw } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import {
  getAlphabeticalOrder,
  getCategoryOrder,
  getComponentById,
  type ComponentDefinition,
} from "@/data/components";
import { ComponentCard } from "./ComponentCard";
import { SortableComponentCard } from "./SortableComponentCard";
import { getComponentPreview } from "@/components/previews";
import { cn } from "@/lib/utils";

export function ComponentGrid({ className }: { className?: string }) {
  const {
    sortMode,
    customOrder,
    reorderComponents,
    selectedComponents,
    searchQuery,
    resetFilter,
    gridColumns,
    showDragHint,
  } = useGallery();

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const gridContainerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (!gridContainerRef.current) return;

    const el = gridContainerRef.current;
    if (el.clientWidth > 0) {
      setContainerWidth(el.clientWidth);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaleFactor = React.useMemo(() => {
    if (!containerWidth || gridColumns <= 0) return 1.0;
    const computedCellWidth = (containerWidth - (gridColumns - 1)) / gridColumns;
    const actualCellWidth = Math.max(200, computedCellWidth);
    const rawScale = actualCellWidth / 200;
    return Math.max(1.0, Math.min(2.5, Number(rawScale.toFixed(2))));
  }, [containerWidth, gridColumns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const baseIds = React.useMemo(() => {
    if (sortMode === "alphabetical") return getAlphabeticalOrder();
    if (sortMode === "category") return getCategoryOrder();
    return customOrder;
  }, [sortMode, customOrder]);

  const visibleComponents = React.useMemo(() => {
    return baseIds
      .map((id) => getComponentById(id))
      .filter((comp): comp is ComponentDefinition => {
        if (!comp) return false;

        // Checkbox category/component filter
        if (selectedComponents.length > 0 && !selectedComponents.includes(comp.name)) {
          return false;
        }

        // Search query filter (matches name, category, or id)
        const q = searchQuery.trim().toLowerCase();
        if (q) {
          const matchesName = comp.name.toLowerCase().includes(q);
          const matchesCategory = comp.category.toLowerCase().includes(q);
          const matchesId = comp.id.includes(q);
          if (!matchesName && !matchesCategory && !matchesId) {
            return false;
          }
        }

        return true;
      });
  }, [baseIds, selectedComponents, searchQuery]);

  const visibleIds = React.useMemo(() => {
    return visibleComponents.map((c) => c.id);
  }, [visibleComponents]);

  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id && sortMode === "custom") {
        reorderComponents(String(active.id), String(over.id));
      }
      setActiveId(null);
    },
    [sortMode, reorderComponents]
  );

  const handleDragCancel = React.useCallback(() => {
    setActiveId(null);
  }, []);

  if (visibleComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-canvas-soft text-neutral-400 mb-3">
          <SearchX className="h-5 w-5" />
        </div>
        <h3 className="font-sans text-sm font-semibold text-foreground">
          No components found
        </h3>
        <p className="mt-1 font-sans text-xs text-neutral-400 max-w-xs">
          No components match your active filters.
        </p>
        <button
          type="button"
          onClick={resetFilter}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-sm border border-border bg-canvas px-3 py-1.5",
            "font-mono text-xs text-foreground hover:bg-canvas-soft transition-colors"
          )}
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-400" />
          <span>Reset filter</span>
        </button>
      </div>
    );
  }

  const activeComponent = activeId ? getComponentById(activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={visibleIds} strategy={rectSortingStrategy}>
        <div
          ref={gridContainerRef}
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(200px, 1fr))`,
          }}
          className={cn(
            "grid w-full gap-px bg-border border-b border-border min-w-[200px]",
            className
          )}
        >
          {visibleComponents.map((comp) => {
            const Preview = getComponentPreview(comp.id);
            return (
              <SortableComponentCard
                key={comp.id}
                id={comp.id}
                name={comp.name}
                isDraggable={sortMode === "custom"}
                showDragHint={showDragHint}
                scale={scaleFactor}
              >
                <Preview />
              </SortableComponentCard>
            );
          })}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeComponent ? (
          <div className="aspect-square w-full shadow-stacked cursor-grabbing opacity-95 ring-1 ring-border bg-canvas">
            <ComponentCard
              id={activeComponent.id}
              name={activeComponent.name}
              isDraggable={true}
              scale={scaleFactor}
            >
              {React.createElement(getComponentPreview(activeComponent.id))}
            </ComponentCard>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
