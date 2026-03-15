import type { Brand } from "@/lib/types"
import { airbnb } from "./airbnb"
import { amazon } from "./amazon"
import { anthropic } from "./anthropic"
import { cursor } from "./cursor"
import { apple } from "./apple"
import { discord } from "./discord"
import { notion } from "./notion"
import { figma } from "./figma"
import { github } from "./github"
import { google } from "./google"
import { linear } from "./linear"
import { meta } from "./meta"
import { nvidia } from "./nvidia"
import { microsoft } from "./microsoft"
import { openai } from "./openai"
import { spotify } from "./spotify"
import { slack } from "./slack"
import { stripe } from "./stripe"
import { vercel } from "./vercel"
import { vscode } from "./vscode"
import { tesla } from "./tesla"
import { wise } from "./wise"
import { x } from "./x"

export const brands: Brand[] = [
  airbnb,
  amazon,
  anthropic,
  apple,
  cursor,
  discord,
  figma,
  github,
  google,
  linear,
  meta,
  microsoft,
  nvidia,
  notion,
  openai,
  spotify,
  slack,
  stripe,
  tesla,
  vercel,
  vscode,
  wise,
  x,
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
