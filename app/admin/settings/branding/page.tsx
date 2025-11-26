"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useOrganization } from "@/components/organization-provider"
import { useToast } from "@/hooks/use-toast"
import { Palette, Upload, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BrandingSettingsPage() {
  const { organization } = useOrganization()
  const { toast } = useToast()
  const [branding, setBranding] = useState(
    organization?.settings.branding || {
      logo_url: "",
      favicon_url: "",
      primary_color: "#2563eb",
      secondary_color: "#7c3aed",
      custom_css: "",
    },
  )

  const handleSave = () => {
    toast({
      title: "Branding Updated",
      description: "Your organization branding has been successfully updated",
    })
  }

  const updateBranding = (field: string, value: string) => {
    setBranding({ ...branding, [field]: value })
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Branding & Customization</h1>
          <p className="text-muted-foreground">Customize the look and feel of your platform</p>
        </div>

        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="logos">Logos</TabsTrigger>
            <TabsTrigger value="css">Custom CSS</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Brand Colors
                </CardTitle>
                <CardDescription>Define your organization's primary and secondary colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="primary-color"
                        type="color"
                        value={branding.primary_color}
                        onChange={(e) => updateBranding("primary_color", e.target.value)}
                        className="h-12 w-20"
                      />
                      <Input
                        value={branding.primary_color}
                        onChange={(e) => updateBranding("primary_color", e.target.value)}
                        placeholder="#2563eb"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Used for buttons, links, and primary UI elements</p>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={branding.secondary_color}
                        onChange={(e) => updateBranding("secondary_color", e.target.value)}
                        className="h-12 w-20"
                      />
                      <Input
                        value={branding.secondary_color}
                        onChange={(e) => updateBranding("secondary_color", e.target.value)}
                        placeholder="#7c3aed"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Used for accents and secondary elements</p>
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <h4 className="mb-4 font-medium">Preview</h4>
                  <div className="space-y-3">
                    <Button style={{ backgroundColor: branding.primary_color }}>Primary Button</Button>
                    <Button
                      variant="outline"
                      style={{ borderColor: branding.secondary_color, color: branding.secondary_color }}
                    >
                      Secondary Button
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Organization Logos
                </CardTitle>
                <CardDescription>Upload your logo and favicon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    placeholder="https://example.com/logo.png"
                    value={branding.logo_url}
                    onChange={(e) => updateBranding("logo_url", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Recommended size: 200x60px (PNG or SVG)</p>
                  {branding.logo_url && (
                    <div className="mt-4 rounded-lg border p-4">
                      <p className="mb-2 text-sm font-medium">Preview:</p>
                      <img src={branding.logo_url || "/placeholder.svg"} alt="Logo preview" className="h-16" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="favicon">Favicon URL</Label>
                  <Input
                    id="favicon"
                    placeholder="https://example.com/favicon.ico"
                    value={branding.favicon_url}
                    onChange={(e) => updateBranding("favicon_url", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Recommended size: 32x32px or 64x64px (ICO, PNG)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="css" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Custom CSS
                </CardTitle>
                <CardDescription>Advanced: Add custom CSS to further customize your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="custom-css">CSS Code</Label>
                  <Textarea
                    id="custom-css"
                    rows={12}
                    placeholder=".custom-header { background: linear-gradient(...); }"
                    value={branding.custom_css}
                    onChange={(e) => updateBranding("custom_css", e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground">Add custom CSS rules to override default styles</p>
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Warning:</strong> Custom CSS can affect the entire platform. Use with caution and test
                    thoroughly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
