import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { AnnouncementBar } from "./announcement-bar";
import { MdRocketLaunch, MdCelebration, MdWarning } from "react-icons/md";
import { FaBullhorn } from "react-icons/fa";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Blocks/AnnouncementBar",
  component: AnnouncementBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A versatile announcement bar component for displaying important notices, alerts, and time-sensitive information with multiple variants and customization options.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["top-banner", "floating", "slide-in", "countdown", "dismissible"],
    },
    position: {
      control: "select",
      options: ["top", "bottom"],
    },
    colorScheme: {
      control: "select",
      options: ["default", "info", "success", "warning", "error", "custom"],
    },
    animated: {
      control: "boolean",
    },
    dismissible: {
      control: "boolean",
    },
    sticky: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
        <Story />
        <div style={{ padding: "60px 20px" }}>
          <h2 style={{ marginBottom: "20px" }}>Page Content</h2>
          <p style={{ marginBottom: "16px" }}>
            This is example page content to demonstrate how the announcement bar appears above or
            below the main content.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The announcement bar can be positioned at the top or bottom of the viewport and can be
            sticky or scroll with the page.
          </p>
          <p>
            Different variants provide different visual styles and behaviors suitable for various
            use cases.
          </p>
        </div>
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopBanner: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "top-banner",
    message: "🎉 New feature released! Check out our latest updates and improvements.",
    actions: [
      { label: "Learn More", variant: "primary", href: "#" },
      { label: "Dismiss", variant: "link" },
    ],
    colorScheme: "info",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test announcement bar renders with message
    const message = canvas.getByText(/New feature released/);
    expect(message).toBeInTheDocument();
    
    // Test action buttons render
    expect(canvas.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  },
}) as Story;

export const FloatingBar: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "floating",
    message: "Limited time offer: Get 30% off all plans!",
    actions: [{ label: "Get Started", variant: "primary" }],
    icon: <MdCelebration className="h-5 w-5" />,
    colorScheme: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test announcement bar renders with message
    expect(canvas.getByText(/Limited time offer/)).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
  },
}) as Story;

export const SlideInNotification: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "slide-in",
    message: "Your session will expire in 5 minutes. Please save your work.",
    actions: [
      { label: "Continue Working", variant: "primary" },
      { label: "Log Out", variant: "secondary" },
    ],
    colorScheme: "warning",
    icon: <MdWarning className="h-5 w-5" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test notification renders with message
    expect(canvas.getByText(/Your session will expire/)).toBeInTheDocument();
    
    // Test action buttons render
    expect(canvas.getByRole("button", { name: "Continue Working" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Log Out" })).toBeInTheDocument();
  },
}) as Story;

export const CountdownTimer: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "countdown",
    message: "Product launch coming soon!",
    countdownMessage: "🚀 Product launch countdown:",
    countdownTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    actions: [{ label: "Get Notified", variant: "primary" }],
    colorScheme: "default",
    icon: <MdRocketLaunch className="h-6 w-6" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test countdown message renders (only countdownMessage is shown, not message)
    expect(canvas.getByText(/Product launch countdown/)).toBeInTheDocument();
    
    // Test countdown timer is displayed (format: "7d 0h 0m 0s" or similar)
    // Use a more specific regex to avoid backtracking issues
    const countdownTimer = canvas.getByText(/\d{1,3}[dhms]/);
    expect(countdownTimer).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "Get Notified" })).toBeInTheDocument();
  },
}) as Story;

export const DismissibleAlert: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "dismissible",
    message:
      "We use cookies to improve your experience. By continuing, you agree to our cookie policy.",
    actions: [
      { label: "Accept", variant: "primary" },
      { label: "Learn More", variant: "link", href: "#" },
    ],
    colorScheme: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test alert renders with message
    expect(canvas.getByText(/We use cookies to improve your experience/)).toBeInTheDocument();
    
    // Test action buttons render
    expect(canvas.getByRole("button", { name: "Accept" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
  },
}) as Story;

export const CustomColors: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "top-banner",
    message: "Custom branded announcement with your brand colors!",
    actions: [{ label: "Shop Now", variant: "primary" }],
    colorScheme: "custom",
    customColors: {
      background: "#8B5CF6",
      text: "#FFFFFF",
      button: "#FCD34D",
    },
    icon: <FaBullhorn className="h-5 w-5" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test custom colors announcement renders
    expect(canvas.getByText(/Custom branded announcement/)).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "Shop Now" })).toBeInTheDocument();
  },
}) as Story;

