# Storybook Test Addon Guide

## Overview

The Storybook Test Addon is configured to enable writing and running tests directly within your stories. This provides a seamless way to test component behavior, interactions, and accessibility.

## Features

- **Interaction Testing**: Test user interactions like clicks, typing, and navigation
- **Visual Regression Testing**: Ensure components render correctly
- **Accessibility Testing**: Automatic a11y checks with axe-core
- **Integration with Vitest**: Reuse your existing test setup
- **CI/CD Ready**: Run tests in headless mode for continuous integration

## Writing Tests in Stories

### Basic Example

```typescript
import { expect, fn, userEvent, within } from "@storybook/test";

export const MyStory: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Interact with the component
    await userEvent.click(button);

    // Assert behavior
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
```

### Available Testing Utilities

- `within()`: Query elements within the story canvas
- `userEvent`: Simulate user interactions (click, type, hover, etc.)
- `expect()`: Make assertions using Jest matchers
- `fn()`: Create mock functions to test callbacks
- `waitFor()`: Wait for async operations

## Running Tests

### Interactive Mode
```bash
npm run storybook
# Tests run automatically when viewing stories
```

### Command Line
```bash
npm run test-storybook        # Run all story tests
npm run test-storybook:watch  # Watch mode
npm run test-storybook:ci     # CI mode (headless)
```

### With Coverage
```bash
npm run test-storybook:coverage
```

## Best Practices

1. **Test User Behavior**: Focus on how users interact with components
2. **Keep Tests Simple**: Each story should test one specific behavior
3. **Use Semantic Queries**: Prefer `getByRole` over `getByTestId`
4. **Test Accessibility**: All interactive elements should be keyboard accessible
5. **Mock External Dependencies**: Use `fn()` for callbacks and event handlers

## Testing Patterns

### Testing States
```typescript
export const DisabledState: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
  },
};
```

### Testing Async Behavior
```typescript
export const AsyncLoading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    
    await userEvent.click(button);
    
    // Wait for loading state
    await waitFor(() => {
      expect(canvas.getByText("Loading...")).toBeInTheDocument();
    });
  },
};
```

### Testing Form Inputs
```typescript
export const FormInput: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox");
    
    await userEvent.type(input, "Hello World");
    await expect(input).toHaveValue("Hello World");
  },
};
```

## Debugging Failed Tests

1. **Visual Debugging**: Tests run in the browser where you can see what's happening
2. **Step Through**: Use the Interactions panel to step through test execution
3. **Console Logs**: Add `console.log()` statements in your play functions
4. **Accessibility Reports**: Check the console for detailed a11y violations

## Integration with CI/CD

The test runner is configured to work with popular CI services:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm ci
  
- name: Build Storybook
  run: npm run build-storybook
  
- name: Run Storybook tests
  run: npm run test-storybook:ci
```

## Troubleshooting

### Tests timing out
Increase the timeout in your test configuration if needed.

### Cannot find element
Ensure elements are rendered before querying:
```typescript
await waitFor(() => {
  expect(canvas.getByRole("button")).toBeInTheDocument();
});
```

### Flaky tests
Use `waitFor` for async operations and avoid fixed delays:
```typescript
// Bad
await new Promise(resolve => setTimeout(resolve, 1000));

// Good
await waitFor(() => expect(element).toBeVisible());
```