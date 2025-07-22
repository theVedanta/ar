"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import AdminRequestManager from "@/components/admin/AdminRequestManager";
import { useAdminRequests } from "@/hooks/api/useAdminRequests";

export default function AdminDashboard() {
    // This should come from authentication/session
    const superAdminId = "demo-superadmin-id";

    const { requests } = useAdminRequests({
        status: "pending",
        autoFetch: true,
    });

    const stats = {
        totalStudents: 156,
        totalScribes: 89,
        activeMatches: 45,
        pendingRequests: requests.length,
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

                <Tabs defaultValue="admin-requests" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="admin-requests">
                            Admin Requests
                        </TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>

                    <TabsContent value="admin-requests" className="space-y-6">
                        <AdminRequestManager superAdminId={superAdminId} />
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
