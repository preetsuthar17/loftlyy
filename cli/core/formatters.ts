import Table from "cli-table3"
import pc from "picocolors"
import type {
  Brand,
  BrandFacets,
  CliRenderContext,
  PaletteEntry,
  SidebarBrand,
} from "@/cli/core/contracts"

interface BrandSummary {
  categories: string[]
  colorCount: number
  industry: string
  name: string
  slug: string
  tags: string[]
  typographyCount: number
}

const truncate = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1)}...`
}

const withColor = (
  context: CliRenderContext,
  style: (text: string) => string,
  text: string
): string => (context.colorEnabled ? style(text) : text)

const summarizeBrand = (brand: SidebarBrand): BrandSummary => ({
  categories: brand.categories,
  colorCount: brand.colors.length,
  industry: brand.industry,
  name: brand.name,
  slug: brand.slug,
  tags: brand.tags ?? [],
  typographyCount: brand.typography.length,
})

export const renderJson = (value: unknown): string =>
  `${JSON.stringify(value, null, 2)}\n`

export const renderNdjson = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `${value.map((entry) => JSON.stringify(entry)).join("\n")}\n`
  }

  return `${JSON.stringify(value)}\n`
}

export const renderBrandListTable = (
  brands: SidebarBrand[],
  context: CliRenderContext
): string => {
  if (brands.length === 0) {
    return `${withColor(context, pc.yellow, "No brands found.")}\n`
  }

  const table = new Table({
    head: ["Slug", "Name", "Industry", "Categories", "Tags", "Colors", "Type"],
    style: { head: [] },
    wordWrap: true,
  })

  for (const summary of brands.map(summarizeBrand)) {
    table.push([
      summary.slug,
      summary.name,
      summary.industry,
      truncate(summary.categories.join(", "), 28),
      truncate(summary.tags.join(", "), 24),
      String(summary.colorCount),
      String(summary.typographyCount),
    ])
  }

  const caption = withColor(
    context,
    pc.dim,
    `${brands.length} brand${brands.length === 1 ? "" : "s"}`
  )

  return `${table.toString()}\n${caption}\n`
}

export const renderBrandDetailTable = (
  brand: Brand,
  context: CliRenderContext
): string => {
  const details = new Table({
    colWidths: [22, 90],
    style: { head: [] },
    wordWrap: true,
  })

  details.push(
    ["Slug", brand.slug],
    ["Name", brand.name],
    ["Industry", brand.industry],
    ["Categories", brand.categories.join(", ")],
    ["Tags", (brand.tags ?? []).join(", ")],
    ["Website", brand.url ?? "-"],
    ["Date added", brand.dateAdded],
    ["Founded", brand.founded ? String(brand.founded) : "-"],
    ["Headquarters", brand.headquarters ?? "-"],
    ["Description", brand.description]
  )

  const colors = new Table({
    head: ["Color", "Hex", "Usage"],
    style: { head: [] },
    wordWrap: true,
  })

  for (const color of brand.colors) {
    colors.push([color.name, color.hex, color.usage ?? "-"])
  }

  const typography = new Table({
    head: ["Font", "Role", "Category", "Weights"],
    style: { head: [] },
    wordWrap: true,
  })

  for (const font of brand.typography) {
    typography.push([
      font.name,
      font.role,
      font.category ?? "-",
      (font.weights ?? []).join(", ") || "-",
    ])
  }

  const title = withColor(context, pc.bold, `${brand.name} (${brand.slug})`)
  return `${title}\n${details.toString()}\n\n${withColor(context, pc.bold, "Colors")}\n${colors.toString()}\n\n${withColor(context, pc.bold, "Typography")}\n${typography.toString()}\n`
}

export const renderPaletteTable = (
  slug: string,
  palette: PaletteEntry[],
  context: CliRenderContext
): string => {
  if (palette.length === 0) {
    return `${withColor(context, pc.yellow, `No colors found for "${slug}".`)}\n`
  }

  const table = new Table({
    head: ["Name", "Hex", "Usage"],
    style: { head: [] },
    wordWrap: true,
  })

  for (const entry of palette) {
    table.push([entry.name, entry.hex, entry.usage ?? "-"])
  }

  return `${table.toString()}\n`
}

export const renderFacetsTable = (
  facets: BrandFacets,
  context: CliRenderContext
): string => {
  const table = new Table({
    head: ["Facet", "Values"],
    style: { head: [] },
    wordWrap: true,
  })

  table.push(
    ["industries", facets.industries.join(", ")],
    ["tags", facets.tags.join(", ")],
    ["colorFamilies", facets.colorFamilies.join(", ")],
    ["typographyStyles", facets.typographyStyles.join(", ")]
  )

  const caption = withColor(
    context,
    pc.dim,
    "Values are derived from loaded brands"
  )
  return `${table.toString()}\n${caption}\n`
}

export const renderSimilarBrandsTable = (
  sourceSlug: string,
  brands: Brand[],
  context: CliRenderContext
): string => {
  if (brands.length === 0) {
    return `${withColor(context, pc.yellow, `No similar brands found for "${sourceSlug}".`)}\n`
  }

  const table = new Table({
    head: ["Rank", "Slug", "Name", "Industry", "Categories"],
    style: { head: [] },
    wordWrap: true,
  })

  for (const [index, brand] of brands.entries()) {
    table.push([
      String(index + 1),
      brand.slug,
      brand.name,
      brand.industry,
      truncate(brand.categories.join(", "), 36),
    ])
  }

  return `${table.toString()}\n`
}
