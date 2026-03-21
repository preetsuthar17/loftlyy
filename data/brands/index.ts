import type { Brand, SidebarBrand } from "@/lib/types"
import { assetUrl } from "@/lib/assets"
import { hexToColorFamily, normalizeHex } from "@/lib/filters"
import { twentyFirst } from "./21st"
import { abode } from "./abode"
import { adidas } from "./adidas"
import { adobe } from "./adobe"
import { airbnb } from "./airbnb"
import { amazon } from "./amazon"
import { anthropic } from "./anthropic"
import { bmw } from "./bmw"
import { canva } from "./canva"
import { clerk } from "./clerk"
import { cocaCola } from "./coca-cola"
import { cluely } from "./cluely"
import { cursor } from "./cursor"
import { apple } from "./apple"
import { discord } from "./discord"
import { duolingo } from "./duolingo"
import { elevenlabs } from "./elevenlabs"
import { notra } from "./notra"
import { notion } from "./notion"
import { figma } from "./figma"
import { github } from "./github"
import { interfere } from "./interfere"
import { instagram } from "./instagram"
import { google } from "./google"
import { linear } from "./linear"
import { lovable } from "./lovable"
import { meta } from "./meta"
import { mintlify } from "./mintlify"
import { nvidia } from "./nvidia"
import { microsoft } from "./microsoft"
import { netflix } from "./netflix"
import { nike } from "./nike"
import { openai } from "./openai"
import { planetscale } from "./planetscale"
import { polar } from "./polar"
import { railway } from "./railway"
import { raycast } from "./raycast"
import { pinterest } from "./pinterest"
import { reddit } from "./reddit"
import { samsung } from "./samsung"
import { scira } from "./scira"
import { spotify } from "./spotify"
import { shopify } from "./shopify"
import { slack } from "./slack"
import { snapchat } from "./snapchat"
import { stripe } from "./stripe"
import { vercel } from "./vercel"
import { vscode } from "./vscode"
import { tesla } from "./tesla"
import { toyota } from "./toyota"
import { tiktok } from "./tiktok"
import { uber } from "./uber"
import { twitch } from "./twitch"
import { wise } from "./wise"
import { whatsapp } from "./whatsapp"
import { x } from "./x"
import { youtube } from "./youtube"
import { mcdonalds } from "./mcdonalds"
import { starbucks } from "./starbucks"
import { tailwindCss } from "./tailwind-css"
import { zoom } from "./zoom"
import { solana } from "./solana"

const rawBrands: Brand[] = [
  twentyFirst,
  abode,
  adidas,
  adobe,
  airbnb,
  amazon,
  anthropic,
  bmw,
  canva,
  clerk,
  apple,
  cluely,
  cursor,
  discord,
  duolingo,
  elevenlabs,
  figma,
  github,
  interfere,
  instagram,
  google,
  linear,
  lovable,
  meta,
  mintlify,
  microsoft,
  netflix,
  nike,
  nvidia,
  notra,
  notion,
  openai,
  planetscale,
  polar,
  railway,
  raycast,
  pinterest,
  reddit,
  samsung,
  scira,
  spotify,
  shopify,
  slack,
  snapchat,
  stripe,
  tailwindCss,
  tesla,
  toyota,
  tiktok,
  twitch,
  uber,
  vercel,
  vscode,
  cocaCola,
  mcdonalds,
  starbucks,
  whatsapp,
  wise,
  x,
  youtube,
  zoom,
  solana,
].sort((a, b) => a.name.localeCompare(b.name))

const WHITESPACE_RE = /\s+/g

function normalizeSearchText(values: Array<string | undefined>): string {
  return values
    .filter(Boolean)
    .join(" ")
    .trim()
    .toLowerCase()
    .replace(WHITESPACE_RE, " ")
}

