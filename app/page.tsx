"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Home, Users, Wrench, Package, Wifi, Recycle, BarChart3, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: Building2,
      title: "Property Management",
      description: "240+ buildings managed efficiently",
      color: "text-blue-600",
    },
    { icon: Home, title: "Tenant Portal", description: "Seamless rent & service payments", color: "text-green-600" },
    { icon: Users, title: "Multi-tenancy", description: "Role-based access control", color: "text-purple-600" },
    { icon: Wrench, title: "Maintenance", description: "Smart ticket & vendor management", color: "text-orange-600" },
    {
      icon: Package,
      title: "Mailbox Services",
      description: "Package tracking & notifications",
      color: "text-pink-600",
    },
    { icon: Wifi, title: "Smart Home", description: "IoT device integration", color: "text-indigo-600" },
    { icon: Recycle, title: "Waste Management", description: "Scheduled pickups & tracking", color: "text-teal-600" },
    { icon: BarChart3, title: "Analytics", description: "Real-time dashboards & reports", color: "text-red-600" },
  ]

  const featuredBuildings = [
    {
      id: 1,
      name: "Modern Villa Estate",
      location: "Sakumono, Tema",
      image: "/images/image.png",
      units: 24,
      available: 3,
    },
    {
      id: 2,
      name: "Luxury Residence",
      location: "East Legon, Accra",
      image: "/images/image.png",
      units: 18,
      available: 2,
    },
    {
      id: 3,
      name: "Executive Apartments",
      location: "Cantonments, Accra",
      image: "/images/image.png",
      units: 32,
      available: 5,
    },
    {
      id: 4,
      name: "Premium Heights",
      location: "Airport Residential, Accra",
      image: "/images/image.png",
      units: 28,
      available: 4,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Swifthomes</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => router.push("/auth/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/auth/register")}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Swifthomes
          </h1>
          <p className="text-2xl text-slate-700 dark:text-slate-300 mb-2">Property Management System</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
            Modern Living. Smart Homes. Premium Service.
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/public")}>
              Browse Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/presentation")}>
              View Presentation
            </Button>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBuildings.map((building) => (
              <Card
                key={building.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => router.push("/public")}
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={building.image || "/placeholder.svg"}
                    alt={building.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {building.available} Available
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{building.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {building.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{building.units} Units</span>
                    <span className="text-green-600 font-semibold">{building.available} Available</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardHeader>
                <div
                  className={`h-12 w-12 mb-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">240+</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Buildings Managed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">5,000+</div>
              <div className="text-sm text-green-700 dark:text-green-300">Active Units</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">99.9%</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Uptime SLA</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Support Available</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold mb-2">Ready to Get Started?</h2>
              <p className="text-lg mb-6 opacity-90">Experience the future of property management</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="secondary" size="lg" onClick={() => router.push("/auth/register")}>
                  Create Account
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => router.push("/public")}
                >
                  Browse Properties
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => router.push("/presentation")}
                >
                  View Presentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="border-t bg-background/95 backdrop-blur mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="font-bold">Swifthomes</span>
              </div>
              <p className="text-sm text-muted-foreground">Modern property management with smart home integration</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/public" className="hover:text-primary">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/presentation" className="hover:text-primary">
                    Presentation
                  </Link>
                </li>
                <li>
                  <Link href="/public/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">For Residents</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/login" className="hover:text-primary">
                    Tenant Login
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-primary">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sakumono, Tema, Ghana</li>
                <li>+233 699 9907</li>
                <li>info@swifthomes.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2025 Swifthomes Property Management. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
