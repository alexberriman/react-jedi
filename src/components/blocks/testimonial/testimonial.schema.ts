import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Testimonial author schema
const testimonialAuthorSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
  companyLogo: z.string().optional(),
});

// Testimonial source schema
const testimonialSourceSchema = z.object({
  platform: z.string().optional(),
  url: z.string().optional(),
});

// Individual testimonial data schema
const testimonialDataSchema = z.object({
  id: z.string().optional(),
  author: testimonialAuthorSchema,
  content: z.string(),
  rating: z.number().min(1).max(5).optional(),
  date: z.string().optional(),
  videoUrl: z.string().optional(),
  featured: z.boolean().optional(),
  source: testimonialSourceSchema.optional(),
});

// Main testimonial schema
export const testimonialSchema = baseComponentSchema.extend({
  type: z.literal("Testimonial"),
  testimonials: z.union([testimonialDataSchema, z.array(testimonialDataSchema)]).optional(),
  variant: z.enum(["single", "carousel", "grid", "masonry", "minimal", "video"]).optional(),
  layout: z.enum(["card", "quote", "large", "compact", "minimal"]).optional(),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  autoplay: z.boolean().optional(),
  autoplayInterval: z.number().optional(),
  showNavigation: z.boolean().optional(),
  showDots: z.boolean().optional(),
  animated: z.boolean().optional(),
});

export type TestimonialProps = z.infer<typeof testimonialSchema>;