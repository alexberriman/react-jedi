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
import { defaultComponentResolver } from "./component-resolver";
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
        { key: (child.id || `${spec.type}-child-${index}`) as React.Key },
        renderedChild
      );
    });
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

  // Type assertion to avoid issues with strict type checking
  const componentProps: ExtendedComponentProps = {
    ...filteredSpec,
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
