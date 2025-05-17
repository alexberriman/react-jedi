import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Stagger, StaggerList, StaggerContainer, StaggerItem, staggerPresets } from "./stagger";
import { TargetAndTransition, Variants } from "framer-motion";
import { AnimationProvider } from "./animation-provider";
import {
  createStaggerContainer,
  createStaggerSequence,
  createDirectionalStagger,
  createScaleStagger,
  createRotateStagger,
  createPathStagger,
  createFilterStagger,
  createComplexStagger,
} from "./stagger-utils";

// Helper function for type assertions in tests
interface TypedRenderResult extends RenderResult {
  getByTestId: (id: string) => HTMLElement;
}

// Helper for rendering with AnimationProvider
const renderWithAnimationProvider = (ui: React.ReactElement): RenderResult => {
  return render(<AnimationProvider>{ui}</AnimationProvider>);
};

const typedRender = (ui: React.ReactElement): TypedRenderResult => {
  return renderWithAnimationProvider(ui) as unknown as TypedRenderResult;
};

// Helper for variants function testing
const callVariantFunction = (variantFn: unknown, index: number): TargetAndTransition => {
  if (typeof variantFn === "function") {
    return variantFn(index) as TargetAndTransition;
  }
  throw new Error("Not a function");
};

// Helper function to validate property existence in variants
function testPropertyExists(variants: Variants, property: string): void {
  if ("initial" in variants && typeof variants.initial === "object") {
    expect(variants.initial).toHaveProperty(property);
  }
}

// Helper function to test Y value direction
function testYDirection(variants: Variants, isGreaterThanZero: boolean): void {
  if (
    "initial" in variants &&
    typeof variants.initial === "object" &&
    "y" in variants.initial &&
    typeof variants.initial.y === "number"
  ) {
    if (isGreaterThanZero) {
      expect(variants.initial.y).toBeGreaterThan(0);
    } else {
      expect(variants.initial.y).toBeLessThan(0);
    }
  }
}

// Helper function to test X value direction
function testXDirection(variants: Variants, isGreaterThanZero: boolean): void {
  if (
    "initial" in variants &&
    typeof variants.initial === "object" &&
    "x" in variants.initial &&
    typeof variants.initial.x === "number"
  ) {
    if (isGreaterThanZero) {
      expect(variants.initial.x).toBeGreaterThan(0);
    } else {
      expect(variants.initial.x).toBeLessThan(0);
    }
  }
}

describe("Stagger Component", () => {
  it("renders children correctly", () => {
    const result = typedRender(
      <Stagger>
        <div data-testid="stagger-item-1">Item 1</div>
        <div data-testid="stagger-item-2">Item 2</div>
        <div data-testid="stagger-item-3">Item 3</div>
      </Stagger>
    );

    expect(result.getByTestId("stagger-item-1")).toBeInTheDocument();
    expect(result.getByTestId("stagger-item-2")).toBeInTheDocument();
    expect(result.getByTestId("stagger-item-3")).toBeInTheDocument();
  });

  it("applies custom className to the container", () => {
    const { container } = renderWithAnimationProvider(
      <Stagger className="test-class">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>
    );

    expect(container.firstChild).toHaveClass("test-class");
  });

  it("applies custom childClassName to the children", () => {
    const { container } = renderWithAnimationProvider(
      <Stagger childClassName="child-class">
        <div data-testid="item-1-unique">Item 1</div>
        <div data-testid="item-2-unique">Item 2</div>
      </Stagger>
    );

    // Find the child motion divs directly
    const childWrappers = container.querySelectorAll(".child-class");
    expect(childWrappers.length).toBe(2);
    expect(childWrappers[0]).toHaveClass("child-class");
    expect(childWrappers[1]).toHaveClass("child-class");
  });

  it("calls onAnimationStart when autoStart is true", () => {
    const onAnimationStart = vi.fn();

    renderWithAnimationProvider(
      <Stagger autoStart={true} onAnimationStart={onAnimationStart}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>
    );

    expect(onAnimationStart).toHaveBeenCalledTimes(1);
  });

  it("doesn't call onAnimationStart when autoStart is false", () => {
    const onAnimationStart = vi.fn();

    renderWithAnimationProvider(
      <Stagger autoStart={false} onAnimationStart={onAnimationStart}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>
    );

    expect(onAnimationStart).not.toHaveBeenCalled();
  });

  it("uses custom element type when 'as' prop is provided", () => {
    const { container } = renderWithAnimationProvider(
      <Stagger as="ul">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>
    );

    // Check that the container is a ul element
    expect(container.firstChild?.nodeName.toLowerCase()).toBe("ul");
  });
});

