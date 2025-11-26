"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, DollarSign, TrendingUp, Activity } from "lucide-react"
import { MOCK_ORGANIZATIONS, MOCK_BUILDINGS } from "@/lib/mock-data"

export default function SuperAdminDashboard() {
  const totalOrganizations = MOCK_ORGANIZATIONS.length
  const activeOrganizations = MOCK_ORGANIZATIONS.filter((o) => o.status === "active").length
  const totalBuildings = MOCK_BUILDINGS.length
  const totalRevenue = MOCK_ORGANIZATIONS.reduce((acc, org) => {
    const planRevenue = {
      free: 0,
      starter: 99,
      professional: 299,
      enterprise: 999,
    }
    return acc + (planRevenue[org.plan] || 0)
  }, 0)

  const stats = [
    {
      title: "Total Organizations",
      value: totalOrganizations,
      description: `${activeOrganizations} active`,
      icon: Building2,
      trend: "+12% from last month",
    },
    {
      title: "Total Buildings",
      value: totalBuildings,
      description: "Across all organizations",
      icon: Building2,
      trend: "+8% from last month",
    },
    {
      title: "Monthly Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      description: "Subscription revenue",
      icon: DollarSign,
      trend: "+15% from last month",
    },
    {
      title: "Active Users",
      value: "1,234",
      description: "Platform-wide",
      icon: Users,
      trend: "+23% from last month",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform-wide overview and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <p className="mt-2 flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Organizations</CardTitle>
              <CardDescription>Newly registered property management companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_ORGANIZATIONS.map((org) => (
                  <div key={org.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-sm text-muted-foreground">{org.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium capitalize">{org.plan}</p>
                      <p className="text-xs text-muted-foreground">{org.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>Platform-wide activity logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "New organization created",
                    org: "Premium Estates Ghana",
                    time: "2 hours ago",
                  },
                  {
                    action: "Subscription upgraded",
                    org: "Sloane Square Properties",
                    time: "5 hours ago",
                  },
                  {
                    action: "Building added",
                    org: "Premium Estates Ghana",
                    time: "1 day ago",
                  },
                  {
                    action: "User invitation sent",
                    org: "Sloane Square Properties",
                    time: "2 days ago",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.org}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
