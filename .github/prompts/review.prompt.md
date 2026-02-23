---
name: "review"
description: "Perform a structured review with severity buckets and precise file references"
agent: "Reviewer"
tools: [vscode/getProjectSetupInfo, vscode/installExtension, vscode/memory, vscode/newWorkspace, vscode/openIntegratedBrowser, vscode/runCommand, vscode/vscodeAPI, vscode/extensions, vscode/askQuestions, execute/runNotebookCell, execute/testFailure, execute/getTerminalOutput, execute/awaitTerminal, execute/killTerminal, execute/createAndRunTask, execute/runInTerminal, read/getNotebookSummary, read/problems, read/readFile, read/readNotebookCellOutput, read/terminalSelection, read/terminalLastCommand, agent/askQuestions, agent/runSubagent, edit/createDirectory, edit/createFile, edit/createJupyterNotebook, edit/editFiles, edit/editNotebook, edit/rename, search/changes, search/codebase, search/fileSearch, search/listDirectory, search/searchResults, search/textSearch, search/searchSubagent, search/usages, web/fetch, web/githubRepo, gitkraken/git_add_or_commit, gitkraken/git_blame, gitkraken/git_branch, gitkraken/git_checkout, gitkraken/git_log_or_diff, gitkraken/git_push, gitkraken/git_stash, gitkraken/git_status, gitkraken/git_worktree, gitkraken/gitkraken_workspace_list, gitkraken/gitlens_commit_composer, gitkraken/gitlens_launchpad, gitkraken/gitlens_start_review, gitkraken/gitlens_start_work, gitkraken/issues_add_comment, gitkraken/issues_assigned_to_me, gitkraken/issues_get_detail, gitkraken/pull_request_assigned_to_me, gitkraken/pull_request_create, gitkraken/pull_request_create_review, gitkraken/pull_request_get_comments, gitkraken/pull_request_get_detail, gitkraken/repository_get_file_content, todo]
---

Here’s an optimized review.prompt.md that’s more operational, enforces file:line references, includes a risk summary, and bakes in your fail-fast + Python/Next.js awareness without being bloated.

---
name: "review"
description: "Structured code review with severity buckets, risk scoring, and file:line references"
agent: "Reviewer"
tools: ["search", "read", "fetch"]
---

## Scope
Review: ${input:scope:Changed files, PR diff text, commit range, or a directory}

## Context (optional but helpful)
- Goal / expected behavior: ${input:goal:What change is intended?}
- Runtime context: ${input:runtime:CLI/service/library; Next.js/Python; any constraints}
- How to run checks (if known): ${input:verify:commands or scripts}

## Review priorities (in order)
1) Correctness (fail-fast: no silent fallback)
2) Security (trigger when inputs/auth/secrets/network are involved)
3) Maintainability (clarity, modularity, correct module placement)
4) Performance (only when relevant)

## Non-negotiable rules
- MUST inspect relevant code before making claims.
- MUST include an exact reference for each Must-fix / Should-fix item:
  - `path/to/file.py:Lx-Ly` (approx ranges acceptable if exact lines are unavailable)
- MUST keep findings concrete: **issue → impact/risk → recommended fix**.
- MUST NOT request large rewrites unless risk clearly justifies it; prefer targeted fixes or phased steps.
- MUST flag any behavior that hides errors (fallbacks, swallowed exceptions, silent defaults).

## Required output format (exact sections)
### Summary
- One paragraph: what changed + overall risk level (**Low/Med/High**) + why.

### Must-fix
- `path:Lx-Ly` — issue → impact → fix

### Should-fix
- `path:Lx-Ly` — issue → impact → fix

### Suggestions
- `path:Lx-Ly` — improvement → rationale (brief)

### Verification commands
- Commands to run + expected outcome.
- If unknown, propose discovery steps:
  - Next.js: inspect `package.json` scripts
  - Python: inspect `pyproject.toml` / `requirements*` / test config

## Checklists (apply when relevant)
### Python
- Fail-fast error handling (no silent fallback; no swallowed exceptions)
- Google docstrings for public APIs
- Correct module placement (no `utils` dumping; prefer concept submodules)
- Deterministic tests (time/randomness/network controlled)

### Next.js
- Server/client boundary correctness (no secrets in client bundle)
- Data fetching consistency (server actions / route handlers as repo expects)
- Loading/error states for async changes