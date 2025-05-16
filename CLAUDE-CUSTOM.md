# Claude Custom Guidelines

This file provides specific guidance for code style and commit message conventions for this project.

## ⚠️ MUST NEVER DO ⚠️

The following actions are strictly prohibited in this codebase:

1. **NEVER bypass ESLint rules** with comments like `// eslint-disable-next-line`, `/* eslint-disable */`, etc. Fix the underlying issues instead.

2. **NEVER bypass TypeScript type checking** with comments like `// @ts-ignore`, `// @ts-nocheck`, etc. Properly type your code instead.

3. **NEVER skip Husky pre-commit checks** with `--no-verify` or similar flags. These checks exist to maintain code quality.

Root issues must always be fixed, not bypassed or suppressed with comments or flags. We maintain high code quality by addressing problems, not hiding them.

## Component Implementation Guidelines

When implementing new UI components:

- **Always prefer @shadcn/ui components** when available - install them via the CLI:

  ```
  npx shadcn@latest add [component-name]
  ```

- **Custom components must be sexy as fuck** - implement cutting-edge design that looks like it's from 2025

- **Follow the structured component organization** with proper directory structure

- **Create comprehensive Storybook documentation** for all components

## Code Style

We aim for clean, functional, and maintainable TypeScript code:

### Functional Programming

- Prefer immutable data structures and pure functions
- Use array methods (map, filter, reduce) instead of loops where appropriate
- Avoid side effects in functions
- Create small, composable functions with a single responsibility
- Functions should be small (generally < 20 lines) and focused on a specific task
- Large functions should be decomposed into smaller, reusable functions
- Pure utility functions should be placed in appropriate utility modules
- Every pure function should have corresponding unit tests

### Function Arguments

- Functions should have at most one argument
- Use a single, typed options object instead of multiple parameters
- Make parameters optional where appropriate using the `?` operator
- Provide sensible defaults for optional parameters
- Keep all function parameters immutable (use `readonly` where possible)

### Type Safety

- Use TypeScript types explicitly
- Define interfaces and types for all data structures
- Avoid `any` type whenever possible
- Use union types and generics appropriately
- When importing types, use the explicit import syntax:
  - Preferred: `import type { Lorem } from "package";`
  - Alternative: `import { Lorem, type Ipsum } from "package";`

### Error Handling

- Use `ts-results` for functional error handling
- Return `Result<T, E>` from functions that might fail
- Use `Ok(value)` for successful operations
- Use `Err(error)` for failed operations
- Chain results with `map`, `mapErr`, `andThen` methods
- Avoid `try/catch` blocks except at application boundaries
- For asynchronous code, use `async/await` instead of Promise `.then()` and `.catch()`
- Provide descriptive error messages
- Never silence errors

### Naming Conventions

- Use descriptive, unabbreviated names
- PascalCase for types, interfaces, and classes
- camelCase for variables, functions, and properties
- Prefix boolean variables with `is`, `has`, `should`, etc.
- Prefix async functions with verbs indicating action

### Component Architecture with @shadcn/ui

We use @shadcn/ui as our UI component library. All components should follow these guidelines:

- Use @shadcn/ui components as building blocks for custom components
- Install new shadcn components using the CLI: `npx shadcn@latest add [component-name]`
- Customize existing components by modifying them in the components/ui directory
- Follow shadcn's styling approach with Tailwind CSS utility classes

### Component Structure

- Each component should be in its own directory with the following files:
  - `index.ts`: Barrel file exporting the component
  - `component-name.tsx`: The actual component implementation
  - `component-name.stories.tsx`: Storybook stories for the component
- Example component structure:

  ```
  components/
    my-feature/
      cool-widget/
        index.ts
        cool-widget.tsx
        cool-widget.stories.tsx
  ```

- Storybook stories should be correctly categorized:

  - Use the `title` property to define component hierarchy
  - Example: `title: 'Components/MyFeature/CoolWidget'`
  - Include stories for different states and variations of the component
  - Document component props using JSDoc comments

