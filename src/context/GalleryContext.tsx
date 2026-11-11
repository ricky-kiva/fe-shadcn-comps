import * as React from "react";

export type SortMode = "alphabetical" | "custom";

interface GalleryContextValue {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  toggleSortMode: () => void;
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

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [sortMode, setSortMode] = React.useState<SortMode>("alphabetical");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedComponents, setSelectedComponents] = React.useState<string[]>([]);

  const toggleSortMode = React.useCallback(() => {
    setSortMode((prev) => (prev === "alphabetical" ? "custom" : "alphabetical"));
  }, []);

  const toggleComponentFilter = React.useCallback((name: string) => {
    setSelectedComponents((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  }, []);

  const selectAllFilters = React.useCallback((allNames: string[]) => {
    setSelectedComponents([...allNames]);
  }, []);

  const clearFilters = React.useCallback(() => {
    setSelectedComponents([]);
  }, []);

  const resetOrder = React.useCallback(() => {
    setSortMode("alphabetical");
  }, []);

  const resetFilter = React.useCallback(() => {
    setSearchQuery("");
    setSelectedComponents([]);
  }, []);

  const value = React.useMemo(
    () => ({
      sortMode,
      setSortMode,
      toggleSortMode,
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
