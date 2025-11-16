"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { CheckCircle, Clock, DollarSign, AlertCircle, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ServiceProviderDashboard() {
  const [user, setUser] = useState<any>(null)
  const [jobs, setJobs] = useState([
    {
      id: "tick-001",
      building: "Sakumono Heights",
      unit: "A101",
      category: "Plumbing",
      priority: "high",
      status: "assigned",
      description: "Kitchen sink is leaking",
      tenant: "John Tenant",
      created_at: "2025-11-10T09:30:00Z",
      scheduled_date: "2025-11-14T10:00:00Z",
      payment: 250,
    },
    {
      id: "tick-005",
      building: "Tema Gardens",
      unit: "B203",
      category: "Electrical",
      priority: "medium",
      status: "assigned",
      description: "Ceiling fan not working",
      tenant: "Alice Smith",
      created_at: "2025-11-12T14:30:00Z",
      payment: 150,
    },
  ])
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["service_provider"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const handleAcceptJob = (jobId: string) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: "in_progress" } : j)))
    toast({
      title: "Job Accepted",
      description: "You have accepted this job. Please update the status as you progress.",
    })
  }

  const handleCompleteJob = (jobId: string) => {
    setJobs(
      jobs.map((j) => (j.id === jobId ? { ...j, status: "completed", completed_at: new Date().toISOString() } : j)),
    )
    toast({
      title: "Job Completed",
      description: "The job has been marked as completed. Thank you!",
    })
  }

  const stats = {
    assigned: jobs.filter((j) => j.status === "assigned").length,
    in_progress: jobs.filter((j) => j.status === "in_progress").length,
    completed_this_month: 12,
    earnings_this_month: 4500,
    rating: 4.8,
    total_reviews: 34,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Service Provider Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= stats.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {stats.rating} ({stats.total_reviews} reviews)
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">New Jobs</div>
                  <div className="text-3xl font-bold text-orange-600">{stats.assigned}</div>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">In Progress</div>
                  <div className="text-3xl font-bold text-blue-600">{stats.in_progress}</div>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Completed This Month</div>
                  <div className="text-3xl font-bold text-green-600">{stats.completed_this_month}</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Earnings This Month</div>
                  <div className="text-3xl font-bold text-purple-600">GHS {stats.earnings_this_month}</div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/service-provider/marketplace">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Browse Marketplace</h3>
                <p className="text-sm text-muted-foreground">Find new jobs matching your specialty</p>
              </CardContent>
            </Link>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/service-provider/jobs">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Manage Jobs</h3>
                <p className="text-sm text-muted-foreground">View and update your active jobs</p>
              </CardContent>
            </Link>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/service-provider/earnings">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">View Earnings</h3>
                <p className="text-sm text-muted-foreground">Track your income and payments</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Job Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Jobs</CardTitle>
            <CardDescription>Jobs currently assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{job.category}</h3>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                    <Badge
                      className={
                        job.priority === "high"
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                          : job.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      }
                    >
                      {job.priority} priority
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground mb-4">
                    <div>
                      <span className="font-medium">Building:</span> {job.building}
                    </div>
                    <div>
                      <span className="font-medium">Unit:</span> {job.unit}
                    </div>
                    <div>
                      <span className="font-medium">Tenant:</span> {job.tenant}
                    </div>
                    <div>
                      <span className="font-medium">Payment:</span> GHS {job.payment}
                    </div>
                  </div>

                  {job.scheduled_date && (
                    <div className="text-sm mb-4 p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <span className="font-medium">Scheduled:</span> {new Date(job.scheduled_date).toLocaleString()}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Badge
                      variant={
                        job.status === "assigned" ? "secondary" : job.status === "in_progress" ? "default" : "default"
                      }
                    >
                      {job.status.replace("_", " ")}
                    </Badge>
                    {job.status === "assigned" && (
                      <Button size="sm" onClick={() => handleAcceptJob(job.id)}>
                        Accept Job
                      </Button>
                    )}
                    {job.status === "in_progress" && (
                      <Button size="sm" onClick={() => handleCompleteJob(job.id)}>
                        Mark Complete
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
