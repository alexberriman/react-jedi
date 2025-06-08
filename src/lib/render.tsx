import * as React from "react";
import {
  type ComponentProps,
  type ComponentSpec,
  type RenderOptions,
  type UISpecification,
} from "../types/schema/components";
import type { AccessibilityProps } from "../types/schema/base";
import type { ThemeSpecification } from "../types/schema/specification";
import { isComponentSpec, isComponentSpecArray, isTextContent } from "../types/schema/guards";
import { processStyleOverrides } from "./theme/style-overrides";
import { createTokenResolver } from "./theme/token-resolver";
import { extractTokensFromTheme, createTokenCollection } from "./theme/theme-tokens";
import { cn, omit } from "./utils";
import {
  resolveExtendedStyles,
  createChildStyleContext,
  type StyleContext,
} from "./theme/style-extension";
import { defaultComponentResolver, getUnwrappedComponent } from "./component-resolver";
import type { DataSourcesState } from "../hooks/use-data-sources";
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
import { useDataSources } from "../hooks/use-data-sources";
import { ErrorBoundary as SexyErrorBoundary } from "../components/ui/error-boundary";
import { processJsonTemplate, type TemplateVariable } from "./parser/template-engine";
import { isIconReference, transformIconReference } from "./icons";
import { SDUIFormWrapper } from "./form/sdui-form-wrapper";

