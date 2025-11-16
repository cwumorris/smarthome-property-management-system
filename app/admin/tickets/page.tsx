"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { requireAuth } from "@/lib/auth"
import { Wrench, AlertCircle, Clock, CheckCircle } from "lucide-react"
import { MOCK_TICKETS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/local-storage"

export default function TicketsPage() {
  const [user, setUser] = useState<any>(null)
  const [tickets, setTickets] = useState(MOCK_TICKETS)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [assignNote, setAssignNote] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["super_admin", "property_admin", "maintenance_supervisor"])
    if (currentUser) setUser(currentUser)

    const savedTickets = loadFromLocalStorage("admin_tickets")
    if (savedTickets) setTickets(savedTickets)
  }, [])

  if (!user) return null

  const serviceProviders = [
    { id: "sp-001", name: "John's Plumbing Services", specialty: "Plumbing", rating: 4.8 },
    { id: "sp-002", name: "PowerFix Electrical", specialty: "Electrical", rating: 4.9 },
    { id: "sp-003", name: "Cool Air HVAC", specialty: "HVAC", rating: 4.7 },
    { id: "sp-004", name: "HandyPro General Services", specialty: "General", rating: 4.6 },
  ]

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tenant_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || t.status === filter
    return matchesSearch && matchesFilter
  })

  const statusCounts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    completed: tickets.filter((t) => t.status === "completed").length,
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

  const handleViewDetails = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowDetailsDialog(true)
  }

  const handleAssignProvider = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowAssignDialog(true)
    setAssignNote("")
    setSelectedProvider("")
  }

  const confirmAssignment = () => {
    if (!selectedProvider) {
      toast({
        title: "Error",
        description: "Please select a service provider",
        variant: "destructive",
      })
      return
    }

    const provider = serviceProviders.find((p) => p.id === selectedProvider)
    const updatedTickets = tickets.map((t) =>
      t.id === selectedTicket.id
        ? { ...t, status: "in_progress", assigned_to: provider?.name, assignment_note: assignNote }
        : t,
    )

    setTickets(updatedTickets)
    saveToLocalStorage("admin_tickets", updatedTickets)

    setShowAssignDialog(false)
    toast({
      title: "Provider Assigned",
      description: `${provider?.name} has been assigned to this ticket.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Maintenance Tickets</h1>
          <p className="text-muted-foreground">Track and manage maintenance requests</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="cursor-pointer" onClick={() => setFilter("all")}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">All Tickets</div>
                  <div className="text-3xl font-bold">{statusCounts.all}</div>
                </div>
                <Wrench className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={() => setFilter("open")}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Open</div>
                  <div className="text-3xl font-bold text-orange-600">{statusCounts.open}</div>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={() => setFilter("in_progress")}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">In Progress</div>
                  <div className="text-3xl font-bold text-blue-600">{statusCounts.in_progress}</div>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={() => setFilter("completed")}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Completed</div>
                  <div className="text-3xl font-bold text-green-600">{statusCounts.completed || 0}</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row items-start gap-4">
                  {getStatusIcon(ticket.status)}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col lg:flex-row items-start justify-between mb-2 gap-2">
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
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Tenant: {ticket.tenant_name}</span>
                      <span>Unit: {ticket.unit_id}</span>
                      <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                      {ticket.assigned_to && <span>Assigned: {ticket.assigned_to}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(ticket)}>
                        View Details
                      </Button>
                      {ticket.status === "open" && (
                        <Button size="sm" onClick={() => handleAssignProvider(ticket)}>
                          Assign Service Provider
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>Complete information about this maintenance request</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Ticket ID</Label>
                  <p className="font-medium">{selectedTicket.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedTicket.status)}
                    <span className="font-medium capitalize">{selectedTicket.status.replace("_", " ")}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Category</Label>
                  <p className="font-medium">{selectedTicket.category}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Priority</Label>
                  <Badge className="mt-1">{selectedTicket.priority}</Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tenant</Label>
                  <p className="font-medium">{selectedTicket.tenant_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Unit</Label>
                  <p className="font-medium">{selectedTicket.unit_id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <p className="font-medium">{new Date(selectedTicket.created_at).toLocaleString()}</p>
                </div>
                {selectedTicket.assigned_to && (
                  <div>
                    <Label className="text-muted-foreground">Assigned To</Label>
                    <p className="font-medium">{selectedTicket.assigned_to}</p>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p className="mt-2 p-3 bg-accent rounded-lg">{selectedTicket.description}</p>
              </div>

              {selectedTicket.assignment_note && (
                <div>
                  <Label className="text-muted-foreground">Assignment Note</Label>
                  <p className="mt-2 p-3 bg-accent rounded-lg">{selectedTicket.assignment_note}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
                {selectedTicket.status === "open" && (
                  <Button
                    onClick={() => {
                      setShowDetailsDialog(false)
                      handleAssignProvider(selectedTicket)
                    }}
                  >
                    Assign Service Provider
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Service Provider</DialogTitle>
            <DialogDescription>Select a provider to handle this maintenance request</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="provider">Select Service Provider *</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Choose a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceProviders.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{provider.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {provider.specialty} • ⭐ {provider.rating}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="note">Assignment Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add any special instructions or notes for the service provider..."
                  value={assignNote}
                  onChange={(e) => setAssignNote(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmAssignment}>Confirm Assignment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
