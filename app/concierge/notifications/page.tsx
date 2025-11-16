"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { requireAuth } from "@/lib/auth"
import { Bell, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function NotificationsPage() {
  const [user, setUser] = useState<any>(null)
  const [notification, setNotification] = useState({
    recipient: "",
    subject: "",
    message: "",
    channels: {
      email: true,
      sms: false,
      push: true,
    },
  })
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["concierge", "property_admin", "super_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const handleSendNotification = () => {
    if (!notification.recipient || !notification.subject || !notification.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Notification Sent",
      description: `Message sent successfully to ${notification.recipient}`,
    })

    setNotification({
      recipient: "",
      subject: "",
      message: "",
      channels: { email: true, sms: false, push: true },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Send Notifications</h1>
          <p className="text-muted-foreground">Notify tenants about packages, deliveries, or updates</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Compose Notification
            </CardTitle>
            <CardDescription>Send messages to tenants via multiple channels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient *</Label>
              <Select
                value={notification.recipient}
                onValueChange={(value) => setNotification({ ...notification, recipient: value })}
              >
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A101">Unit A101 - John Tenant</SelectItem>
                  <SelectItem value="A204">Unit A204 - Jane Smith</SelectItem>
                  <SelectItem value="B102">Unit B102 - John Doe</SelectItem>
                  <SelectItem value="C301">Unit C301 - Mary Johnson</SelectItem>
                  <SelectItem value="all">All Tenants (Building Wide)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g., Package Arrival Notification"
                value={notification.subject}
                onChange={(e) => setNotification({ ...notification, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here..."
                rows={6}
                value={notification.message}
                onChange={(e) => setNotification({ ...notification, message: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <Label>Notification Channels</Label>
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">Email</div>
                    <div className="text-xs text-muted-foreground">Send via email notification</div>
                  </div>
                  <Switch
                    checked={notification.channels.email}
                    onCheckedChange={(checked) =>
                      setNotification({
                        ...notification,
                        channels: { ...notification.channels, email: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">SMS</div>
                    <div className="text-xs text-muted-foreground">Send via text message</div>
                  </div>
                  <Switch
                    checked={notification.channels.sms}
                    onCheckedChange={(checked) =>
                      setNotification({
                        ...notification,
                        channels: { ...notification.channels, sms: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">Push Notification</div>
                    <div className="text-xs text-muted-foreground">Send via mobile app push</div>
                  </div>
                  <Switch
                    checked={notification.channels.push}
                    onCheckedChange={(checked) =>
                      setNotification({
                        ...notification,
                        channels: { ...notification.channels, push: checked },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSendNotification} className="w-full" size="lg">
              <Send className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Templates</CardTitle>
            <CardDescription>Pre-written messages for common notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  setNotification({
                    ...notification,
                    subject: "Package Arrival",
                    message:
                      "You have a package waiting for pickup at the mailroom. Please collect it during office hours (9 AM - 6 PM).",
                  })
                }
              >
                Package Arrival Template
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  setNotification({
                    ...notification,
                    subject: "Delivery Reminder",
                    message:
                      "Your package has been in the mailroom for 3 days. Please collect it as soon as possible to avoid storage fees.",
                  })
                }
              >
                Collection Reminder Template
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  setNotification({
                    ...notification,
                    subject: "Visitor Waiting",
                    message: "You have a visitor waiting at the lobby. Please come down or authorize entry.",
                  })
                }
              >
                Visitor Alert Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
