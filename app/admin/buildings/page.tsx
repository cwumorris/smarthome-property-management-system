"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { requireAuth } from "@/lib/auth"
import { Building2, MapPin, Users, Home, Plus, Edit, Eye } from "lucide-react"
import { MOCK_BUILDINGS } from "@/lib/mock-data"
import Link from "next/link"
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

export default function BuildingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [buildings, setBuildings] = useState(MOCK_BUILDINGS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBuilding, setEditingBuilding] = useState<any>(null)
  const { toast } = useToast()

  const [newBuilding, setNewBuilding] = useState({
    name: "",
    address: "",
    units: "",
    manager: "",
    currency: "GHS",
    buildingType: "residential",
    floors: "",
    portfolio: "Organization Homes",
  })

  useEffect(() => {
    const currentUser = requireAuth(["super_admin", "property_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const filteredBuildings = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddBuilding = () => {
    if (!newBuilding.name || !newBuilding.address || !newBuilding.units) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const building = {
      id: `bld-${Date.now()}`,
      name: newBuilding.name,
      address: newBuilding.address,
      units: Number.parseInt(newBuilding.units),
      occupancy: 0,
      manager: newBuilding.manager,
      currency: newBuilding.currency,
      buildingType: newBuilding.buildingType,
      floors: Number.parseInt(newBuilding.floors) || 1,
      portfolio: newBuilding.portfolio,
    }
    setBuildings([...buildings, building])
    setIsAddDialogOpen(false)
    setNewBuilding({
      name: "",
      address: "",
      units: "",
      manager: "",
      currency: "GHS",
      buildingType: "residential",
      floors: "",
      portfolio: "Organization Homes",
    })
    toast({
      title: "Building Added",
      description: `${building.name} has been successfully added to the system`,
    })
  }

  const handleEditBuilding = () => {
    if (!editingBuilding) return

    setBuildings(buildings.map((b) => (b.id === editingBuilding.id ? editingBuilding : b)))
    setEditingBuilding(null)
    toast({
      title: "Building Updated",
      description: "Building information has been successfully updated",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Buildings Management</h1>
            <p className="text-muted-foreground">Manage your property portfolio</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Building
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Building</DialogTitle>
                <DialogDescription>Enter the details for the new building</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Building Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Sakumono Heights"
                    value={newBuilding.name}
                    onChange={(e) => setNewBuilding({ ...newBuilding, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buildingType">Building Type *</Label>
                  <Select
                    value={newBuilding.buildingType}
                    onValueChange={(value) => setNewBuilding({ ...newBuilding, buildingType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Full address"
                    value={newBuilding.address}
                    onChange={(e) => setNewBuilding({ ...newBuilding, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="units">Number of Units *</Label>
                  <Input
                    id="units"
                    type="number"
                    placeholder="48"
                    value={newBuilding.units}
                    onChange={(e) => setNewBuilding({ ...newBuilding, units: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floors">Number of Floors</Label>
                  <Input
                    id="floors"
                    type="number"
                    placeholder="5"
                    value={newBuilding.floors}
                    onChange={(e) => setNewBuilding({ ...newBuilding, floors: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Property Manager</Label>
                  <Input
                    id="manager"
                    placeholder="Manager name"
                    value={newBuilding.manager}
                    onChange={(e) => setNewBuilding({ ...newBuilding, manager: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={newBuilding.currency}
                    onValueChange={(value) => setNewBuilding({ ...newBuilding, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GHS">GHS (Ghana Cedis)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="portfolio">Portfolio</Label>
                  <Select
                    value={newBuilding.portfolio}
                    onValueChange={(value) => setNewBuilding({ ...newBuilding, portfolio: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Organization Homes">Organization Homes</SelectItem>
                      <SelectItem value="Coastal Estates">Coastal Estates</SelectItem>
                      <SelectItem value="City Towers">City Towers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddBuilding} className="w-full">
                Add Building
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search buildings by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBuildings.map((building) => (
            <Card key={building.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>{building.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {building.address}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Total Units</div>
                      <div className="font-semibold">{building.units}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Occupancy</div>
                      <div className="font-semibold">
                        {building.occupancy}/{building.units} (
                        {((building.occupancy / building.units) * 100).toFixed(0)}%)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground">Manager</div>
                    <div className="font-medium">{building.manager}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/buildings/${building.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Dialog
                      open={editingBuilding?.id === building.id}
                      onOpenChange={(open) => !open && setEditingBuilding(null)}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setEditingBuilding({ ...building })}>
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Building</DialogTitle>
                          <DialogDescription>Update building information</DialogDescription>
                        </DialogHeader>
                        {editingBuilding && (
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                              <Label>Building Name</Label>
                              <Input
                                value={editingBuilding.name}
                                onChange={(e) => setEditingBuilding({ ...editingBuilding, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Building Type</Label>
                              <Select
                                value={editingBuilding.buildingType || "residential"}
                                onValueChange={(value) =>
                                  setEditingBuilding({ ...editingBuilding, buildingType: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="residential">Residential</SelectItem>
                                  <SelectItem value="commercial">Commercial</SelectItem>
                                  <SelectItem value="mixed">Mixed Use</SelectItem>
                                  <SelectItem value="luxury">Luxury</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2 space-y-2">
                              <Label>Address</Label>
                              <Input
                                value={editingBuilding.address}
                                onChange={(e) => setEditingBuilding({ ...editingBuilding, address: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Total Units</Label>
                              <Input
                                type="number"
                                value={editingBuilding.units}
                                onChange={(e) =>
                                  setEditingBuilding({ ...editingBuilding, units: Number.parseInt(e.target.value) })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Manager</Label>
                              <Input
                                value={editingBuilding.manager}
                                onChange={(e) => setEditingBuilding({ ...editingBuilding, manager: e.target.value })}
                              />
                            </div>
                            <Button onClick={handleEditBuilding} className="col-span-2">
                              Save Changes
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
