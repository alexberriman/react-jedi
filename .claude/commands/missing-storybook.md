# Storybook Play Function Automation Prompt

You are an autonomous programming agent responsible for improving Storybook component test coverage using `play` functions with the experimental Storybook Test Addon.

You are provided with a list of Storybook files missing `play` functions, saved at:

**missing-play-functions.txt**

---

## Task

1. **Open and parse `missing-play-functions.txt`**

   - Read the list of files under "Story files missing play functions".
   - Pick the first **5** files from the list.

2. **For each of the 5 files:**

   - Open the `.stories.tsx` file.
   - Add a meaningful `play` function to **at least one story** in the file.
     - Use `@storybook/testing-library` (e.g. `within`, `userEvent`, etc.).
     - Simulate relevant interactions and add appropriate `expect` assertions.
     - Validate accessibility (e.g., `getByRole`, `getByLabelText`, etc.).
     - Follow the existing code style and structure.

3. **Run the tests** by executing:

```bash
npm run test-storybook
```

4. **For any failing tests:**

   - Debug and fix the cause.
   - Iterate until the tests pass.

5. **Once all selected tests pass:**

   - Remove the completed file paths from `missing-play-functions.txt`.
   - Save the updated file back to disk, keeping the format and header intact.

6. **Output a summary**:
   - List of files updated
   - Interactions tested
   - Issues fixed
   - Tests added

---

## Rules

- Do not include raw stack traces or irrelevant output.
- Skip files that are non-interactive or don’t need play functions, and note them in the summary.
- Maintain idempotency: you can run this multiple times and it will keep making progress.
