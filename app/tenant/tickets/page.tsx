"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Wrench, Plus, Upload, AlertCircle, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function TicketsPage() {
  const [user, setUser] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [tickets, setTickets] = useState([
    {
      id: "tick-001",
      category: "Plumbing",
      priority: "high",
      status: "in_progress",
      description: "Kitchen sink is leaking",
      created_at: "2025-11-10T09:30:00Z",
      assigned_to: "Fix-It Services",
    },
    {
      id: "tick-002",
      category: "Smart Home",
      priority: "medium",
      status: "completed",
      description: "Smart lock battery replacement",
      created_at: "2025-11-05T14:20:00Z",
      completed_at: "2025-11-07T10:00:00Z",
    },
  ])
  const [newTicket, setNewTicket] = useState({
    category: "Plumbing",
    priority: "medium",
    description: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const handleCreateTicket = () => {
    const ticket = {
      id: `tick-${Date.now()}`,
      ...newTicket,
      status: "open",
      created_at: new Date().toISOString(),
    }
    setTickets([ticket, ...tickets])
    setIsCreateDialogOpen(false)
    setNewTicket({ category: "Plumbing", priority: "medium", description: "" })
    toast({
      title: "Ticket Created!",
      description: "Your maintenance request has been submitted. We'll assign a technician shortly.",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Wrench className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Maintenance Tickets</h1>
            <p className="text-muted-foreground">Submit and track maintenance requests</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Maintenance Ticket</DialogTitle>
                <DialogDescription>Describe the issue and we'll send help</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="HVAC">HVAC</SelectItem>
                      <SelectItem value="Appliance">Appliance</SelectItem>
                      <SelectItem value="Smart Home">Smart Home</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait a few days</SelectItem>
                      <SelectItem value="medium">Medium - Should be fixed soon</SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Click to upload photos or drag and drop</div>
                  </div>
                </div>

                <Button onClick={handleCreateTicket} className="w-full">
                  Submit Ticket
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {getStatusIcon(ticket.status)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{ticket.category}</h3>
                        <p className="text-muted-foreground">{ticket.description}</p>
                      </div>
                      <Badge
                        className={
                          ticket.priority === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                            : ticket.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        }
                      >
                        {ticket.priority} priority
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                      {ticket.assigned_to && <span>Assigned: {ticket.assigned_to}</span>}
                      {ticket.completed_at && (
                        <span>Completed: {new Date(ticket.completed_at).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={ticket.status === "completed" ? "default" : "secondary"}>
                        {ticket.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
