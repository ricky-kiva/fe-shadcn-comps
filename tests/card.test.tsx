import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ComponentCard } from "@/components/gallery/ComponentCard";
import { SortableComponentCard } from "@/components/gallery/SortableComponentCard";

describe("ComponentCard & SortableComponentCard", () => {
  it("renders component name and preview slot", () => {
    const html = renderToString(
      <ComponentCard id="button" name="Button">
        <button type="button">Click me</button>
      </ComponentCard>
    );

    expect(html).toContain("Button");
    expect(html).toContain("Click me");
    expect(html).toContain('data-component-id="button"');
  });

  it("renders drag handle when isDraggable is true", () => {
    const html = renderToString(
      <ComponentCard id="button" name="Button" isDraggable={true} />
    );

    expect(html).toContain('aria-label="Drag handle for Button"');
  });

  it("hides drag handle when isDraggable is false", () => {
    const html = renderToString(
      <ComponentCard id="button" name="Button" isDraggable={false} />
    );

    expect(html).not.toContain('aria-label="Drag handle for Button"');
  });

  it("applies opacity-40 placeholder styling when isDragging is true", () => {
    const html = renderToString(
      <ComponentCard id="button" name="Button" isDragging={true} />
    );

    expect(html).toContain("opacity-40");
  });

  it("attaches dragHandleProps to the drag handle element only", () => {
    const customProps: React.HTMLAttributes<HTMLDivElement> = {
      "data-testid": "custom-drag-handle",
    };

    const html = renderToString(
      <ComponentCard
        id="button"
        name="Button"
        dragHandleProps={customProps}
      />
    );

    expect(html).toContain('data-testid="custom-drag-handle"');
  });

  it("renders SortableComponentCard without crash", () => {
    const html = renderToString(
      <SortableComponentCard id="card" name="Card" isDraggable={true} />
    );

    expect(html).toContain("Card");
    expect(html).toContain('data-component-id="card"');
  });
});
