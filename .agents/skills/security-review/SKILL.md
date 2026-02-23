---
name: security-review
description: Review a change for common security issues and output prioritized fixes.
---

1) Identify trust boundaries and external input paths.
2) Check injection surfaces (SQL, shell, template, HTML/JS, JSON/deserialization).
3) Verify authn/authz assumptions and privilege boundaries.
4) Check secret handling, logging, and error leakage.
5) Review dependency changes for supply-chain risk.
6) Output:
   - must-fix
   - should-fix
   - suggestion
   - security verification commands
