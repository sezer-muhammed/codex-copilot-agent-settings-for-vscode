---
name: "refactor"
description: "Execute a safe refactor with behavioral parity and verification evidence"
agent: "Implementer"
tools: ["search", "read", "edit", "execute"]
---

Goal: ${input:goal:What should be improved?}

Scope:
- Target path: ${input:path:Which folder/file?}
- Constraints: ${input:constraints:Compatibility, performance, or API constraints}

Required output:
1. Intent and constraints
2. Refactor plan
3. File-by-file change list
4. Verification commands and results
5. Residual risks and rollback strategy

Rules:
- Maintain behavior unless explicitly instructed otherwise.
- Avoid large rewrites when a phased refactor is possible.
