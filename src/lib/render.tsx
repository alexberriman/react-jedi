import * as React from "react";
import {
  type ComponentProps,
  type ComponentResolver,
  type ComponentSpec,
  type RenderOptions,
  type UISpecification,
} from "@/types/schema/components";
import type { ThemeSpecification } from "@/types/schema/specification";
import { isComponentSpec, isComponentSpecArray, isTextContent } from "@/types/schema/guards";
import { processStyleOverrides } from "./theme/style-overrides";
import { createTokenResolver } from "./theme/token-resolver";
import { extractTokensFromTheme, createTokenCollection } from "./theme/theme-tokens";
import { cn, omit } from "./utils";
import {
  resolveExtendedStyles,
  createChildStyleContext,
  type StyleContext,
} from "./theme/style-extension";
import { createStateManager, type StateManager, StateProvider } from "./state";
import {
  extractStateConfig,
  initializeComponentState,
  resolveStateBindings,
} from "./state/state-initialization";
import { processConditionals, type ConditionContext } from "./conditions";
import {
  createMemoizedComponent,
  defaultMemoizationOptions,
  createOptimizedStateManager,
  OptimizedStateProvider,
} from "./performance";

/**
 * ErrorBoundary component to catch rendering errors
 */
class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    componentType: string;
    fallback?: React.ReactNode;
    onError?: (error: Error, componentType: string) => void;
  },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: {
    children: React.ReactNode;
    componentType: string;
    fallback?: React.ReactNode;
    onError?: (error: Error, componentType: string) => void;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    const { componentType, onError } = this.props;
    if (onError) {
      onError(error, componentType);
    }
  }

  render(): React.ReactElement {
    if (this.state.hasError) {
      // Always return React.ReactElement
      if (this.props.fallback) {
        // Cast to ReactElement since we know it should be a valid React element
        return this.props.fallback as React.ReactElement;
      }

      return (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          <p>Error rendering component: {this.props.componentType}</p>
          <p className="text-sm mt-2 font-mono">{this.state.error?.message}</p>
        </div>
      );
    }

    // Ensure we always return a ReactElement
    if (!this.props.children) {
      return <></>;
    }

    // If children is a valid ReactElement, return it directly
    if (React.isValidElement(this.props.children)) {
      return this.props.children;
    }

    // For other ReactNode types like arrays, strings, etc., wrap in a fragment
    return <>{this.props.children}</>;
  }
}

// Import components directly
import * as UI from "@/components/ui";

// Type definition for components in our registry
type ComponentType = React.ComponentType<ComponentProps>;

// Helper function to safely cast components to accept our standard ComponentProps
// Special handling for certain components that have required props
const asComponent = <T extends React.ComponentType<Record<string, unknown>>>(
  component: T,
  defaultProps?: Partial<Record<string, unknown>>
): ComponentType => {
  if (defaultProps) {
    return ((props: ComponentProps) => {
      const componentElement = React.createElement(component, { ...defaultProps, ...props });
      return componentElement;
    }) as ComponentType;
  }
  return component as unknown as ComponentType;
};

/**
 * Component registry for default components
 * All components are adapted to accept our standard ComponentProps interface.
 */
const componentRegistry: Record<string, ComponentType> = {
  // Layout Components
  Box: asComponent(UI.Box),
  Container: asComponent(UI.Container),
  Grid: asComponent(UI.Grid),
  Flex: asComponent(UI.Flex),
  AspectRatio: asComponent(UI.AspectRatio),
  Separator: asComponent(UI.Separator),

  // Typography Components
  Text: asComponent(UI.Text),
  Heading: asComponent(UI.Heading),
  BlockQuote: asComponent(UI.BlockQuote),

  // UI Components
  Button: asComponent(UI.Button),
  Card: asComponent(UI.Card),
  Badge: asComponent(UI.Badge),
  Avatar: asComponent(UI.Avatar),
  Image: asComponent(UI.Image),
  Skeleton: asComponent(UI.Skeleton),
  Label: asComponent(UI.Label),
  Input: asComponent(UI.Input),

  // Form Components
  FormItem: asComponent(UI.FormItem),
  FormLabel: asComponent(UI.FormLabel),
  FormControl: asComponent(UI.FormControl),
  FormDescription: asComponent(UI.FormDescription),
  FormMessage: asComponent(UI.FormMessage),
  // Form component requires special handling as it's a FormProvider
  Form: asComponent(UI.Form as React.ComponentType<Record<string, unknown>>),

  // Other Components
  RadioGroup: asComponent(UI.RadioGroup),
  RadioGroupItem: ((props: ComponentProps) => {
    const { spec, theme, state, parentContext, ...restProps } = props;
    const value = (restProps as { value?: string }).value || "";
    return React.createElement(UI.RadioGroupItem, { ...restProps, value });
  }) as ComponentType,
  Select: asComponent(UI.Select),
  SelectContent: asComponent(UI.SelectContent),
  SelectItem: ((props: ComponentProps) => {
    const { spec, theme, state, parentContext, ...restProps } = props;
    const value = (restProps as { value?: string }).value || "";
    return React.createElement(UI.SelectItem, { ...restProps, value });
  }) as ComponentType,
  SelectTrigger: asComponent(UI.SelectTrigger),
  SelectValue: asComponent(UI.SelectValue),
  Checkbox: asComponent(UI.Checkbox),
  Textarea: asComponent(UI.TextareaComponent),
};

