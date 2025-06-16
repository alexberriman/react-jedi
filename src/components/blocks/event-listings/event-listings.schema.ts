import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const eventSpeakerSchema = z.object({
  name: z.string(),
  title: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
});

const eventLocationSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  virtual: z.boolean().optional(),
  mapUrl: z.string().optional(),
});

const eventPriceSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  free: z.boolean().optional(),
});

const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: eventLocationSchema,
  speakers: z.array(eventSpeakerSchema).optional(),
  category: z.string(),
  registrationUrl: z.string().optional(),
  capacity: z.number().optional(),
  registeredCount: z.number().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  price: eventPriceSchema.optional(),
  image: z.string().optional(),
  status: z.enum(["upcoming", "ongoing", "past", "cancelled"]).optional(),
});

export const eventListingsSchema = baseComponentSchema
  .extend({
    type: z.literal("EventListings"),
    events: z.array(eventSchema).optional(),
    variant: z
      .enum(["cards", "calendar", "featured", "timeline", "grid"])
      .optional(),
    showSearch: z.boolean().optional(),
    showFilters: z.boolean().optional(),
    showPagination: z.boolean().optional(),
    itemsPerPage: z.number().optional(),
    showCountdown: z.boolean().optional(),
    showCapacity: z.boolean().optional(),
    animated: z.boolean().optional(),
    onEventClick: z.function().optional(),
    onRegister: z.function().optional(),
  })
  .describe("Event listings component for displaying and managing events with multiple layout options");

export type EventListingsSchema = z.infer<typeof eventListingsSchema>;