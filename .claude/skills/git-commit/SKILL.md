---
name: git-commit
description: Review the working tree and commit pending changes as multiple small, logically-grouped commits with clean, short messages. Use when asked to commit changes, split a messy diff into commits, or clean up uncommitted work into a commit history.
---

# git-commit

Turn whatever is currently changed in the working tree into a clean commit
history: several small, logically-grouped commits with short, clear
messages — never one giant commit dumping every change together.

## 1. Gather context first

Run in parallel:

- `git status` (never `-uall` — it can exhaust memory on large repos)
- `git diff` (unstaged) and `git diff --staged` (staged)
- `git log --oneline -20`

Read the log before writing anything — match the repo's existing message
style (conventional-commits prefixes, sentence case, length, etc.) rather
than imposing a different convention.

## 2. Group changes into logical commits

Split by concern, not by chronology, file type, or directory:

- Files that together implement one coherent feature, fix, or refactor —
  even if it spans frontend and backend, or several files — belong in a
  single commit.
- Unrelated changes that merely happen to sit in the same working tree
  (e.g. pre-existing edits from earlier work, formatter-only diffs, an
  unrelated bug fix) get their own separate commit(s). A pure
  whitespace/formatting-only diff across many files is its own commit
  (e.g. `chore: normalize formatting`), never folded into a feature commit.
- If a file mixes an intentional change with unrelated formatting noise,
  read the actual diff content (not just the filename) to decide which
  commit it belongs to.
- If the right grouping is genuinely ambiguous — e.g. you can't tell
  whether some already-modified files belong to the requested task or are
  unrelated in-progress work — ask the user instead of guessing.

## 3. Stage deliberately

For each commit:

- `git add` the specific files by name. Never `git add -A` or `git add .`
  blindly.
- After staging, check `git status` for anything unexpected: build
  artifacts, `.env`/credential-looking files, large binaries, IDE files.
  If something suspicious is staged, flag it to the user rather than
  silently committing or silently dropping it.

## 4. Write clean, short messages

- Imperative mood, present tense (`add`, `fix`, `rename`, not `added`/`adds`).
- One line is usually enough; add a short body only when the *why* isn't
  obvious from the diff itself.
- Match whatever prefix/style convention the repo's `git log` already uses.
- No filler ("various changes", "misc fixes"), no restating the whole diff,
  no AI-attribution trailer unless the repo's own history already includes
  one from prior commits.

## 5. Safety rules (always apply)

- Never push.
- Never `--force`, `--no-verify`, `--amend`, or `reset --hard`.
- Never commit obvious secrets (`.env`, credentials, private keys).
- Only commit intentional changes — investigate any unfamiliar untracked
  file or directory before deciding to include or exclude it; don't assume.
- If there's nothing to commit, say so instead of creating an empty commit.

## 6. Verify and report

After all commits are made:

- Run `git status` to confirm a clean tree (or explicitly list what was
  deliberately left uncommitted and why).
- Report a short summary back to the user: one line per commit, short hash
  + message.
