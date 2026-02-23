# AI Prompt and Config Template (VS Code + Copilot + Codex)

This repository is a reusable template for managing AI agent behavior in code projects.

It gives you one structured place to define:
- Always-on project rules
- Path/language-specific instructions
- Reusable prompt macros
- Custom agent personas
- Codex project config and roles
- Shareable team workflows (skills)
- Validation scripts and CI enforcement

## What This Is

This is not an app runtime. It is configuration and policy infrastructure for AI-assisted development.

Use this template when you want:
- Consistent behavior across VS Code Copilot and Codex
- Safer defaults for edits and tool usage
- Reproducible prompt/agent behavior checked by CI

## What It Solves

Common failure modes this template addresses:
- Hallucinated assumptions by requiring repository-aware workflows
- Unsafe edits in sensitive paths by explicit confirmation policy
- Inconsistent output by fixed response-format requirements
- Drift across tools by using `AGENTS.md` as a cross-agent spine

## Repository Layout

### Core policy
- `AGENTS.md`
  - Cross-agent source of truth: priorities, precedence, safety boundaries, output format.

### Copilot and VS Code discovery paths
- `.github/copilot-instructions.md`
  - Repository-wide baseline instructions.
- `.github/instructions/*.instructions.md`
  - Scoped rules using `applyTo` globs.
- `.github/prompts/*.prompt.md`
  - Slash-command prompts for repeatable tasks.
- `.github/agents/*.agent.md`
  - Custom agent profiles (Planner, Implementer, Reviewer, Security Reviewer).

### Codex-specific configuration
- `.codex/config.toml`
  - Project-scoped Codex defaults and role mappings.
- `.codex/roles/*.toml`
  - Role-specific behavior layers.

### Shareable workflows (Codex skills)
- `.agents/skills/**/SKILL.md`
  - Team playbooks such as onboarding, spec-to-code, commit workflow, and security review.

### Automation
- `scripts/validate-copilot-files.mjs`
  - Validates Copilot instruction/prompt/agent files and links.
- `scripts/validate-codex-files.mjs`
  - Validates Codex config, roles, and skills.
- `.github/workflows/ai-config-ci.yml`
  - CI workflow that runs both validators.

## Prerequisites

- VS Code (current stable)
- GitHub Copilot extension (for `.github/*` customization features)
- Codex tooling/extension (optional, if you use `.codex/*` and `.agents/skills/*`)
- Node.js (recommended: `20+`) for local validation scripts

## Installation and Setup

## 1) Add template to a repository

Copy these into your target repository root:
- `AGENTS.md`
- `.github/`
- Optional: `.codex/`, `.agents/skills/`, `.vscode/mcp.json`
- `scripts/`

## 2) Open project in VS Code

- Open the repository folder.
- Trust the workspace so project-level settings/configs can apply.

## 3) Verify local setup

Run:

```bash
node --version
node scripts/validate-copilot-files.mjs
node scripts/validate-codex-files.mjs
```

Expected result:
- Both validators print a success message and exit with code `0`.

## How To Use (Daily Workflow)

## For Copilot in VS Code

1. Keep repository baseline rules in `.github/copilot-instructions.md`.
2. Put language/path rules in `.github/instructions/*.instructions.md`.
3. Use prompt files from `.github/prompts/*.prompt.md` as slash commands.
4. Select an agent from `.github/agents/*.agent.md` for role-specific behavior.

Suggested flow:
1. Use `Planner` (or `/plan-feature`) for multi-file work.
2. Hand off to `Implementer` (or `/implement-feature`).
3. Hand off to `Reviewer` and optionally `Security Reviewer`.

## For Codex

1. Ensure project is trusted so `.codex/config.toml` loads.
2. Use role mappings in `.codex/config.toml` (`implementer`, `reviewer`, `security_reviewer`).
3. Keep cross-agent policy in `AGENTS.md`.
4. Use `.agents/skills/*` for reusable workflows without bloating always-on context.

