import { describe, it, expect, beforeEach } from "vitest";
import { render as testRender, screen } from "@testing-library/react";
import { render } from "../../../lib/render";
import { iconRegistry } from "../../../lib/icons";
import type { IconProps } from "../../../lib/icons";

describe("Button with Icon in SDUI", () => {
  beforeEach(() => {
    iconRegistry.clear();
    // Register test icons
    const TestIcon: React.ComponentType<IconProps> = ({ size = 24, className = "" }) => (
      <svg
        data-testid="test-icon"
        width={size}
        height={size}
        className={className as string}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
    iconRegistry.register("test", TestIcon);
    iconRegistry.register("loader", TestIcon);
    iconRegistry.register("chevron-right", TestIcon);
  });

  it("should render button with icon on the left", () => {
    const spec = {
      type: "Button",
      children: [
        {
          type: "Icon",
          name: "test",
          size: 16
        },
        "Click me"
      ]
    };

    const element = render(spec);
    if (!element) throw new Error("Failed to render");
    testRender(element);
    
    const button = screen.getByRole("button", { name: /Click me/ });
    expect(button).toBeInTheDocument();
    
    const icon = screen.getByTestId("test-icon");
    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute("width")).toBe("16");
    
    // Check order - icon should come before text
    const buttonContent = button.textContent;
    expect(buttonContent).toBe("Click me");
  });

  it("should render button with icon on the right", () => {
    const spec = {
      type: "Button",
      children: [
        "Next",
        {
          type: "Icon",
          name: "chevron-right",
          size: 16
        }
      ]
    };

    const element = render(spec);
    if (!element) throw new Error("Failed to render");
    testRender(element);
    
    const button = screen.getByRole("button", { name: /Next/ });
    expect(button).toBeInTheDocument();
    
    const icon = screen.getByTestId("test-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should render icon-only button", () => {
    const spec = {
      type: "Button",
      size: "icon",
      "aria-label": "Settings",
      children: {
        type: "Icon",
        name: "test"
      }
    };

    const element = render(spec);
    if (!element) throw new Error("Failed to render");
    testRender(element);
    
    const button = screen.getByRole("button", { name: "Settings" });
    expect(button).toBeInTheDocument();
    
    const icon = screen.getByTestId("test-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should render loading button with animated icon", () => {
    const spec = {
      type: "Button",
      disabled: true,
      children: [
        {
          type: "Icon",
          name: "loader",
          size: 16,
          className: "animate-spin"
        },
        "Processing..."
      ]
    };

    const element = render(spec);
    if (!element) throw new Error("Failed to render");
    testRender(element);
    
    const button = screen.getByRole("button", { name: /Processing/ });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    
    const icon = screen.getByTestId("test-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("animate-spin");
  });

  it("should handle missing icon gracefully in development", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    
    const spec = {
      type: "Button",
      children: [
        {
          type: "Icon",
          name: "non-existent-icon"
        },
        "Click me"
      ]
    };

    const element = render(spec);
    if (!element) throw new Error("Failed to render");
    const { container } = testRender(element);
    
    const button = screen.getByRole("button", { name: /Click me/ });
    expect(button).toBeInTheDocument();
    
    // In development, should show placeholder
    const placeholder = container.querySelector(".border-red-500");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder?.textContent).toBe("non-existent-icon");
    
    process.env.NODE_ENV = originalEnv;
  });
});