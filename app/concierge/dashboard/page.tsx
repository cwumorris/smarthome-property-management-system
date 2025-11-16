"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Package, Users, Bell, Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ConciergeDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = requireAuth(["concierge", "property_admin", "super_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const stats = {
    packagesToday: 12,
    pendingPickups: 5,
    visitorsLogged: 8,
    upcomingDeliveries: 3,
  }

  const recentActivity = [
    {
      id: "act-001",
      type: "package",
      message: "DHL package checked in for Unit A204",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      id: "act-002",
      type: "pickup",
      message: "Package picked up by John Doe (Unit B102)",
      time: "15 minutes ago",
      status: "completed",
    },
    {
      id: "act-003",
      type: "visitor",
      message: "Visitor logged for Unit C301",
      time: "1 hour ago",
      status: "completed",
    },
    {
      id: "act-004",
      type: "package",
      message: "FedEx package checked in for Unit A101",
      time: "2 hours ago",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Concierge Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.name} - Mailroom Operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Packages Today</div>
                  <div className="text-3xl font-bold">{stats.packagesToday}</div>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Pending Pickups</div>
                  <div className="text-3xl font-bold text-orange-600">{stats.pendingPickups}</div>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Visitors Today</div>
                  <div className="text-3xl font-bold">{stats.visitorsLogged}</div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Expected Deliveries</div>
                  <div className="text-3xl font-bold">{stats.upcomingDeliveries}</div>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common mailroom tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/mailroom">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg inline-block mb-2">
                        <Package className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">Check In Package</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/concierge/visitors">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg inline-block mb-2">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">Log Visitor</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/concierge/notifications">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg inline-block mb-2">
                        <Bell className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="text-sm font-medium">Send Notification</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/concierge/schedule">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg inline-block mb-2">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">View Schedule</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest mailroom operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div
                      className={`p-2 rounded-lg ${
                        activity.type === "package"
                          ? "bg-purple-50 dark:bg-purple-950"
                          : activity.type === "pickup"
                            ? "bg-green-50 dark:bg-green-950"
                            : "bg-blue-50 dark:bg-blue-950"
                      }`}
                    >
                      {activity.type === "package" ? (
                        <Package className="h-4 w-4 text-purple-600" />
                      ) : activity.type === "pickup" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Users className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === "completed" ? "secondary" : "default"}>{activity.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Alerts & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Package Held Over 48 Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Unit A101 has a package waiting since 3 days ago. Consider sending a reminder.
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Notify
                </Button>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Scheduled Delivery Expected</p>
                  <p className="text-sm text-muted-foreground">
                    Bulk delivery expected at 2:00 PM today for multiple units.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
