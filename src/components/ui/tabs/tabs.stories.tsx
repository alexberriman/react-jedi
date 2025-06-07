import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 * Built using Radix UI primitives for full accessibility and keyboard navigation.
 */
const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tabs organize content into multiple sections and allow users to navigate between them.",
      },
    },
  },
  tags: ["autodocs", "test"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = enhanceStoryForDualMode<typeof Tabs>({
  args: {
    defaultValue: "tab-1",
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab-1">Account</TabsTrigger>
        <TabsTrigger value="tab-2">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Account</h4>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you&apos;re done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Password</h4>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test tabs structure
    const tablist = canvas.getByRole("tablist");
    expect(tablist).toBeInTheDocument();

    // Test tab triggers
    const accountTab = canvas.getByRole("tab", { name: "Account" });
    const passwordTab = canvas.getByRole("tab", { name: "Password" });
    expect(accountTab).toBeInTheDocument();
    expect(passwordTab).toBeInTheDocument();

    // Test initial state (Account tab should be selected)
    expect(accountTab).toHaveAttribute("aria-selected", "true");
    expect(passwordTab).toHaveAttribute("aria-selected", "false");

    // Test initial content
    expect(
      canvas.getByText("Make changes to your account here. Click save when you're done.")
    ).toBeInTheDocument();

    // Test clicking Password tab
    await user.click(passwordTab);
    expect(passwordTab).toHaveAttribute("aria-selected", "true");
    expect(accountTab).toHaveAttribute("aria-selected", "false");
    expect(
      canvas.getByText("Change your password here. After saving, you'll be logged out.")
    ).toBeInTheDocument();

    // Test clicking back to Account tab
    await user.click(accountTab);
    expect(accountTab).toHaveAttribute("aria-selected", "true");
    expect(passwordTab).toHaveAttribute("aria-selected", "false");
    expect(
      canvas.getByText("Make changes to your account here. Click save when you're done.")
    ).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Tabs",
    defaultValue: "tab-1",
    className: "w-[400px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-2",
        children: [
          { type: "TabsTrigger", value: "tab-1", children: "Account" },
          { type: "TabsTrigger", value: "tab-2", children: "Password" }
        ]
      },
      {
        type: "TabsContent",
        value: "tab-1",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Account" },
            { type: "Text", size: "sm", variant: "muted", children: "Make changes to your account here. Click save when you're done." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "tab-2",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Password" },
            { type: "Text", size: "sm", variant: "muted", children: "Change your password here. After saving, you'll be logged out." }
          ]
        }
      }
    ]
  }
}) as Story;

function ControlledTabsComponent() {
  const [value, setValue] = React.useState("overview");

  return (
    <Tabs value={value} onValueChange={setValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Overview</h4>
          <p className="text-sm text-muted-foreground">
            Welcome to the overview tab. Get a bird&apos;s eye view of your data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Analytics</h4>
          <p className="text-sm text-muted-foreground">
            Dive deep into your analytics and understand your metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Reports</h4>
          <p className="text-sm text-muted-foreground">
            Access detailed reports and export them in various formats.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export const Controlled: Story = enhanceStoryForDualMode<typeof Tabs>(
  {
    name: "Controlled Tabs",
    render: () => <ControlledTabsComponent />,
    play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test controlled tabs
    const overviewTab = canvas.getByRole("tab", { name: "Overview" });
    const analyticsTab = canvas.getByRole("tab", { name: "Analytics" });
    const reportsTab = canvas.getByRole("tab", { name: "Reports" });

    expect(overviewTab).toBeInTheDocument();
    expect(analyticsTab).toBeInTheDocument();
    expect(reportsTab).toBeInTheDocument();

    // Test initial state (Overview should be active)
    expect(overviewTab).toHaveAttribute("aria-selected", "true");
    expect(
      canvas.getByText("Welcome to the overview tab. Get a bird's eye view of your data.")
    ).toBeInTheDocument();

    // Test switching to Analytics
    await user.click(analyticsTab);
    expect(analyticsTab).toHaveAttribute("aria-selected", "true");
    expect(overviewTab).toHaveAttribute("aria-selected", "false");
    expect(
      canvas.getByText("Dive deep into your analytics and understand your metrics.")
    ).toBeInTheDocument();

    // Test switching to Reports
    await user.click(reportsTab);
    expect(reportsTab).toHaveAttribute("aria-selected", "true");
    expect(analyticsTab).toHaveAttribute("aria-selected", "false");
    expect(
      canvas.getByText("Access detailed reports and export them in various formats.")
    ).toBeInTheDocument();
  },
},
{
  renderSpec: {
    type: "Tabs",
    defaultValue: "overview",
    className: "w-[400px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { type: "TabsTrigger", value: "overview", children: "Overview" },
          { type: "TabsTrigger", value: "analytics", children: "Analytics" },
          { type: "TabsTrigger", value: "reports", children: "Reports" }
        ]
      },
      {
        type: "TabsContent",
        value: "overview",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Overview" },
            { type: "Text", size: "sm", variant: "muted", children: "Welcome to the overview tab. Get a bird's eye view of your data." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "analytics",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Analytics" },
            { type: "Text", size: "sm", variant: "muted", children: "Dive deep into your analytics and understand your metrics." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "reports",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Reports" },
            { type: "Text", size: "sm", variant: "muted", children: "Access detailed reports and export them in various formats." }
          ]
        }
      }
    ]
  }
}
) as Story;

