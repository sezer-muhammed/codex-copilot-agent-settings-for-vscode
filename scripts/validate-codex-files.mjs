#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function listDirectories(relPath) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(relPath, d.name).replace(/\\/g, "/"));
}

function listFiles(relPath, suffix) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(suffix))
    .map((d) => path.join(relPath, d.name).replace(/\\/g, "/"));
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    data[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return data;
}

function validateRootFiles() {
  if (!exists("AGENTS.md")) errors.push("AGENTS.md: missing required cross-agent guidance file");
  if (!exists(".codex/config.toml")) errors.push(".codex/config.toml: missing project Codex config");
}

function validateCodexConfig() {
  if (!exists(".codex/config.toml")) return;
  const cfg = read(".codex/config.toml");
  if (!/^sandbox_mode\s*=\s*"[^"]+"/m.test(cfg)) {
    errors.push(".codex/config.toml: sandbox_mode must be set");
  }
  if (!/^approval_policy\s*=\s*"[^"]+"/m.test(cfg)) {
    errors.push(".codex/config.toml: approval_policy must be set");
  }
  if (!/^project_doc_fallback_filenames\s*=\s*\[/m.test(cfg)) {
    warnings.push(".codex/config.toml: project_doc_fallback_filenames not set");
  }
}

function validateRoles() {
  const roles = listFiles(".codex/roles", ".toml");
  if (roles.length === 0) {
    warnings.push("No role TOML files found in .codex/roles");
    return;
  }

  for (const rel of roles) {
    const content = read(rel);
    if (!/^sandbox_mode\s*=\s*"[^"]+"/m.test(content)) {
      warnings.push(`${rel}: sandbox_mode not set`);
    }
    if (!/^approval_policy\s*=\s*"[^"]+"/m.test(content)) {
      warnings.push(`${rel}: approval_policy not set`);
    }
  }
}

function printAndExit() {
  if (warnings.length) {
    console.log("Warnings:");
    for (const w of warnings) console.log(`- ${w}`);
  }

  if (errors.length) {
    console.error("Errors:");
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }

  console.log("Codex config validation passed.");
}

validateRootFiles();
validateCodexConfig();
validateRoles();
printAndExit();
