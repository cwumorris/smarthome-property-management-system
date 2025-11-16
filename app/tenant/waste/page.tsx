"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Recycle, AlertCircle, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function WastePage() {
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const schedule = [
    { id: "w-001", type: "General Waste", day: "Monday", time: "07:00", vendor: "Zoomlion", next_date: "2025-11-18" },
    { id: "w-002", type: "Recycling", day: "Wednesday", time: "07:00", vendor: "Zoomlion", next_date: "2025-11-20" },
    { id: "w-003", type: "Organic Waste", day: "Friday", time: "07:00", vendor: "Zoomlion", next_date: "2025-11-15" },
  ]

  const handleExtraPickup = () => {
    toast({
      title: "Extra Pickup Requested",
      description: "Your request has been submitted. Pickup scheduled within 48 hours.",
    })
  }

  const handleReportMissed = () => {
    toast({
      title: "Report Submitted",
      description: "We've received your report. Our team will investigate.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Waste Management</h1>
          <p className="text-muted-foreground">View collection schedule and request pickups</p>
        </div>

        {/* Next Collection Alert */}
        <Card className="mb-8 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Recycle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-green-900 dark:text-green-100">Next Collection Tomorrow</div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Organic Waste collection on Friday, November 15 at 7:00 AM by Zoomlion
                </p>
              </div>
              <Badge className="bg-green-600 text-white">Tomorrow</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Collection Schedule */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Collection Schedule</CardTitle>
            <CardDescription>Regular waste collection days for your building</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schedule.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <Recycle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{item.type}</div>
                      <div className="text-sm text-muted-foreground">
                        Every {item.day} at {item.time} • {item.vendor}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Next Collection</div>
                    <div className="text-sm text-muted-foreground">{new Date(item.next_date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Request Extra Pickup
              </CardTitle>
              <CardDescription>Need an additional waste collection?</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                If you have extra waste that can't wait until the next scheduled collection, you can request an
                additional pickup.
              </p>
              <Button onClick={handleExtraPickup} className="w-full">
                Request Extra Pickup
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Report Missed Collection
              </CardTitle>
              <CardDescription>Collection didn't happen?</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                If a scheduled collection was missed or incomplete, please report it so we can follow up with the
                vendor.
              </p>
              <Button variant="outline" onClick={handleReportMissed} className="w-full bg-transparent">
                Report Missed Collection
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recycling Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recycling Guidelines</CardTitle>
            <CardDescription>What goes where</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-green-600">General Waste</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Non-recyclable plastics</li>
                  <li>• Disposable items</li>
                  <li>• Mixed materials</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Recycling</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Paper and cardboard</li>
                  <li>• Plastic bottles</li>
                  <li>• Glass containers</li>
                  <li>• Metal cans</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-orange-600">Organic Waste</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Food scraps</li>
                  <li>• Garden waste</li>
                  <li>• Compostable items</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
