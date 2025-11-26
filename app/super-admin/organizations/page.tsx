"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Plus, Search, Settings, Eye } from "lucide-react"
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data"
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

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [organizations] = useState(MOCK_ORGANIZATIONS)
  const [selectedOrg, setSelectedOrg] = useState<(typeof MOCK_ORGANIZATIONS)[0] | null>(null)

  const filteredOrgs = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            <p className="text-muted-foreground">Manage all property management companies on the platform</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Organization</DialogTitle>
                <DialogDescription>Add a new property management company to the platform</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" placeholder="Acme Properties" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Subdomain Slug</Label>
                    <Input id="slug" placeholder="acme" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="info@acme.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+233 XXX XXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main Street, City" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan</Label>
                    <Select defaultValue="starter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="GHS">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GHS">GHS - Ghanaian Cedi</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Organization</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrgs.map((org) => (
            <Card key={org.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      <CardDescription className="text-sm">{org.slug}.yourdomain.com</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    <Badge variant={org.plan === "enterprise" ? "default" : "secondary"} className="capitalize">
                      {org.plan}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={org.status === "active" ? "default" : "destructive"} className="capitalize">
                      {org.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{org.email}</p>
                    <p className="text-muted-foreground">{org.phone}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => setSelectedOrg(org)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{selectedOrg?.name}</DialogTitle>
                          <DialogDescription>Organization details and settings</DialogDescription>
                        </DialogHeader>
                        {selectedOrg && (
                          <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-muted-foreground">Organization ID</Label>
                                <p className="font-mono text-sm">{selectedOrg.id}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Subdomain</Label>
                                <p className="text-sm">{selectedOrg.slug}.yourdomain.com</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Email</Label>
                                <p className="text-sm">{selectedOrg.email}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Phone</Label>
                                <p className="text-sm">{selectedOrg.phone}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Plan</Label>
                                <Badge className="capitalize">{selectedOrg.plan}</Badge>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Status</Label>
                                <Badge variant={selectedOrg.status === "active" ? "default" : "destructive"}>
                                  {selectedOrg.status}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Address</Label>
                              <p className="text-sm">{selectedOrg.address}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-muted-foreground">Currency</Label>
                                <p className="text-sm">{selectedOrg.currency}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Timezone</Label>
                                <p className="text-sm">{selectedOrg.timezone}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
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
