import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  AvatarPreview,
  BadgePreview,
  CarouselPreview,
  ChartPreview,
  ItemPreview,
  KbdPreview,
  TablePreview,
} from "@/components/previews/data-display";

describe("Data Display Component Previews (7 components)", () => {
  it("renders AvatarPreview with stock image or fallback initials", () => {
    const html = renderToString(<AvatarPreview />);
    expect(html).toContain("data-avatar-root");
  });

  it("renders BadgePreview with badge variants", () => {
    const html = renderToString(<BadgePreview />);
    expect(html).toContain("Badge");
    expect(html).toContain("Secondary");
  });

  it("renders CarouselPreview with navigation indicator", () => {
    const html = renderToString(<CarouselPreview />);
    expect(html).toContain("Slide");
  });

  it("renders ChartPreview with SVG path and gradient", () => {
    const html = renderToString(<ChartPreview />);
    expect(html).toContain("<svg");
    expect(html).toContain("<path");
  });

  it("renders ItemPreview with title and metadata", () => {
    const html = renderToString(<ItemPreview />);
    expect(html).toContain("Design System");
    expect(html).toContain("Updated 2h ago");
  });

  it("renders KbdPreview with keyboard shortcuts", () => {
    const html = renderToString(<KbdPreview />);
    expect(html).toContain("⌘K");
  });

  it("renders TablePreview with table rows", () => {
    const html = renderToString(<TablePreview />);
    expect(html).toContain("<table");
    expect(html).toContain("Invoice");
    expect(html).toContain("Paid");
  });
});
