"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Maximize2, Video, Headset as VrHeadset, Home, MapPin, Bed, Bath, Square, ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import Link from "next/link"

export default function VirtualToursPage() {
  const [selectedTour, setSelectedTour] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"360" | "vr" | "video">("360")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [panoramaRotation, setPanoramaRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const panoramaRef = useRef<HTMLDivElement>(null)

  const tours = [
    {
      id: 1,
      name: "Asantewaa Luxury",
      building: "Sakumono Heights",
      bedrooms: 3,
      bathrooms: 2,
      sqm: 145,
      price: "GHS 3,500",
      status: "Available",
      image: "/images/image.png",
      tour360Url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&h=1000&fit=crop",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      views: 234,
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Oheema Villa",
      building: "Tema Gardens",
      bedrooms: 1,
      bathrooms: 1,
      sqm: 65,
      price: "GHS 1,800",
      status: "Available",
      image: "/images/image.png",
      tour360Url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2000&h=1000&fit=crop",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      views: 189,
      lastUpdated: "5 days ago"
    },
    {
      id: 3,
      name: "Nana's Residence",
      building: "Accra Plaza",
      bedrooms: 4,
      bathrooms: 3,
      sqm: 220,
      price: "GHS 8,500",
      status: "Coming Soon",
      image: "/images/image.png",
      tour360Url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=2000&h=1000&fit=crop",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      views: 456,
      lastUpdated: "1 day ago"
    },
  ]

  const currentTour = tours.find((t) => t.id === selectedTour)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handlePanoramaMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handlePanoramaMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const delta = e.clientX - dragStart
      setPanoramaRotation((prev) => prev + delta * 0.5)
      setDragStart(e.clientX)
    }
  }

  const handlePanoramaMouseUp = () => {
    setIsDragging(false)
  }

  // Auto-rotate panorama when not dragging
  useEffect(() => {
    if (viewMode === "360" && !isDragging) {
      const interval = setInterval(() => {
        setPanoramaRotation((prev) => (prev + 0.2) % 360)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [viewMode, isDragging])

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Virtual Property Tours</h1>
          <p className="text-muted-foreground">Experience 360° views of available properties</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/tenant/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {selectedTour ? (
        <div className="space-y-6">
          <Button variant="ghost" onClick={() => setSelectedTour(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tours
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{currentTour?.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Home className="h-4 w-4" />
                    {currentTour?.building}
                  </CardDescription>
                </div>
                <Badge variant={currentTour?.status === "Available" ? "default" : "secondary"}>
                  {currentTour?.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="360" className="gap-2">
                    <Camera className="h-4 w-4" />
                    360° View
                  </TabsTrigger>
                  <TabsTrigger value="vr" className="gap-2">
                    <VrHeadset className="h-4 w-4" />
                    VR Mode
                  </TabsTrigger>
                  <TabsTrigger value="video" className="gap-2">
                    <Video className="h-4 w-4" />
                    Video Tour
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="360">
                  <div 
                    ref={panoramaRef}
                    className="aspect-video bg-muted rounded-lg relative overflow-hidden cursor-grab active:cursor-grabbing"
                    onMouseDown={handlePanoramaMouseDown}
                    onMouseMove={handlePanoramaMouseMove}
                    onMouseUp={handlePanoramaMouseUp}
                    onMouseLeave={handlePanoramaMouseUp}
                  >
                    <div 
                      className="absolute inset-0 w-[200%] h-full transition-transform"
                      style={{ 
                        transform: `translateX(${-50 + (panoramaRotation % 360) / 3.6}%)`,
                        backgroundImage: `url(${currentTour?.tour360Url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'repeat-x'
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
                      <Camera className="h-4 w-4 inline mr-2" />
                      Click and drag to explore • 360° Interactive View
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm">
                      Rotation: {Math.round(panoramaRotation % 360)}°
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vr">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="absolute inset-0 w-[200%] h-full"
                      style={{ 
                        backgroundImage: `url(${currentTour?.tour360Url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(2px)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <VrHeadset className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-semibold">VR Experience</p>
                        <p className="text-sm opacity-90 mb-4">Best viewed with VR headset</p>
                        <Button variant="secondary" onClick={() => window.open(currentTour?.tour360Url, '_blank')}>
                          Launch VR Mode
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="aspect-video bg-black rounded-lg relative overflow-hidden group">
                    <video
                      ref={videoRef}
                      src={currentTour?.videoUrl}
                      className="w-full h-full object-contain"
                      onClick={togglePlayPause}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute top-4 left-4 text-white text-sm font-medium bg-black/40 px-3 py-1 rounded backdrop-blur-sm">
                        <Video className="inline h-4 w-4 mr-2" />
                        Guided Property Tour
                      </div>
                      
                      {/* Play/Pause Overlay */}
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button 
                            size="lg" 
                            className="h-16 w-16 rounded-full"
                            onClick={togglePlayPause}
                          >
                            <Play className="h-8 w-8" />
                          </Button>
                        </div>
                      )}
                      
                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={togglePlayPause}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                        <div className="flex-1" />
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={toggleFullscreen}
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{currentTour?.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{currentTour?.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{currentTour?.sqm}</div>
                    <div className="text-sm text-muted-foreground">Sqm</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-green-600">{currentTour?.price}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex gap-4">
                <Button className="flex-1">Schedule Physical Viewing</Button>
                <Button variant="outline" className="flex-1">Request Information</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <Card key={tour.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedTour(tour.id)}>
              <div className="relative h-48 overflow-hidden">
                <img src={tour.image || "/placeholder.svg"} alt={tour.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2" variant={tour.status === "Available" ? "default" : "secondary"}>
                  {tour.status}
                </Badge>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  {tour.views} views
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{tour.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {tour.building}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {tour.bedrooms} Bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {tour.bathrooms} Bath
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    {tour.sqm} sqm
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">{tour.price}</span>
                  <span className="text-xs text-muted-foreground">Updated {tour.lastUpdated}</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Maximize2 className="mr-2 h-4 w-4" />
                  View Tour
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
