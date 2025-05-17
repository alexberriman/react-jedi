# React Jedi Examples - Styling & Spacing Guidelines

This document defines the standardized spacing and typography guidelines for the React Jedi examples app.

## Typography Components

Use the centralized typography components for consistency:

```tsx
import { Heading, Text, spacing, padding } from "../../components/ui";
```

## Typography Scale

### Headings

| Level | Component | Usage |
|-------|-----------|-------|
| Page Title | `<Heading as="h1" size="page">` | Main page titles |
| Section | `<Heading as="h2" size="section">` | Major section headings |
| Subsection | `<Heading as="h3" size="subsection">` | Subsection headings |
| Card | `<Heading as="h3" size="card">` | Component cards, feature titles |
| Small | `<Heading as="h4" size="small">` | Minor headings |

### Text

| Variant | Component | Usage |
|---------|-----------|-------|
| Body | `<Text size="base" variant="default">` | Standard body text |
| Muted | `<Text size="base" variant="muted">` | Secondary/muted text |
| Description | `<Text size="lg" variant="description">` | Page descriptions |
| Small | `<Text size="sm" variant="muted">` | Fine print, metadata |

## Spacing Scale

Use the predefined spacing constants for consistent margins:

```tsx
export const spacing = {
  section: "mb-20",    // Between major sections
  subsection: "mb-12", // Between subsections
  heading: "mb-8",     // After section headings
  paragraph: "mb-6",   // Between paragraphs
  small: "mb-4",       // Small spacing
  xs: "mb-2",          // Extra small spacing
  none: "mb-0",        // No spacing
};
```

## Padding Scale

Use the predefined padding constants:

```tsx
export const padding = {
  page: "py-12",       // Page-level vertical padding
  section: "py-8",     // Section-level vertical padding
  container: "px-4",   // Container horizontal padding
  card: "p-6",         // Card/box padding
  button: "px-6 py-3", // Button padding
};
```

## Usage Examples

### Page Structure

```tsx
<div className={`container mx-auto ${padding.container} ${padding.page}`}>
  <div className="max-w-6xl mx-auto">
    <Heading as="h1" size="page" className={spacing.heading}>
      Page Title
    </Heading>
    <Text size="lg" variant="description" className={spacing.section}>
      Page description text
    </Text>
    
    <section className={spacing.section}>
      <Heading as="h2" size="section" className={spacing.subsection}>
        Section Title
      </Heading>
      <Text className={spacing.paragraph}>
        Section content...
      </Text>
    </section>
  </div>
</div>
```

### Card Components

```tsx
<div className={`bg-zinc-800/50 rounded-xl ${padding.card}`}>
  <Heading as="h3" size="card" className={spacing.small}>
    Card Title
  </Heading>
  <Text variant="muted">
    Card description...
  </Text>
</div>
```

## Responsive Considerations

- Typography scales are already responsive in the component definitions
- Use the preset responsive text sizes: `sm:text-xl`, `md:text-2xl`, etc.
- Maintain consistent spacing across breakpoints

## Dark Mode

All typography components support dark mode through Tailwind's dark mode classes:
- Use `dark:text-white` for primary text
- Use `dark:text-zinc-300` for description text  
- Use `dark:text-zinc-400` for muted text

## Best Practices

1. Always use the typography components instead of raw HTML elements
2. Use the spacing constants for consistent vertical rhythm
3. Apply padding constants for consistent container spacing
4. Respect the typography hierarchy (h1 → h2 → h3)
5. Use semantic text variants (default, muted, description)