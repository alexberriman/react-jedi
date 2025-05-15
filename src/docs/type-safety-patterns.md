# Type Safety Patterns

This document outlines the type safety patterns and utilities available in the React Jedi library for ensuring robust, type-safe code.

## Table of Contents

1. [Result Type](#result-type)
2. [Type Guards](#type-guards)
3. [Object Safety](#object-safety)
4. [Component Type Helpers](#component-type-helpers)
5. [Tailwind Type Helpers](#tailwind-type-helpers)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

## Result Type

The `Result<T, E>` type provides a functional approach to error handling, inspired by Rust and other functional languages. It represents either a successful operation with a value (`Ok<T>`) or a failed operation with an error (`Err<E>`).

```typescript
import { ok, err, Result } from "@banja/react-jedi";

// Success case
function divide(a: number, b: number): Result<number, Error> {
  if (b === 0) {
    return err(new Error("Division by zero"));
  }
  return ok(a / b);
}

// Usage
const result = divide(10, 2);

if (result.isOk) {
  console.log(`Result: ${result.value}`);
} else {
  console.error(`Error: ${result.error.message}`);
}

// Chainable operations
const chainedResult = divide(10, 2)
  .map(value => value * 2)
  .andThen(value => (value > 10 ? ok(value) : err(new Error("Value too small"))));
```

Key benefits:
- Forces explicit error handling
- No try/catch blocks or exceptions
- Chainable operations with `.map()`, `.mapErr()`, and `.andThen()`
- Clear distinction between success and failure paths

## Type Guards

Type guards help safely narrow down types in TypeScript, particularly for handling unknown data from external sources.

```typescript
import {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  isArrayOf,
  isOfType,
  hasProperty,
  hasPropertyOfType
} from "@banja/react-jedi";

// Basic type guards
if (isString(value)) {
  // value is now typed as string
}

// Complex type guards
if (isArrayOf(value, isNumber)) {
  // value is now typed as number[]
}

// Property checks
if (hasProperty(object, "id")) {
  // object.id is now accessible
}

if (hasPropertyOfType(object, "age", isNumber)) {
  // object.age is now typed as number
}

// Custom type guards
const isPositiveNumber = (value: unknown): value is number => 
  typeof value === "number" && value > 0;

if (isOfType<number>(value, isPositiveNumber)) {
  // value is now typed as number and we know it's positive
}
```

## Object Safety

Safely work with objects and their properties without runtime errors.

```typescript
import {
  prop,
  getPath,
  typedKeys,
  typedEntries,
  isNotNullOrUndefined
} from "@banja/react-jedi";

// Safe property access with defaults
const name = prop(user, "name", "Unknown");

// Deep property access
const nestedValue = getPath(data, "user.address.zipCode", "00000");

// Type-safe object operations
const keys = typedKeys(object); // Keys are correctly typed
const entries = typedEntries(object); // Entries preserve types

// Safe JSON operations
const parseResult = safeJsonParse<UserData>(jsonString);
const stringifyResult = safeJsonStringify(complexObject);
```

## Component Type Helpers

Rich type helpers for building strongly-typed React components.

```typescript
import type {
  WithChildren,
  WithVariants,
  PolymorphicComponent,
  ResponsiveValue,
  ExtractProps,
  ComposedComponent,
  WithRef
} from "@banja/react-jedi";

// Component with variants
type ButtonProps = WithVariants<
  WithChildren,
  "primary" | "secondary" | "outline",
  "sm" | "md" | "lg"
>;

// Polymorphic component (as prop)
const Text: PolymorphicComponent<TextProps, "p"> = ({ as: Component = "p", ...props }) => {
  return <Component {...props} />;
};

// Responsive props
type BoxProps = {
  padding?: ResponsiveValue<number>;
};

// This works like:
<Box padding={{ base: 2, md: 4, lg: 6 }} />
```

## Tailwind Type Helpers

Type helpers specifically for working with Tailwind CSS.

```typescript
import type {
  TailwindResponsiveValue,
  TailwindSpacing,
  TailwindFontSize,
  TailwindFontWeight,
  TailwindLineHeight
} from "@banja/react-jedi";

// Component with strongly-typed Tailwind props
type TextProps = {
  fontSize?: TailwindFontSize;
  fontWeight?: TailwindFontWeight;
  lineHeight?: TailwindLineHeight;
  margin?: TailwindResponsiveValue<TailwindSpacing>;
};
```

## Error Handling

Consistent error handling patterns.

```typescript
import {
  tryExec,
  tryExecAsync,
  assert,
  assertNotNull
} from "@banja/react-jedi";

// Wrap functions that might throw
const result = tryExec(() => JSON.parse(data));

// Async error handling
const asyncResult = await tryExecAsync(fetchData);

// Runtime assertions
assert(value > 0, "Value must be positive");
assertNotNull(user, "User cannot be null");
```

## Best Practices

1. **Use `Result<T, E>` for functions that can fail**
   - Return `ok(value)` for success cases
   - Return `err(error)` for failure cases
   - Chain operations with `.map()`, `.mapErr()`, and `.andThen()`

2. **Use type guards to narrow types safely**
   - Always check types before accessing properties on unknown data
   - Create custom type guards for domain-specific types
   - Combine type guards for complex validations

3. **Safe property access**
   - Use `prop()` and `getPath()` for safe property access with defaults
   - Avoid direct property access on objects that might be null/undefined

4. **Component type safety**
   - Use utility types like `WithChildren`, `WithVariants`, etc. to build prop types
   - Use `PolymorphicComponent` for components that can render as different elements
   - Use `ResponsiveValue` for props that can vary across breakpoints

5. **Testing and validation**
   - Write tests for type guards and utility functions
   - Use Zod for runtime validation of data structures
   - Include type assertion tests to verify type behavior