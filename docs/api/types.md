# Type System

React Jedi uses a comprehensive type system to ensure type safety and provide excellent developer experience. This document outlines the core types and interfaces used throughout the library.

## Core Types

### BaseComponentSpec

The foundation of all component specifications:

```typescript
interface BaseComponentSpec {
  /**
   * Component type identifier
   */
  type: string;
  
  /**
   * Unique identifier for the component instance
   */
  id?: string;
  
  /**
   * Style extensions to merge with default styles
   */
  styleExtend?: Record<string, unknown>;
  
  /**
   * Complete style override
   */
  styleOverrides?: Record<string, unknown>;
  
  /**
   * Conditional rendering rules
   */
  conditions?: Condition[];
  
  /**
   * Event handler definitions
   */
  actions?: Record<string, Action>;
  
  /**
   * Local state configuration
   */
  state?: StateConfig;
  
  /**
   * Parent context passed down
   */
  parentContext?: Record<string, unknown>;
  
  /**
   * Theme overrides
   */
  theme?: Partial<Theme>;
}
```

### ComponentSpec

Union type of all available component specifications:

```typescript
type ComponentSpec = 
  | LayoutComponentSpec
  | TypographyComponentSpec
  | UIComponentSpec
  | FormComponentSpec
  | InteractiveComponentSpec
  | SpecialComponentSpec;
```

### UISpecification

The root specification type:

```typescript
interface UISpecification {
  /**
   * Root UI component
   */
  root: ComponentSpec;
  
  /**
   * Global theme configuration
   */
  theme?: Theme;
  
  /**
   * Global state initialization
   */
  initialState?: State;
  
  /**
   * Plugin configurations
   */
  plugins?: Plugin[];
  
  /**
   * Feature flags
   */
  features?: FeatureFlags;
}
```

## Layout Types

### LayoutComponentSpec

```typescript
type LayoutComponentSpec =
  | BoxSpec
  | ContainerSpec
  | FlexSpec
  | GridSpec
  | StackSpec
  | CenterSpec
  | SpacerSpec
  | AspectRatioSpec
  | SimpleGridSpec
  | MasonrySpec
  | GroupSpec;
```

### Common Layout Properties

```typescript
interface LayoutProps {
  padding?: SpacingValue;
  margin?: SpacingValue;
  width?: SizeValue;
  height?: SizeValue;
  display?: DisplayValue;
  position?: PositionValue;
  overflow?: OverflowValue;
}
```

## Typography Types

### TypographyComponentSpec

```typescript
type TypographyComponentSpec =
  | HeadingSpec
  | TextSpec
  | BlockQuoteSpec;
```

### Typography Properties

```typescript
interface TypographyProps {
  fontSize?: FontSizeValue;
  fontWeight?: FontWeightValue;
  fontFamily?: string;
  lineHeight?: LineHeightValue;
  letterSpacing?: LetterSpacingValue;
  textAlign?: TextAlignValue;
  color?: ColorValue;
}
```

## Form Types

### FormComponentSpec

```typescript
type FormComponentSpec =
  | InputSpec
  | SelectSpec
  | CheckboxSpec
  | RadioGroupSpec
  | SwitchSpec
  | SliderSpec
  | TextareaSpec
  | FormSpec
  | FormFieldSpec;
```

### Form State

```typescript
interface FormState {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}
```

## Action Types

### Action

```typescript
type Action =
  | SetStateAction
  | ToggleStateAction
  | DispatchAction
  | NavigateAction
  | SubmitFormAction
  | ValidateFieldAction
  | CustomAction;
```

### Action Examples

```typescript
interface SetStateAction {
  type: "setState";
  state: "local" | "global";
  key: string;
  value: unknown;
}

interface ToggleStateAction {
  type: "toggleState";
  state: "local" | "global";
  key: string;
}

interface DispatchAction {
  type: "dispatch";
  action: string;
  payload?: unknown;
}
```

## Condition Types

### Condition

```typescript
interface Condition {
  when: WhenClause;
  [key: string]: unknown; // Properties to apply when condition is true
}
```

### WhenClause

```typescript
interface WhenClause {
  state?: string;
  is?: unknown;
  isNot?: unknown;
  greaterThan?: number;
  lessThan?: number;
  includes?: unknown;
  matches?: string | RegExp;
}
```

## Theme Types

### Theme

```typescript
interface Theme {
  colors: ColorTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  breakpoints: BreakpointTokens;
  radii: RadiusTokens;
  shadows: ShadowTokens;
  transitions: TransitionTokens;
  zIndices: ZIndexTokens;
}
```

### Color Tokens

```typescript
interface ColorTokens {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}
```

## Value Types

### SpacingValue

```typescript
type SpacingValue = 
  | number // Theme scale value (0-20)
  | string // CSS value or Tailwind class
  | {
      top?: number | string;
      right?: number | string;
      bottom?: number | string;
      left?: number | string;
      x?: number | string;
      y?: number | string;
    }
  | ResponsiveValue<number | string>;
```

### SizeValue

```typescript
type SizeValue = 
  | number // Pixel value
  | string // CSS value
  | "full" | "auto" | "min" | "max"
  | ResponsiveValue<number | string>;
```

### ResponsiveValue

```typescript
interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}
```

## State Types

### State

```typescript
interface State {
  local: Record<string, unknown>;
  global: Record<string, unknown>;
  form?: FormState;
  ui?: UIState;
}
```

### StateConfig

```typescript
interface StateConfig {
  initial?: Record<string, unknown>;
  persist?: boolean;
  persistKey?: string;
  validation?: StateValidation;
}
```

## Plugin Types

### Plugin

```typescript
interface Plugin {
  name: string;
  version: string;
  init: (context: PluginContext) => void;
  components?: Record<string, React.ComponentType>;
  actions?: Record<string, ActionHandler>;
  validators?: Record<string, Validator>;
}
```

## Utility Types

### DeepPartial

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### Nullable

```typescript
type Nullable<T> = T | null | undefined;
```

### ValueOf

```typescript
type ValueOf<T> = T[keyof T];
```

## Type Guards

### Component Type Guards

```typescript
function isLayoutComponent(spec: ComponentSpec): spec is LayoutComponentSpec {
  return ["Box", "Container", "Flex", "Grid", "Stack"].includes(spec.type);
}

function isFormComponent(spec: ComponentSpec): spec is FormComponentSpec {
  return ["Input", "Select", "Checkbox", "Form"].includes(spec.type);
}
```

### Value Type Guards

```typescript
function isResponsiveValue<T>(value: unknown): value is ResponsiveValue<T> {
  return typeof value === "object" && 
    value !== null && 
    ("base" in value || "sm" in value || "md" in value);
}
```

## Best Practices

1. Use strict typing throughout your specifications
2. Leverage type guards for runtime type checking
3. Create custom types for domain-specific values
4. Use union types for variant properties
5. Keep interfaces focused and composable
6. Document complex types with JSDoc comments
7. Use generic types for reusable patterns