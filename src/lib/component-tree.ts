import type { ComponentSpec, UISpecification } from "@/types/schema/components";
import { isComponentSpec, isComponentSpecArray, isTextContent } from "@/types/schema/guards";

/**
 * Tree node representing a component in the component tree
 */
export interface ComponentNode {
  /**
   * Component specification
   */
  spec: ComponentSpec;
  
  /**
   * Parent node (null for root node)
   */
  parent: ComponentNode | null;
  
  /**
   * Child nodes
   */
  children: ComponentNode[];
  
  /**
   * Text content (if this is a text node)
   */
  textContent?: string;
}

/**
 * Build a component tree from a UI specification
 * 
 * This function transforms a flat UI specification into a hierarchical
 * component tree that can be traversed and manipulated.
 * 
 * @param spec UI specification or component specification
 * @returns Root component node
 */
export function buildComponentTree(
  spec: UISpecification | ComponentSpec
): ComponentNode {
  // If it's a complete UI specification, use the root component
  const rootSpec: ComponentSpec = "root" in spec ? (spec as UISpecification).root : spec as ComponentSpec;
  
  // Create the root node
  const rootNode: ComponentNode = {
    spec: rootSpec,
    parent: null,
    children: [],
  };
  
  // Process the root's children
  processChildren(rootNode);
  
  return rootNode;
}

/**
 * Process children of a component node
 * 
 * This recursive function builds the component tree by processing
 * the children of each component node.
 * 
 * @param node Component node to process
 */
function processChildren(node: ComponentNode): void {
  const { spec } = node;
  
  if (!spec.children) return;
  
  if (isTextContent(spec.children)) {
    // Text content
    node.textContent = spec.children;
  } else if (isComponentSpec(spec.children)) {
    // Single child component
    const childNode: ComponentNode = {
      spec: spec.children,
      parent: node,
      children: [],
    };
    
    node.children.push(childNode);
    processChildren(childNode);
  } else if (isComponentSpecArray(spec.children)) {
    // Multiple child components
    for (const childSpec of spec.children) {
      const childNode: ComponentNode = {
        spec: childSpec,
        parent: node,
        children: [],
      };
      
      node.children.push(childNode);
      processChildren(childNode);
    }
  }
}

/**
 * Find a component node by ID in the component tree
 * 
 * This function searches the component tree for a node with
 * the specified ID.
 * 
 * @param root Root component node
 * @param id Component ID to find
 * @returns Component node or null if not found
 */
export function findNodeById(
  root: ComponentNode,
  id: string
): ComponentNode | null {
  if (root.spec.id === id) {
    return root;
  }
  
  for (const child of root.children) {
    const found = findNodeById(child, id);
    if (found) {
      return found;
    }
  }
  
  return null;
}

/**
 * Find component nodes by type in the component tree
 * 
 * This function searches the component tree for nodes with
 * the specified component type.
 * 
 * @param root Root component node
 * @param type Component type to find
 * @returns Array of matching component nodes
 */
export function findNodesByType(
  root: ComponentNode,
  type: string
): ComponentNode[] {
  const results: ComponentNode[] = [];
  
  if (root.spec.type === type) {
    results.push(root);
  }
  
  for (const child of root.children) {
    results.push(...findNodesByType(child, type));
  }
  
  return results;
}

/**
 * Transform a component tree
 * 
 * This function applies a transformation function to each node
 * in the component tree, creating a new tree with the transformed nodes.
 * 
 * @param root Root component node
 * @param transform Transformation function
 * @returns Transformed component tree
 */
export function transformTree(
  root: ComponentNode,
  transform: (node: ComponentNode) => ComponentNode
): ComponentNode {
  // Apply transform to this node
  const transformedNode = transform(root);
  
  // Apply transform to children
  const transformedChildren = transformedNode.children.map(
    child => transformTree(child, transform)
  );
  
  // Update children
  transformedNode.children = transformedChildren;
  
  // Update parent references
  for (const child of transformedNode.children) {
    child.parent = transformedNode;
  }
  
  return transformedNode;
}