describe("StaggerList Component", () => {
  const testItems = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ];

  it("renders the list with correct items", () => {
    const result = typedRender(
      <StaggerList
        items={testItems}
        renderItem={(item) => <div data-testid={`list-item-${item.id}`}>{item.text}</div>}
      />
    );

    expect(result.getByTestId("list-item-1")).toBeInTheDocument();
    expect(result.getByTestId("list-item-2")).toBeInTheDocument();
    expect(result.getByTestId("list-item-3")).toBeInTheDocument();
  });

  it("uses keyExtractor to generate keys", () => {
    const keyExtractor = vi.fn((item) => `key-${item.id}`);

    renderWithAnimationProvider(
      <StaggerList
        items={testItems}
        renderItem={(item) => <div>{item.text}</div>}
        keyExtractor={keyExtractor}
      />
    );

    expect(keyExtractor).toHaveBeenCalledTimes(testItems.length);
  });

  it("creates the list with specified listType", () => {
    const { container } = renderWithAnimationProvider(
      <StaggerList items={testItems} renderItem={(item) => <div>{item.text}</div>} listType="ol" />
    );

    expect(container.firstChild?.nodeName.toLowerCase()).toBe("ol");
  });
});

describe("StaggerContainer and StaggerItem Components", () => {
  it("renders StaggerContainer with StaggerItem children", () => {
    const { container } = renderWithAnimationProvider(
      <StaggerContainer>
        <StaggerItem>
          <div data-testid="container-item-1">Item 1</div>
        </StaggerItem>
        <StaggerItem>
          <div data-testid="container-item-2">Item 2</div>
        </StaggerItem>
      </StaggerContainer>
    );

    const item1 = container.querySelector('[data-testid="container-item-1"]');
    const item2 = container.querySelector('[data-testid="container-item-2"]');

    expect(item1).not.toBeNull();
    expect(item2).not.toBeNull();
  });

  it("applies custom element types to StaggerItem", () => {
    const { container } = renderWithAnimationProvider(
      <StaggerContainer>
        <StaggerItem as="li">
          <div data-testid="stagger-item-custom-1">Item 1</div>
        </StaggerItem>
      </StaggerContainer>
    );

    // Find the rendered list item that contains our element
    const listItem = container.querySelector("li");
    expect(listItem).not.toBeNull();
    expect(
      listItem?.contains(container.querySelector('[data-testid="stagger-item-custom-1"]'))
    ).toBe(true);
  });

  it("forwards index to StaggerItem components", () => {
    // Using a custom StaggerItem to capture the index
    type CustomItemProps = {
      index?: number;
      children: React.ReactNode;
      [key: string]: unknown;
    };

    const CustomStaggerItem = ({ index, children, ...props }: CustomItemProps) => (
      <div data-testid={`item-${index}`} {...props}>
        {children}
      </div>
    );

    const result = typedRender(
      <StaggerContainer>
        <CustomStaggerItem>Item 1</CustomStaggerItem>
        <CustomStaggerItem>Item 2</CustomStaggerItem>
      </StaggerContainer>
    );

    expect(result.getByTestId("item-0")).toBeInTheDocument();
    expect(result.getByTestId("item-1")).toBeInTheDocument();
  });
});

describe("Stagger Animation Presets", () => {
  it("has all required animation presets", () => {
    const requiredPresets = [
      "fadeIn",
      "slideUp",
      "slideDown",
      "slideLeft",
      "slideRight",
      "scaleUp",
      "scaleDown",
      "rotate",
      "flipX",
      "flipY",
      "bounce",
      "elastic",
      "expandOut",
      "flash",
      "subtle",
      "blur",
    ];

    for (const preset of requiredPresets) {
      expect(staggerPresets).toHaveProperty(preset);
      expect(staggerPresets[preset as keyof typeof staggerPresets]).toHaveProperty("initial");
      expect(staggerPresets[preset as keyof typeof staggerPresets]).toHaveProperty("animate");
    }
  });
});

