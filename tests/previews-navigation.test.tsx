import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  BreadcrumbPreview,
  MenubarPreview,
  NavigationMenuPreview,
  PaginationPreview,
  TabsPreview,
} from "@/components/previews/navigation";

describe("Navigation Component Previews (5 components)", () => {
  it("renders BreadcrumbPreview with path items", () => {
    const html = renderToString(<BreadcrumbPreview />);
    expect(html).toContain("Home");
    expect(html).toContain("Components");
    expect(html).toContain("Gallery");
  });

  it("renders MenubarPreview with top-level menu triggers", () => {
    const html = renderToString(<MenubarPreview />);
    expect(html).toContain("File");
    expect(html).toContain("Edit");
  });

  it("renders NavigationMenuPreview with navigation links", () => {
    const html = renderToString(<NavigationMenuPreview />);
    expect(html).toContain("Getting Started");
  });

  it("renders PaginationPreview with page numbers and controls", () => {
    const html = renderToString(<PaginationPreview />);
    expect(html).toContain("Previous");
    expect(html).toContain("Next");
  });

  it("renders TabsPreview with tab triggers and active content", () => {
    const html = renderToString(<TabsPreview />);
    expect(html).toContain("Account");
    expect(html).toContain("Password");
  });
});
