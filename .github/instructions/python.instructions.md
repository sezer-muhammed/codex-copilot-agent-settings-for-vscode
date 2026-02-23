---
name: "Python conventions"
description: "Python coding and reliability rules for services, scripts, and tests"
applyTo: "**/*.py"
---

## Scope
Applies to Python files.

## Tooling Expectations
- SHOULD align with `ruff`, `black`, and `mypy` where available.
- MUST keep imports clean and remove unused symbols.

## Typing and API Design
- MUST type public function signatures unless the file is explicitly dynamic.
- SHOULD use small composable functions with explicit return behavior.
- MUST avoid broad exception handling that swallows failures.

## Error Handling
- MUST raise or re-raise with context when handling exceptions.
- SHOULD log actionable context without leaking secrets.
- MUST avoid blanket `except Exception` unless followed by controlled re-raise.

## Anti-Patterns (MUST NOT)
- MUST NOT introduce hidden side effects in module import paths.
- MUST NOT mix unrelated concerns in large functions when extraction is feasible.

## Testing
- MUST update tests for behavior changes.
- MUST keep test outcomes deterministic across runs.
