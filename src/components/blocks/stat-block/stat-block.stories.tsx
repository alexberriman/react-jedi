import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StatBlock } from "./stat-block";
import type { StatBlockDef } from "../../../types/components/stat-block";
import { enhanceStoryForDualMode } from "../../../../.storybook/utils/enhance-story";

interface StatBlockProps {
  readonly spec: StatBlockDef;
}

const meta: Meta<StatBlockProps> = {
  title: "Blocks/StatBlock",
  component: StatBlock,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<StatBlockProps>;

const basicStats: StatBlockDef["stats"] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: 125_420,
    prefix: "$",
    trend: { value: 12.5, direction: "up", label: "vs last month" },
    icon: "dollar",
    color: "primary",
  },
  {
    id: "users",
    label: "Active Users",
    value: 8234,
    trend: { value: 8.2, direction: "up" },
    icon: "users",
  },
  {
    id: "orders",
    label: "Orders",
    value: 456,
    trend: { value: -3.1, direction: "down", label: "vs last week" },
    icon: "cart",
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "3.24",
    suffix: "%",
    trend: { value: 0.8, direction: "up" },
    icon: "target",
    color: "success",
  },
];

export const Default: Story = enhanceStoryForDualMode<StatBlockProps>({
  args: {
    spec: {
      type: "StatBlock",
      stats: basicStats,
    } as StatBlockDef,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify stat labels
    expect(canvas.getByText("Total Revenue")).toBeInTheDocument();
    expect(canvas.getByText("Active Users")).toBeInTheDocument();
    expect(canvas.getByText("Orders")).toBeInTheDocument();
    expect(canvas.getByText("Conversion Rate")).toBeInTheDocument();
    
    // Verify stat values
    expect(canvas.getByText("125,420")).toBeInTheDocument();
    expect(canvas.getByText("8,234")).toBeInTheDocument();
    expect(canvas.getByText("456")).toBeInTheDocument();
    expect(canvas.getByText("3.24")).toBeInTheDocument();
    
    // Verify prefix/suffix
    expect(canvas.getByText("$")).toBeInTheDocument();
    expect(canvas.getByText("%")).toBeInTheDocument();
    
    // Verify trend indicators
    expect(canvas.getByText("+12.5%")).toBeInTheDocument();
    expect(canvas.getByText("+8.2%")).toBeInTheDocument();
    expect(canvas.getByText("-3.1%")).toBeInTheDocument();
    expect(canvas.getByText("+0.8%")).toBeInTheDocument();
  },
});

export const GridVariant: Story = enhanceStoryForDualMode<StatBlockProps>({
  args: {
    spec: {
      type: "StatBlock",
      variant: "grid",
      stats: basicStats,
      columns: 4,
      gap: "lg",
      showBorder: true,
    } as StatBlockDef,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all stats are rendered in grid layout
    expect(canvas.getByText("Total Revenue")).toBeInTheDocument();
    expect(canvas.getByText("Active Users")).toBeInTheDocument();
    expect(canvas.getByText("Orders")).toBeInTheDocument();
    expect(canvas.getByText("Conversion Rate")).toBeInTheDocument();
    
    // Verify borders are shown (grid should have borders when showBorder is true)
    const container = canvasElement.querySelector('.grid');
    expect(container).toBeInTheDocument();
  },
});

export const CardVariant: Story = enhanceStoryForDualMode<StatBlockProps>({
  args: {
    spec: {
      type: "StatBlock",
      variant: "card",
      stats: basicStats,
      columns: 2,
      gap: "md",
    } as StatBlockDef,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify stats are rendered in card layout
    expect(canvas.getByText("Total Revenue")).toBeInTheDocument();
    expect(canvas.getByText("Active Users")).toBeInTheDocument();
    
    // Verify card styling is applied
    const cardElements = canvasElement.querySelectorAll('[class*="border"]');
    expect(cardElements.length).toBeGreaterThan(0);
  },
});

