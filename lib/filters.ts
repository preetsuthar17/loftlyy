import type { Brand, SimilarBrandCard } from "./types"

export interface FilterState {
  industries: string[]
  tags: string[]
  colorFamilies: string[]
  typographyStyles: string[]
}

export const emptyFilters: FilterState = {
  industries: [],
  tags: [],
  colorFamilies: [],
  typographyStyles: [],
}

export function hexToColorFamily(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const lightness = (max + min) / 2
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs((2 * lightness) / 255 - 1)) / 255

  if (saturation < 0.15 || delta < 30) return "neutral"

  let hue = 0
  if (delta !== 0) {
    if (max === r) hue = 60 * (((g - b) / delta) % 6)
    else if (max === g) hue = 60 * ((b - r) / delta + 2)
    else hue = 60 * ((r - g) / delta + 4)
  }
  if (hue < 0) hue += 360

  if (hue < 15 || hue >= 345) return "red"
  if (hue < 45) return "orange"
  if (hue < 70) return "yellow"
  if (hue < 170) return "green"
  if (hue < 260) return "blue"
  if (hue < 300) return "purple"
  return "pink"
}

export function getBrandColorFamilies(brand: Brand): string[] {
  const families = new Set(brand.colors.map((c) => hexToColorFamily(c.hex)))
  return Array.from(families)
}

export function getAvailableFilters(brands: Brand[]) {
  const industries = new Set<string>()
  const tags = new Set<string>()
  const colorFamilies = new Set<string>()
  const typographyStyles = new Set<string>()

  for (const brand of brands) {
    industries.add(brand.industry)
    brand.tags?.forEach((t) => tags.add(t))
    brand.colors.forEach((c) => colorFamilies.add(hexToColorFamily(c.hex)))
    brand.typography.forEach((t) => {
      if (t.category) typographyStyles.add(t.category)
    })
  }

  return {
    industries: Array.from(industries).sort(),
    tags: Array.from(tags).sort(),
    colorFamilies: Array.from(colorFamilies).sort(),
    typographyStyles: Array.from(typographyStyles).sort(),
  }
}

export function filterBrands(
  brands: Brand[],
  filters: FilterState,
  query: string
): Brand[] {
  return brands.filter((brand) => {
    if (query) {
      const q = query.toLowerCase()
      if (!brand.name.toLowerCase().includes(q)) return false
    }

    if (filters.industries.length > 0) {
      if (!filters.industries.includes(brand.industry)) return false
    }

    if (filters.tags.length > 0) {
      if (!filters.tags.some((t) => brand.tags?.includes(t))) return false
    }

    if (filters.colorFamilies.length > 0) {
      const brandFamilies = getBrandColorFamilies(brand)
      if (!filters.colorFamilies.some((f) => brandFamilies.includes(f)))
        return false
    }

    if (filters.typographyStyles.length > 0) {
      const brandStyles = brand.typography
        .map((t) => t.category)
        .filter(Boolean) as string[]
      if (!filters.typographyStyles.some((s) => brandStyles.includes(s)))
        return false
    }

    return true
  })
}

export function getSimilarBrands(
  current: Brand,
  allBrands: Brand[],
  limit = 5
): Brand[] {
  const currentColorFamilies = getBrandColorFamilies(current)
  const currentTypoCategories = current.typography
    .map((t) => t.category)
    .filter(Boolean) as string[]

  const scored = allBrands
    .filter((b) => b.slug !== current.slug)
    .map((brand) => {
      let score = 0

      const sharedCategories = brand.categories.filter((c) =>
        current.categories.includes(c)
      )
      score += sharedCategories.length * 3

      if (brand.industry === current.industry) score += 1

      const sharedTags = (brand.tags ?? []).filter((t) =>
        current.tags?.includes(t)
      )
      score += sharedTags.length * 2

      const brandFamilies = getBrandColorFamilies(brand)
      const sharedColors = brandFamilies.filter((f) =>
        currentColorFamilies.includes(f)
      )
      score += sharedColors.length * 2

      const brandTypoCategories = brand.typography
        .map((t) => t.category)
        .filter(Boolean) as string[]
      const sharedTypo = brandTypoCategories.filter((c) =>
        currentTypoCategories.includes(c)
      )
      score += sharedTypo.length

      return { brand, score }
    })
    .filter((s) => s.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.brand.name.localeCompare(b.brand.name)
    )
    .slice(0, limit)

  return scored.map((s) => s.brand)
}

/** Returns slim brand cards for the similar-brands section (minimal serialization). */
export function getSimilarBrandCards(
  current: Brand,
  allBrands: Brand[],
  limit = 5
): SimilarBrandCard[] {
  return getSimilarBrands(current, allBrands, limit).map((b) => ({
    slug: b.slug,
    name: b.name,
    industry: b.industry,
    thumbnail: {
      src: b.thumbnail.src,
      width: b.thumbnail.width,
      height: b.thumbnail.height,
    },
    colors: b.colors.slice(0, 4).map((c) => ({ hex: c.hex })),
  }))
}
