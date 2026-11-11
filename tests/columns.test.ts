import { describe, it, expect } from "vitest";
import { calculateMaxColumns } from "@/context/GalleryContext";

describe("Dynamic Column Calculations (200px Minimum Cell Width)", () => {
  it("calculates minimum 1 column for widths below 400px", () => {
    expect(calculateMaxColumns(120)).toBe(1);
    expect(calculateMaxColumns(320)).toBe(1);
    expect(calculateMaxColumns(399)).toBe(1);
  });

  it("calculates 2 columns at 400px width (200px per cell)", () => {
    expect(calculateMaxColumns(400)).toBe(2);
    expect(calculateMaxColumns(599)).toBe(2);
  });

  it("calculates columns respecting the 200px minimum across viewports", () => {
    expect(calculateMaxColumns(768)).toBe(3); // 3 * 200 = 600px <= 768px
    expect(calculateMaxColumns(1024)).toBe(5); // 5 * 200 = 1000px <= 1024px
    expect(calculateMaxColumns(1200)).toBe(6); // 6 * 200 = 1200px <= 1200px
  });

  it("guarantees every column allocation is at least 200px wide", () => {
    for (let width = 200; width <= 2560; width += 50) {
      const cols = calculateMaxColumns(width);
      const cellWidth = width / cols;
      expect(
        cellWidth,
        `Expected cell width ${cellWidth}px at container width ${width}px to be >= 200px`
      ).toBeGreaterThanOrEqual(199.9);
    }
  });
});
