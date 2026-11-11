import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { GalleryProvider, useGallery } from "@/context/GalleryContext";

describe("GalleryContext", () => {
  it("throws error when useGallery is called outside GalleryProvider", () => {
    function Consumer() {
      useGallery();
      return null;
    }

    expect(() => renderToString(<Consumer />)).toThrow(
      "useGallery must be used within a GalleryProvider"
    );
  });

  it("provides default gallery values inside GalleryProvider", () => {
    let capturedSort = "";
    let capturedQuery = "";
    let capturedSelected: string[] = ["initial"];

    function Consumer() {
      const { sortMode, searchQuery, selectedComponents } = useGallery();
      capturedSort = sortMode;
      capturedQuery = searchQuery;
      capturedSelected = selectedComponents;
      return null;
    }

    renderToString(
      <GalleryProvider>
        <Consumer />
      </GalleryProvider>
    );

    expect(capturedSort).toBe("alphabetical");
    expect(capturedQuery).toBe("");
    expect(capturedSelected).toEqual([]);
  });
});
