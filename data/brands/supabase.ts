import type { Brand } from "@/lib/types"

export const supabase: Brand = {
  slug: "supabase",
  name: "Supabase",
  description:
    "Supabase is an open-source Firebase alternative that provides a full suite of backend tools — including a Postgres database, authentication, instant APIs, edge functions, and real-time subscriptions. Built for developers, it enables teams to go from idea to production in a weekend and scale to millions of users.",
  url: "https://supabase.com",
  industry: "saas",
  categories: ["saas", "technology", "minimal-logos"],
  tags: [
    "open-source",
    "developer-tools",
    "database",
    "backend-as-a-service",
    "api",
  ],
  colors: [
    {
      name: "Supabase Green",
      hex: "#3ECF8E",
      usage: "Primary brand color, logo, CTAs, key accents.",
    },
    {
      name: "Emerald Dark",
      hex: "#249361",
      usage: "Gradient start, depth in logo, dark accents.",
    },
    {
      name: "Brand Dark",
      hex: "#1F1F1F",
      usage: "Primary text, dark backgrounds, headings.",
    },
    {
      name: "Background Dark",
      hex: "#171717",
      usage: "Dark mode backgrounds, sections.",
    },
    {
      name: "Foreground Light",
      hex: "#EDEDED",
      usage: "Light text on dark backgrounds.",
    },
    {
      name: "Surface",
      hex: "#F8F9FA",
      usage: "Light backgrounds, cards, content areas.",
    },
  ],
  typography: [
    {
      name: "Circular",
      role: "Primary / Headings & Body",
      weights: ["400", "500"],
      category: "sans-serif",
      designer: "Laurenz Brunner",
      foundry: "Lineto",
      fontUrl: "/brands/supabase/fonts/custom-font-book.woff2",
    },
    {
      name: "Source Code Pro",
      role: "Code / Monospace",
      weights: ["400", "500"],
      category: "monospace",
      designer: "Paul D. Hunt",
      foundry: "Adobe",
      fontUrl: "/brands/supabase/fonts/source-code-pro-medium.woff2",
    },
  ],
  assets: [
    {
      label: "Supabase Logo — Brand",
      src: "/brands/supabase/supabase-icon-brand.svg",
      width: 128,
      height: 133,
      format: "svg",
    },
    {
      label: "Supabase Logo — Black",
      src: "/brands/supabase/supabase-icon-black.svg",
      width: 128,
      height: 133,
      format: "svg",
    },
    {
      label: "Supabase Logo — White",
      src: "/brands/supabase/supabase-icon-white.svg",
      width: 128,
      height: 133,
      format: "svg",
    },
    {
      label: "Supabase Wordmark — Dark",
      src: "/brands/supabase/supabase-wordmark-dark.svg",
      width: 581,
      height: 113,
      format: "svg",
    },
    {
      label: "Supabase Wordmark — White",
      src: "/brands/supabase/supabase-wordmark-white.svg",
      width: 581,
      height: 113,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Supabase Logo — Brand",
    src: "/brands/supabase/supabase-icon-brand.svg",
    width: 128,
    height: 133,
    format: "svg",
  },
  thumbnailDark: {
    label: "Supabase Logo — White",
    src: "/brands/supabase/supabase-icon-white.svg",
    width: 128,
    height: 133,
    format: "svg",
  },
  dateAdded: "2026-03-25",
  founded: 2020,
  headquarters: "Singapore",
  designer: "Supabase Design Team",
  lastRebranded: "2022",
  philosophy:
    "Supabase's brand identity embraces the open-source ethos with a vibrant green palette that evokes growth and developer empowerment. The distinctive lightning-bolt-inspired logomark communicates speed and real-time capabilities, while clean typography reflects the platform's developer-first simplicity.",
  legal: {
    guidelinesUrl: "https://supabase.com/brand-assets",
    dos: [
      "Use official Supabase brand assets from the brand resources page",
      "Maintain clear space around the Supabase logo",
      "Use the approved 'Connect Supabase' button for integrations",
      "Refer to the company as 'Supabase' (capitalized) in text",
    ],
    donts: [
      "Modify the Supabase logo or wordmark proportions",
      "Change the wordmark color from the official specifications",
      "Use the Supabase brand to imply partnership without authorization",
      "Repurpose brand elements for any purpose other than representing Supabase Inc.",
    ],
  },
}
