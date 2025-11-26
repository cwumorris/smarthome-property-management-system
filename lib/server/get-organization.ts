import { headers } from "next/headers"
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data"
import type { Organization } from "@/lib/types/organization"

// Server-side utility to get organization from request headers
export async function getOrganizationFromHeaders(): Promise<Organization | null> {
  const headersList = await headers()
  const orgSlug = headersList.get("x-organization-slug")
  const hostname = headersList.get("x-hostname")

  if (!orgSlug) {
    return MOCK_ORGANIZATIONS[0] // default organization
  }

  if (orgSlug.startsWith("custom:")) {
    const customDomain = orgSlug.replace("custom:", "")
    // Find organization by custom domain
    const organization = MOCK_ORGANIZATIONS.find((org) => org.domain === customDomain && org.domain_type === "custom")
    return organization || MOCK_ORGANIZATIONS[0]
  }

  // Find organization by slug (subdomain-based)
  const organization = MOCK_ORGANIZATIONS.find((org) => org.slug === orgSlug && org.domain_type === "subdomain")

  return organization || MOCK_ORGANIZATIONS[0]
}

// Get organization ID from server context
export async function getOrganizationId(): Promise<string> {
  const org = await getOrganizationFromHeaders()
  return org?.id || MOCK_ORGANIZATIONS[0].id
}
