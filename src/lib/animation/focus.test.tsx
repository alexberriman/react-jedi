import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Focus, FocusButton, FocusInput, FocusTextarea, FocusCard, FocusLink } from "./focus";
import { AnimationProvider } from "./animation-provider";

// Helper to render components within AnimationProvider
const renderWithAnimation = (ui: React.ReactElement) => {
  return render(<AnimationProvider>{ui}</AnimationProvider>);
};

// Custom fireEvent function for change events
const fireChangeEvent = (element: Element, value: string) => {
  const event = new Event("change", { bubbles: true });
  Object.defineProperty(event, "target", {
    value: { value },
    enumerable: true,
  });
  element.dispatchEvent(event);
};

describe("Focus Components", () => {
  beforeEach(() => {
    // Clear any leftover DOM elements between tests
    document.body.innerHTML = "";
  });

  describe("Focus", () => {
    it("renders children correctly", () => {
      const { getByText } = renderWithAnimation(<Focus>Focus Content</Focus>);
      expect(getByText("Focus Content")).toBeInTheDocument();
    });

    it("applies custom className and style", () => {
      const { getByText } = renderWithAnimation(
        <Focus className="custom-class" style={{ color: "red" }}>
          Focus Content
        </Focus>
      );
      const element = getByText("Focus Content");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("handles focus and blur events", () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { getByText } = renderWithAnimation(
        <Focus onFocus={onFocus} onBlur={onBlur}>
          Focus Content
        </Focus>
      );
      const element = getByText("Focus Content");
      element.focus();
      expect(onFocus).toHaveBeenCalled();
      element.blur();
      expect(onBlur).toHaveBeenCalled();
    });

    it("disables focus when disabled prop is true", () => {
      const { getByText } = renderWithAnimation(
        <Focus disabled tabIndex={0}>
          Disabled Focus
        </Focus>
      );
      const element = getByText("Disabled Focus");
      expect(element).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("FocusButton", () => {
    it("renders with default props", () => {
      const { getByText } = renderWithAnimation(<FocusButton>Click Me</FocusButton>);
      const button = getByText("Click Me");
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("bg-blue-500");
    });

    it("renders with different variants and sizes", () => {
      const { rerender, getByText } = renderWithAnimation(
        <FocusButton variant="secondary" size="sm">
          Button
        </FocusButton>
      );
      let button = getByText("Button");
      expect(button).toHaveClass("bg-gray-200");
      expect(button).toHaveClass("text-sm");

      rerender(
        <AnimationProvider>
          <FocusButton variant="danger" size="lg">
            Button
          </FocusButton>
        </AnimationProvider>
      );
      button = getByText("Button");
      expect(button).toHaveClass("bg-red-500");
      expect(button).toHaveClass("text-lg");
    });

    it("applies disabled styles", () => {
      const { getByText } = renderWithAnimation(
        <FocusButton disabled>Disabled Button</FocusButton>
      );
      const button = getByText("Disabled Button");
      expect(button).toHaveClass("opacity-50");
      expect(button).toHaveClass("cursor-not-allowed");
    });
  });

  describe("FocusInput", () => {
    it("renders with default props", () => {
      const { getByPlaceholderText } = renderWithAnimation(<FocusInput placeholder="Enter text" />);
      const input = getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("handles onChange events", () => {
      const onChange = vi.fn();
      const { getByRole } = renderWithAnimation(<FocusInput onChange={onChange} />);
      const input = getByRole("textbox");
      fireChangeEvent(input, "test");
      expect(onChange).toHaveBeenCalled();
    });

    it("supports different input types", () => {
      const { getByRole } = renderWithAnimation(<FocusInput type="email" />);
      const input = getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("applies disabled state", () => {
      const { getByRole } = renderWithAnimation(<FocusInput disabled />);
      const input = getByRole("textbox");
      expect(input).toBeDisabled();
    });
  });

  describe("FocusTextarea", () => {
    it("renders with default props", () => {
      const { getByPlaceholderText } = renderWithAnimation(
        <FocusTextarea placeholder="Enter text" />
      );
      const textarea = getByPlaceholderText("Enter text");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("rows", "4");
    });

    it("handles onChange events", () => {
      const onChange = vi.fn();
      const { getByRole } = renderWithAnimation(<FocusTextarea onChange={onChange} />);
      const textarea = getByRole("textbox");
      fireChangeEvent(textarea, "test");
      expect(onChange).toHaveBeenCalled();
    });

    it("supports custom rows and resize", () => {
      const { getByRole } = renderWithAnimation(<FocusTextarea rows={6} resize="none" />);
      const textarea = getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "6");
      expect(textarea).toHaveClass("resize-none");
    });

    it("applies disabled state", () => {
      const { getByRole } = renderWithAnimation(<FocusTextarea disabled />);
      const textarea = getByRole("textbox");
      expect(textarea).toBeDisabled();
    });
  });

  describe("FocusCard", () => {
    it("renders with content", () => {
      const { getByText } = renderWithAnimation(<FocusCard>Card Content</FocusCard>);
      expect(getByText("Card Content")).toBeInTheDocument();
    });

    it("renders with header and footer", () => {
      const { getByText } = renderWithAnimation(
        <FocusCard header="Header" footer="Footer">
          Content
        </FocusCard>
      );
      expect(getByText("Header")).toBeInTheDocument();
      expect(getByText("Content")).toBeInTheDocument();
      expect(getByText("Footer")).toBeInTheDocument();
    });

    it("applies disabled styles", () => {
      const { getByText } = renderWithAnimation(<FocusCard disabled>Disabled Card</FocusCard>);
      const card = getByText("Disabled Card").parentElement;
      expect(card).toHaveClass("opacity-50");
    });
  });

  describe("FocusLink", () => {
    it("renders with default props", () => {
      const { getByRole } = renderWithAnimation(<FocusLink href="/test">Test Link</FocusLink>);
      const link = getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveTextContent("Test Link");
    });

    it("renders external links with proper attributes", () => {
      const { getByRole } = renderWithAnimation(
        <FocusLink href="https://example.com" external>
          External Link
        </FocusLink>
      );
      const link = getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("applies disabled state", () => {
      const { getByRole } = renderWithAnimation(
        <FocusLink href="/test" disabled>
          Disabled Link
        </FocusLink>
      );
      const link = getByRole("link");
      expect(link).toHaveClass("pointer-events-none");
      expect(link).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("Focus Presets", () => {
    it("applies different presets correctly", () => {
      const presets = [
        "ring",
        "glow",
        "highlight",
        "lift",
        "underline",
        "border",
        "subtle",
        "intense",
      ] as const;

      for (const preset of presets) {
        const { getByText, unmount } = renderWithAnimation(
          <Focus preset={preset}>Preset {preset}</Focus>
        );
        expect(getByText(`Preset ${preset}`)).toBeInTheDocument();
        unmount();
      }
    });
  });
});