/**
 * Memoized component registry
 * Components are memoized based on their type and memoization options
 */
const memoizedComponentRegistry: Record<string, ComponentType> = {};

/**
 * Default component resolver function
 * Maps component type strings to their React implementations
 */
const defaultComponentResolver: ComponentResolver = (type: string) => {
  // Try the exact type first
  let component = componentRegistry[type];

  // If not found, try PascalCase (e.g., "box" -> "Box")
  if (!component) {
    const pascalCaseType = type.charAt(0).toUpperCase() + type.slice(1);
    component = componentRegistry[pascalCaseType];
  }

  if (!component) {
    console.warn(`Component type "${type}" not found`);
  }

  return component || null;
};

/**
 * Extended ComponentProps type that includes html attributes
 */
interface ExtendedComponentProps extends ComponentProps {
  [key: string]: unknown;
}

/**
 * Renders development placeholder for unknown components
 */
function renderUnknownComponent(type: string): React.ReactElement {
  return (
    <div className="p-2 border border-dashed border-yellow-500 bg-yellow-50 rounded">
      <p className="text-sm text-yellow-700">
        Unknown component type: <code>{type}</code>
      </p>
    </div>
  );
}

/**
 * Renders children for a component spec
 */
function renderChildren(
  spec: ComponentSpec,
  options: RenderOptions,
  parentContext: Record<string, unknown>,
  parentStyleContext?: StyleContext
): React.ReactElement | null {
  if (!spec.children) {
    return null;
  }

  if (isTextContent(spec.children)) {
    // Always return a consistent type by wrapping primitives
    return React.createElement(React.Fragment, null, spec.children);
  }

  if (isComponentSpec(spec.children)) {
    const childComponent = renderComponent(
      spec.children,
      options,
      {
        ...parentContext,
        parent: { type: spec.type, id: spec.id },
      },
      parentStyleContext
    );
    // Always return a consistent type
    return React.createElement(React.Fragment, null, childComponent);
  }

  if (isComponentSpecArray(spec.children)) {
    const elements = spec.children.map((child, index) => {
      const renderedChild = renderComponent(
        child,
        options,
        {
          ...parentContext,
          parent: { type: spec.type, id: spec.id },
        },
        parentStyleContext
      );

      return React.createElement(
        React.Fragment,
        { key: child.id || `${spec.type}-child-${index}` },
        renderedChild
      );
    });
    // Return wrapped elements
    return React.createElement(React.Fragment, null, ...elements);
  }

  return null;
}

/**
 * Applies style overrides from theme
 */
function applyStyleOverrides(
  spec: ComponentSpec,
  theme: RenderOptions["theme"],
  context?: StyleContext
): { className?: string; style?: React.CSSProperties } {
  if (!theme) {
    return {};
  }

  const extractedTokens = extractTokensFromTheme(theme as ThemeSpecification);
  const tokens = createTokenCollection(extractedTokens);
  const tokenResolver = createTokenResolver(theme as ThemeSpecification, tokens);

  // Use style extension if available and enabled
  if (context && (theme as ThemeSpecification).styleExtension) {
    const themeOverrides = theme.components
      ? processStyleOverrides(spec, theme as ThemeSpecification, tokenResolver)
      : {};

    return resolveExtendedStyles(spec, context, themeOverrides);
  }

  // Fallback to standard overrides
  return theme.components
    ? processStyleOverrides(spec, theme as ThemeSpecification, tokenResolver)
    : {};
}

/**
 * Builds component props from spec
 */