export const HorizontalVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "horizontal",
      stats: basicStats.slice(0, 3),
      alignment: "left",
    } as StatBlockDef,
  },
};

export const VerticalVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "vertical",
      stats: basicStats.slice(0, 3),
      showBackground: true,
      gap: "lg",
    } as StatBlockDef,
  },
};

export const MinimalVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "minimal",
      stats: [
        { label: "Revenue", value: "$125.4K" },
        { label: "Users", value: "8,234" },
        { label: "Growth", value: "+12.5%" },
        { label: "Sessions", value: "23.4K" },
      ],
      columns: 4,
      alignment: "center",
      valueSize: "lg",
      labelSize: "xs",
    } as StatBlockDef,
  },
};

export const DetailedVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "detailed",
      stats: [
        {
          label: "Monthly Recurring Revenue",
          value: 125_420,
          prefix: "$",
          description: "Total revenue from all active subscriptions this month",
          trend: { value: 12.5, direction: "up", label: "compared to last month" },
          icon: "dollar",
          color: "primary",
        },
        {
          label: "Customer Lifetime Value",
          value: 1842,
          prefix: "$",
          description: "Average revenue generated per customer over their lifetime",
          trend: { value: 5.3, direction: "up", label: "3-month average" },
          icon: "users",
          color: "secondary",
        },
      ],
      columns: 2,
      showBackground: true,
      gap: "xl",
    } as StatBlockDef,
  },
};

export const WithIconPositions: Story = enhanceStoryForDualMode<StatBlockProps>({
  args: {
    spec: {
      type: "StatBlock",
      stats: [
        {
          label: "Top Icon",
          value: 125,
          icon: "star",
          iconPosition: "top",
        },
        {
          label: "Left Icon",
          value: 456,
          icon: "heart",
          iconPosition: "left",
        },
        {
          label: "Right Icon",
          value: 789,
          icon: "eye",
          iconPosition: "right",
        },
      ],
      columns: 3,
      showBorder: true,
    } as StatBlockDef,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all stat labels
    expect(canvas.getByText("Top Icon")).toBeInTheDocument();
    expect(canvas.getByText("Left Icon")).toBeInTheDocument();
    expect(canvas.getByText("Right Icon")).toBeInTheDocument();
    
    // Verify all stat values
    expect(canvas.getByText("125")).toBeInTheDocument();
    expect(canvas.getByText("456")).toBeInTheDocument();
    expect(canvas.getByText("789")).toBeInTheDocument();
    
    // Verify icons are present with different positions
    const icons = canvasElement.querySelectorAll('svg');
    expect(icons.length).toBe(3);
  },
});

export const DifferentSizes: Story = {
  args: {
    spec: {
      type: "StatBlock",
      stats: [
        { label: "Small", value: 123 },
        { label: "Medium", value: 456 },
        { label: "Large", value: 789 },
      ],
      columns: 3,
      valueSize: "3xl",
      labelSize: "lg",
      gap: "xl",
    } as StatBlockDef,
  },
};

export const ColorVariations: Story = enhanceStoryForDualMode<StatBlockProps>({
  args: {
    spec: {
      type: "StatBlock",
      stats: [
        { label: "Default", value: 100, color: "default" },
        { label: "Primary", value: 200, color: "primary" },
        { label: "Secondary", value: 300, color: "secondary" },
        { label: "Success", value: 400, color: "success" },
        { label: "Warning", value: 500, color: "warning" },
        { label: "Error", value: 600, color: "error" },
      ],
      columns: 3,
      showBackground: true,
    } as StatBlockDef,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all color variant labels
    expect(canvas.getByText("Default")).toBeInTheDocument();
    expect(canvas.getByText("Primary")).toBeInTheDocument();
    expect(canvas.getByText("Secondary")).toBeInTheDocument();
    expect(canvas.getByText("Success")).toBeInTheDocument();
    expect(canvas.getByText("Warning")).toBeInTheDocument();
    expect(canvas.getByText("Error")).toBeInTheDocument();
    
    // Verify all values
    expect(canvas.getByText("100")).toBeInTheDocument();
    expect(canvas.getByText("200")).toBeInTheDocument();
    expect(canvas.getByText("300")).toBeInTheDocument();
    expect(canvas.getByText("400")).toBeInTheDocument();
    expect(canvas.getByText("500")).toBeInTheDocument();
    expect(canvas.getByText("600")).toBeInTheDocument();
    
    // Verify background styling is applied
    const backgroundElements = canvasElement.querySelectorAll('[class*="bg-"]');
    expect(backgroundElements.length).toBeGreaterThan(0);
  },
});

