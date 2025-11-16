"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Package, CheckCircle, Clock, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PackagesPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const packages = [
    {
      id: "pkg-001",
      tracking_number: "TRK123456789",
      carrier: "DHL",
      status: "ready_for_pickup",
      checked_in_at: "2025-11-12T10:30:00Z",
      checked_in_by: "Jane Concierge",
      photo_url: "/wrapped-parcel.png",
    },
    {
      id: "pkg-002",
      tracking_number: "TRK987654321",
      carrier: "UPS",
      status: "ready_for_pickup",
      checked_in_at: "2025-11-11T14:20:00Z",
      checked_in_by: "Jane Concierge",
      photo_url: "/cardboard-box-stack.png",
    },
    {
      id: "pkg-003",
      tracking_number: "TRK555666777",
      carrier: "FedEx",
      status: "picked_up",
      checked_in_at: "2025-11-08T09:15:00Z",
      picked_up_at: "2025-11-09T16:00:00Z",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Package Management</h1>
          <p className="text-muted-foreground">Track your deliveries and pickups</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Waiting for Pickup</div>
                  <div className="text-3xl font-bold">2</div>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Picked Up This Month</div>
                  <div className="text-3xl font-bold">8</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Notifications Enabled</div>
                  <div className="text-3xl font-bold">Yes</div>
                </div>
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Package List */}
        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {pkg.photo_url && (
                    <div className="w-full md:w-48 h-48 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={pkg.photo_url || "/placeholder.svg"}
                        alt="Package"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{pkg.carrier} Delivery</h3>
                        <p className="text-sm text-muted-foreground">Tracking: {pkg.tracking_number}</p>
                      </div>
                      <Badge variant={pkg.status === "ready_for_pickup" ? "default" : "secondary"}>
                        {pkg.status === "ready_for_pickup" ? "Ready for Pickup" : "Picked Up"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Arrived: {new Date(pkg.checked_in_at).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>Checked in by: {pkg.checked_in_by}</span>
                      </div>
                      {pkg.picked_up_at && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Picked up: {new Date(pkg.picked_up_at).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {pkg.status === "ready_for_pickup" && (
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Picked Up
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive package alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">Get notified via text message</div>
                </div>
                <Badge>Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive email alerts</div>
                </div>
                <Badge>Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">WhatsApp Notifications</div>
                  <div className="text-sm text-muted-foreground">Get updates on WhatsApp</div>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
