import type { BaseComponentSpec } from "../schema/base";

export interface ChartComponentProps extends Omit<BaseComponentSpec, "data"> {
  type: "Chart";
  chartType: "line" | "bar" | "area" | "pie" | "radar" | "radialBar";
  data: Array<Record<string, unknown>>;
  config: Record<
    string,
    {
      label?: string;
      color?: string;
    }
  >;
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
  legendPosition?: "top" | "bottom" | "left" | "right";
  aspectRatio?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  cx?: string | number;
  cy?: string | number;
  labelLine?: boolean;
  label?: boolean | string;
}
