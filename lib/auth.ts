// Simulated authentication utilities

export interface User {
  email: string
  name: string
  role:
    | "super_admin"
    | "property_admin"
    | "tenant"
    | "service_provider"
    | "concierge"
    | "maintenance_supervisor"
    | "finance"
    | "support"
  authenticated: boolean
  oauth_provider?: string
  phone?: string
  building_id?: string
  unit_id?: string
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("sloane_user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function getCurrentUser(): User | null {
  return getUser()
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sloane_user")
    window.location.href = "/auth/login"
  }
}

export function requireAuth(allowedRoles?: string[]) {
  const user = getUser()

  if (!user || !user.authenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login"
    }
    return null
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (typeof window !== "undefined") {
      window.location.href = "/unauthorized"
    }
    return null
  }

  return user
}

// Permissions helper
export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false

  const rolePermissions: Record<string, string[]> = {
    super_admin: ["*"],
    property_admin: ["manage_buildings", "manage_tenants", "view_reports", "manage_vendors", "manage_billing"],
    maintenance_supervisor: ["manage_tickets", "assign_vendors", "view_inventory"],
    concierge: ["manage_packages", "view_tenants", "log_visitors"],
    tenant: ["view_own_data", "pay_rent", "submit_ticket", "view_packages"],
    service_provider: ["view_assigned_jobs", "update_job_status"],
    finance: ["view_reports", "manage_billing", "view_payments"],
    support: ["view_tickets", "communicate_tenants"],
  }

  const permissions = rolePermissions[user.role] || []
  return permissions.includes("*") || permissions.includes(permission)
}
