# React Jedi Validation System

This document describes the validation approach for the React Jedi library, which provides comprehensive schema validation for component specifications with detailed error messages.

## Overview

The validation system uses [Zod](https://github.com/colinhacks/zod) for schema validation and provides rich, user-friendly error messages to help developers quickly identify and fix issues in their component specifications.

## Key Features

- **Comprehensive Type Validation**: Validates all properties against expected types and constraints
- **Detailed Error Messages**: Provides context-aware error messages with specific details
- **Component-Specific Context**: Includes component type and property information in error messages
- **Valid Examples**: Shows examples of valid values for properties that fail validation
- **Documentation Links**: Includes links to relevant documentation for each error
- **Validation Reports**: Generates detailed validation reports for complex component trees
- **Functional Error Handling**: Uses `Result<T, E>` pattern for type-safe error handling

## Architecture

The validation system consists of three main modules:

1. **Validator**: Core validation functionality for generic Zod schemas
2. **ComponentValidator**: Component-specific validation with enhanced error reporting
3. **JSONSchemaConverter**: Converts Zod schemas to JSON Schema format for documentation

### Validation Process

The validation process follows these steps:

1. Component specifications are passed to `ComponentValidator.validateComponent()`
2. The validator identifies the component type and retrieves the appropriate schema
3. The schema is used to validate the specification using Zod
4. Validation errors are enhanced with component-specific context
5. A Result object is returned containing either the validated specification or detailed errors

### Error Handling

Errors are handled using the functional `Result<T, E>` pattern from the `ts-results` library:

- `Ok(value)`: Represents successful validation with the validated value
- `Err(errors)`: Represents validation failure with detailed error information

This approach provides type safety and encourages proper error handling throughout the application.

## Error Details

Each validation error includes:

- **Path**: The path to the property that failed validation
- **Message**: A user-friendly error message
- **Code**: A machine-readable error code
- **Severity**: Error severity level (ERROR, WARNING, INFO)
- **InvalidValue**: The value that caused the validation error
- **ValidExamples**: Examples of valid values for the property
- **Documentation**: URL to relevant documentation
- **Component Context**: Component type and other relevant context

## Component Tree Validation

For component trees, the validation system recursively validates all nested components, providing a complete validation report with proper error paths that indicate the location of each error in the component tree.

## Usage Examples

### Basic Component Validation

```typescript
import { ComponentValidator } from "./lib/validation";

const result = ComponentValidator.validateComponent({
  type: "heading",
  level: "h1",
  content: "Hello World"
});

if (result.ok) {
  // Use the validated component specification
  const validSpec = result.val;
  console.log(`Valid ${validSpec.type} component`);
} else {
  // Handle validation errors
  const errors = result.val;
  console.error(ComponentValidator.formatComponentErrorsToString(errors));
}
```

### Component Tree Validation

```typescript
import { ComponentValidator } from "./lib/validation";

const result = ComponentValidator.validateComponentTree({
  type: "container",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Hello World"
    },
    {
      type: "text",
      text: "Welcome to our application"
    }
  ]
});

if (result.ok) {
  // Use the validated component tree
  const validTree = result.val;
  console.log("Valid component tree");
} else {
  // Generate a detailed validation report
  const errors = result.val;
  const report = ComponentValidator.createValidationErrorReport(errors);
  console.error(report);
}
```

## Error Message Format

Error messages are formatted to be human-readable and include:

1. Component type context
2. Property path
3. Detailed error message
4. Valid value examples
5. Documentation links

Example:

```
[heading] at 'level': Invalid enum value. Expected one of: "h1", "h2", "h3", "h4", "h5", "h6"
Valid values: "h1", "h2", "h3", "h4", "h5", "h6"
Component example: {
  "type": "heading",
  "level": "h1",
  "content": "Welcome to Our Platform",
  "align": "center",
  "weight": "extrabold"
}
Documentation: https://react-jedi.org/docs/components/heading
```

## Extending the Validation System

### Adding New Component Schemas

To add validation for a new component type:

1. Create a Zod schema for the component
2. Register the schema with ComponentValidator
3. Optionally provide examples for error messages

```typescript
import { z } from "zod";
import { ComponentValidator } from "./lib/validation";

// Define the schema
const tooltipSchema = z.object({
  type: z.literal("tooltip"),
  content: z.string(),
  position: z.enum(["top", "right", "bottom", "left"]).optional(),
  // ... other properties
});

// Register with examples
ComponentValidator.registerSchema("tooltip", tooltipSchema, [
  {
    type: "tooltip",
    content: "This is a tooltip",
    position: "top"
  }
]);
```

### Custom Validation Rules

For more complex validation rules that cannot be expressed with Zod's built-in validators, use `refinement`:

```typescript
const schema = z.object({
  startDate: z.date(),
  endDate: z.date()
}).refine(
  data => data.startDate < data.endDate,
  {
    message: "End date must be after start date",
    path: ["endDate"]
  }
);
```

## Best Practices

1. **Provide Meaningful Defaults**: Use `.default()` in Zod schemas to provide sensible defaults
2. **Descriptive Error Messages**: Customize error messages to be clear and actionable
3. **Include Examples**: Register examples for all component types
4. **Validate Early**: Validate specifications as early as possible in the rendering pipeline
5. **Handle Errors Gracefully**: Always handle validation errors with appropriate fallback UI
6. **Report Errors Clearly**: Use the formatting utilities to present validation errors clearly to developers

## Future Improvements

- Schema evolution and versioning
- Interactive validation error UI for development environments
- Visual validation error overlay for component previews
- Schema documentation generation based on Zod schemas
- Runtime performance optimizations for validation