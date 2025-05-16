# Input Component

The Input component provides a versatile text input field for forms and user input. It supports various types, sizes, and states while maintaining consistency with the design system.

## Specification

```typescript
interface InputSpec extends BaseComponentSpec {
  type: "Input";
  inputType?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "error" | "success";
  label?: string;
  error?: string;
  helperText?: string;
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `"Input"` | Required | Component type identifier |
| `inputType` | `"text" \| "email" \| "password" \| "number" \| "tel" \| "url" \| "search"` | `"text"` | HTML input type |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string \| number` | - | Controlled value |
| `defaultValue` | `string \| number` | - | Initial value |
| `name` | `string` | - | Form field name |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `autoComplete` | `string` | - | Autocomplete hint |
| `pattern` | `string` | - | Validation pattern |
| `minLength` | `number` | - | Minimum length |
| `maxLength` | `number` | - | Maximum length |
| `min` | `number` | - | Minimum value (number) |
| `max` | `number` | - | Maximum value (number) |
| `step` | `number` | - | Step increment (number) |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Input size |
| `variant` | `"default" \| "error" \| "success"` | `"default"` | Visual variant |
| `label` | `string` | - | Associated label |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text |

## Usage Examples

### Basic Input

```json
{
  "type": "Input",
  "placeholder": "Enter your name"
}
```

### Email Input with Label

```json
{
  "type": "Input",
  "inputType": "email",
  "label": "Email Address",
  "placeholder": "user@example.com",
  "required": true
}
```

### Password Input

```json
{
  "type": "Input",
  "inputType": "password",
  "label": "Password",
  "placeholder": "Enter password",
  "minLength": 8,
  "required": true
}
```

### Number Input with Constraints

```json
{
  "type": "Input",
  "inputType": "number",
  "label": "Age",
  "min": 18,
  "max": 120,
  "step": 1,
  "defaultValue": 25
}
```

### Input with Error State

```json
{
  "type": "Input",
  "label": "Username",
  "value": "admin",
  "variant": "error",
  "error": "This username is already taken"
}
```

### Search Input

```json
{
  "type": "Input",
  "inputType": "search",
  "placeholder": "Search...",
  "size": "sm",
  "actions": {
    "onChange": {
      "type": "setState",
      "state": "local",
      "key": "searchQuery",
      "value": "$event.target.value"
    }
  }
}
```

### Controlled Input

```json
{
  "type": "Input",
  "label": "Name",
  "value": "$state.local.userName",
  "actions": {
    "onChange": {
      "type": "setState",
      "state": "local",
      "key": "userName",
      "value": "$event.target.value"
    }
  }
}
```

## Form Integration

### With Form Component

```json
{
  "type": "Form",
  "children": [
    {
      "type": "FormField",
      "name": "email",
      "children": {
        "type": "Input",
        "inputType": "email",
        "label": "Email",
        "required": true
      }
    },
    {
      "type": "FormField",
      "name": "password",
      "children": {
        "type": "Input",
        "inputType": "password",
        "label": "Password",
        "required": true
      }
    }
  ]
}
```

### With Validation

```json
{
  "type": "Input",
  "label": "Email",
  "inputType": "email",
  "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
  "conditions": [
    {
      "when": {
        "state": "local.emailValid",
        "is": false
      },
      "variant": "error",
      "error": "Please enter a valid email address"
    }
  ]
}
```

## Styling

The Input component uses Tailwind CSS classes for consistent styling:

```json
{
  "type": "Input",
  "placeholder": "Custom styled input",
  "styleExtend": {
    "borderColor": "purple-500",
    "focusBorderColor": "purple-600",
    "borderRadius": "full",
    "paddingLeft": "1rem",
    "paddingRight": "1rem"
  }
}
```

## State Management

Inputs can be controlled through state:

```json
{
  "type": "Input",
  "label": "Controlled Input",
  "value": "$state.form.firstName",
  "actions": {
    "onChange": {
      "type": "updateFormField",
      "field": "firstName",
      "value": "$event.target.value"
    },
    "onBlur": {
      "type": "validateField",
      "field": "firstName"
    }
  }
}
```

## Accessibility

- Proper label association using `id` and `for` attributes
- ARIA attributes for error states
- Keyboard navigation support
- Screen reader friendly error messages
- Required field indicators

## Best Practices

1. Always provide labels for inputs
2. Use appropriate input types for better UX
3. Provide helpful placeholder text
4. Show validation errors clearly
5. Use helper text for additional guidance
6. Make required fields obvious
7. Implement proper validation patterns

## Performance Considerations

- Input state updates are optimized
- Debounce search inputs to reduce updates
- Use controlled components only when necessary
- Memoize validation functions

## Related Components

- [Form](./form.md) - Form container with validation
- [FormField](./form-field.md) - Form field wrapper
- [Label](./label.md) - Input labels
- [Select](./select.md) - Dropdown selection
- [Textarea](./textarea.md) - Multi-line text input