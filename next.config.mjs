import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")
const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim() ?? ""
const remotePatterns = []

if (assetBaseUrl) {
  const { protocol, hostname, port, pathname } = new URL(assetBaseUrl)

  remotePatterns.push({
    protocol: protocol.replace(":", ""),
    hostname,
    port,
    pathname: `${pathname.replace(/\/$/, "") || ""}/**`,
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns,
    qualities: [25, 50, 75],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
