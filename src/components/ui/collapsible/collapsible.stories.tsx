import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Button } from "../button";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component: `A collapsible component for showing and hiding content. Built on top of Radix UI Collapsible.

## Usage

\`\`\`tsx
<Collapsible>
  <CollapsibleTrigger>Toggle content</CollapsibleTrigger>
  <CollapsibleContent>
    This content can be toggled.
  </CollapsibleContent>
</Collapsible>
\`\`\``,
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "The controlled open state of the collapsible",
    },
    defaultOpen: {
      control: "boolean",
      description: "The default open state when uncontrolled",
    },
    disabled: {
      control: "boolean",
      description: "Whether the collapsible is disabled",
    },
    onOpenChange: {
      action: "open changed",
      description: "Called when the open state changes",
    },
  },

  tags: ["autodocs", "ui-collapsible"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          This is the collapsible content. It can be expanded or collapsed.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
});

export const DefaultOpen: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          This collapsible starts in the open state by default.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
});

const ControlledExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline">{isOpen ? "Hide" : "Show"} Content</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            This is controlled content. State: {isOpen ? "Open" : "Closed"}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setIsOpen(true)}>
          Open
        </Button>
        <Button size="sm" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </div>
    </div>
  );
};

export const Controlled: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => <ControlledExample />,
});

const WithIconExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
          Advanced Settings
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="space-y-2 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Auto-save</span>
            <span className="text-sm text-muted-foreground">Enabled</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cache size</span>
            <span className="text-sm text-muted-foreground">2.5 GB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Updates</span>
            <span className="text-sm text-muted-foreground">Automatic</span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const WithIcon: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => <WithIconExample />,
});

export const Multiple: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => (
    <div className="space-y-2">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            Section 1
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <div className="rounded-md border px-4 py-3 text-sm">
            Content for section 1. This can contain any elements.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            Section 2
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <div className="rounded-md border px-4 py-3 text-sm">
            Content for section 2. Multiple collapsibles can be used together.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            Section 3
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <div className="rounded-md border px-4 py-3 text-sm">
            Content for section 3. Each operates independently.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
});

export const Disabled: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => (
    <Collapsible disabled>
      <CollapsibleTrigger asChild>
        <Button variant="outline" disabled>
          Disabled Collapsible
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3 text-sm">
          This content cannot be toggled because the collapsible is disabled.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
});

const FAQExample = () => {
  const faqs = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn: npm install react",
    },
    {
      question: "What is JSX?",
      answer: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML.",
    },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
      {faqs.map((faq, index) => (
        <Collapsible key={index}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-4 py-2 text-left font-medium"
            >
              {faq.question}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 py-2 text-sm text-muted-foreground">{faq.answer}</div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export const FAQ: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => <FAQExample />,
});

const CardExample = () => {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$99.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$8.92</span>
            </div>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="link" className="h-auto p-0 text-sm">
                  View details
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pt-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>State Tax (8%)</span>
                    <span>$7.92</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Tax (1%)</span>
                    <span>$1.00</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$107.92</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InCard: Story = enhanceStoryForDualMode<typeof Collapsible>({
  render: () => <CardExample />,
});
