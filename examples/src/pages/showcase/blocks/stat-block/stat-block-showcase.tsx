import { render } from "@alexberriman/react-jedi";
import type { StatBlockDef } from "@alexberriman/react-jedi";
import { ShowcaseWrapper } from "../../../components/ui/showcase-wrapper";

const basicExample: StatBlockDef = {
  type: "StatBlock",
  stats: [
    {
      label: "Total Revenue",
      value: 125420,
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
      value: 2453080,
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
              value: 892340,
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
              value: 892340,
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
            { label: "Revenue", value: 45678, prefix: "$" },
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
            { label: "Revenue", value: 45678, prefix: "$" },
            { label: "Customers", value: 892 },
          ],
          animated: false,
          countUp: false,
        })}
      </ShowcaseWrapper>
    </div>
  );
}