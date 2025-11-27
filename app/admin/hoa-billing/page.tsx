"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requireAuth } from "@/lib/auth"
import { Building2, DollarSign, Plus, Calendar, CreditCard, AlertCircle, CheckCircle, Clock, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useOrganization } from "@/components/organization-provider"
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/local-storage"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface HOABill {
  id: string
  organization_id: string
  building_id: string
  building_name: string
  unit_number: string
  member_name: string
  member_email: string
  member_phone: string
  amount: number
  currency: string
  due_date: string
  billing_period: string
  status: "pending" | "paid" | "overdue" | "processing"
  created_at: string
  paid_at?: string
  payment_method?: string
  description: string
  late_fee?: number
}

export default function HOABillingPage() {
  const [user, setUser] = useState<any>(null)
  const { organization, loading } = useOrganization()
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [bills, setBills] = useState<HOABill[]>(() => {
    const saved = getFromLocalStorage(`hoa_bills_${organization?.id}`, [])
    return saved
  })

  const [buildings] = useState(() => {
    const saved = getFromLocalStorage("buildings", [])
    return saved.filter((b: any) => b.organization_id === organization?.id)
  })

  const [newBill, setNewBill] = useState({
    building_id: "",
    unit_number: "",
    member_name: "",
    member_email: "",
    member_phone: "",
    amount: "",
    due_date: "",
    billing_period: "",
    description: "Monthly HOA Dues",
  })

  useEffect(() => {
    const currentUser = requireAuth(["super_admin", "property_admin"])
    if (currentUser) setUser(currentUser)
  }, [])

  useEffect(() => {
    if (organization && bills.length >= 0) {
      saveToLocalStorage(`hoa_bills_${organization.id}`, bills)
    }
  }, [bills, organization])

  // Check for overdue bills
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const overdueBills = bills.filter((b) => b.status === "pending" && b.due_date < today)

    if (overdueBills.length > 0) {
      const updatedBills = bills.map((b) =>
        b.status === "pending" && b.due_date < today ? { ...b, status: "overdue" as const } : b,
      )
      setBills(updatedBills)
    }
  }, [bills])

  if (!user || loading) return null

  const handleAddBill = () => {
    if (
      !newBill.building_id ||
      !newBill.unit_number ||
      !newBill.member_name ||
      !newBill.member_email ||
      !newBill.amount ||
      !newBill.due_date
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const building = buildings.find((b: any) => b.id === newBill.building_id)

    const bill: HOABill = {
      id: `bill-${Date.now()}`,
      organization_id: organization?.id || "",
      building_id: newBill.building_id,
      building_name: building?.name || "",
      unit_number: newBill.unit_number,
      member_name: newBill.member_name,
      member_email: newBill.member_email,
      member_phone: newBill.member_phone,
      amount: Number.parseFloat(newBill.amount),
      currency: building?.currency || "GHS",
      due_date: newBill.due_date,
      billing_period: newBill.billing_period,
      status: "pending",
      created_at: new Date().toISOString(),
      description: newBill.description,
    }

    setBills([...bills, bill])
    setIsAddDialogOpen(false)
    setNewBill({
      building_id: "",
      unit_number: "",
      member_name: "",
      member_email: "",
      member_phone: "",
      amount: "",
      due_date: "",
      billing_period: "",
      description: "Monthly HOA Dues",
    })

    toast({
      title: "Bill Created",
      description: `HOA bill for ${bill.member_name} has been created`,
    })
  }

  const handleSendReminder = (bill: HOABill) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to ${bill.member_name} via email and SMS`,
    })
  }

  const handleMarkAsPaid = (billId: string, method: string) => {
    setBills(
      bills.map((b) =>
        b.id === billId
          ? {
              ...b,
              status: "paid" as const,
              paid_at: new Date().toISOString(),
              payment_method: method,
            }
          : b,
      ),
    )
    toast({
      title: "Payment Recorded",
      description: "Bill has been marked as paid",
    })
  }

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.member_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.building_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || bill.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: bills.length,
    pending: bills.filter((b) => b.status === "pending").length,
    overdue: bills.filter((b) => b.status === "overdue").length,
    paid: bills.filter((b) => b.status === "paid").length,
    totalAmount: bills.reduce((sum, b) => sum + b.amount, 0),
    paidAmount: bills.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.amount, 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">HOA Billing System</h1>
            <p className="text-muted-foreground">Manage homeowners association dues and payments</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New HOA Bill</DialogTitle>
                <DialogDescription>Generate a bill for HOA member</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="building">Building *</Label>
                  <Select
                    value={newBill.building_id}
                    onValueChange={(value) => setNewBill({ ...newBill, building_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select building" />
                    </SelectTrigger>
                    <SelectContent>
                      {buildings.map((building: any) => (
                        <SelectItem key={building.id} value={building.id}>
                          {building.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit Number *</Label>
                  <Input
                    id="unit"
                    placeholder="A101"
                    value={newBill.unit_number}
                    onChange={(e) => setNewBill({ ...newBill, unit_number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="member">Member Name *</Label>
                  <Input
                    id="member"
                    placeholder="John Doe"
                    value={newBill.member_name}
                    onChange={(e) => setNewBill({ ...newBill, member_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={newBill.member_email}
                    onChange={(e) => setNewBill({ ...newBill, member_email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+233 XX XXX XXXX"
                    value={newBill.member_phone}
                    onChange={(e) => setNewBill({ ...newBill, member_phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="500"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newBill.due_date}
                    onChange={(e) => setNewBill({ ...newBill, due_date: e.target.value })}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="period">Billing Period</Label>
                  <Input
                    id="period"
                    placeholder="January 2025"
                    value={newBill.billing_period}
                    onChange={(e) => setNewBill({ ...newBill, billing_period: e.target.value })}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Monthly HOA dues..."
                    value={newBill.description}
                    onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddBill} className="w-full">
                Create Bill
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Bills</div>
                  <div className="text-3xl font-bold">{stats.total}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                  <div className="text-3xl font-bold">{stats.pending}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Overdue</div>
                  <div className="text-3xl font-bold">{stats.overdue}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Paid</div>
                  <div className="text-3xl font-bold">{stats.paid}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search by member name, unit, or building..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bills List */}
        <div className="space-y-4">
          {filteredBills.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Bills Yet</h3>
                <p className="text-muted-foreground mb-4">Create your first HOA bill to get started</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Bill
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredBills.map((bill) => (
              <Card key={bill.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{bill.member_name}</h3>
                        <Badge
                          variant={
                            bill.status === "paid" ? "default" : bill.status === "overdue" ? "destructive" : "secondary"
                          }
                          className={bill.status === "paid" ? "bg-green-600" : ""}
                        >
                          {bill.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            Building
                          </div>
                          <div className="font-medium">{bill.building_name}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Unit</div>
                          <div className="font-medium">{bill.unit_number}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due Date
                          </div>
                          <div className="font-medium">{new Date(bill.due_date).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Amount</div>
                          <div className="font-bold text-lg">
                            {bill.currency} {bill.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {bill.billing_period && (
                        <div className="mt-2 text-sm text-muted-foreground">Period: {bill.billing_period}</div>
                      )}

                      {bill.paid_at && (
                        <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                          Paid on {new Date(bill.paid_at).toLocaleDateString()} via {bill.payment_method}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      {bill.status !== "paid" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleSendReminder(bill)}>
                            <Send className="mr-1 h-4 w-4" />
                            Remind
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <CreditCard className="mr-1 h-4 w-4" />
                                Mark Paid
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Record Payment</DialogTitle>
                                <DialogDescription>How was this payment received?</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2 py-4">
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() => handleMarkAsPaid(bill.id, "Mobile Money")}
                                >
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Mobile Money
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() => handleMarkAsPaid(bill.id, "Bank Transfer")}
                                >
                                  <DollarSign className="mr-2 h-4 w-4" />
                                  Bank Transfer
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() => handleMarkAsPaid(bill.id, "Cash")}
                                >
                                  <DollarSign className="mr-2 h-4 w-4" />
                                  Cash
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() => handleMarkAsPaid(bill.id, "Check")}
                                >
                                  <DollarSign className="mr-2 h-4 w-4" />
                                  Check
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