export const NoAnimation: Story = {
  args: {
    spec: {
      type: "StatBlock",
      stats: basicStats,
      animated: false,
      countUp: false,
    } as StatBlockDef,
  },
};

export const CustomCountUpDuration: Story = {
  args: {
    spec: {
      type: "StatBlock",
      stats: [
        { label: "Fast Count", value: 1000 },
        { label: "Slow Count", value: 5000 },
        { label: "Very Slow", value: 10_000 },
      ],
      countUpDuration: 5000,
      columns: 3,
    } as StatBlockDef,
  },
};

export const MixedContent: Story = {
  args: {
    spec: {
      type: "StatBlock",
      stats: [
        {
          label: "Revenue",
          value: 125_420,
          prefix: "$",
          trend: { value: 12.5, direction: "up" },
          icon: "dollar",
        },
        {
          label: "Status",
          value: "Operational",
          icon: "activity",
          color: "success",
        },
        {
          label: "Performance Score",
          value: "A+",
          icon: "award",
          color: "primary",
        },
        {
          label: "Uptime",
          value: "99.9",
          suffix: "%",
          icon: "zap",
        },
      ],
      columns: 4,
      variant: "card",
    } as StatBlockDef,
  },
};

export const ResponsiveColumns: Story = {
  args: {
    spec: {
      type: "StatBlock",
      stats: [
        { label: "Stat 1", value: 100 },
        { label: "Stat 2", value: 200 },
        { label: "Stat 3", value: 300 },
        { label: "Stat 4", value: 400 },
        { label: "Stat 5", value: 500 },
        { label: "Stat 6", value: 600 },
      ],
      columns: 6,
      gap: "sm",
      valueSize: "xl",
      showBorder: true,
    } as StatBlockDef,
  },
};

export const DashboardExample: Story = enhanceStoryForDualMode<StatBlockProps>({
  args: {
    spec: {
      type: "StatBlock",
      variant: "card",
      stats: [
        {
          label: "Total Sales",
          value: 2_453_080,
          prefix: "$",
          trend: { value: 15.3, direction: "up", label: "from last quarter" },
          icon: "dollar",
          color: "primary",
          description: "Gross sales including all channels",
        },
        {
          label: "New Customers",
          value: 1247,
          trend: { value: 22.4, direction: "up" },
          icon: "users",
          description: "Customers acquired this month",
        },
        {
          label: "Avg Order Value",
          value: 148.32,
          prefix: "$",
          trend: { value: -2.1, direction: "down" },
          icon: "cart",
          description: "Average transaction size",
        },
        {
          label: "Customer Satisfaction",
          value: 4.8,
          suffix: "/5",
          trend: { value: 3.2, direction: "up" },
          icon: "star",
          color: "success",
          description: "Based on 2,341 reviews",
        },
      ],
      columns: 4,
      gap: "lg",
      showDescription: true,
      countUp: true,
      animated: true,
      staggerDelay: 150,
    } as StatBlockDef,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify main stats
    expect(canvas.getByText("Total Sales")).toBeInTheDocument();
    expect(canvas.getByText("New Customers")).toBeInTheDocument();
    expect(canvas.getByText("Avg Order Value")).toBeInTheDocument();
    expect(canvas.getByText("Customer Satisfaction")).toBeInTheDocument();
    
    // Verify formatted values
    expect(canvas.getByText("2,453,080")).toBeInTheDocument();
    expect(canvas.getByText("1,247")).toBeInTheDocument();
    expect(canvas.getByText("148.32")).toBeInTheDocument();
    expect(canvas.getByText("4.8")).toBeInTheDocument();
    
    // Verify descriptions are shown
    expect(canvas.getByText("Gross sales including all channels")).toBeInTheDocument();
    expect(canvas.getByText("Customers acquired this month")).toBeInTheDocument();
    expect(canvas.getByText("Average transaction size")).toBeInTheDocument();
    expect(canvas.getByText("Based on 2,341 reviews")).toBeInTheDocument();
    
    // Verify trend indicators
    expect(canvas.getByText("+15.3%")).toBeInTheDocument();
    expect(canvas.getByText("+22.4%")).toBeInTheDocument();
    expect(canvas.getByText("-2.1%")).toBeInTheDocument();
    expect(canvas.getByText("+3.2%")).toBeInTheDocument();
    
    // Verify icons are present (check for SVG elements)
    const icons = canvasElement.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  },
});

