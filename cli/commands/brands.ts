import { InvalidArgumentError } from "commander"
import type { Command } from "commander"
import ora from "ora"
import pc from "picocolors"
import type { OutputMode } from "@/cli/core/contracts"
import {
  renderBrandDetailTable,
  renderBrandListTable,
  renderFacetsTable,
  renderJson,
  renderNdjson,
  renderPaletteTable,
  renderSimilarBrandsTable,
} from "@/cli/core/formatters"
import { loadBrands } from "@/cli/core/loader"
import {
  filterSidebarBrands,
  getBrandFacets,
  getBrandPalette,
  getSimilarBrandsForSlug,
  requireBrandBySlug,
  searchSidebarBrands,
  validateFilterInput,
} from "@/cli/core/query"
import { writeStderr, writeStdout } from "@/cli/core/stdio"

interface CommandGlobalOptions {
  baseUrl?: string
  color?: boolean
  source?: "local" | "remote"
  output?: OutputMode
  strict?: boolean
}

interface RuntimeContext {
  baseUrl?: string
  colorEnabled: boolean
  outputMode: OutputMode
  source: "local" | "remote"
  strict: boolean
}

interface LoadedCommandContext extends RuntimeContext {
  loaded: Awaited<ReturnType<typeof loadBrands>>
}

const parsePositiveInt = (value: string): number => {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new InvalidArgumentError("value must be a positive integer")
  }

  return parsed
}

const collectValues = (input: string, previous: string[]): string[] => {
  const values = input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
  return [...previous, ...values]
}

const getRuntimeContext = (
  command: Command,
  defaultOutputMode: OutputMode
): RuntimeContext => {
  const globalOptions = command.optsWithGlobals() as CommandGlobalOptions
  const outputMode = globalOptions.output ?? defaultOutputMode
  const source = globalOptions.source ?? "local"

  return {
    baseUrl: globalOptions.baseUrl,
    colorEnabled:
      globalOptions.color !== false &&
      outputMode === "table" &&
      process.stdout.isTTY === true,
    outputMode,
    source,
    strict: Boolean(globalOptions.strict),
  }
}

const normalizeSelectionValues = (values: string[]): string[] => {
  const result: string[] = []
  const seen = new Set<string>()

  for (const value of values) {
    const normalized = value.trim()
    if (!normalized) {
      continue
    }

    const key = normalized.toLowerCase()
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    result.push(normalized)
  }

  return result
}

const canonicalizeAgainstAllowed = (
  values: string[],
  allowed: string[]
): string[] => {
  const normalizedValues = normalizeSelectionValues(values)
  const byLowerCase = new Map(allowed.map((item) => [item.toLowerCase(), item]))

  return normalizedValues.map(
    (value) => byLowerCase.get(value.toLowerCase()) ?? value
  )
}

const printWarnings = (warnings: string[], runtime: RuntimeContext): void => {
  if (warnings.length === 0) {
    return
  }

  const warningLabel = runtime.colorEnabled ? pc.yellow("Warnings") : "Warnings"
  writeStderr(`${warningLabel} (${warnings.length}):`)
  for (const warning of warnings) {
    writeStderr(`- ${warning}`)
  }
}

const loadCommandContext = async (
  command: Command,
  defaultOutputMode: OutputMode,
  spinnerText: string
): Promise<LoadedCommandContext> => {
  const runtime = getRuntimeContext(command, defaultOutputMode)
  const shouldShowSpinner =
    runtime.outputMode === "table" && process.stderr.isTTY === true

  if (!shouldShowSpinner) {
    const loaded = await loadBrands({
      baseUrl: runtime.baseUrl,
      source: runtime.source,
      strict: runtime.strict,
    })
    printWarnings(loaded.warnings, runtime)
    return { ...runtime, loaded }
  }

  const spinner = ora(spinnerText).start()
  try {
    const loaded = await loadBrands({
      baseUrl: runtime.baseUrl,
      source: runtime.source,
      strict: runtime.strict,
    })
    spinner.succeed(`Loaded ${loaded.brands.length} brands`)
    printWarnings(loaded.warnings, runtime)
    return { ...runtime, loaded }
  } catch (error) {
    spinner.fail("Failed to load brand data")
    throw error
  }
}

