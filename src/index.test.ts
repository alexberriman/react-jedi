import { describe, it, expect } from "vitest";
import { createJedi, VERSION } from "./index";
import type { ComponentSpec } from "./types/schema/components";

describe("createJedi", () => {
  it("should return an object with version", () => {
    const jedi = createJedi();
    expect(jedi.version).toBe("1.0.0");
  });

  it("should create a Jedi instance with default options", () => {
    const jedi = createJedi();
    
    expect(jedi.version).toBe(VERSION);
    expect(jedi.options.development).toBe(false);
    expect(jedi.options.theme).toEqual({});
    expect(jedi.options.handlers).toEqual({});
    expect(jedi.options.resolver).toBeDefined();
  });
  
  it("should create a Jedi instance with custom options", () => {
    const customOptions = {
      development: true,
      theme: { color: "blue" },
      handlers: { click: () => {} },
    };
    
    const jedi = createJedi(customOptions);
    
    expect(jedi.options.development).toBe(true);
    expect(jedi.options.theme).toEqual({ color: "blue" });
    expect(jedi.options.handlers).toEqual({ click: expect.any(Function) });
  });
  
  it("should have render and buildTree methods", () => {
    const jedi = createJedi();
    
    expect(jedi.render).toBeInstanceOf(Function);
    expect(jedi.buildTree).toBeInstanceOf(Function);
  });
  
  it("should build a component tree", () => {
    const jedi = createJedi();
    
    const spec: ComponentSpec = {
      type: "Container",
      children: [
        {
          type: "Box",
          children: "Hello World",
        },
      ],
    };
    
    const tree = jedi.buildTree(spec);
    
    expect(tree.spec.type).toBe("Container");
    expect(tree.children.length).toBe(1);
    expect(tree.children[0].spec.type).toBe("Box");
    expect(tree.children[0].textContent).toBe("Hello World");
  });
});