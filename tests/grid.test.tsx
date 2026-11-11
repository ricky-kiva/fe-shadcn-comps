import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ComponentGrid } from "@/components/gallery/ComponentGrid";
import { GalleryProvider } from "@/context/GalleryContext";

describe("ComponentGrid Integration", () => {
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

  it("renders all 53 component cards by default", () => {
    const html = renderToString(
      <GalleryProvider>
        <ComponentGrid />
      </GalleryProvider>
    );

    expect(html).toContain('data-component-id="accordion"');
    expect(html).toContain('data-component-id="button"');
    expect(html).toContain('data-component-id="tooltip"');
  });

  it("filters items according to search query", () => {
    const html = renderToString(
      <GalleryProvider initialSearchQuery="accordion">
        <ComponentGrid />
      </GalleryProvider>
    );

    expect(html).toContain('data-component-id="accordion"');
    expect(html).not.toContain('data-component-id="badge"');
  });

  it("renders empty state when query matches zero components", () => {
    const html = renderToString(
      <GalleryProvider initialSearchQuery="non-existent-xyz-query-12345">
        <ComponentGrid />
      </GalleryProvider>
    );

    expect(html).toContain("No components found");
    expect(html).toContain("Reset filter");
  });

  it("locks drag handles in alphabetical mode and enables in custom mode", () => {
    const alphaHtml = renderToString(
      <GalleryProvider initialSortMode="alphabetical">
        <ComponentGrid />
      </GalleryProvider>
    );
    expect(alphaHtml).not.toContain('aria-label="Drag handle for Button"');

    const customHtml = renderToString(
      <GalleryProvider initialSortMode="custom">
        <ComponentGrid />
      </GalleryProvider>
    );
    expect(customHtml).toContain('aria-label="Drag handle for Button"');
  });

  it("filters components according to selectedComponents filter", () => {
    const html = renderToString(
      <GalleryProvider initialSelectedComponents={["Button", "Card"]}>
        <ComponentGrid />
      </GalleryProvider>
    );

    expect(html).toContain('data-component-id="button"');
    expect(html).toContain('data-component-id="card"');
    expect(html).not.toContain('data-component-id="accordion"');
  });
});
