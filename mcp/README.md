# @loftlyy/mcp

MCP (Model Context Protocol) server for the [Loftlyy](https://loftlyy.com) brand identity database. Search, explore, and generate branding guides powered by real-world brand data.

## What is Loftlyy?

Loftlyy is a brand identity reference — like Mobbin but for branding. It catalogs colors, typography, logos, and design systems for 50+ brands. This MCP server makes that data directly accessible to LLMs.

## Quick Start

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "loftlyy": {
      "command": "npx",
      "args": ["-y", "@loftlyy/mcp"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add loftlyy -- npx -y @loftlyy/mcp
```

### Cursor / Other MCP Clients

Use stdio transport with `npx -y @loftlyy/mcp`.

## Tools

| Tool             | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `list-brands`    | List all brands with name, industry, categories, and summaries              |
| `get-brand`      | Get complete brand profile by slug (colors, typography, assets, philosophy) |
| `search-brands`  | Search by text keywords or hex color codes                                  |
| `filter-brands`  | Filter by industry, tags, color families, typography styles                 |
| `similar-brands` | Find similar brands using weighted scoring algorithm                        |
| `brand-palette`  | Get a brand's color palette with hex codes and usage                        |
| `brand-facets`   | Get all available filter values                                             |

### Example Usage

> "What colors does Stripe use?"
> → The LLM calls `brand-palette` with slug `stripe`

> "Find brands similar to Apple"
> → The LLM calls `similar-brands` with slug `apple`

> "Show me fintech brands with blue color schemes"
> → The LLM calls `filter-brands` with `industries: ["fintech"]` and `colorFamilies: ["blue"]`

## Resources

| URI Pattern      | Description                             |
| ---------------- | --------------------------------------- |
| `brand://{slug}` | Complete brand identity profile as JSON |

Resources are application-controlled data that clients can subscribe to. Each brand is available as a `brand://{slug}` resource containing the full brand profile.

## Prompts

| Prompt                    | Description                                                                      |
| ------------------------- | -------------------------------------------------------------------------------- |
| `generate-branding-guide` | Generate a complete branding guide for your company inspired by reference brands |
| `compare-brands`          | Compare branding strategies of 2-5 brands side by side                           |
| `suggest-color-palette`   | Get data-driven color palette suggestions based on real brand palettes           |

### Generate Branding Guide

The primary workflow — create a brand identity for your company:

1. Use `list-brands` or `search-brands` to find reference brands
2. Select the `generate-branding-guide` prompt
3. Provide your company details and reference brand slugs
4. Get a complete branding guide with colors, typography, logo direction, and brand voice

### Compare Brands

Analyze how 2-5 brands approach their visual identity differently — color strategies, typography choices, and brand positioning.

### Suggest Color Palette

Get 3 unique palette suggestions grounded in real brand color data. Filter by color family, reference brand, or industry.

## Configuration

| Environment Variable | Description                                 | Default               |
| -------------------- | ------------------------------------------- | --------------------- |
| `LOFTLYY_SOURCE`     | Data source: `local` or `remote`            | Auto-detected         |
| `LOFTLYY_BASE_URL`   | Remote API base URL                         | `https://loftlyy.com` |
| `LOFTLYY_ROOT_DIR`   | Root directory for local source             | `process.cwd()`       |
| `LOFTLYY_STRICT`     | Fail on invalid brand data (`true`/`false`) | `false`               |

### Data Source

- **Remote** (default): Fetches brand data from `https://loftlyy.com/api/cli`
- **Local**: Reads brand data from TypeScript files in `data/brands/` (auto-detected when running inside the Loftlyy repo)

## Development

### Build

```bash
cd mcp
npm install
npm run build
```

### Test with MCP Inspector

```bash
LOFTLYY_SOURCE=local \
LOFTLYY_ROOT_DIR=/Users/preet/Desktop/Work/Personal/loftlyy \
npx @modelcontextprotocol/inspector node /Users/preet/Desktop/Work/Personal/loftlyy/mcp/dist/index.js
```

### Local Development Config

```json
{
  "mcpServers": {
    "loftlyy": {
      "command": "node",
      "args": ["/Users/preet/Desktop/Work/Personal/loftlyy/mcp/dist/index.js"],
      "env": {
        "LOFTLYY_SOURCE": "local",
        "LOFTLYY_ROOT_DIR": "/Users/preet/Desktop/Work/Personal/loftlyy"
      }
    }
  }
}
```

When running the built server from outside the repo root, set `LOFTLYY_ROOT_DIR` explicitly so local mode can read `data/brands/` from the Loftlyy checkout instead of falling back to the client's current working directory.

## Publishing

```bash
npm --prefix mcp version [patch|minor|major]
npm --prefix mcp publish --access public
```

## License

[MIT](../LICENSE)
