import type { Brand } from "@/lib/types"

export function BrandStructuredData({ brand }: { brand: Brand }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.url,
    logo: brand.assets[0]?.src,
    description: brand.description,
    industry: brand.industry,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function CategoryStructuredData({
  categoryName,
  categoryDescription,
  brands,
  locale,
}: {
  categoryName: string
  categoryDescription: string
  brands: Brand[]
  locale: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    description: categoryDescription,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brands.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/${locale}/${b.slug}`,
        name: b.name,
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
