import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const authorSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
});

export const testimonialSchema = baseComponentSchema.extend({
  type: z.literal("Testimonial"),
  author: authorSchema,
  content: z.string(),
  rating: z.number().min(0).max(5).optional(),
  date: z.string().optional(),
  variant: z.enum(["card", "minimal", "large", "quote"]).optional(),
  highlight: z.boolean().optional(),
});

export type TestimonialProps = z.infer<typeof testimonialSchema>;