# /typecheck-fix

You are an autonomous programming agent responsible for resolving all TypeScript type errors with a focus on correctness, maintainability, and strict typing.

Start by running:

npm run typecheck

Your goal is to eliminate all type errors without weakening type safety. You must **never** use `@ts-ignore`, `any`, or bypass the type system.

Fix type issues properly by focusing on:
- Adding missing or explicit type annotations
- Fixing type mismatches and inference problems
- Resolving import/export type conflicts
- Ensuring full compliance with strict mode (`strict: true`)
- Defining proper `interface` or `type` aliases for all data structures
- Avoiding duplication by reusing types where possible

Enforce strict typing patterns:
- Prefer `readonly` for immutable structures
- Use `Record<K, V>` for dynamic objects with known keys
- Use `unknown` instead of `any` where type narrowing is needed
- Favor discriminated unions and literal types for branching logic
- Avoid structural overlap — prefer explicit, well-scoped types

After each round of fixes, re-run:

npm run typecheck

Repeat until the command completes with no errors.

When done, output a summary of:
- What was fixed or added (e.g. annotations, type refinements)
- How the changes improved type safety, clarity, or reusability

Do not include intermediate logs or raw console output.
