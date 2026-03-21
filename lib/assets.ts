const ABSOLUTE_URL_RE = /^https?:\/\//i
const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim() ?? ""

function normalizeAssetBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "")
}

export function assetUrl(path: string): string {
  if (!path || ABSOLUTE_URL_RE.test(path) || !assetBaseUrl) {
    return path
  }

  return `${normalizeAssetBaseUrl(assetBaseUrl)}${path}`
}
