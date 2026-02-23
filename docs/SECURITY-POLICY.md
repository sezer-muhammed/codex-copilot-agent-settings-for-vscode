# Security Policy For Agent Configuration

## Security Priorities
- Prevent secret exposure.
- Reduce unsafe autonomous tool behavior.
- Enforce explicit human confirmation for high-risk edits.

## Non-Negotiables
- Never commit credentials, secrets, tokens, or private keys.
- Never bypass sensitive-path confirmation rules.
- Never expand MCP/tool access without explicit allowlist intent.

## Sensitive Paths
Changes to these paths require explicit approval:
- `.github/workflows/**`
- `infra/**`
- `terraform/**`
- `k8s/**`
- `secrets/**`
- `.codex/config.toml`

## MCP Policy
- Start with read-only MCP tools where possible.
- Keep the tool surface minimal per agent.
- Store secrets only in environment variables.
- For Copilot coding agent scenarios, use `COPILOT_MCP_` prefixed secrets when required.

## Dependency Policy
- Dependency additions require justification (`what`, `why`, `alternatives`).
- Security-impacting upgrades should include risk notes and verification steps.

## CI Enforcement
- Run `node scripts/validate-copilot-files.mjs`.
- Run `node scripts/validate-codex-files.mjs`.
- Fail CI on validation errors.
