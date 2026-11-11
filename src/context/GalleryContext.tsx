import * as React from "react";

export type SortMode = "alphabetical" | "custom";

interface GalleryContextValue {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  toggleSortMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetOrder: () => void;
  resetFilter: () => void;
}

const GalleryContext = React.createContext<GalleryContextValue | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [sortMode, setSortMode] = React.useState<SortMode>("alphabetical");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const toggleSortMode = React.useCallback(() => {
    setSortMode((prev) => (prev === "alphabetical" ? "custom" : "alphabetical"));
  }, []);

  const resetOrder = React.useCallback(() => {
    setSortMode("alphabetical");
  }, []);

  const resetFilter = React.useCallback(() => {
    setSearchQuery("");
  }, []);

  const value = React.useMemo(
    () => ({
      sortMode,
      setSortMode,
      toggleSortMode,
      searchQuery,
      setSearchQuery,
      resetOrder,
      resetFilter,
    }),
    [sortMode, toggleSortMode, searchQuery, resetOrder, resetFilter]
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
