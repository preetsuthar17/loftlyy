import type { Brand } from "@/lib/types"

export const airbnb: Brand = {
  slug: "airbnb",
  name: "Airbnb",
  description:
    "Airbnb is a global online marketplace for lodging, experiences, and tourism activities. Founded in 2008 in San Francisco, it connects millions of hosts and travelers worldwide, transforming how people find unique accommodations and experience local culture.",
  url: "https://airbnb.com",
  industry: "travel",
  categories: ["travel", "technology", "geometric-logos"],
  tags: [
    "travel",
    "hospitality",
    "marketplace",
    "accommodation",
    "experiences",
  ],
  colors: [
    {
      name: "Rausch",
      hex: "#FF5A5F",
      usage: "Primary brand color, logo, CTAs, and key accents.",
    },
    {
      name: "Babu",
      hex: "#00A699",
      usage: "Secondary accent, success states, illustrations.",
    },
    {
      name: "Arches",
      hex: "#FC642D",
      usage: "Warm accent, highlights, and secondary CTAs.",
    },
    {
      name: "Hof",
      hex: "#484848",
      usage: "Primary text, headings, body copy.",
    },
    {
      name: "Foggy",
      hex: "#767676",
      usage: "Secondary text, captions, metadata.",
    },
    {
      name: "Beach",
      hex: "#FFB400",
      usage: "Star ratings, warm highlights, illustrations.",
    },
  ],
  typography: [
    {
      name: "Airbnb Cereal",
      role: "Primary / Headings & Body",
      weights: ["300", "400", "500", "700", "800", "900"],
      category: "sans-serif",
      designer: "Dalton Maag",
      foundry: "Dalton Maag",
      fontUrl: "/brands/airbnb/fonts/airbnb-cereal-var.woff2",
    },
  ],
  assets: [
    {
      label: "Airbnb Logo — Rausch",
      src: "/brands/airbnb/airbnb-logo-rausch.svg",
      width: 416,
      height: 150,
      format: "svg",
    },
    {
      label: "Airbnb Logo — Black",
      src: "/brands/airbnb/airbnb-logo-black.svg",
      width: 416,
      height: 150,
      format: "svg",
    },
    {
      label: "Airbnb Logo — White",
      src: "/brands/airbnb/airbnb-logo-white.svg",
      width: 416,
      height: 150,
      format: "svg",
    },
    {
      label: "Airbnb Bélo Icon — Rausch",
      src: "/brands/airbnb/airbnb-icon-rausch.svg",
      width: 150,
      height: 150,
      format: "svg",
    },
    {
      label: "Airbnb Bélo Icon — Black",
      src: "/brands/airbnb/airbnb-icon-black.svg",
      width: 150,
      height: 150,
      format: "svg",
    },
    {
      label: "Airbnb Bélo Icon — White",
      src: "/brands/airbnb/airbnb-icon-white.svg",
      width: 150,
      height: 150,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Airbnb Icon — Rausch",
    src: "/brands/airbnb/airbnb-icon-rausch.svg",
    width: 150,
    height: 150,
    format: "svg",
  },
  thumbnailDark: {
    label: "Airbnb Icon — White",
    src: "/brands/airbnb/airbnb-icon-white.svg",
    width: 150,
    height: 150,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2008,
  headquarters: "San Francisco, California",
  designer: "DesignStudio",
  lastRebranded: "2014",
  philosophy:
    "Airbnb's identity is anchored by the Bélo — a symbol of belonging that represents people, places, love, and Airbnb itself. The warm Rausch color and custom Cereal typeface create a friendly, approachable brand that invites connection and exploration across cultures.",
  legal: {
    guidelinesUrl: "https://www.airbnb.com/press/brand-assets",
    dos: [
      "Use official Airbnb brand assets from the press page",
      "Maintain clear space around the Bélo symbol",
      "Use the Bélo or wordmark on clean, uncluttered backgrounds",
      "Refer to the company as 'Airbnb' (capitalized A) in text",
    ],
    donts: [
      "Modify the Bélo symbol proportions or orientation",
      "Use the Airbnb brand to imply endorsement without authorization",
      "Recolor the Bélo outside of approved Rausch, black, or white variants",
      "Combine the Bélo with other symbols or create derivative marks",
    ],
  },
}
