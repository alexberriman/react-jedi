import * as React from "react";
import type { ComponentResolver, ComponentProps } from "@/types/schema/components";
import * as UI from "@/components/ui";

// Type definition for components in our registry
type ComponentType = React.ComponentType<ComponentProps>;

// Helper function to safely cast components to accept our standard ComponentProps
const asComponent = <T extends React.ComponentType<Record<string, unknown>>>(
  component: T
): ComponentType => {
  return component as unknown as ComponentType;
};

/**
 * Default component registry for the core UI components
 *
 * This registry maps component type strings to their React implementations.
 * It provides a centralized place to register all available components.
 * All components are adapted to accept our standard ComponentProps interface.
 */
export const defaultComponentRegistry: Record<string, ComponentType> = {
  // Layout Components
  Box: asComponent(UI.Box),
  Container: asComponent(UI.Container),
  Grid: asComponent(UI.Grid),
  Flex: asComponent(UI.Flex),
  AspectRatio: asComponent(UI.AspectRatio),
  Separator: asComponent(UI.Separator),

  // Typography Components
  Text: asComponent(UI.Text),
  Heading: asComponent(UI.Heading),
  BlockQuote: asComponent(UI.BlockQuote),

  // UI Components
  Button: asComponent(UI.Button),
  Card: asComponent(UI.Card),
  Badge: asComponent(UI.Badge),
  Avatar: asComponent(UI.Avatar),
  Image: asComponent(UI.Image),
  Skeleton: asComponent(UI.Skeleton),
  Label: asComponent(UI.Label),
  Input: asComponent(UI.Input),

  // Form Components
  FormItem: asComponent(UI.FormItem),
  FormLabel: asComponent(UI.FormLabel),
  FormControl: asComponent(UI.FormControl),
  FormDescription: asComponent(UI.FormDescription),
  FormMessage: asComponent(UI.FormMessage),
};

/**
 * Default component resolver that uses the default registry
 *
 * This resolver maps component types to their React implementations
 * using the default component registry.
 *
 * @param type Component type string
 * @returns React component implementation or null if not found
 */
export const defaultComponentResolver: ComponentResolver = (type: string) => {
  return defaultComponentRegistry[type] || null;
};

/**
 * Create a custom component resolver
 *
 * This function creates a custom component resolver that combines
 * custom component mappings with the default registry.
 * All components are adapted to accept our standard ComponentProps interface.
 *
 * @param customComponents Additional component mappings to include
 * @returns Custom component resolver function
 */
export function createCustomResolver(
  customComponents: Record<string, ComponentType>
): ComponentResolver {
  return (type: string) => {
    return customComponents[type] || defaultComponentRegistry[type] || null;
  };
}
