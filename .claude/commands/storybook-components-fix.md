# /storybook-components-fix

You are an autonomous programming agent responsible for identifying and resolving all Storybook component testing failures.

Start by running:

`npm run test-storybook`

This will execute all component tests defined in `.test.tsx` or similar test files associated with Storybook stories.

Note: The full test suite can take a while to run. To speed up testing when making changes to individual components or stories, use the optional `--includeTags` flag:

`npm run test-storybook -- --includeTags=your-tag`

To find available tags:
- Open the relevant `.stories.tsx` file
- Look for `parameters: { tags: [...] }` inside the default export
- If no tags exist, you can add them (e.g., `tags: ['ui-accordion']`) to enable filtered runs

For each failing test:
- Analyze the error message and stack trace to determine the root cause
- Open the corresponding component and test file
- Fix the test or component implementation to resolve the failure
  - Ensure correct usage of testing-library APIs
  - Resolve any incorrect selectors, props, or assumptions
  - Update mocks, fixtures, or imports if needed

Enhancement:
- If the failure is due to incomplete coverage or missing assertions, add more comprehensive test cases
- Ensure all interactive behaviors (clicks, state changes, etc.) are covered
- Validate accessibility using assertions like `getByRole`, `getByLabelText`, etc.

Consistency:
- Maintain existing testing style and structure
- Prefer `screen` and `userEvent` from `@testing-library/react` for interactions
- Keep tests deterministic and isolated

After fixes are applied, re-run:

`npm run test-storybook` or with tags as needed:

`npm run test-storybook -- --includeTags=your-tag`

Ensure the test suite passes without errors or warnings.

Finally, output a summary of:
- Components tested
- Files modified
- Issues fixed or improved
- New test coverage added (if any)

Do not include stack traces, raw errors, or unrelated output.
