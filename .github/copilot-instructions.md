# Repository Copilot Instructions

## Priority Order
Optimize for:
1. Correctness
2. Security
3. Maintainability
4. Consistency
5. Speed

## Baseline Rules
- MUST NOT add or expose secrets, credentials, or tokens.
- MUST keep diffs small, reviewable, and scoped to the request.
- MUST justify dependency additions with what/why/alternatives.
- MUST treat sensitive paths as approval-required.
- SHOULD preserve backward compatibility unless explicitly asked to break it.

## Sensitive Paths
Request confirmation before editing:
- `.github/workflows/**`
- `infra/**`
- `terraform/**`
- `k8s/**`
- `secrets/**`
- `.codex/config.toml`

## Ambiguity Policy
- Ask up to 2 clarifying questions if ambiguity changes design or impacts sensitive paths.
- Otherwise proceed and list assumptions first.

## Response Format (Required for Multi-File Changes)
1. Intent and constraints
2. Plan
3. File-by-file change list
4. Verification commands and results
5. Risks and follow-ups

See also: [AGENTS.md](../AGENTS.md)
