---
name: "General repository rules"
description: "Repository-wide engineering contract (Python + ML): correctness, reproducibility, data safety, and reviewable diffs."
applyTo: "**/*"
---

## Scope
Applies to all files unless a more specific scoped instruction applies (e.g., `python.instructions.md`, `ml.instructions.md`, `tests.instructions.md`).

## Objectives
- Deliver **correct, reproducible** changes with minimal risk.
- Prevent **data leakage**, **non-determinism**, and **silent metric regressions**.
- Keep diffs **reviewable** and decisions **traceable**.

## Must Rules (Non-negotiable)

### 1 Grounding and assumptions
- MUST inspect relevant files before proposing edits (read configs, entrypoints, and call sites).
- MUST NOT invent APIs, configs, dataset columns, file paths, or CLI commands that do not exist.
- MUST state explicit assumptions when requirements or data contracts are missing.

### 2 Change discipline
- MUST keep change sets small and coherent (single intent per change set).
- MUST split large work into phases (plan → minimal safe slice → follow-ups).
- MUST cite concrete file paths in summaries (and the functions/classes touched when useful).

### 3 Sensitive paths / safety boundaries
- MUST NOT alter sensitive paths without explicit confirmation:
  - `.github/workflows/**`, `infra/**`, `terraform/**`, `k8s/**`, deployment manifests
  - `secrets/**`, `.env*`, credential/config stores
  - model artifacts or registries (e.g., `models/**`, `artifacts/**`) unless task requires
- MUST NOT introduce secrets, API keys, tokens, or private endpoints into code, docs, tests, logs, or notebooks.

### 4 Dependencies and lockfiles (ML-safe)
- MUST justify any new dependency (why needed, alternatives, risk/maintenance cost).
- MUST keep lockfile updates minimal and reproducible (no unrelated upgrades).
- MUST NOT add heavy ML dependencies (e.g., GPU toolchains, large frameworks) unless explicitly requested and justified.

### 5 Data, privacy, and leakage prevention
- MUST treat datasets as **sensitive** unless explicitly public.
- MUST NOT commit raw data, samples, or derived datasets unless the repo already has an approved pattern.
- MUST avoid data leakage:
  - No test/val contamination in training
  - No label leakage via feature engineering
  - No target-derived features unless explicitly intended and documented
- MUST ensure any data split logic is explicit, stable, and documented.

### 6 Reproducibility and determinism
- MUST keep experiments reproducible:
  - seed control where randomness exists
  - fixed evaluation protocols
  - deterministic preprocessing where possible
- MUST surface sources of nondeterminism (GPU kernels, parallelism, randomness, external services).

### 7 Metrics, evaluation, and regressions
- MUST define/confirm the metric contract when changing modeling code (what metric, dataset, and threshold).
- MUST avoid silent behavior changes:
  - if outputs/metrics format changes, update downstream consumers and docs/tests
- MUST add or update tests/checks for meaningful behavior changes (unit or integration).

## Should Rules (Strong defaults)

### Maintainability
- SHOULD preserve existing patterns unless unsafe or clearly incorrect.
- SHOULD prioritize readability over cleverness (explicit > implicit for ML pipelines).
- SHOULD keep functions/modules cohesive; avoid hidden global state.

### Operational hygiene
- SHOULD add lightweight verification steps (lint/typecheck/tests) for non-trivial changes.
- SHOULD prefer configuration-driven changes (YAML/TOML) over hardcoding constants.

### Documentation
- SHOULD document:
  - dataset assumptions (schema, preprocessing, splits)
  - experiment config and how to reproduce results
  - training/eval entrypoints and expected artifacts

## Output Contract (Required response structure)
For multi-file or non-trivial tasks, include:
1) **Intent**
2) **Plan / phases** (if large)
3) **Changes (by file path)** — what/why
4) **Repro / Verification** — commands + expected outcomes (lint/tests/train-eval)
5) **Risks / Follow-ups** — leakage, nondeterminism, metric regressions, infra cost

## Conflict Handling
If this file conflicts with a prompt or active agent instruction, follow precedence defined in `AGENTS.md`.
If two `MUST` rules conflict, ask one focused question before editing.