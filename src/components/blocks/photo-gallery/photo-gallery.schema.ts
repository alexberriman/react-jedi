import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const photoItemSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  tags: z.array(z.string()).optional(),
  watermark: z.string().optional(),
  downloadUrl: z.string().optional(),
});

export const photoGallerySchema = baseComponentSchema.extend({
  type: z.literal("PhotoGallery"),
  photos: z.array(photoItemSchema),
  variant: z.enum(["masonry", "grid", "carousel", "lightbox", "instagram"]).optional(),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]).optional(),
  enableLightbox: z.boolean().optional(),
  enableFiltering: z.boolean().optional(),
  enableSearch: z.boolean().optional(),
  enableLazyLoading: z.boolean().optional(),
  enableZoom: z.boolean().optional(),
  enableDownload: z.boolean().optional(),
  enableSharing: z.boolean().optional(),
  animated: z.boolean().optional(),
  autoplay: z.boolean().optional(),
  aspectRatio: z.enum(["square", "landscape", "portrait", "auto"]).optional(),
  gap: z.enum(["sm", "md", "lg"]).optional(),
  onPhotoClick: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onDownload: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onShare: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type PhotoGalleryProps = z.infer<typeof photoGallerySchema>;