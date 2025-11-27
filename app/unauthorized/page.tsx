"use client"

import { AlertTriangle, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { getUser } from "@/lib/auth"
import { useEffect, useState } from "react"

export default function UnauthorizedPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  const handleGoBack = () => {
    router.back()
  }

  const handleGoHome = () => {
    if (user) {
      // Redirect based on user role
      const roleRedirects: Record<string, string> = {
        super_admin: "/super-admin/dashboard",
        property_admin: "/admin/dashboard",
        tenant: "/tenant/dashboard",
        service_provider: "/service-provider/dashboard",
        concierge: "/concierge/dashboard",
        maintenance_supervisor: "/admin/tickets",
        finance: "/admin/reports",
        support: "/admin/tickets",
      }
      router.push(roleRedirects[user.role] || "/")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Access Denied</h1>
              <p className="text-muted-foreground">
                You don't have permission to access this page or the page requires authentication.
              </p>
            </div>

            {!user && (
              <div className="bg-muted/50 p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  If you believe this is a mistake, please log in to access this resource.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={handleGoBack} variant="outline" className="flex-1 bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button onClick={handleGoHome} className="flex-1">
                <Home className="mr-2 h-4 w-4" />
                {user ? "Go to Dashboard" : "Go Home"}
              </Button>
            </div>

            {!user && (
              <div className="pt-4 border-t">
                <Button onClick={() => router.push("/auth/login")} variant="link" className="text-sm">
                  Sign in to continue
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
