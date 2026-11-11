import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  GalleryProvider,
  useGallery,
  CUSTOM_ORDER_STORAGE_KEY,
  COMPONENT_FILTER_STORAGE_KEY,
  type GalleryContextValue,
} from "@/context/GalleryContext";
import { getInitialOrder } from "@/data/components";

describe("GalleryContext", () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};

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

    vi.stubGlobal("window", {
      localStorage: storageMock,
    });
  });

  it("throws error when useGallery is called outside GalleryProvider", () => {
    function Consumer() {
      useGallery();
      return null;
    }

    expect(() => renderToString(<Consumer />)).toThrow(
      "useGallery must be used within a GalleryProvider"
    );
  });

  it("provides default gallery values including customOrder and empty filter", () => {
    let capturedValues: GalleryContextValue | null = null;

    function Consumer() {
      capturedValues = useGallery();
      return null;
    }

    renderToString(
      <GalleryProvider>
        <Consumer />
      </GalleryProvider>
    );

    expect(capturedValues).not.toBeNull();
    expect(capturedValues!.sortMode).toBe("alphabetical");
    expect(capturedValues!.searchQuery).toBe("");
    expect(capturedValues!.selectedComponents).toEqual([]);
    expect(capturedValues!.customOrder).toEqual(getInitialOrder());
  });

  it("initializes customOrder and selectedComponents from localStorage if present", () => {
    const mockOrder = ["button", "card", "accordion"];
    const mockFilter = ["Button", "Card"];

    mockStorage[CUSTOM_ORDER_STORAGE_KEY] = JSON.stringify(mockOrder);
    mockStorage[COMPONENT_FILTER_STORAGE_KEY] = JSON.stringify(mockFilter);

    let capturedValues: GalleryContextValue | null = null;
    function Consumer() {
      capturedValues = useGallery();
      return null;
    }

    renderToString(
      <GalleryProvider>
        <Consumer />
      </GalleryProvider>
    );

    expect(capturedValues!.customOrder).toEqual(mockOrder);
    expect(capturedValues!.selectedComponents).toEqual(mockFilter);
  });

  it("reorders components and persists to localStorage", () => {
    let hookValues!: GalleryContextValue;

    function Consumer() {
      hookValues = useGallery();
      return null;
    }

    renderToString(
      <GalleryProvider>
        <Consumer />
      </GalleryProvider>
    );

    hookValues.reorderComponents("accordion", "alert");
    expect(mockStorage[CUSTOM_ORDER_STORAGE_KEY]).toBeDefined();
    const stored = JSON.parse(mockStorage[CUSTOM_ORDER_STORAGE_KEY]);
    expect(stored[0]).toBe("alert");
    expect(stored[1]).toBe("accordion");
  });

  it("persists filter selections when toggling component filters", () => {
    let hookValues!: GalleryContextValue;

    function Consumer() {
      hookValues = useGallery();
      return null;
    }

    renderToString(
      <GalleryProvider>
        <Consumer />
      </GalleryProvider>
    );

    hookValues.toggleComponentFilter("Button");
    expect(mockStorage[COMPONENT_FILTER_STORAGE_KEY]).toBeDefined();
    const stored = JSON.parse(mockStorage[COMPONENT_FILTER_STORAGE_KEY]);
    expect(stored).toContain("Button");
  });

  it("resets order and resets filter clearing localStorage", () => {
    mockStorage[CUSTOM_ORDER_STORAGE_KEY] = JSON.stringify(["custom-1"]);
    mockStorage[COMPONENT_FILTER_STORAGE_KEY] = JSON.stringify(["Button"]);

    let hookValues!: GalleryContextValue;

    function Consumer() {
      hookValues = useGallery();
      return null;
    }

    renderToString(
      <GalleryProvider>
        <Consumer />
      </GalleryProvider>
    );

    hookValues.resetOrder();
    expect(mockStorage[CUSTOM_ORDER_STORAGE_KEY]).toBeUndefined();

    hookValues.resetFilter();
    expect(mockStorage[COMPONENT_FILTER_STORAGE_KEY]).toBeUndefined();
  });
});
