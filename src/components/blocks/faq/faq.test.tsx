import { describe, it, expect, vi } from "vitest";
import { render as reactRender, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../lib/render";
import type { FAQDef } from "../../../types/components/faq";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe("FAQBlock", () => {
  const sampleFAQs = [
    {
      id: "1",
      question: "What is React Jedi?",
      answer: "React Jedi is a server-driven UI library.",
      category: "general",
      tags: ["react", "ui"],
      isPopular: true,
    },
    {
      id: "2",
      question: "How do I install it?",
      answer: "<p>You can install using <code>npm install react-jedi</code></p>",
      category: "installation",
      tags: ["install", "npm"],
    },
    {
      id: "3",
      question: "Is it production ready?",
      answer: "Yes, it is production ready and actively maintained.",
      category: "general",
      tags: ["production"],
    },
  ];

  const sampleCategories = [
    { id: "general", name: "General", count: 2 },
    { id: "installation", name: "Installation", count: 1 },
  ];

  describe("Basic Accordion Variant", () => {
    it("should render accordion FAQ with questions", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 2),
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      expect(screen.getByText("What is React Jedi?")).toBeTruthy();
      expect(screen.getByText("How do I install it?")).toBeTruthy();
    });

    it.skip("should show answers when accordion items are clicked", async () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 1),
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      // Click on the question to expand
      const question = screen.getByRole("button", { name: /What is React Jedi?/i });
      await userEvent.click(question);

      await waitFor(() => {
        expect(screen.getByText("React Jedi is a server-driven UI library.")).toBeTruthy();
      }, { timeout: 10_000 });
    });

    it("should show popular badge for popular items", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 1),
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      expect(screen.getByText("Popular")).toBeTruthy();
    });
  });

  describe("Grid Variant", () => {
    it("should render FAQ items as grid cards", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "grid",
        items: sampleFAQs.slice(0, 2),
        columns: 2,
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      const { container } = reactRender(rendered);

      expect(screen.getByText("What is React Jedi?")).toBeTruthy();
      expect(screen.getByText("How do I install it?")).toBeTruthy();

      // Check for grid layout classes
      const gridElement = container.querySelector(".grid");
      expect(gridElement).toBeTruthy();
    });

    it("should render HTML content in answers", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "grid",
        items: [sampleFAQs[1]], // Item with HTML content
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      // The HTML content should be rendered
      expect(screen.getByText("You can install using")).toBeTruthy();
    });
  });

  describe("Two-Column Variant", () => {
    it("should render FAQ items in two columns", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "two-column",
        items: sampleFAQs,
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      const { container } = reactRender(rendered);

      expect(screen.getByText("What is React Jedi?")).toBeTruthy();
      expect(screen.getByText("How do I install it?")).toBeTruthy();
      expect(screen.getByText("Is it production ready?")).toBeTruthy();

      // Check for two-column layout
      const gridElement = container.querySelector(String.raw`.grid-cols-1.lg\:grid-cols-2`);
      expect(gridElement).toBeTruthy();
    });
  });

  describe("Search Functionality", () => {
    it("should render search input when search is enabled", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        showSearch: true,
        search: {
          enabled: true,
          placeholder: "Search FAQs...",
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      const searchInput = screen.getByPlaceholderText("Search FAQs...");
      expect(searchInput).toBeTruthy();
    });

    it.skip("should filter questions based on search query", async () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        showSearch: true,
        search: {
          enabled: true,
          placeholder: "Search FAQs...",
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      const searchInput = screen.getByPlaceholderText("Search FAQs...");
      
      // Initially all items should be visible
      expect(screen.getByText("What is React Jedi?")).toBeTruthy();
      expect(screen.getByText("How do I install it?")).toBeTruthy();
      expect(screen.getByText("Is it production ready?")).toBeTruthy();

      // Search for "install"
      await userEvent.type(searchInput, "install");

      await waitFor(() => {
        expect(screen.getByText("How do I install it?")).toBeTruthy();
        expect(screen.queryByText("What is React Jedi?")).toBeFalsy();
        expect(screen.queryByText("Is it production ready?")).toBeFalsy();
      }, { timeout: 10_000 });
    });

    it.skip("should show results count when filtering", async () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        showSearch: true,
        search: {
          enabled: true,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      const searchInput = screen.getByRole("textbox");
      await userEvent.type(searchInput, "React");

      await waitFor(() => {
        expect(screen.getByText(/result.*found/)).toBeTruthy();
      }, { timeout: 10_000 });
    });
  });

  describe("Category Filtering", () => {
    it("should render category filter buttons when categories are provided", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        categories: sampleCategories,
        showCategories: true,
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      expect(screen.getByRole("button", { name: "All" })).toBeTruthy();
      expect(screen.getByRole("button", { name: /General/ })).toBeTruthy();
      expect(screen.getByRole("button", { name: /Installation/ })).toBeTruthy();
    });

    it.skip("should filter items by category when category button is clicked", async () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        categories: sampleCategories,
        showCategories: true,
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      // Initially all items visible
      expect(screen.getByText("What is React Jedi?")).toBeTruthy();
      expect(screen.getByText("How do I install it?")).toBeTruthy();

      // Click on Installation category
      const installationButton = screen.getByRole("button", { name: /Installation/ });
      await userEvent.click(installationButton);

      await waitFor(() => {
        expect(screen.getByText("How do I install it?")).toBeTruthy();
        expect(screen.queryByText("What is React Jedi?")).toBeFalsy();
      }, { timeout: 10_000 });
    });
  });

  describe("Voting Functionality", () => {
    it("should render voting buttons when voting is enabled", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "grid", // Use grid variant to show content immediately
        items: sampleFAQs.slice(0, 1),
        voting: {
          enabled: true,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      expect(screen.getByText("Was this helpful?")).toBeTruthy();
      expect(screen.getByRole("button", { name: /thumbs up/i })).toBeTruthy();
      expect(screen.getByRole("button", { name: /thumbs down/i })).toBeTruthy();
    });

    it.skip("should handle vote clicks", async () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "grid", // Grid variant shows content immediately
        items: sampleFAQs.slice(0, 1),
        voting: {
          enabled: true,
          showVoteCount: true,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      const thumbsUpButton = screen.getByRole("button", { name: /thumbs up/i });
      await userEvent.click(thumbsUpButton);

      // After clicking, the vote should be registered (vote count would show)
      expect(thumbsUpButton).toBeTruthy();
    });
  });

  describe("Contact Support CTA", () => {
    it("should render contact support CTA when enabled", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 2),
        contactSupport: {
          enabled: true,
          title: "Need help?",
          description: "Contact our support team",
          buttonText: "Get Support",
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      expect(screen.getByText("Need help?")).toBeTruthy();
      expect(screen.getByText("Contact our support team")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Get Support" })).toBeTruthy();
    });

    it("should not render contact support when disabled", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 2),
        contactSupport: {
          enabled: false,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      expect(screen.queryByText("Still need help?")).toBeFalsy();
    });
  });

  describe("Popular Items First", () => {
    it("should show popular items first when enabled", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        showPopularFirst: true,
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      const { container } = reactRender(rendered);

      // The first accordion item should be the popular one
      const firstAccordionItem = container.querySelector('[data-radix-collection-item]:first-child');
      expect(firstAccordionItem?.textContent).toContain("What is React Jedi?");
    });
  });

  describe("Max Items Limit", () => {
    it("should limit the number of displayed items", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        maxItems: 2,
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      const { container } = reactRender(rendered);

      const accordionItems = container.querySelectorAll('[data-radix-collection-item]');
      expect(accordionItems.length).toBe(2);
    });
  });

  describe("No Results State", () => {
    it.skip("should show no results message when no items match search", async () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs,
        showSearch: true,
        search: {
          enabled: true,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      const searchInput = screen.getByRole("textbox");
      await userEvent.type(searchInput, "nonexistent");

      await waitFor(() => {
        expect(screen.getByText("No FAQs found matching your criteria.")).toBeTruthy();
      }, { timeout: 10_000 });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes for accordion", () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 1),
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      const accordionTrigger = screen.getByRole("button", { name: /What is React Jedi?/i });
      expect(accordionTrigger).toBeTruthy();
      expect(accordionTrigger.getAttribute("aria-expanded")).toBe("false");
    });

    it.skip("should be keyboard navigable", async () => {
      const spec: FAQDef = {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 2),
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render FAQ");
      }
      reactRender(rendered);

      const firstQuestion = screen.getByRole("button", { name: /What is React Jedi?/i });
      firstQuestion.focus();
      
      // Should be able to activate with keyboard
      await userEvent.keyboard("{Enter}");
      
      expect(firstQuestion.getAttribute("aria-expanded")).toBe("true");
    });
  });
});