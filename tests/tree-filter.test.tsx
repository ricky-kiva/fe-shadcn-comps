import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ComponentFilter } from "@/components/layout/ComponentFilter";
import { GalleryProvider } from "@/context/GalleryContext";

describe("Hierarchical Tree Filter (Task 3.1)", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      },
    });
  });

  it("renders ComponentFilter trigger button with Filter icon and label", () => {
    const html = renderToString(
      <GalleryProvider>
        <ComponentFilter />
      </GalleryProvider>
    );

    expect(html).toContain("Filter");
  });

  it("renders with active count when filters are selected", () => {
    const html = renderToString(
      <GalleryProvider initialSelectedComponents={["Button", "Card"]}>
        <ComponentFilter />
      </GalleryProvider>
    );

    expect(html).toContain("Filter (2)");
  });
});
