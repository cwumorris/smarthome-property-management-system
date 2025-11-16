"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Bed, Bath, Maximize, Check, Calendar, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function PropertyDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState("")
  const [applicationOpen, setApplicationOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Mock property data
  const property = {
    id: params.id,
    building: "Sakumono Heights",
    unit: "A103",
    bedrooms: 2,
    bathrooms: 1,
    sqm: 75,
    rent: 2200,
    currency: "GHS",
    status: "available",
    description:
      "Beautiful 2-bedroom apartment with modern finishes and smart home integration. Located in a secure, well-maintained building with 24/7 security, parking, and excellent amenities.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    features: ["Smart Home", "Balcony", "Security", "Parking", "Gym Access", "24/7 Power"],
    amenities: ["Swimming Pool", "Gym", "Children's Play Area", "BBQ Area", "Concierge Service"],
    location: "Sakumono, Tema - Close to Community 25",
  }

  const handleScheduleViewing = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "Choose a preferred viewing date to continue.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Viewing Scheduled!",
      description: `Your viewing has been scheduled for ${new Date(selectedDate).toLocaleDateString()}. We'll send you a confirmation email.`,
    })
    setSelectedDate("")
  }

  const handleApplication = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Application Submitted!",
      description: "We've received your application. Our team will review it and contact you within 24 hours.",
    })
    setApplicationOpen(false)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-accent">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-green-600 text-white text-lg px-4 py-2">Available</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {property.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-24 bg-accent rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`View ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{property.building}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-lg">
                      <MapPin className="h-4 w-4" />
                      {property.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-muted-foreground" />
                    <span>{property.sqm} sqm</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-lg mb-3">Unit Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-lg mb-3">Building Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-600" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">
                  {property.currency} {property.rent.toLocaleString()}
                </CardTitle>
                <CardDescription className="text-base">per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={applicationOpen} onOpenChange={setApplicationOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply for {property.unit}</DialogTitle>
                      <DialogDescription>Fill out this form to start your application process</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone *</Label>
                        <Input
                          placeholder="0XX XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Additional Information</Label>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleApplication} className="w-full">
                        Submit Application
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Schedule a Viewing</Label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleScheduleViewing}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Viewing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Have questions about this property? Our team is here to help.
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => router.push("/public/contact")}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
