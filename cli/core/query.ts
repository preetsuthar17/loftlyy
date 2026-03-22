import {
  emptyFilters,
  filterBrands,
  getAvailableFilters,
  getSimilarBrands,
} from "@/cli/core/filters"
import type {
  Brand,
  BrandFacets,
  PaletteEntry,
  SidebarBrand,
} from "@/cli/core/contracts"
import { CliError, EXIT_CODE } from "@/cli/core/errors"

export interface FilterInput {
  colorFamilies: string[]
  industries: string[]
  query: string
  tags: string[]
  typographyStyles: string[]
}

const normalizeSlug = (slug: string): string => slug.trim().toLowerCase()

const getSuggestions = (
  input: string,
  candidates: string[],
  limit = 3
): string[] => {
  const normalizedInput = input.trim().toLowerCase()
  if (!normalizedInput) {
    return []
  }

  const includesMatches: string[] = []
  const others: string[] = []
  const startsWithMatches: string[] = []

  for (const candidate of candidates) {
    const normalizedCandidate = candidate.toLowerCase()
    if (normalizedCandidate.startsWith(normalizedInput)) {
      startsWithMatches.push(candidate)
      continue
    }

    if (
      normalizedCandidate.includes(normalizedInput) ||
      normalizedInput.includes(normalizedCandidate)
    ) {
      includesMatches.push(candidate)
      continue
    }

    others.push(candidate)
  }

  const ordered = [
    ...startsWithMatches.toSorted((a, b) => a.localeCompare(b)),
    ...includesMatches.toSorted((a, b) => a.localeCompare(b)),
    ...others.toSorted((a, b) => a.localeCompare(b)),
  ]

  return ordered.slice(0, limit)
}

const getFacetValidationMessage = (
  label: string,
  invalidValues: string[],
  allowedValues: string[]
): string => {
  const invalidSection = `Invalid ${label}: ${invalidValues.join(", ")}.`
  const suggestions = invalidValues
    .map((invalidValue) => {
      const candidateSuggestions = getSuggestions(
        invalidValue,
        allowedValues,
        2
      )
      if (candidateSuggestions.length === 0) {
        return ""
      }

      return `${invalidValue} -> ${candidateSuggestions.join(", ")}`
    })
    .filter(Boolean)

  const suggestionSection =
    suggestions.length > 0 ? ` Suggestions: ${suggestions.join(" | ")}.` : ""

  return `${invalidSection}${suggestionSection} Allowed values: ${allowedValues.join(", ")}`
}

export const findBrandBySlug = (
  brands: Brand[],
  slug: string
): Brand | undefined => {
  const normalizedSlug = normalizeSlug(slug)

  const exactMatch = brands.find((brand) => brand.slug === slug.trim())
  if (exactMatch) {
    return exactMatch
  }

  return brands.find((brand) => normalizeSlug(brand.slug) === normalizedSlug)
}

export const requireBrandBySlug = (brands: Brand[], slug: string): Brand => {
  const brand = findBrandBySlug(brands, slug)
  if (brand) {
    return brand
  }

  const availableSlugs = brands.map((item) => item.slug)
  const suggestions = getSuggestions(slug, availableSlugs)
  const suffix =
    suggestions.length > 0
      ? ` Did you mean: ${suggestions.map((item) => `"${item}"`).join(", ")}?`
      : ""

  throw new CliError(
    `Brand with slug "${slug}" was not found.${suffix}`,
    EXIT_CODE.DATA_FAILURE
  )
}

export const getBrandFacets = (sidebarBrands: SidebarBrand[]): BrandFacets =>
  getAvailableFilters(sidebarBrands)

export const searchSidebarBrands = (
  sidebarBrands: SidebarBrand[],
  query: string
): SidebarBrand[] =>
  filterBrands(sidebarBrands, {
    ...emptyFilters,
    query,
  })

export const validateFilterInput = (
  input: FilterInput,
  facets: BrandFacets
): void => {
  const checks: {
    allowed: string[]
    label: string
    selected: string[]
  }[] = [
    {
      allowed: facets.industries,
      label: "industry values",
      selected: input.industries,
    },
    {
      allowed: facets.tags,
      label: "tag values",
      selected: input.tags,
    },
    {
      allowed: facets.colorFamilies,
      label: "color-family values",
      selected: input.colorFamilies,
    },
    {
      allowed: facets.typographyStyles,
      label: "typography-style values",
      selected: input.typographyStyles,
    },
  ]

  for (const check of checks) {
    if (check.selected.length === 0) {
      continue
    }

    const allowedSet = new Set(check.allowed)
    const invalid = check.selected.filter((item) => !allowedSet.has(item))
    if (invalid.length === 0) {
      continue
    }

    throw new CliError(
      getFacetValidationMessage(check.label, invalid, check.allowed),
      EXIT_CODE.ARGUMENT_ERROR
    )
  }
}

export const filterSidebarBrands = (
  sidebarBrands: SidebarBrand[],
  input: FilterInput
): SidebarBrand[] =>
  filterBrands(sidebarBrands, {
    colorFamilies: input.colorFamilies,
    industries: input.industries,
    query: input.query,
    tags: input.tags,
    typographyStyles: input.typographyStyles,
  })

export const getSimilarBrandsForSlug = (
  brands: Brand[],
  slug: string,
  limit: number
): Brand[] => {
  const current = requireBrandBySlug(brands, slug)
  return getSimilarBrands(current, brands, limit)
}

export const getBrandPalette = (brand: Brand): PaletteEntry[] =>
  brand.colors.map((color) => ({
    hex: color.hex,
    name: color.name,
    ...(color.usage ? { usage: color.usage } : {}),
  }))
