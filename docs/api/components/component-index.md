# Component Index

Complete listing of all React Jedi components with their types and basic properties.

## Layout Components

### Box
- **Type**: `"Box"`
- **Purpose**: Basic building block for layouts
- **Key Props**: `as`, `padding`, `margin`, `display`, `position`

### Container
- **Type**: `"Container"`
- **Purpose**: Responsive container with max-width
- **Key Props**: `maxWidth`, `padding`, `centerContent`

### Flex
- **Type**: `"Flex"`
- **Purpose**: Flexbox layout
- **Key Props**: `direction`, `justify`, `align`, `gap`, `wrap`

### Grid
- **Type**: `"Grid"`
- **Purpose**: CSS Grid layout
- **Key Props**: `columns`, `rows`, `gap`, `areas`

### Stack
- **Type**: `"Stack"`
- **Purpose**: Vertical or horizontal stacking
- **Key Props**: `direction`, `spacing`, `align`

### Center
- **Type**: `"Center"`
- **Purpose**: Centers content horizontally and vertically
- **Key Props**: `width`, `height`

### AspectRatio
- **Type**: `"AspectRatio"`
- **Purpose**: Maintains aspect ratio for content
- **Key Props**: `ratio`

### SimpleGrid
- **Type**: `"SimpleGrid"`
- **Purpose**: Responsive grid with equal cells
- **Key Props**: `columns`, `spacing`, `minChildWidth`

### Masonry
- **Type**: `"Masonry"`
- **Purpose**: Pinterest-style grid layout
- **Key Props**: `columns`, `spacing`

### Group
- **Type**: `"Group"`
- **Purpose**: Inline elements with spacing
- **Key Props**: `spacing`, `align`

### Spacer
- **Type**: `"Spacer"`
- **Purpose**: Flexible spacing component
- **Key Props**: `size`, `axis`

## Typography Components

### Heading
- **Type**: `"Heading"`
- **Purpose**: Headings (h1-h6)
- **Key Props**: `level`, `size`, `weight`

### Text
- **Type**: `"Text"`
- **Purpose**: Paragraph and span text
- **Key Props**: `as`, `size`, `weight`, `color`

### BlockQuote
- **Type**: `"BlockQuote"`
- **Purpose**: Styled quotation blocks
- **Key Props**: `cite`, `footer`

## UI Components

### Button
- **Type**: `"Button"`
- **Purpose**: Interactive buttons
- **Key Props**: `variant`, `size`, `disabled`

### Card
- **Type**: `"Card"`
- **Purpose**: Content containers
- **Key Props**: `padding`, `shadow`, `border`

### Badge
- **Type**: `"Badge"`
- **Purpose**: Status indicators
- **Key Props**: `variant`, `size`

### Avatar
- **Type**: `"Avatar"`
- **Purpose**: User avatars
- **Key Props**: `src`, `fallback`, `size`

### Image
- **Type**: `"Image"`
- **Purpose**: Responsive images
- **Key Props**: `src`, `alt`, `loading`, `aspectRatio`

### Separator
- **Type**: `"Separator"`
- **Purpose**: Visual dividers
- **Key Props**: `orientation`, `decorative`

### Skeleton
- **Type**: `"Skeleton"`
- **Purpose**: Loading placeholders
- **Key Props**: `width`, `height`, `animation`

### Progress
- **Type**: `"Progress"`
- **Purpose**: Progress indicators
- **Key Props**: `value`, `max`, `variant`

### Alert
- **Type**: `"Alert"`
- **Purpose**: Status messages
- **Key Props**: `variant`, `title`, `description`

### AlertDialog
- **Type**: `"AlertDialog"`
- **Purpose**: Confirmation dialogs
- **Key Props**: `trigger`, `title`, `description`

## Form Components

### Form
- **Type**: `"Form"`
- **Purpose**: Form container
- **Key Props**: `method`, `action`, `validation`

### Input
- **Type**: `"Input"`
- **Purpose**: Text input fields
- **Key Props**: `type`, `placeholder`, `value`

### Select
- **Type**: `"Select"`
- **Purpose**: Dropdown selection
- **Key Props**: `options`, `placeholder`, `value`

### Checkbox
- **Type**: `"Checkbox"`
- **Purpose**: Checkbox inputs
- **Key Props**: `checked`, `label`

### RadioGroup
- **Type**: `"RadioGroup"`
- **Purpose**: Radio button groups
- **Key Props**: `value`, `options`

### Switch
- **Type**: `"Switch"`
- **Purpose**: Toggle switches
- **Key Props**: `checked`, `label`

### Slider
- **Type**: `"Slider"`
- **Purpose**: Range sliders
- **Key Props**: `value`, `min`, `max`, `step`

### Textarea
- **Type**: `"Textarea"`
- **Purpose**: Multi-line text input
- **Key Props**: `rows`, `placeholder`, `value`

### Label
- **Type**: `"Label"`
- **Purpose**: Form field labels
- **Key Props**: `htmlFor`, `required`

