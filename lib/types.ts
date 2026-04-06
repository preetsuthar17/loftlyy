export interface BrandColor {
  name: string
  hex: string
  usage?: string
}

export interface BrandTypography {
  name: string
  role: string
  weights?: string[]
  category?: string
  designer?: string
  foundry?: string
  fontUrl?: string
}

export interface BrandAsset {
  label: string
  src: string
  srcFull?: string
  width: number
  height: number
  blurDataURL?: string
  format: string
}

export interface BrandLegal {
  guidelinesUrl?: string
  dos?: string[]
  donts?: string[]
}

export interface Brand {
  slug: string
  name: string
  description: string
  url?: string
  industry: string
  categories: string[]
  tags?: string[]
  colors: BrandColor[]
  typography: BrandTypography[]
  assets: BrandAsset[]
  thumbnail: BrandAsset
  thumbnailDark?: BrandAsset
  dateAdded: string
  founded?: number
  headquarters?: string
  designer?: string
  lastRebranded?: string
  philosophy?: string
  legal?: BrandLegal
}

/** Minimal brand data for similar-brand cards (avoids serializing full Brand to client) */
export interface SimilarBrandCard {
  slug: string
  name: string
  industry: string
  thumbnail: { src: string; width: number; height: number }
  thumbnailDark?: { src: string; width: number; height: number }
  colors: { hex: string }[]
}

/** Slim brand data for sidebar + command menu (avoids serializing full Brand to client) */
export interface SidebarBrand {
  slug: string
  name: string
  industry: string
  description: string
  categories: string[]
  thumbnail: { src: string; width: number; height: number; label: string }
  thumbnailDark?: { src: string; width: number; height: number }
  tags?: string[]
  colors: { hex: string }[]
  typography: { name: string; category?: string }[]
  searchIndex: {
    text: string
    hexes: string[]
  }
}

export interface Category {
  slug: string
  type: "industry" | "style" | "attribute"
}
