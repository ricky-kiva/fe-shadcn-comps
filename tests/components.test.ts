import { describe, it, expect } from "vitest";
import {
  COMPONENT_REGISTRY,
  CORE_COMPONENTS,
  getInitialOrder,
  getAlphabeticalOrder,
  getComponentById,
} from "../src/data/components";

describe("Component Registry", () => {
  it("contains exactly 53 standard components", () => {
    expect(COMPONENT_REGISTRY).toHaveLength(53);
    expect(CORE_COMPONENTS).toHaveLength(53);
  });

  it("assigns unique ids and valid categories to every component", () => {
    const ids = new Set<string>();
    const VALID_CATEGORIES: Record<string, true> = {
      Layout: true,
      Forms: true,
      "Data Display": true,
      Navigation: true,
      Feedback: true,
      Overlay: true,
    };

    for (const comp of COMPONENT_REGISTRY) {
      expect(comp.id).toBeTruthy();
      expect(comp.id).toBe(comp.id.toLowerCase().replace(/\s+/g, "-"));
      expect(ids.has(comp.id)).toBe(false);
      ids.add(comp.id);

      expect(comp.name).toBeTruthy();
      expect(VALID_CATEGORIES[comp.category]).toBe(true);
      expect(comp.description).toBeTruthy();
      expect(typeof comp.defaultIndex).toBe("number");
    }
  });

  it("provides getInitialOrder returning 53 IDs in sequence", () => {
    const initialOrder = getInitialOrder();
    expect(initialOrder).toHaveLength(53);
    expect(initialOrder[0]).toBe("accordion");
    expect(initialOrder[initialOrder.length - 1]).toBe("tooltip");

    initialOrder.forEach((id, index) => {
      const comp = getComponentById(id);
      expect(comp).toBeDefined();
      expect(comp?.defaultIndex).toBe(index);
    });
  });

  it("provides getAlphabeticalOrder returning 53 IDs sorted alphabetically by name", () => {
    const alphaOrder = getAlphabeticalOrder();
    expect(alphaOrder).toHaveLength(53);

    const names = alphaOrder.map((id) => getComponentById(id)!.name);
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  });

  it("retrieves components correctly by id", () => {
    const button = getComponentById("button");
    expect(button).toBeDefined();
    expect(button?.name).toBe("Button");
    expect(button?.category).toBe("Forms");

    const nonExistent = getComponentById("unknown-xyz");
    expect(nonExistent).toBeUndefined();
  });
});
