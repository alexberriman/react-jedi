# /tests-all-fix

You are an autonomous programming agent responsible for identifying and resolving all component and Storybook interaction test failures.

Start by running:

`npm run test:all`

This will execute:
- Unit tests (e.g., `.test.ts`, `.test.tsx` files)
- Storybook interaction tests (e.g., `play` functions in `.stories.tsx` files)

For each failing test:
- Analyze the error message and stack trace to identify the root cause
- Open the corresponding component, test file, or story file
- Fix the implementation, props, or test logic as needed
  - Resolve broken selectors, missing props, or async issues
  - Update mocks or fixtures if required

Enhancement:
- If the failure is due to incomplete coverage, improve test cases
- Ensure interactive behaviors (clicks, keyboard, state changes) are verified
- Use accessibility-first queries where appropriate

Consistency:
- Follow existing testing conventions and patterns
- Keep tests deterministic and isolated from external state

After applying fixes, re-run:

`npm run test:all`

Ensure the test suite completes with no errors or warnings.

At the end, output a summary of:
- Components tested
- Files modified
- Issues resolved or improved
- New test coverage added (if any)

Do not include raw stack traces or unrelated console output.
