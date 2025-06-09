import type { ComponentSpec } from "../../src/types/schema/components";
import type { ComponentChildren } from "../../src/types/schema/base";

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

// Map of special component name conversions
const COMPONENT_NAME_MAP: Record<string, string> = {
  blockquote: 'BlockQuote',
  inputotp: 'InputOTP',
  alertdialog: 'AlertDialog',
  dropdownmenu: 'DropdownMenu',
  hovercard: 'HoverCard',
  radiogroup: 'RadioGroup',
  scrollarea: 'ScrollArea',
  togglegroup: 'ToggleGroup',
  simplegrid: 'SimpleGrid',
  datepicker: 'DatePicker',
  aspectratio: 'AspectRatio',
  datatable: 'DataTable',
  contextmenu: 'ContextMenu',
  breadcrumb: 'Breadcrumb',
  skeletonloader: 'SkeletonLoader',
  navigationmenu: 'NavigationMenu',
  headmanager: 'HeadManager',
  announcementbar: 'AnnouncementBar',
  blogpostdetail: 'BlogPostDetail',
  blogpostgrid: 'BlogPostGrid',
  brandlogobar: 'BrandLogoBar',
  calltoaction: 'CallToAction',
  carouselblock: 'CarouselBlock',
  contactformblock: 'ContactFormBlock',
  joblistings: 'JobListings',
};

/**
 * Converts Storybook args to a component specification
 */
export function convertArgsToSpec(args: Record<string, unknown>, componentId?: string): ComponentSpec {
  // Extract component name from componentId (e.g., "components-blockquote--default" -> "BlockQuote", "blocks-announcementbar--default" -> "AnnouncementBar")
  let componentType = 'Component';
  if (componentId) {
    const regex = /(components|blocks)-([^-]+)--/i;
    const match = regex.exec(componentId);
    if (match) {
      const name = match[2].toLowerCase();
      
      // Check if we have a specific mapping for this component
      componentType = COMPONENT_NAME_MAP[name] || 
        name
          .split(/[-_]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
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