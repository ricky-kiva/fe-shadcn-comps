import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  AlertDialogPreview,
  CommandPreview,
  ContextMenuPreview,
  DialogPreview,
  DrawerPreview,
  DropdownMenuPreview,
  HoverCardPreview,
  PopoverPreview,
  SheetPreview,
  TooltipPreview,
} from "@/components/previews/overlay";

describe("Overlay Component Previews (10 components)", () => {
  it("renders AlertDialogPreview with trigger button", () => {
    const html = renderToString(<AlertDialogPreview />);
    expect(html).toContain("Delete Account");
  });

  it("renders CommandPreview with search and items", () => {
    const html = renderToString(<CommandPreview />);
    expect(html).toContain("Type a command...");
    expect(html).toContain("Calendar");
  });

  it("renders ContextMenuPreview with right click area", () => {
    const html = renderToString(<ContextMenuPreview />);
    expect(html).toContain("Right click here");
  });

  it("renders DialogPreview with modal trigger", () => {
    const html = renderToString(<DialogPreview />);
    expect(html).toContain("Edit Profile");
  });

  it("renders DrawerPreview with slide trigger", () => {
    const html = renderToString(<DrawerPreview />);
    expect(html).toContain("Open Drawer");
  });

  it("renders DropdownMenuPreview with options trigger", () => {
    const html = renderToString(<DropdownMenuPreview />);
    expect(html).toContain("Options");
  });

  it("renders HoverCardPreview with trigger", () => {
    const html = renderToString(<HoverCardPreview />);
    expect(html).toContain("@nextjs");
  });

  it("renders PopoverPreview with settings trigger", () => {
    const html = renderToString(<PopoverPreview />);
    expect(html).toContain("Open Popover");
  });

  it("renders SheetPreview with side panel trigger", () => {
    const html = renderToString(<SheetPreview />);
    expect(html).toContain("Open Sheet");
  });

  it("renders TooltipPreview with hover trigger", () => {
    const html = renderToString(<TooltipPreview />);
    expect(html).toContain("Add to library");
  });
});
