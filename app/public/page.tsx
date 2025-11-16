"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, MapPin, Bed, Bath, Maximize, Check, Search } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function PublicPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const properties = [
    {
      id: "unit-001",
      building: "Asantewaa Luxury",
      unit: "A101",
      bedrooms: 2,
      bathrooms: 2,
      sqm: 85,
      rent: 2500,
      currency: "GHS",
      status: "occupied",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-64HSsNbbII5M53GnxXro7Rx000zxJV.png",
      features: ["Smart Home", "Parking", "Security"],
    },
    {
      id: "unit-003",
      building: "Oheema Villa",
      unit: "A103",
      bedrooms: 2,
      bathrooms: 1,
      sqm: 75,
      rent: 2200,
      currency: "GHS",
      status: "available",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FkIZIbLvFde8gDLLEstZzDBU234Ega.png",
      features: ["Smart Home", "Balcony", "Security"],
    },
    {
      id: "unit-010",
      building: "Nana's Residence",
      unit: "B201",
      bedrooms: 3,
      bathrooms: 2,
      sqm: 105,
      rent: 3200,
      currency: "GHS",
      status: "available",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DogtqDL18EJzlkvJgXcSie7VJPicfO.png",
      features: ["Smart Home", "Parking", "Gym Access", "Pool"],
    },
    {
      id: "unit-015",
      building: "Akosua Plaza",
      unit: "C305",
      bedrooms: 1,
      bathrooms: 1,
      sqm: 55,
      rent: 800,
      currency: "USD",
      status: "available",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UHwuBt5oOoIDuKUzHkmgj1JYC6NfYw.png",
      features: ["City View", "Security", "24/7 Power"],
    },
  ]

  const filteredProperties = properties.filter(
    (p) =>
      p.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.unit.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Home</h1>
          <p className="text-xl text-muted-foreground mb-8">Premium apartments across 240+ buildings in Ghana</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by building or unit..."
                className="pl-12 h-12 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">240+</div>
              <div className="text-sm text-muted-foreground">Buildings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">5,000+</div>
              <div className="text-sm text-muted-foreground">Units</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">96%</div>
              <div className="text-sm text-muted-foreground">Occupancy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4.8/5</div>
              <div className="text-sm text-muted-foreground">Resident Rating</div>
            </div>
          </div>
        </div>

        {/* Property Listings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Available Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties
              .filter((p) => p.status === "available")
              .map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48 bg-accent">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.unit}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-600 text-white">Available</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{property.building}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Unit {property.unit}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms} bed
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms} bath
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="h-4 w-4" />
                        {property.sqm} sqm
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-2xl font-bold">
                          {property.currency} {property.rent.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">per month</div>
                      </div>
                      <Button onClick={() => router.push(`/public/property/${property.id}`)}>View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SLOANE SQUARE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg inline-block mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Premium Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Properties in prime locations across Accra, Tema, and surrounding areas with excellent connectivity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg inline-block mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Smart Home Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All units equipped with smart locks, thermostats, and energy monitoring for modern living.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg inline-block mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Round-the-clock maintenance, security, and concierge services for your peace of mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your New Home?</h2>
              <p className="text-lg mb-6 opacity-90">Browse available properties or schedule a viewing today</p>
              <div className="flex gap-4 justify-center">
                <Button variant="secondary" size="lg" onClick={() => router.push("/auth/register")}>
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => router.push("/public/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
