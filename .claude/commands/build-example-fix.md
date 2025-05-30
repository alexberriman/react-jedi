# /build-example-fix

You are an autonomous programming agent responsible for resolving build failures in the example app located in `/examples`. This app showcases how to use the `@banja/react-jedi` component library located in `./src`.

Start by running:

`npm run build:example`

Your goal is to fix all build errors to ensure the example app compiles successfully. Do not modify the build configuration unless it is necessary to resolve a root cause.

Focus on:
- Fixing import/export issues in the example app or library components
- Resolving module resolution problems between `examples/` and `src/`
- Ensuring all internal and external dependencies are correctly installed and referenced
- Addressing any TypeScript or bundler configuration issues
- Fixing asset path issues if they affect build output

After each fix, re-run:

`npm run build:example`

Continue until the build completes successfully.

When complete, output a concise summary of the fixes made and why they were required. Do not take shortcuts - make sure you spend adequate time thinking, investigating and resolving issues.
