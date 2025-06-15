# Schema Registry System

The schema registry system provides a scalable, modular approach to managing component schemas and examples.

## Directory Structure

```
registry/
├── index.ts           # Main registry singleton
├── ui/               # UI component registries
│   ├── form-components.ts    # Form-related components
│   ├── layout-components.ts  # Layout components
│   └── display-components.ts # Display components
└── blocks/           # Block component registries
    └── content-blocks.ts     # Content block components
```

## Adding a New Component Schema

### 1. Create the Schema File

First, create a schema file in the component directory:

```typescript
// src/components/ui/my-component/my-component.schema.ts
import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const myComponentSchema = baseComponentSchema.extend({
  type: z.literal("MyComponent"),
  // Add component-specific props here
});
```

### 2. Add to Appropriate Registry

Locate the appropriate registry file based on component type:
- **Form components**: `registry/ui/form-components.ts`
- **Layout components**: `registry/ui/layout-components.ts`
- **Display components**: `registry/ui/display-components.ts`
- **Block components**: `registry/blocks/content-blocks.ts`

Import the schema and register it:

```typescript
import { myComponentSchema } from "../../../../components/ui/my-component/my-component.schema";

export const formComponentsRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // ... existing registrations
    
    // Add your component
    registry.set("MyComponent", { schema: myComponentSchema });
  },
  
  registerExamples(examples: ComponentExamples): void {
    // ... existing examples
    
    // Add examples for your component
    examples.set("MyComponent", [
      {
        type: "MyComponent",
        // Example properties
      }
    ]);
  }
};
```

## Creating a New Registry Module

For a new category of components:

1. Create a new registry file:

```typescript
// registry/ui/new-category.ts
import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";

export const newCategoryRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // Register schemas here
  },
  
  registerExamples(examples: ComponentExamples): void {
    // Register examples here
  }
};
```

2. Add to the appropriate index file:

```typescript
// registry/ui/index.ts
import { newCategoryRegistry } from "./new-category";

export const uiRegistries: RegistryModule[] = [
  // ... existing registries
  newCategoryRegistry,
];
```

## Usage

The registry is automatically initialized when needed:

```typescript
import { ComponentValidator } from "@/lib/validation/component-validator";

// Validate a component
const result = ComponentValidator.validateComponent(spec);

// Get all component types
const types = ComponentValidator.getAllComponentTypes();

// Get examples for a component
const examples = ComponentValidator.getComponentExamples("Button");
```

## Benefits

1. **Modular Organization**: Components are grouped logically
2. **Scalability**: Easy to add new components without modifying large files
3. **Type Safety**: Full TypeScript support throughout
4. **Performance**: Registry is lazy-initialized on first use
5. **Maintainability**: Each registry file stays focused and manageable