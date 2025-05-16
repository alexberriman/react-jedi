import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/vitest";
import { Center } from "./center";
import { describe, it, expect } from "vitest";

describe("Center", () => {
  it("renders children correctly", () => {
    render(
      <Center>
        <div>Centered content</div>
      </Center>
    );
    const element = screen.getByText("Centered content");
    expect(element).toBeInTheDocument();
  });

  it("applies default centering classes", () => {
    const { container } = render(
      <Center>
        <div>Content</div>
      </Center>
    );
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toHaveClass("flex", "items-center", "justify-center");
  });

  it("centers only horizontally when centerDirection is horizontal", () => {
    const { container } = render(
      <Center centerDirection="horizontal">
        <div>Content</div>
      </Center>
    );
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toHaveClass("flex", "justify-center");
    expect(centerElement).not.toHaveClass("items-center");
  });

  it("centers only vertically when centerDirection is vertical", () => {
    const { container } = render(
      <Center centerDirection="vertical">
        <div>Content</div>
      </Center>
    );
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toHaveClass("flex", "items-center");
    expect(centerElement).not.toHaveClass("justify-center");
  });

  it("applies fullHeight class when fullHeight is true", () => {
    const { container } = render(
      <Center fullHeight>
        <div>Content</div>
      </Center>
    );
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toHaveClass("min-h-screen");
  });

  it("applies fullWidth class when fullWidth is true", () => {
    const { container } = render(
      <Center fullWidth>
        <div>Content</div>
      </Center>
    );
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toHaveClass("w-full");
  });

  it("accepts custom className", () => {
    const { container } = render(
      <Center className="bg-red-500">
        <div>Content</div>
      </Center>
    );
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toHaveClass("bg-red-500");
  });

  it("renders as different element when as prop is provided", () => {
    const { container } = render(
      <Center as="section">
        <div>Content</div>
      </Center>
    );
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement.tagName).toBe("SECTION");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Center ref={ref}>
        <div>Content</div>
      </Center>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
