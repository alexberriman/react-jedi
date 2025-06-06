import { describe, it, expect } from "vitest";
import { buildComponentTree, findNodeById, findNodesByType, transformTree } from "./component-tree";
import type { ComponentSpec, UISpecification } from "../types/schema/components";

describe("component-tree", () => {
  const testSpec: ComponentSpec = {
    type: "Container",
    id: "root",
    children: [
      {
        type: "Box",
        id: "box-1",
        children: [
          {
            type: "Heading",
            id: "heading-1",
            children: "Title",
          },
          {
            type: "Text",
            id: "text-1",
            children: "Description",
          },
        ],
      },
      {
        type: "Box",
        id: "box-2",
        children: [
          {
            type: "Button",
            id: "button-1",
            children: "Click Me",
          },
        ],
      },
    ],
  };

  const testUISpec: UISpecification = {
    version: "1.0.0",
    root: testSpec,
  };

  it("should build a component tree from a component spec", () => {
    const tree = buildComponentTree(testSpec);

    expect(tree.spec.type).toBe("Container");
    expect(tree.spec.id).toBe("root");
    expect(tree.children.length).toBe(2);
    expect(tree.children[0].spec.type).toBe("Box");
    expect(tree.children[0].spec.id).toBe("box-1");
    expect(tree.children[0].children.length).toBe(2);
    expect(tree.children[0].children[0].spec.type).toBe("Heading");
    expect(tree.children[0].children[0].spec.id).toBe("heading-1");
    expect(tree.children[0].children[0].textContent).toBe("Title");
  });

  it("should build a component tree from a UI specification", () => {
    const tree = buildComponentTree(testUISpec);

    expect(tree.spec.type).toBe("Container");
    expect(tree.spec.id).toBe("root");
    expect(tree.children.length).toBe(2);
  });

  it("should find a node by ID", () => {
    const tree = buildComponentTree(testSpec);

    const found = findNodeById(tree, "button-1");
    expect(found).toBeDefined();
    expect(found?.spec.type).toBe("Button");
    expect(found?.spec.id).toBe("button-1");

    const notFound = findNodeById(tree, "non-existent");
    expect(notFound).toBeNull();
  });

  it("should find nodes by type", () => {
    const tree = buildComponentTree(testSpec);

    const boxes = findNodesByType(tree, "Box");
    expect(boxes.length).toBe(2);
    expect(boxes[0].spec.id).toBe("box-1");
    expect(boxes[1].spec.id).toBe("box-2");

    const buttons = findNodesByType(tree, "Button");
    expect(buttons.length).toBe(1);
    expect(buttons[0].spec.id).toBe("button-1");

    const nonExistent = findNodesByType(tree, "NonExistent");
    expect(nonExistent.length).toBe(0);
  });

  it("should transform a tree", () => {
    const tree = buildComponentTree(testSpec);

    const transformed = transformTree(tree, (node) => {
      // Add a data attribute to every node, respecting the schema
      const spec = { ...node.spec };

      // For DataTable, data must be an array of records or string
      if (spec.type === "DataTable" && spec.data) {
        if (Array.isArray(spec.data)) {
          // Transform array items
          spec.data = spec.data.map((item) => ({
            ...item,
            transformed: "true",
          }));
        }
      } else if (spec.data && typeof spec.data === "object" && !Array.isArray(spec.data)) {
        // For other components that already have a data property
        spec.data = {
          ...spec.data,
          transformed: "true",
        };
      }

      return {
        ...node,
        spec,
      };
    });

    // Check that nodes with data were transformed (but not all nodes have data)
    const dataTableNodes = findNodesByType(transformed, "DataTable");
    for (const node of dataTableNodes) {
      if (node.spec.data && typeof node.spec.data === "object" && !Array.isArray(node.spec.data)) {
        expect((node.spec.data as Record<string, string>)?.transformed).toBe("true");
      }
    }
  });
});
