"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { DollarSign, CreditCard, Smartphone, Download, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function PaymentsPage() {
  const [user, setUser] = useState<any>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processing, setProcessing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const invoices = [
    { id: "inv-001", month: "December 2025", amount: 2500, due_date: "2025-12-01", status: "pending", currency: "GHS" },
    {
      id: "inv-002",
      month: "November 2025",
      amount: 2500,
      due_date: "2025-11-01",
      status: "paid",
      currency: "GHS",
      paid_date: "2025-10-28",
    },
    {
      id: "inv-003",
      month: "October 2025",
      amount: 2500,
      due_date: "2025-10-01",
      status: "paid",
      currency: "GHS",
      paid_date: "2025-09-29",
    },
  ]

  const paymentHistory = [
    {
      id: "pay-001",
      date: "2025-10-28",
      amount: 2500,
      method: "Card (****1234)",
      status: "completed",
      invoice: "November 2025",
    },
    {
      id: "pay-002",
      date: "2025-09-29",
      amount: 2500,
      method: "Mobile Money",
      status: "completed",
      invoice: "October 2025",
    },
    {
      id: "pay-003",
      date: "2025-08-30",
      amount: 2500,
      method: "Card (****1234)",
      status: "completed",
      invoice: "September 2025",
    },
  ]

  const handlePayment = () => {
    setProcessing(true)

    setTimeout(() => {
      setProcessing(false)
      setIsPaymentDialogOpen(false)
      toast({
        title: "Payment Successful!",
        description: `Your rent payment of GHS 2,500 has been processed via ${paymentMethod === "card" ? "Card" : "Mobile Money"}.`,
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payments & Billing</h1>
          <p className="text-muted-foreground">Manage your rent and view payment history</p>
        </div>

        {/* Current Invoice */}
        <Card className="mb-8 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Current Invoice
            </CardTitle>
            <CardDescription>Your next rent payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">December 2025 Rent</div>
                <div className="text-4xl font-bold">GHS 2,500</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Due: {new Date("2025-12-01").toLocaleDateString()} (18 days)
                </div>
              </div>
              <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">Pay Now</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make Payment</DialogTitle>
                    <DialogDescription>Pay your rent securely using Paystack</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Amount Due</div>
                      <div className="text-3xl font-bold">GHS 2,500</div>
                      <div className="text-sm text-muted-foreground">December 2025 Rent</div>
                    </div>

                    <div className="space-y-3">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="h-4 w-4" />
                            <div>
                              <div className="font-medium">Card Payment</div>
                              <div className="text-xs text-muted-foreground">Visa, Mastercard, Verve</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent cursor-pointer">
                          <RadioGroupItem value="momo" id="momo" />
                          <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Smartphone className="h-4 w-4" />
                            <div>
                              <div className="font-medium">Mobile Money</div>
                              <div className="text-xs text-muted-foreground">MTN, Vodafone, AirtelTigo</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Card Number</Label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Expiry</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <Input placeholder="123" type="password" maxLength={3} />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "momo" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Mobile Number</Label>
                          <Input placeholder="0XX XXX XXXX" />
                        </div>
                        <div className="space-y-2">
                          <Label>Network</Label>
                          <select className="w-full border rounded-md p-2">
                            <option>MTN Mobile Money</option>
                            <option>Vodafone Cash</option>
                            <option>AirtelTigo Money</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <Button className="w-full" size="lg" onClick={handlePayment} disabled={processing}>
                      {processing ? "Processing..." : `Pay GHS 2,500`}
                    </Button>

                    <div className="text-xs text-center text-muted-foreground">
                      Secured by Paystack • Your payment information is encrypted
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* All Invoices */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>View and download your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${invoice.status === "paid" ? "bg-green-50 dark:bg-green-950" : "bg-orange-50 dark:bg-orange-950"}`}
                    >
                      <Calendar
                        className={`h-5 w-5 ${invoice.status === "paid" ? "text-green-600" : "text-orange-600"}`}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{invoice.month}</div>
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                        {invoice.paid_date && ` • Paid: ${new Date(invoice.paid_date).toLocaleDateString()}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold">
                        {invoice.currency} {invoice.amount.toLocaleString()}
                      </div>
                      <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your past transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-semibold">{payment.invoice}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()} • {payment.method}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">GHS {payment.amount.toLocaleString()}</div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
