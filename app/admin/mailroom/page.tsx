"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { requireAuth } from "@/lib/auth"
import { Package, Camera, Plus, CheckCircle, Search } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function MailroomPage() {
  const [user, setUser] = useState<any>(null)
  const [isCheckinDialogOpen, setIsCheckinDialogOpen] = useState(false)
  const [packages, setPackages] = useState([
    {
      id: "pkg-001",
      recipient: "John Tenant",
      unit: "A101",
      tracking_number: "TRK123456789",
      carrier: "DHL",
      status: "ready_for_pickup",
      checked_in_at: "2025-11-12T10:30:00Z",
      checked_in_by: "Jane Concierge",
      photo_url: "/placeholder.svg?height=200&width=200&key=u85rz",
    },
    {
      id: "pkg-002",
      recipient: "Alice Cooper",
      unit: "A102",
      tracking_number: "TRK987654321",
      carrier: "UPS",
      status: "ready_for_pickup",
      checked_in_at: "2025-11-11T14:20:00Z",
      checked_in_by: "Jane Concierge",
      photo_url: "/placeholder.svg?height=200&width=200&key=plh94",
    },
  ])
  const [newPackage, setNewPackage] = useState({
    recipient: "",
    unit: "",
    tracking_number: "",
    carrier: "DHL",
  })
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["concierge", "property_admin", "super_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const handleCheckin = () => {
    const pkg = {
      id: `pkg-${Date.now()}`,
      ...newPackage,
      status: "ready_for_pickup",
      checked_in_at: new Date().toISOString(),
      checked_in_by: user.name,
      photo_url: "/placeholder.svg?height=200&width=200",
    }
    setPackages([pkg, ...packages])
    setIsCheckinDialogOpen(false)
    setNewPackage({ recipient: "", unit: "", tracking_number: "", carrier: "DHL" })
    toast({
      title: "Package Checked In",
      description: `Package for ${newPackage.recipient} has been logged. Tenant notification sent.`,
    })
  }

  const handleMarkPickedUp = (pkgId: string) => {
    setPackages(
      packages.map((p) => (p.id === pkgId ? { ...p, status: "picked_up", picked_up_at: new Date().toISOString() } : p)),
    )
    toast({
      title: "Package Picked Up",
      description: "Package has been marked as picked up.",
    })
  }

  const waitingPackages = packages.filter((p) => p.status === "ready_for_pickup")
  const pickedUpToday = packages.filter(
    (p) =>
      p.status === "picked_up" &&
      p.picked_up_at &&
      new Date(p.picked_up_at).toDateString() === new Date().toDateString(),
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mailroom Management</h1>
            <p className="text-muted-foreground">Package check-in and tracking</p>
          </div>

          <Dialog open={isCheckinDialogOpen} onOpenChange={setIsCheckinDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Check In Package
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Check In New Package</DialogTitle>
                <DialogDescription>Scan or enter package details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Name</Label>
                  <Input
                    id="recipient"
                    placeholder="John Doe"
                    value={newPackage.recipient}
                    onChange={(e) => setNewPackage({ ...newPackage, recipient: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit Number</Label>
                  <Input
                    id="unit"
                    placeholder="A101"
                    value={newPackage.unit}
                    onChange={(e) => setNewPackage({ ...newPackage, unit: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    placeholder="TRK123456789"
                    value={newPackage.tracking_number}
                    onChange={(e) => setNewPackage({ ...newPackage, tracking_number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carrier">Carrier</Label>
                  <Select
                    value={newPackage.carrier}
                    onValueChange={(value) => setNewPackage({ ...newPackage, carrier: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DHL">DHL</SelectItem>
                      <SelectItem value="UPS">UPS</SelectItem>
                      <SelectItem value="FedEx">FedEx</SelectItem>
                      <SelectItem value="USPS">USPS</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Package Photo</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent transition-colors">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Take photo or upload</div>
                  </div>
                </div>

                <Button onClick={handleCheckin} className="w-full">
                  Check In Package
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Waiting for Pickup</div>
                  <div className="text-3xl font-bold text-orange-600">{waitingPackages.length}</div>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Picked Up Today</div>
                  <div className="text-3xl font-bold text-green-600">{pickedUpToday}</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total This Month</div>
                  <div className="text-3xl font-bold">84</div>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Package List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Packages</CardTitle>
                <CardDescription>Manage package check-ins and pickups</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search packages..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="w-24 h-24 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={pkg.photo_url || "/placeholder.svg"}
                      alt="Package"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{pkg.recipient}</h3>
                        <p className="text-sm text-muted-foreground">Unit {pkg.unit}</p>
                      </div>
                      <Badge variant={pkg.status === "ready_for_pickup" ? "default" : "secondary"}>
                        {pkg.status === "ready_for_pickup" ? "Ready for Pickup" : "Picked Up"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <div>
                        <span className="font-medium">Carrier:</span> {pkg.carrier}
                      </div>
                      <div>
                        <span className="font-medium">Tracking:</span> {pkg.tracking_number}
                      </div>
                      <div>
                        <span className="font-medium">Checked In:</span> {new Date(pkg.checked_in_at).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">By:</span> {pkg.checked_in_by}
                      </div>
                    </div>
                    {pkg.status === "ready_for_pickup" && (
                      <Button size="sm" onClick={() => handleMarkPickedUp(pkg.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Picked Up
                      </Button>
                    )}
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
