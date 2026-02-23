---
name: "Python conventions"
description: "Python engineering rules: modular submodules, Google docstrings, fail-fast reliability, and small focused files."
applyTo: "**/*.py"
---

## Scope
Applies to all Python files unless a more specific instruction applies.

## Core Principles
- **Fail fast**: correctness and visibility over silent recovery.
- **Small, composable modules**: many `.py` files is acceptable; keep each file focused.
- **Clear boundaries**: put code where it conceptually belongs; avoid catch-all modules.
- **Extensible design**: define stable interfaces/bases; implement variants in separate files.

## Tooling
- MUST use **Google-style docstrings** for public functions/classes/modules.
- MUST keep imports clean and remove unused symbols.
- SHOULD use type hints broadly (esp. public APIs), but do not require `mypy`.

## Module & Submodule Organization (How to choose the “right home”)
### Rules of thumb
- Put code in the **closest domain/feature submodule** that owns the concept.
- Prefer *feature-first* grouping over technical layers (since this repo varies in style).
- Create a submodule when:
  - ≥2 files share a concept (same noun/verb), or
  - a component has multiple implementations/strategies, or
  - the file exceeds ~150–250 LOC or mixes concerns.

### Naming guidance
- Submodules should be named after the concept:
  - `parsing/`, `io/`, `serialization/`, `feature_flags/`, `auth/`, `storage/`, `training/`, `metrics/`, `cli/`, `pipeline/`, `sampling/`
- Avoid generic buckets like `common/` or `helpers/`.

### “No utils” policy
- MUST NOT create or grow `utils.py` / `helpers.py` style dumping grounds.
- If a function is broadly reusable:
  - Put it in a **properly named submodule** (e.g., `serialization/json.py`, `io/paths.py`, `cli/progress.py`),
  - Or attach it to the module that owns the concept.

## File Size & Granularity
- SHOULD keep `.py` files short and single-purpose.
- It is acceptable (and preferred) to have:
  - one file per function, or
  - one file per class, or
  - one file per small cohesive set of functions.
- When multiple similar functions/classes exist:
  - SHOULD introduce a **base abstraction** (base class/protocol) in the submodule,
  - and implement each variant in its own file for easy extension/replacement.

## Abstractions & Extensibility
- SHOULD use **composition over inheritance**.
- Use inheritance when:
  - there is a stable polymorphic contract (strategies/adapters), and
  - the base defines invariants or shared behavior.
- SHOULD keep interfaces/bases stable and small (few methods, explicit contracts).
- MUST keep I/O boundaries explicit (file/network/db), not hidden inside deep helpers.

## Error Handling (Fail-fast, no fallback)
- **THERE IS NO FALLBACK**:
  - MUST NOT silently continue on errors.
  - MUST NOT return default values that hide failures.
  - MUST raise an exception when something doesn’t work.
- MUST avoid blanket `except Exception` unless:
  - you immediately re-raise (or raise a more specific error) with context.
- SHOULD raise domain-specific exceptions when it improves clarity.
- SHOULD include actionable context in exceptions/logs (ids, parameters), but MUST NOT leak secrets.

## Function & Class Design
- SHOULD keep functions small with explicit inputs/outputs.
- MUST avoid hidden side effects at import time:
  - no network calls, file I/O, environment mutation, global initialization that can fail silently.
- SHOULD prefer explicit dependency injection (pass dependencies in) over global singletons.

## Documentation (Google docstrings)
- MUST document public APIs with:
  - summary line
  - Args / Returns
  - Raises (especially important with fail-fast policy)
- SHOULD include examples in docstrings for non-obvious behavior.

## CLI / Long-running scripts
- SHOULD use `tqdm` for progress reporting when iterating over large loops in CLI runs.
- SHOULD make progress behavior optional/toggleable (e.g., `--progress/--no-progress`) if building a CLI.
- MUST ensure long-running operations surface errors clearly (no suppressed exceptions).

## Testing Expectations
- MUST update/add tests for behavior changes.
- MUST keep tests deterministic across runs (control time/randomness/external I/O).
- For bug fixes: SHOULD add a failing test first unless impractical (state why).

## Output Contract (when proposing or reviewing changes)
For non-trivial work, include:
- **Files changed** (exact paths) and why each file is the correct home
- **Public API changes** (if any) and new exceptions raised
- **How to verify** (commands or minimal reproduction steps)