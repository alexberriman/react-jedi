import type { Meta, StoryObj } from "@storybook/react";
import { StatBlock } from "./stat-block";
import type { StatBlockDef } from "../../../types/components/stat-block";

const meta: Meta<typeof StatBlock> = {
  title: "Blocks/StatBlock",
  component: StatBlock,
  tags: ["test"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof StatBlock>;

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

export const Default: Story = {
  args: {
    spec: {
      type: "StatBlock",
      stats: basicStats,
    },
  },
};

export const GridVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "grid",
      stats: basicStats,
      columns: 4,
      gap: "lg",
      showBorder: true,
    },
  },
};

export const CardVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "card",
      stats: basicStats,
      columns: 2,
      gap: "md",
    },
  },
};

export const HorizontalVariant: Story = {
  args: {
    spec: {
      type: "StatBlock",
      variant: "horizontal",
      stats: basicStats.slice(0, 3),
      alignment: "left",
    },
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
    },
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
    },
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
    },
  },
};

export const WithIconPositions: Story = {
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
    },
  },
};

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
    },
  },
};

export const ColorVariations: Story = {
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
    },
  },
};

export const NoAnimation: Story = {
  args: {
    spec: {
      type: "StatBlock",
      stats: basicStats,
      animated: false,
      countUp: false,
    },
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
    },
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
    },
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
    },
  },
};

export const DashboardExample: Story = {
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
    },
  },
};