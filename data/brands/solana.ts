import type { Brand } from "@/lib/types"

export const solana: Brand = {
  slug: "solana",
  name: "Solana",
  description:
    "Solana is a high-performance Layer 1 blockchain designed for mass adoption. Built for speed, scale, and low cost, Solana processes thousands of transactions per second with sub-second finality and fees of fractions of a cent. Home to DeFi, NFTs, payments, gaming, and AI applications.",
  url: "https://solana.com",
  industry: "blockchain",
  categories: ["blockchain", "web3", "technology", "geometric-logos", "gradient-logos"],
  tags: [
    "blockchain",
    "cryptocurrency",
    "web3",
    "defi",
    "nft",
    "layer-1",
    "solana",
  ],
  colors: [
    {
      name: "Solana Green",
      hex: "#14F195",
      usage: "Primary accent color used for interactive elements, highlights, and the gradient.",
    },
    {
      name: "Solana Purple",
      hex: "#9945FF",
      usage: "Secondary accent color paired with green to form the signature gradient.",
    },
    {
      name: "Solana Dark",
      hex: "#000000",
      usage: "Primary background color for dark mode interfaces.",
    },
    {
      name: "Solana White",
      hex: "#FFFFFF",
      usage: "Primary text and logo color on dark backgrounds.",
    },
  ],
  typography: [
    {
      name: "Diatype",
      role: "Primary / Display",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Fabian Harb",
      foundry: "Dinamo",
      fontUrl: "https://abcdinamo.com/typefaces/diatype",
    },
  ],
  assets: [
    {
      label: "Solana Logomark — White",
      src: "/brands/solana/solana-logomark.svg",
      width: 400,
      height: 349,
      format: "svg",
    },
    {
      label: "Solana Wordmark",
      src: "/brands/solana/solana-wordmark.svg",
      width: 400,
      height: 60,
      format: "svg",
    },
    {
      label: "Solana Full Logo",
      src: "/brands/solana/solana-logo.png",
      width: 800,
      height: 200,
      format: "png",
    },
    {
      label: "Solana Logomark — Dark",
      src: "/brands/solana/solana-logomark-dark.png",
      width: 400,
      height: 349,
      format: "png",
    },
  ],
  thumbnail: {
    label: "Solana Logomark — White",
    src: "/brands/solana/solana-logomark.svg",
    width: 400,
    height: 349,
    format: "svg",
  },
  thumbnailDark: {
    label: "Solana Logomark — White",
    src: "/brands/solana/solana-logomark.svg",
    width: 400,
    height: 349,
    format: "svg",
  },
  dateAdded: "2026-03-22",
  founded: 2017,
  headquarters: "San Francisco, CA",
  philosophy:
    "Solana's identity is built on speed, scale, and the future. The three stacked parallelograms of the logomark represent building blocks in motion — a nod to construction and forward momentum. The signature green-to-purple gradient runs through every touchpoint, pairing a neon-electric palette with a dark, minimal aesthetic that signals both power and precision.",
  legal: {
    dos: [
      "Use official logo assets from solana.com/branding",
      "Maintain clear space around the logomark equal to the height of the 'S'",
      "Use on dark backgrounds for maximum contrast",
      "Use the gradient version for branded promotional materials",
    ],
    donts: [
      "Add shadows, outlines, or effects to the logo",
      "Stretch or distort the logo",
      "Apply logo on low-contrast backgrounds",
      "Use the Solana name to imply official endorsement or partnership",
      "Use the logo at low resolution",
    ],
  },
}
