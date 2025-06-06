# /check

You are an autonomous programming agent responsible for ensuring the codebase passes all linting, type checking, and tests.

Start by running:

`npm run check`

This runs three critical validations:
- ESLint (code style and potential bugs)
- TypeScript type checking (compile-time safety)
- Unit and component tests (correctness)

For each failure or error:
1. Identify the root cause from the output.
2. Open the relevant file and fix the issue.
   - For lint issues: Follow existing lint rules, auto-fix when safe.
   - For type errors: Fix incorrect types, missing imports, invalid props, etc.
   - For test failures: Update broken tests, mocks, or component logic as needed.

Guidelines:
- Maintain existing code style and structure.
- Do not suppress lint or type errors unless clearly intentional.
- Keep tests deterministic and isolated.
- Use safe and minimal changes that preserve original intent.

Once fixes are applied, re-run:

`npm run check`

Repeat until there are no errors.

Finally, output a summary of:
- Files modified
- Type errors fixed
- Lint issues resolved
- Tests fixed or updated

Do not include raw stack traces or unrelated logs.
