# Architecture

## Overview

This is a Bun-workspace monorepo containing two applications, three shared packages, and two CLI tools.

```
┌─────────────────────────────────────────────────────────────────┐
│                          Monorepo Root                          │
│                    (Bun Workspaces + Biome)                     │
└────────┬──────────────────┬───────────────────────┬────────────┘
         │                  │                        │
   ┌─────▼──────┐    ┌──────▼──────┐       ┌────────▼────────┐
   │  apps/web  │    │  apps/spa   │       │    packages/    │
   │ Next.js 15 │    │  Vite + RR  │       │  ui / utils /   │
   │ Port 9000  │    │  Port 9001  │       │    config       │
   └─────┬──────┘    └──────┬──────┘       └────────┬────────┘
         │                  │                        │
         └──────────────────┴────────────────────────┘
                  Consumes @template/ui + @template/utils
```

## Applications

### `apps/web` — Next.js 15 App Router

- **Rendering**: Server Components by default; use `"use client"` only at interaction boundaries
- **Routing**: File-system based, `src/app/` directory
- **API**: Route Handlers in `src/app/api/`
- **Config**: `next.config.ts` with security headers, remote image patterns, typed routes

### `apps/spa` — Vite + React 19

- **Routing**: React Router 7 (browser history)
- **Build**: Vite 6 with manual chunk splitting (vendor, router)
- **PWA**: Web manifest at `public/manifest.json`
- **API Proxy**: `/api` → `http://localhost:9000` in dev

## Packages

### `@template/ui`
Pure React component library. Zero runtime dependencies beyond React itself. Components are accessible (WCAG 2.1 AA target), typed with strict TypeScript, and styled with Tailwind utility classes.

### `@template/utils`
Framework-agnostic TypeScript utilities:
- `cn()` — class-name concatenation
- `validateEnv()` / `requireEnv()` — type-safe env validation with fast-fail
- `logger` — leveled console logger with child scopes

### `@template/config`
Shared configuration files only — no runtime code except a metadata export. Contains the three tsconfig presets used across all workspaces.

## CLI Tools

### `tools/cve-lite`
Queries the [OSV.dev](https://osv.dev) batch API to find known CVEs for npm (or other ecosystem) packages. Supports table, JSON, and minimal output formats. Designed to run in CI (`--fail-on-high`).

### `tools/index-check`
Scans a directory tree for TypeScript barrel file completeness. Detects:
- Directories with exportable files but no `index.ts`
- Existing `index.ts` files that don't re-export all sibling files

Can auto-fix both kinds of issues.

## Data Flow

```
Browser
  │
  ├─── /  ──────────────────▶  Next.js RSC (apps/web)
  │                              └── @template/ui (server)
  │
  ├─── /api/health  ────────▶  Next.js Route Handler
  │
  └─── http://localhost:9001 ▶  Vite Dev Server (apps/spa)
                                  ├── React Router
                                  └── @template/ui (client)
```

## Key Design Decisions

See [DECISIONS.md](DECISIONS.md) for ADR entries.
