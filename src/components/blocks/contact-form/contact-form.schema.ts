import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const officeInfoSchema = z.object({
  name: z.string().optional(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  hours: z.string().optional(),
  mapUrl: z.string().optional(),
});

const contactFormDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  preferredContact: z.enum(["email", "phone"]).optional(),
  attachment: z.any().optional(),
});

export const contactFormSchema = baseComponentSchema
  .extend({
    type: z.literal("ContactForm"),
    variant: z
      .enum(["simple", "detailed", "with-map", "split-screen", "minimal"])
      .optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    officeInfo: officeInfoSchema.optional(),
    subjects: z.array(z.string()).optional(),
    showFileUpload: z.boolean().optional(),
    showPhone: z.boolean().optional(),
    showCompany: z.boolean().optional(),
    showPreferredContact: z.boolean().optional(),
    submitText: z.string().optional(),
    onFormSubmit: z.function().optional(),
    recaptchaSiteKey: z.string().optional(),
    successMessage: z.string().optional(),
    errorMessage: z.string().optional(),
    backgroundImage: z.string().optional(),
    animated: z.boolean().optional(),
  })
  .describe("Contact form component with multiple layout variants and customizable fields");

export type ContactFormSchema = z.infer<typeof contactFormSchema>;