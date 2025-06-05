import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Zap, Shield, Palette } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { render } from "@/lib/render";

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

  tags: ['autodocs', 'ui-accordion'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
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
          Yes. It&apos;s animated by default with Framer Motion, but you can disable animations
          by setting the animated prop to false.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test single accordion behavior
    const trigger1 = canvas.getByRole("button", { name: "Is it accessible?"});
    const trigger2 = canvas.getByRole("button", { name: "Is it styled?"});
    const trigger3 = canvas.getByRole("button", { name: "Is it animated?"});

    // Initially all items should be collapsed
    expect(trigger1).toHaveAttribute("data-state", "closed");
    expect(trigger2).toHaveAttribute("data-state", "closed");
    expect(trigger3).toHaveAttribute("data-state", "closed");

    // Click first item - should expand
    await user.click(trigger1);
    
    // Wait for the state change and content to appear
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
  });
    
    // Check content is present after animation
    await waitFor(() => {
      expect(canvas.getByText("Yes. It adheres to the WAI-ARIA design pattern.")).toBeInTheDocument();
   });

    // Click second item - first should collapse, second should expand
    await user.click(trigger2);
    
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "closed");
      expect(trigger2).toHaveAttribute("data-state", "open");
   });

    // Click second item again - should collapse (collapsible is true)
    await user.click(trigger2);
    
    await waitFor(() => {
      expect(trigger2).toHaveAttribute("data-state", "closed");
   });

    // Test keyboard navigation
    await user.click(trigger1);
    
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
  });
    
    await user.keyboard("{ArrowDown}");
    
    await waitFor(() => {
      expect(trigger2).toHaveFocus();
   });
    
    await user.keyboard("{Enter}");
    
    await waitFor(() => {
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger1).toHaveAttribute("data-state", "closed");
   });
  },
};

export const Multiple: Story = {
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
    const user = userEvent.setup();

    // Test multiple accordion behavior
    const trigger1 = canvas.getByRole("button", { name: "Section 1"});
    const trigger2 = canvas.getByRole("button", { name: "Section 2"});
    const trigger3 = canvas.getByRole("button", { name: "Section 3"});

    // Check default expanded items
    expect(trigger1).toHaveAttribute("data-state", "open");
    expect(trigger2).toHaveAttribute("data-state", "closed");
    expect(trigger3).toHaveAttribute("data-state", "open");

    // Click second item - should expand without closing others
    await user.click(trigger2);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger3).toHaveAttribute("data-state", "open");
   });

    // Click first item - should collapse
    await user.click(trigger1);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "closed");
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger3).toHaveAttribute("data-state", "open");
   });

    // Verify multiple items can be expanded simultaneously
    await user.click(trigger1);
    await waitFor(() => {
      expect(trigger1).toHaveAttribute("data-state", "open");
      expect(trigger2).toHaveAttribute("data-state", "open");
      expect(trigger3).toHaveAttribute("data-state", "open");
   });
  },
};

export const NonCollapsible: Story = {
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
};

export const WithDisabledItems: Story = {
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
    const user = userEvent.setup();

    const enabledTrigger1 = canvas.getByRole("button", { name: "Enabled Item"});
    const disabledTrigger = canvas.getByRole("button", { name: "Disabled Item"});
    const enabledTrigger2 = canvas.getByRole("button", { name: "Another Enabled Item"});

    // Test disabled item behavior
    expect(disabledTrigger).toBeDisabled();
    
    // Disabled items cannot be clicked - just verify they stay closed
    expect(disabledTrigger).toHaveAttribute("data-state", "closed");

    // Enabled items should work normally
    await user.click(enabledTrigger1);
    await waitFor(() => {
      expect(enabledTrigger1).toHaveAttribute("data-state", "open");
   });

    await user.click(enabledTrigger2);
    await waitFor(() => {
      expect(enabledTrigger2).toHaveAttribute("data-state", "open");
      expect(enabledTrigger1).toHaveAttribute("data-state", "closed");
   });
  },
};

export const LongContent: Story = {
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
};

export const Unstyled: Story = {
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
};