function buildSidebarSearchIndex(brand: Brand): SidebarBrand["searchIndex"] {
  return {
    text: normalizeSearchText([
      brand.name,
      brand.description,
      brand.industry,
      ...brand.categories,
      ...(brand.tags ?? []),
      ...brand.colors.map((color) => color.name),
      ...brand.typography.flatMap((font) => [font.name, font.category]),
    ]),
    hexes: brand.colors
      .map((color) => normalizeHex(color.hex))
      .filter((color): color is string => color !== null),
  }
}

function withAssetUrls(brand: Brand): Brand {
  return {
    ...brand,
    typography: brand.typography.map((font) => ({
      ...font,
      fontUrl: font.fontUrl ? assetUrl(font.fontUrl) : undefined,
    })),
    assets: brand.assets.map((asset) => ({
      ...asset,
      src: assetUrl(asset.src),
      srcFull: asset.srcFull ? assetUrl(asset.srcFull) : undefined,
    })),
    thumbnail: {
      ...brand.thumbnail,
      src: assetUrl(brand.thumbnail.src),
      srcFull: brand.thumbnail.srcFull
        ? assetUrl(brand.thumbnail.srcFull)
        : undefined,
    },
    thumbnailDark: brand.thumbnailDark
      ? {
          ...brand.thumbnailDark,
          src: assetUrl(brand.thumbnailDark.src),
          srcFull: brand.thumbnailDark.srcFull
            ? assetUrl(brand.thumbnailDark.srcFull)
            : undefined,
        }
      : undefined,
  }
}

export const brands: Brand[] = rawBrands.map(withAssetUrls)

export const brandsBySlug: Record<string, Brand> = Object.fromEntries(
  brands.map((brand) => [brand.slug, brand])
)

export function getAllBrands() {
  return brands
}

const sidebarBrands: SidebarBrand[] = brands.map((b) => ({
  slug: b.slug,
  name: b.name,
  industry: b.industry,
  description: b.description,
  categories: b.categories,
  thumbnail: {
    src: b.thumbnail.src,
    width: b.thumbnail.width,
    height: b.thumbnail.height,
    label: b.thumbnail.label,
  },
  thumbnailDark: b.thumbnailDark
    ? {
        src: b.thumbnailDark.src,
        width: b.thumbnailDark.width,
        height: b.thumbnailDark.height,
      }
    : undefined,
  tags: b.tags,
  colors: b.colors.map((c) => ({ hex: c.hex })),
  typography: b.typography.map((t) => ({ name: t.name, category: t.category })),
  searchIndex: buildSidebarSearchIndex(b),
}))

export function getAllSidebarBrands() {
  return sidebarBrands
}

export function getBrandBySlug(slug: string) {
  return brandsBySlug[slug]
}

export function getBrandsByCategory(categorySlug: string) {
  return brands.filter((b) => b.categories.includes(categorySlug))
}

export function getRawBrands() {
  return rawBrands
}

export function getBrandsByTag(tag: string): Brand[] {
  return brands.filter((b) => b.tags?.includes(tag))
}

export function getBrandsByColorFamily(colorFamily: string): Brand[] {
  return brands.filter((b) =>
    b.colors.some((c) => hexToColorFamily(c.hex) === colorFamily)
  )
}

export function getBrandsByTypographyStyle(style: string): Brand[] {
  return brands.filter((b) => b.typography.some((t) => t.category === style))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const brand of brands) {
    for (const tag of brand.tags ?? []) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}

export function getAllColorFamilies(): string[] {
  const families = new Set<string>()
  for (const brand of brands) {
    for (const color of brand.colors) {
      families.add(hexToColorFamily(color.hex))
    }
  }
  return Array.from(families).sort()
}

export function getAllTypographyStyles(): string[] {
  const styles = new Set<string>()
  for (const brand of brands) {
    for (const typo of brand.typography) {
      if (typo.category) styles.add(typo.category)
    }
  }
  return Array.from(styles).sort()
}
