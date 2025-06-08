import * as React from "react";
import type { ReactNode } from "react";
import type { ComponentResolver, ComponentProps } from "../types/schema/components";
import * as UI from "../components/ui";
import * as Blocks from "../components/blocks";
import { omit } from "./utils";
import { BreadcrumbComponent } from "../components/ui/breadcrumb-component";
import { HeadManager } from "../components/ui/head-manager";
import { ExtendedHeadManager } from "./seo/head-manager-extended";
import { PaginationComponent } from "../components/ui/pagination";
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
} from "../components/ui/command";
import { CalendarComponent } from "../components/ui/calendar";
import { DataTableComponent } from "../components/ui/data-table";
import { CarouselBlock } from "../components/blocks/carousel";
import { FAQBlock } from "../components/blocks/faq";
import { Chart } from "../components/ui/chart/chart";
import { PageSection } from "../components/blocks/page-section";
import { LatestNews } from "../components/blocks/latest-news";
import { ProductShowcase } from "../components/blocks/product-showcase";
import { SDUIIcon } from "./icons";
import { InputWithIconWrapper } from "./icons/input-with-icon-wrapper";
import { DrawerWrapper } from "../components/ui/drawer/drawer-wrapper";
import { HoverCardWrapper } from "../components/ui/hover-card/hover-card-wrapper";
import { SheetWrapper } from "../components/ui/sheet/sheet-wrapper";
import { KeyboardNavigationMenuComponent, KeyboardNavigationMenuItemComponent } from "../components/ui/keyboard-navigation-menu/keyboard-navigation-menu-component";
import { 
  FormWrapper,
  FormFieldWrapper,
  FormItemWrapper, 
  FormLabelWrapper, 
  FormControlWrapper, 
  FormDescriptionWrapper, 
  FormMessageWrapper 
} from "./form/form-component-wrappers";

// Type definition for components in our registry
type ComponentType = React.ComponentType<ComponentProps>;

// Helper function to transform Input props
const transformInputProps = (actualProps: Record<string, unknown>): Record<string, unknown> => {
  const transformed = { ...actualProps };
  
  // Transform inputType to type for HTML input element
  if ("inputType" in actualProps) {
    transformed.type = actualProps.inputType;
    delete transformed.inputType;
  }
  
  // Keep icon props - they will be handled by InputWithIconWrapper
  // delete transformed.startIcon;
  // delete transformed.endIcon;
  
  return transformed;
};

// Helper function to transform Flex props
const transformFlexProps = (actualProps: Record<string, unknown>): Record<string, unknown> => {
  const transformed = { ...actualProps };
  
  // Transform hyphenated direction values to camelCase
  if ("direction" in actualProps && typeof actualProps.direction === "string") {
    const directionMap: Record<string, string> = {
      "row": "row",
      "column": "column",
      "row-reverse": "rowReverse",
      "column-reverse": "columnReverse"
    };
    transformed.direction = directionMap[actualProps.direction] || actualProps.direction;
  }
  
  // Transform hyphenated wrap values to camelCase
  if ("wrap" in actualProps && typeof actualProps.wrap === "string") {
    const wrapMap: Record<string, string> = {
      "nowrap": "nowrap",
      "wrap": "wrap",
      "wrap-reverse": "wrapReverse"
    };
    transformed.wrap = wrapMap[actualProps.wrap] || actualProps.wrap;
  }
  
  // Transform justify values
  if ("justify" in actualProps && typeof actualProps.justify === "string") {
    const justifyMap: Record<string, string> = {
      "start": "start",
      "end": "end",
      "center": "center",
      "space-between": "between",
      "space-around": "around",
      "space-evenly": "evenly"
    };
    transformed.justify = justifyMap[actualProps.justify] || actualProps.justify;
  }
  
  return transformed;
};

