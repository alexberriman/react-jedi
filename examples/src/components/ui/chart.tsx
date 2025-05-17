import * as React from "react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

interface ChartProps {
  chartType: "line" | "bar" | "area" | "pie" | "radialBar";
  data: unknown[];
  config: ChartConfig;
  dataKey?: string;
  dataKeys?: string[];
  xAxisDataKey?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  fillOpacity?: number;
  strokeWidth?: number;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  cx?: number | string;
  cy?: number | string;
}

const DEFAULT_COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#14b8a6",
  "#6366f1",
];

export function Chart({
  chartType,
  data,
  config,
  dataKey,
  dataKeys,
  xAxisDataKey,
  height = 300,
  width = "100%",
  className,
  showGrid = false,
  showXAxis = false,
  showYAxis = false,
  showTooltip = false,
  showLegend = false,
  fillOpacity = 0.8,
  strokeWidth = 2,
  colors = DEFAULT_COLORS,
  innerRadius = 0,
  outerRadius = 80,
  startAngle = 0,
  endAngle = 360,
  cx = "50%",
  cy = "50%",
}: Readonly<ChartProps>) {
  const keys = dataKeys || (dataKey ? [dataKey] : Object.keys(config));

  const renderChart = () => {
    switch (chartType) {
      case "line": {
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
            {showXAxis && (
              <XAxis dataKey={xAxisDataKey} stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
            )}
            {showYAxis && <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />}
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ color: "#fff" }} />}
            {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config[key]?.color || colors[index % colors.length]}
                strokeWidth={strokeWidth}
                name={config[key]?.label}
              />
            ))}
          </LineChart>
        );
      }

      case "bar": {
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
            {showXAxis && (
              <XAxis dataKey={xAxisDataKey} stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
            )}
            {showYAxis && <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />}
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ color: "#fff" }} />}
            {keys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key]?.color || colors[index % colors.length]}
                name={config[key]?.label}
              />
            ))}
          </BarChart>
        );
      }

      case "area": {
        return (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
            {showXAxis && (
              <XAxis dataKey={xAxisDataKey} stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
            )}
            {showYAxis && <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />}
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ color: "#fff" }} />}
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config[key]?.color || colors[index % colors.length]}
                fill={config[key]?.color || colors[index % colors.length]}
                fillOpacity={fillOpacity}
                name={config[key]?.label}
              />
            ))}
          </AreaChart>
        );
      }

      case "pie": {
        return (
          <PieChart>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ color: "#fff" }} />}
            <Pie
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      }

      case "radialBar": {
        return (
          <RadialBarChart
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            data={data}
          >
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ color: "#fff" }} />}
            <RadialBar minAngle={15} background clockWise dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
              ))}
            </RadialBar>
          </RadialBarChart>
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className={cn("relative", className)}>
      <ResponsiveContainer width={width} height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
