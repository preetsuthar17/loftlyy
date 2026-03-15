import type { Brand } from "@/lib/types"
import { airbnb } from "./airbnb"
import { anthropic } from "./anthropic"
import { apple } from "./apple"
import { discord } from "./discord"
import { notion } from "./notion"
import { figma } from "./figma"
import { linear } from "./linear"
import { openai } from "./openai"
import { spotify } from "./spotify"
import { stripe } from "./stripe"
import { vercel } from "./vercel"
import { wise } from "./wise"

export const brands: Brand[] = [
  airbnb,
  anthropic,
  apple,
  discord,
  figma,
  linear,
  notion,
  openai,
  spotify,
  stripe,
  vercel,
  wise,
].sort((a, b) => a.name.localeCompare(b.name))

export const brandsBySlug: Record<string, Brand> = Object.fromEntries(
  brands.map((b) => [b.slug, b])
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
