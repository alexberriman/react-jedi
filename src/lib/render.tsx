import * as React from "react";
import {
  type ComponentProps,
  type ComponentResolver,
  type ComponentSpec,
  type RenderOptions,
  type UISpecification
} from "@/types/schema/components";
import { isComponentSpec, isComponentSpecArray, isTextContent } from "@/types/schema/guards";

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
  constructor(props: any) {
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

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          <p>Error rendering component: {this.props.componentType}</p>
          <p className="text-sm mt-2 font-mono">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Default component resolver function
 * Maps component type strings to their React implementations
 */
const defaultComponentResolver: ComponentResolver = (type: string) => {
  // Import all UI components dynamically
  // This allows for code splitting and lazy loading
  try {
    // Dynamically require the component based on type
    // This is a placeholder approach - in practice, we would
    // have a more sophisticated registry mechanism
    const componentModule = require(`@/components/ui/${type.toLowerCase()}`);
    return componentModule[type];
  } catch (error) {
    console.warn(`Component type "${type}" not found`);
    return null;
  }
};

/**
 * Renders a component spec into a React element
 */
function renderComponent(
  spec: ComponentSpec,
  options: RenderOptions = {},
  parentContext: Record<string, unknown> = {}
): React.ReactNode {
  const {
    resolver = defaultComponentResolver,
    theme = {},
    initialState = {},
    development = false,
    errorBoundaries = true,
    onError
  } = options;

  // Get the component implementation
  const Component = resolver(spec.type);

  if (!Component) {
    if (development) {
      return (
        <div className="p-2 border border-dashed border-yellow-500 bg-yellow-50 rounded">
          <p className="text-sm text-yellow-700">
            Unknown component type: <code>{spec.type}</code>
          </p>
        </div>
      );
    }
    return null;
  }

  // Render children
  let children: React.ReactNode = null;

  if (spec.children) {
    if (isTextContent(spec.children)) {
      // Text content
      children = spec.children;
    } else if (isComponentSpec(spec.children)) {
      // Single child component
      children = renderComponent(spec.children, options, {
        ...parentContext,
        parent: { type: spec.type, id: spec.id }
      });
    } else if (isComponentSpecArray(spec.children)) {
      // Multiple child components
      children = spec.children.map((child, index) =>
        React.createElement(
          React.Fragment,
          { key: child.id || `${spec.type}-child-${index}` },
          renderComponent(child, options, {
            ...parentContext,
            parent: { type: spec.type, id: spec.id }
          })
        )
      );
    }
  }

  // Prepare props for the component
  const componentProps: ComponentProps = {
    spec,
    children,
    theme,
    state: initialState,
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
    Object.entries(spec.data).forEach(([key, value]) => {
      componentProps[`data-${key}`] = value;
    });
  }

  // Apply test ID
  if (spec.testId) {
    componentProps["data-testid"] = spec.testId;
  }

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
): React.ReactElement {
  // Handle different input types
  if ("root" in specification) {
    // It's a complete UI specification
    const { root, theme, state } = specification;
    return renderComponent(root, {
      ...options,
      theme: { ...options.theme, ...theme },
      initialState: { ...options.initialState, ...state }
    }) as React.ReactElement;
  } else {
    // It's a single component spec
    return renderComponent(specification, options) as React.ReactElement;
  }
}

/**
 * Create a component resolver that combines multiple resolvers
 * 
 * This allows for extensibility by combining custom resolvers with the default one.
 * 
 * @param resolvers Array of component resolvers
 * @returns Combined resolver function
 */
export function createResolver(...resolvers: ComponentResolver[]): ComponentResolver {
  return (type: string) => {
    for (const resolver of resolvers) {
      const component = resolver(type);
      if (component) {
        return component;
      }
    }
    return null;
  };
}

/**
 * Create a registry-based component resolver
 * 
 * This creates a resolver based on a map of component types to implementations.
 * 
 * @param registry Map of component types to React component implementations
 * @returns Resolver function
 */
export function createRegistryResolver(
  registry: Record<string, React.ComponentType<any>>
): ComponentResolver {
  return (type: string) => registry[type] || null;
}