import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Zap, Shield, Palette } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

/**
 * NOTE: This component may produce act() warnings during tests.
 * These warnings come from Radix UI's internal Presence component and are false positives
 * related to internal animation state updates. The warnings specifically occur in:
 * - NonCollapsible story: Due to defaultValue causing initial expansion on mount
 * These are known issues with Radix UI components and do not affect functionality.
 * The tests pass successfully despite these warnings.
 */

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Type of accordion - single or multiple items can be expanded",
    },
    collapsible: {
      control: "boolean",
      description: "When type is 'single', determines if the item can be collapsed",
    },
    defaultValue: {
      control: "text",
      description: "The default expanded item(s)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the entire accordion",
    },
    animated: {
      control: "boolean",
      description: "Enable or disable animations",
      defaultValue: true,
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },

  tags: ["autodocs", "ui-accordion", "test"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single = enhanceStoryForDualMode(
  {
    args: {
      type: "single",
      collapsible: true,
      animated: true,
      className: "w-[450px]",
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern and includes proper keyboard navigation,
            ARIA attributes, and focus management.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with modern, clean styles that match the other components&apos; aesthetic.
            The hover states are subtle and the animations are smooth.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default with Framer Motion, but you can disable animations by
            setting the animated prop to false.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: null });

    // Test single accordion behavior
    const trigger1 = canvas.getByRole("button", { name: "Is it accessible?" });
    const trigger2 = canvas.getByRole("button", { name: "Is it styled?" });
    const trigger3 = canvas.getByRole("button", { name: "Is it animated?" });

    // Initially all items should be collapsed
    expect(trigger1).toHaveAttribute("data-state", "closed");
    expect(trigger2).toHaveAttribute("data-state", "closed");
    expect(trigger3).toHaveAttribute("data-state", "closed");

    // Click first item - should expand
    await user.click(trigger1);

    // Wait for the state change and content to appear
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });

    // Check content is present after animation
    await waitFor(() => {
      expect(
        canvas.getByText(/Yes\. It adheres to the WAI-ARIA design pattern/)
      ).toBeInTheDocument();
    }, { timeout: 1000 });

    // Click second item - first should collapse, second should expand
    await user.click(trigger2);

    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "closed");
      expect(trigger2).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });

    // Click second item again - should collapse (collapsible is true)
    await user.click(trigger2);

    await waitFor(() => {
      expect(trigger2).toHaveAttribute("data-state", "closed");
    }, { timeout: 1000 });

    // Test keyboard navigation
    await user.click(trigger1);

    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });

    await user.keyboard("{ArrowDown}");

    await waitFor(() => {
      expect(trigger2).toHaveFocus();
    }, { timeout: 1000 });

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger1).toHaveAttribute("data-state", "closed");
    }, { timeout: 1000 });
  },
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[450px]",
      children: [
        {
          type: "AccordionItem",
          value: "item-1",
          children: [
            {
              type: "AccordionTrigger",
              children: "Is it accessible?"
            },
            {
              type: "AccordionContent",
              children: "Yes. It adheres to the WAI-ARIA design pattern and includes proper keyboard navigation, ARIA attributes, and focus management."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-2",
          children: [
            {
              type: "AccordionTrigger",
              children: "Is it styled?"
            },
            {
              type: "AccordionContent",
              children: "Yes. It comes with modern, clean styles that match the other components' aesthetic. The hover states are subtle and the animations are smooth."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-3",
          children: [
            {
              type: "AccordionTrigger",
              children: "Is it animated?"
            },
            {
              type: "AccordionContent",
              children: "Yes. It's animated by default with Framer Motion, but you can disable animations by setting the animated prop to false."
            }
          ]
        }
      ]
    }
  }
) as Story;

export const Multiple = enhanceStoryForDualMode(
  {
    args: {
      type: "multiple",
      animated: true,
      className: "w-[450px]",
      defaultValue: ["item-1", "item-3"],
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>
            Content for section 1. Multiple sections can be expanded at the same time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2. Try expanding multiple sections!</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Section 3</AccordionTrigger>
          <AccordionContent>
            Content for section 3. This section starts expanded by default.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: null });

    // Wait for initial render to complete
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Section 1" })).toBeInTheDocument();
    });

    // Test multiple accordion behavior
    const trigger1 = canvas.getByRole("button", { name: "Section 1" });
    const trigger2 = canvas.getByRole("button", { name: "Section 2" });
    const trigger3 = canvas.getByRole("button", { name: "Section 3" });

    // Check default expanded items
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
      expect(trigger2).toHaveAttribute("data-state", "closed");
      expect(trigger3).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });

    // Click second item - should expand without closing others
    await user.click(trigger2);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger3).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });

    // Click first item - should collapse
    await user.click(trigger1);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "closed");
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger3).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });

    // Verify multiple items can be expanded simultaneously
    await user.click(trigger1);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger3).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });
  },
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "multiple",
      animated: true,
      className: "w-[450px]",
      defaultValue: ["item-1", "item-3"],
      children: [
        {
          type: "AccordionItem",
          value: "item-1",
          children: [
            {
              type: "AccordionTrigger",
              children: "Section 1"
            },
            {
              type: "AccordionContent",
              children: "Content for section 1. Multiple sections can be expanded at the same time."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-2",
          children: [
            {
              type: "AccordionTrigger",
              children: "Section 2"
            },
            {
              type: "AccordionContent",
              children: "Content for section 2. Try expanding multiple sections!"
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-3",
          children: [
            {
              type: "AccordionTrigger",
              children: "Section 3"
            },
            {
              type: "AccordionContent",
              children: "Content for section 3. This section starts expanded by default."
            }
          ]
        }
      ]
    }
  }
) as Story;

export const NonCollapsible = enhanceStoryForDualMode(
  {
    args: {
      type: "single",
      collapsible: false,
      animated: true,
      className: "w-[450px]",
      defaultValue: "item-1",
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Always Expanded Item</AccordionTrigger>
          <AccordionContent>
            When collapsible is false, at least one item must remain expanded.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Another Item</AccordionTrigger>
          <AccordionContent>
            You can switch between items, but cannot collapse all items.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "single",
      collapsible: false,
      animated: true,
      className: "w-[450px]",
      defaultValue: "item-1",
      children: [
        {
          type: "AccordionItem",
          value: "item-1",
          children: [
            {
              type: "AccordionTrigger",
              children: "Always Expanded Item"
            },
            {
              type: "AccordionContent",
              children: "When collapsible is false, at least one item must remain expanded."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-2",
          children: [
            {
              type: "AccordionTrigger",
              children: "Another Item"
            },
            {
              type: "AccordionContent",
              children: "You can switch between items, but cannot collapse all items."
            }
          ]
        }
      ]
    }
  }
) as Story;

export const WithDisabledItems = enhanceStoryForDualMode(
  {
    args: {
      type: "single",
      collapsible: true,
      animated: true,
      className: "w-[450px]",
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Enabled Item</AccordionTrigger>
          <AccordionContent>This item can be expanded normally.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Disabled Item</AccordionTrigger>
          <AccordionContent>
            This content cannot be seen because the item is disabled.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Another Enabled Item</AccordionTrigger>
          <AccordionContent>This item also works normally.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: null });

    // Wait for initial render to complete
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Enabled Item" })).toBeInTheDocument();
    });

    const enabledTrigger1 = canvas.getByRole("button", { name: "Enabled Item" });
    const disabledTrigger = canvas.getByRole("button", { name: "Disabled Item" });
    const enabledTrigger2 = canvas.getByRole("button", { name: "Another Enabled Item" });

    // Test disabled item behavior
    expect(disabledTrigger).toBeDisabled();

    // Disabled items cannot be clicked - just verify they stay closed
    expect(disabledTrigger).toHaveAttribute("data-state", "closed");

    // Enabled items should work normally
    await user.click(enabledTrigger1);
    await waitFor(() => {
      expect(enabledTrigger1).toHaveAttribute("data-state", "open");
    }, { timeout: 1000 });

    await user.click(enabledTrigger2);
    await waitFor(() => {
      expect(enabledTrigger2).toHaveAttribute("data-state", "open");
      expect(enabledTrigger1).toHaveAttribute("data-state", "closed");
    }, { timeout: 1000 });
  },
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[450px]",
      children: [
        {
          type: "AccordionItem",
          value: "item-1",
          children: [
            {
              type: "AccordionTrigger",
              children: "Enabled Item"
            },
            {
              type: "AccordionContent",
              children: "This item can be expanded normally."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-2",
          disabled: true,
          children: [
            {
              type: "AccordionTrigger",
              children: "Disabled Item"
            },
            {
              type: "AccordionContent",
              children: "This content cannot be seen because the item is disabled."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-3",
          children: [
            {
              type: "AccordionTrigger",
              children: "Another Enabled Item"
            },
            {
              type: "AccordionContent",
              children: "This item also works normally."
            }
          ]
        }
      ]
    }
  }
) as Story;

export const LongContent = enhanceStoryForDualMode(
  {
    args: {
      type: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px]",
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item with Long Content</AccordionTrigger>
          <AccordionContent>
            <p>
              This accordion item contains longer content to demonstrate how the component handles
              varying amounts of text.
            </p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mt-2">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Short Content</AccordionTrigger>
          <AccordionContent>Just a brief bit of content here.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px]",
      children: [
        {
          type: "AccordionItem",
          value: "item-1",
          children: [
            {
              type: "AccordionTrigger",
              children: "Item with Long Content"
            },
            {
              type: "AccordionContent",
              children: {
                type: "Box",
                children: [
                  {
                    type: "Text",
                    element: "p",
                    children: "This accordion item contains longer content to demonstrate how the component handles varying amounts of text."
                  },
                  {
                    type: "Text",
                    element: "p",
                    className: "mt-2",
                    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  },
                  {
                    type: "Text",
                    element: "p",
                    className: "mt-2",
                    children: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  }
                ]
              }
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-2",
          children: [
            {
              type: "AccordionTrigger",
              children: "Short Content"
            },
            {
              type: "AccordionContent",
              children: "Just a brief bit of content here."
            }
          ]
        }
      ]
    }
  }
) as Story;

export const Unstyled = enhanceStoryForDualMode(
  {
    args: {
      type: "single",
      collapsible: true,
      className: "w-[400px] border-none",
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="hover:no-underline">Unstyled Accordion</AccordionTrigger>
          <AccordionContent>
            This accordion has minimal styling applied, showing the base functionality.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "single",
      collapsible: true,
      className: "w-[400px] border-none",
      children: [
        {
          type: "AccordionItem",
          value: "item-1",
          className: "border-none",
          children: [
            {
              type: "AccordionTrigger",
              className: "hover:no-underline",
              children: "Unstyled Accordion"
            },
            {
              type: "AccordionContent",
              children: "This accordion has minimal styling applied, showing the base functionality."
            }
          ]
        }
      ]
    }
  }
) as Story;


export const ModernDesign = enhanceStoryForDualMode(
  {
    name: "Modern Design Example",
    args: {
      type: "single",
      collapsible: true,
      animated: true,
      className: "w-[600px]",
    },
    render: (args) => (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
          <p className="text-sm text-muted-foreground">
            Find answers to common questions about React Jedi
          </p>
        </div>
        <Accordion {...args}>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              What makes React Jedi different from other UI libraries?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                React Jedi stands out with its server-driven UI approach, allowing you to build entire
                interfaces using JSON specifications. It offers zero lock-in architecture, meaning you
                can import only what you need, and provides advanced features like reactive state
                management and theme inheritance directly within JSON.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              How does the animation system work?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                Our animation system is built on Framer Motion, providing smooth, performant
                animations out of the box. All components support an `animated` prop that can be
                toggled on/off, and animations respect user preferences for reduced motion.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Can I customize the theme and styling?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                Absolutely! React Jedi uses TailwindCSS for styling and supports comprehensive theme
                customization. You can override default styles, create custom variants, and even
                define your own design tokens. The theme system supports both light and dark modes
                automatically.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-xl font-semibold mb-2",
              children: "Frequently Asked Questions"
            },
            {
              type: "Text",
              element: "p",
              className: "text-sm text-muted-foreground",
              children: "Find answers to common questions about React Jedi"
            }
          ]
        },
        {
          type: "Accordion",
          accordionType: "single",
          collapsible: true,
          animated: true,
          className: "w-[600px]",
          children: [
            {
              type: "AccordionItem",
              value: "item-1",
              children: [
                {
                  type: "AccordionTrigger",
                  className: "text-left",
                  children: "What makes React Jedi different from other UI libraries?"
                },
                {
                  type: "AccordionContent",
                  children: {
                    type: "Text",
                    element: "p",
                    className: "leading-relaxed",
                    children: "React Jedi stands out with its server-driven UI approach, allowing you to build entire interfaces using JSON specifications. It offers zero lock-in architecture, meaning you can import only what you need, and provides advanced features like reactive state management and theme inheritance directly within JSON."
                  }
                }
              ]
            },
            {
              type: "AccordionItem",
              value: "item-2",
              children: [
                {
                  type: "AccordionTrigger",
                  className: "text-left",
                  children: "How does the animation system work?"
                },
                {
                  type: "AccordionContent",
                  children: {
                    type: "Text",
                    element: "p",
                    className: "leading-relaxed",
                    children: "Our animation system is built on Framer Motion, providing smooth, performant animations out of the box. All components support an `animated` prop that can be toggled on/off, and animations respect user preferences for reduced motion."
                  }
                }
              ]
            },
            {
              type: "AccordionItem",
              value: "item-3",
              children: [
                {
                  type: "AccordionTrigger",
                  className: "text-left",
                  children: "Can I customize the theme and styling?"
                },
                {
                  type: "AccordionContent",
                  children: {
                    type: "Text",
                    element: "p",
                    className: "leading-relaxed",
                    children: "Absolutely! React Jedi uses TailwindCSS for styling and supports comprehensive theme customization. You can override default styles, create custom variants, and even define your own design tokens. The theme system supports both light and dark modes automatically."
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
) as Story;

export const IconAccordion = enhanceStoryForDualMode(
  {
    name: "With Icons",
    args: {
      type: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px]",
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="performance">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="flex items-center gap-3">
              <Zap className="size-5 text-primary" />
              <span>Lightning Fast Performance</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed text-muted-foreground ml-8">
              Built with performance in mind, React Jedi leverages modern optimization techniques
              including code splitting, lazy loading, and efficient re-rendering to ensure your
              applications run smoothly even at scale.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="flex items-center gap-3">
              <Shield className="size-5 text-primary" />
              <span>Enterprise-Grade Security</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed text-muted-foreground ml-8">
              Security is built into every layer of React Jedi. From XSS protection to secure prop
              sanitization, we ensure your applications are protected against common vulnerabilities.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="customization">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="flex items-center gap-3">
              <Palette className="size-5 text-primary" />
              <span>Fully Customizable Design</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed text-muted-foreground ml-8">
              Every component is designed to be customizable. Use our pre-built themes or create your
              own. With support for CSS variables, Tailwind utilities, and component variants, the
              design possibilities are endless.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px]",
      children: [
        {
          type: "AccordionItem",
          value: "performance",
          children: [
            {
              type: "AccordionTrigger",
              className: "text-left hover:no-underline",
              children: {
                type: "Flex",
                align: "center",
                gap: "sm",
                children: [
                  {
                    type: "Icon",
                    name: "Zap",
                    className: "size-5 text-primary"
                  },
                  {
                    type: "Text",
                    element: "span",
                    children: "Lightning Fast Performance"
                  }
                ]
              }
            },
            {
              type: "AccordionContent",
              children: {
                type: "Text",
                element: "p",
                className: "leading-relaxed text-muted-foreground ml-8",
                children: "Built with performance in mind, React Jedi leverages modern optimization techniques including code splitting, lazy loading, and efficient re-rendering to ensure your applications run smoothly even at scale."
              }
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "security",
          children: [
            {
              type: "AccordionTrigger",
              className: "text-left hover:no-underline",
              children: {
                type: "Flex",
                align: "center",
                gap: "sm",
                children: [
                  {
                    type: "Icon",
                    name: "Shield",
                    className: "size-5 text-primary"
                  },
                  {
                    type: "Text",
                    element: "span",
                    children: "Enterprise-Grade Security"
                  }
                ]
              }
            },
            {
              type: "AccordionContent",
              children: {
                type: "Text",
                element: "p",
                className: "leading-relaxed text-muted-foreground ml-8",
                children: "Security is built into every layer of React Jedi. From XSS protection to secure prop sanitization, we ensure your applications are protected against common vulnerabilities."
              }
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "customization",
          children: [
            {
              type: "AccordionTrigger",
              className: "text-left hover:no-underline",
              children: {
                type: "Flex",
                align: "center",
                gap: "sm",
                children: [
                  {
                    type: "Icon",
                    name: "Palette",
                    className: "size-5 text-primary"
                  },
                  {
                    type: "Text",
                    element: "span",
                    children: "Fully Customizable Design"
                  }
                ]
              }
            },
            {
              type: "AccordionContent",
              children: {
                type: "Text",
                element: "p",
                className: "leading-relaxed text-muted-foreground ml-8",
                children: "Every component is designed to be customizable. Use our pre-built themes or create your own. With support for CSS variables, Tailwind utilities, and component variants, the design possibilities are endless."
              }
            }
          ]
        }
      ]
    }
  }
) as Story;

export const WithoutAnimation = enhanceStoryForDualMode(
  {
    args: {
      type: "single",
      collapsible: true,
      animated: false,
      className: "w-[450px]",
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>No animations here</AccordionTrigger>
          <AccordionContent>
            This accordion has animations disabled. The content appears and disappears instantly
            without any transition effects.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Instant feedback</AccordionTrigger>
          <AccordionContent>
            Sometimes you want immediate response without animations, especially for
            performance-critical applications or when users prefer reduced motion.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Accessibility first</AccordionTrigger>
          <AccordionContent>
            Disabling animations can improve accessibility for users who experience motion sickness or
            prefer a simpler interface.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    renderSpec: {
      type: "Accordion",
      accordionType: "single",
      collapsible: true,
      animated: false,
      className: "w-[450px]",
      children: [
        {
          type: "AccordionItem",
          value: "item-1",
          children: [
            {
              type: "AccordionTrigger",
              children: "No animations here"
            },
            {
              type: "AccordionContent",
              children: "This accordion has animations disabled. The content appears and disappears instantly without any transition effects."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-2",
          children: [
            {
              type: "AccordionTrigger",
              children: "Instant feedback"
            },
            {
              type: "AccordionContent",
              children: "Sometimes you want immediate response without animations, especially for performance-critical applications or when users prefer reduced motion."
            }
          ]
        },
        {
          type: "AccordionItem",
          value: "item-3",
          children: [
            {
              type: "AccordionTrigger",
              children: "Accessibility first"
            },
            {
              type: "AccordionContent",
              children: "Disabling animations can improve accessibility for users who experience motion sickness or prefer a simpler interface."
            }
          ]
        }
      ]
    }
  }
) as Story;

export const CleanModern = enhanceStoryForDualMode(
  {
    name: "Clean & Modern",
    args: {
      type: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px]",
    },
    render: (args) => (
      <div className="p-8 bg-gradient-to-br from-background to-muted/20 rounded-lg">
        <Accordion
          {...args}
          className="bg-background/50 backdrop-blur-sm rounded-lg border shadow-sm"
        >
          <AccordionItem value="item-1" className="px-4">
            <AccordionTrigger className="text-base font-semibold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premium Features
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  Get access to all premium features including advanced analytics, team collaboration,
                  and priority support.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Analytics
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Collaboration
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    24/7 Support
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="px-4">
            <AccordionTrigger className="text-base font-semibold">
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Enterprise Solutions
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  Tailored solutions for large organizations with custom integrations, dedicated
                  infrastructure, and SLA guarantees.
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Custom API integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Dedicated infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    99.9% uptime SLA
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="px-4 border-b-0">
            <AccordionTrigger className="text-base font-semibold">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Developer Tools
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  Powerful tools and APIs designed for developers to build, test, and deploy
                  applications faster.
                </p>
                <pre className="p-3 bg-muted rounded-md text-xs overflow-x-auto">
                  <code>{`npm install @react-jedi/core\nnpm install @react-jedi/ui`}</code>
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 bg-gradient-to-br from-background to-muted/20 rounded-lg",
      children: {
        type: "Accordion",
        accordionType: "single",
        collapsible: true,
        animated: true,
        className: "bg-background/50 backdrop-blur-sm rounded-lg border shadow-sm w-[550px]",
        children: [
          {
            type: "AccordionItem",
            value: "item-1",
            className: "px-4",
            children: [
              {
                type: "AccordionTrigger",
                className: "text-base font-semibold",
                children: {
                  type: "Text",
                  element: "span",
                  className: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                  children: "Premium Features"
                }
              },
              {
                type: "AccordionContent",
                children: {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Text",
                      element: "p",
                      className: "leading-relaxed",
                      children: "Get access to all premium features including advanced analytics, team collaboration, and priority support."
                    },
                    {
                      type: "Flex",
                      gap: "sm",
                      children: [
                        {
                          type: "Badge",
                          className: "px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full",
                          children: "Analytics"
                        },
                        {
                          type: "Badge",
                          className: "px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full",
                          children: "Collaboration"
                        },
                        {
                          type: "Badge",
                          className: "px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full",
                          children: "24/7 Support"
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          },
          {
            type: "AccordionItem",
            value: "item-2",
            className: "px-4",
            children: [
              {
                type: "AccordionTrigger",
                className: "text-base font-semibold",
                children: {
                  type: "Text",
                  element: "span",
                  className: "bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent",
                  children: "Enterprise Solutions"
                }
              },
              {
                type: "AccordionContent",
                children: {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Text",
                      element: "p",
                      className: "leading-relaxed",
                      children: "Tailored solutions for large organizations with custom integrations, dedicated infrastructure, and SLA guarantees."
                    },
                    {
                      type: "Box",
                      element: "ul",
                      className: "space-y-2 ml-4",
                      children: [
                        {
                          type: "Flex",
                          element: "li",
                          align: "center",
                          gap: "sm",
                          children: [
                            {
                              type: "Box",
                              element: "span",
                              className: "w-1.5 h-1.5 bg-green-500 rounded-full"
                            },
                            {
                              type: "Text",
                              children: "Custom API integrations"
                            }
                          ]
                        },
                        {
                          type: "Flex",
                          element: "li",
                          align: "center",
                          gap: "sm",
                          children: [
                            {
                              type: "Box",
                              element: "span",
                              className: "w-1.5 h-1.5 bg-green-500 rounded-full"
                            },
                            {
                              type: "Text",
                              children: "Dedicated infrastructure"
                            }
                          ]
                        },
                        {
                          type: "Flex",
                          element: "li",
                          align: "center",
                          gap: "sm",
                          children: [
                            {
                              type: "Box",
                              element: "span",
                              className: "w-1.5 h-1.5 bg-green-500 rounded-full"
                            },
                            {
                              type: "Text",
                              children: "99.9% uptime SLA"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          },
          {
            type: "AccordionItem",
            value: "item-3",
            className: "px-4 border-b-0",
            children: [
              {
                type: "AccordionTrigger",
                className: "text-base font-semibold",
                children: {
                  type: "Text",
                  element: "span",
                  className: "bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent",
                  children: "Developer Tools"
                }
              },
              {
                type: "AccordionContent",
                children: {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Text",
                      element: "p",
                      className: "leading-relaxed",
                      children: "Powerful tools and APIs designed for developers to build, test, and deploy applications faster."
                    },
                    {
                      type: "Box",
                      element: "pre",
                      className: "p-3 bg-muted rounded-md text-xs overflow-x-auto",
                      children: {
                        type: "Text",
                        element: "code",
                        children: "npm install @react-jedi/core\nnpm install @react-jedi/ui"
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    }
  }
) as Story;

