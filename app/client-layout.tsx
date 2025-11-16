"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navigation/navbar"
import { Sidebar } from "@/components/navigation/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { FABChatbot } from "@/components/fab-chatbot"
import { usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const user = getCurrentUser()

  const isAuthPage = pathname?.startsWith("/auth")
  const isPublicPage = pathname === "/" || pathname?.startsWith("/public") || pathname?.startsWith("/presentation")
  const showSidebar = user && !isAuthPage && !isPublicPage
  const isHomePage = pathname === "/"

  return (
    <>
      {showSidebar ? (
        <>
          <Sidebar />
          <main className="lg:pl-64">{children}</main>
        </>
      ) : (
        <>
          {!isAuthPage && !isHomePage && <Navbar />}
          {children}
        </>
      )}
      <FABChatbot />
      <Toaster />
      <Analytics />
    </>
  )
}

export { ClientLayout }
export default ClientLayout
