# Prompt Conventions

## Design Goals
- Keep always-on instructions concise and stable.
- Put task macros in prompt files with explicit inputs.
- Keep role behavior in agent files.
- Use skills for reusable multi-step workflows.

## Language Policy
- Use `MUST`/`MUST NOT` for safety, security, and repository integrity.
- Use `SHOULD`/`PREFER` for style and convention guidance.

## Response Shape Standard
For multi-file work, require:
1. Intent and constraints
2. Plan
3. File-by-file change list
4. Verification commands and results
5. Risks and follow-ups

## Prompt Frontmatter
- Include `name` and `description`.
- Include `agent` when a role is expected.
- Include minimal `tools` list when scope should be constrained.

## Agent Frontmatter
- Include `name`, `description`, and `tools`.
- Keep additional fields compatible with VS Code defaults.
- Treat advanced fields as UX sugar, not correctness-critical behavior.
