"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, User, LogOut, Menu, X, Presentation } from 'lucide-react'
import { getUser, logout } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const user = getUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Building2 className="h-6 w-6 text-primary" />
            SLOANE SQUARE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  href={
                    user.role === "tenant"
                      ? "/tenant/dashboard"
                      : user.role === "service_provider"
                        ? "/service-provider/dashboard"
                        : user.role === "vendor"
                          ? "/vendor/dashboard"
                          : "/admin/dashboard"
                  }
                  className="text-sm hover:text-primary"
                >
                  Dashboard
                </Link>
                {user.role !== "tenant" && user.role !== "service_provider" && (
                  <Link href="/admin/buildings" className="text-sm hover:text-primary">
                    Buildings
                  </Link>
                )}
                <Link href="/public" className="text-sm hover:text-primary">
                  Browse Properties
                </Link>
                <Link href="/presentation" className="text-sm hover:text-primary flex items-center gap-1">
                  <Presentation className="h-4 w-4" />
                  Presentation
                </Link>
              </>
            ) : (
              <>
                <Link href="/public" className="text-sm hover:text-primary">
                  Browse Properties
                </Link>
                <Link href="/presentation" className="text-sm hover:text-primary flex items-center gap-1">
                  <Presentation className="h-4 w-4" />
                  Presentation
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => router.push("/auth/login")}>
                  Login
                </Button>
                <Button size="sm" onClick={() => router.push("/auth/register")}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {user ? (
              <>
                <Link
                  href={
                    user.role === "tenant"
                      ? "/tenant/dashboard"
                      : user.role === "service_provider"
                        ? "/service-provider/dashboard"
                        : user.role === "vendor"
                          ? "/vendor/dashboard"
                          : "/admin/dashboard"
                  }
                  className="block px-4 py-2 hover:bg-accent rounded-md"
                >
                  Dashboard
                </Link>
                {user.role !== "tenant" && user.role !== "service_provider" && (
                  <Link href="/admin/buildings" className="block px-4 py-2 hover:bg-accent rounded-md">
                    Buildings
                  </Link>
                )}
                <Link href="/public" className="block px-4 py-2 hover:bg-accent rounded-md">
                  Browse Properties
                </Link>
                <Link href="/presentation" className="block px-4 py-2 hover:bg-accent rounded-md">
                  Presentation
                </Link>
                <div className="px-4 py-2">
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/public" className="block px-4 py-2 hover:bg-accent rounded-md">
                  Browse Properties
                </Link>
                <Link href="/presentation" className="block px-4 py-2 hover:bg-accent rounded-md">
                  Presentation
                </Link>
                <div className="px-4 py-2 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </Button>
                  <Button className="w-full" onClick={() => router.push("/auth/register")}>
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
