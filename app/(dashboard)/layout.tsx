import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import { Navbar } from "@/components/navbar"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "Tiago Cunha",
      url: "https://github.com/Cunhat",
    },
  ],
  creator: "cunhat",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

  icons: {
    icon: "/favicon.ico",
  },
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Navbar />
        </div>
      </header>
      <div className="container flex flex-1">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
