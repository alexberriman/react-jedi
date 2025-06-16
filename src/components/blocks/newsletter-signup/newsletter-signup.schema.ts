import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Benefit schema
const benefitSchema = z.object({
  text: z.string(),
  icon: z.any().optional(), // React node
});

// Incentive schema
const incentiveSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.any().optional(), // React node
});

// Main newsletter signup schema
export const newsletterSignupSchema = baseComponentSchema.extend({
  type: z.literal("newsletter-signup"),
  
  // Layout variant
  variant: z.enum(["inline", "modal", "slide-in", "footer-bar", "with-incentive"]).optional(),
  
  // Content
  title: z.string().optional(),
  description: z.string().optional(),
  benefits: z.array(benefitSchema).optional(),
  incentive: incentiveSchema.optional(),
  
  // Form fields
  emailPlaceholder: z.string().optional(),
  showNameField: z.boolean().optional(),
  namePlaceholder: z.string().optional(),
  showGdprCheckbox: z.boolean().optional(),
  gdprText: z.string().optional(),
  privacyPolicyUrl: z.string().optional(),
  submitButtonText: z.string().optional(),
  
  // Success state
  successTitle: z.string().optional(),
  successMessage: z.string().optional(),
  
  // Background styling
  backgroundImage: z.string().optional(),
  backgroundPattern: z.enum(["dots", "grid", "waves", "gradient", "none"]).optional(),
  
  // Positioning (for slide-in variant)
  position: z.enum(["bottom-right", "bottom-left", "top-right", "top-left", "center"]).optional(),
  
  // Behavior
  delay: z.number().optional(),
  showOnExitIntent: z.boolean().optional(),
  animated: z.boolean().optional(),
});

export type NewsletterSignupProps = z.infer<typeof newsletterSignupSchema>;