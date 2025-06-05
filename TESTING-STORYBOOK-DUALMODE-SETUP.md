# Storybook Dual-Mode Testing Setup

This guide explains how to configure Storybook stories to display both native React components and SDUI (JSON-rendered) views, with automatic testing of both modes using a single play function.

## Overview

The dual-mode system allows you to:
- View components in both React and SDUI modes via a tab interface
- See the JSON specification with syntax highlighting
- Automatically test both rendering modes to ensure parity
- Identify schema and implementation issues early

## Converting a Story to Dual-Mode

### 1. Basic Story with Args

For simple stories that only use args:

```typescript
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

// Before
export const Default: Story = {
  args: {
    variant: "default",
    children: "Click me"
  },
  play: async ({ canvasElement }) => {
    // Your tests
  }
};

// After
export const Default: Story = enhanceStoryForDualMode({
  args: {
    variant: "default", 
    children: "Click me"
  },
  play: async ({ canvasElement }) => {
    // Same tests - they'll run on both modes automatically
  }
});
```

### 2. Story with Custom Render Function

For stories with custom render functions, you must provide the equivalent JSON spec:

```typescript
export const ComplexLayout: Story = enhanceStoryForDualMode({
  render: () => (
    <div className="space-y-4">
      <Text size="lg">Title</Text>
      <Button variant="primary">Action</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Your tests
  }
}, {
  renderSpec: {
    type: "Flex",
    direction: "column",
    gap: "md",
    children: [
      {
        type: "Text",
        size: "lg",
        children: "Title"
      },
      {
        type: "Button",
        variant: "primary",
        children: "Action"
      }
    ]
  }
});
```

## Common Issues and Solutions

### 1. Schema Property Name Mismatches

**Issue**: Schema uses different property names than the React component expects.

**Example**: 
- Schema: `direction: "row-reverse"`
- Component expects: `direction: "rowReverse"`

**Solution**: Update schemas to use camelCase to match React component props:
```typescript
// flex.schema.ts
direction: z.enum(["row", "column", "rowReverse", "columnReverse"])
```

### 2. Children vs Text Property

**Issue**: Text component schema uses `text` property but React expects `children`.

**Solution**: Update schema to use `children`:
```typescript
// text.schema.ts
export const textSchema = z.object({
  type: z.literal("text"),
  children: z.string(), // was: text: z.string()
  // ...
});
```

### 3. Gap Value Formats

**Issue**: Using numeric strings like `gap: "4"` instead of size tokens.

**Solution**: Use proper size tokens that match the component's variant props:
```typescript
// Correct
gap: "md"  // not gap: "4"
gap: "sm"  // not gap: "2"
```

### 4. Prop Name Differences

**Issue**: Using CSS-like prop names instead of component prop names.

**Example**:
- Wrong: `alignItems: "center"`
- Correct: `align: "center"`

**Solution**: Check the component's TypeScript interface or story controls to find correct prop names.

### 5. HTML Elements in Render Functions

**Issue**: Using raw HTML elements like `<div>` in render functions.

**Solution**: Map to appropriate SDUI components:
```typescript
// React
<div className="space-y-4 max-w-lg">

// SDUI equivalent
{
  type: "Flex",
  direction: "column",
  gap: "md",
  className: "max-w-lg"
}
```

### 6. Complex Children Structures

**Issue**: Nested components with mixed elements.

**Solution**: Ensure all children are properly specified as component specs:
```typescript
{
  type: "Flex",
  children: [
    {
      type: "Text",
      children: "Simple text"
    },
    {
      type: "Flex",
      direction: "row",
      children: [
        { type: "Button", children: "One" },
        { type: "Button", children: "Two" }
      ]
    }
  ]
}
```

## Testing Considerations

### 1. Element Selection

Play functions should work for both modes. Use data attributes or text content for selection:

```typescript
// Good - works for both modes
const button = canvas.getByRole("button", { name: "Submit" });
const text = canvas.getByText("Welcome");

// Avoid - may not work consistently
const element = container.querySelector(".custom-class");
```

### 2. Component-Specific Attributes

Some components add data attributes that help with testing:

```typescript
// Text component adds data-slot="text"
expect(textElement).toHaveAttribute("data-slot", "text");
```

### 3. Async Behavior

The dual-mode test wrapper handles tab switching automatically. Your tests don't need to worry about this.

## Schema Validation

Before converting stories, validate your schemas match the component props:

1. **Check the component's TypeScript interface**
2. **Look at existing story args/argTypes** 
3. **Ensure schema property names match exactly**
4. **Verify enum values are in the correct format**

## Debugging Tips

1. **Check Console Logs**: The test runner logs which mode is being tested
2. **View JSON Tab**: See the exact JSON being rendered
3. **Compare Renders**: Visually compare React vs SDUI output
4. **Test Failures**: Usually indicate schema/prop mismatches

## Example Migration Checklist

When migrating a component's stories:

- [ ] Import `enhanceStoryForDualMode`
- [ ] Wrap each story with the enhancer
- [ ] For render functions, create equivalent `renderSpec`
- [ ] Check schema matches component props
- [ ] Update any mismatched property names
- [ ] Fix gap/spacing values to use tokens
- [ ] Run tests and fix any failures
- [ ] Verify visual output matches in both modes

## Component Resolver Expectations

The component resolver (src/lib/component-resolver.ts) expects:
- Props are extracted directly from the spec
- Children are pre-rendered by the render function
- Internal properties (type, spec, theme, etc.) are omitted
- Special handling for components that expect full spec objects

## Final Notes

- Always test after converting to ensure both modes work
- Schema updates may affect other parts of the codebase
- Keep schemas as the source of truth for SDUI
- When in doubt, check how the component is actually implemented

Remember: The goal is to ensure SDUI JSON specs can produce identical output to direct React component usage. Any differences indicate either schema issues or implementation gaps that need to be addressed.