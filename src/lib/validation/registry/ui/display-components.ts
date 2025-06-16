import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { headingSchema } from "../../../../components/ui/heading/heading.schema";
import { textSchema } from "../../../../components/ui/text/text.schema";
import { imageSchema } from "../../../../components/ui/image/image.schema";
import { badgeSchema } from "../../../../components/ui/badge/badge.schema";
import { alertSchema, alertTitleSchema, alertDescriptionSchema } from "../../../../components/ui/alert/alert.schema";
import { cardSchema, cardHeaderSchema, cardTitleSchema, cardDescriptionSchema, cardActionSchema, cardContentSchema, cardFooterSchema, cardImageSchema } from "../../../../components/ui/card/card.schema";
import { avatarSchema, avatarImageSchema, avatarFallbackSchema } from "../../../../components/ui/avatar/avatar.schema";
import { accordionSchema, accordionItemSchema, accordionTriggerSchema, accordionContentSchema } from "../../../../components/ui/accordion/accordion.schema";
import { alertDialogSchema, alertDialogTriggerSchema, alertDialogPortalSchema, alertDialogOverlaySchema, alertDialogContentSchema, alertDialogHeaderSchema, alertDialogFooterSchema, alertDialogTitleSchema, alertDialogDescriptionSchema, alertDialogActionSchema, alertDialogCancelSchema } from "../../../../components/ui/alert-dialog/alert-dialog.schema";
import { breadcrumbSchema, breadcrumbListSchema, breadcrumbItemSchema, breadcrumbLinkSchema, breadcrumbPageSchema, breadcrumbSeparatorSchema, breadcrumbEllipsisSchema } from "../../../../components/ui/breadcrumb/breadcrumb.schema";
import { progressSchema } from "../../../../components/ui/progress/progress.schema";
import { separatorSchema } from "../../../../components/ui/separator/separator.schema";
import { tooltipSchema, tooltipProviderSchema, tooltipTriggerSchema, tooltipContentSchema } from "../../../../components/ui/tooltip/tooltip.schema";
import { skeletonSchema } from "../../../../components/ui/skeleton/skeleton.schema";
import { blockquoteSchema } from "../../../../components/ui/blockquote/blockquote.schema";
import { chartSchema } from "../../../../components/ui/chart/chart.schema";
import { collapsibleSchema, collapsibleTriggerSchema, collapsibleContentSchema } from "../../../../components/ui/collapsible/collapsible.schema";
import { toggleSchema } from "../../../../components/ui/toggle/toggle.schema";
import { tabsSchema, tabsListSchema, tabsTriggerSchema, tabsContentSchema } from "../../../../components/ui/tabs/tabs.schema";
import { dialogSchema, dialogTriggerSchema, dialogPortalSchema, dialogOverlaySchema, dialogContentSchema, dialogCloseSchema, dialogHeaderSchema, dialogFooterSchema, dialogTitleSchema, dialogDescriptionSchema } from "../../../../components/ui/dialog/dialog.schema";
import { contextMenuSchema, contextMenuTriggerSchema, contextMenuContentSchema, contextMenuItemSchema, contextMenuCheckboxItemSchema, contextMenuRadioGroupSchema, contextMenuRadioItemSchema, contextMenuLabelSchema, contextMenuSeparatorSchema, contextMenuShortcutSchema, contextMenuSubSchema, contextMenuSubTriggerSchema, contextMenuSubContentSchema, contextMenuPortalSchema } from "../../../../components/ui/context-menu/context-menu.schema";
import { drawerSchema, drawerTriggerSchema, drawerPortalSchema, drawerCloseSchema, drawerOverlaySchema, drawerContentSchema, drawerHeaderSchema, drawerFooterSchema, drawerTitleSchema, drawerDescriptionSchema, drawerSectionSchema, drawerHandleSchema } from "../../../../components/ui/drawer/drawer.schema";
import { hoverCardSchema, hoverCardTriggerSchema, hoverCardContentSchema } from "../../../../components/ui/hover-card/hover-card.schema";
import { loadingSchema } from "../../../../components/ui/loading/loading.schema";
import { markdownSchema } from "../../../../components/ui/markdown/markdown.schema";
import { navigationMenuSchema, navigationMenuListSchema, navigationMenuItemSchema, navigationMenuTriggerSchema, navigationMenuContentSchema, navigationMenuLinkSchema, navigationMenuIndicatorSchema, navigationMenuViewportSchema } from "../../../../components/ui/navigation-menu/navigation-menu.schema";
import { paginationSchema, paginationContentSchema, paginationItemSchema, paginationLinkSchema, paginationPreviousSchema, paginationNextSchema, paginationEllipsisSchema } from "../../../../components/ui/pagination/pagination.schema";
import { popoverSchema, popoverTriggerSchema, popoverContentSchema, popoverAnchorSchema } from "../../../../components/ui/popover/popover.schema";
import { sheetSchema, sheetTriggerSchema, sheetContentSchema, sheetHeaderSchema, sheetFooterSchema, sheetTitleSchema, sheetDescriptionSchema, sheetCloseSchema } from "../../../../components/ui/sheet/sheet.schema";
import { skeletonLoaderSchema } from "../../../../components/ui/skeleton-loader/skeleton-loader.schema";
import { errorBoundarySchema } from "../../../../components/ui/error-boundary/error-boundary.schema";
import { tableSchema, tableHeaderSchema, tableBodySchema, tableFooterSchema, tableRowSchema, tableHeadSchema, tableCellComponentSchema, tableCaptionSchema } from "../../../../components/ui/table/table.schema";
import { dataTableSchema } from "../../../../components/ui/data-table/data-table.schema";
import { toasterSchema, toastActionSchema } from "../../../../components/ui/toast/toast.schema";
import { keyboardNavigationMenuSchema } from "../../../../components/ui/keyboard-navigation-menu/keyboard-navigation-menu.schema";
import { testimonialSchema } from "../../../../components/ui/testimonial/testimonial.schema";
import { headManagerSchema } from "../../../../components/ui/head-manager/head-manager.schema";
import { heroSchema } from "../../../../components/ui/hero/hero.schema";

