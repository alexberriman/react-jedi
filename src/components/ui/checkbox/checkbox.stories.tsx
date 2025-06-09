import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "../label";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta: Meta<typeof Checkbox> = {
  title: "Form Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the checkbox is checked by default",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    onCheckedChange: {
      action: "checked change",
      description: "Called when the checked state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Checkbox>({
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is unchecked by default
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    // Click to check
    await userEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeChecked();
      expect(checkbox).toHaveAttribute("data-state", "checked");
    });

    // Click to uncheck
    await userEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toHaveAttribute("data-state", "unchecked");
    });
  },
});

export const Checked: Story = enhanceStoryForDualMode<typeof Checkbox>({
  args: {
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is checked by default
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("data-state", "checked");
  },
});

export const Disabled: Story = enhanceStoryForDualMode<typeof Checkbox>({
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is disabled and unchecked
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  },
});

export const DisabledChecked: Story = enhanceStoryForDualMode<typeof Checkbox>({
  args: {
    disabled: true,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    // Verify checkbox is disabled and checked
    expect(checkbox).toBeDisabled();
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("data-state", "checked");
  },
});

const CheckboxWithLabel = () => (
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms and conditions</Label>
  </div>
);

export const WithLabel: Story = enhanceStoryForDualMode<typeof Checkbox>(
  {
    render: () => <CheckboxWithLabel />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Find checkbox by its label
      const checkbox = canvas.getByRole("checkbox", { name: /accept terms and conditions/i });
      const label = canvas.getByText(/accept terms and conditions/i);

      // Verify label is properly associated
      expect(checkbox).toHaveAttribute("id", "terms");
      expect(label).toHaveAttribute("for", "terms");

      // Click label to toggle checkbox
      await userEvent.click(label);
      expect(checkbox).toBeChecked();

      // Click checkbox directly to uncheck
      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      align: "center",
      gap: "sm",
      children: [
        {
          type: "Checkbox",
          id: "terms",
        },
        {
          type: "Label",
          htmlFor: "terms",
          children: "Accept terms and conditions",
        },
      ],
    },
  }
);

const ControlledCheckbox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="controlled"
          checked={checked}
          onCheckedChange={(value) => {
            if (value !== "indeterminate") {
              setChecked(value);
            }
          }}
        />
        <Label htmlFor="controlled">Controlled checkbox (checked: {String(checked)})</Label>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setChecked(!checked)}
      >
        Toggle from outside
      </button>
    </div>
  );
};

export const Controlled: Story = enhanceStoryForDualMode<typeof Checkbox>(
  {
    render: () => <ControlledCheckbox />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const checkbox = canvas.getByRole("checkbox", { name: /controlled checkbox/i });
      const toggleButton = canvas.getByRole("button", { name: /toggle from outside/i });

      // Initially unchecked
      expect(checkbox).not.toBeChecked();

      // Check if we're in SDUI mode by looking at the container data attribute
      const isSDUIMode = Object.hasOwn(canvasElement.dataset, 'testid') && 
                         canvasElement.dataset.testid === 'sdui-render';

      if (isSDUIMode) {
        // In SDUI mode, just verify the static elements render correctly
        expect(canvas.getByText(/controlled checkbox/i)).toBeInTheDocument();
        expect(toggleButton).toBeInTheDocument();
      } else {
        // In React mode, test the full interactive behavior
        expect(canvas.getByText(/checked: false/i)).toBeInTheDocument();

        // Toggle via button
        await userEvent.click(toggleButton);
        expect(checkbox).toBeChecked();
        expect(canvas.getByText(/checked: true/i)).toBeInTheDocument();

        // Toggle via checkbox
        await userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(canvas.getByText(/checked: false/i)).toBeInTheDocument();
      }
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
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Checkbox",
              id: "controlled",
              checked: false,
            },
            {
              type: "Label",
              htmlFor: "controlled",
              children: "Controlled checkbox (checked: false)",
            },
          ],
        },
        {
          type: "Button",
          variant: "default",
          className: "px-4 py-2 bg-blue-500 text-white rounded",
          children: "Toggle from outside",
        },
      ],
    },
  }
);

const MultipleCheckboxesComponent = () => {
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({
    option1: false,
    option2: true,
    option3: false,
  });

  const handleCheckedChange = (option: string, checked: boolean | "indeterminate") => {
    if (checked !== "indeterminate") {
      setCheckedItems((prev) => ({ ...prev, [option]: checked }));
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-lg mb-3">Select your preferences</h3>
      {Object.entries(checkedItems).map(([key, checked]) => (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            id={key}
            checked={checked}
            onCheckedChange={(checked) => handleCheckedChange(key, checked)}
          />
          <Label htmlFor={key}>
            {key.charAt(0).toUpperCase() + key.slice(1).replaceAll(/\d/g, " $&")}
          </Label>
        </div>
      ))}
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <code>{JSON.stringify(checkedItems, null, 2)}</code>
      </div>
    </div>
  );
};

export const MultipleCheckboxes: Story = enhanceStoryForDualMode<typeof Checkbox>(
  {
    render: () => <MultipleCheckboxesComponent />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test that the heading renders
      const heading = canvas.getByText("Select your preferences");
      expect(heading).toBeInTheDocument();

      // Test that the checkboxes render
      const option1 = canvas.getByRole("checkbox", { name: /Option 1/i });
      const option2 = canvas.getByRole("checkbox", { name: /Option 2/i });
      const option3 = canvas.getByRole("checkbox", { name: /Option 3/i });

      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
      expect(option3).toBeInTheDocument();

      // Test initial states
      expect(option1).not.toBeChecked();
      expect(option2).toBeChecked(); // default true
      expect(option3).not.toBeChecked();

      // Test that JSON display is present
      expect(canvas.getByText(/option1/)).toBeInTheDocument();
      expect(canvas.getByText(/option2/)).toBeInTheDocument();
      expect(canvas.getByText(/option3/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Heading",
          level: 3,
          className: "font-medium text-lg mb-3",
          children: "Select your preferences",
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Checkbox",
              id: "option1",
              checked: false,
            },
            {
              type: "Label",
              htmlFor: "option1",
              children: "Option 1",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Checkbox",
              id: "option2",
              checked: true,
            },
            {
              type: "Label",
              htmlFor: "option2",
              children: "Option 2",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Checkbox",
              id: "option3",
              checked: false,
            },
            {
              type: "Label",
              htmlFor: "option3",
              children: "Option 3",
            },
          ],
        },
        {
          type: "Box",
          className: "mt-4 p-3 bg-gray-100 rounded",
          children: {
            type: "Text",
            element: "code",
            children: '{\n  "option1": false,\n  "option2": true,\n  "option3": false\n}',
          },
        },
      ],
    },
  }
);

