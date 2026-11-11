import * as React from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { getInitialOrder } from "@/data/components";

export type SortMode = "alphabetical" | "category" | "custom";

export const CUSTOM_ORDER_STORAGE_KEY = "shadcn_explorer_custom_order";
export const COMPONENT_FILTER_STORAGE_KEY = "shadcn_explorer_component_filter";
export const GRID_COLUMNS_STORAGE_KEY = "shadcn_explorer_grid_columns";

export function calculateMaxColumns(width: number): number {
  if (width <= 0) return 5;
  const max = Math.floor(width / 170);
  return Math.max(1, Math.min(10, max));
}

function loadInitialGridColumns(): number {
  const saved = getSafeStorageItem(GRID_COLUMNS_STORAGE_KEY);
  if (saved) {
    const num = parseInt(saved, 10);
    if (!isNaN(num) && num >= 1) {
      return num;
    }
  }
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  return calculateMaxColumns(width);
}
function getSafeStorageItem(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Graceful fallback if localStorage is disabled or restricted
  }
  return null;
}

function setSafeStorageItem(key: string, value: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Graceful fallback
  }
}

function removeSafeStorageItem(key: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Graceful fallback
  }
}

function loadInitialCustomOrder(): string[] {
  const saved = getSafeStorageItem(CUSTOM_ORDER_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // JSON parse error, ignore and fall back
    }
  }
  return getInitialOrder();
}

function loadInitialComponentFilter(): string[] {
  const saved = getSafeStorageItem(COMPONENT_FILTER_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // JSON parse error, ignore and fall back
    }
  }
  return [];
}

export interface GalleryContextValue {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  toggleSortMode: () => void;
  customOrder: string[];
  reorderComponents: (activeId: string, overId: string) => void;
  selectedComponents: string[];
  setSelectedComponents: React.Dispatch<React.SetStateAction<string[]>>;
  toggleComponentFilter: (componentName: string) => void;
  selectAllFilters: (allNames: string[]) => void;
  clearFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetOrder: () => void;
  resetFilter: () => void;
  gridColumns: number;
  maxColumns: number;
  setGridColumns: (cols: number) => void;
  incrementColumns: () => void;
  decrementColumns: () => void;
  showDragHint: boolean;
  triggerDragHint: () => void;
}
const GalleryContext = React.createContext<GalleryContextValue | undefined>(undefined);

export interface GalleryProviderProps {
  children: React.ReactNode;
  initialSortMode?: SortMode;
  initialSearchQuery?: string;
  initialCustomOrder?: string[];
  initialSelectedComponents?: string[];
}

