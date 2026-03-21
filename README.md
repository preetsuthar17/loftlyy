# Loftlyy

A brand identity reference site — discover and explore brand colors, typography, logos, and design systems. Like Mobbin, but for branding.

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # then fill in your asset base URL
pnpm dev
```

## Commands

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Start dev server (Turbopack)  |
| `pnpm build`     | Production build              |
| `pnpm check`     | Lint & format check           |
| `pnpm fix`       | Auto-fix lint & format        |
| `pnpm validate`  | Validate brand data integrity |
| `pnpm typecheck` | TypeScript type check         |

## Environment Variables

See [.env.example](.env.example) for required variables. At minimum, set `NEXT_PUBLIC_ASSET_BASE_URL` to the base URL where brand assets (logos, fonts) are hosted.

## Adding a Brand

See [.claude/brand-guide.md](.claude/brand-guide.md) for the full guide on adding new brands.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, React 19)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl.dev/) (i18n — 9 locales)
- [Ultracite](https://github.com/haydenbleasel/ultracite) (Oxlint + Oxfmt)

## Trademark Disclaimer

All brand names, trademarks, logos, and visual identity elements displayed in this project are the exclusive property of their respective owners. They are shown here for informational and educational purposes only. This project is not affiliated with, endorsed by, or sponsored by any of the featured brands.

## License

[MIT](LICENSE)
