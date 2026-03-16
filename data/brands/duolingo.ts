import type { Brand } from "@/lib/types"

export const duolingo: Brand = {
  slug: "duolingo",
  name: "Duolingo",
  description:
    "Duolingo is a free language-learning platform offering over 100 courses across 40+ languages, making education universally accessible through gamified lessons and streaks. Founded in 2011 by Luis von Ahn and Severin Hacker, it has grown into the world's most popular language-learning app with hundreds of millions of learners. Duolingo's mission is to develop the best education in the world and make it available to everyone.",
  url: "https://duolingo.com",
  industry: "saas",
  categories: ["saas", "technology"],
  tags: [
    "education",
    "language-learning",
    "gamification",
    "mobile",
    "freemium",
  ],
  colors: [
    {
      name: "Duo Green",
      hex: "#58CC02",
      usage:
        "Primary brand color. Used in the app icon, logo, CTAs, and core interactive elements across all platforms.",
    },
    {
      name: "Super Yellow",
      hex: "#FFC200",
      usage:
        "Accent color for Super Duolingo premium tier, highlights, and attention-grabbing UI elements.",
    },
    {
      name: "Hearts Red",
      hex: "#FF4B4B",
      usage:
        "Error states, hearts/lives indicator, and streak-related danger indicators.",
    },
    {
      name: "Bird Blue",
      hex: "#1CB0F6",
      usage:
        "Secondary accent for tips, hints, and informational UI components.",
    },
    {
      name: "Macaw Purple",
      hex: "#CE82FF",
      usage: "Premium/legendary content indicators and achievement badges.",
    },
    {
      name: "Eel Dark",
      hex: "#4B4B4B",
      usage: "Primary text and dark UI elements on light backgrounds.",
    },
    {
      name: "Swan White",
      hex: "#FFFFFF",
      usage: "Background and reversed text on colored surfaces.",
    },
  ],
  typography: [
    {
      name: "DIN Round",
      role: "Primary Brand Typeface",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Linotype Design Studio",
      foundry: "Linotype (custom rounded variant)",
    },
    {
      name: "Nunito",
      role: "Fallback / Web Alternative",
      weights: ["400", "600", "700", "800"],
      category: "sans-serif",
      designer: "Vernon Adams",
      foundry: "Google Fonts",
    },
  ],
  assets: [
    {
      label: "Duo Owl Icon",
      src: "/brands/duolingo/duolingo-owl.svg",
      width: 250,
      height: 250,
      format: "svg",
    },
    {
      label: "Wordmark (Green)",
      src: "/brands/duolingo/duolingo-wordmark-green.svg",
      width: 1000,
      height: 235,
      format: "svg",
    },
    {
      label: "Wordmark (Dark)",
      src: "/brands/duolingo/duolingo-wordmark-dark.svg",
      width: 1000,
      height: 235,
      format: "svg",
    },
    {
      label: "Wordmark (White)",
      src: "/brands/duolingo/duolingo-wordmark-white.svg",
      width: 1000,
      height: 235,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Duo Owl Icon",
    src: "/brands/duolingo/duolingo-owl.svg",
    width: 250,
    height: 250,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 2011,
  headquarters: "Pittsburgh, PA",
  designer: "Duolingo Design Team",
  lastRebranded: "2022",
  philosophy:
    "Playful and purposeful, Duolingo's identity centers on the iconic green Duo owl — a symbol of approachable learning that balances gamified fun with genuine educational impact. The vibrant green and rounded forms communicate friendliness and accessibility, reinforcing the belief that learning a language should feel like a game, not a chore.",
  legal: {
    guidelinesUrl: "https://duolingo.com/terms",
    dos: [
      "Use the official Duo owl logo in its approved color variants (green, black, or white).",
      "Maintain adequate clear space around the logo equal to the width of the owl's eye.",
      "Use Duo Green (#58CC02) as the primary brand color in co-branded materials.",
    ],
    donts: [
      "Alter, distort, or animate the Duo mascot without permission from Duolingo.",
      "Use the Duolingo name or logo to imply endorsement or official partnership.",
      "Reproduce or modify Duolingo's branding assets in a way that misrepresents the brand.",
      "Use the mascot in contexts that contradict Duolingo's values of inclusion and accessibility.",
    ],
  },
}
