import {
  IconArrowLeft,
  IconBrandNpm,
  IconTerminal2,
  IconSearch,
  IconFilter,
  IconPalette,
  IconCode,
  IconServer,
  IconTerminal,
  IconCpu,
} from "@tabler/icons-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    alternates: {
      canonical: `/${locale}/cli`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/cli`])
      ),
    },
    description:
      "Explore the official Loftlyy CLI. Search brands, extract color palettes, and query typography guidelines directly from your terminal.",
    title: `CLI Documentation | ${t("siteName")}`,
  }
}

const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#0A0A0A] shadow-sm dark:border-neutral-800">
    {title && (
      <div className="flex items-center border-b border-neutral-800/80 bg-[#111111] px-4 py-2.5">
        <div className="mr-4 flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        </div>
        <span className="font-mono text-xs text-neutral-400">{title}</span>
      </div>
    )}
    <div className="overflow-x-auto p-4 sm:p-5">
      <pre className="font-mono text-[13px] leading-relaxed text-neutral-50 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  </div>
)

const CommandCard = ({
  command,
  description,
  example,
  icon: Icon,
}: {
  command: string
  description: string
  example: string
  icon: React.ElementType
}) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/40">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
          <Icon size={20} stroke={1.5} />
        </div>
        <code className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {command}
        </code>
      </div>
    </div>
    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
      {description}
    </p>
    <div className="mt-auto pt-2">
      <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
        <code className="font-mono text-[13px] text-neutral-800 dark:text-neutral-300">
          {example}
        </code>
      </div>
    </div>
  </div>
)

const CliPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col px-4 py-12 sm:px-6 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)]" />

      {/* Header / Nav */}
      <div className="mb-16 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <IconArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to directory
        </Link>
        <a
          href="https://www.npmjs.com/package/@loftlyy/cli"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800/80"
        >
          <IconBrandNpm size={18} stroke={1.5} />
          View on npm
        </a>
      </div>

      {/* Hero Section */}
      <div className="mb-20 max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
          <IconTerminal2 size={14} className="text-neutral-500" />
          <span>Loftlyy CLI</span>
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white">
          Brand identity data,
          <br className="hidden sm:block" /> right in your terminal.
        </h1>
        <p className="text-lg leading-relaxed text-neutral-600 sm:text-xl dark:text-neutral-400">
          Access the world&apos;s most comprehensive brand design directory
          directly from your command line. Extract hex codes, query typography
          rules, and automate your design systems.
        </p>
      </div>

      {/* Installation */}
      <section className="mb-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Installation
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 text-neutral-600 dark:text-neutral-400">
            <p>
              Getting started is as simple as installing the package globally
              via npm. Once installed, the <code>loftlyy</code> command will be
              available everywhere on your system.
            </p>
            <p>
              Alternatively, you can run commands on-demand without installing
              by using <code>npx @loftlyy/cli</code>.
            </p>
          </div>
          <div>
            <CodeBlock
              title="Terminal"
              code={`# Install globally
npm install -g @loftlyy/cli

# Or run instantly via npx
npx @loftlyy/cli search vercel`}
            />
          </div>
        </div>
      </section>

      {/* Commands Reference */}
      <section className="mb-20">
        <div className="mb-8 max-w-2xl">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Commands Reference
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            A powerful suite of commands designed to seamlessly integrate with
            your workflow. All commands support short and descriptive arguments.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CommandCard
            icon={IconSearch}
            command="search <query>"
            description="Perform a fast, case-insensitive search across all brands using token and substring matching. Returns matching names, slugs, and primary industries."
            example="loftlyy search apple"
          />
          <CommandCard
            icon={IconTerminal}
            command="get <slug>"
            description="Retrieve comprehensive identity data for a specific brand, including raw asset URLs and full descriptions."
            example="loftlyy get stripe"
          />
          <CommandCard
            icon={IconPalette}
            command="palette <slug>"
            description="Extract the exact color palette for a brand, including hex values and usage details, formatted for easy use in your terminal or tooling."
            example="loftlyy palette linear"
          />
          <CommandCard
            icon={IconFilter}
            command="filter [options]"
            description="Filter the directory by specific characteristics like industry, color family, or typography style."
            example="loftlyy filter --color-family blue"
          />
          <CommandCard
            icon={IconCpu}
            command="similar <slug>"
            description="Discover brands with similar design patterns, matching by category, tags, and visual identity."
            example="loftlyy similar vercel"
          />
          <CommandCard
            icon={IconCode}
            command="list"
            description="Browse the complete directory. Use the --limit flag to constrain the output size."
            example="loftlyy list --limit 10"
          />
        </div>
      </section>

      {/* Automation & Architecture */}
      <section className="grid gap-12 border-t border-neutral-200 pt-16 md:grid-cols-2 dark:border-neutral-800">
        <div>
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <IconCode size={24} stroke={1.5} />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Built for pipelines
          </h3>
          <p className="mb-6 text-neutral-600 dark:text-neutral-400">
            Every command supports structured machine-readable outputs. Use the{" "}
            <code>--output json</code> or <code>--output ndjson</code> flags to
            pipe brand data directly into <code>jq</code>, build scripts, or
            your CI/CD environments.
          </p>
          <CodeBlock
            code={`# Extract just the primary color hex code
loftlyy get stripe --output json | jq -r '.colors[0].hex'
# Returns: #635BFF`}
          />
        </div>

        <div>
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <IconServer size={24} stroke={1.5} />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Smart data routing
          </h3>
          <p className="mb-6 text-neutral-600 dark:text-neutral-400">
            The CLI automatically adapts to your environment. By default, it
            fetches lightning-fast responses from the live Loftlyy API. If it
            detects you&apos;re inside the Loftlyy monorepo, it seamlessly
            switches to local file scanning.
          </p>
          <CodeBlock
            code={`# Force remote API mode with custom host
loftlyy list --source remote --base-url https://loftlyy.com

# Force local file system scanning
loftlyy list --source local`}
          />
        </div>
      </section>
    </main>
  )
}

export default CliPage
