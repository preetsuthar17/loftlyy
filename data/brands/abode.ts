import type { Brand } from "@/lib/types"

export const abode: Brand = {
  slug: "abode",
  name: "Abode",
  description:
    "Abode is a social mobile app that transforms your phone into a multiplayer hangout space. Built by Look Engineering, Inc., it lets friends connect through shared interactive widgets called 'magnets' — enabling collaborative games, playlists, polls, and real-time activities together.",
  url: "https://www.abode.space",
  industry: "social-media",
  categories: ["social-media", "technology"],
  tags: ["social", "mobile", "multiplayer", "messaging", "community"],
  colors: [
    {
      name: "Abode Blue",
      hex: "#3474FF",
      usage:
        "Primary brand color. Used for the logo, buttons, and key interactive elements across the app.",
    },
    {
      name: "Navy",
      hex: "#06205B",
      usage:
        "Dark brand color. Used for the primary wordmark on light backgrounds.",
    },
    {
      name: "Coral",
      hex: "#F4533E",
      usage: "Health and activity widget accent color.",
    },
    {
      name: "Sky Blue",
      hex: "#5697F8",
      usage: "Pet and secondary feature widget accent color.",
    },
    {
      name: "Mint",
      hex: "#61D390",
      usage: "Lexico word game widget accent color.",
    },
    {
      name: "Sunshine",
      hex: "#F6CA45",
      usage: "Note, Ascend, and puzzle widget accent color.",
    },
  ],
  typography: [
    {
      name: "Hagrid Text",
      role: "Display / Headlines",
      weights: ["700", "800"],
      category: "serif",
      foundry: "Atipo Foundry",
      fontUrl: "/brands/abode/fonts/hagrid-text-extrabold.woff2",
    },
    {
      name: "Hagrid Text Medium",
      role: "Subheadings / UI",
      weights: ["500"],
      category: "serif",
      foundry: "Atipo Foundry",
      fontUrl: "/brands/abode/fonts/hagrid-text-medium.woff2",
    },
    {
      name: "Inter",
      role: "Body / Interface",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Rasmus Andersson / Google Fonts",
      fontUrl: "/brands/abode/fonts/inter.woff2",
    },
  ],
  assets: [
    {
      label: "Logomark (Blue)",
      src: "/brands/abode/abode-logomark-blue.svg",
      width: 240,
      height: 240,
      format: "svg",
    },
    {
      label: "Logomark (White)",
      src: "/brands/abode/abode-logomark-white.svg",
      width: 240,
      height: 240,
      format: "svg",
    },
    {
      label: "Logomark (Dark)",
      src: "/brands/abode/abode-logomark-dark.svg",
      width: 240,
      height: 240,
      format: "svg",
    },
    {
      label: "Wordmark (Blue & White)",
      src: "/brands/abode/abode-logo-blue.svg",
      width: 779,
      height: 180,
      format: "svg",
    },
    {
      label: "Wordmark (White)",
      src: "/brands/abode/abode-logo-white.svg",
      width: 779,
      height: 180,
      format: "svg",
    },
    {
      label: "Wordmark (Dark)",
      src: "/brands/abode/abode-logo-dark.svg",
      width: 779,
      height: 180,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Logomark",
    src: "/brands/abode/abode-logomark-blue.svg",
    width: 240,
    height: 240,
    format: "svg",
  },
  thumbnailDark: {
    label: "Logomark (White)",
    src: "/brands/abode/abode-logomark-white.svg",
    width: 240,
    height: 240,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 2025,
  designer: "aliszu",
  philosophy:
    "Abode's identity is built on the idea that phones should bring people closer together, not further apart. The bold, geometric wordmark in signature blue anchors a vibrant, playful visual system that celebrates connection, spontaneity, and shared moments.",
  legal: {
    guidelinesUrl: "https://www.abode.space",
    dos: [
      "Use the official Abode logo assets from the press kit without modification.",
      "Maintain clear space around the logo equal to the width of the 'a' letterform.",
      "Use Abode Blue (#3474FF) as the primary logo color on light backgrounds.",
    ],
    donts: [
      "Do not alter, rotate, stretch, or distort the logo in any way.",
      "Do not use the Abode name or logo to imply endorsement without permission.",
      "Do not reproduce the logo in colors other than the approved brand palette.",
      "Do not place the logo on backgrounds that reduce legibility.",
    ],
  },
}
