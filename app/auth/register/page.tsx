"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [accountType, setAccountType] = useState<"new_company" | "join_existing">("join_existing")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
    phone: "",
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (accountType === "new_company") {
      // Store partial data for onboarding
      localStorage.setItem(
        "onboarding_user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      )
      router.push("/onboarding")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }

    setLoading(true)

    setTimeout(() => {
      // Get current organization from hostname or use demo org
      const hostname = window.location.hostname
      const subdomain = hostname.split(".")[0]
      const organizationId = "org-demo" // Default demo organization

      // In production, this would lookup the organization by subdomain/domain
      console.log("[v0] Registering user to organization:", subdomain)

      // Get existing registered users
      const registeredUsersStr = localStorage.getItem("swifthomes_registered_users")
      const registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : {}

      // Add new user with their organization
      registeredUsers[formData.email] = {
        password: formData.password,
        role: formData.role,
        name: formData.name,
        phone: formData.phone,
        organization_id: organizationId, // Link user to organization
        createdAt: new Date().toISOString(),
      }

      // Save back to localStorage
      localStorage.setItem("swifthomes_registered_users", JSON.stringify(registeredUsers))

      setSuccess(true)
      setLoading(false)

      setTimeout(() => {
        router.push("/auth/login?registered=true")
      }, 2000)
    }, 1500)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold">Account Created Successfully!</h2>
              <p className="text-muted-foreground">Your account has been created. Redirecting you to login...</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join Swifthomes Property Management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 border rounded-lg bg-muted/50">
            <Label className="text-base font-semibold mb-3 block">I want to:</Label>
            <RadioGroup value={accountType} onValueChange={(value: any) => setAccountType(value)}>
              <div className="flex items-start space-x-3 mb-3">
                <RadioGroupItem value="join_existing" id="join" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="join" className="font-medium cursor-pointer">
                    Join an existing property management company
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Register as a tenant, property manager, or service provider
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="new_company" id="new" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="new" className="font-medium cursor-pointer">
                    Start a new property management company
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Set up your own platform with domain, branding, and plans
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {accountType === "new_company" ? (
            <div className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
                <AlertDescription className="text-sm">
                  You'll be redirected to set up your property management company with custom domain, branding, and plan
                  selection.
                </AlertDescription>
              </Alert>
              <Button onClick={() => router.push("/onboarding")} className="w-full" size="lg">
                Start Company Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-center text-sm">
                Already have a company?{" "}
                <button
                  type="button"
                  onClick={() => setAccountType("join_existing")}
                  className="text-primary hover:underline"
                >
                  Join existing instead
                </button>
              </div>
            </div>
          ) : (
            <>
              <Alert className="mb-4 border-blue-200 bg-blue-50 dark:bg-blue-950">
                <AlertDescription className="text-sm">
                  As part of our verification process, background checks are conducted by{" "}
                  <a
                    href="https://morrisonrecordsbureau.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    Morrison Records Bureau
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </AlertDescription>
              </Alert>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="service_provider">Service Provider/Contractor</SelectItem>
                      <SelectItem value="property_admin">Property Manager (Staff)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
