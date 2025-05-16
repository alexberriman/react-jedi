import * as React from "react";
import type { ComponentResolver, ComponentProps } from "@/types/schema/components";
import * as UI from "@/components/ui";
import { BreadcrumbComponent } from "@/components/ui/breadcrumb-component";
import { PaginationComponent } from "@/components/ui/pagination";
import {
  CommandComponent,
  CommandDialogComponent,
  CommandInputComponent,
  CommandListComponent,
  CommandEmptyComponent,
  CommandGroupComponent,
  CommandItemComponent,
  CommandSeparatorComponent,
  CommandShortcutComponent,
} from "@/components/ui/command";
import { CalendarComponent } from "@/components/ui/calendar";
import { DataTableComponent } from "@/components/ui/data-table";
import { CarouselComponent } from "@/components/ui/carousel";
import { Chart } from "@/components/ui/chart/chart";

// Type definition for components in our registry
type ComponentType = React.ComponentType<ComponentProps>;

// Helper function to safely cast components to accept our standard ComponentProps
// Special handling for certain components that have required props
const asComponent = <T extends React.ComponentType<Record<string, unknown>>>(
  component: T,
  defaultProps?: Partial<Record<string, unknown>>
): ComponentType => {
  // Wrap the component to accept ComponentProps and extract the relevant props
  return ((componentProps: ComponentProps) => {
    const { spec, children, theme, state } = componentProps;
    // Extract component-specific props from spec, excluding common properties
    const { type, id, ...restSpec } = spec;
    const props = {
      ...defaultProps,
      ...restSpec,
      children,
      theme,
      state,
    };
    return React.createElement(component, props);
  }) as ComponentType;
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
  table: asComponent(UI.TableComponent as unknown as React.ComponentType<Record<string, unknown>>),
  Table: asComponent(UI.TableComponent as unknown as React.ComponentType<Record<string, unknown>>),
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
    UI.ContextMenu as unknown as React.ComponentType<Record<string, unknown>>
  ),
  ContextMenu: asComponent(
    UI.ContextMenu as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Menubar: asComponent(UI.Menubar as unknown as React.ComponentType<Record<string, unknown>>),
  menubar: asComponent(UI.Menubar as unknown as React.ComponentType<Record<string, unknown>>),
  Toast: asComponent(UI.Toaster as unknown as React.ComponentType<Record<string, unknown>>),
  Toaster: asComponent(UI.Toaster as unknown as React.ComponentType<Record<string, unknown>>),
  Tooltip: asComponent(UI.Tooltip),
  TooltipTrigger: asComponent(UI.TooltipTrigger),
  TooltipContent: asComponent(UI.TooltipContent),
  TooltipProvider: asComponent(
    UI.TooltipProvider as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Popover: asComponent(UI.Popover),
  PopoverTrigger: asComponent(UI.PopoverTrigger),
  PopoverContent: asComponent(UI.PopoverContent),
  PopoverAnchor: asComponent(UI.PopoverAnchor),
  HoverCard: asComponent(UI.HoverCard),
  HoverCardTrigger: asComponent(UI.HoverCardTrigger),
  HoverCardContent: asComponent(UI.HoverCardContent),
  Alert: asComponent(UI.Alert),
  AlertTitle: asComponent(UI.AlertTitle),
  AlertDescription: asComponent(UI.AlertDescription),
  alert: asComponent(UI.Alert),
  "alert-title": asComponent(UI.AlertTitle),
  "alert-description": asComponent(UI.AlertDescription),
  AlertDialog: asComponent(UI.AlertDialog),
  AlertDialogTrigger: asComponent(UI.AlertDialogTrigger),
  AlertDialogContent: asComponent(UI.AlertDialogContent),
  AlertDialogHeader: asComponent(UI.AlertDialogHeader),
  AlertDialogFooter: asComponent(UI.AlertDialogFooter),
  AlertDialogTitle: asComponent(UI.AlertDialogTitle),
  AlertDialogDescription: asComponent(UI.AlertDialogDescription),
  AlertDialogAction: asComponent(UI.AlertDialogAction),
  AlertDialogCancel: asComponent(UI.AlertDialogCancel),
  alertDialog: asComponent(UI.AlertDialog),
  Progress: asComponent(UI.Progress),
  NavigationMenu: asComponent(
    UI.NavigationMenu as unknown as React.ComponentType<Record<string, unknown>>
  ),
  NavigationMenuList: asComponent(UI.NavigationMenuList),
  NavigationMenuItem: asComponent(UI.NavigationMenuItem),
  NavigationMenuContent: asComponent(UI.NavigationMenuContent),
  NavigationMenuTrigger: asComponent(UI.NavigationMenuTrigger),
  NavigationMenuLink: asComponent(UI.NavigationMenuLink),
  NavigationMenuIndicator: asComponent(UI.NavigationMenuIndicator),
  NavigationMenuViewport: asComponent(UI.NavigationMenuViewport),
  navigationMenu: asComponent(
    UI.NavigationMenu as unknown as React.ComponentType<Record<string, unknown>>
  ),
  breadcrumb: asComponent(BreadcrumbComponent),
  Breadcrumb: asComponent(BreadcrumbComponent),
  pagination: asComponent(
    PaginationComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Pagination: asComponent(
    PaginationComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  command: asComponent(CommandComponent as unknown as React.ComponentType<Record<string, unknown>>),
  Command: asComponent(CommandComponent as unknown as React.ComponentType<Record<string, unknown>>),
  commandDialog: asComponent(
    CommandDialogComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandDialog: asComponent(
    CommandDialogComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  commandInput: asComponent(
    CommandInputComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandInput: asComponent(
    CommandInputComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  commandList: asComponent(
    CommandListComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandList: asComponent(
    CommandListComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  commandEmpty: asComponent(
    CommandEmptyComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandEmpty: asComponent(
    CommandEmptyComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  commandGroup: asComponent(
    CommandGroupComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandGroup: asComponent(
    CommandGroupComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  commandItem: asComponent(
    CommandItemComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandItem: asComponent(
    CommandItemComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  commandSeparator: asComponent(
    CommandSeparatorComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandSeparator: asComponent(
    CommandSeparatorComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  commandShortcut: asComponent(
    CommandShortcutComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CommandShortcut: asComponent(
    CommandShortcutComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  sidebar: asComponent(
    UI.SidebarComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Sidebar: asComponent(
    UI.SidebarComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  sidebarProvider: asComponent(
    UI.SidebarProvider as unknown as React.ComponentType<Record<string, unknown>>
  ),
  SidebarProvider: asComponent(
    UI.SidebarProvider as unknown as React.ComponentType<Record<string, unknown>>
  ),
  sidebarInset: asComponent(
    UI.SidebarInsetComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  SidebarInset: asComponent(
    UI.SidebarInsetComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  sidebarTrigger: asComponent(
    UI.SidebarTriggerComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  SidebarTrigger: asComponent(
    UI.SidebarTriggerComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  calendar: asComponent(
    CalendarComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  Calendar: asComponent(
    CalendarComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  datePicker: asComponent(UI.DatePicker as unknown as React.ComponentType<Record<string, unknown>>),
  DatePicker: asComponent(UI.DatePicker as unknown as React.ComponentType<Record<string, unknown>>),
  combobox: asComponent(UI.Combobox as unknown as React.ComponentType<Record<string, unknown>>),
  Combobox: asComponent(UI.Combobox as unknown as React.ComponentType<Record<string, unknown>>),
  inputOTP: asComponent(
    UI.InputOTPComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  InputOTP: asComponent(
    UI.InputOTPComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  dataTable: asComponent(
    DataTableComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  DataTable: asComponent(
    DataTableComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),

  // Carousel Components
  Carousel: asComponent(
    CarouselComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  carousel: asComponent(
    CarouselComponent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CarouselContent: asComponent(
    UI.CarouselContent as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CarouselItem: asComponent(
    UI.CarouselItem as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CarouselPrevious: asComponent(
    UI.CarouselPrevious as unknown as React.ComponentType<Record<string, unknown>>
  ),
  CarouselNext: asComponent(
    UI.CarouselNext as unknown as React.ComponentType<Record<string, unknown>>
  ),

  // Chart Component
  Chart: asComponent(Chart as unknown as React.ComponentType<Record<string, unknown>>),
  chart: asComponent(Chart as unknown as React.ComponentType<Record<string, unknown>>),

  // Marketing Components
  Hero: asComponent(UI.Hero),
  hero: asComponent(UI.Hero),
  // FeatureCard requires double type assertion due to required props
  FeatureCard: asComponent(
    UI.FeatureCard as unknown as React.ComponentType<Record<string, unknown>>,
    { title: "" } // Provide default title to prevent runtime errors
  ),
  "feature-card": asComponent(
    UI.FeatureCard as unknown as React.ComponentType<Record<string, unknown>>,
    { title: "" } // Provide default title to prevent runtime errors
  ),
  Testimonial: asComponent(UI.Testimonial),
  testimonial: asComponent(UI.Testimonial),
  PricingTable: asComponent(UI.PricingTable),
  "pricing-table": asComponent(UI.PricingTable),

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
