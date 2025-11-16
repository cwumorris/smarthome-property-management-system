"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Home, DollarSign, Wrench, Package, Wifi, Recycle, Zap, AlertCircle, Bell, Lock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function TenantDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const tenantData = {
    unit: "A101",
    building: "Sakumono Heights",
    rent: 2500,
    currency: "GHS",
    nextPaymentDue: "2025-12-01",
    daysUntilDue: 18,
    openTickets: 1,
    packagesWaiting: 2,
    energyUsage: 320,
    energyBudget: 400,
  }

  const alerts = [
    {
      id: "alert-001",
      type: "mail",
      title: "New Package Arrived",
      message: "DHL package ready for pickup at mailroom",
      time: "10 minutes ago",
      priority: "high",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      id: "alert-002",
      type: "waste",
      title: "Waste Collection Tomorrow",
      message: "General waste pickup scheduled for 7:00 AM",
      time: "2 hours ago",
      priority: "medium",
      icon: Recycle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      id: "alert-003",
      type: "smart_home",
      title: "Door Lock Low Battery",
      message: "Front door lock battery at 15%. Replace soon.",
      time: "5 hours ago",
      priority: "high",
      icon: Lock,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      id: "alert-004",
      type: "smart_home",
      title: "High Energy Usage Detected",
      message: "Energy consumption 25% above average today",
      time: "1 day ago",
      priority: "medium",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
  ]

  const quickActions = [
    {
      title: "Pay Rent",
      icon: DollarSign,
      href: "/tenant/payments",
      color: "bg-green-50 dark:bg-green-950 text-green-600",
    },
    {
      title: "Submit Ticket",
      icon: Wrench,
      href: "/tenant/tickets",
      color: "bg-blue-50 dark:bg-blue-950 text-blue-600",
    },
    {
      title: "View Packages",
      icon: Package,
      href: "/tenant/packages",
      color: "bg-purple-50 dark:bg-purple-950 text-purple-600",
    },
    {
      title: "Subscriptions",
      icon: Wifi,
      href: "/tenant/subscriptions",
      color: "bg-orange-50 dark:bg-orange-950 text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            Unit {tenantData.unit} • {tenantData.building}
          </p>
        </div>

        {/* Payment Alert */}
        {tenantData.daysUntilDue <= 20 && (
          <Card className="mb-6 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-orange-900 dark:text-orange-100">Rent Payment Due Soon</div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Your rent of {tenantData.currency} {tenantData.rent.toLocaleString()} is due in{" "}
                    {tenantData.daysUntilDue} days ({new Date(tenantData.nextPaymentDue).toLocaleDateString()})
                  </p>
                </div>
                <Button onClick={() => router.push("/tenant/payments")}>Pay Now</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>Important notifications and updates</CardDescription>
              </div>
              <Badge variant="secondary">{alerts.length} New</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg ${alert.bgColor}`}>
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-900`}>
                    <alert.icon className={`h-5 w-5 ${alert.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{alert.title}</span>
                      <Badge variant={alert.priority === "high" ? "destructive" : "secondary"} className="text-xs h-5">
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Monthly Rent</div>
                  <div className="text-2xl font-bold">
                    {tenantData.currency} {tenantData.rent.toLocaleString()}
                  </div>
                </div>
                <Home className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Open Tickets</div>
                  <div className="text-2xl font-bold">{tenantData.openTickets}</div>
                </div>
                <Wrench className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Packages Waiting</div>
                  <div className="text-2xl font-bold">{tenantData.packagesWaiting}</div>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Energy Usage</div>
                  <div className="text-2xl font-bold">{tenantData.energyUsage} kWh</div>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, idx) => (
                <Link key={idx} href={action.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div className={`${action.color} p-3 rounded-lg inline-block mb-2`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">{action.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Energy Monitor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Energy Usage This Month
              </CardTitle>
              <CardDescription>Track your energy consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{tenantData.energyUsage} kWh used</span>
                    <span>{tenantData.energyBudget} kWh budget</span>
                  </div>
                  <Progress value={(tenantData.energyUsage / tenantData.energyBudget) * 100} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold text-green-600">-12%</div>
                    <div className="text-xs text-muted-foreground">vs. last month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{tenantData.currency} 45</div>
                    <div className="text-xs text-muted-foreground">Estimated cost</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => router.push("/tenant/smart-home")}
                >
                  View Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-50 dark:bg-green-950 p-2 rounded-lg">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Rent Payment Confirmed</div>
                    <div className="text-xs text-muted-foreground">November 2025 • GHS 2,500</div>
                  </div>
                  <Badge variant="secondary">Paid</Badge>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-50 dark:bg-purple-950 p-2 rounded-lg">
                    <Package className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Package Arrived</div>
                    <div className="text-xs text-muted-foreground">DHL • Ready for pickup</div>
                  </div>
                  <Badge>New</Badge>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-lg">
                    <Wrench className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Maintenance Update</div>
                    <div className="text-xs text-muted-foreground">Kitchen sink repair in progress</div>
                  </div>
                  <Badge variant="secondary">In Progress</Badge>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-50 dark:bg-orange-950 p-2 rounded-lg">
                    <Recycle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Waste Collection Reminder</div>
                    <div className="text-xs text-muted-foreground">General waste tomorrow at 7:00 AM</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