### InputOTP
- **Type**: `"InputOTP"`
- **Purpose**: One-time password input
- **Key Props**: `length`, `pattern`

## Interactive Components

### Accordion
- **Type**: `"Accordion"`
- **Purpose**: Collapsible sections
- **Key Props**: `type`, `items`, `defaultValue`

### Tabs
- **Type**: `"Tabs"`
- **Purpose**: Tabbed content
- **Key Props**: `defaultValue`, `orientation`

### Dialog
- **Type**: `"Dialog"`
- **Purpose**: Modal dialogs
- **Key Props**: `trigger`, `content`

### Drawer
- **Type**: `"Drawer"`
- **Purpose**: Slide-out panels
- **Key Props**: `position`, `trigger`

### Sheet
- **Type**: `"Sheet"`
- **Purpose**: Bottom/side sheets
- **Key Props**: `side`, `trigger`

### Popover
- **Type**: `"Popover"`
- **Purpose**: Floating content
- **Key Props**: `trigger`, `content`, `placement`

### Tooltip
- **Type**: `"Tooltip"`
- **Purpose**: Hover tooltips
- **Key Props**: `content`, `delay`

### HoverCard
- **Type**: `"HoverCard"`
- **Purpose**: Hover information cards
- **Key Props**: `trigger`, `content`

### DropdownMenu
- **Type**: `"DropdownMenu"`
- **Purpose**: Dropdown menus
- **Key Props**: `trigger`, `items`

### ContextMenu
- **Type**: `"ContextMenu"`
- **Purpose**: Right-click menus
- **Key Props**: `items`

### NavigationMenu
- **Type**: `"NavigationMenu"`
- **Purpose**: Navigation menus
- **Key Props**: `items`, `orientation`

### Menubar
- **Type**: `"Menubar"`
- **Purpose**: Application menu bars
- **Key Props**: `items`

### Command
- **Type**: `"Command"`
- **Purpose**: Command palette
- **Key Props**: `items`, `placeholder`

### Collapsible
- **Type**: `"Collapsible"`
- **Purpose**: Collapsible content
- **Key Props**: `defaultOpen`, `trigger`

### ScrollArea
- **Type**: `"ScrollArea"`
- **Purpose**: Custom scrollbars
- **Key Props**: `height`, `width`

### Resizable
- **Type**: `"Resizable"`
- **Purpose**: Resizable panels
- **Key Props**: `direction`, `defaultSize`

### Toggle
- **Type**: `"Toggle"`
- **Purpose**: Toggle buttons
- **Key Props**: `pressed`, `variant`

### ToggleGroup
- **Type**: `"ToggleGroup"`
- **Purpose**: Toggle button groups
- **Key Props**: `type`, `value`

### Calendar
- **Type**: `"Calendar"`
- **Purpose**: Date picker calendar
- **Key Props**: `value`, `mode`

### DatePicker
- **Type**: `"DatePicker"`
- **Purpose**: Date selection
- **Key Props**: `value`, `format`

### DataTable
- **Type**: `"DataTable"`
- **Purpose**: Data tables
- **Key Props**: `columns`, `data`, `pagination`

### Carousel
- **Type**: `"Carousel"`
- **Purpose**: Content carousel
- **Key Props**: `items`, `autoPlay`

### Chart
- **Type**: `"Chart"`
- **Purpose**: Data visualization
- **Key Props**: `type`, `data`, `options`

### Toast
- **Type**: `"Toast"`
- **Purpose**: Toast notifications
- **Key Props**: `message`, `duration`

### Sidebar
- **Type**: `"Sidebar"`
- **Purpose**: Application sidebars
- **Key Props**: `collapsible`, `defaultCollapsed`

## Special Components

### Hero
- **Type**: `"Hero"`
- **Purpose**: Hero sections
- **Key Props**: `title`, `subtitle`, `image`

### Footer
- **Type**: `"Footer"`
- **Purpose**: Page footers
- **Key Props**: `sections`, `copyright`

### FeatureCard
- **Type**: `"FeatureCard"`
- **Purpose**: Feature highlights
- **Key Props**: `icon`, `title`, `description`

### Testimonial
- **Type**: `"Testimonial"`
- **Purpose**: Customer testimonials
- **Key Props**: `quote`, `author`, `role`

### PricingTable
- **Type**: `"PricingTable"`
- **Purpose**: Pricing plans
- **Key Props**: `plans`, `features`

### CallToAction
- **Type**: `"CallToAction"`
- **Purpose**: CTA sections
- **Key Props**: `title`, `description`, `actions`

### Table
- **Type**: `"Table"`
- **Purpose**: Basic tables
- **Key Props**: `headers`, `rows`

### Breadcrumb
- **Type**: `"Breadcrumb"`
- **Purpose**: Navigation breadcrumbs
- **Key Props**: `items`, `separator`

### Pagination
- **Type**: `"Pagination"`
- **Purpose**: Page navigation
- **Key Props**: `total`, `current`, `pageSize`

### Combobox
- **Type**: `"Combobox"`
- **Purpose**: Searchable select
- **Key Props**: `options`, `searchable`