const printByMode = (
  mode: OutputMode,
  value: unknown,
  tableOutput: string
): void => {
  if (mode === "json") {
    writeStdout(renderJson(value))
    return
  }

  if (mode === "ndjson") {
    writeStdout(renderNdjson(value))
    return
  }

  writeStdout(tableOutput)
}

const registerListCommand = (target: Command): void => {
  target
    .command("list")
    .description("Return all brands in summary view")
    .option("--limit <n>", "Limit number of rows", parsePositiveInt)
    .addHelpText(
      "after",
      "\nExamples:\n  loftlyy list\n  loftlyy list --limit 10 --output json"
    )
    .action(async function listAction(options: { limit?: number }) {
      const context = await loadCommandContext(
        this as Command,
        "table",
        "Discovering brand files"
      )

      const results =
        options.limit && options.limit > 0
          ? context.loaded.sidebarBrands.slice(0, options.limit)
          : context.loaded.sidebarBrands

      printByMode(
        context.outputMode,
        results,
        renderBrandListTable(results, context)
      )
    })
}

const registerGetCommand = (target: Command): void => {
  target
    .command("get [slug]")
    .description("Return full brand data for one brand")
    .option("--slug <slug>", "Brand slug")
    .addHelpText(
      "after",
      "\nExamples:\n  loftlyy get apple\n  loftlyy get --slug stripe --output table"
    )
    .action(async function getAction(slugArg?: string) {
      const command = this as Command
      const options = command.opts<{ slug?: string }>()
      const slug = slugArg ?? options.slug
      if (!slug) {
        throw new InvalidArgumentError("Provide a slug: loftlyy get <slug>")
      }

      const context = await loadCommandContext(command, "json", "Loading brand")
      const brand = requireBrandBySlug(context.loaded.brands, slug)

      printByMode(
        context.outputMode,
        brand,
        renderBrandDetailTable(brand, context)
      )
    })
}

const registerSearchCommand = (target: Command): void => {
  target
    .command("search [query...]")
    .description("Search brands by text and hex tokens")
    .option("--q <query>", "Search query")
    .addHelpText(
      "after",
      '\nExamples:\n  loftlyy search apple\n  loftlyy search "#ff0000 ai"\n  loftlyy search --q "design system"'
    )
    .action(async function searchAction(queryArgs?: string[]) {
      const command = this as Command
      const options = command.opts<{ q?: string }>()
      const positionalQuery = (queryArgs ?? []).join(" ").trim()
      const query = options.q?.trim() || positionalQuery

      if (!query) {
        throw new InvalidArgumentError(
          'Provide a query: loftlyy search "apple"'
        )
      }

      const context = await loadCommandContext(
        command,
        "table",
        "Searching brands"
      )
      const results = searchSidebarBrands(context.loaded.sidebarBrands, query)

      printByMode(
        context.outputMode,
        results,
        renderBrandListTable(results, context)
      )
    })
}

const registerFilterCommand = (target: Command): void => {
  target
    .command("filter")
    .description("Filter brands by facets and optional query")
    .option("--industry <value>", "Industry slug", collectValues, [])
    .option("--tag <value>", "Tag", collectValues, [])
    .option("--color-family <value>", "Color family", collectValues, [])
    .option("--typography-style <value>", "Typography style", collectValues, [])
    .option("--q <query>", "Optional text/hex query", "")
    .addHelpText(
      "after",
      '\nExamples:\n  loftlyy filter --industry technology --tag innovation\n  loftlyy filter --color-family blue --typography-style sans-serif --q "ai"'
    )
    .action(async function filterAction(options: {
      colorFamily: string[]
      industry: string[]
      q: string
      tag: string[]
      typographyStyle: string[]
    }) {
      const context = await loadCommandContext(
        this as Command,
        "table",
        "Applying brand filters"
      )
      const facets = getBrandFacets(context.loaded.sidebarBrands)

      const input = {
        colorFamilies: canonicalizeAgainstAllowed(
          options.colorFamily,
          facets.colorFamilies
        ),
        industries: canonicalizeAgainstAllowed(
          options.industry,
          facets.industries
        ),
        query: options.q,
        tags: canonicalizeAgainstAllowed(options.tag, facets.tags),
        typographyStyles: canonicalizeAgainstAllowed(
          options.typographyStyle,
          facets.typographyStyles
        ),
      }

      validateFilterInput(input, facets)
      const results = filterSidebarBrands(context.loaded.sidebarBrands, input)

      printByMode(
        context.outputMode,
        results,
        renderBrandListTable(results, context)
      )
    })
}

