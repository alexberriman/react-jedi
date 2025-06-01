# Contributing to React Jedi

Thank you for your interest in contributing to React Jedi! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/react-jedi.git`
3. Install dependencies: `npm install`
4. Set up Playwright for testing: `npm run dev:setup`
5. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Running the Project

```bash
# Start development server
npm run dev

# Run the example app
npm run example-app

# Launch Storybook for component development
npm run storybook
```

### Code Quality

Before submitting a PR, ensure your code passes all checks:

```bash
# Run all checks (lint, typecheck, tests)
npm run check

# Run tests
npm test

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Pull Request Guidelines

1. **Keep PRs focused** - One feature or fix per PR
2. **Write tests** - All new functionality should have tests
3. **Update documentation** - Keep docs in sync with code changes
4. **Follow conventions** - Adhere to the project's coding standards
5. **Write clear commits** - Use conventional commit format

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type: description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

Examples:
```
feat: add tooltip component
fix: resolve button click handler issue
docs: update README with new examples
```

## Component Development

When creating new components:

1. Create component folder: `src/components/ui/component-name/`
2. Include files:
   - `component-name.tsx` - Component implementation
   - `index.ts` - Barrel export
   - `component-name.stories.tsx` - Storybook stories
3. Add TypeScript types in `src/types/components/`
4. Create JSON schema in `src/schemas/`
5. Write tests if the component has business logic

## Testing

- Unit tests use Vitest
- Component tests use Storybook with Vitest
- Run tests: `npm test`
- Run with coverage: `npm run test:coverage`

## Code Style

- TypeScript for all code
- Functional components with hooks
- Follow existing patterns in the codebase
- Use Prettier for formatting
- ESLint for linting

## Questions?

Feel free to:
- Open an issue for bugs or feature requests
- Start a discussion for questions
- Reach out via email: support@alexberriman.com

Thank you for contributing to React Jedi! 🚀