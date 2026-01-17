import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
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
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(262, 83%, 58%)",
          colorBackground: "hsl(224, 71%, 4%)",
          colorText: "hsl(210, 20%, 98%)",
          colorInputBackground: "hsl(215, 28%, 17%)",
          colorInputText: "hsl(210, 20%, 98%)",
        },
        elements: {
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
          card: "bg-card border border-border",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "bg-secondary text-secondary-foreground border border-border",
          formFieldLabel: "text-foreground",
          formFieldInput: "bg-secondary border border-border text-foreground",
          footerActionLink: "text-primary hover:text-primary/80",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans antialiased palette-vibrant`}>
          <script
            dangerouslySetInnerHTML={{
              __html: `document.addEventListener('DOMContentLoaded', function() {
              const savedPalette = localStorage.getItem('selectedPalette');
              if (savedPalette) {
                document.body.classList.remove('palette-vibrant');
                document.body.classList.remove('palette-sunset', 'palette-ocean', 'palette-forest', 'palette-neon', 'palette-rainbow', 'palette-mystic', 'palette-tropical', 'palette-cosmic');
                document.body.classList.add('palette-' + savedPalette);
              }
            });`,
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
