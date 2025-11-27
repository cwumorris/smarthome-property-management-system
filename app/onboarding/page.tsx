"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, CheckCircle, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

const steps = [
  { id: 1, name: "Company Info", description: "Tell us about your property management company" },
  { id: 2, name: "Domain Setup", description: "Choose your subdomain or custom domain" },
  { id: 3, name: "Plan Selection", description: "Select the plan that fits your needs" },
  { id: 4, name: "Admin Account", description: "Create your administrator account" },
]

const plans = [
  {
    name: "Starter",
    price: "$99/month",
    features: ["Up to 5 buildings", "100 units", "Basic support", "Mobile app access"],
  },
  {
    name: "Professional",
    price: "$299/month",
    features: [
      "Up to 20 buildings",
      "Unlimited units",
      "Priority support",
      "Advanced analytics",
      "Smart home integration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited buildings",
      "Unlimited units",
      "24/7 dedicated support",
      "Custom integrations",
      "White-label options",
    ],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    country: "Ghana",
    timezone: "Africa/Accra",
    currency: "GHS",
    domainType: "subdomain", // "subdomain" or "custom"
    subdomain: "",
    customDomain: "",
    plan: "professional",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    agreedToTerms: false,
  })

  useEffect(() => {
    const onboardingUser = localStorage.getItem("onboarding_user")
    if (onboardingUser) {
      const userData = JSON.parse(onboardingUser)
      setFormData((prev) => ({
        ...prev,
        adminName: userData.name,
        adminEmail: userData.email,
        adminPassword: userData.password,
        phone: userData.phone,
        email: userData.email,
      }))
    }
  }, [])

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    if (currentStep === 2) {
      if (formData.domainType === "subdomain" && !formData.subdomain) {
        toast({
          title: "Subdomain Required",
          description: "Please enter a subdomain for your platform",
          variant: "destructive",
        })
        return
      }
      if (formData.domainType === "custom" && !formData.customDomain) {
        toast({
          title: "Custom Domain Required",
          description: "Please enter your custom domain",
          variant: "destructive",
        })
        return
      }
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    const organizationId = `org-${Date.now()}`
    const domain = formData.domainType === "subdomain" ? `${formData.subdomain}.swifthomes.com` : formData.customDomain

    const organization = {
      id: organizationId,
      name: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      country: formData.country,
      timezone: formData.timezone,
      currency: formData.currency,
      domain: domain,
      subdomain: formData.domainType === "subdomain" ? formData.subdomain : null,
      customDomain: formData.domainType === "custom" ? formData.customDomain : null,
      plan: formData.plan,
      status: "active",
      createdAt: new Date().toISOString(),
      branding: {
        primaryColor: "#3B82F6",
        logo: null,
      },
    }

    const orgsStr = localStorage.getItem("swifthomes_organizations")
    const orgs = orgsStr ? JSON.parse(orgsStr) : []
    orgs.push(organization)
    localStorage.setItem("swifthomes_organizations", JSON.stringify(orgs))

    const registeredUsersStr = localStorage.getItem("swifthomes_registered_users")
    const registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : {}

    registeredUsers[formData.adminEmail] = {
      password: formData.adminPassword,
      role: "property_admin",
      name: formData.adminName,
      phone: formData.phone,
      organization_id: organizationId,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("swifthomes_registered_users", JSON.stringify(registeredUsers))

    localStorage.removeItem("onboarding_user")

    toast({
      title: "Organization Created!",
      description: `Welcome to Swifthomes, ${formData.companyName}!`,
    })

    setTimeout(() => {
      router.push("/auth/login?onboarded=true")
    }, 2000)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Welcome to Swifthomes</h1>
          <p className="text-muted-foreground">Set up your property management platform in minutes</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      currentStep >= step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted bg-background"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                  </div>
                  <p className="mt-2 hidden text-xs font-medium md:block">{step.name}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].name}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Property Management"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Company Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@acme.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+233 XXX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street, City"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => updateFormData("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Accra">Africa/Accra (GMT)</SelectItem>
                        <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GHS">GHS - Ghana Cedi</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                        <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Domain Configuration *</Label>
                  <RadioGroup
                    value={formData.domainType}
                    onValueChange={(value) => updateFormData("domainType", value)}
                    className="space-y-4"
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="subdomain" id="subdomain-option" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="subdomain-option" className="font-medium cursor-pointer">
                          Use Swifthomes Subdomain
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Quick setup with a subdomain like yourcompany.swifthomes.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="custom" id="custom-option" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="custom-option" className="font-medium cursor-pointer">
                          Use Your Own Custom Domain
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Use your own domain like properties.yourcompany.com (requires DNS configuration)
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.domainType === "subdomain" && (
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Choose Your Subdomain *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="subdomain"
                        placeholder="acme"
                        value={formData.subdomain || generateSlug(formData.companyName)}
                        onChange={(e) => updateFormData("subdomain", e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">.swifthomes.com</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your platform will be accessible at {formData.subdomain || "yourcompany"}.swifthomes.com
                    </p>
                  </div>
                )}

                {formData.domainType === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="customDomain">Your Custom Domain *</Label>
                    <Input
                      id="customDomain"
                      placeholder="properties.yourcompany.com"
                      value={formData.customDomain}
                      onChange={(e) => updateFormData("customDomain", e.target.value)}
                    />
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        You'll need to configure DNS records after setup. We'll provide detailed instructions.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  {plans.map((plan) => (
                    <Card
                      key={plan.name}
                      className={`cursor-pointer transition-all ${
                        formData.plan === plan.name.toLowerCase()
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      } ${plan.popular ? "border-primary" : ""}`}
                      onClick={() => updateFormData("plan", plan.name.toLowerCase())}
                    >
                      <CardHeader>
                        {plan.popular && (
                          <div className="mb-2">
                            <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                              Most Popular
                            </span>
                          </div>
                        )}
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Full Name *</Label>
                  <Input
                    id="adminName"
                    placeholder="John Doe"
                    value={formData.adminName}
                    onChange={(e) => updateFormData("adminName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email Address *</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="john@acme.com"
                    value={formData.adminEmail}
                    onChange={(e) => updateFormData("adminEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password *</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.adminPassword}
                    onChange={(e) => updateFormData("adminPassword", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => updateFormData("agreedToTerms", checked)}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Complete Setup</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
