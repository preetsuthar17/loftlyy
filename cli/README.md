# @loftlyy/cli

Simple CLI for querying Loftlyy brand data.

## Install and Use

```bash
npm i -g @loftlyy/cli
```

Or run without installing:

```bash
npx @loftlyy/cli list
```

Quick examples:

```bash
loftlyy list
loftlyy search apple
loftlyy get apple
loftlyy palette apple --output json
```

## Command Reference

- `loftlyy list [--limit <n>]` - list brands (summary rows)
- `loftlyy get <slug>` - get one brand object
- `loftlyy search <query>` - full-text and hex-token search
- `loftlyy filter [options]` - facet filtering (`--industry`, `--tag`, `--color-family`, `--typography-style`, `--q`)
- `loftlyy similar <slug> [--limit <n>]` - similar brands
- `loftlyy palette <slug>` - palette JSON/table for one brand
- `loftlyy facets` - available filter values

Legacy namespace is still supported:

- `loftlyy brands ...`
- `loftlyy b ...`

## Global Options

- `--source <local|remote>` - where to load data from
- `--base-url <url>` - remote base URL override
- `--output <table|json|ndjson>` - output format
- `--strict` - fail fast on invalid brand data
- `--no-color` - disable ANSI colors

## Data Source Behavior

The CLI auto-detects default source:

- if `data/brands` exists in the current working directory -> `local`
- otherwise -> `remote`

Remote mode uses:

- default base URL: `https://loftlyy.com`
- endpoint: `GET /api/cli`
- response shape: `{ "brands": Brand[] }`

You can override the host:

```bash
loftlyy --source remote --base-url https://staging.loftlyy.com list
```

## How It Works

- `local` source: scans `data/brands/*.ts` (excluding `index.ts`), validates entries, then builds search/facet indexes.
- `remote` source: fetches `GET /api/cli`, validates each brand entry, then builds the same indexes.
- search is case-insensitive.
- slug commands (`get`, `similar`, `palette`) are case-insensitive.
- filter values are case-insensitive.

## Maintainer Guide

### Prerequisites

- Node 20+
- npm account with publish access to `@loftlyy/cli`

### Build the CLI package

From repository root:

```bash
pnpm cli:build
```

Or directly:

```bash
npm --prefix cli run build
```

Build output is `cli/dist/`.

### Bump Version

CLI package version lives in `cli/package.json`.

Patch:

```bash
npm --prefix cli version patch
```

Minor:

```bash
npm --prefix cli version minor
```

Major:

```bash
npm --prefix cli version major
```

If you do not want git tags/commits created automatically, use `--no-git-tag-version`.

### Publish to npm (manual)

1. Ensure you can publish the scope/package:

```bash
npm whoami
```

2. Build:

```bash
npm --prefix cli run build
```

3. Publish:

```bash
npm --prefix cli publish --access public
```

### Auth Token Setup

Local machine (recommended interactive setup):

```bash
npm login
```

CI setup (token-based):

1. Create an npm automation token in npm account settings.
2. Store it as `NPM_TOKEN` in CI secrets.
3. Configure npm auth in CI before publish:

```bash
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
```

Then run:

```bash
npm --prefix cli publish --access public
```

## Release Checklist

1. Confirm `/api/cli` is deployed and returning `{ brands: [...] }`.
2. Run checks:

```bash
pnpm typecheck
pnpm dlx oxlint cli app/api/cli/route.ts
npm --prefix cli run build
```

3. Bump `cli/package.json` version.
4. Publish `@loftlyy/cli`.
5. Smoke test:

```bash
npx @loftlyy/cli list
npx @loftlyy/cli search apple
npx @loftlyy/cli get apple
```
