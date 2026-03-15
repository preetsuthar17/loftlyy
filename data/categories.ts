import type { Category } from "@/lib/types"

export const categories: Category[] = [
  { slug: "fintech", type: "industry" },
  { slug: "saas", type: "industry" },
  { slug: "social-media", type: "industry" },
  { slug: "e-commerce", type: "industry" },
  { slug: "music", type: "industry" },
  { slug: "ai", type: "industry" },
  { slug: "technology", type: "industry" },
  { slug: "minimal-logos", type: "style" },
  { slug: "gradient-brands", type: "style" },
  { slug: "wordmark-logos", type: "style" },
  { slug: "geometric-logos", type: "style" },
  { slug: "travel", type: "industry" },
  { slug: "automotive", type: "industry" },
  { slug: "entertainment", type: "industry" },
]

export function getAllCategories() {
  return categories
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}
