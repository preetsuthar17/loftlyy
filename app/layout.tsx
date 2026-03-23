import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeHotkey } from "@/components/theme-hotkey"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", fontSans.variable, fontMono.variable)}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeHotkey />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
