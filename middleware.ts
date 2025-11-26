import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Multi-tenant middleware for domain/subdomain routing
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hostname = request.headers.get("host") || ""

  // Skip middleware for static files, API routes, and special Next.js routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // files with extensions
  ) {
    return NextResponse.next()
  }

  // Extract organization identifier from hostname
  const orgIdentifier = getOrganizationFromHostname(hostname)

  // Clone the URL for rewriting
  const url = request.nextUrl.clone()

  // Add organization identifier to headers for server components
  const response = NextResponse.next()
  response.headers.set("x-organization-slug", orgIdentifier || "")
  response.headers.set("x-hostname", hostname)

  // For development: Add org as query param if not present
  if (hostname.includes("localhost") && orgIdentifier && !pathname.startsWith("/auth")) {
    const searchParams = new URLSearchParams(search)
    if (!searchParams.has("org")) {
      searchParams.set("org", orgIdentifier)
      url.search = searchParams.toString()
      return NextResponse.rewrite(url)
    }
  }

  return response
}

function getOrganizationFromHostname(hostname: string): string | null {
  // Development: localhost with ?org=slug or default to 'demo'
  if (hostname.includes("localhost")) {
    return "swifthomes" // default organization for development
  }

  // Production patterns:
  const parts = hostname.split(".")

  // Pattern 1: subdomain.swifthomes.com (subdomain-based)
  if (parts.length >= 3 && (parts[1] === "swifthomes" || parts.slice(1).join(".") === "swifthomes.com")) {
    const subdomain = parts[0]
    // Ignore common subdomains
    if (!["www", "app", "api", "admin"].includes(subdomain)) {
      return subdomain
    }
  }

  // Pattern 2: custom domain (e.g., properties.acme.com, portal.mycompany.com)
  // For custom domains, we'll look up the org by full hostname in the database
  // Return the full hostname as identifier for custom domain lookup
  if (parts.length >= 2) {
    return `custom:${hostname}` // prefix with 'custom:' to indicate custom domain lookup needed
  }

  return null
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
