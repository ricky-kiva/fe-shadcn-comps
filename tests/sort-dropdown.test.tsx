import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { SortDropdown } from "@/components/layout/SortDropdown";
import { GalleryProvider } from "@/context/GalleryContext";

describe("SortDropdown (Task 1.2)", () => {
  it("renders SortDropdown displaying Alphabetical as default", () => {
    const html = renderToString(
      <GalleryProvider initialSortMode="alphabetical">
        <SortDropdown />
      </GalleryProvider>
    );

    expect(html).toContain("Alphabetical");
  });

  it("renders Category when sortMode is category", () => {
    const html = renderToString(
      <GalleryProvider initialSortMode="category">
        <SortDropdown />
      </GalleryProvider>
    );

    expect(html).toContain("Category");
  });

  it("renders Custom when sortMode is custom", () => {
    const html = renderToString(
      <GalleryProvider initialSortMode="custom">
        <SortDropdown />
      </GalleryProvider>
    );

    expect(html).toContain("Custom");
  });
});