export const VerticalOrientation: Story = enhanceStoryForDualMode<typeof Tabs>({
  name: "Vertical Tabs",
  args: {
    defaultValue: "general",
    orientation: "vertical",
  },
  render: (args) => (
    <Tabs {...args} className="flex w-[600px]">
      <TabsList className="flex-col h-auto">
        <TabsTrigger value="general" className="w-full justify-start">
          General
        </TabsTrigger>
        <TabsTrigger value="profile" className="w-full justify-start">
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications" className="w-full justify-start">
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full justify-start">
          Security
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 pl-6">
        <TabsContent value="general">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">General Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your general application preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Profile Settings</h4>
            <p className="text-sm text-muted-foreground">
              Update your profile information and avatar.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Notification Preferences</h4>
            <p className="text-sm text-muted-foreground">
              Configure how and when you receive notifications.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="security">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Security Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your security settings and two-factor authentication.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that vertical tabs render correctly
    const tablist = canvas.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    
    // Test all tabs are present
    expect(canvas.getByRole("tab", { name: "General" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Profile" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Notifications" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Security" })).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Tabs",
    defaultValue: "general",
    orientation: "vertical",
    className: "flex w-[600px]",
    children: [
      {
        type: "TabsList",
        className: "flex-col h-auto",
        children: [
          { type: "TabsTrigger", value: "general", className: "w-full justify-start", children: "General" },
          { type: "TabsTrigger", value: "profile", className: "w-full justify-start", children: "Profile" },
          { type: "TabsTrigger", value: "notifications", className: "w-full justify-start", children: "Notifications" },
          { type: "TabsTrigger", value: "security", className: "w-full justify-start", children: "Security" }
        ]
      },
      {
        type: "Flex",
        className: "flex-1 pl-6",
        direction: "column",
        children: [
          {
            type: "TabsContent",
            value: "general",
            children: {
              type: "Flex",
              direction: "column",
              gap: "sm",
              children: [
                { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "General Settings" },
                { type: "Text", size: "sm", variant: "muted", children: "Manage your general application preferences." }
              ]
            }
          },
          {
            type: "TabsContent",
            value: "profile",
            children: {
              type: "Flex",
              direction: "column",
              gap: "sm",
              children: [
                { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Profile Settings" },
                { type: "Text", size: "sm", variant: "muted", children: "Update your profile information and avatar." }
              ]
            }
          },
          {
            type: "TabsContent",
            value: "notifications",
            children: {
              type: "Flex",
              direction: "column",
              gap: "sm",
              children: [
                { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Notification Preferences" },
                { type: "Text", size: "sm", variant: "muted", children: "Configure how and when you receive notifications." }
              ]
            }
          },
          {
            type: "TabsContent",
            value: "security",
            children: {
              type: "Flex",
              direction: "column",
              gap: "sm",
              children: [
                { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Security Settings" },
                { type: "Text", size: "sm", variant: "muted", children: "Manage your security settings and two-factor authentication." }
              ]
            }
          }
        ]
      }
    ]
  }
}) as Story;

export const WithDisabledTab: Story = enhanceStoryForDualMode<typeof Tabs>({
  args: {
    defaultValue: "active",
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Active Tab</h4>
          <p className="text-sm text-muted-foreground">This tab is active and accessible.</p>
        </div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Pending Tab</h4>
          <p className="text-sm text-muted-foreground">This tab is pending approval.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test tab structure with disabled tab
    const activeTab = canvas.getByRole("tab", { name: "Active" });
    const disabledTab = canvas.getByRole("tab", { name: "Disabled" });
    const pendingTab = canvas.getByRole("tab", { name: "Pending" });

    expect(activeTab).toBeInTheDocument();
    expect(disabledTab).toBeInTheDocument();
    expect(pendingTab).toBeInTheDocument();

    // Test initial state
    expect(activeTab).toHaveAttribute("aria-selected", "true");
    expect(canvas.getByText("This tab is active and accessible.")).toBeInTheDocument();

    // Test disabled tab
    expect(disabledTab).toHaveAttribute("disabled");
    expect(disabledTab).toHaveAttribute("data-disabled");

    // Test switching to pending tab
    await user.click(pendingTab);
    expect(pendingTab).toHaveAttribute("aria-selected", "true");
    expect(activeTab).toHaveAttribute("aria-selected", "false");
    expect(canvas.getByText("This tab is pending approval.")).toBeInTheDocument();

    // Test that disabled tab cannot be activated (has pointer-events: none)
    // We verify the disabled state rather than trying to click it since it has pointer-events: none
    expect(disabledTab).toHaveAttribute("aria-selected", "false");
    expect(pendingTab).toHaveAttribute("aria-selected", "true");

    // Verify the disabled tab has the correct styling
    const disabledTabElement = disabledTab as HTMLElement;
    const styles = globalThis.getComputedStyle(disabledTabElement);
    expect(styles.pointerEvents).toBe("none");
  },
}, {
  renderSpec: {
    type: "Tabs",
    defaultValue: "active",
    className: "w-[400px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { type: "TabsTrigger", value: "active", children: "Active" },
          { type: "TabsTrigger", value: "disabled", disabled: true, children: "Disabled" },
          { type: "TabsTrigger", value: "pending", children: "Pending" }
        ]
      },
      {
        type: "TabsContent",
        value: "active",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Active Tab" },
            { type: "Text", size: "sm", variant: "muted", children: "This tab is active and accessible." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "pending",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Pending Tab" },
            { type: "Text", size: "sm", variant: "muted", children: "This tab is pending approval." }
          ]
        }
      }
    ]
  }
}) as Story;

export const WithIcons: Story = enhanceStoryForDualMode<typeof Tabs>({
  args: {
    defaultValue: "files",
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="files" className="gap-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7071 4C12.8946 4.18753 13 4.44772 13 4.70711V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Files
        </TabsTrigger>
        <TabsTrigger value="settings" className="gap-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 5.31397C5.44724 5.03894 6.05412 4.86034 6.69903 4.8156C7.34394 4.77086 7.99722 4.86269 8.59987 5.08223C9.20252 5.30177 9.73105 5.64169 10.1319 6.07186C10.5327 6.50203 10.7922 7.00699 10.8914 7.53463C10.9906 8.06227 10.9276 8.59129 10.708 9.0704C10.4884 9.54951 10.1187 9.96024 9.6353 10.2516C9.15194 10.5429 8.5726 10.7014 7.9768 10.7065C7.38099 10.7116 6.7873 10.5631 6.25988 10.2754C5.73247 9.98768 5.28866 9.56939 4.97457 9.06202C4.66048 8.55466 4.48695 7.97529 4.46934 7.37869C4.45173 6.78209 4.59079 6.18913 4.87311 5.66247C5.15542 5.13581 5.56973 4.69462 6.07282 4.38259C6.57592 4.07055 7.14884 3.89838 7.73558 3.88239C8.32231 3.8664 8.9026 4.00706 9.42056 4.29089C9.93852 4.57472 10.3756 4.99263 10.688 5.50318C11.0004 6.01373 11.177 6.59903 11.2003 7.20252C11.2236 7.80601 11.0931 8.40541 10.8219 8.93883C10.5507 9.47226 10.1488 9.9208 9.65824 10.2422C9.16779 10.5636 8.60828 10.7471 8.02605 10.7762C7.44381 10.8053 6.86108 10.679 6.3366 10.4099C5.81213 10.1407 5.36425 9.73708 5.04002 9.23774C4.71579 8.73839 4.52636 8.15995 4.49049 7.55913C4.45463 6.95831 4.57305 6.355 4.83478 5.80838C5.09651 5.26176 5.49324 4.78991 5.98477 4.43641C6.4763 4.0829 7.04601 3.85925 7.6405 3.78485C8.23499 3.71045 8.83476 3.78684 9.38975 4.00678C9.94474 4.22673 10.4364 4.58318 10.8179 5.04243C11.1993 5.50169 11.4589 6.04856 11.5739 6.63365C11.689 7.21874 11.6559 7.82339 11.478 8.3918C11.3001 8.96022 10.9839 9.47421 10.5607 9.88764C10.1375 10.3011 9.62063 10.6012 9.05668 10.7624C8.49273 10.9236 7.90021 10.9412 7.32836 10.8137C6.75652 10.6862 6.22439 10.417 5.78212 10.0318C5.33985 9.64652 5.00212 9.15673 4.8014 8.60623C4.60068 8.05574 4.54348 7.46168 4.63529 6.88126C4.72711 6.30085 4.96517 5.75242 5.32653 5.28646C5.68789 4.8205 6.16058 4.45172 6.69951 4.21368C7.23844 3.97564 7.8256 3.8754 8.40739 3.92073C8.98918 3.96605 9.54698 4.15571 10.0329 4.4725C10.5189 4.78929 10.9171 5.22302 11.1916 5.73414C11.4661 6.24527 11.6085 6.81755 11.606 7.3977C11.6036 7.97785 11.4563 8.54695 11.1774 9.05344C10.8985 9.55993 10.4965 9.98787 10.006 10.2998C9.51557 10.6117 8.95282 10.7985 8.37065 10.8438C7.78847 10.8891 7.20442 10.792 6.66942 10.5604C6.13442 10.3287 5.66434 9.96952 5.30378 9.5151C4.94322 9.06069 4.70276 8.52445 4.60369 7.95423C4.50463 7.38401 4.54978 6.79709 4.73493 6.24952C4.92008 5.70194 5.23881 5.21059 5.66034 4.81736C6.08187 4.42413 6.59282 4.14109 7.14699 3.99261C7.70115 3.84414 8.28083 3.83445 8.83913 3.96449C9.39743 4.09453 9.9171 4.36042 10.3532 4.73942C10.7893 5.11842 11.1288 5.59943 11.343 6.14206C11.5571 6.68469 11.6393 7.27313 11.5827 7.85548C11.5261 8.43783 11.3324 8.99763 11.0176 9.48852C10.7028 9.9794 10.2759 10.3877 9.77184 10.679C9.26777 10.9704 8.70027 11.137 8.11412 11.1648C7.52797 11.1926 6.93942 11.0811 6.39566 10.8385C5.8519 10.596 5.36824 10.2289 4.98458 9.7656C4.60091 9.30228 4.32806 8.75475 4.18803 8.16508C4.048 7.57541 4.0446 6.95954 4.17798 6.36881C4.31137 5.77807 4.57763 5.22844 4.95447 4.75954C5.33132 4.29064 5.80826 3.91481 6.3465 3.66025C6.88475 3.40569 7.46938 3.279 8.05795 3.28848C8.64651 3.29797 9.22311 3.44351 9.74427 3.71389C10.2654 3.98428 10.7168 4.3721 11.0621 4.84586C11.4073 5.31961 11.6372 5.86613 11.734 6.44223C11.8307 7.01833 11.7919 7.60877 11.6202 8.16658C11.4486 8.72439 11.1489 9.23429 10.7431 9.65666C10.3373 10.079 9.83663 10.4023 9.27767 10.6005C8.71872 10.7987 8.11693 10.8659 7.52583 10.7967C6.93474 10.7276 6.37029 10.524 5.87571 10.2023C5.38113 9.88058 4.97044 9.44952 4.67842 8.94576C4.3864 8.44201 4.22096 7.8797 4.1944 7.29825C4.16785 6.7168 4.28091 6.13228 4.52487 5.59669C4.76883 5.06109 5.13656 4.58881 5.59915 4.21876C6.06174 3.84871 6.60611 3.59104 7.18827 3.46627C7.77044 3.34151 8.37441 3.353 8.9506 3.50009Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Settings
        </TabsTrigger>
        <TabsTrigger value="access" className="gap-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M2.5 8C2.22386 8 2 8.22386 2 8.5V12.5C2 12.7761 2.22386 13 2.5 13H6.5C6.77614 13 7 12.7761 7 12.5V12H8V12.5C8 12.7761 8.22386 13 8.5 13H12.5C12.7761 13 13 12.7761 13 12.5V8.5C13 8.22386 12.7761 8 12.5 8H12V7H12.5C12.7761 7 13 6.77614 13 6.5V2.5C13 2.22386 12.7761 2 12.5 2H8.5C8.22386 2 8 2.22386 8 2.5V3H7V2.5C7 2.22386 6.77614 2 6.5 2H2.5C2.22386 2 2 2.22386 2 2.5V6.5C2 6.77614 2.22386 7 2.5 7H3V8H2.5ZM3 4H3.5C3.77614 4 4 3.77614 4 3.5V3H5V3.5C5 3.77614 5.22386 4 5.5 4H6V5H5.5C5.22386 5 5 5.22386 5 5.5V6H4V5.5C4 5.22386 3.77614 5 3.5 5H3V4ZM11 11H11.5C11.7761 11 12 10.7761 12 10.5V10H11V10.5C11 10.7761 10.7761 11 10.5 11H10V10H10.5C10.7761 10 11 9.77614 11 9.5V9H10V9.5C10 9.77614 9.77614 10 9.5 10H9V11H9.5C9.77614 11 10 11.2239 10 11.5V12H11V11.5C11 11.2239 11.2239 11 11.5 11ZM4 8V8.5C4 8.77614 4.22386 9 4.5 9H5V10H4.5C4.22386 10 4 10.2239 4 10.5V11H5V10.5C5 10.2239 5.22386 10 5.5 10H6V9H5.5C5.22386 9 5 8.77614 5 8.5V8H4ZM6 7V7.5C6 7.77614 6.22386 8 6.5 8H7V9H6.5C6.22386 9 6 9.22386 6 9.5V10H7V9.5C7 9.22386 7.22386 9 7.5 9H8V8H7.5C7.22386 8 7 7.77614 7 7.5V7H6ZM9 4V4.5C9 4.77614 9.22386 5 9.5 5H10V6H9.5C9.22386 6 9 6.22386 9 6.5V7H10V6.5C10 6.22386 10.2239 6 10.5 6H11V5H10.5C10.2239 5 10 4.77614 10 4.5V4H9Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Access
        </TabsTrigger>
      </TabsList>
      <TabsContent value="files">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Files</h4>
          <p className="text-sm text-muted-foreground">
            Browse and manage your files in the cloud.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Settings</h4>
          <p className="text-sm text-muted-foreground">Configure your application settings.</p>
        </div>
      </TabsContent>
      <TabsContent value="access">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Access Control</h4>
          <p className="text-sm text-muted-foreground">
            Manage user permissions and access levels.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test tabs with icons render
    const tablist = canvas.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    
    // Test tabs are present
    expect(canvas.getByRole("tab", { name: "Files" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Settings" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Access" })).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Tabs",
    defaultValue: "files",
    className: "w-[400px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { 
            type: "TabsTrigger", 
            value: "files", 
            className: "gap-2", 
            children: [
              { type: "Icon", name: "file", size: 16 },
              "Files"
            ] 
          },
          { 
            type: "TabsTrigger", 
            value: "settings", 
            className: "gap-2", 
            children: [
              { type: "Icon", name: "settings", size: 16 },
              "Settings"
            ] 
          },
          { 
            type: "TabsTrigger", 
            value: "access", 
            className: "gap-2", 
            children: [
              { type: "Icon", name: "shield", size: 16 },
              "Access"
            ] 
          }
        ]
      },
      {
        type: "TabsContent",
        value: "files",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Files" },
            { type: "Text", size: "sm", variant: "muted", children: "Browse and manage your files in the cloud." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "settings",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Settings" },
            { type: "Text", size: "sm", variant: "muted", children: "Configure your application settings." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "access",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Access Control" },
            { type: "Text", size: "sm", variant: "muted", children: "Manage user permissions and access levels." }
          ]
        }
      }
    ]
  }
}) as Story;

