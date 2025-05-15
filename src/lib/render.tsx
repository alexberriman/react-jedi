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
 * Renders a component spec into a React element
 */
function renderComponent(
  spec: ComponentSpec,
  options: RenderOptions = {},
  parentContext: Record<string, unknown> = {}
): React.ReactElement | null {
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
      // Return a JSX element placeholder
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
      const childComponent = renderComponent(spec.children, options, {
        ...parentContext,
        parent: { type: spec.type, id: spec.id }
      });
      // Ensure we handle null case
      children = childComponent || <></>;
    } else if (isComponentSpecArray(spec.children)) {
      // Multiple child components
      children = spec.children.map((child, index) => {
        const renderedChild = renderComponent(child, options, {
          ...parentContext,
          parent: { type: spec.type, id: spec.id }
        });
        
        return React.createElement(
          React.Fragment,
          { key: child.id || `${spec.type}-child-${index}` },
          // Ensure we handle null case
          renderedChild || <></>
        );
      });
    }
  }

  // The mock components in the test are directly extracting spec, so we need to make sure
  // spec.a11y, spec.data, and spec.testId are preserved in the props
  const componentProps: ExtendedComponentProps = {
    // Make sure spec includes all the original properties by creating a fresh copy
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
    for (const [key, value] of Object.entries(spec.data)) {
      componentProps[`data-${key}`] = value;
    }
  }

  // Apply test ID
  if (spec.testId) {
    componentProps["data-testid"] = spec.testId;
  }

  // Create the React element - componentProps already matches the ComponentProps type
  // that our components are adapted to accept
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
  // Handle different input types
  if ("root" in specification) {
    // It's a complete UI specification
    const { root, theme, state } = specification;
    return renderComponent(root, {
      ...options,
      theme: { ...options.theme, ...theme },
      initialState: { ...options.initialState, ...state }
    });
  } else {
    // It's a single component spec
    return renderComponent(specification, options);
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
 * All components are adapted to accept our standard ComponentProps interface.
 * 
 * @param registry Map of component types to React component implementations
 * @returns Resolver function
 */
export function createRegistryResolver(
  registry: Record<string, ComponentType>
): ComponentResolver {
  return (type: string) => registry[type] || null;
}