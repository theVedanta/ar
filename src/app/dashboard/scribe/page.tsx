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
import { useScribeRequests } from "@/hooks/api/useScribeRequests";
import { useMatches } from "@/hooks/api/useMatches";

export default function ScribeDashboard() {
    // This should come from authentication/session
    const scribeId = "demo-scribe-id";

    const { requests: scribeRequests, loading: requestsLoading } =
        useScribeRequests({
            autoFetch: false,
        });

    const { matches, loading: matchesLoading } = useMatches({
        scribeId,
        autoFetch: true,
    });

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
                                Student Match Requests
                            </h2>
                            <Badge variant="secondary">
                                {
                                    scribeRequests.filter(
                                        (r) => r.scribeId === scribeId
                                    ).length
                                }{" "}
                                requests
                            </Badge>
                        </div>

                        {scribeRequests.filter((r) => r.scribeId === scribeId)
                            .length === 0 ? (
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <AlertCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">
                                        No requests yet
                                    </h3>
                                    <p className="text-gray-600">
                                        Student requests will appear here when
                                        they need your help.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6">
                                {scribeRequests
                                    .filter((r) => r.scribeId === scribeId)
                                    .map((request) => (
                                        <Card
                                            key={request.id}
                                            className="hover:shadow-md transition-shadow"
                                        >
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarFallback>
                                                                ST
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <CardTitle className="text-lg">
                                                                Student Match
                                                                Request
                                                            </CardTitle>
                                                            <CardDescription>
                                                                Request ID:{" "}
                                                                {request.id.slice(
                                                                    0,
                                                                    8
                                                                )}
                                                                ...
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge
                                                            variant="secondary"
                                                            className="mb-2"
                                                        >
                                                            {request.matchScore}
                                                            % Match
                                                        </Badge>
                                                        <Badge
                                                            className={getStatusColor(
                                                                request.status
                                                            )}
                                                        >
                                                            {request.status
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                request.status.slice(
                                                                    1
                                                                )}
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
                                                                {
                                                                    request
                                                                        .examDetails
                                                                        .examName
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    request
                                                                        .examDetails
                                                                        .examType
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-sm text-gray-600 mb-2">
                                                                Subjects
                                                            </h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {request.examDetails.subjects.map(
                                                                    (
                                                                        subject
                                                                    ) => (
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
                                                    </div>

                                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {
                                                                request
                                                                    .examDetails
                                                                    .examDate
                                                            }
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {
                                                                request
                                                                    .examDetails
                                                                    .examTime
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-1 text-sm text-gray-600">
                                                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                        <span>
                                                            {
                                                                request
                                                                    .examDetails
                                                                    .location
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="assignments" className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Upcoming Assignments
                        </h2>

                        {matches.length === 0 ? (
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">
                                        No upcoming assignments
                                    </h3>
                                    <p className="text-gray-600">
                                        Your confirmed matches will appear here.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {matches
                                    .filter(
                                        (match) => match.status === "confirmed"
                                    )
                                    .map((match) => (
                                        <Card key={match.id}>
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-2">
                                                        <h3 className="font-semibold">
                                                            Student Assignment
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {match.examDetails.subjects.join(
                                                                ", "
                                                            )}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4" />
                                                                {
                                                                    match
                                                                        .examDetails
                                                                        .examDate
                                                                }
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4" />
                                                                {
                                                                    match
                                                                        .examDetails
                                                                        .examTime
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-1 text-sm text-gray-500">
                                                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                            <span>
                                                                {
                                                                    match
                                                                        .examDetails
                                                                        .location
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        className={getStatusColor(
                                                            match.status
                                                        )}
                                                    >
                                                        {match.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            match.status.slice(
                                                                1
                                                            )}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        )}
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
