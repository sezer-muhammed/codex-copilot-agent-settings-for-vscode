---
name: "Security and sensitive-change rules"
description: "Security boundaries, secret handling, and high-risk change controls"
applyTo: "**/*"
---

## Secrets and Data Safety (MUST)
- MUST NOT commit secrets, credentials, private keys, or tokens.
- MUST NOT log sensitive user/system data at unsafe verbosity.
- MUST scrub examples and docs of real secrets.

## High-Risk Changes (MUST ASK)
Before editing these paths, request explicit confirmation:
- `.github/workflows/**`
- `infra/**`
- `terraform/**`
- `k8s/**`
- `secrets/**`
- `.codex/config.toml`

## Dependency and Supply Chain Rules
- MUST justify dependency additions and major upgrades.
- SHOULD prefer well-maintained packages with minimal permissions/scope.

## Injection and Auth Checks
- MUST validate and sanitize untrusted input paths.
- MUST review authn/authz assumptions for security-sensitive changes.
- SHOULD include security-focused tests for risky paths.

## MCP and External Tools
- MUST keep MCP/tool access allowlisted by role.
- MUST treat network/tool autonomy as elevated risk.
