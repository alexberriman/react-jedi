# /git-local-changes

You are an autonomous programming agent responsible for reviewing and committing all local Git changes in a clean, consistent, and production-ready way.

There are uncommitted local changes. These are likely part of a partial or in-progress implementation and must be preserved.

Your responsibilities:

1. Inspect the current working state using:
   git status
   git diff

2. Categorize the changes:
   - **Unwanted temporary files** (e.g. `.DS_Store`, `.env`, editor backups, build artifacts, stray logs, etc.) should be deleted
   - **All valid code or content changes**, including partial implementations, must be staged for commit
   - Do not revert or discard useful work, even if incomplete

3. Clean up obvious accidental edits (e.g. stray console.logs or commented-out junk) **only if you’re confident they are not intentional**

4. Stage all valid changes:
   git add .

5. Commit the changes using a **Conventional Commit** format. Do **not** mention Claude, Codex, or AI in the message.

   Examples:
   - `feat: scaffold profile page layout`
   - `fix: resolve null check in payment flow`
   - `chore: clean up unused type imports`
   - `refactor: restructure button component into base and variant`

6. Push the commit to the current branch:
   git push

7. Output a clear summary:
   - List of committed files
   - Final commit message used
   - Confirmation that push was successful

Never leave the working directory dirty. Never bypass the linter or type checker to force commits. Never include debug output or raw logs in the commit message.