describe("Stagger Utility Functions", () => {
  it("createStaggerContainer returns valid variants object", () => {
    const variants = createStaggerContainer({ staggerDelay: 0.2, delayStart: 0.1 });

    expect(variants).toHaveProperty("initial");
    expect(variants).toHaveProperty("animate");
    expect(variants).toHaveProperty("exit");

    // Type-safe access to transition properties
    const animateObj = variants.animate;
    if (animateObj && typeof animateObj === "object" && "transition" in animateObj) {
      const transition = animateObj.transition;
      if (transition && typeof transition === "object") {
        expect(transition).toHaveProperty("staggerChildren", 0.2);
        expect(transition).toHaveProperty("delayChildren", 0.1);
      }
    }
  });

  it("createStaggerSequence returns dynamic variants with custom function", () => {
    const variants = createStaggerSequence("fadeIn", { staggerDelay: 0.2 });

    expect(variants).toHaveProperty("initial");
    expect(variants).toHaveProperty("animate");
    expect(variants).toHaveProperty("exit");
    expect(typeof variants.animate).toBe("function");

    // Test the animate function with our helper
    if (typeof variants.animate === "function") {
      const animateProps = callVariantFunction(variants.animate, 2);
      expect(animateProps).toHaveProperty("transition");

      // Safe access to transition
      if (
        "transition" in animateProps &&
        animateProps.transition &&
        typeof animateProps.transition === "object"
      ) {
        expect(animateProps.transition).toHaveProperty("delay");
      }
    }
  });

  it("createDirectionalStagger creates variants with directional properties", () => {
    const upVariants = createDirectionalStagger("up");
    const downVariants = createDirectionalStagger("down");
    const leftVariants = createDirectionalStagger("left");
    const rightVariants = createDirectionalStagger("right");

    // Test property existence
    testPropertyExists(upVariants, "y");
    testPropertyExists(downVariants, "y");
    testPropertyExists(leftVariants, "x");
    testPropertyExists(rightVariants, "x");

    // Test Y value directions
    testYDirection(upVariants, true);
    testYDirection(downVariants, false);

    // Test X value directions
    testXDirection(leftVariants, false);
    testXDirection(rightVariants, true);
  });

  it("createScaleStagger creates variants with scale properties", () => {
    const uniformVariants = createScaleStagger("uniform");
    const horizontalVariants = createScaleStagger("horizontal");
    const verticalVariants = createScaleStagger("vertical");

    if ("initial" in uniformVariants && typeof uniformVariants.initial === "object") {
      expect(uniformVariants.initial).toHaveProperty("scale");
    }

    if ("initial" in horizontalVariants && typeof horizontalVariants.initial === "object") {
      expect(horizontalVariants.initial).toHaveProperty("scaleX");
    }

    if ("initial" in verticalVariants && typeof verticalVariants.initial === "object") {
      expect(verticalVariants.initial).toHaveProperty("scaleY");
    }
  });

  it("createRotateStagger creates variants with rotation properties", () => {
    const clockwiseVariants = createRotateStagger("clockwise");
    const counterclockwiseVariants = createRotateStagger("counterclockwise");

    if ("initial" in clockwiseVariants && typeof clockwiseVariants.initial === "object") {
      expect(clockwiseVariants.initial).toHaveProperty("rotate");
    }

    if (
      "initial" in counterclockwiseVariants &&
      typeof counterclockwiseVariants.initial === "object"
    ) {
      expect(counterclockwiseVariants.initial).toHaveProperty("rotate");
    }

    // Type-safe comparison of rotate values
    if (
      "initial" in clockwiseVariants &&
      typeof clockwiseVariants.initial === "object" &&
      "rotate" in clockwiseVariants.initial &&
      typeof clockwiseVariants.initial.rotate === "number"
    ) {
      expect(clockwiseVariants.initial.rotate).toBeLessThan(0);
    }

    if (
      "initial" in counterclockwiseVariants &&
      typeof counterclockwiseVariants.initial === "object" &&
      "rotate" in counterclockwiseVariants.initial &&
      typeof counterclockwiseVariants.initial.rotate === "number"
    ) {
      expect(counterclockwiseVariants.initial.rotate).toBeGreaterThan(0);
    }
  });

  it("createPathStagger creates variants with path properties", () => {
    const arcVariants = createPathStagger({ path: "arc" });

    expect(typeof arcVariants.initial).toBe("function");

    // Type-safe testing of the function with our helper
    if (typeof arcVariants.initial === "function") {
      const initialProps = callVariantFunction(arcVariants.initial, 0);
      expect(initialProps).toHaveProperty("x");
      expect(initialProps).toHaveProperty("y");
    }
  });

  it("createFilterStagger creates variants with filter properties", () => {
    const blurVariants = createFilterStagger({ filter: "blur" });

    if (
      "initial" in blurVariants &&
      typeof blurVariants.initial === "object" &&
      "filter" in blurVariants.initial
    ) {
      expect(blurVariants.initial.filter).toContain("blur");
    }
  });

  it("createComplexStagger creates variants with multiple effects", () => {
    const complexVariants = createComplexStagger({
      effects: ["fade", "slide", "scale", "rotate", "blur"],
      direction: "up",
    });

    if ("initial" in complexVariants && typeof complexVariants.initial === "object") {
      expect(complexVariants.initial).toHaveProperty("opacity");
      expect(complexVariants.initial).toHaveProperty("y");
      expect(complexVariants.initial).toHaveProperty("scale");
      expect(complexVariants.initial).toHaveProperty("rotate");
      expect(complexVariants.initial).toHaveProperty("filter");
    }
  });
});
