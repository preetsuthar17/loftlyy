import type { Brand } from "@/lib/types"

export const planetscale: Brand = {
  slug: "planetscale",
  name: "PlanetScale",
  description:
    "PlanetScale is a cloud database platform offering managed MySQL (via Vitess) and PostgreSQL services, built by the creators of Vitess — the open-source sharding system that scaled YouTube. It provides non-blocking schema changes, branching workflows, and horizontal sharding for teams building high-performance applications.",
  url: "https://planetscale.com",
  industry: "technology",
  categories: ["technology", "saas", "minimal-logos", "geometric-logos"],
  tags: ["developer-tools", "database", "cloud", "infrastructure", "open-source"],
  colors: [
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary brand color, logo, text, and dark backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds, inverted logo, and light surfaces.",
    },
    {
      name: "Charcoal",
      hex: "#111111",
      usage: "Dark UI surfaces and secondary text.",
    },
    {
      name: "Orange",
      hex: "#F35815",
      usage: "Accent color for highlights, CTAs, and branding moments.",
    },
    {
      name: "Blue",
      hex: "#1E9DE7",
      usage: "Links, interactive elements, and secondary accents.",
    },
    {
      name: "Gray",
      hex: "#818181",
      usage: "Muted text, borders, and secondary UI elements.",
    },
  ],
  typography: [
    {
      name: "Inter",
      role: "Primary / Headings & Body",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Google Fonts",
      fontUrl: "/brands/planetscale/fonts/inter-regular.woff2",
    },
    {
      name: "SF Mono",
      role: "Code / Monospace",
      weights: ["400", "500", "600"],
      category: "monospace",
      designer: "Apple Inc.",
      foundry: "Apple",
    },
  ],
  assets: [
    {
      label: "PlanetScale Logo — Black",
      src: "/brands/planetscale/planetscale-logo-black.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "PlanetScale Logo — White",
      src: "/brands/planetscale/planetscale-logo-white.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "PlanetScale Logo — Orange",
      src: "/brands/planetscale/planetscale-logo-orange.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "PlanetScale Logo — Black",
    src: "/brands/planetscale/planetscale-logo-black.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  thumbnailDark: {
    label: "PlanetScale Logo — White",
    src: "/brands/planetscale/planetscale-logo-white.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 2018,
  headquarters: "San Francisco, California",
  designer: "Shaun Middlebusher",
  philosophy:
    "PlanetScale's brand identity reflects the power and precision of infrastructure-grade database technology. Its bold geometric logo — an abstract planet with intersecting orbital paths — conveys speed, scalability, and the interconnected nature of modern data systems.",
  legal: {
    guidelinesUrl: "https://planetscale.com/about",
    dos: [
      "Use official PlanetScale logo assets from approved sources",
      "Maintain clear space around the PlanetScale logo",
      "Use PlanetScale marks to accurately reference PlanetScale products and services",
    ],
    donts: [
      "Modify or distort the PlanetScale logo",
      "Use PlanetScale marks in a way that implies endorsement or sponsorship",
      "Combine PlanetScale marks with other logos or icons",
      "Use PlanetScale marks more prominently than your own branding",
    ],
  },
}
