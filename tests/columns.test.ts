import { describe, it, expect } from "vitest";
import { calculateMaxColumns } from "@/context/GalleryContext";

describe("Dynamic Column Calculations (224px Minimum Cell Width)", () => {
  it("calculates minimum 1 column for widths below 448px", () => {
    expect(calculateMaxColumns(120)).toBe(1);
    expect(calculateMaxColumns(320)).toBe(1);
    expect(calculateMaxColumns(447)).toBe(1);
  });

  it("calculates 2 columns at 448px width (224px per cell)", () => {
    expect(calculateMaxColumns(448)).toBe(2);
    expect(calculateMaxColumns(671)).toBe(2);
  });

  it("calculates columns respecting the 224px minimum across viewports", () => {
    expect(calculateMaxColumns(768)).toBe(3); // 3 * 224 = 672px <= 768px
    expect(calculateMaxColumns(1024)).toBe(4); // 4 * 224 = 896px <= 1024px
    expect(calculateMaxColumns(1200)).toBe(5); // 5 * 224 = 1120px <= 1200px
    expect(calculateMaxColumns(1344)).toBe(6); // 6 * 224 = 1344px <= 1344px
  });

  it("guarantees every column allocation is at least 224px wide", () => {
    for (let width = 224; width <= 2560; width += 50) {
      const cols = calculateMaxColumns(width);
      const cellWidth = width / cols;
      expect(
        cellWidth,
        `Expected cell width ${cellWidth}px at container width ${width}px to be >= 224px`
      ).toBeGreaterThanOrEqual(223.9);
    }
  });
});
