import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Form Components/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
    },
    value: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single = enhanceStoryForDualMode(
  {
    render: () => (
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justified">
          <AlignJustify size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test toggle group renders
      const toggleGroup = canvas.getByRole("group");
      expect(toggleGroup).toBeInTheDocument();

      // Test toggle items render (toggle items in single mode have role="radio")
      const leftToggle = canvas.getByRole("radio", { name: "Left aligned" });
      const centerToggle = canvas.getByRole("radio", { name: "Center aligned" });
      const rightToggle = canvas.getByRole("radio", { name: "Right aligned" });
      const justifyToggle = canvas.getByRole("radio", { name: "Justified" });

      expect(leftToggle).toBeInTheDocument();
      expect(centerToggle).toBeInTheDocument();
      expect(rightToggle).toBeInTheDocument();
      expect(justifyToggle).toBeInTheDocument();

      // Test default selection (center)
      expect(centerToggle).toHaveAttribute("data-state", "on");

      // Test clicking a different toggle
      await user.click(leftToggle);
      expect(leftToggle).toHaveAttribute("data-state", "on");
      expect(centerToggle).toHaveAttribute("data-state", "off");
    },
  },
  {
    renderSpec: {
    type: "ToggleGroup",
    selectionType: "single", 
    defaultValue: "center",
    children: [
      {
        type: "ToggleGroupItem",
        value: "left",
        "aria-label": "Left aligned",
        children: {
          type: "Icon",
          name: "align-left",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "center",
        "aria-label": "Center aligned",
        children: {
          type: "Icon",
          name: "align-center",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "right",
        "aria-label": "Right aligned",
        children: {
          type: "Icon",
          name: "align-right",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "justify",
        "aria-label": "Justified",
        children: {
          type: "Icon",
          name: "align-justify",
          size: 16
        }
      }
    ]
  }
});

export const Multiple = enhanceStoryForDualMode(
  {
    render: () => (
      <ToggleGroup type="multiple" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test toggle group renders
      const toggleGroup = canvas.getByRole("group");
      expect(toggleGroup).toBeInTheDocument();

      // Test toggle items render (toggle items in multiple mode have role="button")
      const boldToggle = canvas.getByRole("button", { name: "Toggle bold" });
      const italicToggle = canvas.getByRole("button", { name: "Toggle italic" });
      const underlineToggle = canvas.getByRole("button", { name: "Toggle underline" });

      expect(boldToggle).toBeInTheDocument();
      expect(italicToggle).toBeInTheDocument();
      expect(underlineToggle).toBeInTheDocument();

      // Test default selection (bold)
      expect(boldToggle).toHaveAttribute("data-state", "on");
      expect(italicToggle).toHaveAttribute("data-state", "off");

      // Test clicking multiple toggles (multiple mode)
      await user.click(italicToggle);
      expect(boldToggle).toHaveAttribute("data-state", "on");
      expect(italicToggle).toHaveAttribute("data-state", "on");

      await user.click(underlineToggle);
      expect(boldToggle).toHaveAttribute("data-state", "on");
      expect(italicToggle).toHaveAttribute("data-state", "on");
      expect(underlineToggle).toHaveAttribute("data-state", "on");
    },
  },
  {
    renderSpec: {
    type: "ToggleGroup",
    selectionType: "multiple",
    defaultValue: ["bold"],
    children: [
      {
        type: "ToggleGroupItem",
        value: "bold",
        "aria-label": "Toggle bold",
        children: {
          type: "Icon",
          name: "bold",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "italic",
        "aria-label": "Toggle italic",
        children: {
          type: "Icon",
          name: "italic",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "underline",
        "aria-label": "Toggle underline",
        children: {
          type: "Icon",
          name: "underline",
          size: 16
        }
      }
    ]
  }
});

export const Outline = enhanceStoryForDualMode(
  {
    render: () => (
      <ToggleGroup variant="outline" type="single" defaultValue="left">
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      
      // Test toggle group renders
      const toggleGroup = canvas.getByRole("group");
      expect(toggleGroup).toBeInTheDocument();
      
      // Test variant is applied
      expect(toggleGroup).toHaveAttribute("data-variant", "outline");

      // Test toggle items render 
      const leftToggle = canvas.getByRole("radio", { name: "Left aligned" });
      const centerToggle = canvas.getByRole("radio", { name: "Center aligned" });
      const rightToggle = canvas.getByRole("radio", { name: "Right aligned" });

      expect(leftToggle).toBeInTheDocument();
      expect(centerToggle).toBeInTheDocument();
      expect(rightToggle).toBeInTheDocument();

      // Test default selection (left)
      expect(leftToggle).toHaveAttribute("data-state", "on");
    },
  },
  {
    renderSpec: {
    type: "ToggleGroup",
    variant: "outline",
    selectionType: "single",
    defaultValue: "left",
    children: [
      {
        type: "ToggleGroupItem",
        value: "left",
        "aria-label": "Left aligned",
        children: {
          type: "Icon",
          name: "align-left",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "center",
        "aria-label": "Center aligned",
        children: {
          type: "Icon",
          name: "align-center",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "right",
        "aria-label": "Right aligned",
        children: {
          type: "Icon",
          name: "align-right",
          size: 16
        }
      }
    ]
  }
});

export const Small = enhanceStoryForDualMode(
  {
    render: () => (
      <ToggleGroup size="sm" type="single" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={14} />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      
      // Test toggle group renders
      const toggleGroup = canvas.getByRole("group");
      expect(toggleGroup).toBeInTheDocument();
      
      // Test size is applied
      expect(toggleGroup).toHaveAttribute("data-size", "sm");

      // Test toggle items render 
      const leftToggle = canvas.getByRole("radio", { name: "Left aligned" });
      const centerToggle = canvas.getByRole("radio", { name: "Center aligned" });
      const rightToggle = canvas.getByRole("radio", { name: "Right aligned" });

      expect(leftToggle).toBeInTheDocument();
      expect(centerToggle).toBeInTheDocument();
      expect(rightToggle).toBeInTheDocument();

      // Test default selection (center)
      expect(centerToggle).toHaveAttribute("data-state", "on");
    },
  },
  {
    renderSpec: {
    type: "ToggleGroup",
    size: "sm",
    selectionType: "single",
    defaultValue: "center",
    children: [
      {
        type: "ToggleGroupItem",
        value: "left",
        "aria-label": "Left aligned",
        children: {
          type: "Icon",
          name: "align-left",
          size: 14
        }
      },
      {
        type: "ToggleGroupItem",
        value: "center",
        "aria-label": "Center aligned",
        children: {
          type: "Icon",
          name: "align-center",
          size: 14
        }
      },
      {
        type: "ToggleGroupItem",
        value: "right",
        "aria-label": "Right aligned",
        children: {
          type: "Icon",
          name: "align-right",
          size: 14
        }
      }
    ]
  }
});

export const Large = enhanceStoryForDualMode(
  {
    render: () => (
      <ToggleGroup size="lg" type="single" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={20} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={20} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={20} />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      
      // Test toggle group renders
      const toggleGroup = canvas.getByRole("group");
      expect(toggleGroup).toBeInTheDocument();
      
      // Test size is applied
      expect(toggleGroup).toHaveAttribute("data-size", "lg");

      // Test toggle items render 
      const leftToggle = canvas.getByRole("radio", { name: "Left aligned" });
      const centerToggle = canvas.getByRole("radio", { name: "Center aligned" });
      const rightToggle = canvas.getByRole("radio", { name: "Right aligned" });

      expect(leftToggle).toBeInTheDocument();
      expect(centerToggle).toBeInTheDocument();
      expect(rightToggle).toBeInTheDocument();

      // Test default selection (center)
      expect(centerToggle).toHaveAttribute("data-state", "on");
    },
  },
  {
    renderSpec: {
    type: "ToggleGroup",
    size: "lg",
    selectionType: "single",
    defaultValue: "center",
    children: [
      {
        type: "ToggleGroupItem",
        value: "left",
        "aria-label": "Left aligned",
        children: {
          type: "Icon",
          name: "align-left",
          size: 20
        }
      },
      {
        type: "ToggleGroupItem",
        value: "center",
        "aria-label": "Center aligned",
        children: {
          type: "Icon",
          name: "align-center",
          size: 20
        }
      },
      {
        type: "ToggleGroupItem",
        value: "right",
        "aria-label": "Right aligned",
        children: {
          type: "Icon",
          name: "align-right",
          size: 20
        }
      }
    ]
  }
});

export const WithText = enhanceStoryForDualMode(
  {
    render: () => (
      <ToggleGroup type="single" defaultValue="left">
        <ToggleGroupItem value="left">
          <AlignLeft size={16} className="mr-2" />
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter size={16} className="mr-2" />
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight size={16} className="mr-2" />
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      
      // Test toggle group renders
      const toggleGroup = canvas.getByRole("group");
      expect(toggleGroup).toBeInTheDocument();

      // Test toggle items render 
      const leftToggle = canvas.getByRole("radio", { name: /Left/ });
      const centerToggle = canvas.getByRole("radio", { name: /Center/ });
      const rightToggle = canvas.getByRole("radio", { name: /Right/ });

      expect(leftToggle).toBeInTheDocument();
      expect(centerToggle).toBeInTheDocument();
      expect(rightToggle).toBeInTheDocument();

      // Test default selection (left)
      expect(leftToggle).toHaveAttribute("data-state", "on");
      
      // Test text content is present (text varies between React and SDUI mode)
      // In React mode: "Left", "Center", "Right"
      // In SDUI mode: "← Left", "↔ Center", "→ Right"
      const leftToggleText = (leftToggle as HTMLElement).textContent || "";
      const centerToggleText = (centerToggle as HTMLElement).textContent || "";
      const rightToggleText = (rightToggle as HTMLElement).textContent || "";
      
      expect(leftToggleText).toMatch(/Left/);
      expect(centerToggleText).toMatch(/Center/);
      expect(rightToggleText).toMatch(/Right/);
    },
  },
  {
    renderSpec: {
    type: "ToggleGroup",
    selectionType: "single",
    defaultValue: "left",
    children: [
      {
        type: "ToggleGroupItem",
        value: "left",
        children: [
          {
            type: "Icon",
            name: "align-left",
            size: 16,
            className: "mr-2"
          },
          "Left"
        ]
      },
      {
        type: "ToggleGroupItem",
        value: "center",
        children: [
          {
            type: "Icon",
            name: "align-center",
            size: 16,
            className: "mr-2"
          },
          "Center"
        ]
      },
      {
        type: "ToggleGroupItem",
        value: "right",
        children: [
          {
            type: "Icon",
            name: "align-right",
            size: 16,
            className: "mr-2"
          },
          "Right"
        ]
      }
    ]
  }
});

export const Disabled = enhanceStoryForDualMode(
  {
    render: () => (
      <ToggleGroup type="single" disabled={true} defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test disabled toggle group (disabled toggles have role="radio")
      const leftToggle = canvas.getByRole("radio", { name: "Left aligned" });
      const centerToggle = canvas.getByRole("radio", { name: "Center aligned" });
      const rightToggle = canvas.getByRole("radio", { name: "Right aligned" });

      expect(leftToggle).toBeInTheDocument();
      expect(centerToggle).toBeInTheDocument();
      expect(rightToggle).toBeInTheDocument();

      // Test all items are disabled
      expect(leftToggle).toBeDisabled();
      expect(centerToggle).toBeDisabled();
      expect(rightToggle).toBeDisabled();

      // Test default selection is still maintained
      expect(centerToggle).toHaveAttribute("data-state", "on");
    },
  },
  {
    renderSpec: {
    type: "ToggleGroup",
    selectionType: "single",
    disabled: true,
    defaultValue: "center",
    children: [
      {
        type: "ToggleGroupItem",
        value: "left",
        "aria-label": "Left aligned",
        children: {
          type: "Icon",
          name: "align-left",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "center",
        "aria-label": "Center aligned",
        children: {
          type: "Icon",
          name: "align-center",
          size: 16
        }
      },
      {
        type: "ToggleGroupItem",
        value: "right",
        "aria-label": "Right aligned",
        children: {
          type: "Icon",
          name: "align-right",
          size: 16
        }
      }
    ]
  }
});

export const SizeComparison = enhanceStoryForDualMode(
  {
    render: () => (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Small (sm)</p>
          <ToggleGroup type="single" size="sm" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Left aligned">
              <AlignLeft size={14} />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center aligned">
              <AlignCenter size={14} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right aligned">
              <AlignRight size={14} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Default</p>
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Left aligned">
              <AlignLeft size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center aligned">
              <AlignCenter size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right aligned">
              <AlignRight size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Large (lg)</p>
          <ToggleGroup type="single" size="lg" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Left aligned">
              <AlignLeft size={20} />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center aligned">
              <AlignCenter size={20} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right aligned">
              <AlignRight size={20} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      
      // Test all size variants render
      const smallLabel = canvas.getByText("Small (sm)");
      const defaultLabel = canvas.getByText("Default");
      const largeLabel = canvas.getByText("Large (lg)");
      
      expect(smallLabel).toBeInTheDocument();
      expect(defaultLabel).toBeInTheDocument();
      expect(largeLabel).toBeInTheDocument();
      
      // Test all toggle groups render
      const toggleGroups = canvas.getAllByRole("group");
      expect(toggleGroups).toHaveLength(3);
      
      // Test sizes are correctly applied
      expect(toggleGroups[0]).toHaveAttribute("data-size", "sm");
      expect(toggleGroups[1]).not.toHaveAttribute("data-size"); // default has no size attribute
      expect(toggleGroups[2]).toHaveAttribute("data-size", "lg");
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
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Text",
              size: "sm",
              className: "text-muted-foreground",
              children: "Small (sm)"
            },
            {
              type: "ToggleGroup",
              selectionType: "single",
              size: "sm",
              defaultValue: "center",
              children: [
                {
                  type: "ToggleGroupItem",
                  value: "left",
                  "aria-label": "Left aligned",
                  children: {
                    type: "Icon",
                    name: "align-left",
                    size: 14
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "center",
                  "aria-label": "Center aligned",
                  children: {
                    type: "Icon",
                    name: "align-center",
                    size: 14
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "right",
                  "aria-label": "Right aligned",
                  children: {
                    type: "Icon",
                    name: "align-right",
                    size: 14
                  }
                }
              ]
            }
          ]
        },
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Text",
              size: "sm",
              className: "text-muted-foreground",
              children: "Default"
            },
            {
              type: "ToggleGroup",
              selectionType: "single",
              defaultValue: "center",
              children: [
                {
                  type: "ToggleGroupItem",
                  value: "left",
                  "aria-label": "Left aligned",
                  children: {
                    type: "Icon",
                    name: "align-left",
                    size: 16
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "center",
                  "aria-label": "Center aligned",
                  children: {
                    type: "Icon",
                    name: "align-center",
                    size: 16
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "right",
                  "aria-label": "Right aligned",
                  children: {
                    type: "Icon",
                    name: "align-right",
                    size: 16
                  }
                }
              ]
            }
          ]
        },
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Text",
              size: "sm",
              className: "text-muted-foreground",
              children: "Large (lg)"
            },
            {
              type: "ToggleGroup",
              selectionType: "single",
              size: "lg",
              defaultValue: "center",
              children: [
                {
                  type: "ToggleGroupItem",
                  value: "left",
                  "aria-label": "Left aligned",
                  children: {
                    type: "Icon",
                    name: "align-left",
                    size: 20
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "center",
                  "aria-label": "Center aligned",
                  children: {
                    type: "Icon",
                    name: "align-center",
                    size: 20
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "right",
                  "aria-label": "Right aligned",
                  children: {
                    type: "Icon",
                    name: "align-right",
                    size: 20
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
);

export const VariantsShowcase = enhanceStoryForDualMode(
  {
    render: () => (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Default variant</p>
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Left aligned">
              <AlignLeft size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center aligned">
              <AlignCenter size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right aligned">
              <AlignRight size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Outline variant</p>
          <ToggleGroup type="single" variant="outline" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Left aligned">
              <AlignLeft size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center aligned">
              <AlignCenter size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right aligned">
              <AlignRight size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      
      // Test variant labels render
      const defaultLabel = canvas.getByText("Default variant");
      const outlineLabel = canvas.getByText("Outline variant");
      
      expect(defaultLabel).toBeInTheDocument();
      expect(outlineLabel).toBeInTheDocument();
      
      // Test all toggle groups render
      const toggleGroups = canvas.getAllByRole("group");
      expect(toggleGroups).toHaveLength(2);
      
      // Test variants are correctly applied
      expect(toggleGroups[0]).not.toHaveAttribute("data-variant"); // default has no variant attribute
      expect(toggleGroups[1]).toHaveAttribute("data-variant", "outline");
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
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Text",
              size: "sm",
              className: "text-muted-foreground",
              children: "Default variant"
            },
            {
              type: "ToggleGroup",
              selectionType: "single",
              defaultValue: "center",
              children: [
                {
                  type: "ToggleGroupItem",
                  value: "left",
                  "aria-label": "Left aligned",
                  children: {
                    type: "Icon",
                    name: "align-left",
                    size: 16
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "center",
                  "aria-label": "Center aligned",
                  children: {
                    type: "Icon",
                    name: "align-center",
                    size: 16
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "right",
                  "aria-label": "Right aligned",
                  children: {
                    type: "Icon",
                    name: "align-right",
                    size: 16
                  }
                }
              ]
            }
          ]
        },
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Text",
              size: "sm",
              className: "text-muted-foreground",
              children: "Outline variant"
            },
            {
              type: "ToggleGroup",
              selectionType: "single",
              variant: "outline",
              defaultValue: "center",
              children: [
                {
                  type: "ToggleGroupItem",
                  value: "left",
                  "aria-label": "Left aligned",
                  children: {
                    type: "Icon",
                    name: "align-left",
                    size: 16
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "center",
                  "aria-label": "Center aligned",
                  children: {
                    type: "Icon",
                    name: "align-center",
                    size: 16
                  }
                },
                {
                  type: "ToggleGroupItem",
                  value: "right",
                  "aria-label": "Right aligned",
                  children: {
                    type: "Icon",
                    name: "align-right",
                    size: 16
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
);
