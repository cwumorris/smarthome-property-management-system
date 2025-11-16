"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Wifi, Tv, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

export default function SubscriptionsPage() {
  const [user, setUser] = useState<any>(null)
  const [activeSubscriptions, setActiveSubscriptions] = useState([
    {
      id: "mysub-001",
      type: "internet",
      name: "Premium Fiber 100Mbps",
      provider: "Ghana Telecom",
      price: 250,
      status: "active",
      next_billing: "2025-12-15",
    },
  ])
  const { toast } = useToast()
  const [showManageModal, setShowManageModal] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null)

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const availablePackages = [
    {
      id: "sub-001",
      name: "Premium Fiber 100Mbps",
      provider: "Ghana Telecom",
      category: "internet",
      price: 250,
      features: ["100Mbps Speed", "Unlimited Data", "Free Router", "24/7 Support"],
    },
    {
      id: "sub-002",
      name: "Basic Fiber 50Mbps",
      provider: "Ghana Telecom",
      category: "internet",
      price: 150,
      features: ["50Mbps Speed", "Unlimited Data", "24/7 Support"],
    },
    {
      id: "sub-003",
      name: "Premium Cable TV",
      provider: "MultiChoice",
      category: "cable",
      price: 180,
      features: ["150+ Channels", "HD Quality", "DVR Service", "Sports Package"],
    },
    {
      id: "sub-004",
      name: "Basic Cable TV",
      provider: "MultiChoice",
      category: "cable",
      price: 90,
      features: ["80+ Channels", "HD Quality"],
    },
  ]

  const handleSubscribe = (pkg: any) => {
    setActiveSubscriptions([
      ...activeSubscriptions,
      {
        id: `mysub-${Date.now()}`,
        type: pkg.category,
        name: pkg.name,
        provider: pkg.provider,
        price: pkg.price,
        status: "active",
        next_billing: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    ])
    toast({
      title: "Subscription Activated!",
      description: `You've successfully subscribed to ${pkg.name}. Service will be activated within 24 hours.`,
    })
  }

  const handleCancelSubscription = (subId: string) => {
    setActiveSubscriptions(activeSubscriptions.filter((s) => s.id !== subId))
    setShowManageModal(false)
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription has been cancelled. Access will continue until the end of the billing period.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Subscriptions & Services</h1>
          <p className="text-muted-foreground">Manage your internet, cable, and media subscriptions</p>
        </div>

        {/* Active Subscriptions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Active Subscriptions</h2>
          {activeSubscriptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeSubscriptions.map((sub) => (
                <Card key={sub.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-3 rounded-lg ${sub.type === "internet" ? "bg-blue-50 dark:bg-blue-950" : "bg-purple-50 dark:bg-purple-950"}`}
                        >
                          {sub.type === "internet" ? (
                            <Wifi className="h-6 w-6 text-blue-600" />
                          ) : (
                            <Tv className="h-6 w-6 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{sub.name}</CardTitle>
                          <CardDescription>{sub.provider}</CardDescription>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold">GHS {sub.price}</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Next Billing</div>
                        <div className="font-semibold">{new Date(sub.next_billing).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          setSelectedSubscription(sub)
                          setShowManageModal(true)
                        }}
                      >
                        Manage
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => {
                          setSelectedSubscription(sub)
                          handleCancelSubscription(sub.id)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No active subscriptions. Browse available packages below.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Available Packages */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {availablePackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`p-3 rounded-lg ${pkg.category === "internet" ? "bg-blue-50 dark:bg-blue-950" : "bg-purple-50 dark:bg-purple-950"}`}
                    >
                      {pkg.category === "internet" ? (
                        <Wifi className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Tv className="h-6 w-6 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.provider}</CardDescription>
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">GHS {pkg.price}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => handleSubscribe(pkg)}
                    disabled={activeSubscriptions.some((s) => s.name === pkg.name)}
                  >
                    {activeSubscriptions.some((s) => s.name === pkg.name) ? "Already Subscribed" : "Subscribe Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Manage Subscription Modal */}
        <Dialog open={showManageModal} onOpenChange={setShowManageModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Subscription</DialogTitle>
              <DialogDescription>View and update your subscription details</DialogDescription>
            </DialogHeader>
            {selectedSubscription && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div
                    className={`p-4 rounded-lg ${selectedSubscription.type === "internet" ? "bg-blue-50 dark:bg-blue-950" : "bg-purple-50 dark:bg-purple-950"}`}
                  >
                    {selectedSubscription.type === "internet" ? (
                      <Wifi className="h-8 w-8 text-blue-600" />
                    ) : (
                      <Tv className="h-8 w-8 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{selectedSubscription.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedSubscription.provider}</p>
                  </div>
                  <Badge>Active</Badge>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Monthly Price</span>
                      <span className="font-semibold">GHS {selectedSubscription.price}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Next Billing Date</span>
                      <span className="font-semibold">
                        {new Date(selectedSubscription.next_billing).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Status</span>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Auto-Renewal</span>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Usage Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSubscription.type === "internet" ? (
                      <div className="space-y-3">
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Data Used This Month</span>
                          <span className="font-semibold">Unlimited</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Average Speed</span>
                          <span className="font-semibold">95 Mbps</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Channels Watched</span>
                          <span className="font-semibold">42 channels</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Most Watched</span>
                          <span className="font-semibold">Sports & News</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                variant="destructive"
                onClick={() => selectedSubscription && handleCancelSubscription(selectedSubscription.id)}
              >
                Cancel Subscription
              </Button>
              <Button onClick={() => setShowManageModal(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
