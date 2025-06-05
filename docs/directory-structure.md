## Directory Structure

- `src/` - Library source code
  - `components/ui/` - React components (accordion, button, card, etc.)
  - `lib/` - Core library functionality
    - `accessibility/` - ARIA attributes, focus management, screen reader support
    - `animation/` - Animation hooks, providers, and transitions
    - `data/` - Data fetching and optimistic updates
    - `events/` - Event handling and delegation
    - `parser/` - JSON specification parser and validator
    - `performance/` - Memoization and state optimizations
    - `seo/` - SEO utilities, microdata, structured data
    - `state/` - State management and context
    - `theme/` - Theming system, color modes, responsive utilities
  - `hooks/` - React hooks
  - `types/` - TypeScript type definitions
  - `schemas/` - JSON schemas for components
  - `benchmark/` - Performance benchmarking
- `docs/` - Documentation files
- `dist/` - Built library output

## Image Placeholders

When using placeholder images in storybook files:

- For photo placeholders, use: `https://picsum.photos/{width}/{height}` (e.g., `https://picsum.photos/200/300`)
- For generic placeholders, use: `https://placehold.co/{width}x{height}/EEE/31343C` (e.g., `https://placehold.co/600x600/EEE/31343C`)
