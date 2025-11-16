"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requireAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function ServiceProviderSettings() {
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    name: "Fix-It Services",
    email: "service@sloane.com",
    phone: "+233 24 555 0123",
    company: "Fix-It Services Ltd",
    bio: "Professional maintenance and repair services with 10+ years of experience.",
    specialties: ["Plumbing", "Electrical", "HVAC"],
    license_number: "GH-MAINT-2024-001",
    insurance: "Active until Dec 2025",
  })

  const [preferences, setPreferences] = useState({
    job_radius: 10,
    auto_accept_jobs: false,
    email_notifications: true,
    sms_notifications: true,
    push_notifications: true,
  })

  const [newSpecialty, setNewSpecialty] = useState("")

  useEffect(() => {
    const currentUser = requireAuth(["service_provider"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been saved successfully.",
    })
  }

  const addSpecialty = () => {
    if (newSpecialty && !profile.specialties.includes(newSpecialty)) {
      setProfile({ ...profile, specialties: [...profile.specialties, newSpecialty] })
      setNewSpecialty("")
    }
  }

  const removeSpecialty = (specialty: string) => {
    setProfile({ ...profile, specialties: profile.specialties.filter((s) => s !== specialty) })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="payment">Payment Info</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your business profile and specialties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Specialties</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a specialty"
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
                    />
                    <Button onClick={addSpecialty}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty) => (
                      <Badge key={specialty} className="flex items-center gap-1">
                        {specialty}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpecialty(specialty)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={profile.license_number}
                      onChange={(e) => setProfile({ ...profile, license_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance">Insurance Status</Label>
                    <Input
                      id="insurance"
                      value={profile.insurance}
                      onChange={(e) => setProfile({ ...profile, insurance: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile}>Save Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>Configure how you receive and manage jobs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Accept Jobs</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically accept jobs matching your specialties
                      </p>
                    </div>
                    <Switch
                      checked={preferences.auto_accept_jobs}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, auto_accept_jobs: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive job alerts via email</p>
                    </div>
                    <Switch
                      checked={preferences.email_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, email_notifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive job alerts via SMS</p>
                    </div>
                    <Switch
                      checked={preferences.sms_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, sms_notifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications for new jobs</p>
                    </div>
                    <Switch
                      checked={preferences.push_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, push_notifications: checked })}
                    />
                  </div>
                </div>

                <Button onClick={handleSavePreferences}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Manage your payment details for receiving earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input id="bank_name" placeholder="Enter bank name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input id="account_number" placeholder="Enter account number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_name">Account Name</Label>
                  <Input id="account_name" placeholder="Enter account name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile_money">Mobile Money Number (Optional)</Label>
                  <Input id="mobile_money" placeholder="Enter mobile money number" />
                </div>

                <Button>Save Payment Info</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
