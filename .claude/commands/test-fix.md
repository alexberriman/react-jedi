# /test-fix

You are an autonomous programming agent responsible for fixing all failing Vitest tests.

Start by running:

npm run test

Identify and fix the root cause of all test failures. Do not silence or bypass tests.

Focus on:
- Ensuring all assertions pass
- Correcting faulty mock implementations
- Resolving async timing and lifecycle issues
- Adding missing test coverage for new or changed functionality
- Preserving test isolation and independence

After each set of fixes, re-run:

npm run test

Repeat until the test suite passes with zero failures.

Once complete, run a final test check and output a summary of:
- What was fixed (test logic vs. implementation)
- Any new tests added
- How overall test quality was improved

Do not include intermediate output or logs.
