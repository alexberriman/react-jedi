import * as React from "react";
import type { ComponentType } from "react";

export interface IconProps {
  size?: string | number;
  color?: string;
  className?: string;
  strokeWidth?: string | number;
}

export type IconComponent = (props: IconProps) => React.ReactElement;

export interface IconRegistryEntry {
  component: IconComponent | ComponentType<IconProps>;
  defaultSize?: string | number;
  defaultColor?: string;
  defaultStrokeWidth?: string | number;
}

/**
 * Global icon registry for SDUI
 * Maps icon names to their React components
 */
class IconRegistry {
  private icons: Map<string, IconRegistryEntry> = new Map();

  /**
   * Register an icon component
   * @param name - The name to reference the icon by in SDUI
   * @param icon - The icon component or registry entry
   */
  register(name: string, icon: IconComponent | ComponentType<IconProps> | IconRegistryEntry): void {
    if (!name || !icon) {
      throw new Error("Icon name and component are required");
    }

    const entry: IconRegistryEntry = 
      typeof icon === "function" 
        ? { component: icon }
        : icon;

    this.icons.set(name, entry);
  }

  /**
   * Register multiple icons at once
   * @param icons - Object mapping icon names to components
   */
  registerMultiple(icons: Record<string, IconComponent | ComponentType<IconProps> | IconRegistryEntry>): void {
    for (const [name, icon] of Object.entries(icons)) {
      this.register(name, icon);
    }
  }

  /**
   * Get an icon component by name
   * @param name - The icon name
   * @returns The icon registry entry or undefined
   */
  get(name: string): IconRegistryEntry | undefined {
    return this.icons.get(name);
  }

  /**
   * Check if an icon is registered
   * @param name - The icon name
   * @returns True if the icon is registered
   */
  has(name: string): boolean {
    return this.icons.has(name);
  }

  /**
   * Get all registered icon names
   * @returns Array of icon names
   */
  getNames(): string[] {
    return [...this.icons.keys()];
  }

  /**
   * Clear all registered icons
   */
  clear(): void {
    this.icons.clear();
  }

  /**
   * Remove a specific icon
   * @param name - The icon name to remove
   */
  remove(name: string): boolean {
    return this.icons.delete(name);
  }
}

// Global singleton instance
export const iconRegistry = new IconRegistry();

/**
 * Helper function to register icons from an icon library
 * @param icons - Object from an icon library (e.g., lucide-react)
 * @param prefix - Optional prefix to add to icon names
 */
export function registerIconLibrary(
  icons: Record<string, ComponentType<IconProps>>,
  prefix?: string
): void {
  for (const [name, component] of Object.entries(icons)) {
    // Skip non-component exports
    if (typeof component !== "function") continue;
    
    const iconName = prefix ? `${prefix}:${name}` : name;
    iconRegistry.register(iconName, component);
  }
}