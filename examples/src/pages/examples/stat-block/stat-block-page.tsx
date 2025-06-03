import { render } from "@alexberriman/react-jedi";
import type { StatBlockDef } from "@alexberriman/react-jedi";

const dashboardStats: StatBlockDef = {
  type: "StatBlock",
  variant: "card",
  stats: [
    {
      label: "Total Revenue",
      value: 2453080,
      prefix: "$",
      trend: { value: 15.3, direction: "up", label: "from last quarter" },
      icon: "dollar",
      color: "primary",
      description: "Gross revenue across all channels",
    },
    {
      label: "Active Users",
      value: 12847,
      trend: { value: 22.4, direction: "up" },
      icon: "users",
      description: "Users active in the last 30 days",
    },
    {
      label: "Conversion Rate",
      value: 3.24,
      suffix: "%",
      trend: { value: -2.1, direction: "down" },
      icon: "target",
      description: "Percentage of visitors who made a purchase",
    },
    {
      label: "Customer Satisfaction",
      value: 4.8,
      suffix: "/5",
      trend: { value: 3.2, direction: "up" },
      icon: "star",
      color: "success",
      description: "Average rating from 2,341 reviews",
    },
  ],
  columns: 4,
  gap: "lg",
  showDescription: true,
  countUp: true,
  animated: true,
};

const performanceStats: StatBlockDef = {
  type: "StatBlock",
  variant: "horizontal",
  stats: [
    {
      label: "Page Load Time",
      value: 1.2,
      unit: "s",
      icon: "zap",
      color: "success",
    },
    {
      label: "Uptime",
      value: 99.98,
      suffix: "%",
      icon: "activity",
      color: "primary",
    },
    {
      label: "Error Rate",
      value: 0.03,
      suffix: "%",
      icon: "activity",
      color: "error",
    },
  ],
  alignment: "left",
  showBackground: true,
};

const minimalStats: StatBlockDef = {
  type: "StatBlock",
  variant: "minimal",
  stats: [
    { label: "Orders", value: "1.2K" },
    { label: "Revenue", value: "$45.6K" },
    { label: "Customers", value: "892" },
    { label: "Growth", value: "+12%" },
  ],
  columns: 4,
  alignment: "center",
  valueSize: "lg",
  labelSize: "xs",
};

export function StatBlockPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Stat Block Examples</h1>
        <p className="text-muted-foreground mb-8">
          Display statistics and metrics with various layouts and animations.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Dashboard Stats (Card Variant)</h2>
          {render(dashboardStats)}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Performance Metrics (Horizontal)</h2>
          {render(performanceStats)}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Minimal Stats</h2>
          {render(minimalStats)}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Grid Layout with Trends</h2>
          {render({
            type: "StatBlock",
            variant: "grid",
            stats: [
              {
                label: "Total Sales",
                value: 125420,
                prefix: "$",
                trend: { value: 12.5, direction: "up", label: "vs last month" },
                icon: "dollar",
                color: "primary",
              },
              {
                label: "New Customers",
                value: 234,
                trend: { value: 8.2, direction: "up" },
                icon: "users",
              },
              {
                label: "Avg Order Value",
                value: 148.32,
                prefix: "$",
                trend: { value: -3.1, direction: "down" },
                icon: "cart",
              },
            ],
            columns: 3,
            showBorder: true,
            gap: "lg",
          })}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Detailed Stats</h2>
          {render({
            type: "StatBlock",
            variant: "detailed",
            stats: [
              {
                label: "Monthly Recurring Revenue",
                value: 125420,
                prefix: "$",
                description: "Total revenue from all active subscriptions this month. This includes all subscription tiers and add-ons.",
                trend: { value: 12.5, direction: "up", label: "compared to last month" },
                icon: "dollar",
                color: "primary",
                iconPosition: "left",
              },
              {
                label: "Customer Lifetime Value",
                value: 1842,
                prefix: "$",
                description: "Average revenue generated per customer over their entire relationship with our company.",
                trend: { value: 5.3, direction: "up", label: "3-month average" },
                icon: "users",
                color: "secondary",
                iconPosition: "left",
              },
            ],
            columns: 2,
            showBackground: true,
            gap: "xl",
          })}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Vertical Layout</h2>
          {render({
            type: "StatBlock",
            variant: "vertical",
            stats: [
              {
                label: "Server Status",
                value: "Operational",
                icon: "activity",
                color: "success",
              },
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
            ],
            showBackground: true,
            gap: "md",
          })}
        </div>
      </div>
    </div>
  );
}