import type { Brand } from "@/lib/types"

export const starbucks: Brand = {
  slug: "starbucks",
  name: "Starbucks",
  description:
    "Starbucks is the world's premier roaster and retailer of specialty coffee, operating over 38,000 locations in 85+ countries. Founded in 1971 at Seattle's Pike Place Market, Starbucks sources high-quality arabica coffee and has become a defining force in global coffeehouse culture, positioning itself as a welcoming 'third place' between home and work.",
  url: "https://starbucks.com",
  industry: "food",
  categories: ["food"],
  tags: [
    "coffee",
    "beverages",
    "retail",
    "hospitality",
    "sustainability",
    "food-and-drink",
  ],
  colors: [
    {
      name: "Starbucks Green",
      hex: "#006341",
      usage: "Primary brand color — logo, primary CTAs, and core brand identity.",
    },
    {
      name: "Accent Green",
      hex: "#00A862",
      usage: "Accent highlights, hover states, and digital accents.",
    },
    {
      name: "Forest Green",
      hex: "#1E3932",
      usage: "Deep dark green for backgrounds and dark section fills.",
    },
    {
      name: "Starbucks Cream",
      hex: "#F5F1EB",
      usage: "Warm neutral background for light surfaces.",
    },
    {
      name: "Dark Charcoal",
      hex: "#242221",
      usage: "Primary text and dark UI elements.",
    },
  ],
  typography: [
    {
      name: "SoDoSans",
      role: "Primary / UI, Body & Marketing",
      weights: ["400", "600", "700"],
      category: "sans-serif",
      designer: "Starbucks Design Team",
      foundry: "Starbucks (custom)",
    },
  ],
  assets: [
    {
      label: "Starbucks Siren — Green",
      src: "/brands/starbucks/starbucks-icon-green.svg",
      width: 240,
      height: 240,
      format: "svg",
    },
    {
      label: "Starbucks Siren — Black",
      src: "/brands/starbucks/starbucks-icon-black.svg",
      width: 240,
      height: 240,
      format: "svg",
    },
    {
      label: "Starbucks Siren — White",
      src: "/brands/starbucks/starbucks-icon-white.svg",
      width: 240,
      height: 240,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Starbucks Siren — Green",
    src: "/brands/starbucks/starbucks-icon-green.svg",
    width: 240,
    height: 240,
    format: "svg",
  },
  thumbnailDark: {
    label: "Starbucks Siren — White",
    src: "/brands/starbucks/starbucks-icon-white.svg",
    width: 240,
    height: 240,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 1971,
  headquarters: "Seattle, Washington, USA",
  designer: "Starbucks Design Team",
  lastRebranded: "2011",
  philosophy:
    "With every cup, with every conversation, with every community — Starbucks nurtures the limitless possibilities of human connection. The iconic white siren on Starbucks Green is one of the most recognized symbols on earth, embodying warmth, craft, and the promise of a welcoming space.",
  legal: {
    guidelinesUrl: "https://creative.starbucks.com/",
    dos: [
      "Use only official Starbucks brand assets from the creative portal",
      "Maintain clear space around the Siren logo",
      "Refer to the company as 'Starbucks' in all written materials",
      "Use the Siren logo on clean, uncluttered backgrounds",
    ],
    donts: [
      "Alter the Siren's proportions, orientation, or color outside of approved variants",
      "Use the Starbucks brand to imply endorsement without authorization",
      "Combine the Siren with other symbols or create derivative marks",
      "Reproduce the Siren logo in unapproved colors",
    ],
  },
}
