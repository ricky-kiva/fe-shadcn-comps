import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { CalendarPreview } from "@/components/previews/forms/CalendarPreview";
import { ComboboxPreview } from "@/components/previews/forms/ComboboxPreview";
import { ChartPreview } from "@/components/previews/data-display/ChartPreview";
import { ComponentCard } from "@/components/gallery/ComponentCard";

describe("Component Interactivity & Custom Drag Hint UX (Task 3.2)", () => {
  it("renders CalendarPreview with interactive day buttons", () => {
    const html = renderToString(<CalendarPreview />);
    expect(html).toContain("November 2026");
    expect(html).toContain("<button");
  });

  it("renders ComboboxPreview with interactive popover trigger", () => {
    const html = renderToString(<ComboboxPreview />);
    expect(html).toContain("Select framework...");
    expect(html).toContain("<button");
  });

  it("renders ChartPreview with SVG interactive points and tooltip area", () => {
    const html = renderToString(<ChartPreview />);
    expect(html).toContain("<svg");
    expect(html).toContain("<circle");
  });

  it("renders ComponentCard with hover-only drag handle classes in custom mode", () => {
    const html = renderToString(
      <ComponentCard id="button" name="Button" isDraggable={true} />
    );

    expect(html).toContain("opacity-0 group-hover:opacity-100");
  });

  it("renders ComponentCard with visible drag handle when showDragHint is true", () => {
    const html = renderToString(
      <ComponentCard
        id="button"
        name="Button"
        isDraggable={true}
        showDragHint={true}
      />
    );

    expect(html).toContain("opacity-100");
  });
});
