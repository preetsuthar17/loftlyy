import type { Brand } from "@/lib/types"

export const netflix: Brand = {
  slug: "netflix",
  name: "Netflix",
  description:
    "Netflix is the world's leading streaming entertainment service with over 260 million paid memberships in more than 190 countries. Founded in 1997, Netflix revolutionized how people watch TV and movies by pioneering subscription-based streaming and investing heavily in original content.",
  url: "https://netflix.com",
  industry: "entertainment",
  categories: ["entertainment", "technology", "wordmark-logos"],
  tags: ["streaming", "entertainment", "video", "movies", "television"],
  colors: [
    {
      name: "Netflix Red",
      hex: "#E50914",
      usage:
        "Primary brand color, used in the logo, buttons, and key brand moments.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage:
        "Primary background color, creates the cinematic dark environment for content.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Text and UI elements on dark backgrounds.",
    },
  ],
  typography: [
    {
      name: "Netflix Sans",
      role: "Display / Headlines + UI",
      weights: ["300", "400", "500", "700"],
      category: "sans-serif",
      designer: "Noah Nathan & Dalton Maag",
      foundry: "Netflix / Dalton Maag",
      fontUrl: "/brands/netflix/fonts/netflix-sans.woff2",
    },
  ],
  assets: [
    {
      label: "Netflix Icon — Red",
      src: "/brands/netflix/netflix-icon-red.svg",
      width: 263,
      height: 480,
      format: "svg",
    },
    {
      label: "Netflix Icon — White",
      src: "/brands/netflix/netflix-icon-white.svg",
      width: 263,
      height: 480,
      format: "svg",
    },
    {
      label: "Netflix Icon — Black",
      src: "/brands/netflix/netflix-icon-black.svg",
      width: 263,
      height: 480,
      format: "svg",
    },
    {
      label: "Netflix Wordmark — Red",
      src: "/brands/netflix/netflix-logo-red.svg",
      width: 1024,
      height: 277,
      format: "svg",
    },
    {
      label: "Netflix Wordmark — White",
      src: "/brands/netflix/netflix-logo-white.svg",
      width: 1024,
      height: 277,
      format: "svg",
    },
    {
      label: "Netflix Wordmark — Black",
      src: "/brands/netflix/netflix-logo-black.svg",
      width: 1024,
      height: 277,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Netflix Icon — Red",
    src: "/brands/netflix/netflix-icon-red.svg",
    width: 263,
    height: 480,
    format: "svg",
  },
  thumbnailDark: {
    label: "Netflix Icon — White",
    src: "/brands/netflix/netflix-icon-white.svg",
    width: 263,
    height: 480,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 1997,
  headquarters: "Los Gatos, California",
  designer: "Gretel",
  lastRebranded: "2014",
  philosophy:
    "Cinematic, bold, and unmistakable. Netflix's identity uses its signature red against deep black to create an immersive, theater-like experience — the wordmark commands attention while the custom Netflix Sans typeface brings consistency and personality across every screen.",
  legal: {
    guidelinesUrl: "https://brand.netflix.com",
    dos: [
      "Use the Netflix wordmark in its official red (#E50914) on white or black backgrounds",
      "Maintain clear space around the logo equal to the height of the T in NETFLIX",
      "Use official brand assets from brand.netflix.com",
    ],
    donts: [
      "Alter the Netflix logo colors, proportions, or spacing",
      "Place the Netflix logo on busy or low-contrast backgrounds",
      "Use the Netflix name or logo to imply endorsement without written permission",
      "Animate, rotate, or distort the Netflix wordmark",
    ],
  },
}
