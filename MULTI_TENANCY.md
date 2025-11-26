# Multi-Tenancy Implementation Guide

## Overview

This application is built as a multi-tenant SaaS platform where multiple property management companies can use the system with their own isolated data and custom domains.

## Architecture

### Tenant Identification

The system supports multiple ways to identify tenants (organizations):

1. **Subdomain-based**: `acme.yourdomain.com`, `premium.yourdomain.com`
2. **Custom domain**: `properties.acmecompany.com`
3. **Development mode**: `localhost:3000?org=acme`

### Data Isolation

All data entities include an `organization_id` field to ensure complete data isolation:

\`\`\`typescript
interface Building {
  id: string
  organization_id: string // Links to organization
  name: string
  // ... other fields
}
\`\`\`

### Middleware

The `middleware.ts` file handles:
- Extracting organization identifier from hostname
- Setting headers for server components
- Routing requests to the correct tenant context

### Organization Context

The `OrganizationProvider` component provides organization context throughout the application:

\`\`\`tsx
import { useOrganization } from '@/components/organization-provider'

function MyComponent() {
  const { organization, loading } = useOrganization()
  // Use organization data
}
\`\`\`

## Server-Side Organization Access

For server components and API routes:

\`\`\`typescript
import { getOrganizationFromHeaders } from '@/lib/server/get-organization'

export default async function Page() {
  const organization = await getOrganizationFromHeaders()
  // Use organization
}
\`\`\`

## Filtering Data by Organization

Use utility functions to filter data:

\`\`\`typescript
import { filterByOrganization } from '@/lib/utils/tenant-filter'
import { MOCK_BUILDINGS } from '@/lib/mock-data'

const orgBuildings = filterByOrganization(MOCK_BUILDINGS, organization.id)
\`\`\`

## Development Setup

### Testing Multiple Organizations

1. **Using Query Parameters**:
   - `http://localhost:3000?org=sloane`
   - `http://localhost:3000?org=premium`

2. **Simulating Subdomains**:
   Edit your `/etc/hosts` file:
   \`\`\`
   127.0.0.1 sloane.localhost
   127.0.0.1 premium.localhost
   \`\`\`

## Production Deployment

### DNS Configuration

1. **Main Domain**: Point `yourdomain.com` to your server
2. **Wildcard Subdomain**: Add a wildcard DNS record `*.yourdomain.com`
3. **Custom Domains**: Add CNAME records for custom domains pointing to your server

### Environment Variables

\`\`\`env
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
NEXT_PUBLIC_PROTOCOL=https
\`\`\`

## Adding New Organizations

Organizations are managed through the Super Admin portal at `/super-admin/organizations`.

### Organization Structure

\`\`\`typescript
interface Organization {
  id: string
  name: string
  slug: string // For subdomain
  domain?: string // Optional custom domain
  settings: OrganizationSettings
  // ... other fields
}
\`\`\`

## Security Considerations

1. **Data Isolation**: Always filter queries by `organization_id`
2. **User Validation**: Verify user belongs to organization
3. **API Routes**: Check organization context in all API endpoints
4. **Cross-Tenant Access**: Implement strict access controls

## Best Practices

1. **Always use organization context** when querying data
2. **Validate organization access** before showing sensitive data
3. **Use middleware headers** for server-side organization detection
4. **Implement proper error handling** for invalid organizations
5. **Test with multiple organizations** during development

## Migration from Single-Tenant

If migrating from single-tenant:

1. Add `organization_id` to all data models
2. Update queries to filter by organization
3. Add middleware for domain routing
4. Wrap app in `OrganizationProvider`
5. Update authentication to include organization
6. Test data isolation thoroughly
