"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Organization } from "@/lib/types/organization"
import { getCurrentOrganization, getOrganizationFromHostname, setCurrentOrganization } from "@/lib/organization"
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data"

interface OrganizationContextType {
  organization: Organization | null
  loading: boolean
  switchOrganization: (org: Organization) => void
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get organization from hostname or context
    const loadOrganization = () => {
      // First check if we have org in storage
      let org = getCurrentOrganization()

      // If not, try to determine from hostname
      if (!org) {
        const hostname = typeof window !== "undefined" ? window.location.hostname : ""
        const orgSlug = getOrganizationFromHostname(hostname)

        if (orgSlug) {
          // In production, this would be an API call
          // For now, find from mock data
          org = MOCK_ORGANIZATIONS.find((o) => o.slug === orgSlug || o.domain === hostname) || MOCK_ORGANIZATIONS[0]

          if (org) {
            setCurrentOrganization(org)
          }
        }
      }

      setOrganization(org || MOCK_ORGANIZATIONS[0])
      setLoading(false)
    }

    loadOrganization()
  }, [])

  const switchOrganization = (org: Organization) => {
    setCurrentOrganization(org)
    setOrganization(org)
  }

  return (
    <OrganizationContext.Provider value={{ organization, loading, switchOrganization }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error("useOrganization must be used within OrganizationProvider")
  }
  return context
}
