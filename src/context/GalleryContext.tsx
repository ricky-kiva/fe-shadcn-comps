import * as React from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { getInitialOrder } from "@/data/components";

export type SortMode = "alphabetical" | "custom";

export const CUSTOM_ORDER_STORAGE_KEY = "shadcn_explorer_custom_order";
export const COMPONENT_FILTER_STORAGE_KEY = "shadcn_explorer_component_filter";

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
  const [sortMode, setSortMode] = React.useState<SortMode>(initialSortMode);
  const [searchQuery, setSearchQuery] = React.useState<string>(initialSearchQuery);
  const [customOrder, setCustomOrder] = React.useState<string[]>(
    () => initialCustomOrder ?? loadInitialCustomOrder()
  );
  const [selectedComponents, setSelectedComponents] = React.useState<string[]>(
    () => initialSelectedComponents ?? loadInitialComponentFilter()
  );
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
    }),
    [
      sortMode,
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
