import * as React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import type { IconComponent } from "./icon-registry";
import { iconRegistry } from "./icon-registry";

const mockIcon: IconComponent = () => null as unknown as React.ReactElement;
const icon1: IconComponent = () => null as unknown as React.ReactElement;
const icon2: IconComponent = () => null as unknown as React.ReactElement;
const icon3: IconComponent = () => null as unknown as React.ReactElement;

describe("IconRegistry", () => {
  beforeEach(() => {
    // Clear registry before each test
    iconRegistry.clear();
  });

  it("should register an icon component", () => {
    iconRegistry.register("test-icon", mockIcon);

    expect(iconRegistry.has("test-icon")).toBe(true);
    expect(iconRegistry.get("test-icon")).toEqual({ component: mockIcon });
  });

  it("should register an icon with full entry", () => {
    const entry = {
      component: mockIcon,
      defaultSize: 24,
      defaultColor: "red",
      defaultStrokeWidth: 2,
    };
    iconRegistry.register("test-icon", entry);

    expect(iconRegistry.get("test-icon")).toEqual(entry);
  });

  it("should register multiple icons", () => {
    iconRegistry.registerMultiple({
      "icon-1": icon1,
      "icon-2": { component: icon2, defaultSize: 32 },
      "icon-3": icon3,
    });

    expect(iconRegistry.has("icon-1")).toBe(true);
    expect(iconRegistry.has("icon-2")).toBe(true);
    expect(iconRegistry.has("icon-3")).toBe(true);
    expect(iconRegistry.get("icon-2")?.defaultSize).toBe(32);
  });

  it("should throw error when registering with invalid parameters", () => {
    expect(() => iconRegistry.register("", mockIcon)).toThrow(
      "Icon name and component are required"
    );
    expect(() => iconRegistry.register("test", null as unknown as IconComponent)).toThrow(
      "Icon name and component are required"
    );
  });

  it("should return all registered icon names", () => {
    iconRegistry.registerMultiple({
      alpha: () => null,
      beta: () => null,
      gamma: () => null,
    });

    const names = iconRegistry.getNames();
    expect(names).toHaveLength(3);
    expect(names).toContain("alpha");
    expect(names).toContain("beta");
    expect(names).toContain("gamma");
  });

  it("should remove a specific icon", () => {
    iconRegistry.register("removable", () => null);
    expect(iconRegistry.has("removable")).toBe(true);

    const removed = iconRegistry.remove("removable");
    expect(removed).toBe(true);
    expect(iconRegistry.has("removable")).toBe(false);
  });

  it("should clear all icons", () => {
    iconRegistry.registerMultiple({
      icon1: () => null,
      icon2: () => null,
      icon3: () => null,
    });
    expect(iconRegistry.getNames()).toHaveLength(3);

    iconRegistry.clear();
    expect(iconRegistry.getNames()).toHaveLength(0);
  });
});