import type { Brand, SidebarBrand } from "@/cli/core/contracts"

export interface FilterState {
  colorFamilies: string[]
  industries: string[]
  query: string
  tags: string[]
  typographyStyles: string[]
}

type FilterableBrand = Pick<Brand, "industry" | "name" | "tags"> & {
  colors: { hex: string }[]
  typography: { category?: string }[]
}

type SearchableBrand = FilterableBrand & {
  searchIndex: {
    hexes: string[]
    text: string
  }
}

export const emptyFilters: FilterState = {
  colorFamilies: [],
  industries: [],
  query: "",
  tags: [],
  typographyStyles: [],
}

const HEX_TOKEN_RE = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/
const WHITESPACE_RE = /\s+/g

const normalizeText = (value: string): string =>
  value.trim().toLowerCase().replace(WHITESPACE_RE, " ")

export const normalizeHex = (input: string): string | null => {
  const match = input.trim().match(HEX_TOKEN_RE)
  if (!match) {
    return null
  }

  const value = match[1].toUpperCase()
  if (value.length === 3) {
    return `#${[...value].map((char) => char.repeat(2)).join("")}`
  }

  return `#${value}`
}

const matchesQuery = (brand: SearchableBrand, query: string): boolean => {
  const tokens = normalizeText(query).split(" ").filter(Boolean)
  if (tokens.length === 0) {
    return true
  }

  return tokens.every((token) => {
    const normalizedHex = normalizeHex(token)
    if (normalizedHex) {
      return brand.searchIndex.hexes.includes(normalizedHex)
    }

    return brand.searchIndex.text.includes(token)
  })
}

export const hexToColorFamily = (hex: string): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)

  const delta = Math.max(r, g, b) - Math.min(r, g, b)
  const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs((2 * lightness) / 255 - 1)) / 255

  if (saturation < 0.15 || delta < 30) {
    return "neutral"
  }

  let hue = 0
  if (delta !== 0) {
    const max = Math.max(r, g, b)
    if (max === r) {
      hue = 60 * (((g - b) / delta) % 6)
    } else if (max === g) {
      hue = 60 * ((b - r) / delta + 2)
    } else {
      hue = 60 * ((r - g) / delta + 4)
    }
  }

  if (hue < 0) {
    hue += 360
  }

  if (hue < 15 || hue >= 345) {
    return "red"
  }

  if (hue < 45) {
    return "orange"
  }

  if (hue < 70) {
    return "yellow"
  }

  if (hue < 170) {
    return "green"
  }

  if (hue < 260) {
    return "blue"
  }

  if (hue < 300) {
    return "purple"
  }

  return "pink"
}

const getBrandColorFamilies = (brand: {
  colors: { hex: string }[]
}): string[] => [
  ...new Set(brand.colors.map((color) => hexToColorFamily(color.hex))),
]

export const getAvailableFilters = (
  brands: FilterableBrand[]
): {
  colorFamilies: string[]
  industries: string[]
  tags: string[]
  typographyStyles: string[]
} => {
  const colorFamilies = new Set<string>()
  const industries = new Set<string>()
  const tags = new Set<string>()
  const typographyStyles = new Set<string>()

  for (const brand of brands) {
    industries.add(brand.industry)
    for (const tag of brand.tags ?? []) {
      tags.add(tag)
    }

    for (const color of brand.colors) {
      colorFamilies.add(hexToColorFamily(color.hex))
    }

    for (const typo of brand.typography) {
      if (typo.category) {
        typographyStyles.add(typo.category)
      }
    }
  }

  return {
    colorFamilies: [...colorFamilies].toSorted(),
    industries: [...industries].toSorted(),
    tags: [...tags].toSorted(),
    typographyStyles: [...typographyStyles].toSorted(),
  }
}

export const filterBrands = <T extends SearchableBrand>(
  brands: T[],
  filters: FilterState
): T[] =>
  brands.filter((brand) => {
    if (filters.query && !matchesQuery(brand, filters.query)) {
      return false
    }

    if (
      filters.industries.length > 0 &&
      !filters.industries.includes(brand.industry)
    ) {
      return false
    }

    if (
      filters.tags.length > 0 &&
      !filters.tags.some((tag) => brand.tags?.includes(tag))
    ) {
      return false
    }

    if (filters.colorFamilies.length > 0) {
      const brandFamilies = getBrandColorFamilies(brand)
      if (
        !filters.colorFamilies.some((family) => brandFamilies.includes(family))
      ) {
        return false
      }
    }

    if (filters.typographyStyles.length > 0) {
      const brandStyles = brand.typography
        .map((entry) => entry.category)
        .filter(Boolean) as string[]

      if (
        !filters.typographyStyles.some((style) => brandStyles.includes(style))
      ) {
        return false
      }
    }

    return true
  })

export const getSimilarBrands = (
  current: Brand,
  allBrands: Brand[],
  limit = 5
): Brand[] => {
  const currentColorFamilies = getBrandColorFamilies(current)
  const currentTypoCategories = current.typography
    .map((entry) => entry.category)
    .filter(Boolean) as string[]

  const scored = allBrands
    .filter((brand) => brand.slug !== current.slug)
    .map((brand) => {
      let score = 0

      const sharedCategories = brand.categories.filter((category) =>
        current.categories.includes(category)
      )
      score += sharedCategories.length * 3

      if (brand.industry === current.industry) {
        score += 1
      }

      const sharedTags = (brand.tags ?? []).filter((tag) =>
        current.tags?.includes(tag)
      )
      score += sharedTags.length * 2

      const brandFamilies = getBrandColorFamilies(brand)
      const sharedColors = brandFamilies.filter((family) =>
        currentColorFamilies.includes(family)
      )
      score += sharedColors.length * 2

      const brandTypoCategories = brand.typography
        .map((entry) => entry.category)
        .filter(Boolean) as string[]
      const sharedTypography = brandTypoCategories.filter((category) =>
        currentTypoCategories.includes(category)
      )
      score += sharedTypography.length

      return { brand, score }
    })
    .filter((entry) => entry.score > 0)
    .toSorted(
      (a, b) => b.score - a.score || a.brand.name.localeCompare(b.brand.name)
    )
    .slice(0, limit)

  return scored.map((entry) => entry.brand)
}

export const toBrandSummary = (brand: Brand): SidebarBrand => ({
  categories: brand.categories,
  colors: brand.colors.map((color) => ({ hex: color.hex })),
  description: brand.description,
  industry: brand.industry,
  name: brand.name,
  searchIndex: {
    hexes: brand.colors
      .map((color) => normalizeHex(color.hex))
      .filter((color): color is string => color !== null),
    text: normalizeText(
      [
        brand.name,
        brand.description,
        brand.industry,
        ...brand.categories,
        ...(brand.tags ?? []),
      ].join(" ")
    ),
  },
  slug: brand.slug,
  tags: brand.tags,
  thumbnail: {
    height: brand.thumbnail.height,
    label: brand.thumbnail.label,
    src: brand.thumbnail.src,
    width: brand.thumbnail.width,
  },
  thumbnailDark: brand.thumbnailDark
    ? {
        height: brand.thumbnailDark.height,
        src: brand.thumbnailDark.src,
        width: brand.thumbnailDark.width,
      }
    : undefined,
  typography: brand.typography.map((font) => ({
    category: font.category,
    name: font.name,
  })),
})

export const toSidebarBrands = (brands: Brand[]): SidebarBrand[] =>
  brands.map(toBrandSummary)
