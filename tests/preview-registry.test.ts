import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  PREVIEW_REGISTRY,
  getComponentPreview,
  FallbackPreview,
} from "@/components/previews";
import { COMPONENT_REGISTRY } from "@/data/components";

describe("Centralized Preview Registry (Task 5.1)", () => {
  it("contains preview mappings for all 53 standard components", () => {
    expect(COMPONENT_REGISTRY).toHaveLength(53);

    for (const comp of COMPONENT_REGISTRY) {
      const PreviewComponent = PREVIEW_REGISTRY[comp.id];
      expect(
        PreviewComponent,
        `Missing preview component for id: ${comp.id}`
      ).toBeDefined();
      expect(typeof PreviewComponent).toBe("function");
    }
  });

  it("returns the corresponding preview component via getComponentPreview", () => {
    const ButtonPreviewComponent = getComponentPreview("button");
    expect(ButtonPreviewComponent).toBe(PREVIEW_REGISTRY["button"]);

    const html = renderToString(React.createElement(ButtonPreviewComponent));
    expect(html).toContain("Action");
  });

  it("returns FallbackPreview when querying an unmapped component id", () => {
    const UnknownPreview = getComponentPreview("unknown-non-existent-id");
    expect(UnknownPreview).toBe(FallbackPreview);

    const html = renderToString(React.createElement(UnknownPreview));
    expect(html).toContain("Preview");
  });
});