## Prompt Catalog (Included)

- `plan-feature.prompt.md`: scoped implementation plan with risks/tests.
- `implement-feature.prompt.md`: execute approved plan with verification.
- `bugfix.prompt.md`: repro-first bugfix flow with deterministic testing.
- `refactor.prompt.md`: safe refactor with parity checks.
- `write-tests.prompt.md`: deterministic test generation.
- `review.prompt.md`: severity-bucket review with file references.
- `doc.prompt.md`: docs updates with audience focus.
- `release-notes.prompt.md`: release summary with rollout/risk notes.

## Agent Catalog (Included)

- `planner.agent.md`
  - Planning only, no edits.
- `implementer.agent.md`
  - Code changes + checks + review handoffs.
- `reviewer.agent.md`
  - Correctness-first review with must-fix/should-fix/suggestion outputs.
- `security-reviewer.agent.md`
  - Security-focused review for trust boundaries, injection, auth, and secrets.

## Policy Defaults Encoded

Priority order:
1. Correctness
2. Security
3. Maintainability
4. Consistency
5. Speed

Conflict handling:
- Prompt/active agent > closest scoped instruction > repo baseline > `AGENTS.md` tie-break.
- If two `MUST` rules conflict, ask one focused question before editing.

Sensitive-path gating:
- Changes under `.github/workflows/**`, `infra/**`, `terraform/**`, `k8s/**`, `secrets/**`, and `.codex/config.toml` require explicit confirmation.

## MCP Setup (Optional)

File:
- `.vscode/mcp.json`

Current default:
- Empty `servers` object (safe baseline).

Recommended rollout:
1. Add one read-only MCP server first.
2. Keep tool allowlists minimal per agent.
3. Keep secrets in environment variables only.
4. Review MCP changes like code (PR + validation + policy check).

## Validation and CI

Local:

```bash
node scripts/validate-copilot-files.mjs
node scripts/validate-codex-files.mjs
```

CI:
- `.github/workflows/ai-config-ci.yml` runs both validators on PRs and pushes to `main`.

Validator coverage includes:
- Required file/directory checks
- Frontmatter requirements
- Agent naming and duplicate detection
- Agent size constraints
- Relative markdown link checks
- Codex config/role/skill sanity checks

## Bootstrap a New Project

Use this short checklist:
1. Copy template files into new repo.
2. Update `AGENTS.md` repo map and command list.
3. Update scoped instructions for actual stack conventions.
4. Update sensitive paths for that repository.
5. Tune `.codex/config.toml` and role TOMLs as needed.
6. Add/remove prompts and skills based on team workflow.
7. Run validators and commit.

## Customization Guide

Adjust these first for each project:
- `AGENTS.md`: commands, boundaries, sensitive paths.
- `.github/instructions/typescript.instructions.md` and `.github/instructions/python.instructions.md`:
  align strictness, lint/test stack, and architecture rules.
- `.github/prompts/*.prompt.md`:
  align to your delivery templates and review style.
- `.github/agents/*.agent.md`:
  narrow tool scopes and handoff behavior.
- `.vscode/mcp.json`:
  add only approved MCP servers.

## Troubleshooting

`Validator fails with missing frontmatter`
- Ensure instruction/prompt/agent files start with a valid `---` frontmatter block.

`Broken relative link errors`
- Fix markdown links or remove stale references.

`Codex role not applying`
- Confirm trusted project mode and `.codex/config.toml` path.

`Prompt variables flagged as links`
- Validator already ignores `${...}` dynamic targets; update script only if you use a new placeholder style.

## Security Notes

- Do not store secrets in this repository.
- Treat prompt/agent/config changes as production-impacting policy code.
- Prefer enforcement (validators + CI + review) over prompt wording alone.

## License and Ownership

Add your organization license and ownership model here (CODEOWNERS, review requirements, security contacts).
