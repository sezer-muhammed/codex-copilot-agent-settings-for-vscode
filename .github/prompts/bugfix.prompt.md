---
name: "bugfix"
description: "Fix a bug with reproduction clarity and deterministic test coverage"
agent: "Implementer"
tools: ["search", "read", "edit", "execute"]
---

Bug report:
- Reproduction: ${input:repro:How to reproduce?}
- Expected: ${input:expected:Expected behavior}
- Actual: ${input:actual:Actual behavior}

Required output:
1. Intent and constraints
2. Root-cause hypothesis
3. Failing test first (or explanation if impossible)
4. Fix summary with files changed
5. Verification commands and results

Rules:
- Keep fix narrowly scoped.
- Prefer minimal-risk changes and deterministic tests.
