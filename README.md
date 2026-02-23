# AI Agent Configuration & Policy Template

This repository is a central infrastructure for managing AI agent behavior across VS Code Copilot and Codex. It enforces a "Fail-Fast" engineering culture, ensuring that AI-assisted development is deterministic, secure, and accurate.

---

## 1. What is this?
This is a **configuration and policy framework** designed to standardize how AI agents interact with your codebase. It is not an application runtime; rather, it is a set of instructions, role definitions, and reusable prompts that govern agent autonomy.

### Core Components:
- **`AGENTS.md`**: The "Cross-Agent Spine" and normative source of truth for all agent priorities and safety boundaries.
- **Copilot Config (`.github/`)**: Custom instructions (`.instructions.md`), agent profiles (`.agent.md`), and reusable slash-command prompts (`.prompt.md`).
- **Codex Config (`.codex/`)**: TOML-based role mappings and execution policies for the Codex platform.
- **Validation Suite (`scripts/`)**: Node.js validators that ensure all AI configurations are syntactically correct and follow repository standards.

---

## 2. What does it help with?
This template solves common "AI drift" and safety issues by providing:
- **Platform Parity**: Ensures the same rules (Python, Security, Testing) apply whether you use VS Code Copilot or Codex.
- **Fail-Fast Error Handling**: Prevents agents from silently failing or returning hallucinated defaults; errors are surfaced with actionable context.
- **Sensitive Path Gating**: Automatically flags high-risk areas (e.g., `.github/workflows`, `infra/`, `secrets/`) for explicit developer confirmation.
- **Structured Workflows**: Provides off-the-shelf agents for specific phases: `Planner` (architecting), `Implementer` (coding), and `Reviewer` (quality gate).
- **Reduced Hallucination**: Enforces grounding by requiring agents to inspect actual project configs and call-sites before proposing edits.

---

## 3. How to install and use
Follow these steps to integrate this policy engine into your project.

### Installation
1. **Copy the Scaffolding**: Copy the following directories and files to your target repository root:
   - `AGENTS.md`
   - `.github/`
   - `.codex/` (if using Codex)
   - `scripts/`
2. **Setup Prerequisites**: Ensure you have Node.js (v20+) installed for validation.
3. **Verify Local Setup**:
   ```powershell
   node scripts/validate-copilot-files.mjs
   node scripts/validate-codex-files.mjs
   ```

### Daily Usage
- **In VS Code Copilot**:
  - Use **Slash Commands**: Trigger `/plan-feature` or `/review` directly from the chat.
  - **Agent Selection**: Use the `@` symbol in Copilot Chat to select specialized profiles like `Implementer` or `Security Reviewer`.
- **In Codex**:
  - The project will automatically load policies from `.codex/config.toml` once the workspace is trusted.
- **Maintaining Policy**:
  - Update `AGENTS.md` whenever you add new sensitive paths or core engineering priorities.
  - Run the validation scripts before committing any changes to instruction or prompt files.

---

## Repository Layout
- **`.github/prompts/`**: Reusable task templates (Bugfix, Refactor, Review).
- **`.github/instructions/`**: Language-specific rules (Python, TypeScript, ML).
- **`.codex/roles/`**: TOML definitions for Codex agent capabilities.
- **`docs/`**: Detailed conventions for prompts and security.

