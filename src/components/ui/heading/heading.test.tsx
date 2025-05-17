import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./heading";

describe("Heading", () => {
  describe("spacing variants", () => {
    it("should apply no spacing when spacing is 'none'", () => {
      const { container } = render(<Heading spacing="none">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("font-heading", "tracking-tight");
      expect(heading).not.toHaveClass("mb-4");
    });

    it("should apply default spacing (lg)", () => {
      const { container } = render(<Heading>Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-4");
    });

    it("should apply xs spacing", () => {
      const { container } = render(<Heading spacing="xs">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-1");
    });

    it("should apply sm spacing", () => {
      const { container } = render(<Heading spacing="sm">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-2");
    });

    it("should apply md spacing", () => {
      const { container } = render(<Heading spacing="md">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-3");
    });

    it("should apply lg spacing", () => {
      const { container } = render(<Heading spacing="lg">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-4");
    });

    it("should apply xl spacing", () => {
      const { container } = render(<Heading spacing="xl">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-6");
    });

    it("should apply 2xl spacing", () => {
      const { container } = render(<Heading spacing="2xl">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-8");
    });

    it("should apply 3xl spacing", () => {
      const { container } = render(<Heading spacing="3xl">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-10");
    });

    it("should apply 4xl spacing", () => {
      const { container } = render(<Heading spacing="4xl">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-12");
    });

    it("should apply section spacing", () => {
      const { container } = render(<Heading spacing="section">Test Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("mb-16");
    });
  });

  describe("combined variants", () => {
    it("should combine spacing with other variants", () => {
      const { container } = render(
        <Heading level="h1" size="4xl" gradient="rainbow" spacing="2xl" align="center">
          Test Heading
        </Heading>
      );
      const heading = container.querySelector("h1");
      expect(heading).toHaveClass(
        "mb-8",
        "text-5xl",
        "lg:text-6xl",
        "text-center",
        "bg-gradient-to-r",
        "from-blue-500",
        "via-purple-500",
        "to-pink-500",
        "text-transparent",
        "bg-clip-text"
      );
    });
  });
});
