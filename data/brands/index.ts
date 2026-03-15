import type { Brand } from "@/lib/types"
import { assetUrl } from "@/lib/assets"
import { hexToColorFamily } from "@/lib/filters"
import { adobe } from "./adobe"
import { airbnb } from "./airbnb"
import { amazon } from "./amazon"
import { anthropic } from "./anthropic"
import { cursor } from "./cursor"
import { apple } from "./apple"
import { discord } from "./discord"
import { notion } from "./notion"
import { figma } from "./figma"
import { github } from "./github"
import { instagram } from "./instagram"
import { google } from "./google"
import { linear } from "./linear"
import { meta } from "./meta"
import { nvidia } from "./nvidia"
import { microsoft } from "./microsoft"
import { netflix } from "./netflix"
import { openai } from "./openai"
import { spotify } from "./spotify"
import { shopify } from "./shopify"
import { slack } from "./slack"
import { snapchat } from "./snapchat"
import { stripe } from "./stripe"
import { vercel } from "./vercel"
import { vscode } from "./vscode"
import { tesla } from "./tesla"
import { tiktok } from "./tiktok"
import { wise } from "./wise"
import { x } from "./x"
import { youtube } from "./youtube"

const rawBrands: Brand[] = [
  adobe,
  airbnb,
  amazon,
  anthropic,
  apple,
  cursor,
  discord,
  figma,
  github,
  instagram,
  google,
  linear,
  meta,
  microsoft,
  netflix,
  nvidia,
  notion,
  openai,
  spotify,
  shopify,
  slack,
  snapchat,
  stripe,
  tesla,
  tiktok,
  vercel,
  vscode,
  wise,
  x,
  youtube,
].sort((a, b) => a.name.localeCompare(b.name))

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
