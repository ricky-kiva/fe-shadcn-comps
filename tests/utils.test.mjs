import test from "node:test";
import assert from "node:assert/strict";

test("cn utility function tests", async () => {
  // Dynamically import the cn utility
  const { cn } = await import("../src/lib/utils.ts");

  assert.equal(typeof cn, "function", "cn must be a function");

  // Basic class joining
  assert.equal(cn("foo", "bar"), "foo bar", "joins multiple string classes");

  // Conditional classes
  assert.equal(
    cn("base", true && "active", false && "inactive", null, undefined),
    "base active",
    "correctly evaluates conditional and nullish classes"
  );

  // Object and array inputs
  assert.equal(
    cn(["item-1", "item-2"], { selected: true, disabled: false }),
    "item-1 item-2 selected",
    "supports arrays and object maps"
  );

  // Tailwind class conflict resolution (twMerge)
  assert.equal(
    cn("px-2 py-1", "p-4"),
    "p-4",
    "tailwind-merge overrides earlier conflicting padding utilities"
  );

  assert.equal(
    cn("text-red-500 bg-white", "text-blue-500"),
    "bg-white text-blue-500",
    "tailwind-merge overrides earlier conflicting text color utilities"
  );
});
