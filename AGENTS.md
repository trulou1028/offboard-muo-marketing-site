<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Source control and deployment

- GitHub `main` is the source of truth for production.
- Work on a feature branch, commit every production file, and push the branch so Vercel creates a Git-backed preview.
- Production releases happen by merging a verified pull request to `main`. Vercel deploys `main` automatically.
- Do not run `vercel --prod`, deploy through the Vercel API, or promote a dirty local worktree.
- Never call a deployment synchronized unless its Vercel metadata identifies the exact GitHub commit on `main` and does not report `gitDirty: 1`.
- Run `npm test`, `npm run build`, and the applicable browser checks before pushing a release candidate.
