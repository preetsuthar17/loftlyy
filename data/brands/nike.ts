import type { Brand } from "@/lib/types"

export const nike: Brand = {
  slug: "nike",
  name: "Nike",
  description:
    "Nike is the world's leading sportswear brand, designing and selling athletic footwear, apparel, and equipment for athletes at every level. Founded in 1964 as Blue Ribbon Sports and rebranded in 1971, Nike has built a global empire on the belief that if you have a body, you are an athlete — producing iconic products and campaigns that blend performance engineering with cultural relevance.",
  url: "https://www.nike.com",
  industry: "sportswear",
  categories: ["sportswear", "minimal-logos"],
  tags: [
    "athletic",
    "footwear",
    "apparel",
    "sports",
    "lifestyle",
    "performance",
  ],
  colors: [
    {
      name: "Nike Black",
      hex: "#111111",
      usage:
        "Primary brand color. Used for the Swoosh logo, wordmark, and primary UI elements.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Clean backgrounds, reversed logo on dark surfaces.",
    },
    {
      name: "Safety Orange",
      hex: "#FF6600",
      usage:
        "Accent color used in campaigns, Air Max branding, and high-visibility marketing.",
    },
    {
      name: "Cool Gray",
      hex: "#F5F5F5",
      usage:
        "Light backgrounds, subtle UI surfaces, and secondary content areas.",
    },
  ],
  typography: [
    {
      name: "Nike Futura ND",
      role: "Display / Headlines",
      weights: ["300", "400"],
      category: "sans-serif",
      designer: "Nike Design Team",
      foundry: "Nike (custom cut of Futura)",
      fontUrl: "/brands/nike/fonts/nike-futura.woff2",
    },
    {
      name: "Helvetica Now Text",
      role: "Body / UI",
      weights: ["400", "500"],
      category: "sans-serif",
      designer: "Charles Nix",
      foundry: "Monotype",
      fontUrl: "/brands/nike/fonts/helvetica-now-text.woff2",
    },
  ],
  assets: [
    {
      label: "Nike Swoosh — Black",
      src: "/brands/nike/nike-logo-black.svg",
      width: 316,
      height: 124,
      format: "svg",
    },
    {
      label: "Nike Swoosh — White",
      src: "/brands/nike/nike-logo-white.svg",
      width: 316,
      height: 124,
      format: "svg",
    },
    {
      label: "Nike Wordmark + Swoosh — Black",
      src: "/brands/nike/nike-wordmark-black.svg",
      width: 512,
      height: 268,
      format: "svg",
    },
    {
      label: "Nike Wordmark + Swoosh — White",
      src: "/brands/nike/nike-wordmark-white.svg",
      width: 512,
      height: 268,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Nike Swoosh — Black",
    src: "/brands/nike/nike-logo-black.svg",
    width: 316,
    height: 124,
    format: "svg",
  },
  thumbnailDark: {
    label: "Nike Swoosh — White",
    src: "/brands/nike/nike-logo-white.svg",
    width: 316,
    height: 124,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 1964,
  headquarters: "Beaverton, Oregon, USA",
  designer: "Carolyn Davidson (Swoosh, 1971), Nike Design Team",
  lastRebranded: "1995",
  philosophy:
    "Just Do It. Nike's identity is anchored by the Swoosh — one of the most recognized symbols on earth — embodying motion, speed, and athletic aspiration. The stark black-and-white palette strips away distraction, letting performance and purpose speak for themselves.",
  legal: {
    guidelinesUrl: "https://www.nike.com/help/a/logo-use-policy",
    dos: [
      "Use Nike-approved artwork from official press resources",
      "Maintain minimum clear space around the Swoosh",
      "Use the Swoosh only in black or white without prior written approval",
    ],
    donts: [
      "Modify, distort, rotate, or add effects to the Nike Swoosh",
      "Use the Nike Swoosh or wordmark to imply endorsement or partnership",
      "Reproduce the Nike trademark on merchandise without a license",
      "Use the Swoosh in combination with other logos or brand marks",
    ],
  },
}
