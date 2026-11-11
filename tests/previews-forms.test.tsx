import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  ButtonPreview,
  ButtonGroupPreview,
  CheckboxPreview,
  SwitchPreview,
  TogglePreview,
  ToggleGroupPreview,
  SliderPreview,
  InputPreview,
  InputGroupPreview,
  InputOtpPreview,
  TextareaPreview,
  LabelPreview,
  FieldPreview,
  ComboboxPreview,
  SelectPreview,
  NativeSelectPreview,
  RadioGroupPreview,
  CalendarPreview,
} from "@/components/previews/forms";

describe("Form & Input Component Previews (18 components)", () => {
  describe("Task 2.1: Basic Form Controls", () => {
    it("renders ButtonPreview with primary and secondary variants", () => {
      const html = renderToString(<ButtonPreview />);
      expect(html).toContain("Action");
    });

    it("renders ButtonGroupPreview with segmented buttons", () => {
      const html = renderToString(<ButtonGroupPreview />);
      expect(html).toContain("Left");
      expect(html).toContain("Right");
    });

    it("renders CheckboxPreview with accessible label", () => {
      const html = renderToString(<CheckboxPreview />);
      expect(html).toContain("Accept terms");
    });

    it("renders SwitchPreview with toggleable switch", () => {
      const html = renderToString(<SwitchPreview />);
      expect(html).toContain("Airplane mode");
    });

    it("renders TogglePreview with icon toggle", () => {
      const html = renderToString(<TogglePreview />);
      expect(html).toContain("aria-label");
    });

    it("renders ToggleGroupPreview with multiple options", () => {
      const html = renderToString(<ToggleGroupPreview />);
      expect(html).toContain("Bold");
      expect(html).toContain("Italic");
    });

    it("renders SliderPreview with range control", () => {
      const html = renderToString(<SliderPreview />);
      expect(html).toContain("role=\"slider\"");
    });
  });

  describe("Task 2.2: Advanced Input & Field Previews", () => {
    it("renders InputPreview with placeholder", () => {
      const html = renderToString(<InputPreview />);
      expect(html).toContain("placeholder");
    });

    it("renders InputGroupPreview with addon icon", () => {
      const html = renderToString(<InputGroupPreview />);
      expect(html).toContain("Search");
    });

    it("renders InputOtpPreview with 4 slots", () => {
      const html = renderToString(<InputOtpPreview />);
      expect(html).toContain("data-otp-slot");
    });

    it("renders TextareaPreview", () => {
      const html = renderToString(<TextareaPreview />);
      expect(html).toContain("<textarea");
    });

    it("renders LabelPreview with htmlFor association", () => {
      const html = renderToString(<LabelPreview />);
      expect(html).toContain("<label");
      expect(html).toContain("Username");
    });

    it("renders FieldPreview with label and helper text", () => {
      const html = renderToString(<FieldPreview />);
      expect(html).toContain("Email address");
      expect(html).toContain("We will never share your email");
    });

    it("renders ComboboxPreview with autocomplete trigger", () => {
      const html = renderToString(<ComboboxPreview />);
      expect(html).toContain("Select framework...");
    });

    it("renders SelectPreview with select trigger", () => {
      const html = renderToString(<SelectPreview />);
      expect(html).toContain("Select a fruit");
    });

    it("renders NativeSelectPreview with styled select element", () => {
      const html = renderToString(<NativeSelectPreview />);
      expect(html).toContain("<select");
    });

    it("renders RadioGroupPreview with radio options", () => {
      const html = renderToString(<RadioGroupPreview />);
      expect(html).toContain("Default");
      expect(html).toContain("Comfortable");
    });

    it("renders CalendarPreview with month header and dates", () => {
      const html = renderToString(<CalendarPreview />);
      expect(html).toContain("November");
    });
  });
});
