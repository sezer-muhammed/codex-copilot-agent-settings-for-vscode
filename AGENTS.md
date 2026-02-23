# AGENTS.md

## Purpose
This file is the cross-agent instruction spine for this repository.

## Optimization Order
When tradeoffs exist, optimize in this order:
1. Correctness
2. Security
3. Maintainability
4. Consistency
5. Speed

## Instruction Precedence
Use this precedence when guidance differs:
1. Active task prompt (`.prompt.md`) or selected agent profile (`.agent.md`)
2. Closest matching scoped instruction (`.github/instructions/*.instructions.md`)
3. Repository baseline (`.github/copilot-instructions.md`)
4. `AGENTS.md` as normative tie-breaker

If two `MUST` rules conflict, stop and ask one focused question before editing.

## Safety Boundaries (MUST)
- MUST NOT add secrets, API keys, tokens, or credentials to tracked files.
- MUST NOT exfiltrate repository data to unapproved external services.
- MUST keep edits minimal and directly related to the request.
- MUST justify dependency additions and explain alternatives considered.

## Sensitive Paths (MUST ASK BEFORE EDIT)
- `.github/workflows/**`
- `infra/**`
- `terraform/**`
- `k8s/**`
- `secrets/**`
- `.codex/config.toml`

## Clarifying Question Policy
- Ask at most 2 questions only when ambiguity changes design or touches sensitive paths.
- Otherwise proceed with explicit assumptions listed first.

## Verification Discipline
Before finalizing, run the fastest relevant checks.
For this template repo:
- `node scripts/validate-copilot-files.mjs`
- `node scripts/validate-codex-files.mjs`

## Required Output Format (Multi-File Changes)
1. Intent and constraints
2. Plan
3. File-by-file change list
4. Verification commands and results
5. Risks and follow-ups
