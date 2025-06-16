# Schema Validation System - Implementation Guide

## Overview

React Jedi uses a runtime schema validation system to ensure JSON specifications are valid before rendering components. This validation happens automatically in development mode and can be explicitly enabled in production through the `validateSpecifications` option.

The schema validation provides:

- **Type safety** - Ensures JSON specs match expected component props
- **Developer experience** - Clear error messages when specs are invalid
- **Documentation** - Schemas serve as a source of truth for component APIs
- **Runtime protection** - Prevents rendering with invalid data

## Current State

- **Total components**: 108 (68 UI + 40 blocks)
- **Components with schemas**: 107 (99.1%)
- **Components missing schemas**: 1 (0.9%)

### Recent Updates

- **Major milestone: All UI components (68/68) now have schemas implemented!**
- **Latest update**: Added 3 more block component schemas: Testimonial, Timeline, and Typewriter Text - completing 39/40 block components!
- **Block components progress**: 39/40 schemas implemented (97.5%)
- Previously added: Photo Gallery, Portfolio Case Studies, Process Steps, Product Showcase, Restaurant Menu, Photo Flip Card, Page Section, Page Hero Header, Newsletter Signup, Map, Features, Icon, Job Listings, Latest News, Location Hours, Contact Form, Cookie Consent Banner, Error Page, Event Listings, Feature Card, Announcement Bar, Blog Post Detail, Blog Post Grid, Brand Logo Bar, Carousel, Footer, Call to Action, FAQ, Contact Form Block, and Pricing Table
- Implemented modular registry system for better scalability
- Organized schemas into logical groups (form, layout, display, blocks)
- Refactored component-validator.ts from 600+ lines to 458 lines
- All schemas properly registered and passing validation
- Recent block completions: service-list, sidebar (+ SidebarProvider, SidebarInset, SidebarTrigger), social-share-bar, stat-block, team-grid, testimonial, timeline, typewriter-text

## Registry System Architecture

The schema validation system uses a modular registry pattern for better scalability:

```
src/lib/validation/
├── component-validator.ts    # Core validation logic (458 lines)
├── registry/
│   ├── index.ts             # Main registry singleton
│   ├── README.md            # Registry documentation
│   ├── ui/                  # UI component registries
│   │   ├── index.ts
│   │   ├── form-components.ts
│   │   ├── layout-components.ts
│   │   └── display-components.ts
│   └── blocks/              # Block component registries
│       ├── index.ts
│       └── content-blocks.ts
└── types/
    └── registry.types.ts    # TypeScript interfaces

```

### Benefits:

- **Modular**: Components grouped by function
- **Scalable**: Easy to add components without bloating files
- **Type-safe**: Full TypeScript support
- **Lazy-loaded**: Registry initializes on first use

## How Schema Validation Works

### 1. Schema Definition

Each component has a corresponding `.schema.ts` file that exports a Zod schema:

```typescript
// Example: box.schema.ts
import { z } from "zod";
import { componentSchema } from "@/lib/parser/schemas/base/component.schema";

export const boxSchema = componentSchema.extend({
  type: z.literal("Box"),
  as: z.string().optional(),
  display: z.string().optional(),
  // ... other props
});
```

### 2. Schema Registration (Updated)

Schemas are now registered using a modular registry system:

```typescript
// In the appropriate registry file (e.g., form-components.ts)
export const formComponentsRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    registry.set("Button", { schema: buttonSchema });
    registry.set("Input", { schema: inputSchema });
    // ... other schemas
  },

  registerExamples(examples: ComponentExamples): void {
    examples.set("Button", [
      /* examples */
    ]);
    // ... other examples
  },
};
```

The registry system organizes components into logical groups:

- **UI Components**:
  - `form-components.ts` - Button, Input, Label, Select, Switch
  - `layout-components.ts` - Box, Flex, Container
  - `display-components.ts` - Text, Heading, Image, Badge, Alert, Card, Avatar
- **Block Components**:
  - `content-blocks.ts` - Header (and future block components)

### 3. Runtime Validation

During render, if validation is enabled:

1. The validation pipeline checks the JSON spec against registered schemas
2. If validation fails, an error is thrown with details
3. The error boundary catches and displays validation errors

## Schema Structure Pattern

All component schemas follow this pattern:

