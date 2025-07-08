"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Mail, Phone, MapPin, Clock, User, AlertCircle } from "lucide-react"

// Mock data for matched scribes
const matchedScribes = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 22,
    gender: "Female",
    subjects: ["Mathematics", "Physics"],
    rating: 4.8,
    matchScore: 95,
    language: "English",
    availability: "Available",
    location: "Delhi",
    experience: "2 years",
    examTypes: ["12th Grade", "JEE"],
    contact: { email: "priya@example.com", phone: "+91 9876543210" },
  },
  {
    id: 2,
    name: "Rahul Kumar",
    age: 24,
    gender: "Male",
    subjects: ["Chemistry", "Biology"],
    rating: 4.6,
    matchScore: 88,
    language: "English",
    availability: "Available",
    location: "Delhi",
    experience: "3 years",
    examTypes: ["12th Grade", "NEET"],
    contact: { email: "rahul@example.com", phone: "+91 9876543211" },
  },
  {
    id: 3,
    name: "Anjali Patel",
    age: 21,
    gender: "Female",
    subjects: ["English", "History"],
    rating: 4.9,
    matchScore: 82,
    language: "English",
    availability: "Busy until Dec 15",
    location: "Delhi",
    experience: "1.5 years",
    examTypes: ["12th Grade"],
    contact: { email: "anjali@example.com", phone: "+91 9876543212" },
  },
]

export default function StudentDashboard() {
  const [selectedScribe, setSelectedScribe] = useState<number | null>(null)
  const [requestStatus, setRequestStatus] = useState<{ [key: number]: string }>({})

  const handleContactScribe = (scribeId: number) => {
    setRequestStatus((prev) => ({ ...prev, [scribeId]: "pending" }))
    // In a real app, this would send a notification/email
    setTimeout(() => {
      setRequestStatus((prev) => ({ ...prev, [scribeId]: "contacted" }))
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "contacted":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline">Mathematics Exam - Dec 20, 2024</Badge>
              <Avatar>
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList>
            <TabsTrigger value="matches">Matched Scribes</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Best Matches for You</h2>
              <Badge variant="secondary">{matchedScribes.length} scribes found</Badge>
            </div>

            <div className="grid gap-6">
              {matchedScribes.map((scribe) => (
                <Card key={scribe.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {scribe.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{scribe.name}</CardTitle>
                          <CardDescription>
                            {scribe.age} years • {scribe.gender} • {scribe.experience} experience
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {scribe.matchScore}% Match
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{scribe.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-600 mb-2">Subjects</h4>
                          <div className="flex flex-wrap gap-1">
                            {scribe.subjects.map((subject) => (
                              <Badge key={subject} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-600 mb-2">Exam Types</h4>
                          <div className="flex flex-wrap gap-1">
                            {scribe.examTypes.map((exam) => (
                              <Badge key={exam} variant="outline" className="text-xs">
                                {exam}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {scribe.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {scribe.language}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {scribe.availability}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {requestStatus[scribe.id] ? (
                          <Badge className={getStatusColor(requestStatus[scribe.id])}>
                            {requestStatus[scribe.id] === "pending" ? "Contacting..." : "Request Sent"}
                          </Badge>
                        ) : (
                          <>
                            <Button onClick={() => handleContactScribe(scribe.id)} className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Contact Scribe
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <h2 className="text-xl font-semibold">My Requests</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Active Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Request to Priya Sharma</h4>
                      <p className="text-sm text-gray-600">Mathematics & Physics • Sent 2 hours ago</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Request to Rahul Kumar</h4>
                      <p className="text-sm text-gray-600">Chemistry & Biology • Sent 1 day ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-xl font-semibold">My Profile</h2>
            <Card>
              <CardHeader>
                <CardTitle>Exam Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Exam</Label>
                    <p>CBSE 12th Board Exam</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Subjects</Label>
                    <p>Mathematics, Physics, Chemistry</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Date & Time</Label>
                    <p>December 20, 2024 • 10:00 AM</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Location</Label>
                    <p>Delhi Public School, Sector 12, Delhi</p>
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Label({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  )
}
