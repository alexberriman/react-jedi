/**
 * Image Component Schema
 *
 * This schema defines the specification for the Image component in the Server-Driven UI system.
 * It provides type definitions and validation rules for creating Image components through JSON.
 */

import { z } from "zod";

/**
 * Base Image Schema
 *
 * Defines the core properties required for an Image component.
 */
export const imageSchema = z.object({
  /**
   * The component type identifier.
   */
  type: z.literal("Image"),

  /**
   * The source URL of the image.
   */
  src: z.string().url(),

  /**
   * Alternative text for the image for accessibility.
   */
  alt: z.string().optional(),

  /**
   * How the image should be fitted inside its container.
   */
  objectFit: z.enum(["contain", "cover", "fill", "none", "scaleDown"]).optional(),

  /**
   * Border radius of the image.
   */
  rounded: z.enum(["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"]).optional(),

  /**
   * Shadow size around the image.
   */
  shadow: z.enum(["none", "sm", "md", "lg", "xl"]).optional(),

  /**
   * Visual filter to apply to the image.
   */
  filter: z.enum(["none", "grayscale", "sepia", "blur", "invert"]).optional(),

  /**
   * Effect to apply on hover.
   */
  hover: z.enum(["none", "grow", "shrink", "rotate", "shine", "glow", "pulse"]).optional(),

  /**
   * Loading behavior of the image.
   */
  loading: z.enum(["eager", "lazy"]).optional(),

  /**
   * Fallback image URL if the main image fails to load.
   */
  fallback: z.string().url().optional(),

  /**
   * Aspect ratio of the image container (e.g., '16/9', '1/1').
   */
  aspectRatio: z.string().optional(),

  /**
   * Width of the image container.
   */
  width: z.union([z.string(), z.number()]).optional(),

  /**
   * Height of the image container.
   */
  height: z.union([z.string(), z.number()]).optional(),

  /**
   * Custom CSS class names.
   */
  className: z.string().optional(),
});

/**
 * Image Component Type
 *
 * Type definition for Image component based on the schema.
 */
export type ImageSpec = z.infer<typeof imageSchema>;

/**
 * Example Image Specifications
 *
 * These examples demonstrate how to create Image components using JSON.
 */
export const imageExamples = {
  basic: {
    type: "Image",
    src: "https://example.com/image.jpg",
    alt: "Example image",
    aspectRatio: "16/9",
    width: "400px",
  },

  withStyles: {
    type: "Image",
    src: "https://example.com/profile.jpg",
    alt: "Profile picture",
    rounded: "full",
    shadow: "md",
    aspectRatio: "1/1",
    width: "200px",
    objectFit: "cover",
  },

  withEffects: {
    type: "Image",
    src: "https://example.com/feature.jpg",
    alt: "Feature image",
    filter: "grayscale",
    hover: "grow",
    rounded: "lg",
    shadow: "xl",
    width: "100%",
    aspectRatio: "21/9",
  },

  withFallback: {
    type: "Image",
    src: "https://example.com/main-image.jpg",
    fallback: "https://example.com/fallback-image.jpg",
    alt: "Main image with fallback",
    rounded: "md",
    shadow: "sm",
    width: "300px",
    height: "200px",
  },
} as const;