/**
 * Registry for display-related UI components
 */
export const displayComponentsRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // Heading
    registry.set("heading", { schema: headingSchema });
    
    // Text
    registry.set("text", { schema: textSchema });
    
    // Image
    registry.set("Image", { schema: imageSchema });
    
    // Badge
    registry.set("Badge", { schema: badgeSchema });
    
    // Alert and sub-components
    registry.set("Alert", { schema: alertSchema });
    registry.set("AlertTitle", { schema: alertTitleSchema });
    registry.set("AlertDescription", { schema: alertDescriptionSchema });
    
    // Card and sub-components
    registry.set("Card", { schema: cardSchema });
    registry.set("CardHeader", { schema: cardHeaderSchema });
    registry.set("CardTitle", { schema: cardTitleSchema });
    registry.set("CardDescription", { schema: cardDescriptionSchema });
    registry.set("CardAction", { schema: cardActionSchema });
    registry.set("CardContent", { schema: cardContentSchema });
    registry.set("CardFooter", { schema: cardFooterSchema });
    registry.set("CardImage", { schema: cardImageSchema });
    
    // Avatar and sub-components
    registry.set("Avatar", { schema: avatarSchema });
    registry.set("AvatarImage", { schema: avatarImageSchema });
    registry.set("AvatarFallback", { schema: avatarFallbackSchema });
    
    // Accordion and sub-components
    registry.set("Accordion", { schema: accordionSchema });
    registry.set("AccordionItem", { schema: accordionItemSchema });
    registry.set("AccordionTrigger", { schema: accordionTriggerSchema });
    registry.set("AccordionContent", { schema: accordionContentSchema });
    
    // AlertDialog and sub-components
    registry.set("AlertDialog", { schema: alertDialogSchema });
    registry.set("AlertDialogTrigger", { schema: alertDialogTriggerSchema });
    registry.set("AlertDialogPortal", { schema: alertDialogPortalSchema });
    registry.set("AlertDialogOverlay", { schema: alertDialogOverlaySchema });
    registry.set("AlertDialogContent", { schema: alertDialogContentSchema });
    registry.set("AlertDialogHeader", { schema: alertDialogHeaderSchema });
    registry.set("AlertDialogFooter", { schema: alertDialogFooterSchema });
    registry.set("AlertDialogTitle", { schema: alertDialogTitleSchema });
    registry.set("AlertDialogDescription", { schema: alertDialogDescriptionSchema });
    registry.set("AlertDialogAction", { schema: alertDialogActionSchema });
    registry.set("AlertDialogCancel", { schema: alertDialogCancelSchema });
    
    // Breadcrumb and sub-components
    registry.set("Breadcrumb", { schema: breadcrumbSchema });
    registry.set("BreadcrumbList", { schema: breadcrumbListSchema });
    registry.set("BreadcrumbItem", { schema: breadcrumbItemSchema });
    registry.set("BreadcrumbLink", { schema: breadcrumbLinkSchema });
    registry.set("BreadcrumbPage", { schema: breadcrumbPageSchema });
    registry.set("BreadcrumbSeparator", { schema: breadcrumbSeparatorSchema });
    registry.set("BreadcrumbEllipsis", { schema: breadcrumbEllipsisSchema });
    
    // Progress
    registry.set("Progress", { schema: progressSchema });
    
    // Separator
    registry.set("Separator", { schema: separatorSchema });
    
    // Tooltip and sub-components
    registry.set("TooltipProvider", { schema: tooltipProviderSchema });
    registry.set("Tooltip", { schema: tooltipSchema });
    registry.set("TooltipTrigger", { schema: tooltipTriggerSchema });
    registry.set("TooltipContent", { schema: tooltipContentSchema });
    
    // Skeleton
    registry.set("Skeleton", { schema: skeletonSchema });
    
    // Blockquote
    registry.set("Blockquote", { schema: blockquoteSchema });
    
    // Chart
    registry.set("Chart", { schema: chartSchema });
    
    // Collapsible and sub-components
    registry.set("Collapsible", { schema: collapsibleSchema });
    registry.set("CollapsibleTrigger", { schema: collapsibleTriggerSchema });
    registry.set("CollapsibleContent", { schema: collapsibleContentSchema });
    
    // Toggle
    registry.set("Toggle", { schema: toggleSchema });
    
    // Tabs and sub-components
    registry.set("Tabs", { schema: tabsSchema });
    registry.set("TabsList", { schema: tabsListSchema });
    registry.set("TabsTrigger", { schema: tabsTriggerSchema });
    registry.set("TabsContent", { schema: tabsContentSchema });
    
    // Dialog and sub-components
    registry.set("Dialog", { schema: dialogSchema });
    registry.set("DialogTrigger", { schema: dialogTriggerSchema });
    registry.set("DialogPortal", { schema: dialogPortalSchema });
    registry.set("DialogOverlay", { schema: dialogOverlaySchema });
    registry.set("DialogContent", { schema: dialogContentSchema });
    registry.set("DialogClose", { schema: dialogCloseSchema });
    registry.set("DialogHeader", { schema: dialogHeaderSchema });
    registry.set("DialogFooter", { schema: dialogFooterSchema });
    registry.set("DialogTitle", { schema: dialogTitleSchema });
    registry.set("DialogDescription", { schema: dialogDescriptionSchema });
    
    // ContextMenu and sub-components
    registry.set("context-menu", { schema: contextMenuSchema });
    registry.set("ContextMenuTrigger", { schema: contextMenuTriggerSchema });
    registry.set("ContextMenuPortal", { schema: contextMenuPortalSchema });
    registry.set("ContextMenuContent", { schema: contextMenuContentSchema });
    registry.set("ContextMenuItem", { schema: contextMenuItemSchema });
    registry.set("ContextMenuCheckboxItem", { schema: contextMenuCheckboxItemSchema });
    registry.set("ContextMenuRadioGroup", { schema: contextMenuRadioGroupSchema });
    registry.set("ContextMenuRadioItem", { schema: contextMenuRadioItemSchema });
    registry.set("ContextMenuLabel", { schema: contextMenuLabelSchema });
    registry.set("ContextMenuSeparator", { schema: contextMenuSeparatorSchema });
    registry.set("ContextMenuShortcut", { schema: contextMenuShortcutSchema });
    registry.set("ContextMenuSub", { schema: contextMenuSubSchema });
    registry.set("ContextMenuSubTrigger", { schema: contextMenuSubTriggerSchema });
    registry.set("ContextMenuSubContent", { schema: contextMenuSubContentSchema });
    
    // Drawer and sub-components
    registry.set("Drawer", { schema: drawerSchema });
    registry.set("DrawerTrigger", { schema: drawerTriggerSchema });
    registry.set("DrawerPortal", { schema: drawerPortalSchema });
    registry.set("DrawerClose", { schema: drawerCloseSchema });
    registry.set("DrawerOverlay", { schema: drawerOverlaySchema });
    registry.set("DrawerContent", { schema: drawerContentSchema });
    registry.set("DrawerHeader", { schema: drawerHeaderSchema });
    registry.set("DrawerFooter", { schema: drawerFooterSchema });
    registry.set("DrawerTitle", { schema: drawerTitleSchema });
    registry.set("DrawerDescription", { schema: drawerDescriptionSchema });
    registry.set("DrawerSection", { schema: drawerSectionSchema });
    registry.set("DrawerHandle", { schema: drawerHandleSchema });
    
    // HoverCard and sub-components
    registry.set("hover-card", { schema: hoverCardSchema });
    registry.set("hover-card-trigger", { schema: hoverCardTriggerSchema });
    registry.set("hover-card-content", { schema: hoverCardContentSchema });
    
    // Loading
    registry.set("loading", { schema: loadingSchema });
    
    // Markdown
    registry.set("markdown", { schema: markdownSchema });
    
    // NavigationMenu and sub-components
    registry.set("NavigationMenu", { schema: navigationMenuSchema });
    registry.set("NavigationMenuList", { schema: navigationMenuListSchema });
    registry.set("NavigationMenuItem", { schema: navigationMenuItemSchema });
    registry.set("NavigationMenuTrigger", { schema: navigationMenuTriggerSchema });
    registry.set("NavigationMenuContent", { schema: navigationMenuContentSchema });
    registry.set("NavigationMenuLink", { schema: navigationMenuLinkSchema });
    registry.set("NavigationMenuIndicator", { schema: navigationMenuIndicatorSchema });
    registry.set("NavigationMenuViewport", { schema: navigationMenuViewportSchema });
    
    // Pagination and sub-components
    registry.set("Pagination", { schema: paginationSchema });
    registry.set("PaginationContent", { schema: paginationContentSchema });
    registry.set("PaginationItem", { schema: paginationItemSchema });
    registry.set("PaginationLink", { schema: paginationLinkSchema });
    registry.set("PaginationPrevious", { schema: paginationPreviousSchema });
    registry.set("PaginationNext", { schema: paginationNextSchema });
    registry.set("PaginationEllipsis", { schema: paginationEllipsisSchema });
    
    // Popover and sub-components
    registry.set("Popover", { schema: popoverSchema });
    registry.set("PopoverTrigger", { schema: popoverTriggerSchema });
    registry.set("PopoverContent", { schema: popoverContentSchema });
    registry.set("PopoverAnchor", { schema: popoverAnchorSchema });
    
    // Sheet and sub-components
    registry.set("Sheet", { schema: sheetSchema });
    registry.set("SheetTrigger", { schema: sheetTriggerSchema });
    registry.set("SheetContent", { schema: sheetContentSchema });
    registry.set("SheetHeader", { schema: sheetHeaderSchema });
    registry.set("SheetFooter", { schema: sheetFooterSchema });
    registry.set("SheetTitle", { schema: sheetTitleSchema });
    registry.set("SheetDescription", { schema: sheetDescriptionSchema });
    registry.set("SheetClose", { schema: sheetCloseSchema });
    
    // SkeletonLoader
    registry.set("SkeletonLoader", { schema: skeletonLoaderSchema });
    
    // ErrorBoundary
    registry.set("ErrorBoundary", { schema: errorBoundarySchema });
    
    // Table and sub-components
    registry.set("Table", { schema: tableSchema });
    registry.set("TableHeader", { schema: tableHeaderSchema });
    registry.set("TableBody", { schema: tableBodySchema });
    registry.set("TableFooter", { schema: tableFooterSchema });
    registry.set("TableRow", { schema: tableRowSchema });
    registry.set("TableHead", { schema: tableHeadSchema });
    registry.set("TableCell", { schema: tableCellComponentSchema });
    registry.set("TableCaption", { schema: tableCaptionSchema });
    
    // DataTable
    registry.set("DataTable", { schema: dataTableSchema });
    
    // Toast and Toaster
    registry.set("Toaster", { schema: toasterSchema });
    registry.set("ToastAction", { schema: toastActionSchema });
    
    // KeyboardNavigationMenu
    registry.set("KeyboardNavigationMenu", { schema: keyboardNavigationMenuSchema });
    
    // Testimonial
    registry.set("Testimonial", { schema: testimonialSchema });
    
    // HeadManager
    registry.set("HeadManager", { schema: headManagerSchema });
    
    // Hero
    registry.set("Hero", { schema: heroSchema });
  },
  
  registerExamples(examples: ComponentExamples): void {
    // Heading examples
    examples.set("heading", [
      {
        type: "heading",
        level: "h1",
        content: "Welcome to Our Platform",
        align: "center",
        weight: "extrabold"
      },
      {
        type: "heading",
        level: "h2",
        content: "Featured Products",
        variant: "primary"
      }
    ]);
    
    // Text examples
    examples.set("text", [
      {
        type: "text",
        text: "This is a paragraph with custom styling.",
        size: "lg",
        weight: "medium"
      },
      {
        type: "text",
        text: "This is a styled span element.",
        element: "span",
        variant: "primary"
      }
    ]);
    
    // Image examples
    examples.set("Image", [
      {
        type: "Image",
        src: "https://example.com/image.jpg",
        alt: "Example image",
        rounded: "md"
      }
    ]);
    
    // Badge examples
    examples.set("Badge", [
      {
        type: "Badge",
        children: "New",
        variant: "default"
      },
      {
        type: "Badge",
        children: "Beta",
        variant: "secondary"
      }
    ]);
    
    // Alert examples
    examples.set("Alert", [
      {
        type: "Alert",
        variant: "default",
        children: [
          {
            type: "AlertTitle",
            children: "Heads up!"
          },
          {
            type: "AlertDescription",
            children: "You can add components to your app using the CLI."
          }
        ]
      },
      {
        type: "Alert",
        variant: "destructive",
        children: "Error: Something went wrong!"
      }
    ]);
    
    // Card examples
    examples.set("Card", [
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Card Title"
              },
              {
                type: "CardDescription",
                children: "Card description goes here"
              }
            ]
          },
          {
            type: "CardContent",
            children: "Card content goes here."
          }
        ]
      }
    ]);
    
    // Avatar examples
    examples.set("Avatar", [
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarImage",
            src: "https://example.com/avatar.jpg",
            alt: "User avatar"
          },
          {
            type: "AvatarFallback",
            children: "JD"
          }
        ]
      }
    ]);
    
    // Accordion examples
    examples.set("Accordion", [
      {
        type: "Accordion",
        accordionType: "single",
        collapsible: true,
        children: [
          {
            type: "AccordionItem",
            value: "item-1",
            children: [
              {
                type: "AccordionTrigger",
                children: "Section 1"
              },
              {
                type: "AccordionContent",
                children: "Content for section 1"
              }
            ]
          }
        ]
      }
    ]);
    
    // AlertDialog examples
    examples.set("AlertDialog", [
      {
        type: "AlertDialog",
        children: [
          {
            type: "AlertDialogTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Open Dialog"
            }
          },
          {
            type: "AlertDialogContent",
            children: [
              {
                type: "AlertDialogHeader",
                children: [
                  {
                    type: "AlertDialogTitle",
                    children: "Are you sure?"
                  },
                  {
                    type: "AlertDialogDescription",
                    children: "This action cannot be undone."
                  }
                ]
              },
              {
                type: "AlertDialogFooter",
                children: [
                  {
                    type: "AlertDialogCancel",
                    children: "Cancel"
                  },
                  {
                    type: "AlertDialogAction",
                    children: "Continue"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
    
    // Breadcrumb examples
    examples.set("Breadcrumb", [
      {
        type: "Breadcrumb",
        items: [
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Electronics", isCurrentPage: true }
        ]
      }
    ]);
    
    // Progress examples
    examples.set("Progress", [
      {
        type: "Progress",
        value: 60
      },
      {
        type: "Progress",
        value: 100,
        className: "w-full"
      }
    ]);
    
    // Separator examples
    examples.set("Separator", [
      {
        type: "Separator",
        orientation: "horizontal",
        decorative: true
      },
      {
        type: "Separator",
        orientation: "vertical",
        decorative: false,
        className: "h-full"
      }
    ]);
    
    // Tooltip examples
    examples.set("Tooltip", [
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Hover me"
            }
          },
          {
            type: "TooltipContent",
            children: "This is a helpful tooltip"
          }
        ]
      }
    ]);
    
    examples.set("TooltipProvider", [
      {
        type: "TooltipProvider",
        delayDuration: 0,
        children: []
      }
    ]);
    
    // Skeleton examples
    examples.set("Skeleton", [
      {
        type: "Skeleton",
        className: "h-4 w-40"
      },
      {
        type: "Skeleton",
        className: "size-12 rounded-full"
      },
      {
        type: "Skeleton",
        className: "h-32 w-full max-w-sm"
      }
    ]);
    
    // Blockquote examples
    examples.set("Blockquote", [
      {
        type: "Blockquote",
        children: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        variant: "default"
      },
      {
        type: "Blockquote",
        children: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        variant: "primary",
        styleVariant: "modern"
      }
    ]);
    
    // Chart examples
    examples.set("Chart", [
      {
        type: "Chart",
        chartType: "bar",
        data: [
          { name: "Jan", desktop: 186, mobile: 80 },
          { name: "Feb", desktop: 305, mobile: 200 },
          { name: "Mar", desktop: 237, mobile: 120 },
          { name: "Apr", desktop: 73, mobile: 190 },
          { name: "May", desktop: 209, mobile: 130 },
          { name: "Jun", desktop: 214, mobile: 140 }
        ],
        config: {
          desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
          mobile: { label: "Mobile", color: "hsl(var(--chart-2))" }
        },
        xAxisDataKey: "name"
      }
    ]);
    
    // Collapsible examples
    examples.set("Collapsible", [
      {
        type: "Collapsible",
        defaultOpen: false,
        children: [
          {
            type: "CollapsibleTrigger",
            children: "Can I use this in my project?"
          },
          {
            type: "CollapsibleContent",
            children: "Yes. Free to use for personal and commercial projects."
          }
        ]
      }
    ]);
    
    // Toggle examples
    examples.set("Toggle", [
      {
        type: "Toggle",
        children: "Toggle me"
      },
      {
        type: "Toggle",
        variant: "outline",
        size: "lg",
        defaultPressed: true,
        children: "Bold"
      },
      {
        type: "Toggle",
        variant: "outline",
        size: "sm",
        disabled: true,
        children: "Disabled"
      }
    ]);
    
    // Tabs examples
    examples.set("Tabs", [
      {
        type: "Tabs",
        defaultValue: "tab1",
        children: [
          {
            type: "TabsList",
            children: [
              {
                type: "TabsTrigger",
                value: "tab1",
                children: "Tab 1"
              },
              {
                type: "TabsTrigger",
                value: "tab2",
                children: "Tab 2"
              },
              {
                type: "TabsTrigger",
                value: "tab3",
                children: "Tab 3"
              }
            ]
          },
          {
            type: "TabsContent",
            value: "tab1",
            children: "Content for tab 1"
          },
          {
            type: "TabsContent",
            value: "tab2",
            children: "Content for tab 2"
          },
          {
            type: "TabsContent",
            value: "tab3",
            children: "Content for tab 3"
          }
        ]
      }
    ]);
    
    // Dialog examples
    examples.set("Dialog", [
      {
        type: "Dialog",
        children: [
          {
            type: "DialogTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Open Dialog"
            }
          },
          {
            type: "DialogContent",
            children: [
              {
                type: "DialogHeader",
                children: [
                  {
                    type: "DialogTitle",
                    children: "Edit Profile"
                  },
                  {
                    type: "DialogDescription",
                    children: "Make changes to your profile here. Click save when you're done."
                  }
                ]
              },
              {
                type: "DialogFooter",
                children: [
                  {
                    type: "Button",
                    variant: "outline",
                    children: "Cancel"
                  },
                  {
                    type: "Button",
                    children: "Save changes"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
    
    // ContextMenu examples
    examples.set("context-menu", [
      {
        type: "context-menu",
        trigger: {
          type: "Box",
          padding: "lg",
          rounded: "md",
          backgroundColor: "card",
          children: "Right-click me"
        },
        items: [
          { type: "item", label: "Back", shortcut: "⌘[" },
          { type: "item", label: "Forward", shortcut: "⌘]", disabled: true },
          { type: "item", label: "Reload", shortcut: "⌘R" },
          { type: "separator" },
          { type: "checkbox", label: "Show Bookmarks Bar", checked: true },
          { type: "checkbox", label: "Show Full URLs" },
          { type: "separator" },
          { type: "label", label: "People" },
          { type: "radio", value: "pedro", label: "Pedro Duarte" },
          { type: "radio", value: "colm", label: "Colm Tuite", checked: true }
        ]
      }
    ]);
    
    // Drawer examples
    examples.set("Drawer", [
      {
        type: "Drawer",
        children: [
          {
            type: "DrawerTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Open Drawer"
            }
          },
          {
            type: "DrawerContent",
            children: [
              {
                type: "DrawerHeader",
                children: [
                  {
                    type: "DrawerTitle",
                    children: "Are you absolutely sure?"
                  },
                  {
                    type: "DrawerDescription",
                    children: "This action cannot be undone."
                  }
                ]
              },
              {
                type: "DrawerFooter",
                children: [
                  {
                    type: "Button",
                    children: "Submit"
                  },
                  {
                    type: "DrawerClose",
                    asChild: true,
                    children: {
                      type: "Button",
                      variant: "outline",
                      children: "Cancel"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
    
    // HoverCard examples
    examples.set("hover-card", [
      {
        type: "hover-card",
        openDelay: 200,
        children: [
          {
            type: "hover-card-trigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "link",
              children: "@nextjs"
            }
          },
          {
            type: "hover-card-content",
            side: "bottom",
            children: [
              {
                type: "flex",
                justify: "between",
                gap: "md",
                children: [
                  {
                    type: "Avatar",
                    children: [
                      {
                        type: "AvatarImage",
                        src: "https://github.com/vercel.png",
                        alt: "@nextjs"
                      },
                      {
                        type: "AvatarFallback",
                        children: "VC"
                      }
                    ]
                  },
                  {
                    type: "Box",
                    children: [
                      {
                        type: "heading",
                        level: "h4",
                        content: "Next.js"
                      },
                      {
                        type: "text",
                        size: "sm",
                        text: "The React Framework – created and maintained by @vercel."
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
    
    // Loading examples
    examples.set("loading", [
      {
        type: "loading",
        variant: "spinner",
        size: "md"
      },
      {
        type: "loading",
        variant: "dots",
        size: "lg",
        text: "Loading..."
      },
      {
        type: "loading",
        variant: "pulse",
        fullScreen: true
      },
      {
        type: "loading",
        variant: "bars",
        size: "sm",
        overlay: true
      }
    ]);
    
    // Markdown examples
    examples.set("markdown", [
      {
        type: "markdown",
        content: "# Hello, World!\n\nThis is a **markdown** example with *italic* text."
      },
      {
        type: "markdown",
        content: "## Features\n\n- Bullet points\n- Code blocks\n- Links\n\n```javascript\nconsole.log('Hello, World!');\n```"
      },
      {
        type: "markdown",
        content: "| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |",
        className: "max-w-2xl"
      }
    ]);
    
    // NavigationMenu examples
    examples.set("NavigationMenu", [
      {
        type: "NavigationMenu",
        children: [
          {
            type: "NavigationMenuList",
            children: [
              {
                type: "NavigationMenuItem",
                children: [
                  {
                    type: "NavigationMenuTrigger",
                    children: "Getting started"
                  },
                  {
                    type: "NavigationMenuContent",
                    children: [
                      {
                        type: "NavigationMenuLink",
                        href: "/docs/introduction",
                        children: "Introduction"
                      },
                      {
                        type: "NavigationMenuLink",
                        href: "/docs/installation",
                        children: "Installation"
                      }
                    ]
                  }
                ]
              },
              {
                type: "NavigationMenuItem",
                children: [
                  {
                    type: "NavigationMenuLink",
                    href: "/docs",
                    children: "Documentation"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
    
    // Pagination examples
    examples.set("Pagination", [
      {
        type: "Pagination",
        children: [
          {
            type: "PaginationContent",
            children: [
              {
                type: "PaginationItem",
                children: {
                  type: "PaginationPrevious",
                  href: "#"
                }
              },
              {
                type: "PaginationItem",
                children: {
                  type: "PaginationLink",
                  href: "#",
                  children: "1"
                }
              },
              {
                type: "PaginationItem",
                children: {
                  type: "PaginationLink",
                  href: "#",
                  isActive: true,
                  children: "2"
                }
              },
              {
                type: "PaginationItem",
                children: {
                  type: "PaginationLink",
                  href: "#",
                  children: "3"
                }
              },
              {
                type: "PaginationItem",
                children: {
                  type: "PaginationEllipsis"
                }
              },
              {
                type: "PaginationItem",
                children: {
                  type: "PaginationNext",
                  href: "#"
                }
              }
            ]
          }
        ]
      }
    ]);
    
    // Popover examples
    examples.set("Popover", [
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Open popover"
            }
          },
          {
            type: "PopoverContent",
            children: [
              {
                type: "heading",
                level: "h4",
                content: "Popover title"
              },
              {
                type: "text",
                text: "This is the popover content."
              }
            ]
          }
        ]
      },
      {
        type: "Popover",
        defaultOpen: false,
        children: [
          {
            type: "PopoverTrigger",
            children: "Click me"
          },
          {
            type: "PopoverContent",
            side: "right",
            align: "start",
            children: "Custom positioned popover"
          }
        ]
      }
    ]);
    
    // Sheet examples
    examples.set("Sheet", [
      {
        type: "Sheet",
        children: [
          {
            type: "SheetTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Open Sheet"
            }
          },
          {
            type: "SheetContent",
            side: "right",
            children: [
              {
                type: "SheetHeader",
                children: [
                  {
                    type: "SheetTitle",
                    children: "Edit Profile"
                  },
                  {
                    type: "SheetDescription",
                    children: "Make changes to your profile here. Click save when you're done."
                  }
                ]
              },
              {
                type: "Text",
                children: "Your profile content goes here."
              },
              {
                type: "SheetFooter",
                children: {
                  type: "Button",
                  children: "Save changes"
                }
              }
            ]
          }
        ]
      },
      {
        type: "Sheet",
        children: [
          {
            type: "SheetTrigger",
            children: "Open from left"
          },
          {
            type: "SheetContent",
            side: "left",
            children: {
              type: "SheetHeader",
              children: {
                type: "SheetTitle",
                children: "Navigation"
              }
            }
          }
        ]
      }
    ]);
    
    // SkeletonLoader examples
    examples.set("SkeletonLoader", [
      {
        type: "SkeletonLoader",
        variant: "text",
        width: "200px",
        height: "20px"
      },
      {
        type: "SkeletonLoader",
        variant: "circular",
        width: "48px",
        height: "48px"
      },
      {
        type: "SkeletonLoader",
        variant: "rectangular",
        width: "300px",
        height: "200px"
      },
      {
        type: "SkeletonLoader",
        count: 3,
        variant: "text",
        height: "16px",
        className: "mb-2"
      }
    ]);
    
    // ErrorBoundary examples
    examples.set("ErrorBoundary", [
      {
        type: "ErrorBoundary",
        children: [
          {
            type: "Box",
            children: "This content is wrapped in an error boundary"
          }
        ]
      },
      {
        type: "ErrorBoundary",
        onError: {
          action: "logError",
          payload: { source: "user-content" }
        },
        children: [
          {
            type: "Text",
            children: "Protected content"
          }
        ]
      }
    ]);
    
    // Table examples
    examples.set("Table", [
      {
        type: "Table",
        variant: "default",
        caption: "A list of recent invoices",
        head: {
          rows: [
            {
              cells: [
                { content: "Invoice", className: "w-[100px]" },
                { content: "Status" },
                { content: "Method" },
                { content: "Amount", align: "right" }
              ]
            }
          ]
        },
        body: {
          rows: [
            {
              cells: [
                { content: "INV001", className: "font-medium" },
                { content: { type: "Badge", children: "Paid", variant: "default" } },
                { content: "Credit Card" },
                { content: "$250.00", align: "right" }
              ]
            },
            {
              cells: [
                { content: "INV002", className: "font-medium" },
                { content: { type: "Badge", children: "Pending", variant: "secondary" } },
                { content: "PayPal" },
                { content: "$150.00", align: "right" }
              ]
            }
          ]
        },
        foot: {
          rows: [
            {
              cells: [
                { content: "Total", colSpan: 3 },
                { content: "$400.00", align: "right" }
              ]
            }
          ]
        }
      }
    ]);
    
    // DataTable examples
    examples.set("DataTable", [
      {
        type: "DataTable",
        columns: [
          { id: "id", header: "ID", accessorKey: "id" },
          { id: "name", header: "Name", accessorKey: "name", enableSorting: true },
          { id: "email", header: "Email", accessorKey: "email" },
          { id: "status", header: "Status", accessorKey: "status", type: "badge" }
        ],
        data: [
          { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" }
        ],
        filterColumn: "name",
        filterPlaceholder: "Filter by name...",
        pagination: {
          enabled: true,
          pageSize: 10
        },
        features: {
          columnFilter: true,
          viewOptions: true,
          selectable: true,
          sortable: true
        }
      }
    ]);
    
    // Toaster examples
    examples.set("Toaster", [
      {
        type: "Toaster",
        position: "bottom-right",
        richColors: true,
        closeButton: true
      }
    ]);
    
    // ToastAction examples
    examples.set("ToastAction", [
      {
        type: "ToastAction",
        variant: "success",
        title: "Success!",
        description: "Your changes have been saved."
      },
      {
        type: "ToastAction",
        variant: "error",
        title: "Error",
        description: "Something went wrong. Please try again.",
        action: {
          label: "Retry",
          onClick: {
            action: "retry",
            payload: { attemptNumber: 2 }
          }
        }
      }
    ]);
    
    // KeyboardNavigationMenu examples
    examples.set("KeyboardNavigationMenu", [
      {
        type: "KeyboardNavigationMenu",
        items: [
          {
            id: "home",
            label: "Home",
            icon: { type: "Icon", name: "home", size: 16 },
            action: "navigateHome"
          },
          {
            id: "products",
            label: "Products",
            icon: { type: "Icon", name: "package", size: 16 },
            submenu: [
              { id: "electronics", label: "Electronics" },
              { id: "clothing", label: "Clothing" },
              { id: "books", label: "Books" }
            ]
          },
          {
            id: "about",
            label: "About",
            icon: { type: "Icon", name: "info", size: 16 },
            shortcut: "⌘A"
          },
          {
            id: "contact",
            label: "Contact",
            icon: { type: "Icon", name: "mail", size: 16 },
            disabled: true
          }
        ],
        orientation: "vertical",
        showShortcuts: true,
        onSelect: "handleMenuSelect"
      }
    ]);
    
    // Testimonial examples
    examples.set("Testimonial", [
      {
        type: "Testimonial",
        author: {
          name: "Jane Doe",
          role: "CEO",
          company: "Acme Corp",
          avatar: "https://picsum.photos/100/100"
        },
        content: "This product has transformed our business. The results speak for themselves.",
        rating: 5,
        variant: "card"
      },
      {
        type: "Testimonial",
        author: {
          name: "John Smith",
          role: "Developer",
          company: "Tech Co"
        },
        content: "Best tool I've ever used. Highly recommend to any developer.",
        rating: 4,
        variant: "minimal"
      },
      {
        type: "Testimonial",
        author: {
          name: "Sarah Johnson",
          role: "Product Manager"
        },
        content: "The intuitive design and powerful features make this an essential tool for our team. We've seen a 40% increase in productivity.",
        rating: 5,
        variant: "large",
        highlight: true,
        date: "January 2024"
      }
    ]);
    
    // HeadManager examples
    examples.set("HeadManager", [
      {
        type: "HeadManager",
        metadata: {
          title: "My App - Home",
          description: "Welcome to our amazing application",
          keywords: ["app", "amazing", "web"],
          ogTitle: "My App",
          ogDescription: "The best app ever",
          twitterCard: "summary"
        },
        titleSuffix: " | My Company"
      },
      {
        type: "HeadManager",
        metadata: {
          title: "Product Page",
          description: "Check out our latest product",
          canonicalUrl: "https://example.com/product",
          favicon: {
            default: "/favicon.ico",
            apple: "/apple-touch-icon.png",
            icon16: "/favicon-16x16.png",
            icon32: "/favicon-32x32.png"
          }
        }
      }
    ]);
    
    // Hero examples
    examples.set("Hero", [
      {
        type: "Hero",
        title: "Welcome to Our Platform",
        subtitle: "INNOVATIVE SOLUTIONS",
        description: "Transform your business with our cutting-edge technology",
        variant: "centered",
        primaryAction: {
          text: "Get Started",
          href: "/signup",
          variant: "default"
        },
        secondaryAction: {
          text: "Learn More",
          href: "/about",
          variant: "outline"
        },
        animated: true,
        backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        type: "Hero",
        title: "Build Something Amazing",
        description: "Join thousands of developers creating the future",
        variant: "left-aligned",
        primaryAction: {
          text: "Start Building",
          onClick: "handleStartBuilding"
        },
        backgroundImage: "https://picsum.photos/1920/1080",
        backgroundOverlay: true,
        parallax: true
      },
      {
        type: "Hero",
        title: "Split Layout Hero",
        subtitle: "FEATURED PRODUCT",
        description: "Experience the power of modern design",
        variant: "split",
        primaryAction: {
          text: "Buy Now",
          href: "/purchase"
        },
        animated: true,
        floatingShapes: true,
        children: {
          type: "Image",
          src: "https://picsum.photos/600/600",
          alt: "Product showcase",
          className: "rounded-lg shadow-xl"
        }
      }
    ]);
  }
};