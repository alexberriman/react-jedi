import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const nutritionalInfoSchema = z.object({
  calories: z.number().optional(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fat: z.number().optional(),
  fiber: z.number().optional(),
  sugar: z.number().optional(),
  sodium: z.number().optional(),
});

const dietaryRestrictionSchema = z.enum([
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'nut-free',
  'halal',
  'kosher',
  'pescatarian'
]);

const allergenSchema = z.enum([
  'milk',
  'eggs',
  'fish',
  'shellfish',
  'tree-nuts',
  'peanuts',
  'wheat',
  'soybeans',
  'sesame'
]);

const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  salePrice: z.number().optional(),
  category: z.string().optional(),
  images: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  dietaryRestrictions: z.array(dietaryRestrictionSchema).optional(),
  allergens: z.array(allergenSchema).optional(),
  nutritionalInfo: nutritionalInfoSchema.optional(),
  isPopular: z.boolean().optional(),
  isNew: z.boolean().optional(),
  spiceLevel: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]).optional(),
  prepTime: z.number().optional(),
});

const menuCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  items: z.array(menuItemSchema),
  image: z.string().optional(),
  availableTime: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }).optional(),
});

export const restaurantMenuSchema = baseComponentSchema.extend({
  type: z.literal("RestaurantMenu"),
  categories: z.array(menuCategorySchema),
  layout: z.enum(['categorized', 'single-column', 'two-column', 'grid-cards', 'prix-fixe']).optional(),
  showSearch: z.boolean().optional(),
  showFilters: z.boolean().optional(),
  showImages: z.boolean().optional(),
  showNutrition: z.boolean().optional(),
  showIngredients: z.boolean().optional(),
  currency: z.string().optional(),
  locale: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  onItemSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  searchPlaceholder: z.string().optional(),
  showPrepTime: z.boolean().optional(),
  showSpiceLevel: z.boolean().optional(),
  compactMode: z.boolean().optional(),
  maxColumns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.string().optional(),
  spacing: z.string().optional(),
});

export type RestaurantMenuProps = z.infer<typeof restaurantMenuSchema>;