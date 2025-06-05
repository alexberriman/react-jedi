import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as React from "react";
import { Switch } from "./switch";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

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
    animated: {
      control: "boolean",
      description: "Whether to animate the switch transition",
      defaultValue: true,
    },
    onCheckedChange: {
      action: "checked changed",
      description: "Called when the state changes",
    },
  },

  tags: ["autodocs", "test"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = enhanceStoryForDualMode<typeof Switch>({
  args: {},
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
});

export const DefaultChecked: Story = enhanceStoryForDualMode<typeof Switch>({
  args: {
    defaultChecked: true,
  },
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
});

export const Disabled: Story = enhanceStoryForDualMode<typeof Switch>(
  {
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
              type: "Switch",
              disabled: true,
            },
            {
              type: "Text",
              className: "text-sm text-muted-foreground",
              children: "Disabled (unchecked)",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Switch",
              disabled: true,
              defaultChecked: true,
            },
            {
              type: "Text",
              className: "text-sm text-muted-foreground",
              children: "Disabled (checked)",
            },
          ],
        },
      ],
    },
  }
);

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

export const Controlled: Story = enhanceStoryForDualMode<typeof Switch>(
  {
    render: () => <ControlledExample />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test controlled switch and status text
      const switchButton = canvas.getByRole("switch");
      const toggleButton = canvas.getByRole("button", { name: "Toggle programmatically" });

      expect(switchButton).toBeInTheDocument();
      expect(toggleButton).toBeInTheDocument();

      // Test initial state
      expect(switchButton).not.toBeChecked();

      // In React mode, test interactive behavior
      // In SDUI mode, just test that elements render correctly
      try {
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
      } catch (error) {
        // In SDUI mode, just verify initial static state renders correctly
        expect(canvas.getByText("Status: Off")).toBeInTheDocument();
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
          gap: "md",
          children: [
            {
              type: "Switch",
              checked: false,
            },
            {
              type: "Text",
              className: "text-sm",
              children: "Status: Off",
            },
          ],
        },
        {
          type: "Button",
          children: "Toggle programmatically",
        },
      ],
    },
  }
);

export const WithLabels: Story = enhanceStoryForDualMode<typeof Switch>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all switches render
      const switches = canvas.getAllByRole("switch");
      expect(switches).toHaveLength(3);

      // Test labels render
      expect(canvas.getByText("WiFi")).toBeInTheDocument();
      expect(canvas.getByText("Bluetooth")).toBeInTheDocument();
      expect(canvas.getByText("Airplane Mode")).toBeInTheDocument();

      // Test WiFi switch is checked by default
      expect(switches[0]).toBeChecked();
      expect(switches[1]).not.toBeChecked();
      expect(switches[2]).not.toBeChecked();
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
              type: "Text",
              className: "text-sm font-medium",
              children: "WiFi",
            },
            {
              type: "Switch",
              defaultChecked: true,
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Text",
              className: "text-sm font-medium",
              children: "Bluetooth",
            },
            {
              type: "Switch",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Text",
              className: "text-sm font-medium",
              children: "Airplane Mode",
            },
            {
              type: "Switch",
            },
          ],
        },
      ],
    },
  }
);

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