export const ManualActivation: Story = enhanceStoryForDualMode<typeof Tabs>({
  args: {
    defaultValue: "tab-1",
    activationMode: "manual",
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Manual Activation Mode</h4>
          <p className="text-sm text-muted-foreground">
            In manual mode, tabs are focused on arrow key press but not activated. Press Enter or
            Space to activate a focused tab.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tab 2 Content</h4>
          <p className="text-sm text-muted-foreground">Content for the second tab panel.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab-3">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tab 3 Content</h4>
          <p className="text-sm text-muted-foreground">Content for the third tab panel.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test manual activation mode tabs render
    const tablist = canvas.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    
    // Test tabs are present
    expect(canvas.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Tabs",
    defaultValue: "tab-1",
    activationMode: "manual",
    className: "w-[400px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { type: "TabsTrigger", value: "tab-1", children: "Tab 1" },
          { type: "TabsTrigger", value: "tab-2", children: "Tab 2" },
          { type: "TabsTrigger", value: "tab-3", children: "Tab 3" }
        ]
      },
      {
        type: "TabsContent",
        value: "tab-1",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Manual Activation Mode" },
            { type: "Text", size: "sm", variant: "muted", children: "In manual mode, tabs are focused on arrow key press but not activated. Press Enter or Space to activate a focused tab." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "tab-2",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Tab 2 Content" },
            { type: "Text", size: "sm", variant: "muted", children: "Content for the second tab panel." }
          ]
        }
      },
      {
        type: "TabsContent",
        value: "tab-3",
        children: {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Tab 3 Content" },
            { type: "Text", size: "sm", variant: "muted", children: "Content for the third tab panel." }
          ]
        }
      }
    ]
  }
}) as Story;