// Helper function to transform Grid props
const transformGridProps = (actualProps: Record<string, unknown>): Record<string, unknown> => {
  const transformed = { ...actualProps };
  
  // Transform cols, colsSm, colsMd, etc. to columns responsive object
  const colsProps = ['cols', 'colsSm', 'colsMd', 'colsLg', 'colsXl', 'cols2xl'];
  const hasColsProps = colsProps.some(prop => prop in actualProps);
  
  if (hasColsProps) {
    const columns: Record<string, number> = {};
    
    if ('cols' in actualProps) {
      columns.base = Number(actualProps.cols);
      delete transformed.cols;
    }
    if ('colsSm' in actualProps) {
      columns.sm = Number(actualProps.colsSm);
      delete transformed.colsSm;
    }
    if ('colsMd' in actualProps) {
      columns.md = Number(actualProps.colsMd);
      delete transformed.colsMd;
    }
    if ('colsLg' in actualProps) {
      columns.lg = Number(actualProps.colsLg);
      delete transformed.colsLg;
    }
    if ('colsXl' in actualProps) {
      columns.xl = Number(actualProps.colsXl);
      delete transformed.colsXl;
    }
    if ('cols2xl' in actualProps) {
      columns['2xl'] = Number(actualProps.cols2xl);
      delete transformed.cols2xl;
    }
    
    transformed.columns = columns;
  }
  
  // Transform gap values
  if ('gap' in actualProps && typeof actualProps.gap === 'string') {
    const gapMap: Record<string, number> = {
      'xs': 1,
      'sm': 2,
      'md': 4,
      'lg': 6,
      'xl': 8,
      '2xl': 12
    };
    transformed.gap = gapMap[actualProps.gap] || actualProps.gap;
  }
  
  return transformed;
};

