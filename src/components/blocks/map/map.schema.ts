import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Map position schema
const mapPositionSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// Map marker schema
const mapMarkerSchema = z.object({
  id: z.string(),
  position: mapPositionSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.enum(["default", "business", "restaurant", "hotel", "shopping", "custom"]).optional(),
  customIcon: z.string().optional(),
  infoWindow: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    actions: z.array(z.object({
      label: z.string(),
      href: z.string().optional(),
      onClick: z.any().optional(),
    })).optional(),
  }).optional(),
});

// Map location schema
const mapLocationSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  hours: z.string().optional(),
  description: z.string().optional(),
  position: mapPositionSchema,
  category: z.string().optional(),
});

// Contact info schema
const contactInfoSchema = z.object({
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  hours: z.string().optional(),
});

// Main map schema
export const mapSchema = baseComponentSchema.extend({
  type: z.literal("map"),
  
  // Layout and display
  variant: z.enum(["embedded", "fullscreen", "with-sidebar", "minimal", "multi-location"]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  
  // Map configuration
  center: mapPositionSchema.optional(),
  zoom: z.number().optional(),
  mapStyle: z.enum(["flat", "streets", "outdoors", "satellite", "custom"]).optional(),
  
  // Markers and locations
  markers: z.array(mapMarkerSchema).optional(),
  locations: z.array(mapLocationSchema).optional(),
  
  // Controls
  showSearch: z.boolean().optional(),
  showZoomControls: z.boolean().optional(),
  showMapTypeControls: z.boolean().optional(),
  showFullscreenButton: z.boolean().optional(),
  enableScrollZoom: z.boolean().optional(),
  enableDragging: z.boolean().optional(),
  
  // Content
  title: z.string().optional(),
  description: z.string().optional(),
  contactInfo: contactInfoSchema.optional(),
  
  // Other
  directionsBaseUrl: z.string().optional(),
  animated: z.boolean().optional(),
});

export type MapProps = z.infer<typeof mapSchema>;