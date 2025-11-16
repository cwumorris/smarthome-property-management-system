"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Chrome, Mail } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
  "admin@sloane.com": { password: "admin123", role: "super_admin", name: "Super Admin" },
  "property@sloane.com": { password: "property123", role: "property_admin", name: "Property Manager" },
  "tenant@sloane.com": { password: "tenant123", role: "tenant", name: "John Tenant" },
  "service@sloane.com": { password: "service123", role: "service_provider", name: "Fix-It Services" },
  "concierge@sloane.com": { password: "concierge123", role: "concierge", name: "Jane Concierge" },
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate authentication
    setTimeout(() => {
      const user = DEMO_USERS[email as keyof typeof DEMO_USERS]

      if (user && user.password === password) {
        // Store user session in localStorage (simulated)
        localStorage.setItem(
          "sloane_user",
          JSON.stringify({
            email,
            role: user.role,
            name: user.name,
            authenticated: true,
          }),
        )

        // Redirect based on role
        switch (user.role) {
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
      } else {
        setError("Invalid credentials. Try one of the demo accounts.")
      }
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
          "sloane_user",
          JSON.stringify({
            email,
            role: user.role,
            name: user.name,
            authenticated: true,
          }),
        )

        switch (user.role) {
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
        }
      }
      setLoading(false)
    }, 800)
  }

  const handleOAuthLogin = (provider: string) => {
    setLoading(true)
    // Simulate OAuth flow
    setTimeout(() => {
      localStorage.setItem(
        "sloane_user",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">SLOANE SQUARE</CardTitle>
          <CardDescription>Property Management System</CardDescription>
        </CardHeader>
        <CardContent>
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
