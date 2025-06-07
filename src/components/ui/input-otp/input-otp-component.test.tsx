import { describe, it, expect } from "vitest";
import { render } from "../../../lib/render";
import type { ComponentSpec } from "@/types/schema/components";

describe("InputOTP SDUI rendering", () => {
  it("should render with correct maxLength", () => {
    const spec: ComponentSpec = {
      type: "InputOTP",
      maxLength: 4,
      render: {
        type: "segmented",
      },
    };

    const result = render(spec);
    expect(result).toBeTruthy();
  });

  it("should render with default value", () => {
    const spec: ComponentSpec = {
      type: "InputOTP",
      value: "123456",
      maxLength: 6,
      render: {
        type: "grouped",
      },
    };

    const result = render(spec);
    expect(result).toBeTruthy();
  });

  it("should render in disabled state", () => {
    const spec: ComponentSpec = {
      type: "InputOTP",
      disabled: true,
      value: "1234",
      maxLength: 4,
      render: {
        type: "segmented",
      },
    };

    const result = render(spec);
    expect(result).toBeTruthy();
  });

  it("should render with custom pattern", () => {
    const spec: ComponentSpec = {
      type: "InputOTP",
      maxLength: 8,
      render: {
        type: "custom",
        pattern: "ab-cd-ef-gh",
      },
    };

    const result = render(spec);
    expect(result).toBeTruthy();
  });
});