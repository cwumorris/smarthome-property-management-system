"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sun, Battery, Zap, TrendingDown, Leaf, DollarSign, ArrowLeft, Activity, CloudRain, Calendar } from 'lucide-react'
import Link from "next/link"

export default function SolarEnergyPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Solar & Renewable Energy</h1>
          <p className="text-muted-foreground">Monitor your solar system and energy optimization</p>
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
              <Sun className="h-5 w-5 text-yellow-600" />
              <Badge variant="default" className="bg-yellow-600">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold">4.2 kW</div>
            <div className="text-sm text-muted-foreground">Current Generation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Battery className="h-5 w-5 text-green-600" />
              <Badge variant="default" className="bg-green-600">
                Charging
              </Badge>
            </div>
            <div className="text-2xl font-bold">78%</div>
            <div className="text-sm text-muted-foreground">Battery Level</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Leaf className="h-5 w-5 text-teal-600" />
              <TrendingDown className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">142 kg</div>
            <div className="text-sm text-muted-foreground">CO₂ Saved (Month)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <TrendingDown className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">GHS 340</div>
            <div className="text-sm text-muted-foreground">Savings (Month)</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-Time Energy Flow</CardTitle>
            <CardDescription>Solar generation, consumption, and battery storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
                  <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold">4.2 kW</div>
                  <div className="text-sm text-muted-foreground">Solar Output</div>
                </div>
                <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">2.8 kW</div>
                  <div className="text-sm text-muted-foreground">Consumption</div>
                </div>
                <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                  <Battery className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">1.4 kW</div>
                  <div className="text-sm text-muted-foreground">To Battery</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Self-Sufficiency</span>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Battery Capacity</span>
                    <span className="text-sm font-semibold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Grid Independence</span>
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Optimization</CardTitle>
            <CardDescription>Smart energy recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950">
              <div className="flex items-start gap-2">
                <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Peak Solar Hours</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Run high-power appliances between 11 AM - 3 PM for maximum solar usage
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950">
              <div className="flex items-start gap-2">
                <Battery className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Battery Optimization</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Battery will be full by 2 PM. Consider using stored energy in evening
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <div className="flex items-start gap-2">
                <CloudRain className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Weather Forecast</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Cloudy tomorrow. Consider charging battery fully today
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Today's Energy Production</CardTitle>
              <CardDescription>Hour-by-hour solar generation and consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {[1.2, 2.8, 4.5, 5.8, 6.2, 5.9, 4.8, 3.2, 1.5, 0.8, 0.3, 0.1].map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-yellow-500 rounded-t" style={{ height: `${(value / 6.2) * 100}%` }}></div>
                    <div className="text-xs text-muted-foreground mt-2">{idx + 6}h</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">28.4 kWh</div>
                  <div className="text-sm text-muted-foreground">Generated Today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">19.2 kWh</div>
                  <div className="text-sm text-muted-foreground">Consumed Today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">9.2 kWh</div>
                  <div className="text-sm text-muted-foreground">Stored in Battery</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Energy Statistics</CardTitle>
              <CardDescription>Your solar system performance over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-3xl font-bold">842 kWh</div>
                  <div className="text-sm text-muted-foreground">Total Generated</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold">578 kWh</div>
                  <div className="text-sm text-muted-foreground">Total Consumed</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-3xl font-bold">GHS 340</div>
                  <div className="text-sm text-muted-foreground">Money Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>Your contribution to a greener planet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 border rounded-lg bg-green-50 dark:bg-green-950">
                  <Leaf className="h-12 w-12 mx-auto mb-3 text-green-600" />
                  <div className="text-4xl font-bold text-green-600">142 kg</div>
                  <div className="text-sm text-muted-foreground mt-2">CO₂ Emissions Prevented</div>
                  <div className="text-xs text-muted-foreground mt-1">Equivalent to 15 trees planted</div>
                </div>
                <div className="text-center p-6 border rounded-lg bg-blue-50 dark:bg-blue-950">
                  <Battery className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                  <div className="text-4xl font-bold text-blue-600">842 kWh</div>
                  <div className="text-sm text-muted-foreground mt-2">Clean Energy Generated</div>
                  <div className="text-xs text-muted-foreground mt-1">Equivalent to 680 kg coal not burned</div>
                </div>
              </div>
              <div className="mt-6 p-4 border rounded-lg bg-teal-50 dark:bg-teal-950">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-teal-600">
                    Green Certification
                  </Badge>
                  <span className="text-sm font-medium">Your property meets ESG sustainability standards</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
