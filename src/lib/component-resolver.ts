import * as React from "react";
import type { ComponentResolver, ComponentProps } from "@/types/schema/components";
import * as UI from "@/components/ui";

// Type definition for components in our registry
type ComponentType = React.ComponentType<ComponentProps>;

// Helper function to safely cast components to accept our standard ComponentProps
// Special handling for certain components that have required props
const asComponent = <T extends React.ComponentType<Record<string, unknown>>>(
  component: T,
  defaultProps?: Partial<Record<string, unknown>>
): ComponentType => {
  if (defaultProps) {
    return ((props: ComponentProps) => {
      const componentElement = React.createElement(component, { ...defaultProps, ...props });
      return componentElement;
    }) as ComponentType;
  }
  return component as unknown as ComponentType;
};

/**
 * Default component registry for the core UI components
 *
 * This registry maps component type strings to their React implementations.
 * It provides a centralized place to register all available components.
 * All components are adapted to accept our standard ComponentProps interface.
 */
export const defaultComponentRegistry: Record<string, ComponentType> = {
  // Layout Components
  Box: asComponent(UI.Box),
  Container: asComponent(UI.Container),
  Grid: asComponent(UI.Grid),
  Flex: asComponent(UI.Flex),
  AspectRatio: asComponent(UI.AspectRatio),
  Separator: asComponent(UI.Separator),
  Stack: asComponent(UI.Stack),
  Group: asComponent(UI.Group),
  Center: asComponent(UI.Center),
  Spacer: asComponent(UI.Spacer),
  SimpleGrid: asComponent(UI.SimpleGrid),
  Masonry: asComponent(UI.Masonry),
  ScrollArea: asComponent(UI.ScrollArea),

  // Typography Components
  Text: asComponent(UI.Text),
  Heading: asComponent(UI.Heading),
  BlockQuote: asComponent(UI.BlockQuote),

  // UI Components
  Button: asComponent(UI.Button),
  Card: asComponent(UI.Card),
  Badge: asComponent(UI.Badge),
  Avatar: asComponent(UI.Avatar),
  Image: asComponent(UI.Image),
  Skeleton: asComponent(UI.Skeleton),
  Label: asComponent(UI.Label),
  Input: asComponent(UI.Input),
  Toggle: asComponent(UI.Toggle),
  ToggleGroup: asComponent(
    UI.ToggleGroup as unknown as React.ComponentType<Record<string, unknown>>
  ),
  ToggleGroupItem: asComponent(
    UI.ToggleGroupItem as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Textarea: asComponent(UI.TextareaComponent),
  Checkbox: asComponent(UI.Checkbox),
  RadioGroup: asComponent(UI.RadioGroup),
  RadioGroupItem: asComponent(
    UI.RadioGroupItem as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Select: asComponent(UI.Select),
  SelectContent: asComponent(UI.SelectContent),
  SelectGroup: asComponent(UI.SelectGroup),
  SelectItem: asComponent(UI.SelectItem as unknown as React.ComponentType<Record<string, unknown>>),
  SelectLabel: asComponent(UI.SelectLabel),
  SelectScrollDownButton: asComponent(UI.SelectScrollDownButton),
  SelectScrollUpButton: asComponent(UI.SelectScrollUpButton),
  SelectSeparator: asComponent(UI.SelectSeparator),
  SelectTrigger: asComponent(UI.SelectTrigger),
  SelectValue: asComponent(UI.SelectValue),
  Switch: asComponent(UI.Switch),
  Slider: asComponent(UI.Slider),
  Collapsible: asComponent(UI.Collapsible),
  CollapsibleContent: asComponent(UI.CollapsibleContent),
  CollapsibleTrigger: asComponent(UI.CollapsibleTrigger),
  ResizablePanelGroup: asComponent(
    UI.ResizablePanelGroup as unknown as React.ComponentType<Record<string, unknown>>
  ),
  ResizablePanel: asComponent(UI.ResizablePanel),
  ResizableHandle: asComponent(UI.ResizableHandle),
  Sheet: asComponent(UI.Sheet),
  SheetTrigger: asComponent(UI.SheetTrigger),
  SheetClose: asComponent(UI.SheetClose),
  SheetContent: asComponent(UI.SheetContent),
  SheetHeader: asComponent(UI.SheetHeader),
  SheetFooter: asComponent(UI.SheetFooter),
  SheetTitle: asComponent(UI.SheetTitle),
  SheetDescription: asComponent(UI.SheetDescription),
  Tabs: asComponent(UI.Tabs),
  TabsList: asComponent(UI.TabsList),
  TabsTrigger: asComponent(
    UI.TabsTrigger as unknown as React.ComponentType<Record<string, unknown>>
  ),
  TabsContent: asComponent(
    UI.TabsContent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Accordion: asComponent(UI.Accordion as unknown as React.ComponentType<Record<string, unknown>>),
  AccordionItem: asComponent(
    UI.AccordionItem as unknown as React.ComponentType<Record<string, unknown>>
  ),
  AccordionTrigger: asComponent(UI.AccordionTrigger),
  AccordionContent: asComponent(UI.AccordionContent),
  Dialog: asComponent(UI.Dialog),
  DialogTrigger: asComponent(
    UI.DialogTrigger as unknown as React.ComponentType<Record<string, unknown>>
  ),
  DialogContent: asComponent(
    UI.DialogContent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  DialogHeader: asComponent(UI.DialogHeader),
  DialogFooter: asComponent(UI.DialogFooter),
  DialogTitle: asComponent(UI.DialogTitle),
  DialogDescription: asComponent(UI.DialogDescription),
  DialogClose: asComponent(
    UI.DialogClose as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Drawer: asComponent(UI.Drawer),
  DrawerTrigger: asComponent(UI.DrawerTrigger),
  DrawerContent: asComponent(UI.DrawerContent),
  DrawerHeader: asComponent(UI.DrawerHeader),
  DrawerFooter: asComponent(UI.DrawerFooter),
  DrawerTitle: asComponent(UI.DrawerTitle),
  DrawerDescription: asComponent(UI.DrawerDescription),
  DrawerClose: asComponent(UI.DrawerClose),
  DrawerSection: asComponent(UI.DrawerSection),
  DrawerHandle: asComponent(UI.DrawerHandle),
  dropdownMenu: asComponent(
    UI.DropdownMenuWrapper as unknown as React.ComponentType<Record<string, unknown>>
  ),
  DropdownMenu: asComponent(UI.DropdownMenu),
  DropdownMenuTrigger: asComponent(UI.DropdownMenuTrigger),
  DropdownMenuContent: asComponent(UI.DropdownMenuContent),
  DropdownMenuLabel: asComponent(UI.DropdownMenuLabel),
  DropdownMenuItem: asComponent(UI.DropdownMenuItem),
  DropdownMenuCheckboxItem: asComponent(UI.DropdownMenuCheckboxItem),
  DropdownMenuRadioGroup: asComponent(UI.DropdownMenuRadioGroup),
  DropdownMenuRadioItem: asComponent(
    UI.DropdownMenuRadioItem as unknown as React.ComponentType<Record<string, unknown>>
  ),
  DropdownMenuSeparator: asComponent(UI.DropdownMenuSeparator),
  DropdownMenuShortcut: asComponent(UI.DropdownMenuShortcut),
  DropdownMenuSub: asComponent(UI.DropdownMenuSub),
  DropdownMenuSubTrigger: asComponent(UI.DropdownMenuSubTrigger),
  DropdownMenuSubContent: asComponent(UI.DropdownMenuSubContent),
  DropdownMenuGroup: asComponent(UI.DropdownMenuGroup),
  "context-menu": asComponent(
    UI.ContextMenuComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  ContextMenu: asComponent(
    UI.ContextMenuComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),

  // Form Components
  FormItem: asComponent(UI.FormItem),
  FormLabel: asComponent(UI.FormLabel),
  FormControl: asComponent(UI.FormControl),
  FormDescription: asComponent(UI.FormDescription),
  FormMessage: asComponent(UI.FormMessage),
  // Form component requires special handling as it's a FormProvider
  Form: asComponent(UI.Form as React.ComponentType<Record<string, unknown>>),
};

/**
 * Default component resolver that uses the default registry
 *
 * This resolver maps component types to their React implementations
 * using the default component registry.
 *
 * @param type Component type string
 * @returns React component implementation or null if not found
 */
export const defaultComponentResolver: ComponentResolver = (type: string) => {
  // Try the exact type first
  let component = defaultComponentRegistry[type];

  // If not found, try PascalCase (e.g., "box" -> "Box")
  if (!component) {
    const pascalCaseType = type.charAt(0).toUpperCase() + type.slice(1);
    component = defaultComponentRegistry[pascalCaseType];
  }

  return component || null;
};

/**
 * Create a custom component resolver
 *
 * This function creates a custom component resolver that combines
 * custom component mappings with the default registry.
 * All components are adapted to accept our standard ComponentProps interface.
 *
 * @param customComponents Additional component mappings to include
 * @returns Custom component resolver function
 */
export function createCustomResolver(
  customComponents: Record<string, ComponentType>
): ComponentResolver {
  return (type: string) => {
    // Try the exact type first in custom components
    let component = customComponents[type];

    // Try the exact type in default registry
    if (!component) {
      component = defaultComponentRegistry[type];
    }

    // If not found, try PascalCase (e.g., "box" -> "Box")
    if (!component) {
      const pascalCaseType = type.charAt(0).toUpperCase() + type.slice(1);
      component = customComponents[pascalCaseType] || defaultComponentRegistry[pascalCaseType];
    }

    return component || null;
  };
}
