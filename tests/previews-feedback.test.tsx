import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  AlertPreview,
  ProgressPreview,
  SkeletonPreview,
  SpinnerPreview,
  ToastPreview,
} from "@/components/previews/feedback";

describe("Feedback Component Previews (5 components)", () => {
  it("renders AlertPreview with title and description", () => {
    const html = renderToString(<AlertPreview />);
    expect(html).toContain("Heads up!");
    expect(html).toContain("You can customize this alert component.");
  });

  it("renders ProgressPreview with progress indicator", () => {
    const html = renderToString(<ProgressPreview />);
    expect(html).toContain("role=\"progressbar\"");
  });

  it("renders SkeletonPreview with pulse shimmer shapes", () => {
    const html = renderToString(<SkeletonPreview />);
    expect(html).toContain("animate-pulse");
  });

  it("renders SpinnerPreview with animated SVG spinner", () => {
    const html = renderToString(<SpinnerPreview />);
    expect(html).toContain("animate-spin");
    expect(html).toContain("<svg");
  });

  it("renders ToastPreview with notification content and action", () => {
    const html = renderToString(<ToastPreview />);
    expect(html).toContain("Event Created");
    expect(html).toContain("Undo");
  });
});
