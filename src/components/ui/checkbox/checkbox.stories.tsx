import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "../label";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

export const Default: Story = {
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
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

const CheckboxWithLabel = () => (
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms and conditions</Label>
  </div>
);

export const WithLabel: Story = {
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
};

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

export const Controlled: Story = {
  render: () => <ControlledCheckbox />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByRole("checkbox", { name: /controlled checkbox/i });
    const toggleButton = canvas.getByRole("button", { name: /toggle from outside/i });

    // Initially unchecked
    expect(checkbox).not.toBeChecked();
    expect(canvas.getByText(/checked: false/i)).toBeInTheDocument();

    // Toggle via button
    await userEvent.click(toggleButton);
    expect(checkbox).toBeChecked();
    expect(canvas.getByText(/checked: true/i)).toBeInTheDocument();

    // Toggle via checkbox
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(canvas.getByText(/checked: false/i)).toBeInTheDocument();
  },
};

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

export const MultipleCheckboxes: Story = {
  render: () => <MultipleCheckboxesComponent />,
};

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

export const IndeterminateExample: Story = {
  render: () => <IndeterminateCheckbox />,
};
