"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Star,
    Calendar,
    Clock,
    MapPin,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";

// Mock data for student requests
const studentRequests = [
    {
        id: 1,
        name: "Arjun Mehta",
        age: 17,
        class: "12th Grade",
        subjects: ["Mathematics", "Physics"],
        examName: "CBSE Board Exam",
        examType: "Descriptive",
        examDate: "2024-12-20",
        examTime: "10:00 AM",
        location: "Delhi Public School, Sector 12, Delhi",
        language: "English",
        genderPreference: "No Preference",
        matchScore: 95,
        status: "pending",
        requestedAt: "2 hours ago",
    },
    {
        id: 2,
        name: "Sneha Gupta",
        age: 16,
        class: "11th Grade",
        subjects: ["Chemistry", "Biology"],
        examName: "School Final Exam",
        examType: "MCQ + Descriptive",
        examDate: "2024-12-18",
        examTime: "2:00 PM",
        location: "Modern School, CP, Delhi",
        language: "English",
        genderPreference: "Female",
        matchScore: 88,
        status: "pending",
        requestedAt: "1 day ago",
    },
];

const upcomingAssignments = [
    {
        id: 1,
        studentName: "Rohit Sharma",
        subject: "Mathematics",
        examDate: "2024-12-15",
        examTime: "9:00 AM",
        location: "St. Mary's School, Delhi",
        status: "confirmed",
    },
    {
        id: 2,
        studentName: "Kavya Patel",
        subject: "Physics",
        examDate: "2024-12-22",
        examTime: "11:00 AM",
        location: "DPS Vasant Kunj, Delhi",
        status: "confirmed",
    },
];

export default function ScribeDashboard() {
    const [requests, setRequests] = useState(studentRequests);

    const handleRequestAction = (
        requestId: number,
        action: "accept" | "decline"
    ) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === requestId
                    ? {
                          ...req,
                          status: action === "accept" ? "accepted" : "declined",
                      }
                    : req
            )
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "accepted":
                return "bg-green-100 text-green-800";
            case "declined":
                return "bg-red-100 text-red-800";
            case "confirmed":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Scribe Dashboard
                        </h1>
                        <div className="flex items-center gap-4">
                            <Badge variant="outline">Available</Badge>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">4.8</span>
                            </div>
                            <Avatar>
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="requests" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="requests">
                            Student Requests
                        </TabsTrigger>
                        <TabsTrigger value="assignments">
                            Upcoming Assignments
                        </TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="requests" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                Students Needing Help
                            </h2>
                            <Badge variant="secondary">
                                {
                                    requests.filter(
                                        (r) => r.status === "pending"
                                    ).length
                                }{" "}
                                new requests
                            </Badge>
                        </div>

                        <div className="grid gap-6">
                            {requests.map((request) => (
                                <Card
                                    key={request.id}
                                    className="hover:shadow-md transition-shadow"
                                >
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarFallback>
                                                        {request.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-lg">
                                                        {request.name}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {request.age} years •{" "}
                                                        {request.class} •
                                                        Requested{" "}
                                                        {request.requestedAt}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge
                                                    variant="secondary"
                                                    className="mb-2"
                                                >
                                                    {request.matchScore}% Match
                                                </Badge>
                                                <Badge
                                                    className={getStatusColor(
                                                        request.status
                                                    )}
                                                >
                                                    {request.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        request.status.slice(1)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                                                        Exam Details
                                                    </h4>
                                                    <p className="text-sm">
                                                        {request.examName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {request.examType}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                                                        Subjects
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {request.subjects.map(
                                                            (subject) => (
                                                                <Badge
                                                                    key={
                                                                        subject
                                                                    }
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {subject}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {request.examDate}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {request.examTime}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    {request.language}
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-1 text-sm text-gray-600">
                                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                <span>{request.location}</span>
                                            </div>

                                            {request.genderPreference !==
                                                "No Preference" && (
                                                <div className="text-sm text-gray-600">
                                                    <strong>
                                                        Gender Preference:
                                                    </strong>{" "}
                                                    {request.genderPreference}
                                                </div>
                                            )}

                                            {request.status === "pending" && (
                                                <div className="flex gap-2 pt-2">
                                                    <Button
                                                        onClick={() =>
                                                            handleRequestAction(
                                                                request.id,
                                                                "accept"
                                                            )
                                                        }
                                                        className="flex items-center gap-2"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                        Accept Request
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            handleRequestAction(
                                                                request.id,
                                                                "decline"
                                                            )
                                                        }
                                                        className="flex items-center gap-2"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                        Decline
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="assignments" className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Upcoming Assignments
                        </h2>
                        <div className="grid gap-4">
                            {upcomingAssignments.map((assignment) => (
                                <Card key={assignment.id}>
                                    <CardContent className="pt-6">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <h3 className="font-semibold">
                                                    {assignment.studentName}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {assignment.subject}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {assignment.examDate}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {assignment.examTime}
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-1 text-sm text-gray-500">
                                                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        {assignment.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge
                                                className={getStatusColor(
                                                    assignment.status
                                                )}
                                            >
                                                {assignment.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    assignment.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="history" className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Scribing History
                        </h2>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                    Recent Sessions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">
                                                Helped Ravi Kumar
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Mathematics • CBSE 12th • Nov
                                                15, 2024
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 mb-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm">
                                                    5.0
                                                </span>
                                            </div>
                                            <Badge className="bg-green-100 text-green-800">
                                                Completed
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-4 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">
                                                Helped Priya Singh
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Physics • JEE Mains • Nov 10,
                                                2024
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 mb-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm">
                                                    4.8
                                                </span>
                                            </div>
                                            <Badge className="bg-green-100 text-green-800">
                                                Completed
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-6">
                        <h2 className="text-xl font-semibold">My Profile</h2>
                        <Card>
                            <CardHeader>
                                <CardTitle>Scribe Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            Subjects
                                        </Label>
                                        <p>Mathematics, Physics, Chemistry</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            Experience
                                        </Label>
                                        <p>2 years</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            Exam Preference
                                        </Label>
                                        <p>Written & Computerised</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            Location
                                        </Label>
                                        <p>Delhi NCR</p>
                                    </div>
                                </div>
                                <Button variant="outline">Edit Profile</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function Label({
    className,
    children,
    ...props
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <label className={className} {...props}>
            {children}
        </label>
    );
}
