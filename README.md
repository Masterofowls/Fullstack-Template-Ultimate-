# TypeScript React Fullstack Template

A production-grade, opinionated monorepo template for building modern TypeScript React fullstack applications. Ships with Next.js, Vite, Biome, Bun workspaces, Jest, a CVE scanner CLI, and an index-check CLI — all pre-wired and ready to clone.

## Contents

- [Stack](#stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Apps](#apps)
- [Packages](#packages)
- [CLI Tools](#cli-tools)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## Stack

| Layer | Tool | Version |
|---|---|---|
| Runtime / Package Manager | [Bun](https://bun.sh) | ≥ 1.1 |
| Frontend (fullstack) | [Next.js](https://nextjs.org) | 15 |
| Frontend (SPA) | [Vite](https://vitejs.dev) + React | 6 / 19 |
| Language | TypeScript (strict) | 5.7 |
| Linting + Formatting | [Biome](https://biomejs.dev) | 1.9 |
| Unit / Integration Tests | [Jest](https://jestjs.io) + ts-jest | 29 |
| E2E Tests | [Playwright](https://playwright.dev) | 1.49 |
| CVE Scanner | CVE Lite CLI (built-in) | — |
| Index Validator | Index Check CLI (built-in) | — |

---

## Project Structure

```
.
├── apps/
│   ├── web/                # Next.js 15 App Router (port 9000)
│   └── spa/                # Vite 6 React SPA (port 9001)
├── packages/
│   ├── ui/                 # Shared React components (@template/ui)
│   ├── config/             # Shared tsconfig + biome base configs
│   └── utils/              # Shared utilities (@template/utils)
├── tools/
│   ├── cve-lite/           # CVE vulnerability scanner CLI
│   └── index-check/        # Barrel file / export completeness CLI
├── tests/
│   ├── unit/               # Jest unit tests
│   ├── integration/        # Jest integration tests
│   └── e2e/                # Playwright end-to-end tests
├── docs/                   # Architecture, decisions, activity log
├── scripts/                # Setup and utility shell scripts
├── .github/workflows/      # CI/CD (GitHub Actions)
├── biome.json              # Biome config (lint + format)
├── bunfig.toml             # Bun configuration
├── jest.config.ts          # Jest configuration
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json           # Root TypeScript config
```

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.1
- Node.js ≥ 20 (for Jest / Playwright)

```bash
# 1. Clone the template
git clone <repo-url> my-project
cd my-project

# 2. Install all workspace dependencies
bun install

# 3. Copy environment template
cp .env.example .env.local

# 4. Start development
bun run dev:web    # Next.js on http://localhost:9000
bun run dev:spa    # Vite SPA on http://localhost:9001
```

---

## Apps

### `apps/web` — Next.js 15

- App Router with Server Components and streaming
- Turbopack in development (`--turbopack`)
- Security headers pre-configured in `next.config.ts`
- `/api/health` route for uptime checks
- SEO metadata with `generateMetadata`, Open Graph, Twitter cards

```bash
bun run dev:web          # Start dev server (port 9000)
bun run build:web        # Production build
```

### `apps/spa` — Vite + React

- React 19 with React Router 7
- PWA manifest + offline-ready structure
- Proxy config for `/api` → Next.js
- Code-split vendor/router chunks

```bash
bun run dev:spa          # Start dev server (port 9001)
bun run build:spa        # Production build
```

---

## Packages

### `@template/ui`

Shared, accessible React component library:

- `Button` — variants (primary, secondary, ghost, danger), sizes, loading state
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Badge` — severity variants (success, warning, error, info)

```ts
import { Button, Card, Badge } from "@template/ui";
```

### `@template/utils`

Shared TypeScript utilities:

```ts
import { cn, validateEnv, requireEnv, logger } from "@template/utils";

// Class name helper
cn("base", isActive && "active", className);

// Validate env at startup — crashes fast with clear messages
validateEnv({ DATABASE_URL: { required: true }, PORT: { required: false, default: "9000" } });

// Structured logger with levels
logger.info("Server started", { port: 9000 });
logger.child("Auth").warn("Token expired");
```

### `@template/config`

Shared `tsconfig` presets:
- `base.json` — strict Node.js config
- `react-app.json` — Vite/SPA with JSX
- `nextjs.json` — Next.js App Router

---

## CLI Tools

### CVE Lite (`bun run cve`)

Lightweight vulnerability scanner powered by the [OSV.dev](https://osv.dev) API.
No API key required. Works offline-capable with graceful errors.

```bash
# Scan current directory
bun run cve

# Scan specific path
bun run cve -- --path apps/web

# CI mode: exit code 1 on HIGH/CRITICAL
bun run cve -- --fail-on-high

# Output as JSON (for piping / reporting)
bun run cve -- --format json > report.json

# Include dev dependencies
bun run cve -- --include-dev
```

**Options:**

| Flag | Description | Default |
|---|---|---|
| `--path` | Directory to scan | `.` |
| `--ecosystem` | Package ecosystem | `npm` |
| `--format` | `table` \| `json` \| `minimal` | `table` |
| `--fail-on-high` | Exit 1 on HIGH or CRITICAL findings | `false` |
| `--include-dev` | Scan devDependencies too | `false` |
| `--osv-api` | OSV API base URL | `https://api.osv.dev/v1` |

---

### Index Check (`bun run index-check`)

Validates that every TypeScript directory with exportable files has a complete barrel (`index.ts`) file — and that all exports are re-exported.

```bash
# Check packages directory
bun run index-check -- --path packages

# Auto-fix missing index files
bun run index-check -- --path packages --auto-fix

# Output as JSON
bun run index-check -- --format json

# Exclude test directories
bun run index-check -- --exclude "__tests__,test,__mocks__"
```

**Options:**

| Flag | Description | Default |
|---|---|---|
| `--path` | Root directory to scan | `.` |
| `--ext` | File extensions to check | `ts,tsx` |
| `--auto-fix` | Create/update missing index files | `false` |
| `--exclude` | Comma-separated patterns to skip | `node_modules,dist` |
| `--format` | `table` \| `json` | `table` |

---

## Testing

```bash
# Unit tests (Jest)
bun run test:unit

# Integration tests
bun run test:integration

# E2E tests (Playwright) — requires running app
bun run test:e2e

# All unit + integration tests with coverage
bun run test -- --coverage

# Watch mode
bun run test:watch
```

Test structure follows the **AAA pattern** (Arrange, Act, Assert) and is organized into:

- `tests/unit/` — pure function tests, fast and isolated
- `tests/integration/` — API tests against a running server
- `tests/e2e/` — browser flows via Playwright

---

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

| Workflow | Trigger | Jobs |
|---|---|---|
| `ci.yml` | Push / PR to `main`, `develop` | Install → Typecheck + Lint → Test → Build → CVE Scan → Index Check |
| `security.yml` | Weekly (Monday 06:00 UTC) | Full CVE scan incl. dev deps |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Required variables are validated at runtime using `validateEnv()`. Missing required variables cause the app to crash immediately with a descriptive error — no silent failures.

See [`.env.example`](.env.example) for the full list and descriptions.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines, branch naming, and PR conventions.

---

## License

MIT
