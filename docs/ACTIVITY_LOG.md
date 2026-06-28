# Activity Log

This file records all significant changes to the repository in chronological order.

---

## 2026-06-28

- **Initial template scaffold** — Created the full monorepo structure with Bun workspaces
- **Root configs** — Added `biome.json`, `tsconfig.json`, `bunfig.toml`, `jest.config.ts`, `playwright.config.ts`, `.gitignore`, `.env.example`
- **apps/web** — Scaffolded Next.js 15 App Router with TypeScript, security headers, health API, SEO metadata, dark-mode home page
- **apps/spa** — Scaffolded Vite 6 + React 19 SPA with React Router 7, PWA manifest, accessible navigation
- **packages/ui** — Created shared component library: `Button`, `Card`, `Badge`
- **packages/utils** — Created shared utilities: `cn()`, `validateEnv()`, `requireEnv()`, `logger`
- **packages/config** — Created shared tsconfig presets (base, react-app, nextjs)
- **tools/cve-lite** — Built CVE Lite CLI: scans package.json deps against OSV.dev batch API; table/JSON/minimal output; `--fail-on-high` for CI
- **tools/index-check** — Built Index Check CLI: validates barrel file completeness; auto-fix mode; excludes patterns
- **tests/** — Added Jest unit tests for utils, cve-scanner, index-checker; integration test for health API; Playwright E2E spec
- **.github/workflows/** — CI pipeline (install → typecheck → lint → test → build → CVE scan → index check); weekly security workflow
- **docs/** — Added `ARCHITECTURE.md`, `DECISIONS.md` (ADR-001 through ADR-006), `ACTIVITY_LOG.md`
- **scripts/** — Added `setup.sh`, `git-rollback.sh`, `check-env.sh`
- **README.md** — Full documentation with stack table, quick start, app/package/tool descriptions, CI table
- **CONTRIBUTING.md** — Branch naming, commit conventions, code standards, PR checklist

---
