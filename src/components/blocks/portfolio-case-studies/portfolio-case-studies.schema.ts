import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const projectStatsSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.any().optional(),
});

const testimonialSchema = z.object({
  content: z.string(),
  author: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
});

const beforeAfterImagesSchema = z.object({
  before: z.string(),
  after: z.string(),
});

const caseStudySchema = z.object({
  id: z.string(),
  title: z.string(),
  client: z.string(),
  description: z.string(),
  longDescription: z.string().optional(),
  category: z.string(),
  technologies: z.array(z.string()),
  projectUrl: z.string().optional(),
  featuredImage: z.string(),
  galleryImages: z.array(z.string()).optional(),
  beforeAfterImages: beforeAfterImagesSchema.optional(),
  completedDate: z.string(),
  duration: z.string().optional(),
  results: z.array(projectStatsSchema).optional(),
  testimonial: testimonialSchema.optional(),
  isFeatured: z.boolean().optional(),
  slug: z.string(),
});

const sortOptionSchema = z.object({
  label: z.string(),
  value: z.enum(['date-desc', 'date-asc', 'featured']),
});

export const portfolioCaseStudiesSchema = baseComponentSchema.extend({
  type: z.literal("PortfolioCaseStudies"),
  projects: z.array(caseStudySchema),
  variant: z.enum(['grid', 'detailed-cards', 'before-after', 'client-spotlight', 'timeline']).optional(),
  showFilters: z.boolean().optional(),
  showSearch: z.boolean().optional(),
  showPagination: z.boolean().optional(),
  showLoadMore: z.boolean().optional(),
  projectsPerPage: z.number().optional(),
  sortOptions: z.array(sortOptionSchema).optional(),
  categories: z.array(z.string()).optional(),
  onLoadMore: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onViewDetails: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  loading: z.boolean().optional(),
  featuredProjectIds: z.array(z.string()).optional(),
  enableLightbox: z.boolean().optional(),
});

export type PortfolioCaseStudiesProps = z.infer<typeof portfolioCaseStudiesSchema>;