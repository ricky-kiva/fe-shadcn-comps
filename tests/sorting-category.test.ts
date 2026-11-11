import { describe, it, expect } from "vitest";
import {
  COMPONENT_REGISTRY,
  getCategoryOrder,
  getComponentById,
} from "@/data/components";

describe("Category Sorting (Task 1.1)", () => {
  it("returns all 53 component IDs grouped by category and sorted by name within each category", () => {
    const order = getCategoryOrder();
    expect(order).toHaveLength(53);

    const components = order.map((id) => getComponentById(id)!);

    for (let i = 0; i < components.length - 1; i++) {
      const curr = components[i];
      const next = components[i + 1];

      if (curr.category === next.category) {
        expect(
          curr.name.localeCompare(next.name),
          `Expected ${curr.name} to come before ${next.name} in category ${curr.category}`
        ).toBeLessThanOrEqual(0);
      } else {
        expect(
          curr.category.localeCompare(next.category),
          `Expected category ${curr.category} to come before ${next.category}`
        ).toBeLessThan(0);
      }
    }
  });
});
