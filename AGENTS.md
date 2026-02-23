# AGENTS.md (Cross-Agent Repository Spine)

## 1. Project Identity & Core Mission
This repository is the central configuration and policy infrastructure for AI-assisted development (VS Code Copilot and Codex). All agents MUST prioritize **correctness** and **security** over speed. We aim for a "Fail-Fast" engineering culture where errors are visible and behavior is deterministic.

## 2. Source of Truth & Precedence
This file is the normative tie-breaker for all agent behavior. When tradeoffs exist, optimize in this order:
1. **Correctness** (Atomic, bug-free implementation)
2. **Security** (Secret handling, data safety, trust boundaries)
3. **Maintainability** (Clarity, cohesion, low technical debt)
4. **Consistency** (Uniformity in patterns and naming)
5. **Speed** (Efficiency of execution)

### Instruction Precedence hierarchy:
1. **Active Context**: Task prompt (`.prompt.md`) or agent profile (`.agent.md`)
2. **Scoped Rules**: Language/Path instructions (`.github/instructions/*.instructions.md`)
3. **Repository Baseline**: `.github/copilot-instructions.md`
4. **Normative Spine**: `AGENTS.md` (this file)

## 3. Active Repository Map
All agents MUST be aware of the following capabilities:

### Personas (Agents)
- `Planner`: Architect role; produces plans, does not implement.
- `Implementer`: Engineering role; manages features, bugfixes, and refactors.
- `Reviewer`: Quality gate; focuses on correctness and severity buckets.
- `GitHub Issue Manager`: Workflow role; manages issue creation and progress updates.

### Rulesets (Instructions)
- `General`: Repository-wide engineering contract and data safety.
- `Python`: Fail-fast, Google docstrings, and "No Utils" modularity.
- `TypeScript`: Strict typing, React hooks, and component safety.
- `Security`: Trust boundaries, secret management, and injection gating.
- `Tests`: Determinism, bug-fix (repro-first) rule, and faking guidelines.

### Prompt Macros (Common Tasks)
- `/review`, `/create-issues`, `/update-issue`.

## 4. Transversal Engineering Contract

### Grounding & Ground Truth
- MUST NOT speculate or invent APIs, paths, or configurations.
- MUST inspect relevant files (configs, entrypoints, call sites) before proposing edits.
- If data or contracts are missing, MUST state explicit assumptions or ask for context.

### Fail-Fast Mandate
- MUST NOT implement silent fallback behavior or return hidden default values on failure.
- MUST ensure errors/exceptions are raised with actionable context to avoid "silent metric regressions."

### Atomic Change Discipline
- MUST keep change sets small, coherent, and single-intent.
- MUST split complex implementation into phases: `Plan` → `Minimal Safe Slice` → `Follow-ups`.
- MUST include concrete file paths in all summaries and verification steps.

### Structural Integrity ("No Utils")
- MUST NOT create or grow catch-all `utils.py` / `helpers.ts` dumping grounds.
- MUST place code in the closest feature-first domain submodule.

## 5. Security & Sensitive-Path Gating
The following paths are high-risk. Changes to them require **explicit user confirmation** before execution:
- `.github/workflows/**`, `infra/**`, `terraform/**`, `k8s/**`
- `secrets/**`, `.env*` (credential/config stores)
- `.codex/config.toml` (Core Codex policy)
- Model artifacts or registries (`models/**`, `artifacts/**`)

### Safety Boundaries:
- MUST NOT add secrets, API keys, tokens, or credentials to tracked files.
- MUST scrub all examples and documentation of real identifiers.

## 6. Communication Protocol
- **Limit Clarification**: Ask at most 2 focused questions only when ambiguity impacts a `MUST` rule or a sensitive path.
- **Ambiguity Rule**: Otherwise, proceed with the safest default and list all assumptions first.

## 7. Standard Verification Workflow
Before finalizing any multi-file change, agents MUST run local validation:
1. `node scripts/validate-copilot-files.mjs` (Copilot config/agent/instruction check)
2. `node scripts/validate-codex-files.mjs` (Codex config/role check)
3. Language-specific lints/tests as identified in the task context.

## 8. Required Output Format (Transversal)
For all non-trivial tasks (multi-file or architectural), the response MUST include:
1. **Summary/Intent**: One paragraph (What and Why).
2. **Phase Plan**: Steps to delivery (if complex).
3. **Change List**: Precise file paths and why each change was made.
4. **Verification**: Commands run and expected outcomes.
5. **Risks & Follow-ups**: Non-determinism, security, or metric concerns.
