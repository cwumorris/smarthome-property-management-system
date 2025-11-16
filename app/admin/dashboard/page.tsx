"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { Building2, Users, Wrench, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { MOCK_BUILDINGS, MOCK_TICKETS, MOCK_PAYMENTS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = requireAuth(["super_admin", "property_admin", "maintenance_supervisor", "finance"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const totalBuildings = MOCK_BUILDINGS.length
  const portfolios = 3
  const totalUnits = MOCK_BUILDINGS.reduce((sum, b) => sum + b.units, 0)
  const occupiedUnits = MOCK_BUILDINGS.reduce((sum, b) => sum + b.occupancy, 0)
  const occupancyRate = ((occupiedUnits / totalUnits) * 100).toFixed(1)

  const openTickets = MOCK_TICKETS.filter((t) => t.status === "open").length
  const inProgressTickets = MOCK_TICKETS.filter((t) => t.status === "in_progress").length
  const urgentTickets = MOCK_TICKETS.filter((t) => t.priority === "high" && t.status !== "resolved").length

  const totalRevenue = MOCK_PAYMENTS.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const arrears = 184000
  const paymentSuccessRate = 98.1

  const stats = [
    {
      title: "Portfolio Overview",
      value: `${portfolios} Portfolios`,
      subtitle: `${totalBuildings} Buildings • ${totalUnits} Units`,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Occupancy Rate",
      value: `${occupancyRate}%`,
      subtitle: `${occupiedUnits} of ${totalUnits} occupied`,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Maintenance & SLA",
      value: `${openTickets + inProgressTickets} Open`,
      subtitle: `${urgentTickets} SLA Breaches`,
      icon: Wrench,
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950",
    },
    {
      title: "Financial Snapshot",
      value: `GHS ${(totalRevenue / 1000).toFixed(1)}M`,
      subtitle: `GHS ${(arrears / 1000).toFixed(0)}K Arrears`,
      icon: DollarSign,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950",
    },
  ]

  const alerts = [
    { id: 1, type: "urgent", message: "2 Urgent: Leak in Block 7", icon: AlertCircle, color: "text-red-600" },
    { id: 2, type: "warning", message: "1 Missed Waste Pickup", icon: Clock, color: "text-yellow-600" },
    { id: 3, type: "info", message: "3 Lease Approvals Pending", icon: CheckCircle, color: "text-blue-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              You manage {totalBuildings} buildings across {portfolios} portfolios
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => router.push("/admin/buildings")}>
              <Building2 className="mr-2 h-4 w-4" />
              Add Building
            </Button>
            <Button variant="outline" onClick={() => router.push("/admin/users")}>
              <Users className="mr-2 h-4 w-4" />
              Invite Team
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8 border-orange-200 dark:border-orange-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <alert.icon className={`h-5 w-5 ${alert.color}`} />
                    <span className="font-medium">{alert.message}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Latest maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_TICKETS.slice(0, 5).map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => router.push(`/admin/tickets/${ticket.id}`)}
                  >
                    {ticket.status === "open" ? (
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{ticket.category}</div>
                      <div className="text-sm text-muted-foreground">{ticket.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {ticket.tenant_name} • Unit {ticket.unit_id}
                      </div>
                    </div>
                    <Badge
                      className={
                        ticket.priority === "high"
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Latest rent collections • {paymentSuccessRate}% success rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_PAYMENTS.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{payment.tenant_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {payment.method === "card" ? "Card Payment" : "Mobile Money"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </div>
                      <Badge variant={payment.status === "completed" ? "default" : "secondary"}>{payment.status}</Badge>
                    </div>
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
