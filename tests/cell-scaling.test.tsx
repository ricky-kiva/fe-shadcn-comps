import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ComponentCard } from "@/components/gallery/ComponentCard";
import { SortableComponentCard } from "@/components/gallery/SortableComponentCard";
import { ComponentGrid } from "@/components/gallery/ComponentGrid";
import { GalleryProvider, calculateMaxColumns } from "@/context/GalleryContext";

describe("Responsive Cell Sizing (224px min) & Component Scaling (2x max)", () => {
  it("enforces 224px minimum cell width in calculateMaxColumns", () => {
    // Widths under 224px must yield 1 column
    expect(calculateMaxColumns(150)).toBe(1);
    // 447px cannot fit two 224px cells
    expect(calculateMaxColumns(447)).toBe(1);
    // 448px fits exactly two 224px cells
    expect(calculateMaxColumns(448)).toBe(2);
    // 672px fits 3 cells
    expect(calculateMaxColumns(672)).toBe(3);
  });

  it("applies min-w-[224px] constraint to ComponentCard", () => {
    const html = renderToString(<ComponentCard id="button" name="Button" />);
    expect(html).toContain("min-w-[224px]");
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

    const htmlMax = renderToString(
      <ComponentCard id="button" name="Button" scale={2.0} />
    );
    expect(htmlMax).toContain("transform:scale(2)");
  });

  it("forwards scale prop through SortableComponentCard", () => {
    const html = renderToString(
      <SortableComponentCard id="button" name="Button" scale={1.75} />
    );
    expect(html).toContain("transform:scale(1.75)");
  });

  it("renders ComponentGrid with minmax(224px, 1fr) track sizing", () => {
    const html = renderToString(
      <GalleryProvider>
        <ComponentGrid />
      </GalleryProvider>
    );
    expect(html).toContain("minmax(224px, 1fr)");
  });
});
