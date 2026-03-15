# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `pnpm dev` (Next.js 16 with Turbopack)
- **Build**: `pnpm build`
- **Type check**: `pnpm typecheck`
- **Lint & format check**: `pnpm check` (runs Ultracite/Oxlint+Oxfmt)
- **Auto-fix lint & format**: `pnpm fix`
- **Optimize brand images**: `pnpm optimize` (runs `scripts/optimize-images.ts` via tsx)

No test runner is configured.

## Architecture

This is a **statically generated Next.js 16 app** (App Router, React 19) that serves as a brand identity reference — like Mobbin but for branding assets. It displays brand colors, typography, logos/assets, and usage guidelines.

### Data model

All brand data lives in `data/brands/` as TypeScript files exporting `Brand` objects (typed in `lib/types.ts`). `data/brands/index.ts` aggregates them into a sorted array and provides lookup helpers (`getAllBrands`, `getBrandBySlug`, `getBrandsByCategory`). To add a brand, create a new `.ts` file in `data/brands/`, export the `Brand` object, and import it in `data/brands/index.ts`. Brand images go in `public/brands/<slug>/`.

Categories are defined in `data/categories.ts`.

### Routing & i18n

Uses `next-intl` with 5 locales: en, es, fr, de, ja (always-prefixed URLs). Translation files are in `messages/<locale>.json`. The middleware (`middleware.ts`) handles locale detection/redirect. `i18n/routing.ts` defines locale config, `i18n/request.ts` loads messages.

Route structure:

- `app/[locale]/layout.tsx` — root locale layout (fonts, theme, i18n provider)
- `app/[locale]/(brands)/page.tsx` — brand listing / landing
- `app/[locale]/(brands)/[slug]/page.tsx` — individual brand detail (statically generated for all brand×locale combos)
- `app/[locale]/category/[category-slug]/page.tsx` — category view

### Key patterns

- **Static generation**: `generateStaticParams` is used for both locale and brand slug pages. All pages are pre-rendered.
- **Selective client hydration**: `NextIntlClientProvider` receives only `brand` and `nav` message namespaces (not the full message bundle).
- **Dynamic imports**: `BrandAssets`, `SimilarBrands`, and `BrandLegal` are lazy-loaded on brand detail pages.
- **Similar brands scoring**: `lib/filters.ts` contains a weighted scoring algorithm matching brands by shared categories, tags, color families, and typography styles.
- **Color classification**: `hexToColorFamily()` in `lib/filters.ts` converts hex colors to named families (red, blue, green, etc.) for filtering.

### UI

- Tailwind CSS v4 with `tw-animate-css`
- shadcn/ui components in `components/ui/`
- `class-variance-authority` + `tailwind-merge` (via `lib/utils.ts`) for component variants
- `@tabler/icons-react` for icons
- `next-themes` for dark mode
- **Always use `gap-*` instead of `space-x-*`/`space-y-*`** for spacing between children

## Code Quality

This project uses **Ultracite** (Oxlint + Oxfmt). Run `pnpm fix` before committing. Key rules:

- No `console.log`, `debugger`, or `alert` in production code
- Use `for...of` over `.forEach()` and indexed `for` loops
- Use Next.js `<Image>` component, not `<img>`
- React 19: use `ref` as a prop, not `React.forwardRef`
- Prefer Server Components; only use `"use client"` when necessary

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Oxlint + Oxfmt (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Oxlint + Oxfmt Can't Help

Oxlint + Oxfmt's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Oxlint + Oxfmt can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Oxlint + Oxfmt. Run `pnpm dlx ultracite fix` before committing to ensure compliance.
