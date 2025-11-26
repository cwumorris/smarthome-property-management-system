// Organization context and utilities for multi-tenancy

import type { Organization } from "./types/organization"

// Get current organization from context (subdomain or custom domain)
export function getCurrentOrganization(): Organization | null {
  if (typeof window === "undefined") return null

  const orgStr = localStorage.getItem("swifthomes_organization")
  if (!orgStr) return null

  try {
    return JSON.parse(orgStr)
  } catch {
    return null
  }
}

// Set organization in context
export function setCurrentOrganization(organization: Organization): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("swifthomes_organization", JSON.stringify(organization))
  }
}

// Clear organization from context
export function clearCurrentOrganization(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("swifthomes_organization")
  }
}

// Extract organization identifier from hostname
export function getOrganizationFromHostname(hostname: string): string | null {
  // For localhost development
  if (hostname.includes("localhost")) {
    // Check for org query parameter or use default
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get("org") || "demo"
  }

  // For production: subdomain.yourdomain.com or custom.domain.com
  const parts = hostname.split(".")

  // If custom domain (2 parts like acme.com)
  if (parts.length === 2) {
    return parts[0]
  }

  // If subdomain (3+ parts like acme.yourdomain.com)
  if (parts.length >= 3) {
    return parts[0]
  }

  return null
}

// Check if user belongs to organization
export function userBelongsToOrganization(userId: string, organizationId: string): boolean {
  // In production, this would be a database check
  // For now, we'll use the user's organization_id from their session
  return true
}
