"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Chrome, Mail, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Simulated OAuth providers
const OAUTH_PROVIDERS = [
  { name: "Google", icon: Chrome, color: "bg-red-500 hover:bg-red-600" },
  { name: "Microsoft", icon: Mail, color: "bg-blue-500 hover:bg-blue-600" },
  { name: "TikTok", icon: Building2, color: "bg-black hover:bg-gray-800" },
  {
    name: "Instagram",
    icon: Building2,
    color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  },
]

// Pre-configured demo users
const DEMO_USERS = {
  "admin@swifthomes.com": { password: "admin123", role: "super_admin", name: "Super Admin" },
  "property@swifthomes.com": { password: "property123", role: "property_admin", name: "Property Manager" },
  "tenant@swifthomes.com": { password: "tenant123", role: "tenant", name: "John Tenant" },
  "service@swifthomes.com": { password: "service123", role: "service_provider", name: "Fix-It Services" },
  "concierge@swifthomes.com": { password: "concierge123", role: "concierge", name: "Jane Concierge" },
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setShowRegistrationSuccess(true)
      setTimeout(() => setShowRegistrationSuccess(false), 5000)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    setTimeout(() => {
      // First check demo users
      const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS]

      if (demoUser && demoUser.password === password) {
        localStorage.setItem(
          "swifthomes_user",
          JSON.stringify({
            email,
            role: demoUser.role,
            name: demoUser.name,
            authenticated: true,
          }),
        )
        redirectByRole(demoUser.role)
        return
      }

      const registeredUsersStr = localStorage.getItem("swifthomes_registered_users")
      if (registeredUsersStr) {
        const registeredUsers = JSON.parse(registeredUsersStr)
        const registeredUser = registeredUsers[email]

        if (registeredUser && registeredUser.password === password) {
          localStorage.setItem(
            "swifthomes_user",
            JSON.stringify({
              email,
              role: registeredUser.role,
              name: registeredUser.name,
              phone: registeredUser.phone,
              authenticated: true,
            }),
          )
          redirectByRole(registeredUser.role)
          return
        }
      }

      // If neither matched, show error
      setError("Invalid credentials. Try one of the demo accounts or register a new account.")
      setLoading(false)
    }, 1000)
  }

  const handleDemoLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
    setLoading(true)

    setTimeout(() => {
      const user = DEMO_USERS[email as keyof typeof DEMO_USERS]
      if (user) {
        localStorage.setItem(
          "swifthomes_user",
          JSON.stringify({
            email,
            role: user.role,
            name: user.name,
            authenticated: true,
          }),
        )

        redirectByRole(user.role)
      }
      setLoading(false)
    }, 800)
  }

  const handleOAuthLogin = (provider: string) => {
    setLoading(true)
    // Simulate OAuth flow
    setTimeout(() => {
      localStorage.setItem(
        "swifthomes_user",
        JSON.stringify({
          email: `user@${provider.toLowerCase()}.com`,
          role: "tenant",
          name: `${provider} User`,
          authenticated: true,
          oauth_provider: provider,
        }),
      )
      router.push("/tenant/dashboard")
    }, 1500)
  }

  const redirectByRole = (role: string) => {
    switch (role) {
      case "super_admin":
      case "property_admin":
        router.push("/admin/dashboard")
        break
      case "tenant":
        router.push("/tenant/dashboard")
        break
      case "service_provider":
        router.push("/service-provider/dashboard")
        break
      case "concierge":
        router.push("/concierge/dashboard")
        break
      default:
        router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Swifthomes</CardTitle>
          <CardDescription>Property Management System</CardDescription>
        </CardHeader>
        <CardContent>
          {showRegistrationSuccess && (
            <Alert className="mb-4 border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600 dark:text-green-400">
                Account created successfully! You can now login with your credentials.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {OAUTH_PROVIDERS.map((provider) => (
                    <Button
                      key={provider.name}
                      type="button"
                      variant="outline"
                      className={`${provider.color} text-white border-0`}
                      onClick={() => handleOAuthLogin(provider.name)}
                      disabled={loading}
                    >
                      <provider.icon className="mr-2 h-4 w-4" />
                      {provider.name}
                    </Button>
                  ))}
                </div>

                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-primary hover:underline">
                    Register
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="demo" className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">Click any account to login instantly:</p>
              {Object.entries(DEMO_USERS).map(([email, data]) => (
                <Card
                  key={email}
                  className="p-3 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleDemoLogin(email, data.password)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{data.name}</div>
                      <div className="text-xs text-muted-foreground">{email}</div>
                      <div className="text-xs text-primary font-semibold mt-1">
                        Click to login as {data.role.replace("_", " ")}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
