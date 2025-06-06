import { z } from "zod";

/**
 * Schema for Flex component specifications.
 * This defines the JSON structure for a flex layout component with various alignment options.
 */
export const flexSchema = z.object({
  type: z.literal("flex"),
  direction: z.enum(["row", "column", "row-reverse", "column-reverse"]).optional(),
  wrap: z.enum(["nowrap", "wrap", "wrap-reverse"]).optional(),
  justify: z.enum(["start", "end", "center", "space-between", "space-around", "space-evenly"]).optional(),
  align: z.enum(["start", "end", "center", "baseline", "stretch"]).optional(),
  gap: z.enum(["none", "xs", "sm", "md", "lg", "xl"]).optional(),
  className: z.string().optional(),
  children: z.array(z.any()).optional(),
  id: z.string().optional(),
  style: z.record(z.string(), z.string()).optional(),
  data: z.record(z.string(), z.string()).optional(),
  testId: z.string().optional(),
  onClick: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
});

export type FlexSpecification = z.infer<typeof flexSchema>;

/**
 * Example flex specification:
 *
 * ```json
 * {
 *   "type": "flex",
 *   "direction": "row",
 *   "wrap": "wrap",
 *   "justify": "space-between",
 *   "align": "center",
 *   "gap": "md",
 *   "className": "p-4 bg-muted/30 rounded-lg",
 *   "children": [
 *     {
 *       "type": "text",
 *       "text": "Left aligned content"
 *     },
 *     {
 *       "type": "button",
 *       "text": "Action",
 *       "variant": "primary"
 *     }
 *   ]
 * }
 * ```
 */

export default flexSchema;