export const ServerDriven: Story = {
  name: "Server-Driven (JSON)",
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      defaultValue: "item-1",
      collapsible: true,
      items: [
        {
          value: "item-1",
          trigger: "What is React Jedi?",
          content:
            "React Jedi is a server-driven UI library that enables you to build React interfaces using JSON specifications.",
        },
        {
          value: "item-2",
          trigger: "How does it work?",
          content:
            "It uses a single render() function to transform JSON schemas into fully functional React components.",
        },
        {
          value: "item-3",
          trigger: "What are the benefits?",
          content:
            "Zero lock-in architecture, theme inheritance, reactive state management, and more - all through JSON!",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const ServerDrivenMultiple: Story = {
  name: "Server-Driven Multiple (JSON)",
  args: {
    type: "multiple",
    defaultValue: ["item-1", "item-3"],
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "multiple",
      defaultValue: ["item-1", "item-3"],
      items: [
        {
          value: "item-1",
          trigger: "Frontend Technologies",
          content: "React, TypeScript, TailwindCSS, and Vite for modern development.",
        },
        {
          value: "item-2",
          trigger: "Component Library",
          content: "Built on top of Radix UI and ShadCN for accessible, composable components.",
        },
        {
          value: "item-3",
          trigger: "State Management",
          content: "Reactive state management with computed properties and persistence.",
        },
        {
          value: "item-4",
          trigger: "Animation Support",
          content: "Framer Motion integration for smooth, performant animations.",
          disabled: true,
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const ModernDesign: Story = {
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
        <p className="text-sm text-muted-foreground">Find answers to common questions about React Jedi</p>
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
              Our animation system is built on Framer Motion, providing smooth, performant animations 
              out of the box. All components support an `animated` prop that can be toggled on/off, 
              and animations respect user preferences for reduced motion.
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
              customization. You can override default styles, create custom variants, and even define 
              your own design tokens. The theme system supports both light and dark modes automatically.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const IconAccordion: Story = {
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
              Security is built into every layer of React Jedi. From XSS protection to secure 
              prop sanitization, we ensure your applications are protected against common vulnerabilities.
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
              Every component is designed to be customizable. Use our pre-built themes or create 
              your own. With support for CSS variables, Tailwind utilities, and component variants, 
              the design possibilities are endless.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  ),
};

export const WithoutAnimation: Story = {
  name: "Without Animation",
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
          Sometimes you want immediate response without animations, especially for performance-critical
          applications or when users prefer reduced motion.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Accessibility first</AccordionTrigger>
        <AccordionContent>
          Disabling animations can improve accessibility for users who experience motion sickness
          or prefer a simpler interface.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CleanModern: Story = {
  name: "Clean & Modern",
  args: {
    type: "single",
    collapsible: true,
    animated: true,
    className: "w-[550px]",
  },
  render: (args) => (
    <div className="p-8 bg-gradient-to-br from-background to-muted/20 rounded-lg">
      <Accordion {...args} className="bg-background/50 backdrop-blur-sm rounded-lg border shadow-sm">
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
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Analytics</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Collaboration</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">24/7 Support</span>
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
};

// SDUI Story Variants
export const SingleSDUI: Story = {
  name: "Single (SDUI)",
  args: {
    type: "single",
    collapsible: true,
    animated: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[450px]",
      items: [
        {
          value: "item-1",
          trigger: "Is it accessible?",
          content:
            "Yes. It adheres to the WAI-ARIA design pattern and includes proper keyboard navigation, ARIA attributes, and focus management.",
        },
        {
          value: "item-2",
          trigger: "Is it styled?",
          content:
            "Yes. It comes with modern, clean styles that match the other components' aesthetic. The hover states are subtle and the animations are smooth.",
        },
        {
          value: "item-3",
          trigger: "Is it animated?",
          content:
            "Yes. It's animated by default with Framer Motion, but you can disable animations by setting the animated prop to false.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const NonCollapsibleSDUI: Story = {
  name: "Non-Collapsible (SDUI)",
  args: {
    type: "single",
    collapsible: false,
    animated: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: false,
      animated: true,
      className: "w-[450px]",
      defaultValue: "item-1",
      items: [
        {
          value: "item-1",
          trigger: "Always Expanded Item",
          content: "When collapsible is false, at least one item must remain expanded.",
        },
        {
          value: "item-2",
          trigger: "Another Item",
          content: "You can switch between items, but cannot collapse all items.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const WithDisabledItemsSDUI: Story = {
  name: "With Disabled Items (SDUI)",
  args: {
    type: "single",
    collapsible: true,
    animated: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[450px]",
      items: [
        {
          value: "item-1",
          trigger: "Enabled Item",
          content: "This item can be expanded normally.",
        },
        {
          value: "item-2",
          trigger: "Disabled Item",
          content: "This content cannot be seen because the item is disabled.",
          disabled: true,
        },
        {
          value: "item-3",
          trigger: "Another Enabled Item",
          content: "This item also works normally.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const LongContentSDUI: Story = {
  name: "Long Content (SDUI)",
  args: {
    type: "single",
    collapsible: true,
    animated: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px]",
      items: [
        {
          value: "item-1",
          trigger: "Item with Long Content",
          content: `This accordion item contains longer content to demonstrate how the component handles varying amounts of text.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        },
        {
          value: "item-2",
          trigger: "Short Content",
          content: "Just a brief bit of content here.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const UnstyledSDUI: Story = {
  name: "Unstyled (SDUI)",
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      className: "w-[400px] border-none",
      items: [
        {
          value: "item-1",
          trigger: "Unstyled Accordion",
          content: "This accordion has minimal styling applied, showing the base functionality.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const WithoutAnimationSDUI: Story = {
  name: "Without Animation (SDUI)",
  args: {
    type: "single",
    collapsible: true,
    animated: false,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      animated: false,
      className: "w-[450px]",
      items: [
        {
          value: "item-1",
          trigger: "No animations here",
          content:
            "This accordion has animations disabled. The content appears and disappears instantly without any transition effects.",
        },
        {
          value: "item-2",
          trigger: "Instant feedback",
          content:
            "Sometimes you want immediate response without animations, especially for performance-critical applications or when users prefer reduced motion.",
        },
        {
          value: "item-3",
          trigger: "Accessibility first",
          content:
            "Disabling animations can improve accessibility for users who experience motion sickness or prefer a simpler interface.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const ModernDesignSDUI: Story = {
  name: "Modern Design (SDUI)",
  args: {
    type: "single",
    collapsible: true,
    animated: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[600px]",
      items: [
        {
          value: "item-1",
          trigger: "What makes React Jedi different from other UI libraries?",
          content:
            "React Jedi stands out with its server-driven UI approach, allowing you to build entire interfaces using JSON specifications. It offers zero lock-in architecture, meaning you can import only what you need, and provides advanced features like reactive state management and theme inheritance directly within JSON.",
        },
        {
          value: "item-2",
          trigger: "How does the animation system work?",
          content:
            "Our animation system is built on Framer Motion, providing smooth, performant animations out of the box. All components support an `animated` prop that can be toggled on/off, and animations respect user preferences for reduced motion.",
        },
        {
          value: "item-3",
          trigger: "Can I customize the theme and styling?",
          content:
            "Absolutely! React Jedi uses TailwindCSS for styling and supports comprehensive theme customization. You can override default styles, create custom variants, and even define your own design tokens. The theme system supports both light and dark modes automatically.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const IconAccordionSDUI: Story = {
  name: "With Icons (SDUI)",
  args: {
    type: "single",
    collapsible: true,
    animated: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px]",
      items: [
        {
          value: "performance",
          trigger: "⚡ Lightning Fast Performance",
          content:
            "Built with performance in mind, React Jedi leverages modern optimization techniques including code splitting, lazy loading, and efficient re-rendering to ensure your applications run smoothly even at scale.",
        },
        {
          value: "security",
          trigger: "🛡️ Enterprise-Grade Security",
          content:
            "Security is built into every layer of React Jedi. From XSS protection to secure prop sanitization, we ensure your applications are protected against common vulnerabilities.",
        },
        {
          value: "customization",
          trigger: "🎨 Fully Customizable Design",
          content:
            "Every component is designed to be customizable. Use our pre-built themes or create your own. With support for CSS variables, Tailwind utilities, and component variants, the design possibilities are endless.",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const CleanModernSDUI: Story = {
  name: "Clean & Modern (SDUI)",
  args: {
    type: "single",
    collapsible: true,
    animated: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      collapsible: true,
      animated: true,
      className: "w-[550px] bg-background/50 backdrop-blur-sm rounded-lg border shadow-sm",
      items: [
        {
          value: "item-1",
          trigger: "Premium Features",
          content:
            "Get access to all premium features including advanced analytics, team collaboration, and priority support. Features include: Analytics, Collaboration, and 24/7 Support.",
        },
        {
          value: "item-2",
          trigger: "Enterprise Solutions",
          content:
            "Tailored solutions for large organizations with custom integrations, dedicated infrastructure, and SLA guarantees. Benefits include: Custom API integrations, Dedicated infrastructure, and 99.9% uptime SLA.",
        },
        {
          value: "item-3",
          trigger: "Developer Tools",
          content:
            "Powerful tools and APIs designed for developers to build, test, and deploy applications faster. Get started with: npm install @react-jedi/core and npm install @react-jedi/ui",
        },
      ],
    };

    return render(spec) || <></>;
  },
};
