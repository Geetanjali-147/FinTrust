import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LoanFlow - Simplified Loan Approvals",
  description: "AI-powered credit score management and loan approval platform",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { ThemeProvider } from "@/components/theme-provider"

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased palette-vibrant`}>
        <script>
          {`document.addEventListener('DOMContentLoaded', function() {
            const savedPalette = localStorage.getItem('selectedPalette');
            if (savedPalette) {
              // Remove the default palette-vibrant class and add the saved one
              document.body.classList.remove('palette-vibrant');
              document.body.classList.remove('palette-sunset', 'palette-ocean', 'palette-forest', 'palette-neon', 'palette-rainbow', 'palette-mystic', 'palette-tropical', 'palette-cosmic');
              document.body.classList.add('palette-' + savedPalette);
            } else {
              // Default palette-vibrant is already applied by server
            }
          });`}
        </script>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
