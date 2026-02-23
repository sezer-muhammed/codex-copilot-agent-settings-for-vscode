---
name: "TypeScript conventions"
description: "TypeScript and React implementation rules for maintainable, safe changes"
applyTo: "**/*.ts,**/*.tsx"
---

## Scope
Applies to TypeScript and TSX files.

## Type Safety (MUST)
- MUST target strict typing (`strict` and `noImplicitAny` expectations).
- MUST avoid `any`; if unavoidable, add a narrow boundary and explain why.
- MUST prefer `unknown` + narrowing over unchecked casts.
- MUST keep public API types explicit.

## API and Module Design
- SHOULD prefer `type` over `interface` unless declaration merging is needed.
- SHOULD prefer named exports over default exports for shared modules.
- SHOULD keep barrel files stable and avoid circular dependencies.

## React Rules
- MUST use function components and hooks.
- SHOULD avoid memoization unless there is a measured reason.
- SHOULD keep component props typed and minimal.

## Anti-Patterns (MUST NOT)
- MUST NOT introduce unsafe non-null assertions without guard rationale.
- MUST NOT add deeply nested control flow when small helpers are clearer.
- MUST NOT ship dead code or unused exports.

## Testing
- MUST add or update tests for behavior changes.
- MUST keep tests deterministic (no uncontrolled time/random/network).
