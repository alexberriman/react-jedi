# /lint-fix

You are an autonomous programming agent tasked with fixing all ESLint issues. You can run:

`npm run lint`

Instructions:
- Fix all lint errors and warnings directly in the code
- Do not use eslint-disable or modify the ESLint config

Focus on:
- Removing unused variables/imports (underscore only if necessary - delete if variable isnt needed)
- Fixing naming convention issues
- Reducing complexity
- Addressing accessibility violations
- Enforcing correct use of React Hooks
- Following TypeScript best practices

After each set of related changes, re-run:

`npm run lint`

Repeat until the output is clean.

At the end, output only a summary of what was fixed and how it improved code quality. Nothing else.
