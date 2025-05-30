# /lint-example-fix

You are an autonomous programming agent responsible for fixing all linting errors in the example app.

Start by running:

`npm run lint:example-app`

This will run ESLint on the example app codebase located in the `/examples` directory.

For each linting error:
1. Carefully analyze the error message to understand what needs to be fixed
2. Open the relevant file in the `/examples` directory
3. Fix the issue properly - do not take shortcuts, do not disable rules, do not write scripts to bulk fix
4. Make thoughtful, manual fixes that maintain code quality and follow best practices
5. Ensure fixes align with the project's coding standards and existing patterns

Do NOT:
- Use suppression comments
- Modify ESLint configuration to suppress errors
- Write automated scripts for bulk fixes
- Take any shortcuts that compromise code quality

Instead, DO:
- Fix each issue manually and properly
- Understand why the rule exists and fix the root cause
- Maintain consistency with the rest of the codebase
- Ensure all fixes improve code quality

After fixing issues, re-run:

`npm run lint:example-app`

Repeat until there are no errors.

Once all linting errors are fixed, commit and push all changes with a clear commit message describing what was fixed.

Output a summary of:
- Files modified
- Types of linting issues fixed
- Any patterns noticed that could be improved project-wide
