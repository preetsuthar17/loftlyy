import type { Brand } from "@/lib/types"

export const x: Brand = {
  slug: "x",
  name: "X",
  description:
    "X (formerly Twitter) is a global social media platform for real-time conversation, news, and public discourse. Founded in 2006 by Jack Dorsey, Noah Glass, Biz Stone, and Evan Williams, it was rebranded to X in 2023 under Elon Musk's ownership, signaling a vision to become an everything app.",
  url: "https://x.com",
  industry: "social-media",
  categories: ["social-media", "technology", "minimal-logos"],
  tags: [
    "microblogging",
    "real-time",
    "news",
    "social-network",
    "messaging",
  ],
  colors: [
    {
      name: "X Black",
      hex: "#000000",
      usage:
        "Primary brand color. Used for the X logo, text, and key UI elements.",
    },
    {
      name: "X White",
      hex: "#FFFFFF",
      usage:
        "Background color. Used for light mode backgrounds and inverted logo.",
    },
    {
      name: "Twitter Blue",
      hex: "#1D9BF0",
      usage:
        "Legacy accent color. Used for links, buttons, verified badges, and interactive elements.",
    },
    {
      name: "Dark Background",
      hex: "#15202B",
      usage: "Dim mode background. Default dark theme background color.",
    },
    {
      name: "Lights Out",
      hex: "#000000",
      usage:
        "Lights Out mode background. Pure black AMOLED-friendly dark theme.",
    },
    {
      name: "Extra Light Gray",
      hex: "#EFF3F4",
      usage:
        "Secondary backgrounds, borders, dividers, and subtle UI elements.",
    },
    {
      name: "Dark Gray",
      hex: "#536471",
      usage: "Secondary text, timestamps, metadata, and muted content.",
    },
    {
      name: "Premium Gold",
      hex: "#E2B719",
      usage: "Premium/Gold subscription tier badge and accents.",
    },
  ],
  typography: [
    {
      name: "Chirp",
      role: "Primary / UI & Body",
      weights: ["400", "500", "700"],
      category: "sans-serif",
      designer: "Grilli Type",
      foundry: "Grilli Type (custom for Twitter)",
      fontUrl: "/brands/x/fonts/chirp-regular.woff2",
    },
    {
      name: "Chirp Bold",
      role: "Headlines & Emphasis",
      weights: ["700"],
      category: "sans-serif",
      designer: "Grilli Type",
      foundry: "Grilli Type (custom for Twitter)",
      fontUrl: "/brands/x/fonts/chirp-bold.woff2",
    },
    {
      name: "Chirp Heavy",
      role: "Display / Marketing",
      weights: ["800"],
      category: "sans-serif",
      designer: "Grilli Type",
      foundry: "Grilli Type (custom for Twitter)",
      fontUrl: "/brands/x/fonts/chirp-heavy.woff2",
    },
  ],
  assets: [
    {
      label: "X Logo — Black",
      src: "/brands/x/x-logo-black.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "X Logo — White",
      src: "/brands/x/x-logo-white.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "X Logo — Blue",
      src: "/brands/x/x-logo-blue.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "X Icon — Black",
      src: "/brands/x/x-icon-black.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "X Icon — White",
      src: "/brands/x/x-icon-white.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "X Icon — Blue",
      src: "/brands/x/x-icon-blue.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Twitter Bird — Blue (Legacy)",
      src: "/brands/x/twitter-bird-blue.svg",
      width: 248,
      height: 204,
      format: "svg",
    },
    {
      label: "Twitter Bird — Black (Legacy)",
      src: "/brands/x/twitter-bird-black.svg",
      width: 248,
      height: 204,
      format: "svg",
    },
    {
      label: "Twitter Bird — White (Legacy)",
      src: "/brands/x/twitter-bird-white.svg",
      width: 248,
      height: 204,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "X Logo — Black",
    src: "/brands/x/x-logo-black.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  thumbnailDark: {
    label: "X Logo — White",
    src: "/brands/x/x-logo-white.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2006,
  headquarters: "San Francisco, California",
  designer: "Martin Grasser (X logo), Douglas Bowman (Twitter bird)",
  lastRebranded: "2023",
  philosophy:
    "X's identity represents a radical departure from Twitter's friendly blue bird — a stark, monochrome X that signals ambition beyond social media. The minimalist mark embraces boldness and universality, designed to anchor an everything-app vision.",
  legal: {
    guidelinesUrl: "https://about.x.com/en/who-we-are/brand-toolkit",
    dos: [
      "Use the official X logo from the brand toolkit",
      "Maintain clear space around the X logo",
      "Use the logo in black on light backgrounds or white on dark backgrounds",
      "Refer to the platform as 'X' in all communications",
    ],
    donts: [
      "Alter, rotate, or distort the X logo in any way",
      "Use the legacy Twitter bird logo for current branding",
      "Change the colors of the X logo outside of approved black and white variants",
      "Add effects, shadows, or embellishments to the logo",
      "Use the X brand to imply partnership or endorsement without authorization",
    ],
  },
}
