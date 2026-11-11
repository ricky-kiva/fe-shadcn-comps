import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("joins multiple string classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("correctly evaluates conditional and nullish classes", () => {
    expect(
      cn("base", true && "active", false && "inactive", null, undefined)
    ).toBe("base active");
  });

  it("supports arrays and object maps", () => {
    expect(
      cn(["item-1", "item-2"], { selected: true, disabled: false })
    ).toBe("item-1 item-2 selected");
  });

  it("overrides earlier conflicting padding utilities via tailwind-merge", () => {
    expect(cn("px-2 py-1", "p-4")).toBe("p-4");
  });

  it("overrides earlier conflicting text color utilities via tailwind-merge", () => {
    expect(cn("text-red-500 bg-white", "text-blue-500")).toBe(
      "bg-white text-blue-500"
    );
  });
});
