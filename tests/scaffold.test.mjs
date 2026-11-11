import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

test("Task 1.1: package.json structure and required scripts", () => {
  const pkgPath = path.join(rootDir, "package.json");
  assert.ok(fs.existsSync(pkgPath), "package.json must exist");

  const pkgContent = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  assert.equal(pkgContent.type, "module", 'package.json must have "type": "module"');
  assert.ok(pkgContent.scripts, "package.json must have scripts defined");

  const requiredScripts = ["dev", "build", "preview", "lint", "tsc"];
  for (const script of requiredScripts) {
    assert.ok(pkgContent.scripts[script], `package.json must have script "${script}"`);
  }
});

test("Task 1.2: TypeScript and Vite configuration with @/ path alias", () => {
  const vitePath = path.join(rootDir, "vite.config.ts");
  assert.ok(fs.existsSync(vitePath), "vite.config.ts must exist");

  const viteContent = fs.readFileSync(vitePath, "utf-8");
  assert.match(viteContent, /@vitejs\/plugin-react/, "vite.config.ts must import React plugin");
  assert.match(viteContent, /resolve:\s*\{\s*alias:\s*\{/, "vite.config.ts must configure resolve.alias");
  assert.match(viteContent, /["']@["']:\s*path\.resolve\(__dirname,\s*["']\.\/src["']\)/, "vite.config.ts must alias @ to ./src");

  const tsconfigPath = path.join(rootDir, "tsconfig.json");
  assert.ok(fs.existsSync(tsconfigPath), "tsconfig.json must exist");

  const tsconfigContent = fs.readFileSync(tsconfigPath, "utf-8");
  assert.ok(tsconfigContent.includes("@/*"), "tsconfig must configure @/* path alias");
});
