"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import {
  Refrigerator,
  Lightbulb,
  Bell,
  Camera,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Power,
  Eye,
  EyeOff,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomeAssistantPage() {
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()
  const [refrigeratorItems, setRefrigeratorItems] = useState([
    { id: 1, name: "Milk", expiry: "2025-12-18", status: "warning", daysLeft: 3 },
    { id: 2, name: "Eggs", expiry: "2025-12-20", status: "ok", daysLeft: 5 },
    { id: 3, name: "Cheese", expiry: "2025-12-16", status: "critical", daysLeft: 1 },
    { id: 4, name: "Yogurt", expiry: "2025-12-17", status: "warning", daysLeft: 2 },
    { id: 5, name: "Chicken", expiry: "2025-12-22", status: "ok", daysLeft: 7 },
  ])

  const [lights, setLights] = useState([
    { id: 1, name: "Living Room", zone: "main", status: true, brightness: 80 },
    { id: 2, name: "Bedroom", zone: "bedroom", status: false, brightness: 60 },
    { id: 3, name: "Kitchen", zone: "kitchen", status: true, brightness: 100 },
    { id: 4, name: "Bathroom", zone: "bathroom", status: false, brightness: 70 },
    { id: 5, name: "Hallway", zone: "main", status: true, brightness: 50 },
  ])

  const [alarms, setAlarms] = useState([
    { id: 1, type: "motion", location: "Front Door", status: "armed", lastTriggered: "Never" },
    { id: 2, type: "smoke", location: "Kitchen", status: "active", lastTriggered: "Never" },
    { id: 3, type: "water_leak", location: "Bathroom", status: "active", lastTriggered: "Never" },
    { id: 4, type: "window", location: "Bedroom Window", status: "armed", lastTriggered: "Never" },
  ])

  const [cameras, setCameras] = useState([
    { id: 1, name: "Front Door", location: "Entrance", status: "recording", liveView: true },
    { id: 2, name: "Parking", location: "Garage", status: "recording", liveView: true },
    { id: 3, name: "Back Yard", location: "Garden", status: "standby", liveView: false },
  ])

  const [climate, setClimate] = useState({
    temperature: 24,
    humidity: 55,
    mode: "cool",
    fanSpeed: "auto",
    status: "on",
  })

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const toggleLight = (id: number) => {
    setLights(lights.map((light) => (light.id === id ? { ...light, status: !light.status } : light)))
    toast({
      title: "Light " + (lights.find((l) => l.id === id)?.status ? "Turned Off" : "Turned On"),
      description: `${lights.find((l) => l.id === id)?.name} light updated`,
    })
  }

  const toggleClimate = () => {
    setClimate({ ...climate, status: climate.status === "on" ? "off" : "on" })
    toast({
      title: climate.status === "on" ? "AC Turned Off" : "AC Turned On",
      description: "Climate control updated",
    })
  }

  const toggleCamera = (id: number) => {
    setCameras(cameras.map((camera) => (camera.id === id ? { ...camera, liveView: !camera.liveView } : camera)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Home Assistant & IoT Management</h1>
          <p className="text-muted-foreground">Monitor and control all your smart home devices from one place</p>
        </div>

        <Tabs defaultValue="fridge" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="fridge">Refrigerator</TabsTrigger>
            <TabsTrigger value="lights">Lighting</TabsTrigger>
            <TabsTrigger value="alarms">Alarms</TabsTrigger>
            <TabsTrigger value="cameras">CCTV</TabsTrigger>
            <TabsTrigger value="climate">Climate</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          {/* Refrigerator Tab */}
          <TabsContent value="fridge" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Refrigerator className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Smart Refrigerator Monitor</CardTitle>
                    <CardDescription>Track food freshness and get expiry alerts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-red-600">
                        {refrigeratorItems.filter((i) => i.status === "critical").length}
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-300">Expiring Soon</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-yellow-600">
                        {refrigeratorItems.filter((i) => i.status === "warning").length}
                      </div>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300">Watch List</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-green-600">
                        {refrigeratorItems.filter((i) => i.status === "ok").length}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Fresh Items</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {refrigeratorItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border-2 ${
                        item.status === "critical"
                          ? "bg-red-50 dark:bg-red-950 border-red-200"
                          : item.status === "warning"
                            ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-200"
                            : "bg-green-50 dark:bg-green-950 border-green-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.status === "critical" ? (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          ) : item.status === "warning" ? (
                            <Bell className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          )}
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-sm text-muted-foreground">Expires: {item.expiry}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.daysLeft} days left</div>
                          <Badge
                            variant={
                              item.status === "critical"
                                ? "destructive"
                                : item.status === "warning"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lighting Tab */}
          <TabsContent value="lights" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950">
                      <Lightbulb className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle>Smart Lighting Control</CardTitle>
                      <CardDescription>Manage all lights across your home</CardDescription>
                    </div>
                  </div>
                  <Button onClick={() => setLights(lights.map((l) => ({ ...l, status: false })))}>All Off</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lights.map((light) => (
                    <Card key={light.id} className={light.status ? "bg-yellow-50 dark:bg-yellow-950" : ""}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Lightbulb className={`h-6 w-6 ${light.status ? "text-yellow-500" : "text-gray-400"}`} />
                            <div>
                              <div className="font-semibold">{light.name}</div>
                              <div className="text-sm text-muted-foreground capitalize">{light.zone}</div>
                            </div>
                          </div>
                          <Switch checked={light.status} onCheckedChange={() => toggleLight(light.id)} />
                        </div>
                        {light.status && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Brightness</span>
                              <span className="font-semibold">{light.brightness}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full transition-all"
                                style={{ width: `${light.brightness}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alarms Tab */}
          <TabsContent value="alarms" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950">
                    <Bell className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>Security Alarms & Sensors</CardTitle>
                    <CardDescription>Monitor all security systems and alerts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alarms.map((alarm) => (
                    <Card
                      key={alarm.id}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900">
                              <Bell className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-semibold capitalize">{alarm.type.replace("_", " ")}</div>
                              <div className="text-sm text-muted-foreground">{alarm.location}</div>
                            </div>
                          </div>
                          <Badge variant={alarm.status === "armed" ? "default" : "secondary"}>{alarm.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last Triggered: <span className="font-semibold">{alarm.lastTriggered}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CCTV Tab */}
          <TabsContent value="cameras" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                    <Camera className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>CCTV Monitoring & Control</CardTitle>
                    <CardDescription>View and manage security cameras</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cameras.map((camera) => (
                    <Card key={camera.id}>
                      <CardContent className="pt-6">
                        <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                          {camera.liveView ? (
                            <>
                              <Video className="h-12 w-12 text-slate-400 animate-pulse" />
                              <Badge className="absolute top-2 right-2 bg-red-600">LIVE</Badge>
                            </>
                          ) : (
                            <EyeOff className="h-12 w-12 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="font-semibold">{camera.name}</div>
                            <div className="text-sm text-muted-foreground">{camera.location}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant={camera.status === "recording" ? "default" : "secondary"}>
                              {camera.status}
                            </Badge>
                            <Button size="sm" variant="outline" onClick={() => toggleCamera(camera.id)}>
                              {camera.liveView ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                              {camera.liveView ? "Stop" : "View"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Climate Tab */}
          <TabsContent value="climate" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                      <Thermometer className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Climate & HVAC Control</CardTitle>
                      <CardDescription>Manage temperature and air quality</CardDescription>
                    </div>
                  </div>
                  <Switch checked={climate.status === "on"} onCheckedChange={toggleClimate} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                    <CardContent className="pt-6">
                      <div className="text-center mb-6">
                        <div className="text-6xl font-bold text-blue-600">{climate.temperature}°C</div>
                        <div className="text-sm text-muted-foreground">Current Temperature</div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Mode</span>
                          <Badge className="capitalize">{climate.mode}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Fan Speed</span>
                          <Badge variant="secondary" className="capitalize">
                            {climate.fanSpeed}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Humidity</span>
                          <span className="font-semibold">{climate.humidity}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Quick Controls</h3>
                      <div className="space-y-3">
                        <Button className="w-full bg-transparent" variant="outline">
                          <Thermometer className="mr-2 h-4 w-4" />
                          Increase Temperature
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          <Thermometer className="mr-2 h-4 w-4" />
                          Decrease Temperature
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          <Power className="mr-2 h-4 w-4" />
                          Change Mode
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Adjust Fan Speed
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Refrigerator className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold">Refrigerator</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {refrigeratorItems.filter((i) => i.status === "critical").length}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Items expiring soon</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="h-6 w-6 text-yellow-600" />
                    <span className="font-semibold">Lights</span>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {lights.filter((l) => l.status).length}/{lights.length}
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">Lights currently on</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className="h-6 w-6 text-red-600" />
                    <span className="font-semibold">Alarms</span>
                  </div>
                  <div className="text-3xl font-bold text-red-600">
                    {alarms.filter((a) => a.status === "armed" || a.status === "active").length}
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300">Systems active</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Camera className="h-6 w-6 text-purple-600" />
                    <span className="font-semibold">Cameras</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-600">
                    {cameras.filter((c) => c.status === "recording").length}
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Recording now</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>All systems operational</span>
                    </span>
                    <Badge className="bg-green-600">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span>Energy efficiency: 92%</span>
                    </span>
                    <Badge className="bg-blue-600">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