1. **Import base schema**: All components extend `componentSchema` from base
2. **Define type literal**: Each schema must have a `type` field matching the component name
3. **Add component-specific props**: Define all accepted props with proper types
4. **Use appropriate Zod types**:
   - `z.string()` for text values
   - `z.number()` for numeric values
   - `z.boolean()` for booleans
   - `z.array()` for arrays
   - `z.object()` for nested objects
   - `z.union()` for multiple types
   - `z.enum()` for specific values
   - `.optional()` for optional props
   - `.default()` for default values

## Implementation Guidelines

### 1. Study Existing Schemas

Look at these reference schemas:

- `box.schema.ts` - Layout and styling props
- `text.schema.ts` - Typography props
- `image.schema.ts` - Media props
- `header.schema.ts` - Complex block component

### 2. Analyze Component Props

For each component:

1. Check the component's TypeScript interface/props
2. Look at the component's Storybook stories for usage examples
3. Identify all accepted props and their types
4. Note which props are required vs optional

### 3. Create Schema File

1. Create `[component-name].schema.ts` in the component directory
2. Import necessary dependencies
3. Define the schema extending `componentSchema`
4. Export the schema

### 4. Register Schema (Updated)

Add the schema to the appropriate registry file:

1. Determine which registry the component belongs to:

   - Form components → `src/lib/validation/registry/ui/form-components.ts`
   - Layout components → `src/lib/validation/registry/ui/layout-components.ts`
   - Display components → `src/lib/validation/registry/ui/display-components.ts`
   - Block components → `src/lib/validation/registry/blocks/content-blocks.ts`

2. Import the schema in the registry file
3. Add it to both `registerSchemas()` and `registerExamples()` methods

Example:

```typescript
import { myComponentSchema } from "../../../../components/ui/my-component/my-component.schema";

export const formComponentsRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // ... existing registrations
    registry.set("MyComponent", { schema: myComponentSchema });
  },

  registerExamples(examples: ComponentExamples): void {
    // ... existing examples
    examples.set("MyComponent", [{ type: "MyComponent" /* example props */ }]);
  },
};
```

### 5. Test Schema

1. Create a test JSON spec using the component
2. Run the app with `validateSpecifications: true`
3. Verify validation passes for valid specs
4. Verify validation fails with clear errors for invalid specs

## Component Implementation Status

### UI Components (src/components/ui/)

**All UI components now have schemas implemented! 🎉**

