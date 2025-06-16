import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const businessHoursSchema = z.object({
  day: z.string(),
  openTime: z.string(),
  closeTime: z.string(),
  closed: z.boolean().optional(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string().optional(),
});

const contactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().optional(),
  address: addressSchema,
  website: z.string().optional(),
});

const mapConfigSchema = z.object({
  enabled: z.boolean(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  zoom: z.number().optional(),
  showDirectionsLink: z.boolean().optional(),
});

const specialScheduleSchema = z.object({
  date: z.string(),
  name: z.string(),
  hours: businessHoursSchema.optional(),
  closed: z.boolean().optional(),
  message: z.string().optional(),
});

const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  businessHours: z.array(businessHoursSchema),
  specialSchedules: z.array(specialScheduleSchema).optional(),
  contact: contactSchema,
  services: z.array(z.string()).optional(),
  timezone: z.string().optional(),
  map: mapConfigSchema.optional(),
  appointmentBookingUrl: z.string().optional(),
});

const statusMessagesSchema = z.object({
  open: z.string().optional(),
  closed: z.string().optional(),
  openingSoon: z.string().optional(),
  closingSoon: z.string().optional(),
});

export const locationHoursSchema = baseComponentSchema.extend({
  type: z.literal("LocationHours"),
  variant: z.enum([
    'single-location',
    'multiple-locations',
    'minimal-hours',
    'detailed-info-cards',
    'map-integration'
  ]).optional(),
  locations: z.array(locationSchema),
  showCurrentStatus: z.boolean().optional(),
  showSpecialSchedules: z.boolean().optional(),
  showContactInfo: z.boolean().optional(),
  showServices: z.boolean().optional(),
  showAppointmentBooking: z.boolean().optional(),
  allowLocationSearch: z.boolean().optional(),
  allowLocationFilter: z.boolean().optional(),
  maxLocationsToShow: z.number().optional(),
  defaultTimezone: z.string().optional(),
  showMap: z.boolean().optional(),
  compactView: z.boolean().optional(),
  darkMode: z.boolean().optional(),
  statusMessages: statusMessagesSchema.optional(),
});

export type LocationHoursProps = z.infer<typeof locationHoursSchema>;