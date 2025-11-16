"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, Calendar, CheckCircle2, AlertCircle, CreditCard, Clock, ArrowLeft, FileText } from 'lucide-react'
import Link from "next/link"

export default function CreditScorePage() {
  const creditScore = 725
  const maxScore = 850

  const paymentHistory = [
    { month: "Jan 2025", amount: "GHS 2,200", status: "On Time", days: 0 },
    { month: "Dec 2024", amount: "GHS 2,200", status: "On Time", days: 0 },
    { month: "Nov 2024", amount: "GHS 2,200", status: "On Time", days: 0 },
    { month: "Oct 2024", amount: "GHS 2,200", status: "Late", days: 3 },
    { month: "Sep 2024", amount: "GHS 2,200", status: "On Time", days: 0 },
  ]

  const financingOptions = [
    {
      name: "Rent Now, Pay Later",
      description: "Split your rent into 4 interest-free installments",
      rate: "0% APR",
      term: "4 months",
      eligible: true,
    },
    {
      name: "Premium Rent Financing",
      description: "Annual rent with monthly payments at low interest",
      rate: "5.9% APR",
      term: "12 months",
      eligible: true,
    },
    {
      name: "Deposit Loan",
      description: "Finance your security deposit with flexible terms",
      rate: "7.5% APR",
      term: "6 months",
      eligible: false,
    },
  ]

  const scoreFactors = [
    { factor: "Payment History", score: 95, weight: "35%", status: "excellent" },
    { factor: "Rent Payment Consistency", score: 88, weight: "25%", status: "good" },
    { factor: "Account Age", score: 72, weight: "15%", status: "fair" },
    { factor: "Property Maintenance", score: 90, weight: "15%", status: "excellent" },
    { factor: "Community Standing", score: 85, weight: "10%", status: "good" },
  ]

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Credit Score & Financing</h1>
          <p className="text-muted-foreground">Track your tenant credit score and access financing options</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/tenant/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Tenant Credit Score</CardTitle>
            <CardDescription>Based on payment history and rental behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="inline-block relative">
                <div className="text-6xl font-bold text-primary">{creditScore}</div>
                <div className="text-sm text-muted-foreground">out of {maxScore}</div>
              </div>
              <Badge variant="default" className="mt-4">
                Good Credit
              </Badge>
            </div>
            <Progress value={(creditScore / maxScore) * 100} className="h-4 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor (300-579)</span>
              <span>Fair (580-669)</span>
              <span>Good (670-739)</span>
              <span>Very Good (740-799)</span>
              <span>Excellent (800-850)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm">Score Change</span>
              </div>
              <span className="font-semibold text-green-600">+15 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Member Since</span>
              </div>
              <span className="font-semibold">Jan 2023</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm">On-Time Payments</span>
              </div>
              <span className="font-semibold">95%</span>
            </div>
            <Button className="w-full mt-4">Download Credit Report</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="factors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="factors">Score Factors</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="financing">Financing Options</TabsTrigger>
        </TabsList>

        <TabsContent value="factors">
          <Card>
            <CardHeader>
              <CardTitle>What Affects Your Score</CardTitle>
              <CardDescription>Understanding the factors that influence your tenant credit score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {scoreFactors.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.factor}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.weight}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.score}/100</span>
                      {item.status === "excellent" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      {item.status === "good" && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                      {item.status === "fair" && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                    </div>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your rent payment track record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${payment.status === "On Time" ? "bg-green-100" : "bg-yellow-100"}`}
                      >
                        {payment.status === "On Time" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{payment.month}</div>
                        <div className="text-sm text-muted-foreground">{payment.amount}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={payment.status === "On Time" ? "default" : "secondary"}>{payment.status}</Badge>
                      {payment.days > 0 && <div className="text-xs text-muted-foreground mt-1">{payment.days} days late</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financingOptions.map((option, idx) => (
              <Card key={idx} className={!option.eligible ? "opacity-60" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                    {option.eligible ? (
                      <Badge variant="default">Eligible</Badge>
                    ) : (
                      <Badge variant="secondary">Not Eligible</Badge>
                    )}
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Interest Rate</span>
                      <span className="font-semibold">{option.rate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Payment Term</span>
                      <span className="font-semibold">{option.term}</span>
                    </div>
                    <Button className="w-full mt-4" disabled={!option.eligible}>
                      {option.eligible ? "Apply Now" : "Improve Credit Score"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
