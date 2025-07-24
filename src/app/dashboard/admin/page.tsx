"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, AlertCircle, XCircle } from "lucide-react";
import ScribeRequestManager from "@/components/admin/ScribeRequestManager";
import { useScribeRequests } from "@/hooks/api/useScribeRequests";
import { useAdminStatus } from "@/hooks/api/useAdminStatus";
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminDashboard() {
    const { user } = useUser();
    const router = useRouter();
    const { adminStatus, loading: statusLoading } = useAdminStatus();

    // This should come from authentication/session
    const adminId = user?.id || "demo-admin-id";

    const { requests } = useScribeRequests({
        adminId,
        autoFetch: adminStatus?.isApproved || false,
    });

    const stats = {
        totalStudents: 42,
        totalScribes: 28,
        activeMatches: requests.filter((r) => r.status === "approved").length,
        pendingRequests: requests.filter((r) => r.status === "pending").length,
    };

    // Show loading state while checking admin status
    if (statusLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Checking your access...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show pending approval state
    if (adminStatus?.isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Access Pending
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Your admin access request is under review by a super
                            administrator.
                        </p>
                        {adminStatus.schoolName && (
                            <p className="text-sm text-gray-500 mb-4">
                                School: {adminStatus.schoolName}
                            </p>
                        )}
                        <Badge variant="secondary" className="mb-6">
                            <Clock className="h-4 w-4 mr-1" />
                            Pending Review
                        </Badge>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                onClick={() => router.push("/")}
                                className="w-full"
                            >
                                Return Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show rejected state
    if (adminStatus?.isRejected) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Access Denied
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Your admin access request has been rejected.
                        </p>
                        {adminStatus.rejectionReason && (
                            <div className="bg-red-50 p-3 rounded-lg mb-4">
                                <p className="text-sm text-red-700">
                                    <strong>Reason:</strong>{" "}
                                    {adminStatus.rejectionReason}
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Button
                                onClick={() => router.push("/profile/admin")}
                                className="w-full"
                            >
                                Submit New Request
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/")}
                                className="w-full"
                            >
                                Return Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show request admin access state for users who haven't requested yet
    if (
        !adminStatus?.isApproved &&
        !adminStatus?.isPending &&
        !adminStatus?.isRejected
    ) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Admin Access Required
                        </h2>
                        <p className="text-gray-600 mb-6">
                            You need to request admin access from a super
                            administrator to use this dashboard.
                        </p>
                        <div className="space-y-2">
                            <Button
                                onClick={() => router.push("/profile/admin")}
                                className="w-full"
                            >
                                Request Admin Access
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/")}
                                className="w-full"
                            >
                                Return Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show full admin dashboard only if approved
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
                            <Badge variant="outline">
                                School Administrator
                            </Badge>
                            <SignedOut>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </SignedOut>
                            <SignedIn>
                                <SignOutButton>
                                    <Button variant="outline">Logout</Button>
                                </SignOutButton>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                                {stats.totalStudents}
                            </div>
                            <p className="text-sm text-gray-600">
                                Total Students
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                                {stats.totalScribes}
                            </div>
                            <p className="text-sm text-gray-600">
                                Total Scribes
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                                {stats.activeMatches}
                            </div>
                            <p className="text-sm text-gray-600">
                                Active Matches
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                                {stats.pendingRequests}
                            </div>
                            <p className="text-sm text-gray-600">
                                Pending Requests
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="scribe-requests" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="scribe-requests">
                            Scribe Requests
                        </TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>

                    <TabsContent value="scribe-requests" className="space-y-6">
                        <ScribeRequestManager adminId={adminId} />
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
