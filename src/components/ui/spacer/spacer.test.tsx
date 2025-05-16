import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Spacer } from "./spacer";
import { describe, it, expect } from "vitest";

describe("Spacer", () => {
  it("renders as a div by default", () => {
    const { container } = render(<Spacer />);
    const spacerElement = container.firstChild as HTMLElement;
    expect(spacerElement.tagName).toBe("DIV");
  });

  it("applies default vertical spacing", () => {
    const { container } = render(<Spacer />);
    const spacerElement = container.firstChild as HTMLElement;
    expect(spacerElement).toHaveStyle({ height: "1rem" }); // md size is 1rem
  });

  it("applies horizontal spacing when orientation is horizontal", () => {
    const { container } = render(<Spacer orientation="horizontal" />);
    const spacerElement = container.firstChild as HTMLElement;
    expect(spacerElement).toHaveStyle({ width: "1rem" });
  });

  it("renders different sizes correctly", () => {
    const { container: containerXs } = render(<Spacer size="xs" />);
    const { container: containerLg } = render(<Spacer size="lg" />);
    const { container: container2xl } = render(<Spacer size="2xl" />);

    expect(containerXs.firstChild).toHaveStyle({ height: "0.25rem" });
    expect(containerLg.firstChild).toHaveStyle({ height: "1.5rem" });
    expect(container2xl.firstChild).toHaveStyle({ height: "3rem" });
  });

  it("applies guide styles in development when showGuide is true", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const { container } = render(<Spacer showGuide />);
    const spacerElement = container.firstChild as HTMLElement;

    expect(spacerElement).toHaveStyle({
      backgroundColor: "rgba(251, 113, 133, 0.2)",
      border: "1px dashed rgba(251, 113, 133, 0.5)",
    });

    process.env.NODE_ENV = originalEnv;
  });

  it("does not apply guide styles in production", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const { container } = render(<Spacer showGuide />);
    const spacerElement = container.firstChild as HTMLElement;

    expect(spacerElement).not.toHaveStyle({
      backgroundColor: "rgba(251, 113, 133, 0.2)",
    });

    process.env.NODE_ENV = originalEnv;
  });

  it("accepts custom className", () => {
    const { container } = render(<Spacer className="custom-class" />);
    const spacerElement = container.firstChild as HTMLElement;
    expect(spacerElement).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Spacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has aria-hidden attribute", () => {
    const { container } = render(<Spacer />);
    const spacerElement = container.firstChild as HTMLElement;
    expect(spacerElement).toHaveAttribute("aria-hidden", "true");
  });
});
