/**
 * Base component schema for all UI components
 *
 * This schema provides common properties that all components share
 * in the Server-Driven UI architecture.
 */

import { z } from "zod";

/**
 * Base schema with properties common to all components
 */
export const baseComponentSchema = z.object({
  /**
   * Component type identifier
   */
  type: z.string(),

  /**
   * CSS class names to apply to the component
   */
  className: z.string().optional(),

  /**
   * Component ID
   */
  id: z.string().optional(),

  /**
   * Data attributes
   */
  dataAttributes: z.record(z.string(), z.string()).optional(),

  /**
   * ARIA attributes for accessibility
   */
  ariaAttributes: z.record(z.string(), z.string()).optional(),

  /**
   * Event handlers
   */
  events: z.record(z.string(), z.unknown()).optional(),

  /**
   * Element style object
   */
  style: z.record(z.string(), z.string()).optional(),

  /**
   * Test identifiers for testing
   */
  testId: z.string().optional(),
});

export type BaseComponentSchema = z.infer<typeof baseComponentSchema>;