// Helper function to transform props based on component type
const transformPropsForComponent = (
  spec: Record<string, unknown>,
  actualProps: Record<string, unknown>
): Record<string, unknown> => {
  if (spec.type === "Heading" && "level" in actualProps && typeof actualProps.level === "number") {
    return {
      ...actualProps,
      level: `h${actualProps.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    };
  }

  if (spec.type === "ToggleGroup" || spec.type === "ToggleGroupItem") {
    const { type, children, ...componentProps } = spec;
    return {
      ...actualProps,
      ...componentProps,
    };
  }

  if (spec.type === "Input") {
    return transformInputProps(actualProps);
  }

  if (spec.type === "Flex") {
    return transformFlexProps(actualProps);
  }

  if (spec.type === "Grid") {
    return transformGridProps(actualProps);
  }

  if (spec.type === "Button") {
    const transformed = { ...actualProps };
    // Transform buttonType to htmlType for Button component
    if ("buttonType" in actualProps) {
      transformed.htmlType = actualProps.buttonType;
      delete transformed.buttonType;
    }
    return transformed;
  }

  return actualProps;
};

// Helper to check if a key is an event handler prop
const isEventHandlerProp = (key: string): boolean => {
  return key.startsWith('on') && key.length > 2 && key[2] === key[2].toUpperCase();
};

// Helper to process Action props
const processActionProp = (
  key: string,
  value: string,
  converted: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): void => {
  delete converted[key];
  if (handlers) {
    const eventName = key.slice(0, -6);
    const handler = handlers[value];
    if (handler) {
      converted[eventName] = handler;
    }
  }
};

// Helper to process direct event props
const processEventProp = (
  key: string,
  value: string,
  converted: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): void => {
  if (handlers) {
    const handler = handlers[value];
    if (handler) {
      converted[key] = handler;
    } else {
      delete converted[key];
    }
  }
};

// Helper to process nested action objects
const processNestedAction = (
  actionObj: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): Record<string, unknown> => {
  const processedAction: Record<string, unknown> = {};
  
  for (const [actionKey, actionValue] of Object.entries(actionObj)) {
    if (actionKey === 'onClick' && typeof actionValue === 'string' && handlers) {
      // Convert string handler reference to actual function
      const handler = handlers[actionValue];
      // Keep the string if handler not found (will be handled by component)
      processedAction[actionKey] = handler || actionValue;
    } else {
      processedAction[actionKey] = actionValue;
    }
  }
  
  return processedAction;
};

const convertActionPropsToHandlers = (
  props: Record<string, unknown>,
  handlers?: Record<string, (...args: unknown[]) => unknown>
): Record<string, unknown> => {
  const converted = { ...props };
  
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      if (key.endsWith('Action')) {
        processActionProp(key, value, converted, handlers);
      } else if (isEventHandlerProp(key)) {
        processEventProp(key, value, converted, handlers);
      }
    } else if (typeof value === 'object' && value !== null && key.endsWith('Action')) {
      // Handle nested action objects (e.g., primaryAction, secondaryAction)
      converted[key] = processNestedAction(value as Record<string, unknown>, handlers);
    }
  }
  return converted;
};

// Store references to unwrapped components
const unwrappedComponentRegistry = new WeakMap<ComponentType, React.ComponentType<Record<string, unknown>>>();

// Helper function to safely cast components to accept our standard ComponentProps
// Special handling for certain components that have required props
const asComponent = <T extends React.ComponentType<Record<string, unknown>>>(
  component: T,
  defaultProps?: Partial<Record<string, unknown>>
): ComponentType => {
  // Wrap the component to accept ComponentProps and extract the relevant props
  // Use forwardRef to support ref forwarding for Radix UI components
  const forwardRefComponent = React.forwardRef<unknown, ComponentProps>((componentProps, ref) => {
    const { spec, children, theme, state, parentContext, ...restProps } = componentProps;

    // Some components expect the full spec object (like CarouselComponent)
    // Check if the component expects a spec prop
    const componentName = component.displayName || component.name || "";
    const expectsSpec = (componentName.includes("Component") || componentName.includes("Block") || componentName.includes("Wrapper")) 
      && componentName !== "InputWithIconWrapper";

    if (expectsSpec) {
      // Pass the full ComponentProps to components that expect it
      return React.createElement(
        component,
        {
          ...defaultProps,
          spec,
          theme,
          state,
          parentContext,
          ...restProps,
          ref,
        },
        children
      );
    }

    // For all other components, extract props directly from spec
    // Remove internal properties and children (children are handled separately)
    const actualProps = omit(spec as Record<string, unknown>, ["type", "spec", "theme", "state", "parentContext", "children", "conditionalProps", "when", "actions", "computedProps"]);

    // Transform props based on component type
    const transformedProps = transformPropsForComponent(spec as Record<string, unknown>, actualProps);

    // Always use the pre-rendered children passed from the render function
    // The render function already processes spec.children into React elements
    const finalChildren: ReactNode = children;

    // Convert Action props to event handlers
    const handlers = parentContext?.handlers as Record<string, (...args: unknown[]) => unknown> | undefined;
    const propsWithEventHandlers = convertActionPropsToHandlers(transformedProps, handlers);

    // Merge with any additional props passed through render
    const mergedProps: Record<string, unknown> = {
      ...defaultProps,
      ...propsWithEventHandlers,
      // Include className and style from the spec if present
      className:
        ("className" in spec ? spec.className : undefined) ||
        ("className" in propsWithEventHandlers ? propsWithEventHandlers.className : undefined),
      style:
        ("style" in spec ? spec.style : undefined) ||
        ("style" in propsWithEventHandlers ? propsWithEventHandlers.style : undefined),
      // Important: preserve the asChild prop from the spec for Radix UI components
      asChild:
        "asChild" in spec
          ? (spec as Record<string, unknown> & { asChild?: boolean }).asChild
          : undefined,
    };

    // Clean up undefined values
    for (const key of Object.keys(mergedProps)) {
      if (mergedProps[key] === undefined) {
        delete mergedProps[key];
      }
    }

    return React.createElement(component, { ...mergedProps, ref }, finalChildren);
  });
  
  // Set display name for debugging
  forwardRefComponent.displayName = `AsComponent(${component.displayName || component.name || 'Component'})`;
  
  const wrappedComponent = forwardRefComponent as unknown as ComponentType;
  
  // Store reference to the unwrapped component
  unwrappedComponentRegistry.set(wrappedComponent, component);
  
  return wrappedComponent;
};

/**
 * Default component registry for the core UI components
 *
 * This registry maps component type strings to their React implementations.
 * It provides a centralized place to register all available components.
 * All components are adapted to accept our standard ComponentProps interface.
 */
let _defaultComponentRegistry: Record<string, ComponentType> | null = null;

// Lazy initialization to avoid circular dependency issues
const getDefaultComponentRegistry = (): Record<string, ComponentType> => {
  if (_defaultComponentRegistry) {
    return _defaultComponentRegistry;
  }

  _defaultComponentRegistry = {
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
    Markdown: asComponent(
      UI.Markdown as unknown as React.ComponentType<Record<string, unknown>>,
      { content: "" } // Provide default required props
    ),
    markdown: asComponent(
      UI.Markdown as unknown as React.ComponentType<Record<string, unknown>>,
      { content: "" } // Provide default required props
    ),

    // UI Components
    Button: asComponent(UI.Button),
    Card: asComponent(UI.Card),
    CardHeader: asComponent(UI.CardHeader),
    CardFooter: asComponent(UI.CardFooter),
    CardTitle: asComponent(UI.CardTitle),
    CardDescription: asComponent(UI.CardDescription),
    CardContent: asComponent(UI.CardContent),
    CardImage: asComponent(UI.CardImage),
    Badge: asComponent(UI.Badge),
    Avatar: asComponent(UI.Avatar),
    AvatarImage: asComponent(UI.AvatarImage),
    AvatarFallback: asComponent(UI.AvatarFallback),
    Image: asComponent(UI.Image),
    Skeleton: asComponent(UI.Skeleton),
    SkeletonLoader: asComponent(UI.SkeletonLoader),
    Label: asComponent(UI.Label),
    Input: asComponent(InputWithIconWrapper as React.ComponentType<Record<string, unknown>>),
    Loading: asComponent(UI.Loading),
    loading: asComponent(UI.Loading),
    table: asComponent(
      UI.TableComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    Table: asComponent(
      UI.TableComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    TableHeader: asComponent(
      UI.TableHeader as unknown as React.ComponentType<Record<string, unknown>>
    ),
    TableBody: asComponent(
      UI.TableBody as unknown as React.ComponentType<Record<string, unknown>>
    ),
    TableFooter: asComponent(
      UI.TableFooter as unknown as React.ComponentType<Record<string, unknown>>
    ),
    TableHead: asComponent(
      UI.TableHead as unknown as React.ComponentType<Record<string, unknown>>
    ),
    TableRow: asComponent(
      UI.TableRow as unknown as React.ComponentType<Record<string, unknown>>
    ),
    TableCell: asComponent(
      UI.TableCell as unknown as React.ComponentType<Record<string, unknown>>
    ),
    TableCaption: asComponent(
      UI.TableCaption as unknown as React.ComponentType<Record<string, unknown>>
    ),
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
    SelectItem: asComponent(
      UI.SelectItem as unknown as React.ComponentType<Record<string, unknown>>
    ),
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
    Sheet: asComponent(SheetWrapper),
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
    Accordion: asComponent(
      UI.AccordionComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    accordion: asComponent(
      UI.AccordionComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
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
    Drawer: asComponent(DrawerWrapper),
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
    HoverCard: asComponent(HoverCardWrapper as React.ComponentType<Record<string, unknown>>),
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
      UI.NavigationMenuWrapper as unknown as React.ComponentType<Record<string, unknown>>
    ),
    breadcrumb: asComponent(BreadcrumbComponent),
    Breadcrumb: asComponent(BreadcrumbComponent),
    pagination: asComponent(
      PaginationComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    Pagination: asComponent(
      PaginationComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    command: asComponent(
      CommandComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    Command: asComponent(
      CommandComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
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
      Blocks.SidebarComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    Sidebar: asComponent(
      Blocks.SidebarComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    sidebarProvider: asComponent(
      Blocks.SidebarProvider as unknown as React.ComponentType<Record<string, unknown>>
    ),
    SidebarProvider: asComponent(
      Blocks.SidebarProvider as unknown as React.ComponentType<Record<string, unknown>>
    ),
    sidebarInset: asComponent(
      Blocks.SidebarInsetComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    SidebarInset: asComponent(
      Blocks.SidebarInsetComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    sidebarTrigger: asComponent(
      Blocks.SidebarTriggerComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    SidebarTrigger: asComponent(
      Blocks.SidebarTriggerComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    calendar: asComponent(
      CalendarComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    Calendar: asComponent(
      CalendarComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    datePicker: asComponent(
      UI.DatePicker as unknown as React.ComponentType<Record<string, unknown>>
    ),
    DatePicker: asComponent(
      UI.DatePicker as unknown as React.ComponentType<Record<string, unknown>>
    ),
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
      CarouselBlock as unknown as React.ComponentType<Record<string, unknown>>
    ),
    carousel: asComponent(
      CarouselBlock as unknown as React.ComponentType<Record<string, unknown>>
    ),
    CarouselContent: asComponent(
      Blocks.CarouselContent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    CarouselItem: asComponent(
      Blocks.CarouselItem as unknown as React.ComponentType<Record<string, unknown>>
    ),
    CarouselPrevious: asComponent(
      Blocks.CarouselPrevious as unknown as React.ComponentType<Record<string, unknown>>
    ),
    CarouselNext: asComponent(
      Blocks.CarouselNext as unknown as React.ComponentType<Record<string, unknown>>
    ),
    CarouselDots: asComponent(
      Blocks.CarouselDots as unknown as React.ComponentType<Record<string, unknown>>
    ),
    CarouselThumbnails: asComponent(
      Blocks.CarouselThumbnails as unknown as React.ComponentType<Record<string, unknown>>
    ),

    // Chart Component
    Chart: asComponent(Chart as unknown as React.ComponentType<Record<string, unknown>>),
    chart: asComponent(Chart as unknown as React.ComponentType<Record<string, unknown>>),

    // Marketing Components
    Hero: asComponent(UI.Hero),
    hero: asComponent(UI.Hero),
    // FeatureCard requires double type assertion due to required props
    FeatureCard: asComponent(
      Blocks.FeatureCard as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "" } // Provide default title to prevent runtime errors
    ),
    "feature-card": asComponent(
      Blocks.FeatureCard as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "" } // Provide default title to prevent runtime errors
    ),
    FeatureCardGrid: asComponent(
      Blocks.FeatureCardGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { cards: [] } // Provide default cards array to prevent runtime errors
    ),
    "feature-card-grid": asComponent(
      Blocks.FeatureCardGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { cards: [] } // Provide default cards array to prevent runtime errors
    ),
    Testimonial: asComponent(
      Blocks.Testimonial as unknown as React.ComponentType<Record<string, unknown>>,
      { testimonials: { author: { name: "" }, content: "" } } // Provide default required props
    ),
    testimonial: asComponent(
      Blocks.Testimonial as unknown as React.ComponentType<Record<string, unknown>>,
      { testimonials: { author: { name: "" }, content: "" } } // Provide default required props
    ),
    PricingTable: asComponent(
      Blocks.PricingTable as unknown as React.ComponentType<Record<string, unknown>>,
      { tiers: [] } // Provide default required props
    ),
    "pricing-table": asComponent(
      Blocks.PricingTable as unknown as React.ComponentType<Record<string, unknown>>,
      { tiers: [] } // Provide default required props
    ),
    CallToAction: asComponent(
      Blocks.CallToAction as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "" } // Provide default required props
    ),
    "call-to-action": asComponent(
      Blocks.CallToAction as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "" } // Provide default required props
    ),

    // Form Components
    FormField: asComponent(FormFieldWrapper),
    FormItem: asComponent(FormItemWrapper),
    FormLabel: asComponent(FormLabelWrapper),
    FormControl: asComponent(FormControlWrapper),
    FormDescription: asComponent(FormDescriptionWrapper),
    FormMessage: asComponent(FormMessageWrapper),
    // Form component requires special handling as it's a FormProvider
    Form: asComponent(FormWrapper as unknown as React.ComponentType<Record<string, unknown>>),

    // Utility Components
    HeadManager: asComponent(
      HeadManager as unknown as React.ComponentType<Record<string, unknown>>,
      { metadata: { title: "" } } // Provide default required props
    ),
    headManager: asComponent(
      HeadManager as unknown as React.ComponentType<Record<string, unknown>>,
      { metadata: { title: "" } } // Provide default required props
    ),
    ExtendedHeadManager: asComponent(
      ExtendedHeadManager as unknown as React.ComponentType<Record<string, unknown>>,
      { metadata: { title: "" } } // Provide default required props
    ),
    extendedHeadManager: asComponent(
      ExtendedHeadManager as unknown as React.ComponentType<Record<string, unknown>>,
      { metadata: { title: "" } } // Provide default required props
    ),
    "extended-head-manager": asComponent(
      ExtendedHeadManager as unknown as React.ComponentType<Record<string, unknown>>,
      { metadata: { title: "" } } // Provide default required props
    ),

    // Block Components
    Header: asComponent(
      Blocks.Header as unknown as React.ComponentType<Record<string, unknown>>
    ),
    header: asComponent(
      Blocks.Header as unknown as React.ComponentType<Record<string, unknown>>
    ),
    PageHeroHeader: asComponent(
      Blocks.PageHeroHeader as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "" } // Provide default required props
    ),
    "page-hero-header": asComponent(
      Blocks.PageHeroHeader as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "" } // Provide default required props
    ),
    Footer: asComponent(
      Blocks.Footer as unknown as React.ComponentType<Record<string, unknown>>
    ),
    footer: asComponent(
      Blocks.Footer as unknown as React.ComponentType<Record<string, unknown>>
    ),
    Timeline: asComponent(
      Blocks.Timeline as unknown as React.ComponentType<Record<string, unknown>>,
      { items: [] } // Provide default required props
    ),
    timeline: asComponent(
      Blocks.Timeline as unknown as React.ComponentType<Record<string, unknown>>,
      { items: [] } // Provide default required props
    ),
    FAQ: asComponent(
      FAQBlock as unknown as React.ComponentType<Record<string, unknown>>,
      { items: [] } // Provide default required props
    ),
    faq: asComponent(
      FAQBlock as unknown as React.ComponentType<Record<string, unknown>>,
      { items: [] } // Provide default required props
    ),
    TeamGrid: asComponent(
      Blocks.TeamGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { members: [] } // Provide default required props
    ),
    "team-grid": asComponent(
      Blocks.TeamGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { members: [] } // Provide default required props
    ),
    BlogPostGrid: asComponent(
      Blocks.BlogPostGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { posts: [] } // Provide default required props
    ),
    "blog-post-grid": asComponent(
      Blocks.BlogPostGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { posts: [] } // Provide default required props
    ),
    BlogPostDetail: asComponent(
      Blocks.BlogPostDetail as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "", content: "", author: { name: "" }, publishDate: new Date().toISOString() } // Provide default required props
    ),
    "blog-post-detail": asComponent(
      Blocks.BlogPostDetail as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "", content: "", author: { name: "" }, publishDate: new Date().toISOString() } // Provide default required props
    ),
    BrandLogoBar: asComponent(
      Blocks.BrandLogoBar as unknown as React.ComponentType<Record<string, unknown>>,
      { logos: [] } // Provide default required props
    ),
    "brand-logo-bar": asComponent(
      Blocks.BrandLogoBar as unknown as React.ComponentType<Record<string, unknown>>,
      { logos: [] } // Provide default required props
    ),
    ServiceList: asComponent(
      Blocks.ServiceList as unknown as React.ComponentType<Record<string, unknown>>,
      { services: [] } // Provide default required props
    ),
    "service-list": asComponent(
      Blocks.ServiceList as unknown as React.ComponentType<Record<string, unknown>>,
      { services: [] } // Provide default required props
    ),
    PageSection: asComponent(
      PageSection as unknown as React.ComponentType<Record<string, unknown>>,
      { children: null } // Provide default required props
    ),
    "page-section": asComponent(
      PageSection as unknown as React.ComponentType<Record<string, unknown>>,
      { children: null } // Provide default required props
    ),
    ContactForm: asComponent(
      Blocks.ContactForm as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "Contact Us", description: "Get in touch" } // Provide default required props
    ),
    "contact-form": asComponent(
      Blocks.ContactForm as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "Contact Us", description: "Get in touch" } // Provide default required props
    ),
    LatestNews: asComponent(
      LatestNews as unknown as React.ComponentType<Record<string, unknown>>,
      { articles: [] } // Provide default required props
    ),
    "latest-news": asComponent(
      LatestNews as unknown as React.ComponentType<Record<string, unknown>>,
      { articles: [] } // Provide default required props
    ),
    NewsletterSignup: asComponent(
      Blocks.NewsletterSignup as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "Stay updated", description: "Get the latest news and updates delivered to your inbox." } // Provide default required props
    ),
    "newsletter-signup": asComponent(
      Blocks.NewsletterSignup as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "Stay updated", description: "Get the latest news and updates delivered to your inbox." } // Provide default required props
    ),
    SocialShareBar: asComponent(
      Blocks.SocialShareBar as unknown as React.ComponentType<Record<string, unknown>>,
      { url: "", title: "" } // Provide default required props
    ),
    "social-share-bar": asComponent(
      Blocks.SocialShareBar as unknown as React.ComponentType<Record<string, unknown>>,
      { url: "", title: "" } // Provide default required props
    ),
    Map: asComponent(
      Blocks.Map as unknown as React.ComponentType<Record<string, unknown>>,
      { center: { lat: 40.7128, lng: -74.006 }, zoom: 14 } // Provide default required props
    ),
    map: asComponent(
      Blocks.Map as unknown as React.ComponentType<Record<string, unknown>>,
      { center: { lat: 40.7128, lng: -74.006 }, zoom: 14 } // Provide default required props
    ),
    StatBlock: asComponent(
      Blocks.StatBlock as unknown as React.ComponentType<Record<string, unknown>>,
      { stats: [] } // Provide default required props
    ),
    "stat-block": asComponent(
      Blocks.StatBlock as unknown as React.ComponentType<Record<string, unknown>>,
      { stats: [] } // Provide default required props
    ),
    ContactFormBlock: asComponent(
      Blocks.ContactFormBlock as unknown as React.ComponentType<Record<string, unknown>>,
      { fields: [] } // Provide default required props
    ),
    "contact-form-block": asComponent(
      Blocks.ContactFormBlock as unknown as React.ComponentType<Record<string, unknown>>,
      { fields: [] } // Provide default required props
    ),
    Icon: asComponent(
      SDUIIcon as unknown as React.ComponentType<Record<string, unknown>>,
      { name: "help-circle" } // Provide default icon name
    ),
    icon: asComponent(
      SDUIIcon as unknown as React.ComponentType<Record<string, unknown>>,
      { name: "help-circle" } // Provide default icon name
    ),
    PhotoFlipCard: asComponent(
      Blocks.PhotoFlipCard as unknown as React.ComponentType<Record<string, unknown>>,
      { frontImage: "" } // Provide default required props
    ),
    "photo-flip-card": asComponent(
      Blocks.PhotoFlipCard as unknown as React.ComponentType<Record<string, unknown>>,
      { frontImage: "" } // Provide default required props
    ),
    PhotoFlipCardGrid: asComponent(
      Blocks.PhotoFlipCardGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { cards: [] } // Provide default required props
    ),
    "photo-flip-card-grid": asComponent(
      Blocks.PhotoFlipCardGrid as unknown as React.ComponentType<Record<string, unknown>>,
      { cards: [] } // Provide default required props
    ),
    TypewriterText: asComponent(
      Blocks.TypewriterText as unknown as React.ComponentType<Record<string, unknown>>,
      { texts: "Hello World" } // Provide default required props
    ),
    "typewriter-text": asComponent(
      Blocks.TypewriterText as unknown as React.ComponentType<Record<string, unknown>>,
      { texts: "Hello World" } // Provide default required props
    ),
    ProcessSteps: asComponent(
      Blocks.ProcessSteps as unknown as React.ComponentType<Record<string, unknown>>,
      { steps: [] } // Provide default required props
    ),
    "process-steps": asComponent(
      Blocks.ProcessSteps as unknown as React.ComponentType<Record<string, unknown>>,
      { steps: [] } // Provide default required props
    ),
    ProductShowcase: asComponent(
      ProductShowcase as unknown as React.ComponentType<Record<string, unknown>>,
      { products: [] } // Provide default required props
    ),
    "product-showcase": asComponent(
      ProductShowcase as unknown as React.ComponentType<Record<string, unknown>>,
      { products: [] } // Provide default required props
    ),
    JobListings: asComponent(
      Blocks.JobListings as unknown as React.ComponentType<Record<string, unknown>>,
      { jobs: [] } // Provide default required props
    ),
    "job-listings": asComponent(
      Blocks.JobListings as unknown as React.ComponentType<Record<string, unknown>>,
      { jobs: [] } // Provide default required props
    ),
    PortfolioCaseStudies: asComponent(
      Blocks.PortfolioCaseStudies as unknown as React.ComponentType<Record<string, unknown>>,
      { projects: [] } // Provide default required props
    ),
    "portfolio-case-studies": asComponent(
      Blocks.PortfolioCaseStudies as unknown as React.ComponentType<Record<string, unknown>>,
      { projects: [] } // Provide default required props
    ),
    CookieConsentBanner: asComponent(
      Blocks.CookieConsentBanner as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "We use cookies", description: "We use cookies to enhance your browsing experience." } // Provide default required props
    ),
    "cookie-consent-banner": asComponent(
      Blocks.CookieConsentBanner as unknown as React.ComponentType<Record<string, unknown>>,
      { title: "We use cookies", description: "We use cookies to enhance your browsing experience." } // Provide default required props
    ),
    AnnouncementBar: asComponent(
      Blocks.AnnouncementBar as unknown as React.ComponentType<Record<string, unknown>>,
      { message: "" } // Provide default required props
    ),
    "announcement-bar": asComponent(
      Blocks.AnnouncementBar as unknown as React.ComponentType<Record<string, unknown>>,
      { message: "" } // Provide default required props
    ),
    ErrorPage: asComponent(
      Blocks.ErrorPage as unknown as React.ComponentType<Record<string, unknown>>,
      { variant: "friendly-404" } // Provide default required props
    ),
    "error-page": asComponent(
      Blocks.ErrorPage as unknown as React.ComponentType<Record<string, unknown>>,
      { variant: "friendly-404" } // Provide default required props
    ),
    Features: asComponent(
      Blocks.Features as unknown as React.ComponentType<Record<string, unknown>>,
      { features: [] } // Provide default required props
    ),
    features: asComponent(
      Blocks.Features as unknown as React.ComponentType<Record<string, unknown>>,
      { features: [] } // Provide default required props
    ),
    EventListings: asComponent(
      Blocks.EventListings as unknown as React.ComponentType<Record<string, unknown>>,
      { events: [] } // Provide default required props
    ),
    "event-listings": asComponent(
      Blocks.EventListings as unknown as React.ComponentType<Record<string, unknown>>,
      { events: [] } // Provide default required props
    ),
    LocationHours: asComponent(
      Blocks.LocationHours as unknown as React.ComponentType<Record<string, unknown>>,
      { locations: [] } // Provide default required props
    ),
    "location-hours": asComponent(
      Blocks.LocationHours as unknown as React.ComponentType<Record<string, unknown>>,
      { locations: [] } // Provide default required props
    ),
    KeyboardNavigationMenu: asComponent(
      KeyboardNavigationMenuComponent as unknown as React.ComponentType<Record<string, unknown>>,
      { items: [] } // Provide default required props
    ),
    keyboardNavigationMenu: asComponent(
      KeyboardNavigationMenuComponent as unknown as React.ComponentType<Record<string, unknown>>,
      { items: [] } // Provide default required props
    ),
    "keyboard-navigation-menu": asComponent(
      KeyboardNavigationMenuComponent as unknown as React.ComponentType<Record<string, unknown>>,
      { items: [] } // Provide default required props
    ),
    KeyboardNavigationMenuItem: asComponent(
      KeyboardNavigationMenuItemComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    keyboardNavigationMenuItem: asComponent(
      KeyboardNavigationMenuItemComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
    "keyboard-navigation-menu-item": asComponent(
      KeyboardNavigationMenuItemComponent as unknown as React.ComponentType<Record<string, unknown>>
    ),
  };

  return _defaultComponentRegistry;
};

// Export as a getter for lazy initialization
export const defaultComponentRegistry = new Proxy({} as Record<string, ComponentType>, {
  get: (target, prop) => {
    const registry = getDefaultComponentRegistry();
    return registry[prop as string];
  },
  has: (target, prop) => {
    const registry = getDefaultComponentRegistry();
    return prop in registry;
  },
  ownKeys: () => {
    const registry = getDefaultComponentRegistry();
    return Object.keys(registry);
  },
  getOwnPropertyDescriptor: (target, prop) => {
    const registry = getDefaultComponentRegistry();
    if (prop in registry) {
      return {
        enumerable: true,
        configurable: true,
        value: registry[prop as string],
      };
    }
    return undefined;
  },
});

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
  const registry = getDefaultComponentRegistry();

  // Try the exact type first
  let component = registry[type];

  // If not found, try PascalCase (e.g., "box" -> "Box")
  if (!component) {
    const pascalCaseType = type.charAt(0).toUpperCase() + type.slice(1);
    component = registry[pascalCaseType];
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
    const registry = getDefaultComponentRegistry();

    // Try the exact type first in custom components
    let component = customComponents[type];

    // Try the exact type in default registry
    if (!component) {
      component = registry[type];
    }

    // If not found, try PascalCase (e.g., "box" -> "Box")
    if (!component) {
      const pascalCaseType = type.charAt(0).toUpperCase() + type.slice(1);
      component = customComponents[pascalCaseType] || registry[pascalCaseType];
    }

    return component || null;
  };
}

/**
 * Get the unwrapped component (without asComponent wrapper)
 * This is used when rendering children of components with asChild=true
 * to allow Radix UI's Slot component to properly merge props
 */
export function getUnwrappedComponent(wrappedComponent: ComponentType): React.ComponentType<Record<string, unknown>> | null {
  return unwrappedComponentRegistry.get(wrappedComponent) || null;
}
