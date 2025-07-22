"use client";

import type React from "react";
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
import { Star, MapPin, Clock, User, AlertCircle, BookOpen } from "lucide-react";
import { useMatches } from "@/hooks/api/useMatches";
import { useScribeRequests } from "@/hooks/api/useScribeRequests";
import { useState } from "react";

export default function StudentDashboard() {
    // This should come from authentication/session
    const studentId = "demo-student-id";
    const [findingMatches, setFindingMatches] = useState(false);

    const { matches, createMatches, loading } = useMatches({
        studentId,
        autoFetch: true,
    });

    const { requests } = useScribeRequests({
        autoFetch: false, // We'll fetch manually when needed
    });

    const handleFindScribes = async () => {
        setFindingMatches(true);
        try {
            await createMatches({
                studentId,
                examDetails: {
                    examName: "CBSE 12th Board",
                    examType: "Written",
                    examDate: "2024-12-20",
                    examTime: "10:00 AM",
                    location: "Delhi",
                    subjects: ["Mathematics", "Physics"],
                },
                location: "Delhi",
            });
        } catch (error) {
            console.error("Failed to find matches:", error);
        } finally {
            setFindingMatches(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Student Dashboard
                        </h1>
                        <div className="flex items-center gap-4">
                            <Badge variant="outline">
                                Mathematics Exam - Dec 20, 2024
                            </Badge>
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
                        <TabsTrigger value="matches">
                            Available Scribes
                        </TabsTrigger>
                        <TabsTrigger value="requests">My Matches</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="matches" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                Find Scribes for Your Exam
                            </h2>
                            <Button
                                onClick={handleFindScribes}
                                disabled={findingMatches || loading}
                                className="flex items-center gap-2"
                            >
                                <BookOpen className="h-4 w-4" />
                                {findingMatches
                                    ? "Finding Scribes..."
                                    : "Find Available Scribes"}
                            </Button>
                        </div>

                        {matches.length === 0 && !loading ? (
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">
                                        No matches yet
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Click "Find Available Scribes" to
                                        discover scribes who can help with your
                                        exam.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6">
                                {matches.map((match) => (
                                    <Card
                                        key={match.id}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarFallback>
                                                            SC
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-lg">
                                                            Scribe Match Found
                                                        </CardTitle>
                                                        <CardDescription>
                                                            Status:{" "}
                                                            {match.status}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge
                                                        variant="secondary"
                                                        className="mb-2"
                                                    >
                                                        {match.matchScore}%
                                                        Match
                                                    </Badge>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-sm font-medium">
                                                            4.8
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-medium text-sm text-gray-600 mb-2">
                                                            Subjects
                                                        </h4>
                                                        <div className="flex flex-wrap gap-1">
                                                            {match.examDetails.subjects.map(
                                                                (subject) => (
                                                                    <Badge
                                                                        key={
                                                                            subject
                                                                        }
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        {
                                                                            subject
                                                                        }
                                                                    </Badge>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm text-gray-600 mb-2">
                                                            Exam Details
                                                        </h4>
                                                        <p className="text-sm">
                                                            {
                                                                match
                                                                    .examDetails
                                                                    .examName
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {
                                                            match.examDetails
                                                                .location
                                                        }
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {
                                                            match.examDetails
                                                                .examDate
                                                        }{" "}
                                                        at{" "}
                                                        {
                                                            match.examDetails
                                                                .examTime
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="requests" className="space-y-6">
                        <h2 className="text-xl font-semibold">My Matches</h2>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                    Match Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {matches.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No matches found yet.</p>
                                        <p className="text-sm">
                                            Try finding scribes in the Available
                                            Scribes tab.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {matches.map((match) => (
                                            <div
                                                key={match.id}
                                                className="flex justify-between items-center p-4 border rounded-lg"
                                            >
                                                <div>
                                                    <h4 className="font-medium">
                                                        Match for{" "}
                                                        {
                                                            match.examDetails
                                                                .examName
                                                        }
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {match.examDetails.subjects.join(
                                                            ", "
                                                        )}{" "}
                                                        •{" "}
                                                        {
                                                            match.examDetails
                                                                .examDate
                                                        }
                                                    </p>
                                                </div>
                                                <Badge
                                                    className={
                                                        match.status ===
                                                        "confirmed"
                                                            ? "bg-green-100 text-green-800"
                                                            : match.status ===
                                                                "matched"
                                                              ? "bg-blue-100 text-blue-800"
                                                              : "bg-yellow-100 text-yellow-800"
                                                    }
                                                >
                                                    {match.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        match.status.slice(1)}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                                        <Label className="text-sm font-medium text-gray-600">
                                            Exam
                                        </Label>
                                        <p>CBSE 12th Board Exam</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            Subjects
                                        </Label>
                                        <p>Mathematics, Physics, Chemistry</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            Date & Time
                                        </Label>
                                        <p>December 20, 2024 • 10:00 AM</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            Location
                                        </Label>
                                        <p>
                                            Delhi Public School, Sector 12,
                                            Delhi
                                        </p>
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
