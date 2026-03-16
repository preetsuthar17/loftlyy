import type { Brand } from "@/lib/types"

export const cocaCola: Brand = {
  slug: "coca-cola",
  name: "Coca-Cola",
  description:
    "Coca-Cola is the world's most recognized sparkling beverage, created in 1886 by Dr. John Pemberton in Atlanta, Georgia, and now sold in more than 200 countries and territories. The Coca-Cola Company delivers over 2.2 billion drink servings daily across a portfolio of 200+ brands through its global network of bottling partners. Its iconic contour bottle, Spencerian-script wordmark, and signature red are among the most reproduced visual assets in commercial history.",
  url: "https://coca-cola.com",
  industry: "food",
  categories: ["food", "wordmark-logos"],
  tags: ["beverages", "soft-drinks", "iconic", "global", "consumer-goods"],
  colors: [
    {
      name: "Coca-Cola Red",
      hex: "#EA0000",
      usage:
        "Primary brand color — used across packaging, cans, logo backgrounds, and key brand moments.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage:
        "Secondary color — the Spencerian script wordmark on red backgrounds and light surfaces.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Tertiary — company logo lockup variant and body text.",
    },
    {
      name: "Dark Grey",
      hex: "#3F3F3F",
      usage: "Supporting UI elements and secondary text.",
    },
  ],
  typography: [
    {
      name: "Spencerian Script",
      role: "Wordmark / Logo",
      category: "script",
      designer: "Frank Mason Robinson",
      foundry: "Proprietary",
    },
    {
      name: "TCCC Unity",
      role: "Display / Headlines + UI",
      weights: ["300", "400", "700", "900"],
      category: "sans-serif",
      designer: "Monotype",
      foundry: "The Coca-Cola Company / Monotype",
    },
  ],
  assets: [
    {
      label: "Coca-Cola Icon — Red",
      src: "/brands/coca-cola/coca-cola-icon-red.svg",
      width: 180,
      height: 180,
      format: "svg",
    },
    {
      label: "Coca-Cola Wordmark — Red",
      src: "/brands/coca-cola/coca-cola-wordmark-red.svg",
      width: 529,
      height: 200,
      format: "svg",
    },
    {
      label: "Coca-Cola Wordmark — Black",
      src: "/brands/coca-cola/coca-cola-wordmark-black.svg",
      width: 529,
      height: 200,
      format: "svg",
    },
    {
      label: "Coca-Cola Wordmark — White",
      src: "/brands/coca-cola/coca-cola-wordmark-white.svg",
      width: 529,
      height: 200,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Coca-Cola Icon — Red",
    src: "/brands/coca-cola/coca-cola-icon-red.svg",
    width: 180,
    height: 180,
    format: "svg",
  },
  thumbnailDark: {
    label: "Coca-Cola Icon — Red",
    src: "/brands/coca-cola/coca-cola-icon-red.svg",
    width: 180,
    height: 180,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 1886,
  headquarters: "Atlanta, Georgia, USA",
  designer: "Frank Mason Robinson",
  lastRebranded: "2019",
  philosophy:
    "Coca-Cola's purpose is to refresh the world and make a difference — a philosophy that fuses the simple pleasure of an ice-cold drink with the belief that small moments of happiness have collective global impact. The brand earns its iconic status through unwavering consistency, joy, and cultural relevance across every market it touches.",
  legal: {
    guidelinesUrl: "https://www.coca-colacompany.com/policies-and-practices",
    dos: [
      "Use the Spencerian script wordmark only in approved red, white, or black colorways",
      "Maintain clear space around the logo equal to the cap-height of the wordmark",
      "Use official brand assets from Coca-Cola's licensed press kit",
    ],
    donts: [
      "Alter, stretch, rotate, or recolor the Spencerian script wordmark",
      "Place the logo on busy or low-contrast backgrounds without an approved contrast treatment",
      "Recreate the Spencerian script manually — always use approved digital master files",
      "Use the Dynamic Ribbon Device separately from the wordmark without authorization",
    ],
  },
}
