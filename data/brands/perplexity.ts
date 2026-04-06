import type { Brand } from "@/lib/types"

export const perplexity: Brand = {
  slug: "perplexity",
  name: "Perplexity",
  description:
    "Perplexity is an AI-powered answer engine that combines large language models with real-time web search to deliver accurate, cited responses. Founded in 2022, it reimagines how people discover and understand information online.",
  url: "https://www.perplexity.ai",
  industry: "ai",
  categories: ["ai", "saas", "minimal-logos", "wordmark-logos"],
  tags: [
    "artificial-intelligence",
    "search-engine",
    "machine-learning",
    "answer-engine",
    "research",
  ],
  colors: [
    {
      name: "True Turquoise",
      hex: "#1FB8CD",
      usage:
        "Primary brand color. Used for the logo, interactive elements, and key brand touchpoints.",
    },
    {
      name: "Off-Black",
      hex: "#13343B",
      usage:
        "Primary dark color for text, backgrounds, and UI elements requiring high contrast.",
    },
    {
      name: "Paper White",
      hex: "#F3F3EE",
      usage:
        "Light background color used for content areas and light-mode surfaces.",
    },
    {
      name: "Terra Cotta",
      hex: "#A84B2F",
      usage: "Warm accent color for highlights and secondary visual elements.",
    },
    {
      name: "Turquoise 700",
      hex: "#114F56",
      usage: "Deep turquoise for dark-mode accents and rich background tones.",
    },
  ],
  typography: [
    {
      name: "Perplexity Sans Variable",
      role: "Primary / UI & Body",
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      category: "sans-serif",
      foundry: "Grilli Type",
    },
    {
      name: "Perplexity Serif Variable",
      role: "Editorial & Long-form",
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      category: "serif",
      foundry: "Grilli Type",
    },
    {
      name: "Perplexity Mono Variable",
      role: "Code & Data",
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      category: "monospace",
      foundry: "Grilli Type",
    },
  ],
  assets: [
    {
      label: "Perplexity Logo — Black",
      src: "/brands/perplexity/perplexity-logo-black.svg",
      width: 256,
      height: 280,
      format: "svg",
    },
    {
      label: "Perplexity Logo — White",
      src: "/brands/perplexity/perplexity-logo-white.svg",
      width: 256,
      height: 280,
      format: "svg",
    },
    {
      label: "Perplexity Logo — Teal",
      src: "/brands/perplexity/perplexity-logo-teal.svg",
      width: 256,
      height: 280,
      format: "svg",
    },
    {
      label: "Perplexity Wordmark — Black",
      src: "/brands/perplexity/perplexity-wordmark-black.svg",
      width: 468,
      height: 130,
      format: "svg",
    },
    {
      label: "Perplexity Wordmark — White",
      src: "/brands/perplexity/perplexity-wordmark-white.svg",
      width: 468,
      height: 130,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Perplexity Logo — Black",
    src: "/brands/perplexity/perplexity-logo-black.svg",
    width: 256,
    height: 280,
    format: "svg",
  },
  thumbnailDark: {
    label: "Perplexity Logo — White",
    src: "/brands/perplexity/perplexity-logo-white.svg",
    width: 256,
    height: 280,
    format: "svg",
  },
  dateAdded: "2026-03-25",
  founded: 2022,
  headquarters: "San Francisco, CA",
  designer: "Smith & Diction",
  lastRebranded: "2026",
  philosophy:
    "Clean, clear, and intentionally understated. Perplexity's identity prioritizes content over chrome, using a distinctive turquoise palette and geometric symbol to communicate precision and trustworthiness in AI-driven search.",
  legal: {
    guidelinesUrl: "https://live.standards.site/perplexity",
    dos: [
      "Use the official Perplexity logo assets from the brand guidelines.",
      "Maintain adequate clear space around the logo symbol.",
      "Use approved color variants on appropriate backgrounds.",
    ],
    donts: [
      "Modify, distort, or rotate the Perplexity logo.",
      "Use the Perplexity name to imply endorsement without permission.",
      "Recreate the logo or wordmark using alternative typefaces.",
      "Place the logo on busy or low-contrast backgrounds.",
    ],
  },
}
