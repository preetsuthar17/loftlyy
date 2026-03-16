import type { Brand } from "@/lib/types"

export const mcdonalds: Brand = {
  slug: "mcdonalds",
  name: "McDonald's",
  description:
    "McDonald's is the world's largest fast-food restaurant chain, serving nearly 70 million customers daily across more than 100 countries. Founded in 1940 by Richard and Maurice McDonald and expanded globally by Ray Kroc, McDonald's transformed the restaurant industry through the franchise model and standardized fast-food service.",
  url: "https://mcdonalds.com",
  industry: "food",
  categories: ["food", "geometric-logos"],
  tags: ["fast-food", "restaurants", "food-service", "global", "iconic"],
  colors: [
    {
      name: "Arches Gold",
      hex: "#FFBC0D",
      usage:
        "Primary brand color. The iconic golden arches and all primary brand applications.",
    },
    {
      name: "McDonald's Red",
      hex: "#DA291C",
      usage:
        "Secondary brand color. Used in packaging, signage, and marketing materials.",
    },
    {
      name: "Black",
      hex: "#27251F",
      usage: "Primary text color and dark logo variant.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds, reverse logo applications, and clean layouts.",
    },
  ],
  typography: [
    {
      name: "Speedee",
      role: "Primary Brand Typeface",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "McDonald's Design Team",
      foundry: "McDonald's",
    },
    {
      name: "Lovin' Sans",
      role: "Digital / Marketing Typeface",
      weights: ["400", "500", "700"],
      category: "sans-serif",
      designer: "McDonald's Design Team",
      foundry: "McDonald's",
    },
  ],
  assets: [
    {
      label: "Golden Arches — Yellow",
      src: "/brands/mcdonalds/mcdonalds-logo-yellow.svg",
      width: 352,
      height: 355,
      format: "svg",
    },
    {
      label: "Golden Arches — Black",
      src: "/brands/mcdonalds/mcdonalds-logo-black.svg",
      width: 352,
      height: 355,
      format: "svg",
    },
    {
      label: "Golden Arches — White",
      src: "/brands/mcdonalds/mcdonalds-logo-white.svg",
      width: 352,
      height: 355,
      format: "svg",
    },
    {
      label: "Full Logo — Black",
      src: "/brands/mcdonalds/mcdonalds-wordmark-black.svg",
      width: 193,
      height: 193,
      format: "svg",
    },
    {
      label: "Full Logo — White",
      src: "/brands/mcdonalds/mcdonalds-wordmark-white.svg",
      width: 193,
      height: 193,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Golden Arches — Yellow",
    src: "/brands/mcdonalds/mcdonalds-logo-yellow.svg",
    width: 352,
    height: 355,
    format: "svg",
  },
  thumbnailDark: {
    label: "Golden Arches — White",
    src: "/brands/mcdonalds/mcdonalds-logo-white.svg",
    width: 352,
    height: 355,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 1940,
  headquarters: "Chicago, Illinois",
  designer: "Jim Schindler (Golden Arches, 1962), McDonald's Design Team",
  lastRebranded: "2003",
  philosophy:
    "Bold, warm, and instantly recognizable. The Golden Arches are among the most iconic symbols in the world — a simple geometric M in gleaming gold that transcends language and culture, embodying accessibility, consistency, and the universal appeal of a familiar meal.",
  legal: {
    guidelinesUrl:
      "https://corporate.mcdonalds.com/corpmcd/en-us/our-stories/article/ourstories.brand-guidelines.html",
    dos: [
      "Use the Golden Arches logo only in approved colors: Arches Gold, black, or white",
      "Maintain clear space around the logo equal to the height of one arch",
      "Use official McDonald's brand assets from the corporate brand resource center",
    ],
    donts: [
      "Alter the proportions, colors, or shape of the Golden Arches",
      "Place the logo on backgrounds that reduce legibility or contrast",
      "Use the McDonald's name or logo to imply endorsement without written permission",
      "Combine the Golden Arches with other logos or graphic elements",
    ],
  },
}
