# React Jedi JSON Schemas

This directory contains JSON Schema definitions for React Jedi components. These schemas provide standardized validation for component specifications and can be used by external tools, IDEs, and validation libraries.

## Available Schemas

### Layout Components

- **`grid.schema.json`** - Grid layout component with responsive columns and gaps
- **`stack.schema.json`** - Stack layout component for vertical or horizontal stacking

### Interactive Components

- **`toggle.schema.json`** - Toggle button component with pressed state
- **`tabs.schema.json`** - Tabs component with TabsList, TabsTrigger, and TabsContent
- **`dialog.schema.json`** - Dialog/Modal component with full accessibility support

## Usage

### With JSON Schema Validators

```javascript
import Ajv from 'ajv';
import gridSchema from './schemas/grid.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(gridSchema);

const gridSpec = {
  type: "Grid",
  columns: { base: 1, md: 2, lg: 3 },
  gap: 4,
  children: [/* ... */]
};

if (validate(gridSpec)) {
  console.log('Valid grid specification');
} else {
  console.log('Invalid:', validate.errors);
}
```

### In VS Code

Add to your workspace settings to get IntelliSense:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["*.grid.json"],
      "url": "./schemas/grid.schema.json"
    },
    {
      "fileMatch": ["*.stack.json"],
      "url": "./schemas/stack.schema.json"
    }
  ]
}
```

### Schema Structure

All schemas follow a consistent structure:

- `$schema` - JSON Schema version
- `$id` - Unique identifier for the schema
- `title` - Human-readable title
- `description` - Detailed description
- `type` - Always "object" for components
- `required` - Required properties (always includes "type")
- `properties` - Component-specific properties
- `additionalProperties` - Set to false for strict validation

### Common Properties

All components support these base properties:

- `type` (required) - Component type identifier
- `className` - Additional CSS classes
- `id` - HTML id attribute
- `style` - Inline styles object
- `children` - Child components or content

### Event Handlers

Event handlers follow a consistent pattern:

```json
{
  "onEventName": {
    "type": "object",
    "required": ["action"],
    "properties": {
      "action": {
        "type": "string",
        "description": "Action identifier"
      },
      "payload": {
        "type": "object",
        "description": "Additional event data",
        "additionalProperties": true
      }
    }
  }
}
```

### Responsive Values

Many properties support responsive values:

```json
{
  "columns": {
    "oneOf": [
      { "type": "number" },
      {
        "type": "object",
        "properties": {
          "base": { "type": "number" },
          "sm": { "type": "number" },
          "md": { "type": "number" },
          "lg": { "type": "number" },
          "xl": { "type": "number" },
          "2xl": { "type": "number" }
        }
      }
    ]
  }
}
```

## Contributing

When adding new schemas:

1. Follow the existing naming convention: `component-name.schema.json`
2. Include all required metadata ($schema, $id, title, description)
3. Set `additionalProperties: false` for strict validation
4. Document all properties with descriptions
5. Add examples to this README
6. Consider creating TypeScript types from the schema

## TypeScript Integration

These JSON schemas correspond to the Zod schemas in the codebase. The Zod schemas are the source of truth, and these JSON schemas provide a standard format for external tools.

To generate TypeScript types from JSON schemas:

```bash
npx json-schema-to-typescript schemas/*.schema.json --out types/
```

## Validation Tools

- [AJV](https://ajv.js.org/) - Fast JSON Schema validator
- [JSON Schema Validator](https://www.jsonschemavalidator.net/) - Online validator
- [VS Code JSON Schema Support](https://code.visualstudio.com/docs/languages/json#_json-schemas-and-settings) - IDE integration