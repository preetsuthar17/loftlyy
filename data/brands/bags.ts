import type { Brand } from "@/lib/types"

export const bags: Brand = {
  slug: "bags",
  name: "Bags",
  description:
    "Bags is a creator funding platform built on Solana where creators can launch projects, share them with friends, and earn 1% from every trade. It enables communities to discover and support new projects through a social token-trading model.",
  url: "https://bags.fm",
  industry: "fintech",
  categories: ["fintech", "technology", "minimal-logos"],
  tags: ["blockchain", "crypto", "web3", "creators", "social"],
  colors: [
    {
      name: "Bags Green",
      hex: "#02FF40",
      usage: "Primary brand color, CTAs, accent text, logo.",
    },
    {
      name: "Bags Dark Green",
      hex: "#003B0F",
      usage: "Dark backgrounds, secondary accents, shadows.",
    },
    {
      name: "Bags Mid Green",
      hex: "#007D39",
      usage: "Supporting accents, illustrations, gradients.",
    },
    {
      name: "Bags Black",
      hex: "#000000",
      usage: "Primary text, headings, dark mode surfaces.",
    },
    {
      name: "Bags Off-White",
      hex: "#F5F5F0",
      usage: "Light backgrounds, cards, surfaces.",
    },
  ],
  typography: [
    {
      name: "Padaloma",
      role: "Display / Headings",
      weights: ["400"],
      category: "display",
      fontUrl: "/brands/bags/fonts/padaloma.woff2",
    },
    {
      name: "Open Runde",
      role: "Body / UI",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      fontUrl: "/brands/bags/fonts/open-runde-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Bags Logomark — Green",
      src: "/brands/bags/bags-logo-green.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Bags Logomark — Black",
      src: "/brands/bags/bags-logo-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Bags Logomark — White",
      src: "/brands/bags/bags-logo-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Bags Logomark — Green",
    src: "/brands/bags/bags-logo-green.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Bags Logomark — White",
    src: "/brands/bags/bags-logo-white.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-03-21",
  founded: 2024,
  headquarters: "United States",
  designer: "Bags Design Team",
  philosophy:
    "Bags embraces a bold, neon-green identity rooted in crypto culture and creator empowerment. The money bag logomark and vibrant green palette signal financial opportunity and community-driven growth, while the rounded Open Runde typeface adds approachability to the platform's Web3 foundations.",
  legal: {
    dos: [
      "Use official Bags brand assets for integrations and partnerships",
      "Maintain clearspace around the logomark",
      "Use the green logomark on light backgrounds and white on dark",
    ],
    donts: [
      "Alter the color or proportions of the logomark",
      "Place the logo on low-contrast or busy backgrounds",
      "Use the Bags name or logo to imply endorsement without permission",
    ],
  },
}
