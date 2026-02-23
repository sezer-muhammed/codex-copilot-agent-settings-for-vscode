---
name: "Testing expectations"
description: "Deterministic test design and verification rules"
applyTo: "**/*test*,**/tests/**"
---

## Scope
Applies to test files and test-related edits.

## Determinism (MUST)
- MUST control time using fakes/frozen clocks when time affects logic.
- MUST control randomness with fixed seeds or deterministic fixtures.
- MUST avoid live network calls in unit tests.
- MUST isolate filesystem state with temp directories/fixtures.

## Coverage Strategy
- SHOULD prefer unit tests first, then integration tests where cross-module behavior matters.
- SHOULD assert observable behavior, not private implementation details.

## Bug Fix Rule
- MUST add a failing test first for bug fixes unless impossible.
- If impossible, MUST explain why in the summary.

## Flakiness
- MUST NOT merge knowingly flaky tests.
- MUST document known instability and mitigation when encountered.
