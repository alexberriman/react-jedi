import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import * as React from "react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Form Components/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `A modern toggle switch component that allows users to switch between on and off states. Built on top of Radix UI Switch.

## Usage

\`\`\`tsx
<Switch 
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
/>
\`\`\``,
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled state of the switch",
    },
    defaultChecked: {
      control: "boolean",
      description: "The default state for uncontrolled usage",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    onCheckedChange: {
      action: "checked changed",
      description: "Called when the state changes",
    },
  },

  tags: ['autodocs', 'ui-switch']};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: () => <Switch />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test switch renders
    const switchButton = canvas.getByRole("switch");
    expect(switchButton).toBeInTheDocument();

    // Test initial unchecked state
    expect(switchButton).not.toBeChecked();
    expect(switchButton).toHaveAttribute("data-state", "unchecked");

    // Test clicking to toggle
    await user.click(switchButton);
    expect(switchButton).toBeChecked();
    expect(switchButton).toHaveAttribute("data-state", "checked");

    // Test clicking again to toggle back
    await user.click(switchButton);
    expect(switchButton).not.toBeChecked();
    expect(switchButton).toHaveAttribute("data-state", "unchecked");
  },
};

export const DefaultChecked: Story = {
  render: () => <Switch defaultChecked />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test switch renders with default checked state
    const switchButton = canvas.getByRole("switch");
    expect(switchButton).toBeInTheDocument();
    expect(switchButton).toBeChecked();
    expect(switchButton).toHaveAttribute("data-state", "checked");

    // Test clicking to uncheck
    await user.click(switchButton);
    expect(switchButton).not.toBeChecked();
    expect(switchButton).toHaveAttribute("data-state", "unchecked");
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch disabled />
        <span className="text-sm text-muted-foreground">Disabled (unchecked)</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch disabled defaultChecked />
        <span className="text-sm text-muted-foreground">Disabled (checked)</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test both disabled switches
    const switches = canvas.getAllByRole("switch");
    expect(switches).toHaveLength(2);

    const disabledUnchecked = switches[0];
    const disabledChecked = switches[1];

    // Test disabled states
    expect(disabledUnchecked).toBeDisabled();
    expect(disabledChecked).toBeDisabled();

    // Test initial checked states
    expect(disabledUnchecked).not.toBeChecked();
    expect(disabledChecked).toBeChecked();

    // Test disabled attribute
    expect(disabledUnchecked).toHaveAttribute("disabled");
    expect(disabledChecked).toHaveAttribute("disabled");

    // Test labels
    expect(canvas.getByText("Disabled (unchecked)")).toBeInTheDocument();
    expect(canvas.getByText("Disabled (checked)")).toBeInTheDocument();
  },
};

const ControlledExample = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm">Status: {checked ? "On" : "Off"}</span>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Toggle programmatically
      </button>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test controlled switch and status text
    const switchButton = canvas.getByRole("switch");
    const statusText = canvas.getByText("Status: Off");
    const toggleButton = canvas.getByRole("button", { name: "Toggle programmatically" });

    expect(switchButton).toBeInTheDocument();
    expect(statusText).toBeInTheDocument();
    expect(toggleButton).toBeInTheDocument();

    // Test initial state
    expect(switchButton).not.toBeChecked();

    // Test clicking switch directly
    await user.click(switchButton);
    expect(switchButton).toBeChecked();
    expect(canvas.getByText("Status: On")).toBeInTheDocument();

    // Test programmatic toggle button
    await user.click(toggleButton);
    expect(switchButton).not.toBeChecked();
    expect(canvas.getByText("Status: Off")).toBeInTheDocument();

    // Test programmatic toggle again
    await user.click(toggleButton);
    expect(switchButton).toBeChecked();
    expect(canvas.getByText("Status: On")).toBeInTheDocument();
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">WiFi</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Bluetooth</span>
        <Switch />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Airplane Mode</span>
        <Switch />
      </div>
    </div>
  ),
};

const WithFormExample = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);
  const [security, setSecurity] = React.useState(true);

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Email Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Notifications</p>
            <p className="text-sm text-muted-foreground">
              Receive email about your account activity
            </p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Marketing</p>
            <p className="text-sm text-muted-foreground">Receive promotional emails and updates</p>
          </div>
          <Switch checked={marketing} onCheckedChange={setMarketing} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Security Alerts</p>
            <p className="text-sm text-muted-foreground">Important security updates and alerts</p>
          </div>
          <Switch checked={security} onCheckedChange={setSecurity} disabled />
        </div>
      </div>
    </div>
  );
};

export const WithForm: Story = {
  render: () => <WithFormExample />,
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="scale-75">
          <Switch />
        </div>
        <span className="text-sm">Small (scaled)</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch />
        <span className="text-sm">Default</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="scale-125">
          <Switch />
        </div>
        <span className="text-sm">Large (scaled)</span>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Switch className="data-[state=checked]:bg-green-500" />
        <span className="text-sm">Green when checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch className="data-[state=checked]:bg-orange-500" />
        <span className="text-sm">Orange when checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch className="data-[state=checked]:bg-purple-500" />
        <span className="text-sm">Purple when checked</span>
      </div>
    </div>
  ),
};

const AdvancedExampleComponent = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [autoSave, setAutoSave] = React.useState(true);
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    sms: false,
  });

  return (
    <div className="w-full max-w-md p-6 border rounded-lg space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Use dark theme across the app</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Auto-save</p>
              <p className="text-sm text-muted-foreground">Automatically save your work</p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="font-medium text-sm mb-3">Notifications</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, email: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Push</span>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, push: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">SMS</span>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, sms: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdvancedExample: Story = {
  render: () => <AdvancedExampleComponent />,
};
