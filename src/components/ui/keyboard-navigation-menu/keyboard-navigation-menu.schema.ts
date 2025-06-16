import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// MenuItem interface for recursive type
interface MenuItem {
  id: string;
  label: string;
  icon?: unknown;
  shortcut?: string;
  disabled?: boolean;
  action?: string | (() => void);
  submenu?: MenuItem[];
}

// MenuItem schema - recursive for submenus
const menuItemSchema: z.ZodType<MenuItem> = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string(),
    icon: z.any().optional(),
    shortcut: z.string().optional(),
    disabled: z.boolean().optional(),
    action: z.union([z.string(), z.function()]).optional(),
    submenu: z.array(menuItemSchema).optional(),
  })
);

export const keyboardNavigationMenuSchema = baseComponentSchema.extend({
  type: z.literal("KeyboardNavigationMenu"),
  items: z.array(menuItemSchema),
  onSelect: z.union([z.string(), z.function()]).optional(),
  showShortcuts: z.boolean().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  role: z.enum(["menu", "navigation"]).optional(),
});

export type KeyboardNavigationMenuProps = z.infer<typeof keyboardNavigationMenuSchema>;
export type { MenuItem };