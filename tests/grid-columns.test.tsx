import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ColumnSelector } from "@/components/layout/ColumnSelector";
import { ComponentGrid } from "@/components/gallery/ComponentGrid";
import { GalleryProvider } from "@/context/GalleryContext";

describe("ColumnSelector & Dynamic Grid Rendering (Task 2.2)", () => {
  it("renders ColumnSelector displaying columns count and control buttons", () => {
    const html = renderToString(
      <GalleryProvider>
        <ColumnSelector />
      </GalleryProvider>
    );

    expect(html).toContain("col");
    expect(html).toContain("Decrease columns");
    expect(html).toContain("Increase columns");
  });

  it("renders ComponentGrid with dynamic inline gridTemplateColumns", () => {
    const html = renderToString(
      <GalleryProvider>
        <ComponentGrid />
      </GalleryProvider>
    );

    expect(html).toContain("grid-template-columns");
  });
});
