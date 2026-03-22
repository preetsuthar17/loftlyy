import { getRawBrands } from "@/data/brands"

export const revalidate = 3600

export const GET = () =>
  Response.json(
    { brands: getRawBrands() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    }
  )
