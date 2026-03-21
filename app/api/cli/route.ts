import { getRawBrands } from "@/data/brands"

export const GET = () => Response.json({ brands: getRawBrands() })
