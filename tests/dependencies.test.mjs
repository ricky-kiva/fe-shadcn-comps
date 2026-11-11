import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

test("Task 2.1: package-lock.json exists and is valid", () => {
  const lockPath = path.join(rootDir, "package-lock.json");
  assert.ok(fs.existsSync(lockPath), "package-lock.json must exist");

  const lockContent = JSON.parse(fs.readFileSync(lockPath, "utf-8"));
  assert.ok(lockContent.lockfileVersion >= 2, "lockfileVersion must be at least 2");
  assert.equal(lockContent.name, "fe-shadcn-comps", "lockfile name must match project");
});

test("Task 2.1: node_modules is populated with declared production and dev dependencies", () => {
  const nodeModulesPath = path.join(rootDir, "node_modules");
  assert.ok(fs.existsSync(nodeModulesPath), "node_modules must exist");

  const requiredPackages = [
    "react",
    "react-dom",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
    "lucide-react",
    "@dnd-kit/core",
    "@dnd-kit/sortable",
    "@dnd-kit/utilities",
    "tailwindcss",
    "vite",
    "typescript",
  ];

  for (const pkg of requiredPackages) {
    const pkgDir = path.join(nodeModulesPath, ...pkg.split("/"));
    assert.ok(
      fs.existsSync(pkgDir),
      `Package "${pkg}" must be installed in node_modules`
    );
  }
});