const registerSimilarCommand = (target: Command): void => {
  target
    .command("similar <slug>")
    .description("Find brands similar to a given slug")
    .option("--limit <n>", "Limit number of results", parsePositiveInt, 5)
    .addHelpText(
      "after",
      "\nExamples:\n  loftlyy similar apple\n  loftlyy similar apple --limit 10 --output json"
    )
    .action(async function similarAction(
      slug: string,
      options: { limit: number }
    ) {
      const context = await loadCommandContext(
        this as Command,
        "table",
        "Calculating similar brands"
      )

      const similarBrands = getSimilarBrandsForSlug(
        context.loaded.brands,
        slug,
        options.limit
      )

      const jsonRows = similarBrands.map((brand, index) => ({
        categories: brand.categories,
        industry: brand.industry,
        name: brand.name,
        rank: index + 1,
        slug: brand.slug,
        tags: brand.tags ?? [],
      }))

      printByMode(
        context.outputMode,
        jsonRows,
        renderSimilarBrandsTable(slug, similarBrands, context)
      )
    })
}

const registerPaletteCommand = (target: Command): void => {
  target
    .command("palette <slug>")
    .description("Output brand palette as JSON list")
    .addHelpText(
      "after",
      "\nExamples:\n  loftlyy palette apple\n  loftlyy palette stripe --output table"
    )
    .action(async function paletteAction(slug: string) {
      const context = await loadCommandContext(
        this as Command,
        "json",
        "Loading brand palette"
      )

      const brand = requireBrandBySlug(context.loaded.brands, slug)
      const palette = getBrandPalette(brand)

      printByMode(
        context.outputMode,
        palette,
        renderPaletteTable(slug, palette, context)
      )
    })
}

const registerFacetsCommand = (target: Command): void => {
  target
    .command("facets")
    .description(
      "Return available industries, tags, color families, typography styles"
    )
    .addHelpText(
      "after",
      "\nExamples:\n  loftlyy facets\n  loftlyy facets --output json"
    )
    .action(async function facetsAction() {
      const context = await loadCommandContext(
        this as Command,
        "table",
        "Collecting brand facets"
      )
      const facets = getBrandFacets(context.loaded.sidebarBrands)

      printByMode(
        context.outputMode,
        facets,
        renderFacetsTable(facets, context)
      )
    })
}

export const registerBrandsCommand = (program: Command): void => {
  const aliases = ["brands", "b"]

  registerListCommand(program)
  registerGetCommand(program)
  registerSearchCommand(program)
  registerFilterCommand(program)
  registerSimilarCommand(program)
  registerPaletteCommand(program)
  registerFacetsCommand(program)

  const legacyNamespace = program
    .command("brands")
    .alias("b")
    .description("Legacy namespace. You can call commands directly now.")

  registerListCommand(legacyNamespace)
  registerGetCommand(legacyNamespace)
  registerSearchCommand(legacyNamespace)
  registerFilterCommand(legacyNamespace)
  registerSimilarCommand(legacyNamespace)
  registerPaletteCommand(legacyNamespace)
  registerFacetsCommand(legacyNamespace)

  program.addHelpText(
    "after",
    `\nShort usage:\n  loftlyy list\n  loftlyy search apple\n  loftlyy get apple\n\nLegacy namespace still works:\n  ${aliases.map((alias) => `loftlyy ${alias} list`).join("\n  ")}`
  )
}
