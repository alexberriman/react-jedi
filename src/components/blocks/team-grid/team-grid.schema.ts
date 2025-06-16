import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const socialLinkSchema = z.object({
  platform: z.enum(["linkedin", "twitter", "email", "phone", "custom"]),
  url: z.string(),
  icon: z.any().optional(),
  label: z.string().optional(),
});

const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  role: z.string(),
  department: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
  location: z.string().optional(),
  joinDate: z.string().optional(),
  skills: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
});

export const teamGridSchema = baseComponentSchema.extend({
  type: z.literal("TeamGrid"),
  members: z.array(teamMemberSchema),
  variant: z.enum(["grid", "list", "minimal", "cards", "org-chart"]).optional(),
  columns: z.enum(["1", "2", "3", "4", "5", "6", "auto"]).optional(),
  gap: z.enum(["sm", "md", "lg", "xl"]).optional(),
  showDepartmentFilter: z.boolean().optional(),
  showSearch: z.boolean().optional(),
  showModal: z.boolean().optional(),
  showSocialLinks: z.boolean().optional(),
  showContactInfo: z.boolean().optional(),
  departments: z.array(z.string()).optional(),
  animated: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  hoverEffect: z.enum(["none", "lift", "glow", "scale", "tilt"]).optional(),
  avatarSize: z.enum(["sm", "md", "lg", "xl"]).optional(),
  alignment: z.enum(["left", "center", "right"]).optional(),
  showBio: z.boolean().optional(),
  maxBioLength: z.number().optional(),
  children: z.any().optional(),
});

export type TeamGridProps = z.infer<typeof teamGridSchema>;