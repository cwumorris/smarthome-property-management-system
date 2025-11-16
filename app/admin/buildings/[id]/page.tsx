"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requireAuth } from "@/lib/auth"
import { Building2, Home, Users, DollarSign, Plus, ArrowLeft, Edit } from "lucide-react"
import { MOCK_BUILDINGS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BuildingDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)

  const [units, setUnits] = useState(() => {
    const savedUnits = getFromLocalStorage(`building_${params.id}_units`, [])
    return savedUnits.length > 0 ? savedUnits : []
  })

  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false)
  const [isEditUnitOpen, setIsEditUnitOpen] = useState(false)
  const [editingUnit, setEditingUnit] = useState<any>(null)
  const [newUnit, setNewUnit] = useState({
    number: "",
    floor: 1,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 85,
    rent: 2500,
    status: "vacant" as "vacant" | "occupied",
    tenant_name: "",
  })

  const building = MOCK_BUILDINGS.find((b) => b.id === params.id)

  useEffect(() => {
    const currentUser = requireAuth(["super_admin", "property_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  useEffect(() => {
    if (units.length > 0) {
      saveToLocalStorage(`building_${params.id}_units`, units)
    }
  }, [units, params.id])

  if (!user || !building) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Building Not Found</h2>
          <p className="text-muted-foreground mb-4">The building you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/admin/buildings")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Buildings
          </Button>
        </div>
      </div>
    )
  }

  const handleAddUnit = () => {
    const unit = {
      id: `unit-${Date.now()}`,
      building_id: params.id as string,
      ...newUnit,
    }
    setUnits([...units, unit])
    setIsAddUnitOpen(false)
    setNewUnit({
      number: "",
      floor: 1,
      bedrooms: 2,
      bathrooms: 2,
      sqm: 85,
      rent: 2500,
      status: "vacant",
      tenant_name: "",
    })
    toast({ title: "Unit Added", description: `Unit ${unit.number} has been added successfully.` })
  }

  const handleEditUnit = () => {
    setUnits(units.map((u: any) => (u.id === editingUnit.id ? editingUnit : u)))
    setIsEditUnitOpen(false)
    setEditingUnit(null)
    toast({ title: "Unit Updated", description: `Unit has been updated successfully.` })
  }

  const occupied = units.filter((u: any) => u.status === "occupied").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Buildings
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {building.name}
          </h1>
          <p className="text-muted-foreground">{building.address}</p>
        </div>

        {/* Building Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Units</div>
                  <div className="text-3xl font-bold">{units.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Occupied</div>
                  <div className="text-3xl font-bold">{occupied}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-orange-200 dark:border-orange-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Building2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Vacant</div>
                  <div className="text-3xl font-bold">{units.length - occupied}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Occupancy Rate</div>
                  <div className="text-3xl font-bold">
                    {units.length > 0 ? ((occupied / units.length) * 100).toFixed(0) : 0}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Units List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Units</CardTitle>
                <CardDescription>All units in this building</CardDescription>
              </div>
              <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Unit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Unit</DialogTitle>
                    <DialogDescription>Create a new unit in {building.name}</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="unitNumber">Unit Number</Label>
                      <Input
                        id="unitNumber"
                        placeholder="A101"
                        value={newUnit.number}
                        onChange={(e) => setNewUnit({ ...newUnit, number: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor">Floor</Label>
                      <Input
                        id="floor"
                        type="number"
                        value={newUnit.floor}
                        onChange={(e) => setNewUnit({ ...newUnit, floor: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={newUnit.bedrooms}
                        onChange={(e) => setNewUnit({ ...newUnit, bedrooms: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={newUnit.bathrooms}
                        onChange={(e) => setNewUnit({ ...newUnit, bathrooms: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sqm">Size (sqm)</Label>
                      <Input
                        id="sqm"
                        type="number"
                        value={newUnit.sqm}
                        onChange={(e) => setNewUnit({ ...newUnit, sqm: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rent">Monthly Rent ({building.currency})</Label>
                      <Input
                        id="rent"
                        type="number"
                        value={newUnit.rent}
                        onChange={(e) => setNewUnit({ ...newUnit, rent: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newUnit.status}
                        onValueChange={(value: any) => setNewUnit({ ...newUnit, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacant">Vacant</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newUnit.status === "occupied" && (
                      <div className="space-y-2">
                        <Label htmlFor="tenantName">Tenant Name</Label>
                        <Input
                          id="tenantName"
                          placeholder="John Doe"
                          value={newUnit.tenant_name}
                          onChange={(e) => setNewUnit({ ...newUnit, tenant_name: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  <Button onClick={handleAddUnit} className="w-full">
                    Add Unit
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {units.length === 0 ? (
              <div className="text-center py-12">
                <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Units Yet</h3>
                <p className="text-muted-foreground mb-4">Start by adding units to this building</p>
                <Button onClick={() => setIsAddUnitOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Unit
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {units.map((unit: any) => (
                  <div
                    key={unit.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
                        <Home className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Unit {unit.number}</div>
                        <div className="text-sm text-muted-foreground">
                          Floor {unit.floor} • {unit.bedrooms} bed / {unit.bathrooms} bath • {unit.sqm} sqm
                        </div>
                        {unit.status === "occupied" && unit.tenant_name && (
                          <div className="text-sm text-muted-foreground mt-1">Tenant: {unit.tenant_name}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">
                          {building.currency} {unit.rent.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                      <Badge
                        variant={unit.status === "occupied" ? "default" : "secondary"}
                        className={unit.status === "occupied" ? "bg-green-600" : ""}
                      >
                        {unit.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingUnit(unit)
                          setIsEditUnitOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Unit Dialog */}
        <Dialog open={isEditUnitOpen} onOpenChange={setIsEditUnitOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Unit</DialogTitle>
              <DialogDescription>Update unit information</DialogDescription>
            </DialogHeader>
            {editingUnit && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="editUnitNumber">Unit Number</Label>
                  <Input
                    id="editUnitNumber"
                    value={editingUnit.number}
                    onChange={(e) => setEditingUnit({ ...editingUnit, number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editFloor">Floor</Label>
                  <Input
                    id="editFloor"
                    type="number"
                    value={editingUnit.floor}
                    onChange={(e) => setEditingUnit({ ...editingUnit, floor: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editBedrooms">Bedrooms</Label>
                  <Input
                    id="editBedrooms"
                    type="number"
                    value={editingUnit.bedrooms}
                    onChange={(e) => setEditingUnit({ ...editingUnit, bedrooms: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editBathrooms">Bathrooms</Label>
                  <Input
                    id="editBathrooms"
                    type="number"
                    value={editingUnit.bathrooms}
                    onChange={(e) => setEditingUnit({ ...editingUnit, bathrooms: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editSqm">Size (sqm)</Label>
                  <Input
                    id="editSqm"
                    type="number"
                    value={editingUnit.sqm}
                    onChange={(e) => setEditingUnit({ ...editingUnit, sqm: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editRent">Monthly Rent ({building.currency})</Label>
                  <Input
                    id="editRent"
                    type="number"
                    value={editingUnit.rent}
                    onChange={(e) => setEditingUnit({ ...editingUnit, rent: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select
                    value={editingUnit.status}
                    onValueChange={(value: any) => setEditingUnit({ ...editingUnit, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacant">Vacant</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingUnit.status === "occupied" && (
                  <div className="space-y-2">
                    <Label htmlFor="editTenantName">Tenant Name</Label>
                    <Input
                      id="editTenantName"
                      value={editingUnit.tenant_name || ""}
                      onChange={(e) => setEditingUnit({ ...editingUnit, tenant_name: e.target.value })}
                    />
                  </div>
                )}
              </div>
            )}
            <Button onClick={handleEditUnit} className="w-full">
              Update Unit
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