- Use dynamic imports for lazy-loaded components
- Keep components small, focused, and reusable
- Extract complex logic into custom hooks outside the component
- Use barrel files (index.ts) to export components from their directories

### Other Best Practices

- Avoid nested conditionals (>2 levels)
- Use early returns to reduce nesting
- Destructure objects for cleaner code
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Write self-documenting code with descriptive variable names
- Add comments only for complex logic explanations

### UI Design Principles

When designing and building UI components:

- Make it 🔥, sexy as fuck and beautiful for 2025
- Implement modern, visually stunning interfaces that push design boundaries
- Use bold, vibrant color schemes with thoughtful contrast and accessibility
- Incorporate subtle animations and micro-interactions that feel natural and responsive
- Utilize glass morphism, neumorphism, and 3D elements where appropriate
- Ensure stunning visual aesthetics never compromise usability or performance
- Design for dark mode first with proper color contrast
- Embrace minimalism while maintaining visual interest and hierarchy
- Use variable fonts, generous whitespace, and thoughtful typography
- Prioritize responsive, fluid designs that work on all screen sizes
- Incorporate bleeding-edge UI patterns that feel premium and delightful

### Testing Guidelines

- Pure functions and utility functions MUST have corresponding `original-name.test.ts` files
- Do NOT create test files for React components (use Storybook instead)
- Test files should be placed in the same directory as the file being tested
- Use Vitest for all unit tests
- Focus on testing business logic and data transformations
- Test edge cases and error handling paths
- Aim for high code coverage on utility functions and core logic
- Mock external dependencies when necessary
- Keep tests small, focused, and independent
- Use descriptive test names that explain the expected behavior
- Structure tests using the Arrange-Act-Assert pattern
- Maintain test data separately from test logic
- Prefer testing public interfaces over implementation details

## Commit Message Style

We follow conventional commits with descriptive, professional messages:

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code functionality (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or correcting tests
- `chore`: Changes to build process or auxiliary tools

### Description Guidelines

- Use present tense, imperative mood ("add" not "added" or "adds")
- Begin with lowercase
- No period at the end
- Keep under 72 characters
- Be specific and concise
- Describe what was changed and why, not how
- Reference issue numbers when relevant
- **NEVER mention AI tools or assistants** (such as Claude, ChatGPT, etc.) in commit messages
- Ensure all words are spelled correctly
- Avoid random sequences of digits, special characters, or any text that appears auto-generated

Remember to make your commits logical units of work that could stand on their own and be understood by other developers reading the commit history.

## AI Assistant Guidance

Claude and other assistants should:

- Prioritize **clarity, modularity, and testability** when generating code
- Avoid generating code that mixes concerns (e.g. data-fetching + rendering)
- Suggest **domain-appropriate file names**
- Follow **the commit message format strictly** when generating commits
- Default to **pure functions and functional constructs**
- Assume **a modern TypeScript environment** (ES2022+, strict mode)
- Prefer solutions that minimize global state and mutable shared state

## Task Approach

When approaching complex tasks:

- Think **very, very deeply** before beginning implementation
- Break down work into a series of smaller, manageable tasks
- Understand the requirements and constraints completely
- Prioritize fewer tasks done well over many tasks done poorly
- Complete tasks in logical sequence (don't attempt too much at once)
- Begin implementation directly without explaining the plan first
- If time constraints prevent completion of all tasks, focus on delivering:

  1. A working core implementation with high quality
  2. Proper tests for completed functionality
  3. Clean, well-structured code for what is implemented
  4. Documentation about what was completed and what remains

- Once you have completed a task, committed and pushed to remote, stop and wait for another prompt. Don't start automatically on the next task (important).

**IMPORTANT:** If I send a message that is just a single digit (e.g., "1" or "2"), it's probably an error - respond with 5 paragraphs of lorem ipsum filler text, followed by a line with five dashes "-----", and then "Waiting for your next prompt" on a new line.
