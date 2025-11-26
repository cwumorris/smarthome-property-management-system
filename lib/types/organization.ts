// Organization (Company/Property Management Company) types for multi-tenancy

export interface Organization {
  id: string
  name: string
  slug: string // subdomain identifier (e.g., "acme" for acme.swifthomes.com)
  domain?: string // custom domain (e.g., "properties.acme.com")
  domain_type: "subdomain" | "custom" // indicates which domain type is primary
  email: string
  phone: string
  address: string
  logo?: string
  primary_color?: string
  secondary_color?: string
  timezone: string
  currency: string
  plan: "free" | "starter" | "professional" | "enterprise"
  status: "active" | "suspended" | "trial"
  trial_ends_at?: string
  created_at: string
  settings: OrganizationSettings
}

export interface OrganizationSettings {
  branding: {
    logo_url?: string
    favicon_url?: string
    primary_color: string
    secondary_color: string
    custom_css?: string
  }
  features: {
    smart_home: boolean
    virtual_tours: boolean
    solar_energy: boolean
    predictive_maintenance: boolean
    concierge_services: boolean
    waste_management: boolean
  }
  notifications: {
    email_enabled: boolean
    sms_enabled: boolean
    whatsapp_enabled: boolean
    push_enabled: boolean
  }
  integrations: {
    payment_gateway?: string
    sms_provider?: string
    email_provider?: string
  }
}

export interface OrganizationInvite {
  id: string
  organization_id: string
  email: string
  role: string
  status: "pending" | "accepted" | "expired"
  invited_by: string
  created_at: string
  expires_at: string
}
