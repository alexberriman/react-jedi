import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const productVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  available: z.boolean().optional(),
  priceModifier: z.number().optional(),
});

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number().optional(),
  currency: z.string().optional(),
  images: z.array(z.string()),
  category: z.string(),
  inStock: z.boolean().optional(),
  stockLevel: z.number().optional(),
  featured: z.boolean().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  badges: z.array(z.string()).optional(),
  variants: z.array(productVariantSchema).optional(),
  specs: z.record(z.string(), z.string()).optional(),
  tags: z.array(z.string()).optional(),
  sku: z.string().optional(),
});

export const productShowcaseSchema = baseComponentSchema.extend({
  type: z.literal("ProductShowcase"),
  variant: z.enum(['grid', 'list', 'featured', 'comparison', 'category']).optional(),
  products: z.array(productSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  animated: z.boolean().optional(),
  showWishlist: z.boolean().optional(),
  showQuickAdd: z.boolean().optional(),
  showFilters: z.boolean().optional(),
  showRatings: z.boolean().optional(),
  onAddToCart: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onToggleWishlist: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onProductClick: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  categories: z.array(z.string()).optional(),
  filterLabel: z.string().optional(),
  allCategoriesLabel: z.string().optional(),
  addToCartLabel: z.string().optional(),
  quickAddLabel: z.string().optional(),
  outOfStockLabel: z.string().optional(),
  saleLabel: z.string().optional(),
  compareLabel: z.string().optional(),
  featuredTitle: z.string().optional(),
  featuredDescription: z.string().optional(),
});

export type ProductShowcaseProps = z.infer<typeof productShowcaseSchema>;