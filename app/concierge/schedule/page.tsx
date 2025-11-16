"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SchedulePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = requireAuth(["concierge", "property_admin", "super_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const schedule = [
    {
      day: "Monday",
      shifts: [
        { time: "8:00 AM - 4:00 PM", staff: "Jane Concierge", status: "assigned" },
        { time: "4:00 PM - 12:00 AM", staff: "Mike Johnson", status: "assigned" },
      ],
    },
    {
      day: "Tuesday",
      shifts: [
        { time: "8:00 AM - 4:00 PM", staff: "Sarah Williams", status: "assigned" },
        { time: "4:00 PM - 12:00 AM", staff: "Jane Concierge", status: "assigned" },
      ],
    },
    {
      day: "Wednesday",
      shifts: [
        { time: "8:00 AM - 4:00 PM", staff: "Jane Concierge", status: "assigned" },
        { time: "4:00 PM - 12:00 AM", staff: "Mike Johnson", status: "assigned" },
      ],
    },
    {
      day: "Thursday",
      shifts: [
        { time: "8:00 AM - 4:00 PM", staff: "Sarah Williams", status: "assigned" },
        { time: "4:00 PM - 12:00 AM", staff: "Jane Concierge", status: "assigned" },
      ],
    },
    {
      day: "Friday",
      shifts: [
        { time: "8:00 AM - 4:00 PM", staff: "Jane Concierge", status: "assigned" },
        { time: "4:00 PM - 12:00 AM", staff: "Mike Johnson", status: "assigned" },
      ],
    },
    {
      day: "Saturday",
      shifts: [
        { time: "8:00 AM - 4:00 PM", staff: "Mike Johnson", status: "assigned" },
        { time: "4:00 PM - 12:00 AM", staff: "Sarah Williams", status: "assigned" },
      ],
    },
    {
      day: "Sunday",
      shifts: [
        { time: "8:00 AM - 4:00 PM", staff: "Sarah Williams", status: "assigned" },
        { time: "4:00 PM - 12:00 AM", staff: "Jane Concierge", status: "assigned" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Concierge Schedule</h1>
          <p className="text-muted-foreground">View mailroom staff schedules and shifts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schedule.map((day, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {day.shifts.map((shift, shiftIdx) => (
                    <div key={shiftIdx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-lg">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{shift.time}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{shift.staff}</span>
                          </div>
                        </div>
                      </div>
                      <Badge>Assigned</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
