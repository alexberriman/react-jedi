import { render } from "@alexberriman/react-jedi";
import type { StatBlockDef } from "@alexberriman/react-jedi";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";

const basicExample: StatBlockDef = {
  type: "StatBlock",
  stats: [
    {
      label: "Total Revenue",
      value: 125_420,
      prefix: "$",
      trend: { value: 12.5, direction: "up" },
      icon: "dollar",
    },
    {
      label: "Active Users",
      value: 8234,
      trend: { value: 8.2, direction: "up" },
      icon: "users",
    },
    {
      label: "Conversion Rate",
      value: 3.24,
      suffix: "%",
      icon: "target",
    },
  ],
};

const cardVariant: StatBlockDef = {
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
};

const minimalVariant: StatBlockDef = {
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
};

const horizontalVariant: StatBlockDef = {
  type: "StatBlock",
  variant: "horizontal",
  stats: [
    {
      label: "Server Status",
      value: "Operational",
      icon: "activity",
      color: "success",
    },
    {
      label: "Uptime",
      value: 99.98,
      suffix: "%",
      icon: "zap",
      color: "primary",
    },
    {
      label: "Response Time",
      value: 142,
      unit: "ms",
      icon: "activity",
    },
  ],
  alignment: "left",
  showBackground: true,
};

const coloredStats: StatBlockDef = {
  type: "StatBlock",
  stats: [
    { label: "Primary", value: 100, color: "primary", icon: "star" },
    { label: "Success", value: 200, color: "success", icon: "activity" },
    { label: "Warning", value: 300, color: "warning", icon: "zap" },
    { label: "Error", value: 400, color: "error", icon: "target" },
  ],
  columns: 4,
  showBorder: true,
};

const cloudInfrastructureStats: StatBlockDef = {
  type: "StatBlock",
  variant: "card",
  stats: [
    {
      label: "AWS Instances",
      value: 127,
      icon: "aws",
      color: "warning",
      trend: { value: 5.2, direction: "up" },
      description: "Active EC2 instances across regions",
    },
    {
      label: "Azure Resources",
      value: 84,
      icon: "azure",
      color: "primary",
      trend: { value: 12.8, direction: "up" },
      description: "Virtual machines and services",
    },
    {
      label: "Security Score",
      value: 98.5,
      suffix: "%",
      icon: "shield",
      color: "success",
      trend: { value: 2.1, direction: "up" },
      description: "Overall infrastructure security rating",
    },
    {
      label: "Total Servers",
      value: 342,
      icon: "server",
      trend: { value: 8.4, direction: "up" },
      description: "Combined cloud and on-premise",
    },
  ],
  columns: 4,
  gap: "lg",
  showDescription: true,
};

const gradientVariant: StatBlockDef = {
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
};

const glassVariant: StatBlockDef = {
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
};

const modernVariant: StatBlockDef = {
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
};

const neonVariant: StatBlockDef = {
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
};

export function StatBlockShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Stat Block</h1>
        <p className="text-muted-foreground">
          Display statistics and metrics with various layouts, animations, and styling options.
        </p>
      </div>

      <ShowcaseWrapper title="Basic Grid Layout" code={JSON.stringify(basicExample, null, 2)}>
        {render(basicExample)}
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Card Variant with Descriptions" code={JSON.stringify(cardVariant, null, 2)}>
        {render(cardVariant)}
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Minimal Variant" code={JSON.stringify(minimalVariant, null, 2)}>
        {render(minimalVariant)}
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Horizontal Layout" code={JSON.stringify(horizontalVariant, null, 2)}>
        {render(horizontalVariant)}
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Color Variations" code={JSON.stringify(coloredStats, null, 2)}>
        {render(coloredStats)}
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Cloud Infrastructure Monitoring" code={JSON.stringify(cloudInfrastructureStats, null, 2)}>
        {render(cloudInfrastructureStats)}
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Gradient Variant - Modern Dashboard" code={JSON.stringify(gradientVariant, null, 2)}>
        {render(gradientVariant)}
      </ShowcaseWrapper>

      <ShowcaseWrapper 
        title="Glass Variant - Transparent Style" 
        code={JSON.stringify(glassVariant, null, 2)}
        className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-lg"
      >
        {render(glassVariant)}
      </ShowcaseWrapper>

      <ShowcaseWrapper title="Modern Variant - Clean & Professional" code={JSON.stringify(modernVariant, null, 2)}>
        {render(modernVariant)}
      </ShowcaseWrapper>

      <ShowcaseWrapper 
        title="Neon Variant - Futuristic Style" 
        code={JSON.stringify(neonVariant, null, 2)}
        className="bg-gray-900 p-8 rounded-lg"
      >
        {render(neonVariant)}
      </ShowcaseWrapper>

      <ShowcaseWrapper 
        title="Vertical Layout" 
        code={JSON.stringify({
          type: "StatBlock",
          variant: "vertical",
          stats: [
            {
              label: "Database Size",
              value: 45.2,
              unit: "GB",
              icon: "zap",
              description: "Current database usage",
            },
            {
              label: "API Requests",
              value: 892_340,
              icon: "target",
              description: "Total API calls this month",
            },
            {
              label: "Cache Hit Rate",
              value: 96.4,
              suffix: "%",
              icon: "activity",
              color: "success",
            },
          ],
          showBackground: true,
          gap: "md",
        }, null, 2)}
      >
        {render({
          type: "StatBlock",
          variant: "vertical",
          stats: [
            {
              label: "Database Size",
              value: 45.2,
              unit: "GB",
              icon: "zap",
              description: "Current database usage",
            },
            {
              label: "API Requests",
              value: 892_340,
              icon: "target",
              description: "Total API calls this month",
            },
            {
              label: "Cache Hit Rate",
              value: 96.4,
              suffix: "%",
              icon: "activity",
              color: "success",
            },
          ],
          showBackground: true,
          gap: "md",
        })}
      </ShowcaseWrapper>

      <ShowcaseWrapper 
        title="Without Animations" 
        code={JSON.stringify({
          type: "StatBlock",
          stats: [
            { label: "Orders", value: 1234 },
            { label: "Revenue", value: 45_678, prefix: "$" },
            { label: "Customers", value: 892 },
          ],
          animated: false,
          countUp: false,
        }, null, 2)}
      >
        {render({
          type: "StatBlock",
          stats: [
            { label: "Orders", value: 1234 },
            { label: "Revenue", value: 45_678, prefix: "$" },
            { label: "Customers", value: 892 },
          ],
          animated: false,
          countUp: false,
        })}
      </ShowcaseWrapper>
    </div>
  );
}