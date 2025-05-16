# Component Reference

This section provides comprehensive documentation for all components available in React Jedi. Each component is designed to work seamlessly with the JSON specification system while providing maximum flexibility and performance.

## Component Categories

### Layout Components

Essential components for structuring and organizing content:

- [AspectRatio](./layout/aspect-ratio.md) - Maintains aspect ratio for content
- [Box](./layout/box.md) - Basic building block for layouts
- [Center](./layout/center.md) - Centers content horizontally and vertically
- [Container](./layout/container.md) - Responsive container with max-width
- [Flex](./layout/flex.md) - Flexible box layout
- [Grid](./layout/grid.md) - CSS Grid layout system
- [Group](./layout/group.md) - Inline elements with consistent spacing
- [Masonry](./layout/masonry.md) - Pinterest-style grid layout
- [SimpleGrid](./layout/simple-grid.md) - Responsive grid with equal cells
- [Spacer](./layout/spacer.md) - Flexible spacing component
- [Stack](./layout/stack.md) - Vertical or horizontal stacking

### Typography Components

Components for text content and formatting:

- [BlockQuote](./typography/blockquote.md) - Styled quotation blocks
- [Heading](./typography/heading.md) - Headings (h1-h6)
- [Text](./typography/text.md) - Paragraph and span text

### UI Components

Core interface components:

- [Alert](./ui/alert.md) - Status and notification messages
- [AlertDialog](./ui/alert-dialog.md) - Confirmation dialogs
- [Avatar](./ui/avatar.md) - User avatars with fallbacks
- [Badge](./ui/badge.md) - Status indicators and labels
- [Button](./ui/button.md) - Interactive buttons
- [Card](./ui/card.md) - Content containers
- [Image](./ui/image.md) - Responsive images
- [Progress](./ui/progress.md) - Progress indicators
- [Separator](./ui/separator.md) - Visual dividers
- [Skeleton](./ui/skeleton.md) - Loading placeholders

### Form Components

Interactive form elements:

- [Checkbox](./form/checkbox.md) - Checkbox inputs
- [Form](./form/form.md) - Form container with validation
- [Input](./form/input.md) - Text input fields
- [InputOTP](./form/input-otp.md) - One-time password input
- [Label](./form/label.md) - Form field labels
- [RadioGroup](./form/radio-group.md) - Radio button groups
- [Select](./form/select.md) - Dropdown selection
- [Slider](./form/slider.md) - Range slider
- [Switch](./form/switch.md) - Toggle switches
- [Textarea](./form/textarea.md) - Multi-line text input

### Interactive Components

Advanced interactive components:

- [Accordion](./interactive/accordion.md) - Collapsible content sections
- [Calendar](./interactive/calendar.md) - Date picker calendar
- [Carousel](./interactive/carousel.md) - Image/content carousel
- [Chart](./interactive/chart.md) - Data visualization
- [Collapsible](./interactive/collapsible.md) - Collapsible content
- [Command](./interactive/command.md) - Command palette
- [ContextMenu](./interactive/context-menu.md) - Right-click menus
- [DataTable](./interactive/data-table.md) - Interactive data tables
- [DatePicker](./interactive/date-picker.md) - Date selection
- [Dialog](./interactive/dialog.md) - Modal dialogs
- [Drawer](./interactive/drawer.md) - Slide-out panels
- [DropdownMenu](./interactive/dropdown-menu.md) - Dropdown menus
- [HoverCard](./interactive/hover-card.md) - Hover tooltips
- [Menubar](./interactive/menubar.md) - Application menu bars
- [NavigationMenu](./interactive/navigation-menu.md) - Navigation menus
- [Popover](./interactive/popover.md) - Floating content
- [Resizable](./interactive/resizable.md) - Resizable panels
- [ScrollArea](./interactive/scroll-area.md) - Custom scrollbars
- [Sheet](./interactive/sheet.md) - Slide-out sheets
- [Sidebar](./interactive/sidebar.md) - Application sidebars
- [Tabs](./interactive/tabs.md) - Tabbed content
- [Toast](./interactive/toast.md) - Toast notifications
- [Toggle](./interactive/toggle.md) - Toggle buttons
- [ToggleGroup](./interactive/toggle-group.md) - Toggle button groups
- [Tooltip](./interactive/tooltip.md) - Hover tooltips

### Special Components

Purpose-built components for specific use cases:

- [Breadcrumb](./special/breadcrumb.md) - Navigation breadcrumbs
- [CallToAction](./special/call-to-action.md) - CTA sections
- [Combobox](./special/combobox.md) - Searchable select
- [FeatureCard](./special/feature-card.md) - Feature highlights
- [Footer](./special/footer.md) - Page footers
- [Hero](./special/hero.md) - Hero sections
- [Pagination](./special/pagination.md) - Page navigation
- [PricingTable](./special/pricing-table.md) - Pricing plans
- [Table](./special/table.md) - Data tables
- [Testimonial](./special/testimonial.md) - Customer testimonials

## Component Properties

All components share common properties from `BaseComponentSpec`:

```typescript
interface BaseComponentSpec {
  type: string;
  id?: string;
  styleExtend?: Record<string, unknown>;
  styleOverrides?: Record<string, unknown>;
  conditions?: Condition[];
  actions?: Record<string, Action>;
  state?: StateConfig;
}
```

## Component Patterns

### 1. Basic Usage

```json
{
  "type": "Button",
  "children": "Click Me"
}
```

### 2. With Styling

```json
{
  "type": "Button",
  "variant": "primary",
  "size": "lg",
  "styleExtend": {
    "backgroundColor": "blue-500",
    "borderRadius": "lg"
  }
}
```

### 3. With Actions

```json
{
  "type": "Button",
  "children": "Toggle",
  "actions": {
    "onClick": {
      "type": "toggleState",
      "state": "local",
      "key": "isOpen"
    }
  }
}
```

### 4. Conditional Rendering

```json
{
  "type": "Button",
  "children": "Submit",
  "conditions": [
    {
      "when": {
        "state": "local.formValid",
        "is": true
      },
      "disabled": false
    },
    {
      "when": {
        "state": "local.formValid",
        "is": false
      },
      "disabled": true
    }
  ]
}
```

## Best Practices

1. **Use semantic component types** - Choose the most appropriate component for your use case
2. **Leverage theme tokens** - Use theme values for consistency
3. **Optimize for performance** - Minimize state updates and re-renders
4. **Test edge cases** - Ensure components handle all specification variants
5. **Document usage patterns** - Create examples for common scenarios

## Next Steps

- Explore individual component documentation for detailed APIs
- Learn about [Theme Integration](../theme.md) for consistent styling
- Understand [State Management](../state.md) for interactive features
- Review [Performance Guidelines](../performance.md) for optimization