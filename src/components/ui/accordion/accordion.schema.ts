import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

/**
 * Schema for the Accordion component
 */
export const accordionSchema = baseComponentSchema.extend({
  type: z.literal("Accordion"),
  
  /**
   * Type of accordion - determines if single or multiple items can be expanded
   * Note: Using 'accordionType' instead of 'type' to avoid conflict with base schema
   */
  accordionType: z.enum(["single", "multiple"]),
  
  /**
   * When type is 'single', determines if the item can be collapsed
   * Only applicable when accordionType is 'single'
   */
  collapsible: z.boolean().optional(),
  
  /**
   * The default expanded item(s)
   * - For 'single' type: string value
   * - For 'multiple' type: array of string values
   */
  defaultValue: z.union([
    z.string(),
    z.array(z.string())
  ]).optional(),
  
  /**
   * Whether the entire accordion is disabled
   */
  disabled: z.boolean().optional(),
  
  /**
   * Enable or disable animations
   */
  animated: z.boolean().optional(),
  
  /**
   * Child components (AccordionItem components)
   */
  children: z.array(z.any()).optional()
});

/**
 * Schema for AccordionItem component
 */
export const accordionItemSchema = baseComponentSchema.extend({
  type: z.literal("AccordionItem"),
  
  /**
   * Unique value for the item
   */
  value: z.string(),
  
  /**
   * Whether this specific item is disabled
   */
  disabled: z.boolean().optional(),
  
  /**
   * Child components (AccordionTrigger and AccordionContent)
   */
  children: z.array(z.any()).optional()
});

/**
 * Schema for AccordionTrigger component
 */
export const accordionTriggerSchema = baseComponentSchema.extend({
  type: z.literal("AccordionTrigger"),
  
  /**
   * Content to display in the trigger
   */
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional()
});

/**
 * Schema for AccordionContent component
 */
export const accordionContentSchema = baseComponentSchema.extend({
  type: z.literal("AccordionContent"),
  
  /**
   * Content to display when expanded
   */
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional()
});

export type AccordionProps = z.infer<typeof accordionSchema>;
export type AccordionItemProps = z.infer<typeof accordionItemSchema>;
export type AccordionTriggerProps = z.infer<typeof accordionTriggerSchema>;
export type AccordionContentProps = z.infer<typeof accordionContentSchema>;