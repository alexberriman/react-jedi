import type { ComponentSpec } from "../../types/schema/components";
import type { ComponentChildren } from "../../types/schema/base";

/**
 * Converts React children to spec-compatible format
 */
function convertChildren(children: unknown): unknown {
  if (!children) return undefined;
  
  // String or number children
  if (typeof children === 'string' || typeof children === 'number') {
    return children;
  }
  
  // React element
  if (typeof children === 'object' && children !== null && 'props' in children) {
    const element = children as {
      type?: string | symbol | { name?: string };
      props?: Record<string, unknown> & { children?: unknown };
    };
    
    // Handle arrays of elements
    if (Array.isArray(element)) {
      return element.map(child => convertChildren(child)).filter(Boolean);
    }
    
    // Fragment with children
    if (element.type === Symbol.for('react.fragment') && element.props?.children) {
      return convertChildren(element.props.children);
    }
    
    // Regular React element - try to convert to spec
    if (element.type && typeof element.type === 'function' && element.type.name) {
      return {
        type: element.type.name,
        ...element.props,
        children: convertChildren(element.props?.children)
      };
    }
  }
  
  // Array of children
  if (Array.isArray(children)) {
    const converted = children.map(child => convertChildren(child)).filter(Boolean);
    return converted.length > 0 ? converted : undefined;
  }
  
  return children;
}

/**
 * Converts Storybook args to a component specification
 */
export function convertArgsToSpec(args: Record<string, unknown>, componentId?: string): ComponentSpec {
  // Extract component name from componentId (e.g., "components-text--default" -> "Text")
  let componentType = 'Component';
  if (componentId) {
    const regex = /components-(\w+)--/i;
    const match = regex.exec(componentId);
    if (match) {
      componentType = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    }
  }
  
  const { children, ...restArgs } = args;
  
  const spec: ComponentSpec = {
    type: componentType,
    ...restArgs
  };
  
  // Convert children
  const convertedChildren = convertChildren(children);
  if (convertedChildren !== undefined) {
    spec.children = convertedChildren as ComponentChildren;
  }
  
  return spec;
}

/**
 * For complex rendered stories, extract the spec from the render function
 */
export function extractSpecFromRender(renderFn: () => React.JSX.Element): ComponentSpec | null {
  try {
    // This is a simplified version - in practice, you might need more sophisticated parsing
    const element = renderFn();
    if (element && typeof element === 'object' && 'props' in element) {
      return convertArgsToSpec(element.props);
    }
  } catch (error) {
    console.error('Failed to extract spec from render function:', error);
  }
  return null;
}