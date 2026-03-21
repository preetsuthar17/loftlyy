export interface BrandColor {
  hex: string
  name: string
  usage?: string
}

export interface BrandTypography {
  category?: string
  name: string
  role: string
  weights?: string[]
}

export interface BrandAsset {
  format: string
  height: number
  label: string
  src: string
  width: number
}

export interface Brand {
  assets: BrandAsset[]
  categories: string[]
  colors: BrandColor[]
  dateAdded: string
  description: string
  founded?: number
  headquarters?: string
  industry: string
  name: string
  slug: string
  tags?: string[]
  thumbnail: BrandAsset
  thumbnailDark?: BrandAsset
  typography: BrandTypography[]
  url?: string
}

export interface SidebarBrand {
  categories: string[]
  colors: { hex: string }[]
  description: string
  industry: string
  name: string
  searchIndex: {
    hexes: string[]
    text: string
  }
  slug: string
  tags?: string[]
  thumbnail: {
    height: number
    label: string
    src: string
    width: number
  }
  thumbnailDark?: {
    height: number
    src: string
    width: number
  }
  typography: {
    category?: string
    name: string
  }[]
}

export type OutputMode = "table" | "json" | "ndjson"

export interface LoaderOptions {
  baseUrl?: string
  rootDir?: string
  source: "local" | "remote"
  strict: boolean
}

export interface LoadedBrands {
  brands: Brand[]
  sidebarBrands: SidebarBrand[]
  warnings: string[]
}

export interface BrandFacets {
  colorFamilies: string[]
  industries: string[]
  tags: string[]
  typographyStyles: string[]
}

export interface CliRenderContext {
  colorEnabled: boolean
  outputMode: OutputMode
}

export interface PaletteEntry extends BrandColor {
  usage?: string
}
