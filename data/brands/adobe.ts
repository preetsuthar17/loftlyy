import type { Brand } from "@/lib/types"

export const adobe: Brand = {
  slug: "adobe",
  name: "Adobe",
  description:
    "Adobe is a global leader in creative software, digital marketing, and document management solutions. Founded in 1982 in San Jose, California, Adobe's products — including Photoshop, Illustrator, Premiere Pro, and Acrobat — have become industry standards for designers, photographers, filmmakers, and businesses worldwide.",
  url: "https://adobe.com",
  industry: "technology",
  categories: ["technology", "saas", "geometric-logos"],
  tags: ["software", "design", "cloud", "design-tools", "creative"],
  colors: [
    {
      name: "Adobe Red",
      hex: "#FA0F00",
      usage:
        "Primary brand color, used in the Adobe logo and key brand moments. Conveys creativity and energy.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage:
        "Used for typography and high-contrast elements in brand communications.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage:
        "Used for backgrounds, text on dark surfaces, and clean layouts.",
    },
    {
      name: "Dark Gray",
      hex: "#2D2D2D",
      usage:
        "Secondary text color and subtle UI elements across Adobe products.",
    },
  ],
  typography: [
    {
      name: "Adobe Clean",
      role: "Display / Headlines + UI",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Adobe Type Team",
      foundry: "Adobe",
      fontUrl: "/brands/adobe/fonts/adobe-clean-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Adobe Icon — Red",
      src: "/brands/adobe/adobe-icon-red.svg",
      width: 271,
      height: 240,
      format: "svg",
    },
    {
      label: "Adobe Icon — White",
      src: "/brands/adobe/adobe-icon-white.svg",
      width: 271,
      height: 240,
      format: "svg",
    },
    {
      label: "Adobe Icon — Black",
      src: "/brands/adobe/adobe-icon-black.svg",
      width: 271,
      height: 240,
      format: "svg",
    },
    {
      label: "Adobe Logo — Red",
      src: "/brands/adobe/adobe-logo-red.svg",
      width: 1300,
      height: 359,
      format: "svg",
    },
    {
      label: "Adobe Logo — White",
      src: "/brands/adobe/adobe-logo-white.svg",
      width: 1300,
      height: 359,
      format: "svg",
    },
    {
      label: "Adobe Logo — Black",
      src: "/brands/adobe/adobe-logo-black.svg",
      width: 1300,
      height: 359,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Adobe Icon — Red",
    src: "/brands/adobe/adobe-icon-red.svg",
    width: 271,
    height: 240,
    format: "svg",
  },
  thumbnailDark: {
    label: "Adobe Icon — White",
    src: "/brands/adobe/adobe-icon-white.svg",
    width: 271,
    height: 240,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 1982,
  headquarters: "San Jose, California",
  designer: "Marva Warnock",
  lastRebranded: "2020",
  philosophy:
    "Bold, creative, and empowering. Adobe's iconic red 'A' symbolizes the creative peak — a geometric mark that represents the tools and platform that empower millions of creators worldwide. The clean, modern identity reflects Adobe's evolution from desktop publishing pioneer to cloud-first creative platform.",
  legal: {
    guidelinesUrl: "https://www.adobe.com/legal/permissions/trademarks.html",
    dos: [
      "Use the Adobe logo in its official red (#FA0F00) on white or black backgrounds",
      "Maintain clear space around the logo",
      "Use official brand assets from Adobe's brand guidelines",
    ],
    donts: [
      "Alter the Adobe logo colors, proportions, or orientation",
      "Place the Adobe logo on busy or low-contrast backgrounds",
      "Use the Adobe name or logo to imply endorsement without written permission",
      "Combine the Adobe logo with other logos or graphics",
    ],
  },
}
