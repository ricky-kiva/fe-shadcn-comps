import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ComponentCard } from "@/components/gallery/ComponentCard";
import { SortableComponentCard } from "@/components/gallery/SortableComponentCard";
import { ComponentGrid } from "@/components/gallery/ComponentGrid";
import { GalleryProvider, calculateMaxColumns } from "@/context/GalleryContext";

describe("Responsive Cell Sizing & Proportional Component Scaling", () => {
  it("enforces 200px minimum cell width in calculateMaxColumns", () => {
    // Widths under 200px must yield 1 column
    expect(calculateMaxColumns(150)).toBe(1);
    // 399px cannot fit two 200px cells
    expect(calculateMaxColumns(399)).toBe(1);
    // 400px fits exactly two 200px cells
    expect(calculateMaxColumns(400)).toBe(2);
    // 600px fits 3 cells
    expect(calculateMaxColumns(600)).toBe(3);
  });

  it("applies min-w-[200px] constraint to ComponentCard", () => {
    const html = renderToString(<ComponentCard id="button" name="Button" />);
    expect(html).toContain("min-w-[200px]");
  });

  it("applies proportional transform scale to the preview content wrapper", () => {
    const htmlDefault = renderToString(
      <ComponentCard id="button" name="Button" scale={1.0} />
    );
    expect(htmlDefault).toContain("transform:scale(1)");

    const htmlScaled = renderToString(
      <ComponentCard id="button" name="Button" scale={1.5} />
    );
    expect(htmlScaled).toContain("transform:scale(1.5)");

    const htmlLarge = renderToString(
      <ComponentCard id="button" name="Button" scale={2.25} />
    );
    expect(htmlLarge).toContain("transform:scale(2.25)");
  });

  it("forwards scale prop through SortableComponentCard", () => {
    const html = renderToString(
      <SortableComponentCard id="button" name="Button" scale={1.75} />
    );
    expect(html).toContain("transform:scale(1.75)");
  });

  it("renders ComponentGrid with minmax(200px, 1fr) track sizing", () => {
    const html = renderToString(
      <GalleryProvider>
        <ComponentGrid />
      </GalleryProvider>
    );
    expect(html).toContain("minmax(200px, 1fr)");
  });
});
