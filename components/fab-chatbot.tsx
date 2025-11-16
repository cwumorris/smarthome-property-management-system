"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Phone, Mail, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function FABChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; content: string }>>([
    {
      role: "bot",
      content:
        "Hello! I'm the SLOANE SQUARE virtual assistant. I can help you with property inquiries, rent payments, maintenance requests, package tracking, and general questions about our services. What would you like to know?",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.toLowerCase()
    setMessages((prev) => [...prev, { role: "user", content: inputValue }])
    setInputValue("")

    setTimeout(() => {
      let botResponse = "I'm here to help! Could you please provide more details about your inquiry?"

      // Rent and payment queries
      if (userMessage.includes("rent") || userMessage.includes("payment") || userMessage.includes("pay")) {
        botResponse =
          "To make rent payments, log in to your tenant portal and navigate to the Payments section. We accept card payments, mobile money (MTN, Vodafone, AirtelTigo), and bank transfers. Your rent is due on the 1st of each month. Would you like to know about our grace period policy or payment methods?"
      }
      // Maintenance queries
      else if (
        userMessage.includes("maintenance") ||
        userMessage.includes("repair") ||
        userMessage.includes("broken") ||
        userMessage.includes("fix")
      ) {
        botResponse =
          "For maintenance requests, please log in and go to the Tickets section where you can submit a detailed request. You can upload photos, specify urgency level (low, medium, high, critical), and track the progress. Our team typically responds within 24 hours for normal requests and 2 hours for emergencies. What type of maintenance issue are you experiencing?"
      }
      // Package and delivery queries
      else if (
        userMessage.includes("package") ||
        userMessage.includes("delivery") ||
        userMessage.includes("mail") ||
        userMessage.includes("parcel")
      ) {
        botResponse =
          "You'll receive SMS and email notifications when packages arrive at our mailroom. You can check your package status and pick-up history in the Packages section of your tenant portal. Our concierge team is available 24/7 for package collection. Need help locating a specific package?"
      }
      // Smart home queries
      else if (
        userMessage.includes("smart") ||
        userMessage.includes("home assistant") ||
        userMessage.includes("automation") ||
        userMessage.includes("iot")
      ) {
        botResponse =
          "All our units come with smart home features including smart locks, thermostats, lighting control, energy monitoring, and security systems. You can manage everything from the Smart Home section in your tenant portal or through voice commands with compatible devices. Would you like to know more about setting up automations or specific smart devices?"
      }
      // Viewing and application queries
      else if (
        userMessage.includes("viewing") ||
        userMessage.includes("tour") ||
        userMessage.includes("visit") ||
        userMessage.includes("schedule")
      ) {
        botResponse =
          "You can schedule property viewings through our Browse Properties page. Select a property, choose a convenient date and time, and our team will confirm your appointment. Viewings are available Monday-Saturday, 9 AM - 5 PM. Would you like to browse available properties now?"
      }
      // Application queries
      else if (
        userMessage.includes("apply") ||
        userMessage.includes("application") ||
        userMessage.includes("lease") ||
        userMessage.includes("contract")
      ) {
        botResponse =
          "To apply for a unit, you'll need to provide: valid ID, proof of income, 2 references, and 3 months advance rent (1st month + 2 months security deposit). Applications are typically processed within 3-5 business days. Would you like to start an application or learn more about our requirements?"
      }
      // Amenities queries
      else if (
        userMessage.includes("amenities") ||
        userMessage.includes("facilities") ||
        userMessage.includes("gym") ||
        userMessage.includes("pool")
      ) {
        botResponse =
          "Our properties feature premium amenities including: 24/7 security, backup generators, gyms, swimming pools, parking, high-speed internet, waste management, and concierge services. Specific amenities vary by property. Which property are you interested in?"
      }
      // Contact queries
      else if (
        userMessage.includes("contact") ||
        userMessage.includes("call") ||
        userMessage.includes("email") ||
        userMessage.includes("reach")
      ) {
        botResponse =
          "You can reach us at:\n📞 Phone: +233 699 9907\n📧 Email: info@sloanesquaregh.com\n📍 Office: Sakumono, Tema\n\nOur office hours are Monday-Friday, 8 AM - 5 PM. For emergencies, our 24/7 hotline is available through the tenant portal."
      }
      // Pricing queries
      else if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("how much")) {
        botResponse =
          "Rent varies by property, location, and unit size. Our units range from GHS 2,200 to GHS 4,500 monthly for local currency properties, and USD 800 to USD 1,500 for dollar-denominated properties. This includes maintenance fees and some utilities. Would you like to see available properties in a specific price range?"
      }
      // Greeting responses
      else if (
        userMessage.includes("hello") ||
        userMessage.includes("hi") ||
        userMessage.includes("hey") ||
        userMessage.includes("good morning") ||
        userMessage.includes("good afternoon")
      ) {
        botResponse =
          "Hello! Welcome to SLOANE SQUARE Property Management. How can I assist you today? I can help with property inquiries, rent payments, maintenance, smart home features, or any other questions you might have."
      }
      // Thank you responses
      else if (userMessage.includes("thank") || userMessage.includes("thanks")) {
        botResponse =
          "You're very welcome! Is there anything else I can help you with today? I'm here to assist with any questions about our properties or services."
      }
      // Location queries
      else if (userMessage.includes("location") || userMessage.includes("where") || userMessage.includes("area")) {
        botResponse =
          "We manage 240+ buildings across prime locations in Ghana including Accra (East Legon, Cantonments, Airport Residential), Tema (Sakumono, Community areas), and surrounding regions. All properties have excellent access to schools, hospitals, shopping centers, and major roads. Which area interests you?"
      }

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 1000)
  }

  const quickActions = [
    {
      icon: MessageSquare,
      label: "AI Chat",
      action: () => {
        setShowMenu(false)
        setIsOpen(true)
      },
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: () => window.open("https://wa.me/2336999907?text=Hi%20Sloane%20Square"),
    },
    { icon: Phone, label: "Call Us", action: () => window.open("tel:+2336999907") },
    { icon: Mail, label: "Email", action: () => window.open("mailto:info@sloanesquaregh.com") },
  ]

  return (
    <>
      {/* FAB Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showMenu && !isOpen && (
          <div className="absolute bottom-16 right-0 mb-2 space-y-2">
            {quickActions.map((action, idx) => (
              <div key={idx} className="flex items-center justify-end gap-2">
                <Badge className="bg-background text-foreground shadow-lg">{action.label}</Badge>
                <Button size="icon" className="rounded-full shadow-lg" onClick={action.action}>
                  <action.icon className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-xl"
          onClick={() => {
            setShowMenu(!showMenu)
            if (showMenu) setIsOpen(false)
          }}
        >
          {isOpen || showMenu ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50 shadow-2xl">
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">SLOANE SQUARE Assistant</CardTitle>
                <CardDescription className="text-primary-foreground/80">Available 24/7 to help you</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, idx) => (
                <div key={idx} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-wrap ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
