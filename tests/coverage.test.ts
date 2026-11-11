import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { COMPONENT_REGISTRY, CORE_COMPONENTS } from "@/data/components";
import { PREVIEW_REGISTRY, getComponentPreview } from "@/components/previews";

describe("Component Coverage Audit (Task 5.3)", () => {
  const NON_STANDARD_EXCLUDED = [
    "attachment",
    "bubble",
    "marker",
    "message",
    "message-scroller",
    "questionnaire",
    "trace",
    "code-block",
    "data-table",
    "date-picker",
    "typography",
  ];

  it("has exactly 53 components registered in COMPONENT_REGISTRY and CORE_COMPONENTS", () => {
    expect(COMPONENT_REGISTRY).toHaveLength(53);
    expect(CORE_COMPONENTS).toHaveLength(53);
    expect(Object.keys(PREVIEW_REGISTRY)).toHaveLength(53);
  });

  it("guarantees 1:1 match between COMPONENT_REGISTRY IDs and PREVIEW_REGISTRY", () => {
    for (const comp of COMPONENT_REGISTRY) {
      expect(
        PREVIEW_REGISTRY[comp.id],
        `Expected PREVIEW_REGISTRY to contain component ${comp.id} (${comp.name})`
      ).toBeDefined();
    }
  });

  it("strictly excludes non-standard and extended components from registry", () => {
    const registeredIds = new Set(COMPONENT_REGISTRY.map((c) => c.id));
    const previewIds = new Set(Object.keys(PREVIEW_REGISTRY));

    for (const excluded of NON_STANDARD_EXCLUDED) {
      expect(
        registeredIds.has(excluded),
        `Non-standard component '${excluded}' must NOT be in COMPONENT_REGISTRY`
      ).toBe(false);
      expect(
        previewIds.has(excluded),
        `Non-standard component '${excluded}' must NOT be in PREVIEW_REGISTRY`
      ).toBe(false);
    }
  });

  it("verifies every registered preview renders clean HTML without crashing", () => {
    for (const comp of COMPONENT_REGISTRY) {
      const PreviewComponent = getComponentPreview(comp.id);
      expect(PreviewComponent).toBeDefined();

      const html = renderToString(React.createElement(PreviewComponent));
      expect(html).toBeTruthy();
      expect(html.length).toBeGreaterThan(0);
    }
  });
});