| Component       | Schema File               | Status         |
| --------------- | ------------------------- | -------------- |
| accordion       | accordion.schema.ts       | ✅ Complete    |
| alert           | alert.schema.ts           | ✅ Complete    |
| alert-dialog    | alert-dialog.schema.ts    | ✅ Complete    |
| aspect-ratio    | aspect-ratio.schema.ts    | ✅ Complete    |
| avatar          | avatar.schema.ts          | ✅ Complete    |
| badge           | badge.schema.ts           | ✅ Complete    |
| blockquote      | blockquote.schema.ts      | ✅ Complete    |
| box             | box.schema.ts             | ✅ Complete    |
| breadcrumb      | breadcrumb.schema.ts      | ✅ Complete    |
| button          | button.schema.ts          | ✅ Complete    |
| calendar        | calendar.schema.ts        | ✅ Complete    |
| card            | card.schema.ts            | ✅ Complete    |
| center          | center.schema.ts          | ✅ Complete    |
| chart           | chart.schema.ts           | ✅ Complete    |
| checkbox        | checkbox.schema.ts        | ✅ Complete    |
| collapsible     | collapsible.schema.ts     | ✅ Complete    |
| combobox        | combobox.schema.ts        | ✅ Complete    |
| command         | command.schema.ts         | ✅ Complete    |
| container       | container.schema.ts       | ✅ Complete    |
| context-menu    | context-menu.schema.ts    | ✅ Complete    |
| data-table      | data-table.schema.ts      | ✅ Complete    |
| date-picker     | date-picker.schema.ts     | ✅ Complete    |
| dialog          | dialog.schema.ts          | ✅ Complete    |
| drawer          | drawer.schema.ts          | ✅ Complete    |
| dropdown-menu   | dropdown-menu.schema.ts   | ✅ Complete    |
| error-boundary  | error-boundary.schema.ts  | ✅ Complete    |
| flex            | flex.schema.ts            | ✅ Complete    |
| form            | form.schema.ts            | ✅ Complete    |
| grid            | grid.schema.ts            | ✅ Complete    |
| group           | group.schema.ts           | ✅ Complete    |
| head-manager    | head-manager.schema.ts    | ✅ Complete    |
| heading         | heading.schema.ts         | ✅ Complete    |
| hero            | hero.schema.ts            | ✅ Complete    |
| hover-card      | hover-card.schema.ts      | ✅ Complete    |
| image           | image.schema.ts           | ✅ Complete    |
| input           | input.schema.ts           | ✅ Complete    |
| input-otp       | input-otp.schema.ts       | ✅ Complete    |
| keyboard-navigation-menu | keyboard-navigation-menu.schema.ts | ✅ Complete |
| label           | label.schema.ts           | ✅ Complete    |
| loading         | loading.schema.ts         | ✅ Complete    |
| markdown        | markdown.schema.ts        | ✅ Complete    |
| masonry         | masonry.schema.ts         | ✅ Complete    |
| navigation-menu | navigation-menu.schema.ts | ✅ Complete    |
| pagination      | pagination.schema.ts      | ✅ Complete    |
| popover         | popover.schema.ts         | ✅ Complete    |
| progress        | progress.schema.ts        | ✅ Complete    |
| radio-group     | radio-group.schema.ts     | ✅ Complete    |
| resizable       | resizable.schema.ts       | ✅ Complete    |
| scroll-area     | scroll-area.schema.ts     | ✅ Complete    |
| select          | select.schema.ts          | ✅ Complete    |
| separator       | separator.schema.ts       | ✅ Complete    |
| sheet           | sheet.schema.ts           | ✅ Complete    |
| simple-grid     | simple-grid.schema.ts     | ✅ Complete    |
| skeleton        | skeleton.schema.ts        | ✅ Complete    |
| skeleton-loader | skeleton-loader.schema.ts | ✅ Complete    |
| slider          | slider.schema.ts          | ✅ Complete    |
| spacer          | spacer.schema.ts          | ✅ Complete    |
| stack           | stack.schema.ts           | ✅ Complete    |
| switch          | switch.schema.ts          | ✅ Complete    |
| table           | table.schema.ts           | ✅ Complete    |
| tabs            | tabs.schema.ts            | ✅ Complete    |
| testimonial     | testimonial.schema.ts     | ✅ Complete    |
| text            | text.schema.ts            | ✅ Complete    |
| textarea        | textarea.schema.ts        | ✅ Complete    |
| toast           | toast.schema.ts           | ✅ Complete    |
| toggle          | toggle.schema.ts          | ✅ Complete    |
| toggle-group    | toggle-group.schema.ts    | ✅ Complete    |
| tooltip         | tooltip.schema.ts         | ✅ Complete    |

### Block Components (src/components/blocks/)

