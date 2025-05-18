import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  RadialBarChart,
  RadialBar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
// Chart utility components will be defined below
import { cn, cleanDOMProps } from "../../../lib/utils";
import type { ComponentProps } from "../../../types/schema/components";
import { Tooltip, Legend } from "recharts";

// Chart configuration types
export interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
    icon?: React.ReactNode;
  };
}

// Chart container component
export function ChartContainer({
  children,
  config,
  className,
  ...props
}: Readonly<{
  children: React.ReactNode;
  config: ChartConfig;
  className?: string;
}>) {
  return (
    <div className={cn("w-full", className)} {...cleanDOMProps(props)}>
      {children}
    </div>
  );
}

// Chart tooltip component
export const ChartTooltip = Tooltip;

// Chart tooltip content
export function ChartTooltipContent({
  active,
  payload,
  label,
  config,
}: Readonly<{
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number | string;
  }>;
  label?: string;
  config?: ChartConfig;
}>) {
  if (!active || !payload) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground">{label}</span>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="font-medium">{entry.name}</span>
            <span className="ml-auto font-mono text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Chart legend component
export const ChartLegend = Legend;

// Chart legend content
export function ChartLegendContent({
  payload,
}: Readonly<{
  payload?: Array<{
    color: string;
    value: string;
  }>;
}>) {
  if (!payload) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-4">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
}

export interface ChartProps {
  // ComponentProps compatibility
  spec?: ComponentProps["spec"];
  theme?: ComponentProps["theme"];
  state?: ComponentProps["state"];
  children?: ComponentProps["children"];

  // Chart specific props
  chartType?: "line" | "bar" | "area" | "pie" | "radar" | "radialBar";
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  dataKey?: string;
  dataKeys?: string[];
  width?: number | string;
  height?: number | string;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisDataKey?: string;
  yAxisDomain?: [number | "auto", number | "auto"];
  stackId?: string;
  colors?: string[];
  fillOpacity?: number;
  strokeWidth?: number;
  animationDuration?: number;
  animationEasing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  className?: string;
  onClick?: (data: unknown) => void;
  onMouseEnter?: (data: unknown) => void;
  onMouseLeave?: () => void;
  legendPosition?: "top" | "bottom" | "left" | "right";
  tooltipFormatter?: (value: unknown, name: string) => React.ReactNode;
  aspectRatio?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  cx?: string | number;
  cy?: string | number;
  labelLine?: boolean;
  label?: boolean | ((data: Record<string, unknown>) => React.ReactElement<SVGElement>);
}

export const Chart: React.FC<ChartProps> = ({
  spec,
  theme,
  state,
  children,
  chartType,
  data,
  config,
  dataKey,
  dataKeys = [],
  width = "100%",
  height = 350,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = false,
  xAxisDataKey = "name",
  yAxisDomain,
  stackId,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1", "#d084d0"],
  fillOpacity = 0.6,
  strokeWidth = 2,
  animationDuration = 1000,
  animationEasing = "ease-in-out",
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  legendPosition = "bottom",
  tooltipFormatter,
  aspectRatio,
  innerRadius = 0,
  outerRadius = 80,
  startAngle = 90,
  endAngle = -270,
  cx = "50%",
  cy = "50%",
  labelLine = false,
  label = false,
}) => {
  // Get the chart type, preferring the direct prop over spec
  const type = chartType || (spec as Record<string, unknown>)?.chartType || "line";

  const chartProps = {
    data,
    margin,
    onClick,
    onMouseEnter,
    onMouseLeave,
  };

  const renderChart = () => {
    switch (type) {
      case "line": {
        return (
          <LineChart {...chartProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey={xAxisDataKey} />}
            {showYAxis && <YAxis domain={yAxisDomain} />}
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || "value"]).map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                animationDuration={animationDuration}
                animationEasing={animationEasing}
                dot={{ fill: colors[index % colors.length] }}
              />
            ))}
          </LineChart>
        );
      }

      case "bar": {
        return (
          <BarChart {...chartProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey={xAxisDataKey} />}
            {showYAxis && <YAxis domain={yAxisDomain} />}
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || "value"]).map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                stackId={stackId}
                animationDuration={animationDuration}
                animationEasing={animationEasing}
              />
            ))}
          </BarChart>
        );
      }

      case "area": {
        return (
          <AreaChart {...chartProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey={xAxisDataKey} />}
            {showYAxis && <YAxis domain={yAxisDomain} />}
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || "value"]).map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={fillOpacity}
                strokeWidth={strokeWidth}
                stackId={stackId}
                animationDuration={animationDuration}
                animationEasing={animationEasing}
              />
            ))}
          </AreaChart>
        );
      }

      case "pie": {
        return (
          <PieChart>
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            <Pie
              data={data}
              dataKey={dataKey || "value"}
              nameKey={xAxisDataKey}
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              labelLine={labelLine}
              label={label}
              animationDuration={animationDuration}
              animationEasing={animationEasing}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      }

      case "radar": {
        return (
          <RadarChart {...chartProps}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxisDataKey} />
            <PolarRadiusAxis domain={yAxisDomain} />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || "value"]).map((key, index) => (
              <Radar
                key={key}
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={fillOpacity}
                animationDuration={animationDuration}
                animationEasing={animationEasing}
              />
            ))}
          </RadarChart>
        );
      }

      case "radialBar": {
        return (
          <RadialBarChart
            {...chartProps}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            <PolarGrid />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            <RadialBar
              dataKey={dataKey || "value"}
              cornerRadius={10}
              fill="#8884d8"
              label={label}
              animationDuration={animationDuration}
              animationEasing={animationEasing}
            />
          </RadialBarChart>
        );
      }

      default: {
        return null;
      }
    }
  };

  const chart = renderChart();
  if (!chart) {
    return null;
  }

  return (
    <ChartContainer config={config} className={className}>
      {chart}
    </ChartContainer>
  );
};
