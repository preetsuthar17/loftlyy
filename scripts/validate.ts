/**
 * Pre-deployment validation script.
 * Checks brand data integrity, asset files, font files, translations, and categories.
 *
 * Usage: pnpm validate
 */

import { existsSync, readFileSync } from "node:fs"
import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"
import { locales } from "@/i18n/locales"

/**
 * Load `.env.local` so validation picks up NEXT_PUBLIC_ASSET_BASE_URL even
 * when the script is executed via `tsx` (which does not auto-load env files).
 * Existing env vars take precedence — the file only fills in missing values.
 */
function loadEnvFile() {
  const envPath = join(process.cwd(), ".env.local")
  if (!existsSync(envPath)) return

  const content = readFileSync(envPath, "utf-8")
  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue

    const eqIndex = trimmed.indexOf("=")
    if (eqIndex === -1) continue

    const key = trimmed.slice(0, eqIndex).trim()
    const value = trimmed.slice(eqIndex + 1).trim()
    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

loadEnvFile()

const ROOT = process.cwd()
const PUBLIC = join(ROOT, "public")
const MESSAGES_DIR = join(ROOT, "messages")
const HEX_RE = /^#[0-9A-Fa-f]{6}$/
const externalAssetBaseUrl =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim() ?? ""

const errors: string[] = []
const warnings: string[] = []

function error(msg: string) {
  errors.push(`  ✗ ${msg}`)
}

function warn(msg: string) {
  warnings.push(`  ⚠ ${msg}`)
}

function ok(msg: string) {
  // biome-ignore lint: using console for CLI script
  console.log(`  ✓ ${msg}`)
}

function assetPath(path: string) {
  return join(PUBLIC, path.replace(/^\/+/, ""))
}

async function loadBrands() {
  const { getRawBrands } = await import("../data/brands/index.js")
  return getRawBrands()
}

async function loadCategories() {
  const { categories } = await import("../data/categories.js")
  return categories
}

async function loadMessages(locale: string) {
  const raw = await readFile(join(MESSAGES_DIR, `${locale}.json`), "utf-8")
  return JSON.parse(raw)
}

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = []
  for (const key of Object.keys(obj)) {
    const full = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      keys.push(...getKeys(val as Record<string, unknown>, full))
    } else {
      keys.push(full)
    }
  }
  return keys.sort()
}

// ─── Check 1: Brand data completeness ───────────────────────────────

async function checkBrandData() {
  // biome-ignore lint: using console for CLI script
  console.log("\n🔍 Brand data completeness")

  const brands = await loadBrands()
  const categorySlugs = (await loadCategories()).map(
    (c: { slug: string }) => c.slug
  )

  if (brands.length === 0) {
    error("No brands found")
    return
  }

  ok(`${brands.length} brands loaded`)

  const slugs = new Set<string>()
  for (const brand of brands) {
    const prefix = `[${brand.slug}]`

    // Unique slug
    if (slugs.has(brand.slug)) {
      error(`${prefix} Duplicate slug`)
    }
    slugs.add(brand.slug)

    // Required fields
    if (!brand.name?.trim()) error(`${prefix} Missing name`)
    if (!brand.description?.trim()) error(`${prefix} Missing description`)
    if (!brand.industry?.trim()) error(`${prefix} Missing industry`)
    if (!brand.dateAdded?.trim()) error(`${prefix} Missing dateAdded`)

    // Industry must be a valid category
    if (!categorySlugs.includes(brand.industry)) {
      error(`${prefix} Industry "${brand.industry}" not in categories.ts`)
    }

    // Categories must all be valid
    if (!brand.categories || brand.categories.length === 0) {
      error(`${prefix} No categories defined`)
    } else {
      for (const cat of brand.categories) {
        if (!categorySlugs.includes(cat)) {
          error(`${prefix} Category "${cat}" not in categories.ts`)
        }
      }
    }

    // Colors
    if (!brand.colors || brand.colors.length === 0) {
      error(`${prefix} No colors defined`)
    } else {
      for (const color of brand.colors) {
        if (!color.name?.trim()) error(`${prefix} Color missing name`)
        if (!HEX_RE.test(color.hex)) {
          error(
            `${prefix} Invalid hex "${color.hex}" for color "${color.name}"`
          )
        }
      }
    }

    // Typography
    if (!brand.typography || brand.typography.length === 0) {
      error(`${prefix} No typography defined`)
    } else {
      for (const typo of brand.typography) {
        if (!typo.name?.trim()) error(`${prefix} Typography entry missing name`)
        if (!typo.role?.trim())
          error(`${prefix} Typography "${typo.name}" missing role`)
      }
    }

    // Assets
    if (!brand.assets || brand.assets.length === 0) {
      error(`${prefix} No assets defined`)
    }

    // Thumbnail
    if (!brand.thumbnail?.src) {
      error(`${prefix} Missing thumbnail`)
    }
  }

  ok("Brand data fields validated")
}

