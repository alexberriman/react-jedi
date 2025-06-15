import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Schema for the Calendar component
 */
export const calendarSchema = baseComponentSchema.extend({
  type: z.literal("Calendar"),
  
  /**
   * The selection mode for the calendar
   */
  mode: z.enum(["single", "multiple", "range"]).optional().default("single"),
  
  /**
   * Selected date(s) based on mode:
   * - single: Date | undefined
   * - multiple: Date[] | undefined  
   * - range: { from: Date | undefined, to: Date | undefined } | undefined
   */
  selected: z.union([
    z.string(), // ISO string for single date
    z.array(z.string()), // Array of ISO strings for multiple dates
    z.object({
      from: z.string().optional(),
      to: z.string().optional()
    }) // Date range object
  ]).optional(),
  
  /**
   * Callback when date selection changes
   */
  onSelect: z.union([
    z.function(),
    z.string() // String reference for JSON spec
  ]).optional(),
  
  /**
   * Whether to show days outside the current month
   */
  showOutsideDays: z.boolean().optional().default(true),
  
  /**
   * Display fixed weeks to avoid layout shifts
   */
  fixedWeeks: z.boolean().optional().default(false),
  
  /**
   * The number of months to display
   */
  numberOfMonths: z.number().min(1).max(12).optional().default(1),
  
  /**
   * Whether the calendar should have focus when mounted
   */
  initialFocus: z.boolean().optional().default(false),
  
  /**
   * Default month to display (ISO string)
   */
  defaultMonth: z.string().optional(),
  
  /**
   * Controlled month to display (ISO string)
   */
  month: z.string().optional(),
  
  /**
   * Callback when month changes
   */
  onMonthChange: z.union([
    z.function(),
    z.string()
  ]).optional(),
  
  /**
   * Disabled dates - can be:
   * - Function that returns boolean
   * - Array of dates
   * - "weekends" for disabling weekends
   */
  disabled: z.union([
    z.function(),
    z.array(z.string()), // Array of ISO strings
    z.literal("weekends")
  ]).optional(),
  
  /**
   * Minimum selectable date (ISO string)
   */
  fromDate: z.string().optional(),
  
  /**
   * Maximum selectable date (ISO string)
   */
  toDate: z.string().optional(),
  
  /**
   * Minimum selectable year
   */
  fromYear: z.number().optional(),
  
  /**
   * Maximum selectable year
   */
  toYear: z.number().optional(),
  
  /**
   * Custom class names for calendar parts
   */
  classNames: z.object({
    months: z.string().optional(),
    month: z.string().optional(),
    caption: z.string().optional(),
    caption_label: z.string().optional(),
    nav: z.string().optional(),
    nav_button: z.string().optional(),
    nav_button_previous: z.string().optional(),
    nav_button_next: z.string().optional(),
    table: z.string().optional(),
    head_row: z.string().optional(),
    head_cell: z.string().optional(),
    row: z.string().optional(),
    cell: z.string().optional(),
    day: z.string().optional(),
    day_range_start: z.string().optional(),
    day_range_end: z.string().optional(),
    day_selected: z.string().optional(),
    day_today: z.string().optional(),
    day_outside: z.string().optional(),
    day_disabled: z.string().optional(),
    day_range_middle: z.string().optional(),
    day_hidden: z.string().optional()
  }).optional()
});

export type CalendarProps = z.infer<typeof calendarSchema>;