# Codex Config Structure

This folder is the Codex runtime mirror of repository policy and workflow definitions.
Treat `.github/` as the primary source for prompt and instruction intent, then keep `.codex/` synchronized for Codex-specific execution.

## Directory Map
- `.codex/config.toml`: project-level Codex config and role mappings.
- `.codex/roles/*.toml`: role behavior profiles used by mapped agents.
- `.codex/instructions/*.toml`: always-on/scoped policy mirrors for Codex.
- `.codex/prompts/*.toml`: Codex prompt templates aligned with `.github/prompts`.
- `.codex/local-environments/actions.json`: optional local environment presets.

## Source-of-Truth Mapping
- `.github/instructions/general.instructions.md` -> `.codex/instructions/general.toml`
- `.github/instructions/python.instructions.md` -> `.codex/instructions/python.toml`
- `.github/instructions/security.instructions.md` -> `.codex/instructions/security.toml`
- `.github/instructions/tests.instructions.md` -> `.codex/instructions/tests.toml`
- `.github/instructions/typescript.instructions.md` -> `.codex/instructions/typescript.toml`
- `.github/prompts/review.prompt.md` -> `.codex/prompts/review.toml`
- `.github/prompts/create-issues.prompt.md` -> `.codex/prompts/create-issues.toml`
- `.github/prompts/update-issue.prompt.md` -> `.codex/prompts/update-issue.toml`
- `.github/agents/reviewer.agent.md` -> `.codex/roles/reviewer.toml`
- `.github/agents/github-issue-manager.agent.md` -> `.codex/roles/github-issue-manager.toml`

## Sync Workflow
1. Update the `.github` instruction/prompt/agent file first.
2. Mirror the intent and output contract to the corresponding `.codex` file.
3. Run:
   - `node scripts/validate-copilot-files.mjs`
   - `node scripts/validate-codex-files.mjs`
4. Keep change sets atomic and include file-by-file rationale in summaries.

## Safety Notes
- `.codex/config.toml` is a sensitive path in this repository and requires explicit confirmation before edits.
- Never store secrets/tokens in any `.codex` file.