function buildComponentProps(
  spec: ComponentSpec,
  options: RenderOptions,
  children: React.ReactNode,
  parentContext: Record<string, unknown>,
  styleOverrides: { className?: string; style?: React.CSSProperties }
): ExtendedComponentProps {
  // Handle both spec.className and spec.props.className patterns
  const specProps = spec.props || ({} as Record<string, unknown>);
  const mergedClassName = cn(
    spec.className || (specProps as { className?: string }).className,
    styleOverrides.className
  );
  const mergedStyle = {
    ...(spec.style || (specProps as { style?: React.CSSProperties }).style),
    ...styleOverrides.style,
  };

  // Build component props excluding internal properties
  const filteredSpecProps = omit(specProps as Record<string, unknown>, [
    "className",
    "style",
    "children",
  ]);
  const filteredSpec = omit(spec as unknown as Record<string, unknown>, [
    "type",
    "className",
    "style",
    "children",
    "props",
    "id",
    "spec",
  ]);

  // Type assertion to avoid issues with strict type checking
  const componentProps: ExtendedComponentProps = {
    ...filteredSpecProps,
    ...filteredSpec,
    className: mergedClassName || undefined,
    style: Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined,
    children,
    // Internal props that components will filter out
    spec,
    theme: options.theme,
    state: options.initialState,
    parentContext,
  };

  // Apply accessibility props
  if (spec.a11y) {
    const {
      ariaLabel,
      ariaDescribedBy,
      ariaControls,
      ariaExpanded,
      ariaHidden,
      tabIndex,
      hasPopup,
      ariaLive,
      ariaAtomic,
      role,
    } = spec.a11y;

    Object.assign(componentProps, {
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-controls": ariaControls,
      "aria-expanded": ariaExpanded,
      "aria-hidden": ariaHidden,
      tabIndex,
      "aria-haspopup": hasPopup,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
      role,
    });
  }

  // Apply data attributes
  if (spec.data) {
    for (const [key, value] of Object.entries(spec.data)) {
      (componentProps as Record<string, unknown>)[`data-${key}`] = value;
    }
  }

  // Apply test ID
  if (spec.testId) {
    (componentProps as Record<string, unknown>)["data-testid"] = spec.testId;
  }

  return componentProps;
}

/**
 * Renders a component spec into a React element
 */
function renderComponent(
  spec: ComponentSpec,
  options: RenderOptions = {},
  parentContext: Record<string, unknown> = {},
  parentStyleContext?: StyleContext
): React.ReactElement | null {
  const {
    resolver = defaultComponentResolver,
    theme = {},
    development = false,
    errorBoundaries = true,
    onError,
    useStyleExtension = true,
    stateManager,
  } = options;

  // Extract and initialize component state
  const stateConfig = extractStateConfig(spec);

  if (stateConfig && stateManager && spec.id) {
    initializeComponentState(spec.id, stateConfig, stateManager);
  }

  // Resolve state bindings in spec properties
  let resolvedSpec = spec;
  if (stateManager) {
    const currentState = stateManager.getState();
    // Resolve state bindings in all spec properties except children
    const { children, ...specPropsWithoutChildren } = spec;
    const resolvedProps = resolveStateBindings(specPropsWithoutChildren, currentState);
    resolvedSpec = { ...resolvedProps, children } as ComponentSpec;
  }

  // Create condition context for conditional rendering
  const conditionContext: ConditionContext = {
    state: stateManager?.getState() || options.initialState || {},
    props: resolvedSpec,
    env: options.env,
  };

  // Process conditional rendering and props
  const conditionalSpec = processConditionals(resolvedSpec, conditionContext);

  // If component should not render based on conditions, return null
  if (!conditionalSpec) {
    return null;
  }

  // Use the conditionally processed spec
  resolvedSpec = conditionalSpec;

  // Get the component implementation
  let Component = resolver(resolvedSpec.type);

  if (!Component) {
    return development ? renderUnknownComponent(resolvedSpec.type) : null;
  }

  // Apply memoization if enabled
  const memoOptions = options.memoization || defaultMemoizationOptions;
  if (memoOptions.enabled) {
    const cacheKey = `${resolvedSpec.type}_${memoOptions.enabled}_${memoOptions.trackPerformance}`;

    // Check if we already have a memoized version
    if (!memoizedComponentRegistry[cacheKey]) {
      memoizedComponentRegistry[cacheKey] = createMemoizedComponent(
        Component,
        resolvedSpec.type,
        memoOptions
      );
    }

    Component = memoizedComponentRegistry[cacheKey];
  }

  // Create or inherit style context
  const styleContext =
    parentStyleContext ||
    options.styleContext ||
    (useStyleExtension && theme && (theme as ThemeSpecification).styleExtension
      ? (() => {
          const tokens = createTokenResolver(
            theme as ThemeSpecification,
            createTokenCollection(extractTokensFromTheme(theme as ThemeSpecification))
          );
          return {
            theme: theme as ThemeSpecification,
            tokens,
            componentPath: [],
          };
        })()
      : undefined);

  // Process style overrides from theme
  const styleOverrides = applyStyleOverrides(resolvedSpec, theme, styleContext);

  // Create child style context
  const childStyleContext =
    styleContext && useStyleExtension
      ? createChildStyleContext(styleContext, resolvedSpec, styleOverrides)
      : undefined;

  // Render children with style context
  const children = renderChildren(resolvedSpec, options, parentContext, childStyleContext);

  // Build component props
  const componentProps = buildComponentProps(
    resolvedSpec,
    options,
    children,
    parentContext,
    styleOverrides
  );

  // Create the React element
  const element = React.createElement(Component, componentProps);

  // Wrap in error boundary if enabled
  if (errorBoundaries) {
    return (
      <ErrorBoundary componentType={resolvedSpec.type} onError={onError}>
        {element}
      </ErrorBoundary>
    );
  }

  return element;
}

