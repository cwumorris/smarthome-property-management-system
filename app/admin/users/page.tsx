"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { requireAuth } from "@/lib/auth"
import { Plus, Edit, Trash2, Shield, Search } from "lucide-react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const MOCK_USERS = [
  {
    id: "u-001",
    name: "Super Admin",
    email: "admin@sloane.com",
    role: "super_admin",
    status: "active",
    building: "All Buildings",
  },
  {
    id: "u-002",
    name: "Property Manager",
    email: "property@sloane.com",
    role: "property_admin",
    status: "active",
    building: "Sakumono Heights",
  },
  {
    id: "u-003",
    name: "John Tenant",
    email: "tenant@sloane.com",
    role: "tenant",
    status: "active",
    building: "Sakumono Heights",
  },
  {
    id: "u-004",
    name: "Fix-It Services",
    email: "vendor@sloane.com",
    role: "vendor",
    status: "active",
    building: "All Buildings",
  },
  {
    id: "u-005",
    name: "Jane Concierge",
    email: "concierge@sloane.com",
    role: "concierge",
    status: "active",
    building: "Tema Gardens",
  },
]

const ROLE_COLORS: Record<string, string> = {
  super_admin: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  property_admin: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  tenant: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  vendor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  concierge: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
}

interface CustomPermission {
  module: string
  actions: string[]
}

export default function UsersPage() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState(MOCK_USERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false)
  const [selectedUserForPermissions, setSelectedUserForPermissions] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "tenant",
    building: "",
  })

  useEffect(() => {
    const currentUser = requireAuth(["super_admin", "property_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditUser = (userData: any) => {
    setEditingUser(userData)
    setNewUser({
      name: userData.name,
      email: userData.email,
      role: userData.role,
      building: userData.building,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = () => {
    const updatedUsers = users.map((u) =>
      u.id === editingUser.id
        ? {
            ...u,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            building: newUser.building,
          }
        : u,
    )
    setUsers(updatedUsers)
    setIsEditDialogOpen(false)
    setEditingUser(null)
    setNewUser({ name: "", email: "", role: "tenant", building: "" })
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

  const handleToggleStatus = (userId: string) => {
    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u,
    )
    setUsers(updatedUsers)
  }

  const handleAddUser = () => {
    const newUserData = {
      id: `u-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      building: newUser.building || "All Buildings",
    }
    setUsers([...users, newUserData])
    setIsAddDialogOpen(false)
    setNewUser({ name: "", email: "", role: "tenant", building: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage users and their roles</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Full Name</Label>
                  <Input
                    id="userName"
                    placeholder="John Doe"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="concierge">Concierge</SelectItem>
                      <SelectItem value="property_admin">Property Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userBuilding">Building Assignment</Label>
                  <Input
                    id="userBuilding"
                    placeholder="Building name or 'All Buildings'"
                    value={newUser.building}
                    onChange={(e) => setNewUser({ ...newUser, building: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddUser} className="w-full">
                Add User
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Building</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((userData) => (
                  <TableRow key={userData.id}>
                    <TableCell className="font-medium">{userData.name}</TableCell>
                    <TableCell>{userData.email}</TableCell>
                    <TableCell>
                      <Badge className={ROLE_COLORS[userData.role]}>{userData.role.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>{userData.building}</TableCell>
                    <TableCell>
                      <Badge variant={userData.status === "active" ? "default" : "secondary"}>{userData.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUserForPermissions(userData)
                            setIsPermissionsDialogOpen(true)
                          }}
                          title="Manage Permissions"
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(userData)} title="Edit User">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(userData.id)}
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editUserName">Full Name</Label>
                <Input
                  id="editUserName"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editUserEmail">Email</Label>
                <Input
                  id="editUserEmail"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editUserRole">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="concierge">Concierge</SelectItem>
                    <SelectItem value="property_admin">Property Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editUserBuilding">Building Assignment</Label>
                <Input
                  id="editUserBuilding"
                  value={newUser.building}
                  onChange={(e) => setNewUser({ ...newUser, building: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdateUser} className="flex-1">
                Update User
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false)
                  setEditingUser(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Custom Permissions Dialog */}
        <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Permissions - {selectedUserForPermissions?.name}</DialogTitle>
              <DialogDescription>Customize user permissions for specific modules</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {[
                { module: "Buildings", actions: ["View", "Create", "Edit", "Delete"] },
                { module: "Users", actions: ["View", "Create", "Edit", "Delete"] },
                { module: "Tickets", actions: ["View", "Create", "Assign", "Close"] },
                { module: "Payments", actions: ["View", "Process", "Refund"] },
                { module: "Reports", actions: ["View", "Export", "Schedule"] },
              ].map((permission) => (
                <div key={permission.module} className="border rounded-lg p-4">
                  <div className="font-semibold mb-3">{permission.module}</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {permission.actions.map((action) => (
                      <label key={action} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked={action === "View"} />
                        <span className="text-sm">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={() => setIsPermissionsDialogOpen(false)} className="w-full">
              Save Permissions
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
