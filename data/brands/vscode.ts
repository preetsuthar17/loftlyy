import type { Brand } from "@/lib/types"

export const vscode: Brand = {
  slug: "vscode",
  name: "Visual Studio Code",
  description:
    "Visual Studio Code is a free, open-source code editor by Microsoft that runs on Windows, macOS, and Linux. With built-in debugging, Git integration, and a vast extension ecosystem, it has become one of the most popular development environments worldwide.",
  url: "https://code.visualstudio.com",
  industry: "technology",
  categories: ["technology", "saas", "geometric-logos"],
  tags: [
    "developer-tools",
    "code-editor",
    "open-source",
    "microsoft",
    "productivity",
  ],
  colors: [
    {
      name: "VS Code Blue",
      hex: "#007ACC",
      usage: "Primary brand color, used in the logo and UI accents.",
    },
    {
      name: "VS Code Primary",
      hex: "#0098FF",
      usage: "Bright blue for primary actions and highlights.",
    },
    {
      name: "VS Code Dark Blue",
      hex: "#0065A9",
      usage: "Dark blue for depth and contrast in the icon.",
    },
    {
      name: "VS Code Light Blue",
      hex: "#1F9CF0",
      usage: "Light blue accent used in the icon sidebar element.",
    },
    {
      name: "VS Code Light",
      hex: "#F3F3F3",
      usage: "Light theme background color.",
    },
    {
      name: "VS Code Dark",
      hex: "#1E1E1E",
      usage: "Dark theme background, the signature editor color.",
    },
  ],
  typography: [
    {
      name: "Segoe UI",
      role: "Body / UI",
      weights: ["400", "600", "700"],
      category: "sans-serif",
      designer: "Microsoft Typography",
      foundry: "Microsoft",
      fontUrl: "/brands/vscode/fonts/segoe-ui-regular.woff2",
    },
    {
      name: "Source Code Pro",
      role: "Code / Technical",
      weights: ["400", "500", "700"],
      category: "monospace",
      designer: "Paul D. Hunt",
      foundry: "Adobe",
      fontUrl: "/brands/vscode/fonts/source-code-pro-regular.woff2",
    },
  ],
  assets: [
    {
      label: "VS Code Icon — Color",
      src: "/brands/vscode/vscode-icon-color.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "VS Code Icon — Black",
      src: "/brands/vscode/vscode-icon-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "VS Code Icon — White",
      src: "/brands/vscode/vscode-icon-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "VS Code Icon — Color",
    src: "/brands/vscode/vscode-icon-color.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "VS Code Icon — White",
    src: "/brands/vscode/vscode-icon-white.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2015,
  headquarters: "Redmond, WA",
  designer: "Microsoft Design Team",
  philosophy:
    "Open, extensible, and developer-first. VS Code's identity centers on its signature blue bracket icon — a symbol of code editing that is instantly recognizable, conveying both technical precision and approachability.",
  legal: {
    guidelinesUrl: "https://code.visualstudio.com/brand",
    dos: [
      "Use official VS Code icon files from the brand page",
      "Maintain 25% clear space around the icon edges",
      "Use the full name 'Visual Studio Code' on first reference",
      "Use the white icon variant when contrast is insufficient",
    ],
    donts: [
      "Use the icon to promote your own product or service",
      "Integrate the VS Code icon into your own logo",
      "Modify, redraw, or stretch the icon",
      "Add text or background elements to the icon",
      "Use the Insiders (green) or Exploration (orange) icons",
    ],
  },
}