export const BottomPosition: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "floating",
    position: "bottom",
    message: "This announcement appears at the bottom of the screen",
    actions: [{ label: "Got it", variant: "primary" }],
    colorScheme: "info",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test bottom position announcement renders
    expect(canvas.getByText(/This announcement appears at the bottom/)).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "Got it" })).toBeInTheDocument();
  },
}) as Story;

export const AutoHide: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "slide-in",
    message: "This notification will automatically disappear in 5 seconds",
    autoHide: 5000,
    colorScheme: "success",
    dismissible: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test auto-hide notification renders
    expect(canvas.getByText(/This notification will automatically disappear/)).toBeInTheDocument();
  },
}) as Story;

export const ErrorAnnouncement: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "top-banner",
    message:
      "System maintenance scheduled for tonight at 11 PM EST. Some services may be unavailable.",
    actions: [{ label: "View Details", variant: "primary" }],
    colorScheme: "error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test error announcement renders
    expect(canvas.getByText(/System maintenance scheduled/)).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "View Details" })).toBeInTheDocument();
  },
}) as Story;

export const MinimalAnnouncement: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "top-banner",
    message: "Free shipping on orders over $50",
    colorScheme: "success",
    dismissible: false,
    actions: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test minimal announcement renders
    expect(canvas.getByText(/Free shipping on orders over/)).toBeInTheDocument();
  },
}) as Story;

export const ComplexContent: Story = enhanceStoryForDualMode<typeof AnnouncementBar>(
  {
    args: {
      variant: "floating",
      message: (
        <div className="space-y-1">
          <div className="font-semibold">Black Friday Sale!</div>
          <div className="text-sm opacity-90">
            Save up to 70% on selected items. Limited time only!
          </div>
        </div>
      ),
      actions: [
        { label: "Shop Sale", variant: "primary" },
        { label: "View Terms", variant: "link" },
      ],
      colorScheme: "error",
      icon: <MdCelebration className="h-6 w-6" />,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test complex content renders
      expect(canvas.getByText("Black Friday Sale!")).toBeInTheDocument();
      expect(canvas.getByText(/Save up to 70% on selected items/)).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Shop Sale" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "View Terms" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "AnnouncementBar",
      variant: "floating",
      message: "Black Friday Sale! Save up to 70% on selected items. Limited time only!",
      actions: [
        { label: "Shop Sale", variant: "primary" },
        { label: "View Terms", variant: "link" },
      ],
      colorScheme: "error",
      icon: "MdCelebration",
    },
  }
) as Story;

export const NonSticky: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "top-banner",
    message: "This banner scrolls with the page content",
    sticky: false,
    colorScheme: "info",
    actions: [{ label: "Learn More", variant: "primary" }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test non-sticky banner renders
    expect(canvas.getByText(/This banner scrolls with the page content/)).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
  },
}) as Story;

export const NoAnimation: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "slide-in",
    message: "This notification appears without animation",
    animated: false,
    colorScheme: "warning",
    actions: [{ label: "OK", variant: "primary" }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test no animation notification renders
    expect(canvas.getByText(/This notification appears without animation/)).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "OK" })).toBeInTheDocument();
  },
}) as Story;

export const ShortCountdown: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "countdown",
    message: "Limited time offer!",
    countdownMessage: "⏰ Flash sale ends in:",
    countdownTo: new Date(Date.now() + 60 * 1000), // 1 minute from now
    actions: [{ label: "Shop Now", variant: "primary" }],
    colorScheme: "error",
    onCountdownEnd: () => alert("Countdown ended!"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test countdown renders
    expect(canvas.getByText(/Limited time offer/)).toBeInTheDocument();
    expect(canvas.getByText(/Flash sale ends in/)).toBeInTheDocument();
    
    // Test action button renders
    expect(canvas.getByRole("button", { name: "Shop Now" })).toBeInTheDocument();
  },
}) as Story;

export const MultipleActions: Story = enhanceStoryForDualMode<typeof AnnouncementBar>({
  args: {
    variant: "top-banner",
    message: "New version available with bug fixes and performance improvements",
    actions: [
      { label: "Update Now", variant: "primary" },
      { label: "View Changelog", variant: "secondary" },
      { label: "Remind Me Later", variant: "link" },
    ],
    colorScheme: "info",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test announcement renders
    expect(canvas.getByText(/New version available with bug fixes/)).toBeInTheDocument();
    
    // Test all action buttons render
    expect(canvas.getByRole("button", { name: "Update Now" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "View Changelog" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Remind Me Later" })).toBeInTheDocument();
  },
}) as Story;
