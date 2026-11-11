import { describe, it, expect } from "vitest";
import { calculateMaxColumns } from "@/context/GalleryContext";

describe("Dynamic Column Calculations (Task 2.1)", () => {
  it("calculates minimum 1 column for very small widths", () => {
    expect(calculateMaxColumns(120)).toBe(1);
    expect(calculateMaxColumns(320)).toBe(1);
  });

  it("calculates 2 columns for ~400px width", () => {
    expect(calculateMaxColumns(400)).toBe(2);
  });

  it("calculates 4-5 columns for standard desktop viewports", () => {
    expect(calculateMaxColumns(768)).toBe(4);
    expect(calculateMaxColumns(1024)).toBe(6);
  });

  it("clamps maximum columns to a reasonable ceiling", () => {
    expect(calculateMaxColumns(3840)).toBeLessThanOrEqual(12);
  });
});
