---
name: "review"
description: "Structured code review with severity buckets, risk scoring, and file:line references"
agent: "Reviewer"
---

## Scope
Review: ${input:scope:Changed files, PR diff text, commit range, or a directory}

## Context (optional but helpful)
- Goal / expected behavior: ${input:goal:What change is intended?}
- Runtime context: ${input:runtime:CLI/service/library; Next.js/Python; any constraints}
- How to run checks (if known): ${input:verify:commands or scripts}

## Review priorities (in order)
1) Correctness (fail-fast: no silent fallback)
2) Security (trigger when inputs/auth/secrets/network are involved)
3) Maintainability (clarity, modularity, correct module placement)
4) Performance (only when relevant)

## Non-negotiable rules
- MUST inspect relevant code before making claims.
- MUST include an exact reference for each Must-fix / Should-fix item:
  - `path/to/file.py:Lx-Ly` (approx ranges acceptable if exact lines are unavailable)
- MUST keep findings concrete: **issue → impact/risk → recommended fix**.
- MUST NOT request large rewrites unless risk clearly justifies it; prefer targeted fixes or phased steps.
- MUST flag any behavior that hides errors (fallbacks, swallowed exceptions, silent defaults).

## Required output format (exact sections)
### Summary
- One paragraph: what changed + overall risk level (**Low/Med/High**) + why.

### Must-fix
- `path:Lx-Ly` — issue → impact → fix

### Should-fix
- `path:Lx-Ly` — issue → impact → fix

### Suggestions
- `path:Lx-Ly` — improvement → rationale (brief)

### Verification commands
- Commands to run + expected outcome.
- If unknown, propose discovery steps:
  - Next.js: inspect `package.json` scripts
  - Python: inspect `pyproject.toml` / `requirements*` / test config

## Checklists (apply when relevant)
### Python
- Fail-fast error handling (no silent fallback; no swallowed exceptions)
- Google docstrings for public APIs
- Correct module placement (no `utils` dumping; prefer concept submodules)
- Deterministic tests (time/randomness/network controlled)

### Next.js
- Server/client boundary correctness (no secrets in client bundle)
- Data fetching consistency (server actions / route handlers as repo expects)
- Loading/error states for async changes