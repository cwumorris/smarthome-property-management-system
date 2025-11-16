"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { TrendingUp, Download, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ServiceProviderEarnings() {
  const [user, setUser] = useState<any>(null)

  const earnings = {
    this_month: 4500,
    last_month: 3800,
    total_year: 42000,
    pending: 850,
    average_per_job: 175,
  }

  const transactions = [
    {
      id: "pay-001",
      date: "2025-11-12",
      description: "Kitchen sink repair - Sakumono Heights A101",
      amount: 250,
      status: "paid",
    },
    {
      id: "pay-002",
      date: "2025-11-11",
      description: "Bathroom faucet replacement - Sakumono Heights C305",
      amount: 200,
      status: "paid",
    },
    {
      id: "pay-003",
      date: "2025-11-10",
      description: "HVAC maintenance - Tema Gardens B105",
      amount: 300,
      status: "paid",
    },
    {
      id: "pay-004",
      date: "2025-11-13",
      description: "Ceiling fan repair - Tema Gardens B203",
      amount: 150,
      status: "pending",
    },
    {
      id: "pay-005",
      date: "2025-11-09",
      description: "Plumbing inspection - Sakumono Heights D201",
      amount: 180,
      status: "paid",
    },
  ]

  useEffect(() => {
    const currentUser = requireAuth(["service_provider"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Earnings</h1>
            <p className="text-muted-foreground">Track your income and payments</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">This Month</div>
              <div className="text-2xl font-bold text-green-600">GHS {earnings.this_month.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>+18% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">Last Month</div>
              <div className="text-2xl font-bold">GHS {earnings.last_month.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">Year to Date</div>
              <div className="text-2xl font-bold">GHS {earnings.total_year.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">Pending Payment</div>
              <div className="text-2xl font-bold text-orange-600">GHS {earnings.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">Avg per Job</div>
              <div className="text-2xl font-bold text-blue-600">GHS {earnings.average_per_job}</div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All your recent payments and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="font-semibold">GHS {transaction.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          transaction.status === "paid"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
