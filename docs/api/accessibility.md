# Accessibility in React Jedi

React Jedi is designed with accessibility in mind, providing proper ARIA attributes and keyboard navigation throughout the component library.

## ARIA Attributes

All components in React Jedi include appropriate ARIA attributes to ensure they are accessible to users with assistive technologies.

### Accessibility Utilities

The library provides a comprehensive set of accessibility utilities in `lib/accessibility/aria-attributes.ts`:

#### Core Functions

##### `getAriaProps`
Generates a complete set of ARIA attributes based on provided options.

```typescript
const ariaProps = getAriaProps({
  label: 'Search button',
  expanded: false,
  controls: 'search-panel',
  disabled: false,
  live: 'polite'
});
```

### Component-Specific Helpers

#### `getButtonAriaProps`
Generates ARIA attributes specific to button components.

```typescript
const buttonAria = getButtonAriaProps({
  pressed: true,
  expanded: false,
  label: 'Toggle menu',
  disabled: false
});
```

#### `getFormControlAriaProps`
Generates ARIA attributes for form controls.

```typescript
const inputAria = getFormControlAriaProps({
  invalid: false,
  required: true,
  labelledBy: 'email-label',
  describedBy: 'email-help'
});
```

#### `getHeadingAriaProps`
Generates ARIA attributes for heading elements.

```typescript
const headingAria = getHeadingAriaProps(2, {
  label: 'Main content'
});
```

### Keyboard Navigation

The library includes utilities for implementing keyboard navigation patterns:

#### `handleArrowKeyNavigation`
Manages arrow key navigation for lists and menus.

```typescript
handleArrowKeyNavigation(event, {
  orientation: 'horizontal',
  currentIndex: selectedIndex,
  totalItems: items.length,
  onIndexChange: setSelectedIndex,
  loop: true
});
```

### Focus Management

#### `trapFocus`
Traps focus within a specific container, useful for modals and dialogs.

```typescript
const cleanup = trapFocus(dialogElement);
// Later: cleanup();
```

#### `getFocusableElements`
Returns all focusable elements within a container.

```typescript
const focusable = getFocusableElements(container);
```

### Screen Reader Announcements

#### `announceToScreenReader`
Announces messages to screen readers using live regions.

```typescript
announceToScreenReader('Form submitted successfully', 'polite');
```

## Component Implementation

### Button Component

The Button component automatically includes appropriate ARIA attributes:

```jsx
<Button
  pressed={isPressed}
  expanded={isExpanded}
  aria-label="Open menu"
  disabled={isDisabled}
>
  Menu
</Button>
```

### Alert Component

Alerts support different roles and live regions:

```jsx
<Alert
  role="alert"
  aria-live="polite"
>
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>
```

### Heading Component

Headings automatically include the correct heading role and level:

```jsx
<Heading level="h2" aria-label="Section title">
  About Us
</Heading>
```

### Input Component

Form inputs support validation and labeling attributes:

```jsx
<Input
  aria-label="Email address"
  aria-required={true}
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
```

## Best Practices

1. **Always provide labels**: Use `aria-label` or `aria-labelledby` for interactive elements
2. **Indicate states**: Use `aria-expanded`, `aria-pressed`, `aria-selected` appropriately
3. **Describe errors**: Use `aria-describedby` to link error messages to form controls
4. **Announce changes**: Use live regions for dynamic content updates
5. **Manage focus**: Trap focus in modals and restore focus when closing
6. **Support keyboard navigation**: Implement arrow keys, Tab, Escape, and Enter handling

## Testing Accessibility

To test accessibility in your components:

```typescript
import { getAriaProps, announceToScreenReader } from '@/lib/accessibility';

// In your tests
describe('MyComponent', () => {
  it('should have proper ARIA attributes', () => {
    const { getByRole } = render(<MyComponent />);
    const button = getByRole('button');
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-label', 'Toggle panel');
  });
});
```

## Extending Accessibility

To add accessibility to custom components:

```typescript
import { getAriaProps } from '@/lib/accessibility';

function CustomComponent({ expanded, disabled, label, ...props }) {
  const ariaProps = getAriaProps({
    expanded,
    disabled,
    label,
    role: 'button'
  });

  return (
    <div {...ariaProps} {...props}>
      {/* Component content */}
    </div>
  );
}
```