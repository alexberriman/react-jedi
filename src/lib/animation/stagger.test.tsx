import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Stagger, StaggerList, StaggerContainer, StaggerItem, staggerPresets } from "./stagger";
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

describe("Stagger Component", () => {
  it("renders children correctly", () => {
    render(
      <Stagger>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
        <div data-testid="item-3">Item 3</div>
      </Stagger>
    );

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
  });

  it("applies custom className to the container", () => {
    const { container } = render(
      <Stagger className="test-class">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>
    );

    expect(container.firstChild).toHaveClass("test-class");
  });

  it("applies custom childClassName to the children", () => {
    render(
      <Stagger childClassName="child-class">
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
      </Stagger>
    );

    const item1 = screen.getByTestId("item-1").parentElement;
    const item2 = screen.getByTestId("item-2").parentElement;

    expect(item1).toHaveClass("child-class");
    expect(item2).toHaveClass("child-class");
  });

  it("calls onAnimationStart when autoStart is true", () => {
    const onAnimationStart = vi.fn();

    render(
      <Stagger autoStart={true} onAnimationStart={onAnimationStart}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>
    );

    expect(onAnimationStart).toHaveBeenCalledTimes(1);
  });

  it("doesn't call onAnimationStart when autoStart is false", () => {
    const onAnimationStart = vi.fn();

    render(
      <Stagger autoStart={false} onAnimationStart={onAnimationStart}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>
    );

    expect(onAnimationStart).not.toHaveBeenCalled();
  });

  it("uses custom element type when 'as' prop is provided", () => {
    const { container } = render(
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
    render(
      <StaggerList
        items={testItems}
        renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.text}</div>}
      />
    );

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
  });

  it("uses keyExtractor to generate keys", () => {
    const keyExtractor = vi.fn((item) => `key-${item.id}`);

    render(
      <StaggerList
        items={testItems}
        renderItem={(item) => <div>{item.text}</div>}
        keyExtractor={keyExtractor}
      />
    );

    expect(keyExtractor).toHaveBeenCalledTimes(testItems.length);
  });

  it("creates the list with specified listType", () => {
    const { container } = render(
      <StaggerList items={testItems} renderItem={(item) => <div>{item.text}</div>} listType="ol" />
    );

    expect(container.firstChild?.nodeName.toLowerCase()).toBe("ol");
  });
});

describe("StaggerContainer and StaggerItem Components", () => {
  it("renders StaggerContainer with StaggerItem children", () => {
    render(
      <StaggerContainer>
        <StaggerItem data-testid="item-1">Item 1</StaggerItem>
        <StaggerItem data-testid="item-2">Item 2</StaggerItem>
      </StaggerContainer>
    );

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
  });

  it("applies custom element types to StaggerItem", () => {
    render(
      <StaggerContainer>
        <StaggerItem as="li" data-testid="item-1">
          Item 1
        </StaggerItem>
      </StaggerContainer>
    );

    const item = screen.getByTestId("item-1");
    expect(item.nodeName.toLowerCase()).toBe("li");
  });

  it("forwards index to StaggerItem components", () => {
    // Using a custom StaggerItem to capture the index
    const CustomStaggerItem = ({
      index,
      children,
      ...props
    }: {
      index?: number;
      children: React.ReactNode;
      [key: string]: unknown;
    }) => (
      <div data-testid={`item-${index}`} {...props}>
        {children}
      </div>
    );

    render(
      <StaggerContainer>
        <CustomStaggerItem>Item 1</CustomStaggerItem>
        <CustomStaggerItem>Item 2</CustomStaggerItem>
      </StaggerContainer>
    );

    expect(screen.getByTestId("item-0")).toBeInTheDocument();
    expect(screen.getByTestId("item-1")).toBeInTheDocument();
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
    expect(variants.animate?.transition).toHaveProperty("staggerChildren", 0.2);
    expect(variants.animate?.transition).toHaveProperty("delayChildren", 0.1);
  });

  it("createStaggerSequence returns dynamic variants with custom function", () => {
    const variants = createStaggerSequence("fadeIn", { staggerDelay: 0.2 });

    expect(variants).toHaveProperty("initial");
    expect(variants).toHaveProperty("animate");
    expect(variants).toHaveProperty("exit");
    expect(typeof variants.animate).toBe("function");

    // Test the animate function
    const animateFunc = variants.animate as (i: number) => Record<string, unknown>;
    const animateProps = animateFunc(2);
    expect(animateProps).toHaveProperty("transition");
    expect(animateProps.transition).toHaveProperty("delay");
  });

  it("createDirectionalStagger creates variants with directional properties", () => {
    const upVariants = createDirectionalStagger("up");
    const downVariants = createDirectionalStagger("down");
    const leftVariants = createDirectionalStagger("left");
    const rightVariants = createDirectionalStagger("right");

    expect(upVariants.initial).toHaveProperty("y");
    expect(downVariants.initial).toHaveProperty("y");
    expect(leftVariants.initial).toHaveProperty("x");
    expect(rightVariants.initial).toHaveProperty("x");

    // Up and down should have different y directions
    expect(upVariants.initial.y).toBeGreaterThan(0);
    expect(downVariants.initial.y).toBeLessThan(0);

    // Left and right should have different x directions
    expect(leftVariants.initial.x).toBeLessThan(0);
    expect(rightVariants.initial.x).toBeGreaterThan(0);
  });

  it("createScaleStagger creates variants with scale properties", () => {
    const uniformVariants = createScaleStagger("uniform");
    const horizontalVariants = createScaleStagger("horizontal");
    const verticalVariants = createScaleStagger("vertical");

    expect(uniformVariants.initial).toHaveProperty("scale");
    expect(horizontalVariants.initial).toHaveProperty("scaleX");
    expect(verticalVariants.initial).toHaveProperty("scaleY");
  });

  it("createRotateStagger creates variants with rotation properties", () => {
    const clockwiseVariants = createRotateStagger("clockwise");
    const counterclockwiseVariants = createRotateStagger("counterclockwise");

    expect(clockwiseVariants.initial).toHaveProperty("rotate");
    expect(counterclockwiseVariants.initial).toHaveProperty("rotate");

    // They should rotate in opposite directions
    expect(clockwiseVariants.initial.rotate).toBeLessThan(0);
    expect(counterclockwiseVariants.initial.rotate).toBeGreaterThan(0);
  });

  it("createPathStagger creates variants with path properties", () => {
    const arcVariants = createPathStagger({ path: "arc" });

    expect(typeof arcVariants.initial).toBe("function");

    // Test the initial function
    const initialFunc = arcVariants.initial as (i: number) => Record<string, unknown>;
    const initialProps = initialFunc(0);
    expect(initialProps).toHaveProperty("x");
    expect(initialProps).toHaveProperty("y");
  });

  it("createFilterStagger creates variants with filter properties", () => {
    const blurVariants = createFilterStagger({ filter: "blur" });

    expect(blurVariants.initial).toHaveProperty("filter");
    expect(blurVariants.initial.filter).toContain("blur");
  });

  it("createComplexStagger creates variants with multiple effects", () => {
    const complexVariants = createComplexStagger({
      effects: ["fade", "slide", "scale", "rotate", "blur"],
      direction: "up",
    });

    expect(complexVariants.initial).toHaveProperty("opacity");
    expect(complexVariants.initial).toHaveProperty("y");
    expect(complexVariants.initial).toHaveProperty("scale");
    expect(complexVariants.initial).toHaveProperty("rotate");
    expect(complexVariants.initial).toHaveProperty("filter");
  });
});