// Import helper functions from component-resolver
const transformPropsForComponent = (spec: Record<string, unknown>, actualProps: Record<string, unknown>): Record<string, unknown> => {
  if (spec.type === "Heading" && "level" in actualProps && typeof actualProps.level === "number") {
    return {
      ...actualProps,
      level: `h${actualProps.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    };
  }

  if (spec.type === "ToggleGroup" || spec.type === "ToggleGroupItem") {
    const { type, children, ...componentProps } = spec;
    return {
      ...actualProps,
      ...componentProps,
    };
  }

  if (spec.type === "Input") {
    return transformInputProps(actualProps);
  }

  if (spec.type === "Flex") {
    return transformFlexProps(actualProps);
  }

  if (spec.type === "Grid") {
    return transformGridProps(actualProps);
  }

  return actualProps;
};

const transformInputProps = (actualProps: Record<string, unknown>): Record<string, unknown> => {
  const transformed = { ...actualProps };
  
  // Transform inputType to type for HTML input element
  if ("inputType" in actualProps) {
    transformed.type = actualProps.inputType;
    delete transformed.inputType;
  }
  
  return transformed;
};

const transformFlexProps = (actualProps: Record<string, unknown>): Record<string, unknown> => {
  const transformed = { ...actualProps };
  
  // Transform hyphenated direction values to camelCase
  if ("direction" in actualProps && typeof actualProps.direction === "string") {
    const directionMap: Record<string, string> = {
      "row": "row",
      "column": "column",
      "row-reverse": "rowReverse",
      "column-reverse": "columnReverse"
    };
    transformed.direction = directionMap[actualProps.direction] || actualProps.direction;
  }
  
  // Transform hyphenated wrap values to camelCase
  if ("wrap" in actualProps && typeof actualProps.wrap === "string") {
    const wrapMap: Record<string, string> = {
      "nowrap": "nowrap",
      "wrap": "wrap",
      "wrap-reverse": "wrapReverse"
    };
    transformed.wrap = wrapMap[actualProps.wrap] || actualProps.wrap;
  }
  
  // Transform justify values
  if ("justify" in actualProps && typeof actualProps.justify === "string") {
    const justifyMap: Record<string, string> = {
      "start": "start",
      "end": "end",
      "center": "center",
      "space-between": "between",
      "space-around": "around",
      "space-evenly": "evenly"
    };
    transformed.justify = justifyMap[actualProps.justify] || actualProps.justify;
  }
  
  return transformed;
};

const transformGridProps = (actualProps: Record<string, unknown>): Record<string, unknown> => {
  const transformed = { ...actualProps };
  
  // Transform cols, colsSm, colsMd, etc. to columns responsive object
  const colsProps = ['cols', 'colsSm', 'colsMd', 'colsLg', 'colsXl', 'cols2xl'];
  const hasColsProps = colsProps.some(prop => prop in actualProps);
  
  if (hasColsProps) {
    const columns: Record<string, number> = {};
    
    if ('cols' in actualProps) {
      columns.base = Number(actualProps.cols);
      delete transformed.cols;
    }
    if ('colsSm' in actualProps) {
      columns.sm = Number(actualProps.colsSm);
      delete transformed.colsSm;
    }
    if ('colsMd' in actualProps) {
      columns.md = Number(actualProps.colsMd);
      delete transformed.colsMd;
    }
    if ('colsLg' in actualProps) {
      columns.lg = Number(actualProps.colsLg);
      delete transformed.colsLg;
    }
    if ('colsXl' in actualProps) {
      columns.xl = Number(actualProps.colsXl);
      delete transformed.colsXl;
    }
    if ('cols2xl' in actualProps) {
      columns['2xl'] = Number(actualProps.cols2xl);
      delete transformed.cols2xl;
    }
    
    transformed.columns = columns;
  }
  
  // Transform gap values
  if ('gap' in actualProps && typeof actualProps.gap === 'string') {
    const gapMap: Record<string, number> = {
      'xs': 1,
      'sm': 2,
      'md': 4,
      'lg': 6,
      'xl': 8,
      '2xl': 12
    };
    transformed.gap = gapMap[actualProps.gap] || actualProps.gap;
  }
  
  return transformed;
};

// Helper to check if a key is an event handler prop
const isEventHandlerProp = (key: string): boolean => {
  return key.startsWith('on') && key.length > 2 && key[2] === key[2].toUpperCase();
};

// Helper to process Action props
const processActionProp = (
  key: string,
  value: string,
  converted: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): void => {
  delete converted[key];
  if (handlers) {
    const eventName = key.slice(0, -6);
    const handler = handlers[value];
    if (handler) {
      converted[eventName] = handler;
    }
  }
};

// Helper to process direct event props
const processEventProp = (
  key: string,
  value: string,
  converted: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): void => {
  if (handlers && handlers[value]) {
    converted[key] = handlers[value];
  } else {
    delete converted[key];
  }
};

// Helper to process nested action objects
const processNestedAction = (
  actionObj: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): Record<string, unknown> => {
  const processedAction: Record<string, unknown> = {};
  
  for (const [actionKey, actionValue] of Object.entries(actionObj)) {
    if (actionKey === 'onClick' && typeof actionValue === 'string' && handlers) {
      // Convert string handler reference to actual function
      const handler = handlers[actionValue];
      if (handler) {
        processedAction[actionKey] = handler;
      }
    } else {
      processedAction[actionKey] = actionValue;
    }
  }
  
  return processedAction;
};

const convertActionPropsToHandlers = (
  props: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): Record<string, unknown> => {
  const converted = { ...props };
  
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      if (key.endsWith('Action')) {
        processActionProp(key, value, converted, handlers);
      } else if (isEventHandlerProp(key)) {
        processEventProp(key, value, converted, handlers);
      }
    } else if (typeof value === 'object' && value !== null && key.endsWith('Action')) {
      // Handle nested action objects (e.g., primaryAction, secondaryAction)
      converted[key] = processNestedAction(value as Record<string, unknown>, handlers);
    }
  }
  return converted;
};

// Using the sexy ErrorBoundary from ../components/ui/error-boundary

// Type definition for components in our registry
type ComponentType = React.ComponentType<ComponentProps>;

/**
 * Memoized component registry
 * Components are memoized based on their type and memoization options
 */
const memoizedComponentRegistry: Record<string, ComponentType> = {};

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
  parentStyleContext?: StyleContext,
  parentHasAsChild: boolean = false
): React.ReactElement | null {
  if (!spec.children) {
    return null;
  }

  if (isTextContent(spec.children)) {
    // Always return a consistent type by wrapping primitives
    return React.createElement(React.Fragment, null, spec.children);
  }

  if (isComponentSpec(spec.children)) {
    // Check if it's an icon reference first
    if (isIconReference(spec.children)) {
      const iconElement = transformIconReference(spec.children);
      return React.createElement(React.Fragment, null, iconElement);
    }
    
    const childComponent = renderComponent(
      spec.children,
      {
        ...options,
        // Disable error boundaries for children of components with asChild
        // This allows Radix UI's Slot component to properly merge props
        errorBoundaries: parentHasAsChild ? false : options.errorBoundaries,
      },
      {
        ...parentContext,
        parent: { type: spec.type, id: spec.id },
      },
      parentStyleContext,
      parentHasAsChild
    );
    
    // If parent has asChild, return the child directly without Fragment wrapper
    // This is crucial for Radix UI's Slot component to work properly
    if (parentHasAsChild) {
      return childComponent;
    }
    
    // Always return a consistent type
    return React.createElement(React.Fragment, null, childComponent);
  }

  if (isComponentSpecArray(spec.children)) {
    const elements = spec.children.map((child, index) => {
      // Check if it's an icon reference first
      if (isIconReference(child)) {
        const iconElement = transformIconReference(child);
        return React.createElement(
          React.Fragment,
          { key: `${spec.type}-icon-${index}` as React.Key },
          iconElement
        );
      }
      
      const renderedChild = renderComponent(
        child,
        {
          ...options,
          // Disable error boundaries for children of components with asChild
          errorBoundaries: parentHasAsChild ? false : options.errorBoundaries,
        },
        {
          ...parentContext,
          parent: { type: spec.type, id: spec.id },
        },
        parentStyleContext,
        parentHasAsChild
      );

      // If parent has asChild and there's only one child, return it directly
      if (parentHasAsChild && Array.isArray(spec.children) && spec.children.length === 1) {
        return renderedChild;
      }

      return React.createElement(
        React.Fragment,
        { key: (child.id || `${spec.type}-child-${index}`) as React.Key },
        renderedChild
      );
    });
    
    // If parent has asChild and there's only one element, return it directly
    if (parentHasAsChild && elements.length === 1) {
      return elements[0];
    }
    
    // Return wrapped elements
    return React.createElement(React.Fragment, null, ...elements);
  }

  // Handle mixed arrays (strings and ComponentSpecs)
  if (Array.isArray(spec.children)) {
    const elements = spec.children.map((child, index) => {
      if (isTextContent(child)) {
        return React.createElement(
          React.Fragment,
          { key: `${spec.type}-text-${index}` as React.Key },
          child
        );
      }
      if (isComponentSpec(child)) {
        // Check if it's an icon reference first
        if (isIconReference(child)) {
          const iconElement = transformIconReference(child);
          return React.createElement(
            React.Fragment,
            { key: `${spec.type}-icon-${index}` as React.Key },
            iconElement
          );
        }
        
        const renderedChild = renderComponent(
          child,
          {
            ...options,
            // Disable error boundaries for children of components with asChild
            errorBoundaries: parentHasAsChild ? false : options.errorBoundaries,
          },
          {
            ...parentContext,
            parent: { type: spec.type, id: spec.id },
          },
          parentStyleContext,
          parentHasAsChild
        );
        return React.createElement(
          React.Fragment,
          { key: (child.id || `${spec.type}-child-${index}`) as React.Key },
          renderedChild
        );
      }
      return null;
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
  // Handle className and style from the spec
  const mergedClassName = cn(spec.className || undefined, styleOverrides.className);
  const mergedStyle: React.CSSProperties = {};
  if (spec.style) {
    Object.assign(mergedStyle, spec.style);
  }
  if (styleOverrides.style) {
    Object.assign(mergedStyle, styleOverrides.style);
  }

  // Build component props excluding internal properties
  const filteredSpec = omit(spec as unknown as Record<string, unknown>, [
    "type",
    "className",
    "style",
    "children",
    "id",
    "spec",
    "conditionalProps",
    "when",
    "state",
    "actions",
    "computedProps",
  ]);

  // Process properties that might contain nested ComponentSpecs
  const processedProps: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(filteredSpec)) {
    processedProps[key] = isComponentSpec(value)
      ? renderComponent(
          value as ComponentSpec,
          options,
          parentContext,
          undefined,
          false
        )
      : value;
  }

  // Type assertion to avoid issues with strict type checking
  const componentProps: ExtendedComponentProps = {
    ...processedProps,
    className: mergedClassName || undefined,
    style: Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined,
    children,
    // Internal props that components will filter out
    spec,
    theme: options.theme,
    state: options.initialState,
    parentContext: {
      ...parentContext,
      handlers: options.handlers,
    },
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
    } = spec.a11y as AccessibilityProps;

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
 * Helper to resolve a single data binding
 */
function resolveSingleDataBinding(value: unknown, dataSources: DataSourcesState): unknown {
  if (typeof value !== "string" || !value.startsWith("$data.")) {
    return value;
  }

  const path = value.slice(6); // Remove "$data." prefix
  const [sourceId, ...propertyPath] = path.split(".");

  if (!dataSources.sources[sourceId]) {
    return value;
  }

  const sourceData = dataSources.sources[sourceId].data;
  if (!sourceData) {
    return undefined;
  }

  return resolvePropertyPath(sourceData, propertyPath);
}

/**
 * Helper to resolve a property path from an object
 */
function resolvePropertyPath(data: unknown, propertyPath: string[]): unknown {
  let resolvedValue = data;

  for (const prop of propertyPath) {
    if (resolvedValue && typeof resolvedValue === "object" && prop in resolvedValue) {
      resolvedValue = (resolvedValue as Record<string, unknown>)[prop];
    } else {
      return undefined;
    }
  }

  return resolvedValue;
}

/**
 * Helper to resolve data bindings for a set of props
 */
function resolveDataBindingsForProps(
  props: Record<string, unknown>,
  dataSources: DataSourcesState
): Record<string, unknown> {
  const boundProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    boundProps[key] = resolveSingleDataBinding(value, dataSources);
  }

  return boundProps;
}

/**
 * Initializes component state if configured
 */
function initializeStateIfNeeded(
  spec: ComponentSpec,
  stateManager: StateManager | undefined
): void {
  if (!spec) {
    return;
  }
  
  const stateConfig = extractStateConfig(spec);

  if (stateConfig && stateManager && spec.id) {
    initializeComponentState(spec.id as string, stateConfig, stateManager);
  }
}

/**
 * Resolves state and data bindings for a component spec
 */
function resolveBindings(spec: ComponentSpec, options: RenderOptions): ComponentSpec {
  const { stateManager } = options;

  if (!stateManager && !options.dataSources) {
    return spec;
  }

  const currentState = stateManager?.getState() || {};
  const { children, ...specPropsWithoutChildren } = spec;
  let resolvedProps = resolveStateBindings(specPropsWithoutChildren, currentState);

  // Apply data bindings if data sources are available
  if (options.dataSources) {
    resolvedProps = resolveDataBindingsForProps(resolvedProps, options.dataSources);
  }

  return { ...resolvedProps, children } as ComponentSpec;
}

/**
 * Gets or creates a memoized version of a component
 */
function getMemoizedComponent(
  Component: ComponentType,
  componentType: string,
  options: RenderOptions
): ComponentType {
  const memoOptions = options.memoization || defaultMemoizationOptions;
  if (!memoOptions.enabled) {
    return Component;
  }
  
  const cacheKey = `${componentType}_${memoOptions.enabled}_${memoOptions.trackPerformance}`;
  
  // Check if we already have a memoized version
  if (!memoizedComponentRegistry[cacheKey]) {
    memoizedComponentRegistry[cacheKey] = createMemoizedComponent(
      Component,
      componentType,
      memoOptions
    );
  }
  
  return memoizedComponentRegistry[cacheKey];
}

/**
 * Creates style context for component rendering
 */
function createComponentStyleContext(
  parentStyleContext: StyleContext | undefined,
  options: RenderOptions,
  theme: RenderOptions["theme"]
): StyleContext | undefined {
  if (parentStyleContext) {
    return parentStyleContext;
  }
  
  if (options.styleContext) {
    return options.styleContext;
  }
  
  const { useStyleExtension = true } = options;
  
  if (useStyleExtension && theme && (theme as ThemeSpecification).styleExtension) {
    const tokens = createTokenResolver(
      theme as ThemeSpecification,
      createTokenCollection(extractTokensFromTheme(theme as ThemeSpecification))
    );
    return {
      theme: theme as ThemeSpecification,
      tokens,
      componentPath: [],
    };
  }
  
  return undefined;
}

/**
 * Renders a component using the unwrapped component when parent has asChild
 */
function renderUnwrappedComponent(
  unwrappedComponent: React.ComponentType<Record<string, unknown>>,
  resolvedSpec: ComponentSpec,
  children: React.ReactNode,
  styleOverrides: { className?: string; style?: React.CSSProperties },
  options: RenderOptions
): React.ReactElement {
  // Extract actual props excluding internal properties
  const actualProps = omit(resolvedSpec as Record<string, unknown>, [
    "spec", "children", "theme", "state", "parentContext", "type", "id",
    "conditionalProps", "when", "actions", "computedProps"
  ]);
  const transformedProps = transformPropsForComponent(resolvedSpec, actualProps);
  const propsWithHandlers = convertActionPropsToHandlers(transformedProps, options.handlers);
  
  // Build final props
  const finalProps: Record<string, unknown> = {
    ...propsWithHandlers,
    className: cn(resolvedSpec.className as string | undefined, styleOverrides.className),
    style: { 
      ...(resolvedSpec.style as React.CSSProperties | undefined), 
      ...styleOverrides.style 
    },
    children,
  };
  
  // Clean up undefined values
  for (const key of Object.keys(finalProps)) {
    if (finalProps[key] === undefined) {
      delete finalProps[key];
    }
  }
  
  return React.createElement(unwrappedComponent, finalProps);
}

/**
 * Renders a component spec into a React element
 */
function renderComponent(
  spec: ComponentSpec,
  options: RenderOptions = {},
  parentContext: Record<string, unknown> = {},
  parentStyleContext?: StyleContext,
  parentHasAsChild: boolean = false
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
  initializeStateIfNeeded(spec, stateManager);

  // Resolve state and data bindings
  let resolvedSpec = resolveBindings(spec, options);

  // Create condition context for conditional rendering
  const conditionContext: ConditionContext = {
    state: stateManager?.getState() || options.initialState || {},
    props: resolvedSpec,
    env: options.env,
    data: options.dataSources?.sources,
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

  // Create or inherit style context
  const styleContext = createComponentStyleContext(parentStyleContext, options, theme);

  // Process style overrides from theme
  const styleOverrides = applyStyleOverrides(resolvedSpec, theme, styleContext);

  // Create child style context
  const childStyleContext =
    styleContext && useStyleExtension
      ? createChildStyleContext(styleContext, resolvedSpec, styleOverrides)
      : undefined;

  // Check if this component has asChild prop
  const hasAsChild = resolvedSpec.asChild === true;
  
  // Render children with style context
  const children = renderChildren(resolvedSpec, options, parentContext, childStyleContext, hasAsChild);

  // If parent has asChild=true, use the unwrapped component
  // This allows Radix UI's Slot component to properly merge props
  if (parentHasAsChild) {
    const unwrappedComponent = getUnwrappedComponent(Component);
    if (unwrappedComponent) {
      return renderUnwrappedComponent(unwrappedComponent, resolvedSpec, children, styleOverrides, options);
    }
  }

  // Apply memoization if enabled (only for non-asChild cases)
  if (!parentHasAsChild) {
    Component = getMemoizedComponent(Component, resolvedSpec.type, options);
  }

  // Build component props
  const componentProps = buildComponentProps(
    resolvedSpec,
    options,
    children,
    parentContext,
    styleOverrides
  );

  // Create the React element
  let element = React.createElement(Component, componentProps);

  // Wrap Form components with SDUI form context
  if (resolvedSpec.type === 'Form') {
    // Extract onSubmit handler from componentProps
    const onSubmit = componentProps.onSubmit as ((values: Record<string, unknown>) => void | Promise<void>) | undefined;
    
    element = (
      <SDUIFormWrapper spec={resolvedSpec} onSubmit={onSubmit}>
        {element}
      </SDUIFormWrapper>
    );
  }

  // Wrap in error boundary if enabled
  if (errorBoundaries) {
    return (
      <SexyErrorBoundary onError={onError ? (error) => onError(error, resolvedSpec.type) : undefined}>
        {element}
      </SexyErrorBoundary>
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
  if (!specification) {
    throw new Error(
      "Invalid specification: The render function requires either a UISpecification object or a ComponentSpec object. " +
      "Example: render({ type: 'button', children: 'Click me' }) or render({ version: '1.0', root: { type: 'button', children: 'Click me' } })"
    );
  }
  
  if (isComponentSpec(specification)) {
    return specification;
  }
  
  if (!specification.root) {
    throw new Error(
      "Invalid UISpecification: Missing 'root' property. " +
      "A UISpecification must have a 'root' property containing a ComponentSpec. " +
      "Example: { version: '1.0', root: { type: 'button', children: 'Click me' } }"
    );
  }
  
  return specification.root;
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
 * Component that handles data source fetching and provides data to children
 */
function DataSourceProvider({
  children,
  specification,
  options,
}: {
  children: React.ReactElement | null;
  specification: UISpecification;
  options: RenderOptions;
}): React.ReactElement | null {
  const dataSources = useDataSources(specification.dataSources, options.dataSourceOptions);

  // Clone children with enhanced options including data sources
  if (children && React.isValidElement(children)) {
    const enhancedOptions = { ...options, dataSources };

    // Re-render the root component with data sources available
    const componentSpec = specification.root;
    const reRendered = renderComponent(componentSpec, enhancedOptions);

    return reRendered;
  }

  return children;
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
  let wrappedContent = content;

  // Wrap with data source provider if data sources are specified
  if (fullSpec?.dataSources && fullSpec.dataSources.length > 0 && content) {
    wrappedContent = (
      <DataSourceProvider specification={fullSpec} options={options}>
        {content}
      </DataSourceProvider>
    );
  }

  if (!stateManager) {
    return wrappedContent;
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

/**
 * Wraps content in error boundary if enabled
 */
function wrapInErrorBoundary(
  content: React.ReactElement | null,
  options: RenderOptions
): React.ReactElement | null {
  if (!content || options.errorBoundaries === false) {
    return content;
  }

  return (
    <SexyErrorBoundary onError={options.onError ? (error) => options.onError!(error, 'root') : undefined}>
      {content}
    </SexyErrorBoundary>
  );
}

/**
 * Handles render errors by wrapping in error boundary
 */
function handleRenderError(error: unknown, options: RenderOptions): React.ReactElement {
  if (options.errorBoundaries === false) {
    throw error;
  }

  const errorToShow = error instanceof Error ? error : new Error(String(error));
  return (
    <SexyErrorBoundary onError={options.onError ? (error) => options.onError!(error, 'root') : undefined}>
      <ErrorTrigger error={errorToShow} />
    </SexyErrorBoundary>
  );
}

export function render(
  specification: UISpecification | ComponentSpec,
  options: RenderOptions = {}
): React.ReactElement | null {
  try {
    // Process template variables if provided
    let processedSpecification = specification;
    if (options.variables) {
      const templateResult = processJsonTemplate(specification, options.variables as TemplateVariable);
      if (!templateResult.ok) {
        throw templateResult.val;
      }
      processedSpecification = templateResult.val;
    }

    const componentSpec = getComponentSpec(processedSpecification);
    const effectiveOptions = prepareRenderOptions(processedSpecification, options);

    const fullSpec = isComponentSpec(processedSpecification) ? null : processedSpecification;
    const stateManager = createConfiguredStateManager(fullSpec, effectiveOptions);

    if (stateManager) {
      effectiveOptions.stateManager = stateManager;
    }

    const rendered = renderComponent(componentSpec, effectiveOptions);
    const wrappedContent = wrapWithProviders(rendered, stateManager, fullSpec, effectiveOptions);

    return wrapInErrorBoundary(wrappedContent, effectiveOptions);
  } catch (error) {
    return handleRenderError(error, options);
  }
}

// Helper component to trigger error boundary
function ErrorTrigger({ error }: { error: Error }): null {
  throw error;
}
