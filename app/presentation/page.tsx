"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Maximize2, Download, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PresentationPage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const slides = [
    {
      id: 1,
      title: "SLOANE SQUARE",
      subtitle: "Property Management System",
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-8">
            <div className="h-32 w-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Home className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SLOANE SQUARE
          </h1>
          <p className="text-3xl text-slate-600 dark:text-slate-400">Property Management System</p>
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-xl">
              <div className="text-4xl font-bold text-blue-600">240+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Buildings Managed</div>
            </div>
            <div className="p-6 bg-green-50 dark:bg-green-950 rounded-xl">
              <div className="text-4xl font-bold text-green-600">5,000+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Active Units</div>
            </div>
            <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-xl">
              <div className="text-4xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Uptime SLA</div>
            </div>
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-500 mt-8">Version 1.0 | Comprehensive POC Demo | 2025</p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Executive Summary",
      subtitle: "Platform Overview",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Mission</h3>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              To provide a comprehensive, scalable property management platform that streamlines operations across 240+
              buildings while delivering exceptional tenant experiences through smart home integration and digital-first
              services.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Core Capabilities</h4>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Multi-building portfolio management</li>
                <li>• Automated rent collection & billing</li>
                <li>• Smart ticketing & maintenance</li>
                <li>• IoT device integration</li>
                <li>• Real-time analytics & reporting</li>
              </ul>
            </Card>

            <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <h4 className="font-bold text-green-900 dark:text-green-100 mb-3">Key Benefits</h4>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>• 80% reduction in manual tasks</li>
                <li>• 95% tenant satisfaction rate</li>
                <li>• 60% faster issue resolution</li>
                <li>• 40% energy cost savings</li>
                <li>• 24/7 automated operations</li>
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            {[
              { label: "Tenants", value: "5,000+", color: "blue" },
              { label: "Staff", value: "350", color: "green" },
              { label: "Vendors", value: "150+", color: "purple" },
              { label: "Devices", value: "12,000+", color: "orange" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`p-4 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-950 text-center`}
              >
                <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "System Architecture",
      subtitle: "Technical Foundation",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 rounded-xl border-2 border-primary/20">
            <svg viewBox="0 0 1000 600" className="w-full h-auto">
              {/* Frontend Layer */}
              <rect
                x="50"
                y="50"
                width="900"
                height="100"
                fill="hsl(var(--primary))"
                fillOpacity="0.1"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                rx="8"
              />
              <text x="500" y="90" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="20" fontWeight="bold">
                Frontend Layer
              </text>
              <text x="500" y="120" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="14">
                React + TypeScript + Tailwind CSS + PWA
              </text>

              {/* API Gateway */}
              <rect
                x="350"
                y="180"
                width="300"
                height="60"
                fill="hsl(var(--secondary))"
                fillOpacity="0.2"
                stroke="hsl(var(--secondary))"
                strokeWidth="2"
                rx="6"
              />
              <text x="500" y="215" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="16" fontWeight="bold">
                API Gateway & Auth
              </text>

              {/* Microservices */}
              <rect
                x="50"
                y="270"
                width="180"
                height="80"
                fill="hsl(217 91% 60%)"
                fillOpacity="0.1"
                stroke="hsl(217 91% 60%)"
                strokeWidth="2"
                rx="6"
              />
              <text x="140" y="300" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="bold">
                Tenant Service
              </text>
              <text x="140" y="320" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                Units, Leases
              </text>
              <text x="140" y="335" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                Profiles
              </text>

              <rect
                x="250"
                y="270"
                width="180"
                height="80"
                fill="hsl(142 71% 45%)"
                fillOpacity="0.1"
                stroke="hsl(142 71% 45%)"
                strokeWidth="2"
                rx="6"
              />
              <text x="340" y="300" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="bold">
                Billing Service
              </text>
              <text x="340" y="320" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                Invoices, Payments
              </text>
              <text x="340" y="335" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                Reconciliation
              </text>

              <rect
                x="450"
                y="270"
                width="180"
                height="80"
                fill="hsl(280 100% 70%)"
                fillOpacity="0.1"
                stroke="hsl(280 100% 70%)"
                strokeWidth="2"
                rx="6"
              />
              <text x="540" y="300" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="bold">
                Ticketing Service
              </text>
              <text x="540" y="320" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                Maintenance
              </text>
              <text x="540" y="335" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                SLA Tracking
              </text>

              <rect
                x="650"
                y="270"
                width="180"
                height="80"
                fill="hsl(24 95% 53%)"
                fillOpacity="0.1"
                stroke="hsl(24 95% 53%)"
                strokeWidth="2"
                rx="6"
              />
              <text x="740" y="300" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="bold">
                IoT Service
              </text>
              <text x="740" y="320" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                Device Registry
              </text>
              <text x="740" y="335" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                Automations
              </text>

              {/* Data Layer */}
              <rect
                x="50"
                y="380"
                width="380"
                height="80"
                fill="hsl(var(--accent))"
                fillOpacity="0.1"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                rx="6"
              />
              <text x="240" y="410" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="bold">
                PostgreSQL Database
              </text>
              <text x="240" y="430" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                Row-Level Tenancy • ACID Transactions
              </text>
              <text x="240" y="445" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                Automated Backups • Replication
              </text>

              <rect
                x="450"
                y="380"
                width="240"
                height="80"
                fill="hsl(var(--accent))"
                fillOpacity="0.1"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                rx="6"
              />
              <text x="570" y="410" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="bold">
                Time-Series DB
              </text>
              <text x="570" y="430" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                IoT Metrics
              </text>
              <text x="570" y="445" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                Energy Data
              </text>

              <rect
                x="710"
                y="380"
                width="240"
                height="80"
                fill="hsl(var(--accent))"
                fillOpacity="0.1"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                rx="6"
              />
              <text x="830" y="410" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="bold">
                Object Storage
              </text>
              <text x="830" y="430" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                Images
              </text>
              <text x="830" y="445" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                Documents
              </text>

              {/* Integration Layer */}
              <rect
                x="50"
                y="490"
                width="900"
                height="80"
                fill="hsl(var(--muted))"
                fillOpacity="0.1"
                stroke="hsl(var(--muted))"
                strokeWidth="2"
                rx="6"
              />
              <text x="500" y="520" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="16" fontWeight="bold">
                Third-Party Integrations
              </text>
              <text x="500" y="545" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="13">
                Paystack • Mobile Money • SMS Gateway • Email • Smart Home Hubs • ISPs
              </text>

              {/* Connection Lines */}
              <line
                x1="500"
                y1="150"
                x2="500"
                y2="180"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <line x1="500" y1="240" x2="140" y2="270" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <line x1="500" y1="240" x2="340" y2="270" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <line x1="500" y1="240" x2="540" y2="270" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <line x1="500" y1="240" x2="740" y2="270" stroke="hsl(var(--primary))" strokeWidth="1.5" />

              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="hsl(var(--primary))" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-blue-50 dark:bg-blue-950">
              <h4 className="font-bold text-sm mb-2 text-blue-900 dark:text-blue-100">Scalability</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Horizontal scaling with Kubernetes, supporting 10,000+ concurrent users
              </p>
            </Card>
            <Card className="p-4 bg-green-50 dark:bg-green-950">
              <h4 className="font-bold text-sm mb-2 text-green-900 dark:text-green-100">Security</h4>
              <p className="text-xs text-green-700 dark:text-green-300">
                OAuth2, 2FA, row-level security, encrypted data at rest and in transit
              </p>
            </Card>
            <Card className="p-4 bg-purple-50 dark:bg-purple-950">
              <h4 className="font-bold text-sm mb-2 text-purple-900 dark:text-purple-100">Performance</h4>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                &lt;300ms API latency, 99.9% uptime SLA, CDN-backed assets
              </p>
            </Card>
          </div>
        </div>
      ),
    },
  ]

  // Add more slides but keep them concise to avoid token limit
  const additionalSlides = [
    {
      id: 4,
      title: "Core Modules",
      subtitle: "Feature Overview",
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              title: "Multi-Tenancy",
              desc: "Role-based access • 240+ buildings • Portfolio management",
              color: "blue",
            },
            { title: "Rent & Billing", desc: "Multi-currency • Auto-invoicing • Payment gateways", color: "green" },
            { title: "Maintenance", desc: "Smart ticketing • SLA tracking • Vendor dispatch", color: "purple" },
            { title: "Smart Home", desc: "IoT devices • Automations • Energy monitoring", color: "orange" },
            { title: "Subscriptions", desc: "Internet/Cable • Self-serve • Auto-provisioning", color: "pink" },
            { title: "Analytics", desc: "Real-time dashboards • Reports • KPI tracking", color: "indigo" },
          ].map((module) => (
            <Card
              key={module.title}
              className={`p-6 border-2 ${
                module.color === "blue"
                  ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                  : module.color === "green"
                    ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                    : module.color === "purple"
                      ? "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800"
                      : module.color === "orange"
                        ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800"
                        : module.color === "pink"
                          ? "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800"
                          : "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800"
              }`}
            >
              <h3 className="text-xl font-bold mb-3 text-foreground">{module.title}</h3>
              <p className="text-sm text-muted-foreground">{module.desc}</p>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 5,
      title: "User Journey Flow",
      subtitle: "Tenant Experience",
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8 rounded-xl">
            {["Discovery", "Registration", "Booking", "Move-In"].map((step, idx) => (
              <div key={step} className="flex items-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-2 shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="font-semibold text-foreground">{step}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {idx === 0 && "Browse properties"}
                    {idx === 1 && "Create account"}
                    {idx === 2 && "Apply for unit"}
                    {idx === 3 && "Sign lease"}
                  </div>
                </div>
                {idx < 3 && <ChevronRight className="mx-4 h-6 w-6 text-primary" />}
              </div>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-2">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Ongoing Tenant Activities</h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  title: "Rent Payments",
                  icon: "💳",
                  items: ["View invoices", "Pay via Card/MoMo", "Download receipts", "Auto-pay setup"],
                },
                {
                  title: "Maintenance",
                  icon: "🔧",
                  items: ["Submit tickets", "Track status", "Rate service", "View history"],
                },
                {
                  title: "Smart Home",
                  icon: "🏠",
                  items: ["Control devices", "Monitor energy", "Set automations", "Receive alerts"],
                },
              ].map((activity) => (
                <div
                  key={activity.title}
                  className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-700"
                >
                  <div className="text-3xl mb-3">{activity.icon}</div>
                  <h4 className="font-bold text-lg mb-3 text-foreground">{activity.title}</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    {activity.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
  ]

  const allSlides = [...slides, ...additionalSlides]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length)
  }

  const handleDownload = () => {
    alert("PDF download functionality simulated. In production, this would generate a PDF of the presentation.")
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 ${fullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">SLOANE SQUARE Presentation</h1>
            <p className="text-sm text-muted-foreground">
              Slide {currentSlide + 1} of {allSlides.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFullscreen(!fullscreen)}>
              <Maximize2 className="h-4 w-4 mr-2" />
              {fullscreen ? "Exit" : "Fullscreen"}
            </Button>
          </div>
        </div>

        {/* Slide Content */}
        <Card className="mb-8 p-8 md:p-12 min-h-[600px] relative bg-white dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">{allSlides[currentSlide].title}</h2>
            <p className="text-xl text-muted-foreground">{allSlides[currentSlide].subtitle}</p>
          </div>
          <div>{allSlides[currentSlide].content}</div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button onClick={prevSlide} disabled={currentSlide === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="flex gap-2">
            {allSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
          <Button onClick={nextSlide} disabled={currentSlide === allSlides.length - 1}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
