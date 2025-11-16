"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import { Calendar, MessageSquare, Users, Plus, ThumbsUp, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function CommunityPage() {
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "" })

  useEffect(() => {
    const currentUser = requireAuth(["tenant"])
    if (currentUser) setUser(currentUser)
  }, [])

  if (!user) return null

  const events = [
    {
      id: "evt-001",
      title: "Building BBQ & Pool Party",
      date: "2025-11-22",
      time: "16:00",
      location: "Pool Area, Sakumono Heights",
      attendees: 24,
      status: "upcoming",
    },
    {
      id: "evt-002",
      title: "Yoga Morning Session",
      date: "2025-11-18",
      time: "07:00",
      location: "Gym, Sakumono Heights",
      attendees: 12,
      status: "upcoming",
    },
  ]

  const posts = [
    {
      id: "post-001",
      author: "Nii Okai",
      unit: "A205",
      title: "Looking for a reliable car wash service",
      content:
        "Does anyone know a good car wash service that operates in our area? Preferably one that can come to the building.",
      timestamp: "2 hours ago",
      likes: 5,
      replies: 3,
    },
    {
      id: "post-002",
      author: "Kweku Mensah",
      unit: "B101",
      title: "Lost cat - please help!",
      content:
        "My orange tabby cat went missing yesterday evening. If anyone sees him around the building, please let me know. He's friendly and answers to 'Milo'.",
      timestamp: "5 hours ago",
      likes: 12,
      replies: 7,
    },
  ]

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content for your post.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Post Created!",
      description: "Your post has been published to the community board.",
    })
    setIsPostDialogOpen(false)
    setNewPost({ title: "", content: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">Connect with your neighbors and stay informed</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Community Posts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Community Board</CardTitle>
                  <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a Post</DialogTitle>
                        <DialogDescription>Share with your community</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            placeholder="What's your post about?"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Content</Label>
                          <Textarea
                            placeholder="Share details with your neighbors..."
                            rows={5}
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleCreatePost} className="w-full">
                          Publish Post
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{post.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              Unit {post.unit}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-muted-foreground mb-4">{post.content}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="h-8">
                              <ThumbsUp className="mr-1 h-3 w-3" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                              <MessageCircle className="mr-1 h-3 w-3" />
                              {post.replies} replies
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border-l-4 border-primary pl-3 space-y-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      <div>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div>{event.location}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="h-3 w-3" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      RSVP
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Active Members</span>
                  </div>
                  <span className="font-bold">142</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Posts This Month</span>
                  </div>
                  <span className="font-bold">38</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Upcoming Events</span>
                  </div>
                  <span className="font-bold">{events.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