| Component              | Schema File                      | Status         |
| ---------------------- | -------------------------------- | -------------- |
| announcement-bar       | announcement-bar.schema.ts       | ✅ Complete    |
| blog-post-detail       | blog-post-detail.schema.ts       | ✅ Complete    |
| blog-post-grid         | blog-post-grid.schema.ts         | ✅ Complete    |
| brand-logo-bar         | brand-logo-bar.schema.ts         | ✅ Complete    |
| call-to-action         | call-to-action.schema.ts         | ✅ Complete    |
| carousel               | carousel.schema.ts               | ✅ Complete    |
| contact-form           | contact-form.schema.ts           | ✅ Complete    |
| contact-form-block     | contact-form-block.schema.ts     | ✅ Complete    |
| cookie-consent-banner  | cookie-consent-banner.schema.ts  | ✅ Complete    |
| error-page             | error-page.schema.ts             | ✅ Complete    |
| event-listings         | event-listings.schema.ts         | ✅ Complete    |
| faq                    | faq.schema.ts                    | ✅ Complete    |
| feature-card           | feature-card.schema.ts           | ✅ Complete    |
| features               | features.schema.ts               | ✅ Complete    |
| footer                 | footer.schema.ts                 | ✅ Complete    |
| header                 | header.schema.ts                 | ✅ Complete    |
| icon                   | icon.schema.ts                   | ✅ Complete    |
| job-listings           | job-listings.schema.ts           | ✅ Complete    |
| latest-news            | latest-news.schema.ts            | ✅ Complete    |
| location-hours         | location-hours.schema.ts         | ✅ Complete    |
| map                    | map.schema.ts                    | ✅ Complete    |
| newsletter-signup      | newsletter-signup.schema.ts      | ✅ Complete    |
| page-hero-header       | page-hero-header.schema.ts       | ✅ Complete    |
| page-section           | page-section.schema.ts           | ✅ Complete    |
| photo-flip-card        | photo-flip-card.schema.ts        | ✅ Complete    |
| photo-gallery          | photo-gallery.schema.ts          | ✅ Complete    |
| portfolio-case-studies | portfolio-case-studies.schema.ts | ✅ Complete    |
| pricing-table          | pricing-table.schema.ts          | ✅ Complete    |
| process-steps          | process-steps.schema.ts          | ✅ Complete    |
| product-showcase       | product-showcase.schema.ts       | ✅ Complete    |
| restaurant-menu        | restaurant-menu.schema.ts        | ✅ Complete    |
| service-list           | service-list.schema.ts           | ✅ Complete    |
| sidebar                | sidebar.schema.ts                | ✅ Complete    |
| social-share-bar       | social-share-bar.schema.ts       | ✅ Complete    |
| stat-block             | stat-block.schema.ts             | ✅ Complete    |
| team-grid              | team-grid.schema.ts              | ✅ Complete    |
| testimonial            | testimonial.schema.ts            | ✅ Complete    |
| timeline               | timeline.schema.ts               | ✅ Complete    |
| typewriter-text        | typewriter-text.schema.ts        | ✅ Complete    |

## Progress Summary

- **Total**: 108 components (68 UI + 40 blocks)
- **Complete**: 107 (99.1%)
  - UI Components: 68/68 (100%) ✅
  - Block Components: 39/40 (97.5%)
- **Remaining**: 1 (0.9%)

### Remaining Block Components

Only 1 block component still needs a schema. Need to identify which component is still missing from the original count of 40 block components.

## Common Prop Patterns

When implementing schemas, watch for these common patterns:

### Layout Props

- `padding`, `margin` (spacing)
- `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- `display`, `position`, `overflow`
- `flexDirection`, `justifyContent`, `alignItems`, `gap`

### Styling Props

- `backgroundColor`, `textColor`, `borderColor`
- `borderWidth`, `borderRadius`, `rounded`
- `shadow`, `opacity`
- `transition`, `transform`, `scale`

### Typography Props

- `fontSize`, `fontWeight`, `fontFamily`
- `textAlign`, `lineHeight`, `letterSpacing`
- `textTransform`, `textDecoration`

### Interactive Props

- `onClick`, `onHover`, `onFocus`
- `disabled`, `loading`, `active`
- `href`, `target`, `rel`

### Data Props

- `value`, `defaultValue`
- `placeholder`, `label`
- `options`, `items`, `data`

### Component-Specific Props

Each component will have unique props based on its functionality. Always check the component implementation and TypeScript interface.

## Prompt for Schema Implementation

Use this prompt to implement schemas systematically:

```
I need to implement schema validation for React Jedi components. Please help me create schemas for the next batch of components.

Here's what you need to do:
1. Look at the SCHEMA-VALIDATION.md file for context and guidelines
2. Study the existing schemas in the registry files as references
3. For each component:
   - Analyze the component's TypeScript props interface
   - Check the Storybook stories for usage examples
   - Create a [component-name].schema.ts file in the component directory
   - Define the Zod schema extending baseComponentSchema
   - Add the schema to the appropriate registry file:
     * Form components → src/lib/validation/registry/ui/form-components.ts
     * Layout components → src/lib/validation/registry/ui/layout-components.ts
     * Display components → src/lib/validation/registry/ui/display-components.ts
     * Block components → src/lib/validation/registry/blocks/content-blocks.ts
4. Create schemas for 5 components at a time
5. After creating the schemas, verify they're properly registered by running typecheck, lint, test

Make sure each schema:
- Has the correct type literal matching the component name
- Includes all props from the component interface
- Uses appropriate Zod types and validations
- Marks optional props with .optional()
- Follows the existing schema patterns
```
