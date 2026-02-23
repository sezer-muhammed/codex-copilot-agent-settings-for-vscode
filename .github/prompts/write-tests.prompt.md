---
name: "write-tests"
description: "Generate deterministic tests for active file or selected code"
agent: "Implementer"
tools: ["search", "read", "edit"]
---

Generate tests for [${fileBasename}](${file}).

Selection (if present):
${selection}

Framework: ${input:framework:vitest, jest, or pytest}
Scope: ${input:scope:unit, integration, or mixed}

Constraints:
- Do not modify production code unless tests cannot be written otherwise.
- Keep tests deterministic (time/random/network/filesystem controlled).
- Use clear test names that describe behavior.
