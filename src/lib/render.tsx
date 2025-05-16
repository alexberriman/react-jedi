import * as React from "react";
import {
  type ComponentProps,
  type ComponentResolver,
  type ComponentSpec,
  type RenderOptions,
  type UISpecification
} from "@/types/schema/components";
import type { ThemeSpecification } from "@/types/schema/specification";
import { isComponentSpec, isComponentSpecArray, isTextContent } from "@/types/schema/guards";
import { processStyleOverrides } from "./theme/style-overrides";
import { createTokenResolver } from "./theme/token-resolver";
import { extractTokensFromTheme, createTokenCollection } from "./theme/theme-tokens";
import { cn } from "./utils";
import { 
  resolveExtendedStyles, 
  createChildStyleContext,
  type StyleContext 
} from "./theme/style-extension";

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
const asComponent = <T extends React.ComponentType<Record<string, unknown>>>(
  component: T
): ComponentType => {
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
};

/**
 * Default component resolver function
 * Maps component type strings to their React implementations
 */
const defaultComponentResolver: ComponentResolver = (type: string) => {
  // Use the component registry instead of dynamic imports
  const component = componentRegistry[type];
  
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
    const childComponent = renderComponent(spec.children, options, {
      ...parentContext,
      parent: { type: spec.type, id: spec.id }
    }, parentStyleContext);
    // Always return a consistent type
    return React.createElement(React.Fragment, null, childComponent);
  } 
  
  if (isComponentSpecArray(spec.children)) {
    const elements = spec.children.map((child, index) => {
      const renderedChild = renderComponent(child, options, {
        ...parentContext,
        parent: { type: spec.type, id: spec.id }
      }, parentStyleContext);
      
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
  theme: RenderOptions['theme'],
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
  const mergedClassName = cn(spec.className, styleOverrides.className);
  const mergedStyle = {
    ...spec.style,
    ...styleOverrides.style,
  };

  const componentProps: ExtendedComponentProps = {
    spec: {
      ...spec,
      className: mergedClassName,
      style: Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined,
    },
    children,
    theme: options.theme,
    state: options.initialState,
    parentContext
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
      role
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
      role
    });
  }

  // Apply data attributes
  if (spec.data) {
    for (const [key, value] of Object.entries(spec.data)) {
      componentProps[`data-${key}`] = value;
    }
  }

  // Apply test ID
  if (spec.testId) {
    componentProps["data-testid"] = spec.testId;
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
    useStyleExtension = true
  } = options;

  // Get the component implementation
  const Component = resolver(spec.type);

  if (!Component) {
    return development ? renderUnknownComponent(spec.type) : null;
  }

  // Create or inherit style context
  const styleContext = parentStyleContext || options.styleContext || (
    useStyleExtension && theme && (theme as ThemeSpecification).styleExtension
      ? (() => {
          const tokens = createTokenResolver(
            theme as ThemeSpecification, 
            createTokenCollection(extractTokensFromTheme(theme as ThemeSpecification))
          );
          return {
            theme: theme as ThemeSpecification,
            tokens,
            componentPath: []
          };
        })()
      : undefined
  );

  // Process style overrides from theme
  const styleOverrides = applyStyleOverrides(spec, theme, styleContext);
  
  // Create child style context
  const childStyleContext = styleContext && useStyleExtension
    ? createChildStyleContext(styleContext, spec, styleOverrides)
    : undefined;

  // Render children with style context
  const children = renderChildren(spec, options, parentContext, childStyleContext);
  
  // Build component props
  const componentProps = buildComponentProps(
    spec, 
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
      <ErrorBoundary 
        componentType={spec.type}
        onError={onError}
      >
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
 */
export function render(
  specification: UISpecification | ComponentSpec,
  options: RenderOptions = {}
): React.ReactElement | null {
  // If the specification has a `root` property, it's a full UISpecification
  // Otherwise, it's a ComponentSpec
  const componentSpec = isComponentSpec(specification)
    ? specification
    : specification.root;

  // If we have a full specification with theme but no theme in options, use it
  const effectiveOptions: RenderOptions = {
    ...options,
    theme: options.theme || (specification && !isComponentSpec(specification) ? specification.theme as Record<string, unknown> : undefined),
    initialState: options.initialState || (specification && !isComponentSpec(specification) ? specification.state?.initial : undefined)
  };

  return renderComponent(componentSpec, effectiveOptions);
}