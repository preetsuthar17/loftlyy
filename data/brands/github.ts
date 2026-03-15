import type { Brand } from "@/lib/types"

export const github: Brand = {
  slug: "github",
  name: "GitHub",
  description:
    "GitHub is the world's leading software development platform, providing cloud-based Git repository hosting, collaboration tools, and CI/CD workflows. Founded in 2008 and acquired by Microsoft in 2018, GitHub is home to over 100 million developers and powers the open-source ecosystem.",
  url: "https://github.com",
  industry: "technology",
  categories: ["technology", "saas", "geometric-logos"],
  tags: [
    "developer-tools",
    "open-source",
    "version-control",
    "collaboration",
    "code-hosting",
  ],
  colors: [
    {
      name: "GitHub Black",
      hex: "#24292E",
      usage:
        "Primary brand color. Used for the Invertocat logo, text, and dark UI surfaces.",
    },
    {
      name: "GitHub Green",
      hex: "#0FBF3E",
      usage:
        "Key brand accent. Used for contribution graphs, success states, merge indicators, and primary CTAs.",
    },
    {
      name: "Gray 1",
      hex: "#F2F5F3",
      usage: "Lightest neutral background, cards, subtle dividers.",
    },
    {
      name: "Gray 5",
      hex: "#232925",
      usage: "Dark neutral backgrounds, secondary dark surfaces.",
    },
    {
      name: "Gray 6",
      hex: "#101411",
      usage: "Darkest background, dark mode primary surface.",
    },
    {
      name: "Copilot Purple",
      hex: "#8534F3",
      usage:
        "GitHub Copilot product branding, AI feature accents.",
    },
    {
      name: "Security Blue",
      hex: "#3094FF",
      usage:
        "GitHub Security product branding, trust and reliability indicators.",
    },
  ],
  typography: [
    {
      name: "Mona Sans",
      role: "Primary / Headlines & Body",
      weights: ["400", "500", "600", "700", "800", "900"],
      category: "sans-serif",
      designer: "GitHub Design Team",
      foundry: "GitHub (Degarism Studio)",
      fontUrl: "/brands/github/fonts/mona-sans.woff2",
    },
  ],
  assets: [
    {
      label: "Invertocat — Black",
      src: "/brands/github/github-logo-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Invertocat — White",
      src: "/brands/github/github-logo-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Invertocat — Green",
      src: "/brands/github/github-logo-green.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "GitHub Wordmark — Black",
      src: "/brands/github/github-wordmark-black.svg",
      width: 624,
      height: 195,
      format: "svg",
    },
    {
      label: "GitHub Wordmark — White",
      src: "/brands/github/github-wordmark-white.svg",
      width: 624,
      height: 195,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Invertocat — Black",
    src: "/brands/github/github-logo-black.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Invertocat — White",
    src: "/brands/github/github-logo-white.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2008,
  headquarters: "San Francisco, California",
  designer: "GitHub Brand Studio",
  lastRebranded: "2024",
  philosophy:
    "GitHub's identity is built on the Invertocat — a minimal, universally recognized mark that represents the intersection of code and community. The brand emphasizes openness, developer empowerment, and the idea that great software is built together.",
  legal: {
    guidelinesUrl: "https://brand.github.com",
    dos: [
      "Use GitHub logos to link to GitHub",
      "Use logos as social media buttons linking to your GitHub profile",
      "Use the Invertocat to indicate your project is hosted on GitHub",
      "Feature GitHub branding in blog posts and news articles about GitHub",
    ],
    donts: [
      "Rearrange or modify the logo elements",
      "Substitute illustrations, mascots, or Mona for the official logo",
      "Add shadows, gradients, or visual effects to the logo",
      "Place the logo over busy or low-contrast backgrounds",
      "Modify the colors, dimensions, or proportions of the logo",
      "Use the GitHub brand to imply endorsement without written permission",
    ],
  },
}
