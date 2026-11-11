import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ThemeProvider, useTheme, THEME_STORAGE_KEY } from "@/context/ThemeContext";

describe("ThemeContext", () => {
  let mockStorage: Record<string, string> = {};
  let rootClasses: Set<string> = new Set();

  beforeEach(() => {
    mockStorage = {};
    rootClasses = new Set();

    const storageMock = {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    };

    const rootMock = {
      classList: {
        add: (cls: string) => rootClasses.add(cls),
        remove: (cls: string) => rootClasses.delete(cls),
        contains: (cls: string) => rootClasses.has(cls),
      },
    };

    vi.stubGlobal("window", {
      localStorage: storageMock,
      document: { documentElement: rootMock },
    });
  });

  it("throws error when useTheme is called outside ThemeProvider", () => {
    function Consumer() {
      useTheme();
      return null;
    }

    expect(() => renderToString(<Consumer />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
  });

  it("provides theme context to consumers within ThemeProvider", () => {
    let capturedTheme = "";
    function Consumer() {
      const { theme } = useTheme();
      capturedTheme = theme;
      return <div>{theme}</div>;
    }

    renderToString(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );

    expect(capturedTheme).toBe("dark");
  });

  it("exports correct storage key", () => {
    expect(THEME_STORAGE_KEY).toBe("shadcn_explorer_theme");
  });
});
