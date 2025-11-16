"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Clock, CheckCircle, AlertCircle, MapPin, Calendar, DollarSign } from "lucide-react"

export default function ServiceProviderJobs() {
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  const [jobs, setJobs] = useState([
    {
      id: "tick-001",
      building: "Sakumono Heights",
      unit: "A101",
      category: "Plumbing",
      priority: "high",
      status: "in_progress",
      description: "Kitchen sink is leaking",
      tenant: "John Tenant",
      tenant_phone: "+233 24 123 4567",
      created_at: "2025-11-10T09:30:00Z",
      scheduled_date: "2025-11-14T10:00:00Z",
      payment: 250,
      notes: "Tenant available after 2 PM",
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
      tenant_phone: "+233 24 987 6543",
      created_at: "2025-11-12T14:30:00Z",
      payment: 150,
    },
    {
      id: "tick-007",
      building: "Sakumono Heights",
      unit: "C305",
      category: "Plumbing",
      priority: "low",
      status: "completed",
      description: "Replace bathroom faucet",
      tenant: "Bob Johnson",
      created_at: "2025-11-08T11:00:00Z",
      completed_at: "2025-11-11T16:30:00Z",
      payment: 200,
    },
  ])

  useEffect(() => {
    const currentUser = requireAuth(["service_provider"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const handleAcceptJob = (jobId: string) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: "in_progress" } : j)))
    toast({
      title: "Job Accepted",
      description: "You have accepted this job.",
    })
  }

  const handleCompleteJob = (jobId: string) => {
    setJobs(
      jobs.map((j) => (j.id === jobId ? { ...j, status: "completed", completed_at: new Date().toISOString() } : j)),
    )
    toast({
      title: "Job Completed",
      description: "The job has been marked as completed.",
    })
  }

  const assignedJobs = jobs.filter((j) => j.status === "assigned")
  const inProgressJobs = jobs.filter((j) => j.status === "in_progress")
  const completedJobs = jobs.filter((j) => j.status === "completed")

  const JobCard = ({ job }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{job.category}</h3>
              <Badge
                className={
                  job.priority === "high"
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : job.priority === "medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                }
              >
                {job.priority}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3">{job.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {job.building}, Unit {job.unit}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>GHS {job.payment}</span>
              </div>
              {job.scheduled_date && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(job.scheduled_date).toLocaleString()}</span>
                </div>
              )}
            </div>

            {job.notes && (
              <div className="mt-3 p-2 bg-muted rounded text-sm">
                <span className="font-medium">Notes:</span> {job.notes}
              </div>
            )}

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm">
                <span className="font-medium">Tenant:</span> {job.tenant}
              </p>
              {job.tenant_phone && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Phone:</span> {job.tenant_phone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          {job.status === "assigned" && (
            <>
              <Button onClick={() => handleAcceptJob(job.id)}>Accept Job</Button>
              <Button variant="outline">Decline</Button>
            </>
          )}
          {job.status === "in_progress" && (
            <>
              <Button onClick={() => handleCompleteJob(job.id)}>Mark Complete</Button>
              <Button variant="outline">Update Status</Button>
            </>
          )}
          {job.status === "completed" && job.completed_at && (
            <p className="text-sm text-muted-foreground">
              Completed on {new Date(job.completed_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Jobs</h1>
          <p className="text-muted-foreground">Manage all your service jobs</p>
        </div>

        <Tabs defaultValue="assigned" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              New ({assignedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              In Progress ({inProgressJobs.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({completedJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="space-y-4">
            {assignedJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No new jobs assigned. Check the marketplace for available jobs!
                </CardContent>
              </Card>
            ) : (
              assignedJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            {inProgressJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">No jobs in progress.</CardContent>
              </Card>
            ) : (
              inProgressJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">No completed jobs yet.</CardContent>
              </Card>
            ) : (
              completedJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
