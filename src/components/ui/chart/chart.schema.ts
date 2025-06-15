import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Chart configuration schema
const chartConfigSchema = z.record(
  z.string(),
  z.object({
    label: z.string().optional(),
    color: z.string().optional(),
  })
);

export const chartSchema = baseComponentSchema.extend({
  type: z.literal("Chart"),
  
  // Required fields
  chartType: z.enum(["line", "bar", "area", "pie", "radar", "radialBar"]),
  data: z.array(z.record(z.string(), z.unknown())),
  config: chartConfigSchema,
  
  // Data configuration
  dataKey: z.string().optional(),
  dataKeys: z.array(z.string()).optional(),
  xAxisDataKey: z.string().optional(),
  yAxisDomain: z.tuple([
    z.union([z.number(), z.literal("auto")]),
    z.union([z.number(), z.literal("auto")])
  ]).optional(),
  
  // Dimensions
  width: z.union([z.number(), z.string()]).optional(),
  height: z.union([z.number(), z.string()]).optional(),
  margin: z.object({
    top: z.number().optional(),
    right: z.number().optional(),
    bottom: z.number().optional(),
    left: z.number().optional(),
  }).optional(),
  
  // Display options
  showGrid: z.boolean().optional(),
  showXAxis: z.boolean().optional(),
  showYAxis: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  showLegend: z.boolean().optional(),
  legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
  
  // Styling
  colors: z.array(z.string()).optional(),
  fillOpacity: z.number().optional(),
  strokeWidth: z.number().optional(),
  stackId: z.string().optional(),
  
  // Animation
  animationDuration: z.number().optional(),
  animationEasing: z.enum(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]).optional(),
  
  // Pie/RadialBar specific
  aspectRatio: z.number().optional(),
  innerRadius: z.number().optional(),
  outerRadius: z.number().optional(),
  startAngle: z.number().optional(),
  endAngle: z.number().optional(),
  cx: z.union([z.string(), z.number()]).optional(),
  cy: z.union([z.string(), z.number()]).optional(),
  labelLine: z.boolean().optional(),
  label: z.union([z.boolean(), z.string()]).optional(),
});

export type ChartSchema = z.infer<typeof chartSchema>;