import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const salaryRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  currency: z.string().optional(),
  period: z.enum(["yearly", "monthly", "hourly"]).optional(),
});

const jobListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  department: z.string(),
  location: z.string(),
  type: z.enum(["full-time", "part-time", "contract", "internship", "remote"]),
  salaryRange: salaryRangeSchema.optional(),
  description: z.string(),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  posted: z.union([z.string(), z.date()]),
  deadline: z.union([z.string(), z.date()]).optional(),
  featured: z.boolean().optional(),
  urgent: z.boolean().optional(),
  experienceLevel: z.enum(["entry", "mid", "senior", "lead"]).optional(),
  companyName: z.string().optional(),
  companyLogo: z.string().optional(),
  applyUrl: z.string().optional(),
});

export const jobListingsSchema = baseComponentSchema.extend({
  type: z.literal("JobListings"),
  jobs: z.array(jobListingSchema),
  variant: z.enum(["grid", "list", "featured", "departments", "minimal"]).optional(),
  columns: z.enum(["1", "2", "3", "4", "auto"]).optional(),
  gap: z.enum(["sm", "md", "lg", "xl"]).optional(),
  showFilters: z.boolean().optional(),
  showSearch: z.boolean().optional(),
  showDetailModal: z.boolean().optional(),
  showSalary: z.boolean().optional(),
  showRequirements: z.boolean().optional(),
  departments: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  animated: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  hoverEffect: z.enum(["none", "lift", "glow", "scale"]).optional(),
  alignment: z.enum(["left", "center", "right"]).optional(),
  maxDescriptionLength: z.number().optional(),
  onApply: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.any().optional(),
});

export type JobListingsProps = z.infer<typeof jobListingsSchema>;