export function GalleryProvider({
  children,
  initialSortMode = "alphabetical",
  initialSearchQuery = "",
  initialCustomOrder,
  initialSelectedComponents,
}: GalleryProviderProps) {
  const [sortMode, setSortModeState] = React.useState<SortMode>(initialSortMode);
  const [showDragHint, setShowDragHint] = React.useState<boolean>(false);
  const dragHintTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerDragHint = React.useCallback(() => {
    setShowDragHint(true);
    clearTimeout(dragHintTimerRef.current as NodeJS.Timeout);
    dragHintTimerRef.current = setTimeout(() => {
      setShowDragHint(false);
    }, 2500);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(dragHintTimerRef.current as NodeJS.Timeout);
    };
  }, []);

  const setSortMode = React.useCallback(
    (modeOrFn: React.SetStateAction<SortMode>) => {
      setSortModeState((prev) => {
        const next = typeof modeOrFn === "function" ? modeOrFn(prev) : modeOrFn;
        if (next === "custom" && prev !== "custom") {
          triggerDragHint();
        }
        return next;
      });
    },
    [triggerDragHint]
  );
  const [searchQuery, setSearchQuery] = React.useState<string>(initialSearchQuery);
  const [customOrder, setCustomOrder] = React.useState<string[]>(
    () => initialCustomOrder ?? loadInitialCustomOrder()
  );
  const [selectedComponents, setSelectedComponents] = React.useState<string[]>(
    () => initialSelectedComponents ?? loadInitialComponentFilter()
  );
  const [maxColumns, setMaxColumns] = React.useState<number>(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    return calculateMaxColumns(width);
  });
  const [gridColumns, setGridColumnsState] = React.useState<number>(loadInitialGridColumns);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const newMax = calculateMaxColumns(window.innerWidth);
      setMaxColumns(newMax);
      setGridColumnsState((prev) => Math.min(prev, newMax));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setGridColumns = React.useCallback(
    (cols: number) => {
      const clamped = Math.max(1, Math.min(maxColumns, cols));
      setGridColumnsState(clamped);
      setSafeStorageItem(GRID_COLUMNS_STORAGE_KEY, String(clamped));
    },
    [maxColumns]
  );

  const incrementColumns = React.useCallback(() => {
    setGridColumns(gridColumns + 1);
  }, [gridColumns, setGridColumns]);

  const decrementColumns = React.useCallback(() => {
    setGridColumns(gridColumns - 1);
  }, [gridColumns, setGridColumns]);
  const customOrderRef = React.useRef(customOrder);
  customOrderRef.current = customOrder;

  const selectedComponentsRef = React.useRef(selectedComponents);
  selectedComponentsRef.current = selectedComponents;

  const toggleSortMode = React.useCallback(() => {
    setSortMode((prev) => (prev === "alphabetical" ? "custom" : "alphabetical"));
  }, []);

  const reorderComponents = React.useCallback(
    (activeId: string, overId: string) => {
      if (activeId === overId) return;

      const current = customOrderRef.current;
      const oldIndex = current.indexOf(activeId);
      const newIndex = current.indexOf(overId);

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const newOrder = arrayMove(current, oldIndex, newIndex);
      customOrderRef.current = newOrder;
      setCustomOrder(newOrder);
      setSafeStorageItem(CUSTOM_ORDER_STORAGE_KEY, JSON.stringify(newOrder));
    },
    []
  );

  const toggleComponentFilter = React.useCallback((name: string) => {
    const current = selectedComponentsRef.current;
    const updated = current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name];

    selectedComponentsRef.current = updated;
    setSelectedComponents(updated);

    if (updated.length > 0) {
      setSafeStorageItem(COMPONENT_FILTER_STORAGE_KEY, JSON.stringify(updated));
    } else {
      removeSafeStorageItem(COMPONENT_FILTER_STORAGE_KEY);
    }
  }, []);

  const selectAllFilters = React.useCallback((allNames: string[]) => {
    selectedComponentsRef.current = allNames;
    setSelectedComponents([...allNames]);
    setSafeStorageItem(COMPONENT_FILTER_STORAGE_KEY, JSON.stringify(allNames));
  }, []);

  const clearFilters = React.useCallback(() => {
    selectedComponentsRef.current = [];
    setSelectedComponents([]);
    removeSafeStorageItem(COMPONENT_FILTER_STORAGE_KEY);
  }, []);

  const resetOrder = React.useCallback(() => {
    setSortMode("alphabetical");
    const initialOrder = getInitialOrder();
    customOrderRef.current = initialOrder;
    setCustomOrder(initialOrder);
    removeSafeStorageItem(CUSTOM_ORDER_STORAGE_KEY);
  }, []);

  const resetFilter = React.useCallback(() => {
    setSearchQuery("");
    selectedComponentsRef.current = [];
    setSelectedComponents([]);
    removeSafeStorageItem(COMPONENT_FILTER_STORAGE_KEY);
  }, []);

  const value = React.useMemo<GalleryContextValue>(
    () => ({
      sortMode,
      setSortMode,
      toggleSortMode,
      customOrder,
      reorderComponents,
      selectedComponents,
      setSelectedComponents,
      toggleComponentFilter,
      selectAllFilters,
      clearFilters,
      searchQuery,
      setSearchQuery,
      resetOrder,
      resetFilter,
      gridColumns,
      maxColumns,
      setGridColumns,
      incrementColumns,
      decrementColumns,
      showDragHint,
      triggerDragHint,
    }),
    [
      sortMode,
      setSortMode,
      toggleSortMode,
      customOrder,
      reorderComponents,
      selectedComponents,
      toggleComponentFilter,
      selectAllFilters,
      clearFilters,
      searchQuery,
      resetOrder,
      resetFilter,
      gridColumns,
      maxColumns,
      setGridColumns,
      incrementColumns,
      decrementColumns,
      showDragHint,
      triggerDragHint,
    ]
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGallery(): GalleryContextValue {
  const context = React.useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}
