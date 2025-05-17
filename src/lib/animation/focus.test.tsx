import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Focus, FocusButton, FocusInput, FocusTextarea, FocusCard, FocusLink } from "./focus";
import { AnimationProvider } from "./animation-provider";
import "@testing-library/jest-dom/vitest";

// Helper to render components within AnimationProvider
const renderWithAnimation = (ui: React.ReactElement) => {
  return render(<AnimationProvider>{ui}</AnimationProvider>);
};

describe("Focus Components", () => {
  beforeEach(() => {
    // Clear any leftover DOM elements between tests
    document.body.innerHTML = "";
  });

  describe("Focus", () => {
    it("renders children correctly", () => {
      renderWithAnimation(<Focus>Focus Content</Focus>);
      expect(screen.getByText("Focus Content")).toBeInTheDocument();
    });

    it("applies custom className and style", () => {
      renderWithAnimation(
        <Focus className="custom-class" style={{ color: "red" }}>
          Focus Content
        </Focus>
      );
      const element = screen.getByText("Focus Content");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("handles focus and blur events", () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      renderWithAnimation(
        <Focus onFocus={onFocus} onBlur={onBlur}>
          Focus Content
        </Focus>
      );
      const element = screen.getByText("Focus Content");
      element.focus();
      expect(onFocus).toHaveBeenCalled();
      element.blur();
      expect(onBlur).toHaveBeenCalled();
    });

    it("disables focus when disabled prop is true", () => {
      renderWithAnimation(
        <Focus disabled tabIndex={0}>
          Disabled Focus
        </Focus>
      );
      const element = screen.getByText("Disabled Focus");
      expect(element).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("FocusButton", () => {
    it("renders with default props", () => {
      renderWithAnimation(<FocusButton>Click Me</FocusButton>);
      const button = screen.getByText("Click Me");
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("bg-blue-500");
    });

    it("renders with different variants and sizes", () => {
      const { rerender } = renderWithAnimation(
        <FocusButton variant="secondary" size="sm">
          Button
        </FocusButton>
      );
      let button = screen.getByText("Button");
      expect(button).toHaveClass("bg-gray-200");
      expect(button).toHaveClass("text-sm");

      rerender(
        <AnimationProvider>
          <FocusButton variant="danger" size="lg">
            Button
          </FocusButton>
        </AnimationProvider>
      );
      button = screen.getByText("Button");
      expect(button).toHaveClass("bg-red-500");
      expect(button).toHaveClass("text-lg");
    });

    it("applies disabled styles", () => {
      renderWithAnimation(
        <FocusButton disabled>Disabled Button</FocusButton>
      );
      const button = screen.getByText("Disabled Button");
      expect(button).toHaveClass("opacity-50");
      expect(button).toHaveClass("cursor-not-allowed");
    });
  });

  describe("FocusInput", () => {
    it("renders with default props", () => {
      renderWithAnimation(<FocusInput placeholder="Enter text" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("handles onChange events", async () => {
      const onChange = vi.fn();
      renderWithAnimation(<FocusInput onChange={onChange} />);
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "test");
      expect(onChange).toHaveBeenCalled();
    });

    it("supports different input types", () => {
      renderWithAnimation(<FocusInput type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("applies disabled state", () => {
      renderWithAnimation(<FocusInput disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });
  });

  describe("FocusTextarea", () => {
    it("renders with default props", () => {
      renderWithAnimation(
        <FocusTextarea placeholder="Enter text" />
      );
      const textarea = screen.getByPlaceholderText("Enter text");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("rows", "4");
    });

    it("handles onChange events", async () => {
      const onChange = vi.fn();
      renderWithAnimation(<FocusTextarea onChange={onChange} />);
      const textarea = screen.getByRole("textbox");
      await userEvent.type(textarea, "test");
      expect(onChange).toHaveBeenCalled();
    });

    it("supports custom rows and resize", () => {
      renderWithAnimation(<FocusTextarea rows={6} resize="none" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "6");
      expect(textarea).toHaveClass("resize-none");
    });

    it("applies disabled state", () => {
      renderWithAnimation(<FocusTextarea disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });
  });

  describe("FocusCard", () => {
    it("renders with content", () => {
      renderWithAnimation(<FocusCard>Card Content</FocusCard>);
      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });

    it("renders with header and footer", () => {
      renderWithAnimation(
        <FocusCard header="Header" footer="Footer">
          Content
        </FocusCard>
      );
      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("applies disabled styles", () => {
      renderWithAnimation(<FocusCard disabled>Disabled Card</FocusCard>);
      const card = screen.getByText("Disabled Card").parentElement;
      expect(card).toHaveClass("opacity-50");
    });
  });

  describe("FocusLink", () => {
    it("renders with default props", () => {
      renderWithAnimation(<FocusLink href="/test">Test Link</FocusLink>);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveTextContent("Test Link");
    });

    it("renders external links with proper attributes", () => {
      renderWithAnimation(
        <FocusLink href="https://example.com" external>
          External Link
        </FocusLink>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("applies disabled state", () => {
      renderWithAnimation(
        <FocusLink href="/test" disabled>
          Disabled Link
        </FocusLink>
      );
      const link = screen.getByRole("link");
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
        const { unmount } = renderWithAnimation(
          <Focus preset={preset}>Preset {preset}</Focus>
        );
        expect(screen.getByText(`Preset ${preset}`)).toBeInTheDocument();
        unmount();
      }
    });
  });
});
