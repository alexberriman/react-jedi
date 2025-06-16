import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const autoplaySchema = z.object({
  enabled: z.boolean().optional(),
  delay: z.number().optional(),
  stopOnInteraction: z.boolean().optional(),
  stopOnMouseEnter: z.boolean().optional(),
});

export const carouselSchema = baseComponentSchema
  .extend({
    type: z.literal("Carousel"),
    opts: z.any().optional(), // Embla carousel options
    plugins: z.array(z.any()).optional(), // Embla carousel plugins
    orientation: z.enum(["horizontal", "vertical"]).optional(),
    setApi: z.function().optional(),
    autoplay: autoplaySchema.optional(),
    showDots: z.boolean().optional(),
    showThumbnails: z.boolean().optional(),
    thumbnails: z.array(z.string()).optional(),
    variant: z
      .enum(["default", "gallery", "content", "testimonials", "showcase", "fullscreen"])
      .optional(),
    animated: z.boolean().optional(),
    children: z.any().optional(), // React.ReactNode
  })
  .describe("Carousel component for cycling through content");

export type CarouselSchema = z.infer<typeof carouselSchema>;