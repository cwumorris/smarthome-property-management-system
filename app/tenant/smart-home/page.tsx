"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import {
  Lock,
  Thermometer,
  Zap,
  Lightbulb,
  Activity,
  Power,
  Plus,
  Calendar,
  TrendingUp,
  TrendingDown,
  Download,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SmartHomePage() {
  const [user, setUser] = useState<any>(null)
  const [devices, setDevices] = useState([
    { id: "dev-001", name: "Front Door Lock", type: "lock", status: "locked", battery: 85, online: true },
    {
      id: "dev-002",
      name: "Living Room Thermostat",
      type: "thermostat",
      status: "auto",
      currentTemp: 22,
      targetTemp: 23,
      online: true,
      schedule: [
        { day: "Monday", time: "06:00", temp: 22, mode: "heat" },
        { day: "Monday", time: "22:00", temp: 19, mode: "sleep" },
      ],
    },
    { id: "dev-003", name: "Energy Monitor", type: "energy", usage: 2.4, status: "monitoring", online: true },
    { id: "dev-004", name: "Bedroom Lights", type: "light", status: "off", brightness: 0, online: true },
  ])
  const [automations, setAutomations] = useState([
    {
      id: "auto-001",
      name: "Good Night Mode",
      description: "Lock door, turn off lights at 11 PM",
      enabled: true,
      trigger: { type: "time", value: "23:00" },
      actions: [
        { device: "dev-001", action: "lock" },
        { device: "dev-004", action: "off" },
      ],
    },
    {
      id: "auto-002",
      name: "Energy Saver",
      description: "Adjust thermostat when away",
      enabled: true,
      trigger: { type: "presence", value: "away" },
      actions: [{ device: "dev-002", action: "setTemp", value: 18 }],
    },
  ])
  const { toast } = useToast()

  const [showAutomationModal, setShowAutomationModal] = useState(false)
  const [showEnergyReportModal, setShowEnergyReportModal] = useState(false)
  const [showThermostatScheduleModal, setShowThermostatScheduleModal] = useState(false)
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    trigger: { type: "time", value: "" },
    actions: [] as any[],
  })
  const [scheduleEntries, setScheduleEntries] = useState<any[]>([])

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const toggleDevice = (id: string) => {
    setDevices(
      devices.map((d) => {
        if (d.id === id) {
          if (d.type === "lock") {
            const newStatus = d.status === "locked" ? "unlocked" : "locked"
            toast({ title: `Door ${newStatus}`, description: `Front door has been ${newStatus}` })
            return { ...d, status: newStatus }
          } else if (d.type === "light") {
            const newStatus = d.status === "on" ? "off" : "on"
            return { ...d, status: newStatus, brightness: newStatus === "on" ? 75 : 0 }
          }
        }
        return d
      }),
    )
  }

  const handleCreateAutomation = () => {
    if (!newAutomation.name || !newAutomation.trigger.value) {
      toast({ title: "Missing fields", description: "Please fill all required fields", variant: "destructive" })
      return
    }

    const automation = {
      id: `auto-${Date.now()}`,
      name: newAutomation.name,
      description: `Custom automation`,
      enabled: true,
      trigger: newAutomation.trigger,
      actions: newAutomation.actions,
    }

    setAutomations([...automations, automation])
    setShowAutomationModal(false)
    setNewAutomation({ name: "", trigger: { type: "time", value: "" }, actions: [] })
    toast({ title: "Automation Created!", description: "Your new automation has been saved." })
  }

  const handleSaveThermostatSchedule = () => {
    const thermostat = devices.find((d) => d.type === "thermostat")
    if (thermostat) {
      setDevices(
        devices.map((d) =>
          d.id === thermostat.id
            ? {
                ...d,
                schedule: scheduleEntries,
              }
            : d,
        ),
      )
      setShowThermostatScheduleModal(false)
      toast({ title: "Schedule Saved!", description: "Thermostat schedule has been updated." })
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "lock":
        return Lock
      case "thermostat":
        return Thermometer
      case "energy":
        return Zap
      case "light":
        return Lightbulb
      default:
        return Activity
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Smart Home</h1>
          <p className="text-muted-foreground">Control your smart devices and monitor energy usage</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Devices</div>
                  <div className="text-3xl font-bold">{devices.length}</div>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Online</div>
                  <div className="text-3xl font-bold text-green-600">{devices.filter((d) => d.online).length}</div>
                </div>
                <Power className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Current Usage</div>
                  <div className="text-3xl font-bold">2.4 kW</div>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Temperature</div>
                  <div className="text-3xl font-bold">22°C</div>
                </div>
                <Thermometer className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devices.map((device) => {
            const Icon = getDeviceIcon(device.type)
            return (
              <Card key={device.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-3 rounded-lg ${device.online ? "bg-blue-50 dark:bg-blue-950" : "bg-gray-50 dark:bg-gray-950"}`}
                      >
                        <Icon className={`h-6 w-6 ${device.online ? "text-blue-600" : "text-gray-400"}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{device.name}</CardTitle>
                        <CardDescription className="capitalize">{device.type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={device.online ? "default" : "secondary"}>
                      {device.online ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {device.type === "lock" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <span className="font-medium">Status</span>
                        <Badge variant={device.status === "locked" ? "default" : "secondary"}>{device.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <span className="font-medium">Battery</span>
                        <span>{device.battery}%</span>
                      </div>
                      <Button
                        className="w-full"
                        variant={device.status === "locked" ? "default" : "destructive"}
                        onClick={() => toggleDevice(device.id)}
                      >
                        {device.status === "locked" ? "Unlock" : "Lock"}
                      </Button>
                    </div>
                  )}

                  {device.type === "thermostat" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <span className="font-medium">Current</span>
                        <span className="text-xl font-bold">{device.currentTemp}°C</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Target Temperature</span>
                          <span className="font-bold">{device.targetTemp}°C</span>
                        </div>
                        <Slider defaultValue={[device.targetTemp]} max={30} min={16} step={1} />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => {
                          setScheduleEntries(device.schedule || [])
                          setShowThermostatScheduleModal(true)
                        }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Configure Schedule
                      </Button>
                    </div>
                  )}

                  {device.type === "energy" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Current Usage</div>
                        <div className="text-4xl font-bold text-yellow-600">{device.usage} kW</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border rounded-lg">
                          <div className="text-xs text-muted-foreground">Today</div>
                          <div className="text-xl font-bold">32.5 kWh</div>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="text-xs text-muted-foreground">This Month</div>
                          <div className="text-xl font-bold">320 kWh</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setShowEnergyReportModal(true)}
                      >
                        <TrendingUp className="mr-2 h-4 w-4" />
                        View Detailed Report
                      </Button>
                    </div>
                  )}

                  {device.type === "light" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <span className="font-medium">Power</span>
                        <Switch checked={device.status === "on"} onCheckedChange={() => toggleDevice(device.id)} />
                      </div>
                      {device.status === "on" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Brightness</span>
                            <span>{device.brightness}%</span>
                          </div>
                          <Slider defaultValue={[device.brightness]} max={100} min={0} step={5} />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Automation Section */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Automations</CardTitle>
                <CardDescription>Schedule and automate your devices</CardDescription>
              </div>
              <Button onClick={() => setShowAutomationModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {automations.map((auto) => (
                <div key={auto.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{auto.name}</div>
                    <div className="text-sm text-muted-foreground">{auto.description}</div>
                  </div>
                  <Switch
                    checked={auto.enabled}
                    onCheckedChange={(checked) =>
                      setAutomations(automations.map((a) => (a.id === auto.id ? { ...a, enabled: checked } : a)))
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={showAutomationModal} onOpenChange={setShowAutomationModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Automation</DialogTitle>
              <DialogDescription>Set up rules to automate your smart home devices</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="auto-name">Automation Name</Label>
                <Input
                  id="auto-name"
                  placeholder="e.g., Morning Routine"
                  value={newAutomation.name}
                  onChange={(e) => setNewAutomation({ ...newAutomation, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Trigger Type</Label>
                <Select
                  value={newAutomation.trigger.type}
                  onValueChange={(value) =>
                    setNewAutomation({ ...newAutomation, trigger: { ...newAutomation.trigger, type: value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Time of Day</SelectItem>
                    <SelectItem value="presence">Presence</SelectItem>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="device">Device State</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newAutomation.trigger.type === "time" && (
                <div className="space-y-2">
                  <Label htmlFor="trigger-time">Time</Label>
                  <Input
                    id="trigger-time"
                    type="time"
                    value={newAutomation.trigger.value}
                    onChange={(e) =>
                      setNewAutomation({
                        ...newAutomation,
                        trigger: { ...newAutomation.trigger, value: e.target.value },
                      })
                    }
                  />
                </div>
              )}

              {newAutomation.trigger.type === "presence" && (
                <div className="space-y-2">
                  <Label>Presence State</Label>
                  <Select
                    value={newAutomation.trigger.value}
                    onValueChange={(value) =>
                      setNewAutomation({ ...newAutomation, trigger: { ...newAutomation.trigger, value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="away">When I Leave</SelectItem>
                      <SelectItem value="home">When I Arrive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    Select devices and actions to perform when triggered
                  </div>
                  <div className="space-y-2">
                    {devices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{device.name}</span>
                        <Select
                          onValueChange={(action) => {
                            const newActions = [...newAutomation.actions]
                            const existingIndex = newActions.findIndex((a) => a.device === device.id)
                            if (existingIndex >= 0) {
                              newActions[existingIndex] = { device: device.id, action }
                            } else {
                              newActions.push({ device: device.id, action })
                            }
                            setNewAutomation({ ...newAutomation, actions: newActions })
                          }}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Action" />
                          </SelectTrigger>
                          <SelectContent>
                            {device.type === "lock" && (
                              <>
                                <SelectItem value="lock">Lock</SelectItem>
                                <SelectItem value="unlock">Unlock</SelectItem>
                              </>
                            )}
                            {device.type === "light" && (
                              <>
                                <SelectItem value="on">Turn On</SelectItem>
                                <SelectItem value="off">Turn Off</SelectItem>
                              </>
                            )}
                            {device.type === "thermostat" && (
                              <>
                                <SelectItem value="heat">Heat</SelectItem>
                                <SelectItem value="cool">Cool</SelectItem>
                                <SelectItem value="auto">Auto</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAutomationModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAutomation}>Create Automation</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showEnergyReportModal} onOpenChange={setShowEnergyReportModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detailed Energy Report</DialogTitle>
              <DialogDescription>Comprehensive energy usage analysis for your unit</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="overview" className="py-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="daily">Daily Usage</TabsTrigger>
                <TabsTrigger value="devices">By Device</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">This Month</div>
                      <div className="text-2xl font-bold">320 kWh</div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingDown className="h-4 w-4" />
                        <span>12% less</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Last Month</div>
                      <div className="text-2xl font-bold">364 kWh</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Estimated Cost</div>
                      <div className="text-2xl font-bold">GHS 45</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Peak Hour</div>
                      <div className="text-2xl font-bold">8 PM</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { month: "November", usage: 320, cost: 45, trend: -12 },
                        { month: "October", usage: 364, cost: 51, trend: 5 },
                        { month: "September", usage: 346, cost: 48, trend: -8 },
                        { month: "August", usage: 376, cost: 52, trend: 3 },
                      ].map((data, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{data.month}</div>
                            <div className="text-sm text-muted-foreground">
                              {data.usage} kWh • GHS {data.cost}
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm ${data.trend < 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {data.trend < 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                            <span>{Math.abs(data.trend)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="daily" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Last 7 Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { day: "Today", usage: 10.5, cost: 1.47 },
                        { day: "Yesterday", usage: 11.2, cost: 1.57 },
                        { day: "2 days ago", usage: 9.8, cost: 1.37 },
                        { day: "3 days ago", usage: 12.1, cost: 1.69 },
                        { day: "4 days ago", usage: 10.9, cost: 1.53 },
                        { day: "5 days ago", usage: 11.5, cost: 1.61 },
                        { day: "6 days ago", usage: 10.3, cost: 1.44 },
                      ].map((data, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{data.day}</span>
                          <div className="text-right">
                            <div className="font-bold">{data.usage} kWh</div>
                            <div className="text-sm text-muted-foreground">GHS {data.cost}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="devices" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage by Device</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { device: "Air Conditioning", usage: 185, percentage: 58 },
                        { device: "Water Heater", usage: 65, percentage: 20 },
                        { device: "Lighting", usage: 40, percentage: 13 },
                        { device: "Refrigerator", usage: 20, percentage: 6 },
                        { device: "Others", usage: 10, percentage: 3 },
                      ].map((data, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{data.device}</span>
                            <div className="text-right">
                              <div className="font-bold">{data.usage} kWh</div>
                              <div className="text-sm text-muted-foreground">{data.percentage}%</div>
                            </div>
                          </div>
                          <div className="h-2 bg-accent rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${data.percentage}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowEnergyReportModal(false)}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={() => setShowEnergyReportModal(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showThermostatScheduleModal} onOpenChange={setShowThermostatScheduleModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configure Thermostat Schedule</DialogTitle>
              <DialogDescription>Set temperature schedules for different times and days</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <Label>Schedule Entries</Label>
                <Button
                  size="sm"
                  onClick={() =>
                    setScheduleEntries([...scheduleEntries, { day: "Monday", time: "08:00", temp: 22, mode: "auto" }])
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Entry
                </Button>
              </div>

              <div className="space-y-3">
                {scheduleEntries.map((entry, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Day</Label>
                          <Select
                            value={entry.day}
                            onValueChange={(value) => {
                              const updated = [...scheduleEntries]
                              updated[idx].day = value
                              setScheduleEntries(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                                (day) => (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Time</Label>
                          <Input
                            type="time"
                            value={entry.time}
                            onChange={(e) => {
                              const updated = [...scheduleEntries]
                              updated[idx].time = e.target.value
                              setScheduleEntries(updated)
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Temperature (°C)</Label>
                          <Input
                            type="number"
                            min={16}
                            max={30}
                            value={entry.temp}
                            onChange={(e) => {
                              const updated = [...scheduleEntries]
                              updated[idx].temp = Number.parseInt(e.target.value)
                              setScheduleEntries(updated)
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Mode</Label>
                          <Select
                            value={entry.mode}
                            onValueChange={(value) => {
                              const updated = [...scheduleEntries]
                              updated[idx].mode = value
                              setScheduleEntries(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto</SelectItem>
                              <SelectItem value="heat">Heat</SelectItem>
                              <SelectItem value="cool">Cool</SelectItem>
                              <SelectItem value="sleep">Sleep</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setScheduleEntries(scheduleEntries.filter((_, i) => i !== idx))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {scheduleEntries.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No schedule entries. Click "Add Entry" to create one.
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowThermostatScheduleModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveThermostatSchedule}>Save Schedule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
