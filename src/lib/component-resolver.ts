import * as React from "react";
import type { ComponentResolver } from "@/types/schema/components";
import * as UI from "@/components/ui";

/**
 * Default component registry for the core UI components
 * 
 * This registry maps component type strings to their React implementations.
 * It provides a centralized place to register all available components.
 */
export const defaultComponentRegistry: Record<string, React.ComponentType<any>> = {
  // Layout Components
  Box: UI.Box,
  Container: UI.Container,
  Grid: UI.Grid, 
  Flex: UI.Flex,
  AspectRatio: UI.AspectRatio,
  Separator: UI.Separator,

  // Typography Components
  Text: UI.Text,
  Heading: UI.Heading,
  BlockQuote: UI.BlockQuote,

  // UI Components
  Button: UI.Button,
  Card: UI.Card,
  Badge: UI.Badge,
  Avatar: UI.Avatar,
  Image: UI.Image,
  Skeleton: UI.Skeleton,
  Label: UI.Label,
  Input: UI.Input,
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
 * 
 * @param customComponents Additional component mappings to include
 * @returns Custom component resolver function
 */
export function createCustomResolver(
  customComponents: Record<string, React.ComponentType<any>>
): ComponentResolver {
  return (type: string) => {
    return customComponents[type] || defaultComponentRegistry[type] || null;
  };
}