import { z } from "zod";
import { ComponentSpec } from "../../../types/schema";

/**
 * Schema registry entry containing the schema and examples
 */
export interface SchemaRegistryEntry {
  schema: z.ZodType<ComponentSpec>;
  examples?: unknown[];
}

/**
 * Schema registry map
 */
export type SchemaRegistry = Map<string, SchemaRegistryEntry>;

/**
 * Component examples map
 */
export type ComponentExamples = Map<string, unknown[]>;

/**
 * Registry module interface - each registry module must implement this
 */
export interface RegistryModule {
  /**
   * Register all schemas in this module
   * @param registry The schema registry to populate
   */
  registerSchemas(registry: SchemaRegistry): void;
  
  /**
   * Register all examples in this module
   * @param examples The examples map to populate
   */
  registerExamples(examples: ComponentExamples): void;
}

/**
 * Registry configuration
 */
export interface RegistryConfig {
  /**
   * Whether to lazy load registries
   */
  lazyLoad?: boolean;
  
  /**
   * Registry modules to load
   */
  modules?: RegistryModule[];
}