export const GradientVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "gradient",
      stats: [
        {
          label: "Monthly Revenue",
          value: 125_420,
          prefix: "$",
          trend: { value: 12.5, direction: "up", label: "vs last month" },
          icon: "dollar",
          color: "primary",
          iconPosition: "top",
        },
        {
          label: "Active Projects",
          value: 42,
          trend: { value: 8.2, direction: "up" },
          icon: "rocket",
          iconPosition: "top",
        },
        {
          label: "Team Members",
          value: 128,
          trend: { value: 15.3, direction: "up" },
          icon: "users",
          iconPosition: "top",
        },
        {
          label: "Performance Score",
          value: 94.2,
          suffix: "%",
          trend: { value: 3.1, direction: "up" },
          icon: "chart",
          iconPosition: "top",
        },
      ],
      columns: 4,
      gap: "lg",
      animated: true,
    } as StatBlockDef,
  },
};

export const GlassVariant: Story = {
  parameters: {
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      ],
    },
  },
  args: {
    spec: {
      type: "StatBlock",
      variant: "glass",
      stats: [
        {
          label: "Cloud Storage",
          value: "2.4TB",
          trend: { value: 25, direction: "up" },
          icon: "cloud",
          iconPosition: "top",
        },
        {
          label: "API Calls",
          value: "1.2M",
          trend: { value: 18.5, direction: "up" },
          icon: "globe",
          iconPosition: "top",
        },
        {
          label: "Uptime",
          value: 99.98,
          suffix: "%",
          icon: "activity",
          iconPosition: "top",
        },
      ],
      columns: 3,
      gap: "lg",
      animated: true,
      showDescription: false,
    } as StatBlockDef,
  },
};

export const ModernVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "modern",
      stats: [
        {
          label: "Total Revenue",
          value: 845_920,
          prefix: "$",
          trend: { value: 24.8, direction: "up", label: "YoY growth" },
          icon: "dollar",
          color: "primary",
          description: "Revenue across all product lines",
          iconPosition: "left",
        },
        {
          label: "Customer Base",
          value: 12_847,
          trend: { value: 18.3, direction: "up", label: "new this quarter" },
          icon: "users",
          description: "Total active customers",
          iconPosition: "left",
        },
        {
          label: "Market Share",
          value: 34.2,
          suffix: "%",
          trend: { value: 5.7, direction: "up" },
          icon: "target",
          color: "success",
          description: "Industry market share",
          iconPosition: "left",
        },
        {
          label: "AI Accuracy",
          value: 97.8,
          suffix: "%",
          trend: { value: 2.1, direction: "up" },
          icon: "brain",
          color: "secondary",
          description: "Model prediction accuracy",
          iconPosition: "left",
        },
      ],
      columns: 2,
      gap: "xl",
      showDescription: true,
      animated: true,
      countUp: true,
    } as StatBlockDef,
  },
};