// ─── Check 2: Asset files exist on disk ─────────────────────────────

async function checkAssetFiles() {
  // biome-ignore lint: using console for CLI script
  console.log("\n🔍 Asset files on disk")

  if (externalAssetBaseUrl) {
    warn(
      `Skipping local asset file checks because NEXT_PUBLIC_ASSET_BASE_URL is set to ${externalAssetBaseUrl}`
    )
    ok("Asset file checks skipped")
    return
  }

  const brands = await loadBrands()
  let checked = 0
  let missing = 0

  for (const brand of brands) {
    const prefix = `[${brand.slug}]`

    // Thumbnail
    const thumbPath = assetPath(brand.thumbnail.src)
    if (!existsSync(thumbPath)) {
      error(`${prefix} Thumbnail missing: ${brand.thumbnail.src}`)
      missing++
    }
    checked++

    // ThumbnailDark
    if (brand.thumbnailDark) {
      const darkPath = assetPath(brand.thumbnailDark.src)
      if (!existsSync(darkPath)) {
        error(`${prefix} ThumbnailDark missing: ${brand.thumbnailDark.src}`)
        missing++
      }
      checked++
    }

    // All assets
    for (const asset of brand.assets) {
      const currentAssetPath = assetPath(asset.src)
      if (!existsSync(currentAssetPath)) {
        error(`${prefix} Asset missing: ${asset.src}`)
        missing++
      }
      checked++

      // Dimensions must be positive
      if (asset.width <= 0 || asset.height <= 0) {
        error(
          `${prefix} Asset "${asset.label}" has invalid dimensions: ${asset.width}×${asset.height}`
        )
      }
    }
  }

  ok(`${checked} asset files checked, ${missing} missing`)
}

// ─── Check 3: Font files exist ──────────────────────────────────────

async function checkFontFiles() {
  // biome-ignore lint: using console for CLI script
  console.log("\n🔍 Font files")

  if (externalAssetBaseUrl) {
    warn(
      `Skipping local font file checks because NEXT_PUBLIC_ASSET_BASE_URL is set to ${externalAssetBaseUrl}`
    )
    ok("Font file checks skipped")
    return
  }

  const brands = await loadBrands()
  let checked = 0
  let missing = 0

  for (const brand of brands) {
    const prefix = `[${brand.slug}]`

    for (const typo of brand.typography) {
      if (!typo.fontUrl) {
        warn(`${prefix} Typography "${typo.name}" has no fontUrl`)
        continue
      }

      const fontPath = assetPath(typo.fontUrl)
      if (!existsSync(fontPath)) {
        error(`${prefix} Font missing: ${typo.fontUrl}`)
        missing++
      }
      checked++

      // Check file size (should be under 200KB)
      if (existsSync(fontPath)) {
        const { size } = await import("node:fs").then((fs) =>
          fs.statSync(fontPath)
        )
        if (size > 200 * 1024) {
          warn(
            `${prefix} Font "${typo.name}" is ${(size / 1024).toFixed(0)}KB (recommend < 200KB)`
          )
        }
      }
    }
  }

  ok(`${checked} font files checked, ${missing} missing`)
}

// ─── Check 4: Brand directories in public/ ──────────────────────────

async function checkBrandDirectories() {
  // biome-ignore lint: using console for CLI script
  console.log("\n🔍 Brand directories")

  if (externalAssetBaseUrl) {
    warn(
      `Skipping local brand directory checks because NEXT_PUBLIC_ASSET_BASE_URL is set to ${externalAssetBaseUrl}`
    )
    ok("Brand directories skipped")
    return
  }

  const brands = await loadBrands()

  for (const brand of brands) {
    const brandDir = join(PUBLIC, "brands", brand.slug)
    if (!existsSync(brandDir)) {
      error(`[${brand.slug}] Missing directory: public/brands/${brand.slug}/`)
    }
  }

  // Check for orphaned directories
  const brandSlugs = new Set(brands.map((b: { slug: string }) => b.slug))
  const brandsDir = join(PUBLIC, "brands")
  if (existsSync(brandsDir)) {
    const dirs = await readdir(brandsDir, { withFileTypes: true })
    for (const dir of dirs) {
      if (dir.isDirectory() && !brandSlugs.has(dir.name)) {
        warn(`Orphaned directory: public/brands/${dir.name}/ (no brand data)`)
      }
    }
  }

  ok("Brand directories validated")
}

