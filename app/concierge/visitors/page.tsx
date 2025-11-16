"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requireAuth } from "@/lib/auth"
import { Users, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/local-storage"

export default function VisitorsPage() {
  const [user, setUser] = useState<any>(null)
  const [visitors, setVisitors] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    unit: "",
    purpose: "",
    id_number: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["concierge", "property_admin", "super_admin"])
    if (currentUser) setUser(currentUser)

    const stored = loadFromLocalStorage("visitors")
    if (stored && stored.length > 0) {
      setVisitors(stored)
    } else {
      const initial = [
        {
          id: "vis-001",
          name: "Michael Brown",
          unit: "A204",
          purpose: "Delivery",
          time_in: "2025-11-13 09:30",
          time_out: "2025-11-13 09:45",
          id_number: "GHA123456",
          status: "checked_out",
        },
        {
          id: "vis-002",
          name: "Sarah Williams",
          unit: "C301",
          purpose: "Visit",
          time_in: "2025-11-13 14:15",
          time_out: null,
          id_number: "GHA789012",
          status: "checked_in",
        },
        {
          id: "vis-003",
          name: "David Chen",
          unit: "B102",
          purpose: "Maintenance",
          time_in: "2025-11-13 11:00",
          time_out: "2025-11-13 13:30",
          id_number: "GHA345678",
          status: "checked_out",
        },
      ]
      setVisitors(initial)
      saveToLocalStorage("visitors", initial)
    }
  }, [])

  if (!user) return null

  const handleAddVisitor = () => {
    if (!newVisitor.name || !newVisitor.unit || !newVisitor.purpose) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const visitor = {
      id: `vis-${Date.now()}`,
      ...newVisitor,
      time_in: new Date().toISOString(),
      time_out: null,
      status: "checked_in",
    }

    const updated = [visitor, ...visitors]
    setVisitors(updated)
    saveToLocalStorage("visitors", updated)
    setShowAddForm(false)
    setNewVisitor({ name: "", unit: "", purpose: "", id_number: "" })
    toast({
      title: "Visitor Logged",
      description: `${visitor.name} has been checked in for Unit ${visitor.unit}`,
    })
  }

  const handleCheckOut = (visitorId: string) => {
    const updated = visitors.map((v) =>
      v.id === visitorId
        ? {
            ...v,
            time_out: new Date().toISOString(),
            status: "checked_out",
          }
        : v,
    )
    setVisitors(updated)
    saveToLocalStorage("visitors", updated)
    toast({
      title: "Visitor Checked Out",
      description: "Departure time has been recorded",
    })
  }

  const filteredVisitors = visitors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.unit.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Visitor Log</h1>
          <p className="text-muted-foreground">Track and manage building visitors</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Log New Visitor
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Log New Visitor</CardTitle>
              <CardDescription>Record visitor check-in details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitor-name">Visitor Name *</Label>
                  <Input
                    id="visitor-name"
                    placeholder="Enter name"
                    value={newVisitor.name}
                    onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitor-unit">Unit Number *</Label>
                  <Input
                    id="visitor-unit"
                    placeholder="e.g., A204"
                    value={newVisitor.unit}
                    onChange={(e) => setNewVisitor({ ...newVisitor, unit: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitor-purpose">Purpose of Visit *</Label>
                  <Select
                    value={newVisitor.purpose}
                    onValueChange={(value) => setNewVisitor({ ...newVisitor, purpose: value })}
                  >
                    <SelectTrigger id="visitor-purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Visit">Social Visit</SelectItem>
                      <SelectItem value="Delivery">Delivery</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Contractor">Contractor Work</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitor-id">ID Number (Optional)</Label>
                  <Input
                    id="visitor-id"
                    placeholder="Enter ID number"
                    value={newVisitor.id_number}
                    onChange={(e) => setNewVisitor({ ...newVisitor, id_number: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddVisitor}>Log Visitor</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Visitor Records
            </CardTitle>
            <CardDescription>All visitor check-ins and check-outs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((visitor) => (
                  <div key={visitor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{visitor.name}</span>
                        <Badge variant={visitor.status === "checked_in" ? "default" : "secondary"}>
                          {visitor.status === "checked_in" ? "In Building" : "Checked Out"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Unit:</span> {visitor.unit}
                        </div>
                        <div>
                          <span className="font-medium">Purpose:</span> {visitor.purpose}
                        </div>
                        <div>
                          <span className="font-medium">Check In:</span>{" "}
                          {new Date(visitor.time_in).toLocaleTimeString()}
                        </div>
                        <div>
                          <span className="font-medium">Check Out:</span>{" "}
                          {visitor.time_out ? new Date(visitor.time_out).toLocaleTimeString() : "—"}
                        </div>
                      </div>
                      {visitor.id_number && (
                        <div className="text-sm text-muted-foreground mt-1">ID: {visitor.id_number}</div>
                      )}
                    </div>
                    {visitor.status === "checked_in" && (
                      <Button size="sm" variant="outline" onClick={() => handleCheckOut(visitor.id)}>
                        Check Out
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No visitors found. {searchTerm && "Try a different search term."}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