export const WithFormContent: Story = enhanceStoryForDualMode<typeof Tabs>({
  args: {
    defaultValue: "personal",
  },
  render: (args) => (
    <Tabs {...args} className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Personal Information</h4>
          <p className="text-sm text-muted-foreground">Update your personal details.</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              placeholder="John Doe"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              placeholder="@johndoe"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="contact" className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Contact Information</h4>
          <p className="text-sm text-muted-foreground">How can we reach you?</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              placeholder="john@example.com"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="preferences" className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Preferences</h4>
          <p className="text-sm text-muted-foreground">Customize your experience.</p>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <label htmlFor="notifications" className="text-sm font-medium">
              Email notifications
            </label>
            <input id="notifications" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="marketing" className="text-sm font-medium">
              Marketing emails
            </label>
            <input id="marketing" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test form content tabs render
    const tablist = canvas.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    
    // Test tabs are present
    expect(canvas.getByRole("tab", { name: "Personal Info" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Contact" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Preferences" })).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Tabs",
    defaultValue: "personal",
    className: "w-[500px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { type: "TabsTrigger", value: "personal", children: "Personal Info" },
          { type: "TabsTrigger", value: "contact", children: "Contact" },
          { type: "TabsTrigger", value: "preferences", children: "Preferences" }
        ]
      },
      {
        type: "TabsContent",
        value: "personal",
        className: "space-y-4",
        children: [
          {
            type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Personal Information" },
              { type: "Text", size: "sm", variant: "muted", children: "Update your personal details." }
            ]
          },
          {
            type: "Flex",
            direction: "column",
            gap: "md",
            children: [
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  { type: "Label", htmlFor: "name", children: "Name" },
                  { type: "Input", id: "name", placeholder: "John Doe" }
                ]
              },
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  { type: "Label", htmlFor: "username", children: "Username" },
                  { type: "Input", id: "username", placeholder: "@johndoe" }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "TabsContent",
        value: "contact",
        className: "space-y-4",
        children: [
          {
            type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Contact Information" },
              { type: "Text", size: "sm", variant: "muted", children: "How can we reach you?" }
            ]
          },
          {
            type: "Flex",
            direction: "column",
            gap: "md",
            children: [
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  { type: "Label", htmlFor: "email", children: "Email" },
                  { type: "Input", id: "email", inputType: "email", placeholder: "john@example.com" }
                ]
              },
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  { type: "Label", htmlFor: "phone", children: "Phone" },
                  { type: "Input", id: "phone", inputType: "tel", placeholder: "+1 (555) 000-0000" }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "TabsContent",
        value: "preferences",
        className: "space-y-4",
        children: [
          {
            type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Preferences" },
              { type: "Text", size: "sm", variant: "muted", children: "Customize your experience." }
            ]
          },
          {
            type: "Flex",
            direction: "column",
            gap: "md",
            children: [
              {
                type: "Flex",
                direction: "row",
                align: "center",
                justify: "between",
                children: [
                  { type: "Label", htmlFor: "notifications", children: "Email notifications" },
                  { type: "Checkbox", id: "notifications" }
                ]
              },
              {
                type: "Flex",
                direction: "row",
                align: "center",
                justify: "between",
                children: [
                  { type: "Label", htmlFor: "marketing", children: "Marketing emails" },
                  { type: "Checkbox", id: "marketing" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}) as Story;

export const WithAnimation: Story = enhanceStoryForDualMode<typeof Tabs>({
  name: "With Animation (Default)",
  args: {
    defaultValue: "tab-1",
    animate: true,
  },
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Tabs with smooth animations between transitions. The indicator slides between tabs and
        content fades in.
      </p>
      <Tabs {...args} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab-1">Profile</TabsTrigger>
          <TabsTrigger value="tab-2">Settings</TabsTrigger>
          <TabsTrigger value="tab-3">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium">Profile Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your public profile information and display preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab-2">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium">General Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure your account settings and application preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab-3">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium">Notification Preferences</h4>
            <p className="text-sm text-muted-foreground">
              Choose how and when you want to receive notifications.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  // Removed play function as it's testing animation timing which is implementation-specific
}) as Story;

export const WithoutAnimation: Story = enhanceStoryForDualMode<typeof Tabs>({
  args: {
    defaultValue: "tab-1",
    animate: false,
  },
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Tabs without animations for instant transitions. Set <code>animate=false</code> to disable.
      </p>
      <Tabs {...args} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab-1">Profile</TabsTrigger>
          <TabsTrigger value="tab-2">Settings</TabsTrigger>
          <TabsTrigger value="tab-3">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium">Profile Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your public profile information and display preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab-2">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium">General Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure your account settings and application preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab-3">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium">Notification Preferences</h4>
            <p className="text-sm text-muted-foreground">
              Choose how and when you want to receive notifications.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test tabs without animation render
    const tablist = canvas.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    
    // Test tabs are present
    expect(canvas.getByRole("tab", { name: "Profile" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Settings" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Notifications" })).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Flex",
    direction: "column",
    gap: "md",
    children: [
      {
        type: "Text",
        size: "sm",
        variant: "muted",
        className: "mb-4",
        children: [
          "Tabs without animations for instant transitions. Set ",
          { type: "Text", as: "code", children: "animate=false" },
          " to disable."
        ]
      },
      {
        type: "Tabs",
        defaultValue: "tab-1",
        animate: false,
        className: "w-[400px]",
        children: [
          {
            type: "TabsList",
            className: "grid w-full grid-cols-3",
            children: [
              { type: "TabsTrigger", value: "tab-1", children: "Profile" },
              { type: "TabsTrigger", value: "tab-2", children: "Settings" },
              { type: "TabsTrigger", value: "tab-3", children: "Notifications" }
            ]
          },
          {
            type: "TabsContent",
            value: "tab-1",
            children: {
              type: "Box",
              className: "space-y-2 p-4 bg-muted/30 rounded-lg",
              children: [
                { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Profile Settings" },
                { type: "Text", size: "sm", variant: "muted", children: "Manage your public profile information and display preferences." }
              ]
            }
          },
          {
            type: "TabsContent",
            value: "tab-2",
            children: {
              type: "Box",
              className: "space-y-2 p-4 bg-muted/30 rounded-lg",
              children: [
                { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "General Settings" },
                { type: "Text", size: "sm", variant: "muted", children: "Configure your account settings and application preferences." }
              ]
            }
          },
          {
            type: "TabsContent",
            value: "tab-3",
            children: {
              type: "Box",
              className: "space-y-2 p-4 bg-muted/30 rounded-lg",
              children: [
                { type: "Heading", element: "h4", size: "sm", weight: "medium", children: "Notification Preferences" },
                { type: "Text", size: "sm", variant: "muted", children: "Choose how and when you want to receive notifications." }
              ]
            }
          }
        ]
      }
    ]
  }
}) as Story;

export const ModernStyling: Story = enhanceStoryForDualMode<typeof Tabs>({
  name: "Modern Styling Showcase",
  args: {
    defaultValue: "overview",
    animate: true,
  },
  render: (args) => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Enhanced Visual Design</h3>
        <p className="text-sm text-muted-foreground mb-6">
          The updated tabs feature a modern glassmorphic design with subtle borders, smooth
          animations, and improved contrast.
        </p>
      </div>

      <Tabs {...args} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
            >
              <path
                d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
            >
              <path
                d="M11.5 1C11.7761 1 12 1.22386 12 1.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V1.5C11 1.22386 11.2239 1 11.5 1ZM9.5 3C9.77614 3 10 3.22386 10 3.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5V3.5C9 3.22386 9.22386 3 9.5 3ZM13.5 3C13.7761 3 14 3.22386 14 3.5V13.5C14 13.7761 13.7761 14 13.5 14C13.2239 14 13 13.7761 13 13.5V3.5C13 3.22386 13.2239 3 13.5 3ZM5.5 4C5.77614 4 6 4.22386 6 4.5V13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5V4.5C5 4.22386 5.22386 4 5.5 4ZM1.5 5C1.77614 5 2 5.22386 2 5.5V13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V5.5C1 5.22386 1.22386 5 1.5 5ZM7.5 5C7.77614 5 8 5.22386 8 5.5V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.5C7 5.22386 7.22386 5 7.5 5ZM3.5 7C3.77614 7 4 7.22386 4 7.5V13.5C4 13.7761 3.77614 14 3.5 14C3.22386 14 3 13.7761 3 13.5V7.5C3 7.22386 3.22386 7 3.5 7Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
            >
              <path
                d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            Reports
          </TabsTrigger>
          <TabsTrigger value="settings">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
            >
              <path
                d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 5.31397C5.44724 5.03894 6.05412 4.86034 6.69903 4.8156C7.34394 4.77086 7.99722 4.86269 8.59987 5.08223C9.20252 5.30177 9.73105 5.64169 10.1319 6.07186C10.5327 6.50203 10.7922 7.00699 10.8914 7.53463C10.9906 8.06227 10.9276 8.59129 10.708 9.0704C10.4884 9.54951 10.1187 9.96024 9.6353 10.2516C9.15194 10.5429 8.5726 10.7014 7.9768 10.7065C7.38099 10.7116 6.7873 10.5631 6.25988 10.2754C5.73247 9.98768 5.28866 9.56939 4.97457 9.06202C4.66048 8.55466 4.48695 7.97529 4.46934 7.37869C4.45173 6.78209 4.59079 6.18913 4.87311 5.66247C5.15542 5.13581 5.56973 4.69462 6.07282 4.38259C6.57592 4.07055 7.14884 3.89838 7.73558 3.88239C8.32231 3.8664 8.9026 4.00706 9.42056 4.29089C9.93852 4.57472 10.3756 4.99263 10.688 5.50318C11.0004 6.01373 11.177 6.59903 11.2003 7.20252C11.2236 7.80601 11.0931 8.40541 10.8219 8.93883C10.5507 9.47226 10.1488 9.9208 9.65824 10.2422C9.16779 10.5636 8.60828 10.7471 8.02605 10.7762C7.44381 10.8053 6.86108 10.679 6.3366 10.4099C5.81213 10.1407 5.36425 9.73708 5.04002 9.23774C4.71579 8.73839 4.52636 8.15995 4.49049 7.55913C4.45463 6.95831 4.57305 6.355 4.83478 5.80838C5.09651 5.26176 5.49324 4.78991 5.98477 4.43641C6.4763 4.0829 7.04601 3.85925 7.6405 3.78485C8.23499 3.71045 8.83476 3.78684 9.38975 4.00678C9.94474 4.22673 10.4364 4.58318 10.8179 5.04243C11.1993 5.50169 11.4589 6.04856 11.5739 6.63365C11.689 7.21874 11.6559 7.82339 11.478 8.3918C11.3001 8.96022 10.9839 9.47421 10.5607 9.88764C10.1375 10.3011 9.62063 10.6012 9.05668 10.7624C8.49273 10.9236 7.90021 10.9412 7.32836 10.8137C6.75652 10.6862 6.22439 10.417 5.78212 10.0318C5.33985 9.64652 5.00212 9.15673 4.8014 8.60623C4.60068 8.05574 4.54348 7.46168 4.63529 6.88126C4.72711 6.30085 4.96517 5.75242 5.32653 5.28646C5.68789 4.8205 6.16058 4.45172 6.69951 4.21368C7.23844 3.97564 7.8256 3.8754 8.40739 3.92073C8.98918 3.96605 9.54698 4.15571 10.0329 4.4725C10.5189 4.78929 10.9171 5.22302 11.1916 5.73414C11.4661 6.24527 11.6085 6.81755 11.606 7.3977C11.6036 7.97785 11.4563 8.54695 11.1774 9.05344C10.8985 9.55993 10.4965 9.98787 10.006 10.2998C9.51557 10.6117 8.95282 10.7985 8.37065 10.8438C7.78847 10.8891 7.20442 10.792 6.66942 10.5604C6.13442 10.3287 5.66434 9.96952 5.30378 9.5151C4.94322 9.06069 4.70276 8.52445 4.60369 7.95423C4.50463 7.38401 4.54978 6.79709 4.73493 6.24952C4.92008 5.70194 5.23881 5.21059 5.66034 4.81736C6.08187 4.42413 6.59282 4.14109 7.14699 3.99261C7.70115 3.84414 8.28083 3.83445 8.83913 3.96449C9.39743 4.09453 9.9171 4.36042 10.3532 4.73942C10.7893 5.11842 11.1288 5.59943 11.343 6.14206C11.5571 6.68469 11.6393 7.27313 11.5827 7.85548C11.5261 8.43783 11.3324 8.99763 11.0176 9.48852C10.7028 9.9794 10.2759 10.3877 9.77184 10.679C9.26777 10.9704 8.70027 11.137 8.11412 11.1648C7.52797 11.1926 6.93942 11.0811 6.39566 10.8385C5.8519 10.596 5.36824 10.2289 4.98458 9.7656C4.60091 9.30228 4.32806 8.75475 4.18803 8.16508C4.048 7.57541 4.0446 6.95954 4.17798 6.36881C4.31137 5.77807 4.57763 5.22844 4.95447 4.75954C5.33132 4.29064 5.80826 3.91481 6.3465 3.66025C6.88475 3.40569 7.46938 3.279 8.05795 3.28848C8.64651 3.29797 9.22311 3.44351 9.74427 3.71389C10.2654 3.98428 10.7168 4.3721 11.0621 4.84586C11.4073 5.31961 11.6372 5.86613 11.734 6.44223C11.8307 7.01833 11.7919 7.60877 11.6202 8.16658C11.4486 8.72439 11.1489 9.23429 10.7431 9.65666C10.3373 10.079 9.83663 10.4023 9.27767 10.6005C8.71872 10.7987 8.11693 10.8659 7.52583 10.7967C6.93474 10.7276 6.37029 10.524 5.87571 10.2023C5.38113 9.88058 4.97044 9.44952 4.67842 8.94576C4.3864 8.44201 4.22096 7.8797 4.1944 7.29825C4.16785 6.7168 4.28091 6.13228 4.52487 5.59669C4.76883 5.06109 5.13656 4.58881 5.59915 4.21876C6.06174 3.84871 6.60611 3.59104 7.18827 3.46627C7.77044 3.34151 8.37441 3.353 8.9506 3.50009Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between space-x-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path
                    d="M5.5 3C5.22386 3 5 3.22386 5 3.5C5 3.77614 5.22386 4 5.5 4H9.5C9.77614 4 10 3.77614 10 3.5C10 3.22386 9.77614 3 9.5 3H5.5ZM3 5.5C3 5.22386 3.22386 5 3.5 5H11.5C11.7761 5 12 5.22386 12 5.5C12 5.77614 11.7761 6 11.5 6H3.5C3.22386 6 3 5.77614 3 5.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10H11.5C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9H3.5ZM5 11.5C5 11.2239 5.22386 11 5.5 11H9.5C9.77614 11 10 11.2239 10 11.5C10 11.7761 9.77614 12 9.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">$45,231.89</p>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between space-x-2">
                <h3 className="text-sm font-medium text-muted-foreground">Subscriptions</h3>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path
                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.0749 12.975 13.8623 12.975 13.5999C12.975 11.72 12.4778 10.2794 11.4959 9.31167C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.54739 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">+2350</p>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between space-x-2">
                <h3 className="text-sm font-medium text-muted-foreground">Sales</h3>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path
                    d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">+12,234</p>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between space-x-2">
                <h3 className="text-sm font-medium text-muted-foreground">Active Now</h3>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path
                    d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 10.6329 4.36683 13.1727 7.49985 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49985 1.82704ZM8.24792 5.49999L8.24792 7.91345L9.90502 9.57055C10.0993 9.76484 10.0993 10.0805 9.90502 10.2748C9.71073 10.469 9.39514 10.469 9.20085 10.2748L7.49999 8.57396L5.79914 10.2748C5.60485 10.469 5.28926 10.469 5.09497 10.2748C4.90068 10.0805 4.90068 9.76484 5.09497 9.57055L6.75206 7.91345L6.75206 5.49999C6.75206 5.22384 6.97592 4.99999 7.25206 4.99999H7.74792C8.02406 4.99999 8.24792 5.22384 8.24792 5.49999Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">+573</p>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe made a purchase</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm font-medium">+$250.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-sm font-medium">AS</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Alice Smith upgraded plan</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
                <div className="text-sm font-medium">+$99.00</div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              Detailed analytics and insights about your application performance.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Reports</h3>
            <p className="text-muted-foreground">
              Generate and download comprehensive reports for your business metrics.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Application Settings</h3>
            <p className="text-muted-foreground">
              Configure your application preferences and system settings.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test modern styling tabs render
    const tablist = canvas.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    
    // Test tabs are present
    expect(canvas.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Analytics" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Reports" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Settings" })).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Tabs",
    defaultValue: "overview",
    className: "w-full",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-4",
        children: [
          { type: "TabsTrigger", value: "overview", children: "Overview" },
          { type: "TabsTrigger", value: "analytics", children: "Analytics" },
          { type: "TabsTrigger", value: "reports", children: "Reports" },
          { type: "TabsTrigger", value: "settings", children: "Settings" }
        ]
      },
      {
        type: "TabsContent",
        value: "overview",
        children: {
          type: "Text",
          children: "Overview content - Revenue and subscription metrics would go here"
        }
      },
      {
        type: "TabsContent",
        value: "analytics",
        children: {
          type: "Text",
          children: "Analytics content - Charts and graphs would go here"
        }
      },
      {
        type: "TabsContent",
        value: "reports",
        children: {
          type: "Text",
          children: "Reports content - Downloadable reports would go here"
        }
      },
      {
        type: "TabsContent",
        value: "settings",
        children: {
          type: "Text",
          children: "Settings content - Configuration options would go here"
        }
      }
    ]
  }
}) as Story;

export const WithNestedTabs: Story = enhanceStoryForDualMode<typeof Tabs>({
  name: "Nested Tabs",
  args: {
    defaultValue: "account",
  },
  render: (args) => (
    <Tabs {...args} className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Tabs defaultValue="profile" className="mt-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Update your profile information and public display settings.
            </p>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Configure your account settings and preferences.
            </p>
          </TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="security">
        <Tabs defaultValue="password" className="mt-4">
          <TabsList>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="2fa">Two-Factor</TabsTrigger>
          </TabsList>
          <TabsContent value="password" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Change your password and manage authentication methods.
            </p>
          </TabsContent>
          <TabsContent value="2fa" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Enable two-factor authentication for added security.
            </p>
          </TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="billing">
        <Tabs defaultValue="cards" className="mt-4">
          <TabsList>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          <TabsContent value="cards" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Manage your payment methods and billing information.
            </p>
          </TabsContent>
          <TabsContent value="invoices" className="mt-4">
            <p className="text-sm text-muted-foreground">View and download your past invoices.</p>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    
    // Test nested tabs render - expect multiple tablists
    const tablists = canvas.getAllByRole("tablist");
    expect(tablists.length).toBeGreaterThanOrEqual(1);
    
    // Test main tabs are present
    const accountTab = canvas.getByRole("tab", { name: "Account" });
    const securityTab = canvas.getByRole("tab", { name: "Security" });
    const billingTab = canvas.getByRole("tab", { name: "Billing" });
    
    expect(accountTab).toBeInTheDocument();
    expect(securityTab).toBeInTheDocument();
    expect(billingTab).toBeInTheDocument();
    
    // Test initial state - Account tab should be active
    expect(accountTab).toHaveAttribute("aria-selected", "true");
    
    // Test nested tabs in the account section
    expect(canvas.getByRole("tab", { name: "Profile" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Settings" })).toBeInTheDocument();
    
    // Switch to Security tab
    await user.click(securityTab);
    expect(securityTab).toHaveAttribute("aria-selected", "true");
    expect(accountTab).toHaveAttribute("aria-selected", "false");
    
    // Test nested tabs in the security section
    expect(canvas.getByRole("tab", { name: "Password" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Two-Factor" })).toBeInTheDocument();
    
    // Switch to Billing tab
    await user.click(billingTab);
    expect(billingTab).toHaveAttribute("aria-selected", "true");
    expect(securityTab).toHaveAttribute("aria-selected", "false");
    
    // Test nested tabs in the billing section
    expect(canvas.getByRole("tab", { name: "Cards" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Invoices" })).toBeInTheDocument();
  },
}) as Story;