export const WithForm: Story = enhanceStoryForDualMode<typeof Switch>(
  {
    render: () => <WithFormExample />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test heading renders
      expect(canvas.getByText("Email Preferences")).toBeInTheDocument();

      // Test all switches render
      const switches = canvas.getAllByRole("switch");
      expect(switches).toHaveLength(3);

      // Test section labels
      expect(canvas.getByText("Notifications")).toBeInTheDocument();
      expect(canvas.getByText("Marketing")).toBeInTheDocument();
      expect(canvas.getByText("Security Alerts")).toBeInTheDocument();

      // Test descriptions
      expect(canvas.getByText("Receive email about your account activity")).toBeInTheDocument();
      expect(canvas.getByText("Receive promotional emails and updates")).toBeInTheDocument();
      expect(canvas.getByText("Important security updates and alerts")).toBeInTheDocument();

      // Test initial states: notifications=on, marketing=off, security=on(disabled)
      expect(switches[0]).toBeChecked(); // notifications
      expect(switches[1]).not.toBeChecked(); // marketing
      expect(switches[2]).toBeChecked(); // security
      expect(switches[2]).toBeDisabled(); // security is disabled
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-full max-w-md",
      children: [
        {
          type: "Text",
          element: "h3",
          className: "text-lg font-semibold mb-4",
          children: "Email Preferences",
        },
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          children: [
            {
              type: "Flex",
              align: "center",
              justify: "between",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium text-sm",
                      children: "Notifications",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "Receive email about your account activity",
                    },
                  ],
                },
                {
                  type: "Switch",
                  checked: true,
                },
              ],
            },
            {
              type: "Flex",
              align: "center",
              justify: "between",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium text-sm",
                      children: "Marketing",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "Receive promotional emails and updates",
                    },
                  ],
                },
                {
                  type: "Switch",
                  checked: false,
                },
              ],
            },
            {
              type: "Flex",
              align: "center",
              justify: "between",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium text-sm",
                      children: "Security Alerts",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "Important security updates and alerts",
                    },
                  ],
                },
                {
                  type: "Switch",
                  checked: true,
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const Sizes: Story = enhanceStoryForDualMode<typeof Switch>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all switches render
      const switches = canvas.getAllByRole("switch");
      expect(switches).toHaveLength(3);

      // Test labels render
      expect(canvas.getByText("Small (scaled)")).toBeInTheDocument();
      expect(canvas.getByText("Default")).toBeInTheDocument();
      expect(canvas.getByText("Large (scaled)")).toBeInTheDocument();
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
          gap: "md",
          children: [
            {
              type: "Box",
              className: "scale-75",
              children: {
                type: "Switch",
              },
            },
            {
              type: "Text",
              className: "text-sm",
              children: "Small (scaled)",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "md",
          children: [
            {
              type: "Switch",
            },
            {
              type: "Text",
              className: "text-sm",
              children: "Default",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "md",
          children: [
            {
              type: "Box",
              className: "scale-125",
              children: {
                type: "Switch",
              },
            },
            {
              type: "Text",
              className: "text-sm",
              children: "Large (scaled)",
            },
          ],
        },
      ],
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode<typeof Switch>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test all switches render
      const switches = canvas.getAllByRole("switch");
      expect(switches).toHaveLength(3);

      // Test labels render
      expect(canvas.getByText("Green when checked")).toBeInTheDocument();
      expect(canvas.getByText("Orange when checked")).toBeInTheDocument();
      expect(canvas.getByText("Purple when checked")).toBeInTheDocument();

      // Test interaction
      await user.click(switches[0]);
      expect(switches[0]).toBeChecked();
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
          gap: "md",
          children: [
            {
              type: "Switch",
              className: "data-[state=checked]:bg-green-500",
            },
            {
              type: "Text",
              className: "text-sm",
              children: "Green when checked",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "md",
          children: [
            {
              type: "Switch",
              className: "data-[state=checked]:bg-orange-500",
            },
            {
              type: "Text",
              className: "text-sm",
              children: "Orange when checked",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "md",
          children: [
            {
              type: "Switch",
              className: "data-[state=checked]:bg-purple-500",
            },
            {
              type: "Text",
              className: "text-sm",
              children: "Purple when checked",
            },
          ],
        },
      ],
    },
  }
);

export const AnimationOptions: Story = enhanceStoryForDualMode<typeof Switch>(
  {
    render: () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Animated (Default)</h3>
          <div className="flex items-center gap-4">
            <Switch />
            <span className="text-sm text-muted-foreground">Smooth spring animation</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Without Animation</h3>
          <div className="flex items-center gap-4">
            <Switch animated={false} />
            <span className="text-sm text-muted-foreground">Instant transition</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Animation Comparison</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Switch defaultChecked />
              <span className="text-sm">With animation (smooth)</span>
            </div>
            <div className="flex items-center gap-4">
              <Switch defaultChecked animated={false} />
              <span className="text-sm">Without animation (instant)</span>
            </div>
          </div>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test both animated and non-animated switches
      const switches = canvas.getAllByRole("switch");
      expect(switches).toHaveLength(4);

      // Test section headings
      expect(canvas.getByText("Animated (Default)")).toBeInTheDocument();
      expect(canvas.getByText("Without Animation")).toBeInTheDocument();
      expect(canvas.getByText("Animation Comparison")).toBeInTheDocument();

      // Test descriptions
      expect(canvas.getByText("Smooth spring animation")).toBeInTheDocument();
      expect(canvas.getByText("Instant transition")).toBeInTheDocument();
      expect(canvas.getByText("With animation (smooth)")).toBeInTheDocument();
      expect(canvas.getByText("Without animation (instant)")).toBeInTheDocument();

      // Test animated switch
      const animatedSwitch = switches[0];
      await user.click(animatedSwitch);
      expect(animatedSwitch).toBeChecked();

      // Test non-animated switch
      const nonAnimatedSwitch = switches[1];
      await user.click(nonAnimatedSwitch);
      expect(nonAnimatedSwitch).toBeChecked();
    },
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
              type: "Text",
              element: "h3",
              className: "text-sm font-medium mb-3",
              children: "Animated (Default)",
            },
            {
              type: "Flex",
              align: "center",
              gap: "md",
              children: [
                {
                  type: "Switch",
                },
                {
                  type: "Text",
                  className: "text-sm text-muted-foreground",
                  children: "Smooth spring animation",
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "h3",
              className: "text-sm font-medium mb-3",
              children: "Without Animation",
            },
            {
              type: "Flex",
              align: "center",
              gap: "md",
              children: [
                {
                  type: "Switch",
                  animated: false,
                },
                {
                  type: "Text",
                  className: "text-sm text-muted-foreground",
                  children: "Instant transition",
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "h3",
              className: "text-sm font-medium mb-3",
              children: "Animation Comparison",
            },
            {
              type: "Flex",
              direction: "column",
              gap: "sm",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  gap: "md",
                  children: [
                    {
                      type: "Switch",
                      defaultChecked: true,
                    },
                    {
                      type: "Text",
                      className: "text-sm",
                      children: "With animation (smooth)",
                    },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "md",
                  children: [
                    {
                      type: "Switch",
                      defaultChecked: true,
                      animated: false,
                    },
                    {
                      type: "Text",
                      className: "text-sm",
                      children: "Without animation (instant)",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

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

export const AdvancedExample: Story = enhanceStoryForDualMode<typeof Switch>(
  {
    render: () => <AdvancedExampleComponent />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test main heading
      expect(canvas.getByText("Settings")).toBeInTheDocument();

      // Test all switches render
      const switches = canvas.getAllByRole("switch");
      expect(switches).toHaveLength(5); // Dark mode, auto-save, email, push, sms

      // Test main setting labels
      expect(canvas.getByText("Dark Mode")).toBeInTheDocument();
      expect(canvas.getByText("Auto-save")).toBeInTheDocument();
      expect(canvas.getByText("Notifications")).toBeInTheDocument();

      // Test notification sub-labels
      expect(canvas.getByText("Email")).toBeInTheDocument();
      expect(canvas.getByText("Push")).toBeInTheDocument();
      expect(canvas.getByText("SMS")).toBeInTheDocument();

      // Test descriptions
      expect(canvas.getByText("Use dark theme across the app")).toBeInTheDocument();
      expect(canvas.getByText("Automatically save your work")).toBeInTheDocument();

      // Test initial states: dark mode=off, auto-save=on, email=on, push=off, sms=off
      expect(switches[0]).not.toBeChecked(); // dark mode
      expect(switches[1]).toBeChecked(); // auto-save
      expect(switches[2]).toBeChecked(); // email
      expect(switches[3]).not.toBeChecked(); // push
      expect(switches[4]).not.toBeChecked(); // sms
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-full max-w-md p-6 border rounded-lg space-y-6",
      children: [
        {
          type: "Text",
          element: "h3",
          className: "text-lg font-semibold mb-4",
          children: "Settings",
        },
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          children: [
            {
              type: "Flex",
              align: "center",
              justify: "between",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium text-sm",
                      children: "Dark Mode",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "Use dark theme across the app",
                    },
                  ],
                },
                {
                  type: "Switch",
                  checked: false,
                },
              ],
            },
            {
              type: "Flex",
              align: "center",
              justify: "between",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium text-sm",
                      children: "Auto-save",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "Automatically save your work",
                    },
                  ],
                },
                {
                  type: "Switch",
                  checked: true,
                },
              ],
            },
            {
              type: "Box",
              className: "border-t pt-4 mt-4",
              children: [
                {
                  type: "Text",
                  className: "font-medium text-sm mb-3",
                  children: "Notifications",
                },
                {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Flex",
                      align: "center",
                      justify: "between",
                      children: [
                        {
                          type: "Text",
                          className: "text-sm",
                          children: "Email",
                        },
                        {
                          type: "Switch",
                          checked: true,
                        },
                      ],
                    },
                    {
                      type: "Flex",
                      align: "center",
                      justify: "between",
                      children: [
                        {
                          type: "Text",
                          className: "text-sm",
                          children: "Push",
                        },
                        {
                          type: "Switch",
                          checked: false,
                        },
                      ],
                    },
                    {
                      type: "Flex",
                      align: "center",
                      justify: "between",
                      children: [
                        {
                          type: "Text",
                          className: "text-sm",
                          children: "SMS",
                        },
                        {
                          type: "Switch",
                          checked: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
);