// ─── Check 5: Translations ─────────────────────────────────────────

async function checkTranslations() {
  // biome-ignore lint: using console for CLI script
  console.log("\n🔍 Translations")

  const brands = await loadBrands()
  const messages: Record<string, Record<string, unknown>> = {}

  for (const locale of locales) {
    messages[locale] = await loadMessages(locale)
  }

  // Check all locales have same keys
  const enKeys = getKeys(messages.en)
  for (const locale of locales) {
    if (locale === "en") continue
    const localeKeys = getKeys(messages[locale])

    const missingInLocale = enKeys.filter((k) => !localeKeys.includes(k))
    const extraInLocale = localeKeys.filter((k) => !enKeys.includes(k))

    for (const key of missingInLocale) {
      error(`[${locale}] Missing translation key: ${key}`)
    }
    for (const key of extraInLocale) {
      warn(`[${locale}] Extra translation key (not in en): ${key}`)
    }
  }

  // Check every brand has translations
  const brandTranslations = messages.en.brands as
    | Record<string, unknown>
    | undefined
  for (const brand of brands) {
    if (
      !brandTranslations ||
      !(brand.slug in (brandTranslations as Record<string, unknown>))
    ) {
      error(`[en] Missing brand translation: brands.${brand.slug}`)
    }
  }

  // Check every brand.industry has a category translation
  const categoryTranslations = messages.en.categories as
    | Record<string, unknown>
    | undefined
  for (const brand of brands) {
    if (
      categoryTranslations &&
      !(brand.industry in (categoryTranslations as Record<string, unknown>))
    ) {
      error(`[en] Missing category translation: categories.${brand.industry}`)
    }
  }

  // Check every brand tag has a tag translation
  const tagTranslations = messages.en.tags as
    | Record<string, unknown>
    | undefined
  for (const brand of brands) {
    for (const tag of brand.tags ?? []) {
      if (
        tagTranslations &&
        !(tag in (tagTranslations as Record<string, unknown>))
      ) {
        error(`[en] Missing tag translation: tags.${tag}`)
      }
    }
  }

  ok(`Translations checked across ${locales.length} locales`)
}

// ─── Check 6: SVG quality ───────────────────────────────────────────

async function checkSvgQuality() {
  // biome-ignore lint: using console for CLI script
  console.log("\n🔍 SVG quality")

  if (externalAssetBaseUrl) {
    warn(
      `Skipping local SVG validation because NEXT_PUBLIC_ASSET_BASE_URL is set to ${externalAssetBaseUrl}`
    )
    ok("SVG validation skipped")
    return
  }

  const brands = await loadBrands()
  let checked = 0

  for (const brand of brands) {
    const prefix = `[${brand.slug}]`

    for (const asset of brand.assets) {
      if (asset.format !== "svg") continue

      const svgPath = assetPath(asset.src)
      if (!existsSync(svgPath)) continue

      const content = await readFile(svgPath, "utf-8")
      checked++

      // Check for width/height attributes
      if (!content.includes("width=") || !content.includes("height=")) {
        error(`${prefix} SVG "${asset.label}" missing width/height attributes`)
      }

      // Check for <text> elements (likely fabricated wordmarks)
      if (/<text[\s>]/i.test(content)) {
        warn(
          `${prefix} SVG "${asset.label}" contains <text> elements (should use paths)`
        )
      }
    }
  }

  ok(`${checked} SVG files validated`)
}

// ─── Run all checks ─────────────────────────────────────────────────

async function main() {
  // biome-ignore lint: using console for CLI script
  console.log("━━━ Loftlyy Pre-Deployment Validation ━━━")

  await checkBrandData()
  await checkAssetFiles()
  await checkFontFiles()
  await checkBrandDirectories()
  await checkTranslations()
  await checkSvgQuality()

  // biome-ignore lint: using console for CLI script
  console.log("\n━━━ Results ━━━")

  if (warnings.length > 0) {
    // biome-ignore lint: using console for CLI script
    console.log(`\n⚠ ${warnings.length} warning(s):`)
    for (const w of warnings) {
      // biome-ignore lint: using console for CLI script
      console.log(w)
    }
  }

  if (errors.length > 0) {
    // biome-ignore lint: using console for CLI script
    console.log(`\n✗ ${errors.length} error(s):`)
    for (const e of errors) {
      // biome-ignore lint: using console for CLI script
      console.error(e)
    }
    process.exit(1)
  }

  // biome-ignore lint: using console for CLI script
  console.log(`\n✓ All checks passed (${warnings.length} warnings)`)
}

main()
