import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 * Built using Radix UI primitives for full accessibility and keyboard navigation.
 */
const meta: Meta<typeof Tabs> = {
  title: "Components/DataDisplay/Tabs",
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
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
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
    expect(accountTab).toHaveAttribute("data-state", "active");
    expect(passwordTab).toHaveAttribute("data-state", "inactive");

    // Test initial content
    expect(canvas.getByText("Make changes to your account here. Click save when you're done.")).toBeInTheDocument();

    // Test clicking Password tab
    await user.click(passwordTab);
    expect(passwordTab).toHaveAttribute("data-state", "active");
    expect(accountTab).toHaveAttribute("data-state", "inactive");
    expect(canvas.getByText("Change your password here. After saving, you'll be logged out.")).toBeInTheDocument();

    // Test clicking back to Account tab
    await user.click(accountTab);
    expect(accountTab).toHaveAttribute("data-state", "active");
    expect(passwordTab).toHaveAttribute("data-state", "inactive");
    expect(canvas.getByText("Make changes to your account here. Click save when you're done.")).toBeInTheDocument();
  },
};

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

export const Controlled: Story = {
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
    expect(overviewTab).toHaveAttribute("data-state", "active");
    expect(canvas.getByText("Welcome to the overview tab. Get a bird's eye view of your data.")).toBeInTheDocument();

    // Test switching to Analytics
    await user.click(analyticsTab);
    expect(analyticsTab).toHaveAttribute("data-state", "active");
    expect(overviewTab).toHaveAttribute("data-state", "inactive");
    expect(canvas.getByText("Dive deep into your analytics and understand your metrics.")).toBeInTheDocument();

    // Test switching to Reports
    await user.click(reportsTab);
    expect(reportsTab).toHaveAttribute("data-state", "active");
    expect(analyticsTab).toHaveAttribute("data-state", "inactive");
    expect(canvas.getByText("Access detailed reports and export them in various formats.")).toBeInTheDocument();
  },
};

export const VerticalOrientation: Story = {
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
};

export const WithDisabledTab: Story = {
  name: "With Disabled Tab",
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
    expect(activeTab).toHaveAttribute("data-state", "active");
    expect(canvas.getByText("This tab is active and accessible.")).toBeInTheDocument();

    // Test disabled tab
    expect(disabledTab).toHaveAttribute("disabled");
    expect(disabledTab).toHaveAttribute("data-disabled");

    // Test switching to pending tab
    await user.click(pendingTab);
    expect(pendingTab).toHaveAttribute("data-state", "active");
    expect(activeTab).toHaveAttribute("data-state", "inactive");
    expect(canvas.getByText("This tab is pending approval.")).toBeInTheDocument();

    // Test that disabled tab cannot be activated (has pointer-events: none)
    // We verify the disabled state rather than trying to click it since it has pointer-events: none
    expect(disabledTab).toHaveAttribute("data-state", "inactive");
    expect(pendingTab).toHaveAttribute("data-state", "active");
    
    // Verify the disabled tab has the correct styling
    const disabledTabElement = disabledTab as HTMLElement;
    const styles = globalThis.getComputedStyle(disabledTabElement);
    expect(styles.pointerEvents).toBe("none");
  },
};

export const WithIcons: Story = {
  name: "With Icons",
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
};

export const ManualActivation: Story = {
  name: "Manual Activation",
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
};

export const WithFormContent: Story = {
  name: "With Form Content",
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
};

export const WithNestedTabs: Story = {
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
};
