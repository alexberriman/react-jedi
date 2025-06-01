# React Jedi Developer Tools

Enhanced developer experience tools for React Jedi, including improved error messages, specification linting, formatting, and debugging utilities.

## Features

### 🚨 Enhanced Error Messages

Get clear, actionable error messages with:
- Descriptive error codes
- Suggested fixes
- Documentation links
- Component context
- Path information

```typescript
import { createDeveloperError, ErrorCodes } from "@alexberriman/react-jedi/dev-tools";

const error = createDeveloperError(
  ErrorCodes.COMPONENT_NOT_FOUND,
  "Component 'Buttn' not found",
  {
    component: "Buttn",
    suggestion: "Did you mean 'Button'?",
    documentation: "https://docs.react-jedi.com/components/button"
  }
);
```

### 🔍 Specification Linting

Catch common issues in your specifications:
- Empty children arrays
- Missing accessibility attributes
- Inline styles (performance warning)
- Unused state variables
- Inconsistent naming conventions

```typescript
import { createLinter } from "@alexberriman/react-jedi/dev-tools";

const linter = createLinter();
const results = linter.lint(specification);
console.log(linter.formatResults(results));
```

### 🎨 Specification Formatting

Format your specifications consistently:
- Consistent key ordering
- Proper indentation
- Trailing commas
- Line length limits

```typescript
import { createFormatter } from "@alexberriman/react-jedi/dev-tools";

const formatter = createFormatter();
const formatted = formatter.format(specification);
```

### 🔧 Debug Utilities

Comprehensive debugging tools:
- Component render tracking
- State change logging
- Event handler debugging
- Performance profiling
- Debug reports

```typescript
import { Debug, DebugLevel } from "@alexberriman/react-jedi/dev-tools";

// Configure debug mode
Debug.configure({
  enabled: true,
  level: DebugLevel.DEBUG,
  logComponentRenders: true,
  logStateChanges: true
});

// Use in components
Debug.logRender(component, context);
Debug.logStateChange(oldState, newState, changes);
Debug.profile("Heavy Operation", () => performWork());
```

## Installation

The developer tools are included with React Jedi:

```bash
npm install @alexberriman/react-jedi
```

## Usage

### Error Messages

```typescript
import { 
  createDeveloperError, 
  formatErrorWithContext,
  ErrorCodes 
} from "@alexberriman/react-jedi/dev-tools";

// Create an enhanced error
const error = createDeveloperError(
  ErrorCodes.INVALID_SCHEMA,
  "Invalid component props",
  {
    component: "Button",
    path: ["root", "children", "0", "props"],
    suggestion: "Check the Button component documentation",
    severity: "error"
  }
);

// Format for display
console.error(formatErrorWithContext(error, true));
```

### Linting

```typescript
import { createLinter, builtInRules } from "@alexberriman/react-jedi/dev-tools";

// Create linter with built-in rules
const linter = createLinter();

// Lint a specification
const spec = {
  version: "1.0",
  root: {
    type: "Image",
    props: {
      src: "photo.jpg"
      // Missing alt text - will trigger error
    }
  }
};

const results = linter.lint(spec);
console.log(linter.formatResults(results));

// Disable specific rules
linter.disableRule("no-inline-styles");

// Add custom rules
linter.addRule({
  id: "custom-rule",
  name: "Custom Rule",
  description: "My custom linting rule",
  severity: "warning",
  check: (spec) => {
    // Custom validation logic
    return [];
  }
});
```

### Formatting

```typescript
import { createFormatter, formatSpecification } from "@alexberriman/react-jedi/dev-tools";

// Format with custom options
const formatter = createFormatter({
  indent: 4,
  sortKeys: true,
  maxLineLength: 100
});

const formatted = formatter.format(specification);

// Quick format with defaults
const quickFormat = formatSpecification(specification);

// Get component tree visualization
const tree = formatter.formatComponentTree(specification);
console.log(tree);
```

### Debugging

```typescript
import { Debug, DebugLevel, useDebug } from "@alexberriman/react-jedi/dev-tools";

// Configure debug mode
Debug.configure({
  enabled: true,
  level: DebugLevel.DEBUG,
  logComponentRenders: true,
  logStateChanges: true,
  performanceThreshold: 16, // 16ms for 60fps
  consoleGroups: true
});

// Use in React components
function MyComponent(props) {
  useDebug("MyComponent", props);
  
  // Component logic
  return <div>...</div>;
}

// Manual logging
Debug.logRender(component, {
  componentPath: ["App", "MyComponent"],
  renderCount: 1,
  renderTime: 5.2,
  props: props
});

// Performance profiling
const result = Debug.profile("Database Query", async () => {
  return await fetchData();
});

// Create debug report
const report = Debug.createDebugReport();
console.log(report);
```

## Command Line Interface

React Jedi includes a CLI for linting and formatting specifications:

```bash
# Lint specifications
npx rj-dev lint spec.json

# Format specifications
npx rj-dev format spec.json

# Fix formatting issues
npx rj-dev format --fix spec.json

# Check for errors and formatting
npx rj-dev check src/**/*.spec.json

# Quiet mode (only show errors)
npx rj-dev lint --quiet spec.json
```

## Built-in Lint Rules

### Error Level

- `accessibility-alt-text`: Images must have alt text
- `schema-validation`: Specification must be valid

### Warning Level

- `no-empty-children`: Avoid empty children arrays
- `no-inline-styles`: Prefer CSS classes over inline styles
- `form-labels`: Form inputs should have labels
- `unused-state`: State variables should be used
- `excessive-nesting`: Avoid deeply nested components

### Info Level

- `consistent-naming`: Use consistent naming conventions

## API Reference

### Error Messages

- `createDeveloperError(code, message, options?)`: Create enhanced error
- `formatErrorWithContext(error, showStack?)`: Format error for display
- `createMissingComponentError(type, available)`: Create component not found error
- `createComponentError(type, error, spec?)`: Create component-specific error

### Linting

- `createLinter(rules?)`: Create specification linter
- `SpecificationLinter.lint(spec)`: Lint a specification
- `SpecificationLinter.formatResults(results, colorize?)`: Format lint results
- `SpecificationLinter.enableRule(id)`: Enable a specific rule
- `SpecificationLinter.disableRule(id)`: Disable a specific rule
- `SpecificationLinter.addRule(rule)`: Add custom rule

### Formatting

- `createFormatter(options?)`: Create specification formatter
- `SpecificationFormatter.format(spec)`: Format specification to string
- `SpecificationFormatter.formatInPlace(spec)`: Format specification object
- `SpecificationFormatter.formatComponentTree(spec)`: Visualize component tree
- `SpecificationFormatter.formatDiff(before, after)`: Show specification diff

### Debugging

- `Debug.configure(config)`: Configure debug settings
- `Debug.log(level, message, data?)`: Log debug message
- `Debug.logRender(component, context)`: Log component render
- `Debug.logStateChange(old, new, changes)`: Log state change
- `Debug.logEvent(name, handler, data?)`: Log event
- `Debug.profile(name, fn)`: Profile function execution
- `Debug.createDebugReport()`: Generate debug report
- `useDebug(name, props?)`: React hook for component debugging

## Examples

See the [examples directory](../../examples) for complete examples:
- [dev-tools-example.tsx](../../examples/dev-tools-example.tsx): Interactive demo of all features

## Contributing

We welcome contributions to improve the developer tools! Please see our [contributing guide](../../../CONTRIBUTING.md) for details.

## License

MIT