const IndeterminateCheckbox = () => {
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean | "indeterminate">>(
    {
      all: false,
      option1: false,
      option2: false,
      option3: false,
    }
  );

  const allChecked =
    checkedItems.option1 === true && checkedItems.option2 === true && checkedItems.option3 === true;
  const someChecked =
    checkedItems.option1 === true || checkedItems.option2 === true || checkedItems.option3 === true;

  const handleAllChange = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setCheckedItems({
        all: true,
        option1: true,
        option2: true,
        option3: true,
      });
    } else if (checked === false) {
      setCheckedItems({
        all: false,
        option1: false,
        option2: false,
        option3: false,
      });
    }
  };

  const handleOptionChange = (option: string, checked: boolean | "indeterminate") => {
    if (checked !== "indeterminate") {
      const newItems = { ...checkedItems, [option]: checked };
      const options = ["option1", "option2", "option3"];
      const allOptionsChecked = options.every((opt) => newItems[opt] === true);
      const someOptionsChecked = options.some((opt) => newItems[opt] === true);

      let allState: boolean | "indeterminate";
      if (allOptionsChecked) {
        allState = true;
      } else if (someOptionsChecked) {
        allState = "indeterminate";
      } else {
        allState = false;
      }

      newItems.all = allState;
      setCheckedItems(newItems);
    }
  };

  React.useEffect(() => {
    let newAllState: boolean | "indeterminate";
    if (allChecked) {
      newAllState = true;
    } else if (someChecked) {
      newAllState = "indeterminate";
    } else {
      newAllState = false;
    }

    setCheckedItems((prev) => {
      if (prev.all !== newAllState) {
        return { ...prev, all: newAllState };
      }
      return prev;
    });
  }, [allChecked, someChecked]);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 pb-2 border-b">
        <Checkbox id="select-all" checked={checkedItems.all} onCheckedChange={handleAllChange} />
        <Label htmlFor="select-all" className="font-semibold">
          Select all options
        </Label>
      </div>
      <div className="pl-6 space-y-2">
        {["option1", "option2", "option3"].map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={checkedItems[option] as boolean}
              onCheckedChange={(checked) => handleOptionChange(option, checked)}
            />
            <Label htmlFor={option}>
              {option.charAt(0).toUpperCase() + option.slice(1).replaceAll(/\d/g, " $&")}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const IndeterminateExample: Story = enhanceStoryForDualMode<typeof Checkbox>(
  {
    render: () => <IndeterminateCheckbox />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test that main checkbox renders
      const selectAllCheckbox = canvas.getByRole("checkbox", { name: /select all options/i });
      expect(selectAllCheckbox).toBeInTheDocument();

      // Test that sub-options render
      const option1 = canvas.getByRole("checkbox", { name: /Option 1/i });
      const option2 = canvas.getByRole("checkbox", { name: /Option 2/i });
      const option3 = canvas.getByRole("checkbox", { name: /Option 3/i });

      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
      expect(option3).toBeInTheDocument();

      // Test initial states - all should be unchecked initially
      expect(selectAllCheckbox).not.toBeChecked();
      expect(option1).not.toBeChecked();
      expect(option2).not.toBeChecked();
      expect(option3).not.toBeChecked();
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
          align: "center",
          gap: "sm",
          className: "pb-2 border-b",
          children: [
            {
              type: "Checkbox",
              id: "select-all",
              checked: false,
            },
            {
              type: "Label",
              htmlFor: "select-all",
              className: "font-semibold",
              children: "Select all options",
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          className: "pl-6",
          children: [
            {
              type: "Flex",
              align: "center",
              gap: "sm",
              children: [
                {
                  type: "Checkbox",
                  id: "option1",
                  checked: false,
                },
                {
                  type: "Label",
                  htmlFor: "option1",
                  children: "Option 1",
                },
              ],
            },
            {
              type: "Flex",
              align: "center",
              gap: "sm",
              children: [
                {
                  type: "Checkbox",
                  id: "option2",
                  checked: false,
                },
                {
                  type: "Label",
                  htmlFor: "option2",
                  children: "Option 2",
                },
              ],
            },
            {
              type: "Flex",
              align: "center",
              gap: "sm",
              children: [
                {
                  type: "Checkbox",
                  id: "option3",
                  checked: false,
                },
                {
                  type: "Label",
                  htmlFor: "option3",
                  children: "Option 3",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);