/**
 * Main render function for Server-Driven UI
 *
 * This function takes a UI specification and renders it into React components.
 * It provides options for customization, error handling, and context injection.
 *
 * @param specification The UI specification to render
 * @param options Rendering options
 * @returns React element representing the UI
 *
 * Note: This function has high cognitive complexity due to the many features
 * it needs to support (state management, optimization, theme handling, etc).
 * Consider refactoring into smaller functions if complexity increases further.
 */
/**
 * Extract the component spec from the specification
 */
function getComponentSpec(specification: UISpecification | ComponentSpec): ComponentSpec {
  return isComponentSpec(specification) ? specification : specification.root;
}

/**
 * Prepare effective render options
 */
function prepareRenderOptions(
  specification: UISpecification | ComponentSpec,
  options: RenderOptions
): RenderOptions {
  if (isComponentSpec(specification)) {
    return options;
  }

  return {
    ...options,
    theme: options.theme || (specification.theme as Record<string, unknown>),
    initialState: options.initialState || specification.state?.initial,
  };
}

/**
 * Create and configure state manager
 */
function createConfiguredStateManager(
  fullSpec: UISpecification | null,
  options: RenderOptions
): StateManager | undefined {
  if (!fullSpec?.state && !options.initialState) {
    return undefined;
  }

  const baseStateManager = createStateManager({
    initialState: options.initialState || fullSpec?.state?.initial || {},
    persistence: fullSpec?.state?.persistence,
    computed: fullSpec?.state?.computed,
    debug: options.development ? { enabled: true } : undefined,
  });

  // Apply optimizations if configured
  return options.stateOptimization?.batchUpdates
    ? createOptimizedStateManager(baseStateManager, options.stateOptimization)
    : baseStateManager;
}

/**
 * Wrap rendered content with providers as needed
 */
function wrapWithProviders(
  content: React.ReactElement | null,
  stateManager: StateManager | undefined,
  fullSpec: UISpecification | null,
  options: RenderOptions
): React.ReactElement | null {
  if (!stateManager) {
    return content;
  }

  const stateProviderContent = (
    <StateProvider
      specification={fullSpec ? { state: fullSpec.state } : undefined}
      initialState={options.initialState}
      debug={options.development}
    >
      {content}
    </StateProvider>
  );

  // Wrap with optimized provider if optimization is enabled
  if (options.stateOptimization?.batchUpdates) {
    return (
      <OptimizedStateProvider stateManager={stateManager} optimization={options.stateOptimization}>
        {stateProviderContent}
      </OptimizedStateProvider>
    );
  }

  return stateProviderContent;
}

export function render(
  specification: UISpecification | ComponentSpec,
  options: RenderOptions = {}
): React.ReactElement | null {
  const componentSpec = getComponentSpec(specification);
  const effectiveOptions = prepareRenderOptions(specification, options);

  const fullSpec = isComponentSpec(specification) ? null : specification;
  const stateManager = createConfiguredStateManager(fullSpec, effectiveOptions);

  if (stateManager) {
    effectiveOptions.stateManager = stateManager;
  }

  const rendered = renderComponent(componentSpec, effectiveOptions);

  return wrapWithProviders(rendered, stateManager, fullSpec, effectiveOptions);
}
