import { normalizeHex } from "@/cli/core/filters"
import type { Brand, SidebarBrand } from "@/cli/core/contracts"

const WHITESPACE_RE = /\s+/g

const normalizeSearchText = (values: (string | undefined)[]): string =>
  values
    .filter(Boolean)
    .join(" ")
    .trim()
    .toLowerCase()
    .replace(WHITESPACE_RE, " ")

export const buildSidebarBrand = (brand: Brand): SidebarBrand => ({
  categories: brand.categories,
  colors: brand.colors.map((color) => ({ hex: color.hex })),
  description: brand.description,
  industry: brand.industry,
  name: brand.name,
  searchIndex: {
    hexes: brand.colors
      .map((color) => normalizeHex(color.hex))
      .filter((color): color is string => color !== null),
    text: normalizeSearchText([
      brand.name,
      brand.description,
      brand.industry,
      ...brand.categories,
      ...(brand.tags ?? []),
      ...brand.colors.map((color) => color.name),
      ...brand.typography.flatMap((font) => [font.name, font.category]),
    ]),
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
