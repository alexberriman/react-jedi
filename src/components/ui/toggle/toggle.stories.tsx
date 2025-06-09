import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Toggle } from "./toggle";
import { Bold, Italic, Underline, Code, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Form Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    pressed: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Toggle>({
  args: {
    children: "Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test toggle renders
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    expect(toggle).toBeInTheDocument();

    // Test initial unpressed state
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    // Test clicking to toggle on
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    // Test clicking again to toggle off
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
});

export const Outline: Story = enhanceStoryForDualMode<typeof Toggle>({
  args: {
    variant: "outline",
    children: "Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test outline variant renders
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    expect(toggle).toBeInTheDocument();

    // Test initial state
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    // Test toggle functionality
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");
  },
});

export const Small: Story = enhanceStoryForDualMode<typeof Toggle>({
  args: {
    size: "sm",
    children: "Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test small size variant renders
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    expect(toggle).toBeInTheDocument();

    // Test initial state
    expect(toggle).toHaveAttribute("data-state", "off");

    // Test toggle functionality
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");
  },
});

export const Large: Story = enhanceStoryForDualMode<typeof Toggle>({
  args: {
    size: "lg",
    children: "Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test large size variant renders
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    expect(toggle).toBeInTheDocument();

    // Test initial state
    expect(toggle).toHaveAttribute("data-state", "off");

    // Test toggle functionality
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");
  },
});

export const WithIcon: Story = enhanceStoryForDualMode<typeof Toggle>(
  {
    args: {
      children: <Bold size={16} />,
      "aria-label": "Toggle bold",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test icon toggle renders
      const toggle = canvas.getByRole("button", { name: "Toggle bold" });
      expect(toggle).toBeInTheDocument();

      // Test aria-label is present
      expect(toggle).toHaveAttribute("aria-label", "Toggle bold");

      // Test initial state
      expect(toggle).toHaveAttribute("data-state", "off");

      // Test clicking icon toggle
      await user.click(toggle);
      expect(toggle).toHaveAttribute("data-state", "on");

      // Test icon is present (check for SVG in React mode only)
      const renderMode = canvasElement.querySelector('[data-testid="story-render-mode"]');
      if (renderMode?.getAttribute('data-mode') === 'react') {
        const icon = toggle.querySelector("svg");
        expect(icon).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "Toggle",
      "aria-label": "Toggle bold",
      children: "B"
    }
  }
);

export const WithIconAndText: Story = enhanceStoryForDualMode<typeof Toggle>(
  {
    args: {
      children: (
        <>
          <Bold size={16} />
          Bold
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test toggle with icon and text renders
      const toggles = canvas.getAllByRole("button");
      const toggle = toggles.find(el => el.textContent?.includes("Bold"));
      expect(toggle).toBeInTheDocument();

      // Test initial state
      expect(toggle).toHaveAttribute("data-state", "off");

      // Test icon is present in React mode
      const renderMode = canvasElement.querySelector('[data-testid="story-render-mode"]');
      if (renderMode?.getAttribute('data-mode') === 'react') {
        const icon = toggle?.querySelector("svg");
        expect(icon).toBeInTheDocument();
      }

      // Test text is present
      expect(toggle?.textContent).toContain("Bold");

      // Test toggle functionality
      if (toggle) {
        await user.click(toggle);
        expect(toggle).toHaveAttribute("data-state", "on");
      }
    },
  },
  {
    renderSpec: {
      type: "Toggle",
      children: "B Bold"
    }
  }
);

export const Pressed: Story = enhanceStoryForDualMode<typeof Toggle>({
  args: {
    pressed: true,
    children: "Pressed Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test toggle renders in pressed state
    const toggle = canvas.getByRole("button", { name: "Pressed Toggle" });
    expect(toggle).toBeInTheDocument();

    // Test initial pressed state (controlled component with pressed={true})
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    // Note: Since this is a controlled component with pressed={true},
    // clicking won't change the state without an onPressedChange handler
    // So we just verify the initial state is correct
  },
});

export const Disabled: Story = enhanceStoryForDualMode<typeof Toggle>({
  args: {
    disabled: true,
    children: "Disabled Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled toggle
    const toggle = canvas.getByRole("button", { name: "Disabled Toggle" });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toBeDisabled();

    // Test disabled attribute
    expect(toggle).toHaveAttribute("disabled");

    // Test initial state
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
});

export const ToolbarExample: Story = enhanceStoryForDualMode<typeof Toggle>(
  {
    render: () => (
      <div className="flex gap-1">
        <Toggle variant="outline" aria-label="Toggle bold">
          <Bold size={16} />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle italic">
          <Italic size={16} />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle underline">
          <Underline size={16} />
        </Toggle>
        <div className="mx-1 h-8 w-px bg-border" />
        <Toggle variant="outline" aria-label="Toggle code">
          <Code size={16} />
        </Toggle>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test all toolbar toggles render
      const boldToggle = canvas.getByRole("button", { name: "Toggle bold" });
      const italicToggle = canvas.getByRole("button", { name: "Toggle italic" });
      const underlineToggle = canvas.getByRole("button", { name: "Toggle underline" });
      const codeToggle = canvas.getByRole("button", { name: "Toggle code" });

      expect(boldToggle).toBeInTheDocument();
      expect(italicToggle).toBeInTheDocument();
      expect(underlineToggle).toBeInTheDocument();
      expect(codeToggle).toBeInTheDocument();

      // Test toggles work independently
      await user.click(boldToggle);
      expect(boldToggle).toHaveAttribute("data-state", "on");
      expect(italicToggle).toHaveAttribute("data-state", "off");

      await user.click(italicToggle);
      expect(boldToggle).toHaveAttribute("data-state", "on");
      expect(italicToggle).toHaveAttribute("data-state", "on");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      gap: "xs",
      children: [
        {
          type: "Toggle",
          variant: "outline",
          "aria-label": "Toggle bold",
          children: "B"
        },
        {
          type: "Toggle",
          variant: "outline",
          "aria-label": "Toggle italic",
          children: "I"
        },
        {
          type: "Toggle",
          variant: "outline",
          "aria-label": "Toggle underline",
          children: "U"
        },
        {
          type: "Box",
          className: "mx-1 h-8 w-px bg-border"
        },
        {
          type: "Toggle",
          variant: "outline",
          "aria-label": "Toggle code",
          children: "</>"
        }
      ]
    }
  }
);

export const AlignmentGroup: Story = enhanceStoryForDualMode<typeof Toggle>(
  {
    render: () => (
      <div className="flex gap-1">
        <Toggle variant="outline" pressed aria-label="Align left">
          <AlignLeft size={16} />
        </Toggle>
        <Toggle variant="outline" aria-label="Align center">
          <AlignCenter size={16} />
        </Toggle>
        <Toggle variant="outline" aria-label="Align right">
          <AlignRight size={16} />
        </Toggle>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test alignment toggles render
      const leftToggle = canvas.getByRole("button", { name: "Align left" });
      const centerToggle = canvas.getByRole("button", { name: "Align center" });
      const rightToggle = canvas.getByRole("button", { name: "Align right" });

      expect(leftToggle).toBeInTheDocument();
      expect(centerToggle).toBeInTheDocument();
      expect(rightToggle).toBeInTheDocument();

      // Test initial states
      expect(leftToggle).toHaveAttribute("data-state", "on");
      expect(centerToggle).toHaveAttribute("data-state", "off");
      expect(rightToggle).toHaveAttribute("data-state", "off");

      // Test clicking center alignment
      await user.click(centerToggle);
      expect(centerToggle).toHaveAttribute("data-state", "on");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      gap: "xs",
      children: [
        {
          type: "Toggle",
          variant: "outline",
          pressed: true,
          "aria-label": "Align left",
          children: "L"
        },
        {
          type: "Toggle",
          variant: "outline",
          "aria-label": "Align center",
          children: "C"
        },
        {
          type: "Toggle",
          variant: "outline",
          "aria-label": "Align right",
          children: "R"
        }
      ]
    }
  }
);

export const VariantsShowcase: Story = enhanceStoryForDualMode<typeof Toggle>(
  {
    render: () => (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Toggle>Default</Toggle>
          <Toggle variant="outline">Outline</Toggle>
        </div>
        <div className="flex gap-2">
          <Toggle size="sm">Small</Toggle>
          <Toggle size="default">Default</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
        <div className="flex gap-2">
          <Toggle pressed>Pressed</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all variants render - use getAllByRole to handle multiple buttons with same name
      const allButtons = canvas.getAllByRole("button");
      
      // Check that we have the expected number of buttons
      expect(allButtons.length).toBe(7); // 2 variant buttons + 3 size buttons + 2 state buttons
      
      // Find specific buttons by their text content
      const outlineButton = allButtons.find(btn => btn.textContent === "Outline");
      const smallButton = allButtons.find(btn => btn.textContent === "Small");
      const largeButton = allButtons.find(btn => btn.textContent === "Large");
      const pressedButton = allButtons.find(btn => btn.textContent === "Pressed");
      const disabledButton = allButtons.find(btn => btn.textContent === "Disabled");
      
      expect(outlineButton).toBeInTheDocument();
      expect(smallButton).toBeInTheDocument();
      expect(largeButton).toBeInTheDocument();
      expect(pressedButton).toBeInTheDocument();
      expect(disabledButton).toBeInTheDocument();

      // Test pressed state
      expect(pressedButton).toHaveAttribute("data-state", "on");

      // Test disabled state
      expect(disabledButton).toBeDisabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Flex",
          gap: "sm",
          children: [
            {
              type: "Toggle",
              children: "Default"
            },
            {
              type: "Toggle",
              variant: "outline",
              children: "Outline"
            }
          ]
        },
        {
          type: "Flex",
          gap: "sm",
          children: [
            {
              type: "Toggle",
              size: "sm",
              children: "Small"
            },
            {
              type: "Toggle",
              size: "default",
              children: "Default"
            },
            {
              type: "Toggle",
              size: "lg",
              children: "Large"
            }
          ]
        },
        {
          type: "Flex",
          gap: "sm",
          children: [
            {
              type: "Toggle",
              pressed: true,
              children: "Pressed"
            },
            {
              type: "Toggle",
              disabled: true,
              children: "Disabled"
            }
          ]
        }
      ]
    }
  }
);
