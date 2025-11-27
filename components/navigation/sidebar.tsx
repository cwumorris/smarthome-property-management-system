"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  Wrench,
  DollarSign,
  Package,
  Settings,
  Wifi,
  Recycle,
  Zap,
  FileText,
  ChevronLeft,
  LogOut,
  Menu,
  Home,
  CreditCard,
  Mail,
  BarChart3,
  CheckSquare,
  UserPlus,
  Bell,
  Calendar,
  Camera,
  TrendingUp,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { useOrganization } from "@/components/organization-provider"
import { OrganizationSwitcher } from "@/components/organization-switcher"

const adminRoutes = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Buildings", href: "/admin/buildings", icon: Building2 },
  { name: "HOA Billing", href: "/admin/hoa-billing", icon: DollarSign }, // Added HOA Billing route for admins
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Tickets", href: "/admin/tickets", icon: Wrench },
  { name: "Mailroom", href: "/admin/mailroom", icon: Mail },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

const tenantRoutes = [
  { name: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
  { name: "Payments", href: "/tenant/payments", icon: CreditCard },
  { name: "Tickets", href: "/tenant/tickets", icon: Wrench },
  { name: "Packages", href: "/tenant/packages", icon: Package },
  { name: "Subscriptions", href: "/tenant/subscriptions", icon: Wifi },
  { name: "Smart Home", href: "/tenant/smart-home", icon: Zap },
  { name: "Home Assistant", href: "/tenant/home-assistant", icon: Home },
  { name: "Virtual Tours", href: "/tenant/virtual-tours", icon: Camera },
  { name: "Credit Score", href: "/tenant/credit-score", icon: TrendingUp },
  { name: "Maintenance", href: "/tenant/predictive-maintenance", icon: Wrench },
  { name: "Solar Energy", href: "/tenant/solar-energy", icon: Sun },
  { name: "Waste", href: "/tenant/waste", icon: Recycle },
  { name: "Community", href: "/tenant/community", icon: Users },
]

const conciergeRoutes = [
  { name: "Dashboard", href: "/concierge/dashboard", icon: LayoutDashboard },
  { name: "Mailroom", href: "/admin/mailroom", icon: Package },
  { name: "Visitors", href: "/concierge/visitors", icon: UserPlus },
  { name: "Notifications", href: "/concierge/notifications", icon: Bell },
  { name: "Schedule", href: "/concierge/schedule", icon: Calendar },
]

const serviceProviderRoutes = [
  { name: "Dashboard", href: "/service-provider/dashboard", icon: LayoutDashboard },
  { name: "Jobs", href: "/service-provider/jobs", icon: CheckSquare },
  { name: "Earnings", href: "/service-provider/earnings", icon: DollarSign },
  { name: "Settings", href: "/service-provider/settings", icon: Settings },
]

const superAdminRoutes = [
  { name: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard },
  { name: "Organizations", href: "/super-admin/organizations", icon: Building2 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = getCurrentUser()
  const { organization } = useOrganization()

  if (!user) return null

  const routes =
    user.role === "super_admin"
      ? superAdminRoutes
      : user.role === "tenant"
        ? tenantRoutes
        : user.role === "service_provider"
          ? serviceProviderRoutes
          : user.role === "concierge"
            ? conciergeRoutes
            : adminRoutes

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo/Header */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          {!collapsed && <span className="font-bold text-lg">Swifthomes</span>}
        </Link>
        {!collapsed && <ThemeToggle />}
      </div>

      {!collapsed && user.role !== "tenant" && user.role !== "service_provider" && organization && (
        <div className="border-b p-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Organization</p>
            <OrganizationSwitcher />
          </div>
        </div>
      )}

      {/* User Info */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold">{user.name.charAt(0)}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role.replace("_", " ")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {routes.map((route) => {
          const isActive = pathname === route.href || pathname.startsWith(route.href + "/")
          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <route.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{route.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-3">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-3" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      {!mobileOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 rounded-full border bg-background"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-0 z-30 h-screen border-r bg-background transition-all duration-300",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
