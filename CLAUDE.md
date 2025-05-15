@CLAUDE-CUSTOM.md
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React frontend project with automated testing and quality checks.

## Code Style Conventions

- **Case Style**: kebab-case
- **Indentation**: spaces (2 spaces)
- **Quotes**: double quotes
- **Line Length**: Maximum 100 characters
- **Trailing Commas**: Use trailing commas
- **Semicolons**: Use semicolons

### Component Structure

Components should be organized in directories with an index.ts file.
Example:
```
components/
  button/
    index.ts       # Exports the component
    button.tsx     # Component implementation
    button.test.tsx    # Tests (adjacent to implementation)
```

### Test Files

Test files should follow the pattern: `{name}.test.ts`

## Preferred Technologies

Use the following technologies in this project:

### Frontend

- **Framework**: React v19
- **Styling**: Tailwind v4
- **Data Fetching**: React-query
- **Documentation**: Storybook

### Code Organization & Architecture

- **Component Design**: Maximize reusability
  - Create small, composable, reusable components
  - Extract common patterns into shared components
  - Build a component hierarchy that promotes reuse
- **Component Documentation**: Every presentational component must have a Storybook story
  - Stories should cover all component states and variants
  - Include proper documentation of props and usage
- **Hooks Organization**: One hook per file
  - Each custom hook should have its own dedicated file
  - Organize hooks by feature/entity
  - Create separate hooks for each API operation (e.g., useCreateUser, useDeleteUser)
- **Data Fetching Pattern**: 
  - Create custom React Query hooks for each API endpoint
  - Organize queries by entity/resource
  - Leverage QueryClient for caching and background updates

### UI Design Philosophy (2025)

All UI components and interfaces should be CUTTING-EDGE, MODERN, and SEXY:

- **Visual Design**: Create interfaces that look like they're from 2025
  - Ultra-clean layouts with purposeful whitespace
  - Neumorphic or glassmorphic elements that add depth and dimension
  - Subtle shadows, gradients, and light effects
  - Floating elements and layered UI components

- **Interactions**: Design intuitive, fluid experiences
  - Micro-animations for state changes and transitions
  - Minimal friction in user workflows
  - Context-aware interfaces that anticipate user needs

- **Styling Approach**: Use Tailwind to create UNIQUE designs
  - Push creative boundaries with modern aesthetics
  - Utilize advanced color theory and typography
  - Aim for visually IMPRESSIVE and DISTINCTIVE interfaces


### Backend

- **Framework**: Express v5

### Utilities

- **Logging**: Pino
  - Configuration:
    - Log level: info
    - Pretty print: Enabled
    - Transport: pino-pretty
  - Do not use console.log - use appropriate log levels

### Testing

- **Unit Testing**: Vitest
  - Leveraging Vite for fast test execution
  - Do NOT use Jest configuration or dependencies
- **Component Testing**: Storybook
- **Test Location**: Tests should be placed adjacent to implementation files
  - Do NOT use __tests__ directories

### Build Tools

- **Bundler**: Vite
- **CI/CD**: github-actions

**All presentational ("dumb") components should have a corresponding Storybook story file.**



## Project Architecture

Follow a clear separation of concerns with component-based architecture. Separate UI components from business logic and data fetching.


## Server-Driven UI Architecture

This library implements Server-Driven UI (SDUI) architecture with these key principles:

- **JSON-Driven**: All UI components and their relationships are defined in JSON
- **Specification Schema**: Strongly typed schemas validate all UI specifications
- **Component Resolution**: Dynamic mapping of specification types to React components
- **Theme Inheritance**: Cascading theme properties flow through component hierarchies
- **State Management**: Local and global state defined declaratively in specifications
- **Expression Parsing**: Simple expression language for dynamic rendering conditions
- **Event Binding**: JSON-defined event handlers mapped to component callbacks


## Functional Programming Principles

This project follows functional programming principles:

- **Immutable data**: Avoid mutating data structures
- **Pure functions**: Functions should have no side effects
- **Function composition**: Build complex logic from simple functions
- **Result type**: Use Result<T, E> to handle success/failure
- **Early returns**: Use early returns to avoid nested conditionals
- **Small modules**: Create small, focused modules with a single responsibility


## Component Structure

Each component should be in its own directory with the following files:

- `index.ts`: Barrel file exporting the component
- `component-name.tsx`: The actual component implementation
- `component-name.stories.tsx`: Storybook stories for the component

Example component structure:
```
src/
  components/           # All UI components
    ui/                 # @shadcn/ui components
      button/
      card/
      input/
    feature-a/         # Feature-specific components
      cool-widget/
        index.ts
        cool-widget.tsx
        cool-widget.stories.tsx
  hooks/               # Custom React hooks
  utils/               # Shared utilities
  types/               # TypeScript type definitions
  themes/              # Theme configurations
```


## UI Design Principles

When designing and building UI components:

- Make it 🔥, sexy as fuck and beautiful for 2025
- Implement modern, visually stunning interfaces that push design boundaries
- Use bold, vibrant color schemes with thoughtful contrast and accessibility
- Incorporate subtle animations and micro-interactions that feel natural and responsive
- Ensure stunning visual aesthetics never compromise usability or performance
- Design for dark mode first with proper color contrast
- Embrace minimalism while maintaining visual interest and hierarchy
- Use variable fonts, generous whitespace, and thoughtful typography
- Prioritize responsive, fluid designs that work on all screen sizes