export const NeonVariant: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#0a0a0a",
        },
      ],
    },
  },
  args: {
    spec: {
      type: "StatBlock",
      variant: "neon",
      stats: [
        {
          label: "Live Users",
          value: 3842,
          trend: { value: 45.2, direction: "up" },
          icon: "users",
          color: "primary",
          iconPosition: "top",
        },
        {
          label: "Stream Quality",
          value: "4K",
          icon: "eye",
          color: "success",
          iconPosition: "top",
        },
        {
          label: "Response Time",
          value: 12,
          suffix: "ms",
          trend: { value: -8.5, direction: "down" },
          icon: "zap",
          color: "warning",
          iconPosition: "top",
        },
        {
          label: "Success Rate",
          value: 99.2,
          suffix: "%",
          icon: "sparkles",
          color: "secondary",
          iconPosition: "top",
        },
      ],
      columns: 4,
      gap: "lg",
      animated: true,
      countUp: true,
      animationDuration: 400,
    } as StatBlockDef,
  },
};

export const SaaSMetrics: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "gradient",
      stats: [
        {
          label: "MRR",
          value: 184_250,
          prefix: "$",
          trend: { value: 18.5, direction: "up", label: "growth" },
          icon: "trend",
          color: "primary",
          description: "Monthly Recurring Revenue",
        },
        {
          label: "Churn Rate",
          value: 2.8,
          suffix: "%",
          trend: { value: -0.5, direction: "down", label: "improved" },
          icon: "chart",
          color: "error",
          description: "Monthly customer churn",
        },
        {
          label: "LTV",
          value: 4820,
          prefix: "$",
          trend: { value: 12.3, direction: "up" },
          icon: "award",
          color: "success",
          description: "Customer lifetime value",
        },
        {
          label: "CAC",
          value: 385,
          prefix: "$",
          trend: { value: -8.2, direction: "down", label: "reduced" },
          icon: "target",
          color: "warning",
          description: "Customer acquisition cost",
        },
      ],
      columns: 4,
      gap: "lg",
      showDescription: true,
      animated: true,
      countUp: true,
    } as StatBlockDef,
  },
};

export const EcommerceStats: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "modern",
      stats: [
        {
          label: "Total Orders",
          value: 8429,
          trend: { value: 28.4, direction: "up" },
          icon: "package",
          iconPosition: "top",
        },
        {
          label: "Cart Abandonment",
          value: 68.2,
          suffix: "%",
          trend: { value: -5.3, direction: "down" },
          icon: "cart",
          color: "warning",
          iconPosition: "top",
        },
        {
          label: "Avg Basket Size",
          value: 127.45,
          prefix: "$",
          trend: { value: 12.1, direction: "up" },
          icon: "dollar",
          color: "success",
          iconPosition: "top",
        },
        {
          label: "Return Rate",
          value: 4.2,
          suffix: "%",
          trend: { value: -1.8, direction: "down" },
          icon: "package",
          color: "error",
          iconPosition: "top",
        },
        {
          label: "Customer Reviews",
          value: 4.8,
          suffix: "/5",
          icon: "star",
          color: "primary",
          iconPosition: "top",
        },
        {
          label: "Repeat Purchase",
          value: 34.5,
          suffix: "%",
          trend: { value: 6.7, direction: "up" },
          icon: "users",
          iconPosition: "top",
        },
      ],
      columns: 3,
      gap: "lg",
      animated: true,
    } as StatBlockDef,
  },
};

export const CompactStats: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "glass",
      stats: [
        { label: "Downloads", value: "125K", icon: "chart" },
        { label: "Stars", value: "8.2K", icon: "star" },
        { label: "Forks", value: "1.8K", icon: "rocket" },
        { label: "Contributors", value: "342", icon: "users" },
      ],
      columns: 4,
      valueSize: "xl",
      labelSize: "sm",
      gap: "md",
      animated: true,
      countUp: false,
    } as StatBlockDef,
  },
};
