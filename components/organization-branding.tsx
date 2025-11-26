"use client"

import { useEffect } from "react"
import { useOrganization } from "./organization-provider"

export function OrganizationBranding() {
  const { organization, loading } = useOrganization()

  useEffect(() => {
    if (loading || !organization) return

    const { branding } = organization.settings

    const root = document.documentElement

    if (branding.primary_color) {
      const primaryColor = branding.primary_color
      root.style.setProperty("--primary", primaryColor)
    }

    if (branding.secondary_color) {
      const secondaryColor = branding.secondary_color
      root.style.setProperty("--secondary", secondaryColor)
    }

    if (branding.favicon_url) {
      const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']")
      if (favicon) {
        favicon.href = branding.favicon_url
      }
    }

    if (branding.custom_css) {
      const style = document.createElement("style")
      style.textContent = branding.custom_css
      style.id = "organization-custom-css"
      document.head.appendChild(style)

      return () => {
        const existingStyle = document.getElementById("organization-custom-css")
        if (existingStyle) {
          existingStyle.remove()
        }
      }
    }
  }, [organization, loading])

  return null
}
