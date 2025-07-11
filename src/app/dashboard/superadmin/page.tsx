"use client";

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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Users,
    BookOpen,
    CheckCircle,
    AlertTriangle,
    Star,
    Search,
    Filter,
} from "lucide-react";

// Mock data for admin dashboard
const stats = {
    totalStudents: 206,
    totalScribes: 139,
    activeMatches: 73,
    pendingRequests: 62,
};

const allMatches = [
    {
        id: 1,
        student: {
            name: "Arjun Mehta",
            class: "12th",
            subjects: ["Math", "Physics"],
        },
        scribe: { name: "Priya Sharma", rating: 4.8, experience: "2 years" },
        examDate: "2024-12-20",
        status: "confirmed",
        matchScore: 95,
    },
    {
        id: 2,
        student: {
            name: "Sneha Gupta",
            class: "11th",
            subjects: ["Chemistry", "Biology"],
        },
        scribe: { name: "Rahul Kumar", rating: 4.6, experience: "3 years" },
        examDate: "2024-12-18",
        status: "pending",
        matchScore: 88,
    },
    {
        id: 3,
        student: {
            name: "Rohit Singh",
            class: "12th",
            subjects: ["English", "History"],
        },
        scribe: null,
        examDate: "2024-12-22",
        status: "unmatched",
        matchScore: 0,
    },
];

const feedbackData = [
    {
        id: 1,
        studentName: "Kavya Patel",
        scribeName: "Anjali Sharma",
        rating: 5,
        feedback: "Excellent support, very patient and understanding.",
        date: "2024-11-15",
    },
    {
        id: 2,
        studentName: "Amit Kumar",
        scribeName: "Ravi Gupta",
        rating: 4,
        feedback: "Good handwriting, arrived on time.",
        date: "2024-11-12",
    },
];

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredMatches = allMatches.filter((match) => {
        const matchesSearch =
            match.student.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (match.scribe?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ??
                false);
        const matchesStatus =
            statusFilter === "all" || match.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleManualAssign = (matchId: number) => {
        // In a real app, this would open a modal to select a scribe
        console.log("Manual assign for match:", matchId);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "unmatched":
                return "bg-red-100 text-red-800";
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
                            Admin Dashboard
                        </h1>
                        <div className="flex items-center gap-4">
                            <Badge variant="outline">Super Administrator</Badge>
                            <Avatar>
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Students
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalStudents}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Scribes
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalScribes}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Matches
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.activeMatches}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Requests
                            </CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.pendingRequests}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="matches" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="matches">All Matches</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>

                    <TabsContent value="matches" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                Manage Matches
                            </h2>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search students or scribes..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-8 w-64"
                                    />
                                </div>
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger className="w-32">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="confirmed">
                                            Confirmed
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="unmatched">
                                            Unmatched
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {filteredMatches.map((match) => (
                                <Card key={match.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">
                                                    {match.student.name}{" "}
                                                    (Student) →{" "}
                                                    {match.scribe?.name ||
                                                        "Unassigned"}{" "}
                                                    (Scribe)
                                                </CardTitle>
                                                <CardDescription>
                                                    {match.student.class} •{" "}
                                                    {match.student.subjects.join(
                                                        ", "
                                                    )}{" "}
                                                    • Exam: {match.examDate}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <Badge
                                                    className={getStatusColor(
                                                        match.status
                                                    )}
                                                >
                                                    {match.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        match.status.slice(1)}
                                                </Badge>
                                                {match.matchScore > 0 && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {match.matchScore}%
                                                        match
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center">
                                            <div className="space-y-1">
                                                {match.scribe && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span>
                                                            {
                                                                match.scribe
                                                                    .rating
                                                            }
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            {
                                                                match.scribe
                                                                    .experience
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                {match.status ===
                                                    "unmatched" && (
                                                    <Button
                                                        onClick={() =>
                                                            handleManualAssign(
                                                                match.id
                                                            )
                                                        }
                                                    >
                                                        Assign Manually
                                                    </Button>
                                                )}
                                                {match.status === "pending" && (
                                                    <Button variant="outline">
                                                        Approve Match
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="feedback" className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Feedback & Ratings
                        </h2>
                        <div className="grid gap-4">
                            {feedbackData.map((feedback) => (
                                <Card key={feedback.id}>
                                    <CardContent className="pt-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium">
                                                        {feedback.studentName} →{" "}
                                                        {feedback.scribeName}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {feedback.date}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i <
                                                                    feedback.rating
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                &quot;{feedback.feedback}&quot;
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="reports" className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Reports & Analytics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Monthly Statistics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Successful Matches</span>
                                            <span className="font-medium">
                                                87%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Average Rating</span>
                                            <span className="font-medium">
                                                4.7/5
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Response Time</span>
                                            <span className="font-medium">
                                                2.3 hours
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Top Performing Scribes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Priya Sharma</span>
                                            <span className="font-medium">
                                                4.9 ⭐
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Anjali Patel</span>
                                            <span className="font-medium">
                                                4.8 ⭐
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Rahul Kumar</span>
                                            <span className="font-medium">
                                                4.7 ⭐
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
