import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  AccordionPreview,
  AspectRatioPreview,
  CardPreview,
  CollapsiblePreview,
  ResizablePreview,
  ScrollAreaPreview,
  SeparatorPreview,
  SidebarPreview,
} from "@/components/previews/layout";

describe("Layout Component Previews (8 components)", () => {
  it("renders AccordionPreview with items", () => {
    const html = renderToString(<AccordionPreview />);
    expect(html).toContain("Is it accessible?");
  });

  it("renders AspectRatioPreview with 16:9 ratio, image, and explicit width", () => {
    const html = renderToString(<AspectRatioPreview />);
    expect(html).toContain("w-[150px]");
    expect(html).toContain("<img");
  });

  it("renders CardPreview with title and stock image", () => {
    const html = renderToString(<CardPreview />);
    expect(html).toContain("Vercel Deck");
    expect(html).toContain("<img");
  });

  it("renders CollapsiblePreview with trigger", () => {
    const html = renderToString(<CollapsiblePreview />);
    expect(html).toContain("@ricky starred 3 repos");
  });

  it("renders ResizablePreview with two panels", () => {
    const html = renderToString(<ResizablePreview />);
    expect(html).toContain("Panel One");
    expect(html).toContain("Panel Two");
  });

  it("renders ScrollAreaPreview with scrollable content", () => {
    const html = renderToString(<ScrollAreaPreview />);
    expect(html).toContain("Tags");
    expect(html).toContain("v1.0.0");
  });

  it("renders SeparatorPreview with horizontal and vertical rules", () => {
    const html = renderToString(<SeparatorPreview />);
    expect(html).toContain("Radix UI");
    expect(html).toContain("Docs");
  });

  it("renders SidebarPreview with navigation items", () => {
    const html = renderToString(<SidebarPreview />);
    expect(html).toContain("Overview");
    expect(html).toContain("Settings");
  });
});
