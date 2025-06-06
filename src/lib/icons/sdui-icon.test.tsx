import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { IconProps } from "./icon-registry";
import { SDUIIcon, isIconReference, transformIconReference } from "./sdui-icon";
import { iconRegistry } from "./icon-registry";

describe("SDUIIcon", () => {
  beforeEach(() => {
    iconRegistry.clear();
  });

  it("should render an icon from the registry", () => {
    const MockIcon = ({ size, color, className }: IconProps) => (
      <svg width={size} height={size} className={className as string} fill={color}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
    
    iconRegistry.register("test-icon", MockIcon);
    
    const { container } = render(
      <SDUIIcon name="test-icon" size={24} color="blue" className="custom-class" />
    );
    
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("width")).toBe("24");
    expect(svg?.getAttribute("fill")).toBe("blue");
    expect(svg?.classList.contains("custom-class")).toBe(true);
    expect(svg?.classList.contains("sdui-icon")).toBe(true);
  });

  it("should use default values from registry entry", () => {
    const MockIcon = ({ size, strokeWidth, ...props }: IconProps) => (
      <svg width={size} strokeWidth={strokeWidth} data-testid="mock-icon" {...props} />
    );
    
    iconRegistry.register("test-icon", {
      component: MockIcon,
      defaultSize: 32,
      defaultStrokeWidth: 3,
    });
    
    render(<SDUIIcon name="test-icon" />);
    const svg = screen.getByTestId("mock-icon");
    
    expect(svg.getAttribute("width")).toBe("32");
    expect(svg.getAttribute("stroke-width")).toBe("3");
  });

  it("should render placeholder for missing icon in development", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    
    const { container } = render(<SDUIIcon name="missing-icon" />);
    const placeholder = container.querySelector("span");
    
    expect(placeholder).toBeTruthy();
    expect(placeholder?.textContent).toBe("missing-icon");
    expect(placeholder?.classList.contains("border-red-500")).toBe(true);
    
    process.env.NODE_ENV = originalEnv;
  });

  it("should return null for missing icon in production", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    
    const { container } = render(<SDUIIcon name="missing-icon" />);
    expect(container.firstChild).toBeNull();
    
    process.env.NODE_ENV = originalEnv;
  });

  it("should apply aria-label when provided", () => {
    const MockIcon = (props: IconProps) => <svg data-testid="icon" {...props} />;
    iconRegistry.register("test-icon", MockIcon);
    
    render(
      <SDUIIcon name="test-icon" ariaLabel="Test Icon" />
    );
    
    const svg = screen.getByTestId("icon");
    expect(svg.getAttribute("aria-label")).toBe("Test Icon");
    expect(svg.getAttribute("aria-hidden")).toBe("false");
  });

  it("should set aria-hidden when no aria-label", () => {
    const MockIcon = (props: IconProps) => <svg data-testid="icon" {...props} />;
    iconRegistry.register("test-icon", MockIcon);
    
    render(<SDUIIcon name="test-icon" />);
    
    const svg = screen.getByTestId("icon");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("isIconReference", () => {
  it("should identify valid icon references", () => {
    expect(isIconReference({ type: "Icon", name: "test" })).toBe(true);
    expect(isIconReference({ type: "Icon", name: "test", size: 24 })).toBe(true);
  });

  it("should reject invalid icon references", () => {
    expect(isIconReference(null)).toBe(false);
    expect(isIconReference(undefined)).toBe(false);
    expect(isIconReference("string")).toBe(false);
    expect(isIconReference({ type: "Button", name: "test" })).toBe(false);
    expect(isIconReference({ type: "Icon" })).toBe(false);
    expect(isIconReference({ name: "test" })).toBe(false);
  });
});

describe("transformIconReference", () => {
  beforeEach(() => {
    iconRegistry.clear();
  });

  it("should transform valid icon reference to SDUIIcon element", () => {
    const MockIcon = () => <svg data-testid="icon" />;
    iconRegistry.register("test-icon", MockIcon);
    
    const spec = { type: "Icon", name: "test-icon", size: 24 };
    const element = transformIconReference(spec);
    
    expect(element).toBeTruthy();
    expect(element?.type).toBe(SDUIIcon);
    expect(element?.props.name).toBe("test-icon");
    expect(element?.props.size).toBe(24);
  });

  it("should return null for non-icon specs", () => {
    expect(transformIconReference({ type: "Button", name: "test" })).toBeNull();
    expect(transformIconReference(null)).toBeNull();
    expect(transformIconReference("string")).toBeNull();
  });
});