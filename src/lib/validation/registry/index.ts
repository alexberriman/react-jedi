import { z } from "zod";
import { ComponentSpec } from "../../../types/schema";
import { SchemaRegistry, ComponentExamples, RegistryModule } from "../types/registry.types";
import { uiRegistries } from "./ui";
import { blockRegistries } from "./blocks";

/**
 * Main schema registry singleton
 */
class ComponentSchemaRegistry {
  private schemaCache: SchemaRegistry = new Map();
  private componentExamples: ComponentExamples = new Map();
  private initialized = false;
  
  /**
   * Initialize the registry with all modules
   */
  initialize(): void {
    if (this.initialized) return;
    
    // Combine all registries
    const allRegistries: RegistryModule[] = [
      ...uiRegistries,
      ...blockRegistries,
    ];
    
    // Register all schemas and examples
    for (const registry of allRegistries) {
      registry.registerSchemas(this.schemaCache);
      registry.registerExamples(this.componentExamples);
    }
    
    this.initialized = true;
  }
  
  /**
   * Get a schema by component type
   */
  getSchema(type: string): z.ZodType<ComponentSpec> | undefined {
    this.initialize();
    const entry = this.schemaCache.get(type);
    return entry?.schema;
  }
  
  /**
   * Get examples for a component type
   */
  getExamples(type: string): unknown[] | undefined {
    this.initialize();
    return this.componentExamples.get(type);
  }
  
  /**
   * Get all registered component types
   */
  getAllTypes(): string[] {
    this.initialize();
    return [...this.schemaCache.keys()];
  }
  
  /**
   * Get all component examples
   */
  getAllExamples(): unknown[] {
    this.initialize();
    return [...this.componentExamples.values()].flat();
  }
  
  /**
   * Register a new schema dynamically
   */
  registerSchema(type: string, schema: z.ZodType<ComponentSpec>, examples?: unknown[]): void {
    this.initialize();
    this.schemaCache.set(type, { schema, examples });
    if (examples) {
      this.componentExamples.set(type, examples);
    }
  }
  
  /**
   * Clear the registry (useful for testing)
   */
  clear(): void {
    this.schemaCache.clear();
    this.componentExamples.clear();
    this.initialized = false;
  }
}

// Export singleton instance
export const schemaRegistry = new ComponentSchemaRegistry();

// Export types for external use
export type { SchemaRegistry, ComponentExamples, RegistryModule } from "../types/registry.types";