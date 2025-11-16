"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Wrench, Clock, TrendingUp, QrCode, Package, CheckCircle2, Calendar, ArrowLeft, Zap, Droplet, Wind, Thermometer } from 'lucide-react'
import Link from "next/link"

export default function PredictiveMaintenancePage() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  const assets = [
    {
      id: "AC-001",
      name: "Air Conditioner - Living Room",
      type: "HVAC",
      icon: Wind,
      health: 85,
      status: "Good",
      nextMaintenance: "Mar 15, 2025",
      predictedIssue: null,
      qrCode: "QR-AC-001-2025",
    },
    {
      id: "WH-001",
      name: "Water Heater",
      type: "Plumbing",
      icon: Droplet,
      health: 62,
      status: "Warning",
      nextMaintenance: "Feb 20, 2025",
      predictedIssue: "Heating element degradation detected",
      qrCode: "QR-WH-001-2025",
    },
    {
      id: "REF-001",
      name: "Refrigerator",
      type: "Appliance",
      icon: Package,
      health: 92,
      status: "Excellent",
      nextMaintenance: "Apr 10, 2025",
      predictedIssue: null,
      qrCode: "QR-REF-001-2025",
    },
    {
      id: "TH-001",
      name: "Smart Thermostat",
      type: "Climate",
      icon: Thermometer,
      health: 78,
      status: "Good",
      nextMaintenance: "Mar 28, 2025",
      predictedIssue: null,
      qrCode: "QR-TH-001-2025",
    },
  ]

  const maintenanceSchedule = [
    { date: "Feb 20, 2025", asset: "Water Heater", type: "Preventive", priority: "High" },
    { date: "Mar 15, 2025", asset: "Air Conditioner", type: "Routine", priority: "Medium" },
    { date: "Mar 28, 2025", asset: "Smart Thermostat", type: "Inspection", priority: "Low" },
    { date: "Apr 10, 2025", asset: "Refrigerator", type: "Routine", priority: "Low" },
  ]

  const spareParts = [
    { name: "HVAC Filter", stock: 12, minStock: 5, status: "In Stock" },
    { name: "Water Heater Element", stock: 3, minStock: 2, status: "Low Stock" },
    { name: "Thermostat Battery", stock: 8, minStock: 4, status: "In Stock" },
    { name: "Door Seal", stock: 1, minStock: 3, status: "Order Needed" },
  ]

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Predictive Maintenance & Asset Tracking</h1>
          <p className="text-muted-foreground">AI-powered maintenance predictions and QR asset management</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/tenant/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <Badge variant="default">Active</Badge>
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Tracked Assets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <Badge variant="default" className="bg-green-600">
                Healthy
              </Badge>
            </div>
            <div className="text-2xl font-bold">10</div>
            <div className="text-sm text-muted-foreground">Good Condition</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <Badge variant="secondary" className="bg-yellow-600 text-white">
                Warning
              </Badge>
            </div>
            <div className="text-2xl font-bold">2</div>
            <div className="text-sm text-muted-foreground">Need Attention</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <Badge variant="outline">Upcoming</Badge>
            </div>
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-muted-foreground">Scheduled Tasks</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assets">Asset Health</TabsTrigger>
          <TabsTrigger value="schedule">Maintenance Schedule</TabsTrigger>
          <TabsTrigger value="parts">Spare Parts Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="assets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map((asset) => (
              <Card key={asset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <asset.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{asset.name}</CardTitle>
                        <CardDescription>ID: {asset.id}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={asset.status === "Excellent" ? "default" : asset.status === "Good" ? "secondary" : "destructive"}
                    >
                      {asset.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Health Score</span>
                      <span className="text-sm font-semibold">{asset.health}%</span>
                    </div>
                    <Progress value={asset.health} className="h-2" />
                  </div>

                  {asset.predictedIssue && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">{asset.predictedIssue}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Next Maintenance</span>
                    <span className="font-medium">{asset.nextMaintenance}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      <QrCode className="mr-2 h-4 w-4" />
                      View QR
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Wrench className="mr-2 h-4 w-4" />
                      Report Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance Schedule</CardTitle>
              <CardDescription>AI-optimized maintenance timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceSchedule.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{item.asset}</div>
                        <div className="text-sm text-muted-foreground">{item.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.date}</div>
                      <Badge
                        variant={item.priority === "High" ? "destructive" : item.priority === "Medium" ? "secondary" : "outline"}
                        className="mt-1"
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <CardTitle>Spare Parts Inventory</CardTitle>
              <CardDescription>Track and manage replacement parts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {spareParts.map((part, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{part.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Min Stock: {part.minStock} units
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{part.stock}</div>
                      <Badge
                        variant={
                          part.status === "In Stock" ? "default" : part.status === "Low Stock" ? "secondary" : "destructive"
                        }
                        className="mt-1"
                      >
                        {part.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">Request Parts Order</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
