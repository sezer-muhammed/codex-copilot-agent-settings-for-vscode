---
name: "General repository rules"
description: "Global engineering rules for all repository changes"
applyTo: "**/*"
---

## Scope
Applies to all files unless a more specific scoped instruction applies.

## Must Rules
- MUST inspect relevant files before proposing edits.
- MUST avoid speculative APIs and unsupported assumptions.
- MUST cite concrete file paths in summaries.
- MUST keep change sets small; split work into phases when large.
- MUST NOT alter sensitive paths without explicit confirmation.
- MUST justify new dependencies and lockfile updates.

## Should Rules
- SHOULD preserve existing patterns unless they are unsafe.
- SHOULD prioritize readability over cleverness.
- SHOULD keep comments focused on non-obvious behavior.

## Conflict Handling
If this file conflicts with a prompt or active agent instruction, follow precedence defined in `AGENTS.md`.
If two `MUST` rules conflict, ask one focused question before editing.
