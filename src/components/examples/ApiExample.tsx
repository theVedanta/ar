"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, User, School, BookOpen } from "lucide-react";

export default function ApiExample() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Form states
    const [userForm, setUserForm] = useState({
        email: "test@example.com",
        name: "Test User",
        role: "student",
        class: "12th Grade",
        subjects: "Mathematics,Physics",
        schoolName: "Test School",
        schoolId: "school-001"
    });

    const [requestForm, setRequestForm] = useState({
        userId: "",
        schoolName: "Demo School",
        schoolId: "school-demo",
        requestId: "",
        action: "approve",
        rejectionReason: ""
    });

    const clearResults = () => {
        setResult(null);
        setError(null);
    };

    const handleApiCall = async (endpoint: string, method: string = "GET", body?: any) => {
        setLoading(true);
        clearResults();

        try {
            const options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(endpoint, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }

            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const createUser = () => {
        const subjects = userForm.subjects.split(",").map(s => s.trim()).filter(Boolean);

        const body: any = {
            email: userForm.email,
            name: userForm.name,
            role: userForm.role,
        };

        if (userForm.role === "student") {
            body.class = userForm.class;
            body.subjects = subjects;
            body.disability = { type: "visual" };
        } else if (userForm.role === "scribe") {
            body.subjects = subjects;
            body.experience = "2 years";
            body.location = "Delhi";
            body.language = ["English"];
            body.availability = "available";
            body.gender = "Female";
            body.age = 22;
        } else if (userForm.role === "admin") {
            body.schoolName = userForm.schoolName;
            body.schoolId = userForm.schoolId;
        }

        handleApiCall("/api/users", "POST", body);
    };

    const createAdminRequest = () => {
        const body = {
            userId: requestForm.userId || "demo-user-id",
            schoolName: requestForm.schoolName,
            schoolId: requestForm.schoolId,
            documents: {
                schoolCertificate: "demo-cert-url",
                idProof: "demo-id-url"
            }
        };

        handleApiCall("/api/admin-requests", "POST", body);
    };

    const getPendingAdminRequests = () => {
        handleApiCall("/api/admin-requests?status=pending");
    };

    const updateAdminRequest = () => {
        if (!requestForm.requestId) {
            setError("Request ID is required");
            return;
        }

        const body: any = {
            requestId: requestForm.requestId,
            action: requestForm.action,
            superAdminId: "demo-superadmin-id",
        };

        if (requestForm.action === "reject" && requestForm.rejectionReason) {
            body.rejectionReason = requestForm.rejectionReason;
        }

        handleApiCall("/api/admin-requests", "PUT", body);
    };

    const createScribeRequest = () => {
        const body = {
            studentId: "demo-student-id",
            scribeId: "demo-scribe-id",
            examDetails: {
                examName: "CBSE 12th Board Exam",
                examType: "Written",
                examDate: "2024-12-22",
                examTime: "2:00 PM",
                location: "Delhi Public School, Delhi",
                subjects: ["Mathematics", "Physics"]
            },
            adminId: "demo-admin-id"
        };

        handleApiCall("/api/scribe-requests", "POST", body);
    };

    const createDemoData = (type: string) => {
        handleApiCall("/api/demo", "POST", { type });
    };

    const findMatches = () => {
        const body = {
            studentId: "demo-student-id",
            examDetails: {
                examName: "CBSE 12th Board",
                examType: "Written",
                examDate: "2024-12-20",
                examTime: "10:00 AM",
                location: "Delhi",
                subjects: ["Mathematics", "Physics"]
            },
            location: "Delhi"
        };

        handleApiCall("/api/matches", "POST", body);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Backend API Testing Interface
                    </h1>
                    <p className="text-gray-600">
                        Test the scribe-student matching platform APIs
                    </p>
                </div>

                <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="admin-requests">Admin Requests</TabsTrigger>
                        <TabsTrigger value="scribe-requests">Scribe Requests</TabsTrigger>
                        <TabsTrigger value="matches">Matches</TabsTrigger>
                        <TabsTrigger value="demo">Demo Data</TabsTrigger>
                    </TabsList>

                    {/* Users Tab */}
                    <TabsContent value="users">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    User Management
                                </CardTitle>
                                <CardDescription>
                                    Create and manage users (students, scribes, admins)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Email</Label>
                                        <Input
                                            value={userForm.email}
                                            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <Label>Name</Label>
                                        <Input
                                            value={userForm.name}
                                            onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <Label>Role</Label>
                                        <Select
                                            value={userForm.role}
                                            onValueChange={(value) => setUserForm({...userForm, role: value})}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="student">Student</SelectItem>
                                                <SelectItem value="scribe">Scribe</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="superadmin">SuperAdmin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {(userForm.role === "student" || userForm.role === "scribe") && (
                                        <div>
                                            <Label>Subjects (comma-separated)</Label>
                                            <Input
                                                value={userForm.subjects}
                                                onChange={(e) => setUserForm({...userForm, subjects: e.target.value})}
                                                placeholder="Mathematics,Physics,Chemistry"
                                            />
                                        </div>
                                    )}
                                    {userForm.role === "student" && (
                                        <div>
                                            <Label>Class</Label>
                                            <Input
                                                value={userForm.class}
                                                onChange={(e) => setUserForm({...userForm, class: e.target.value})}
                                            />
                                        </div>
                                    )}
                                    {userForm.role === "admin" && (
                                        <>
                                            <div>
                                                <Label>School Name</Label>
                                                <Input
                                                    value={userForm.schoolName}
                                                    onChange={(e) => setUserForm({...userForm, schoolName: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <Label>School ID</Label>
                                                <Input
                                                    value={userForm.schoolId}
                                                    onChange={(e) => setUserForm({...userForm, schoolId: e.target.value})}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <Button onClick={createUser} disabled={loading}>
                                    Create User
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Admin Requests Tab */}
                    <TabsContent value="admin-requests">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <School className="h-5 w-5" />
                                    Admin Requests
                                </CardTitle>
                                <CardDescription>
                                    Test admin approval workflow
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>User ID</Label>
                                        <Input
                                            value={requestForm.userId}
                                            onChange={(e) => setRequestForm({...requestForm, userId: e.target.value})}
                                            placeholder="Leave empty for demo ID"
                                        />
                                    </div>
                                    <div>
                                        <Label>School Name</Label>
                                        <Input
                                            value={requestForm.schoolName}
                                            onChange={(e) => setRequestForm({...requestForm, schoolName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <Label>School ID</Label>
                                        <Input
                                            value={requestForm.schoolId}
                                            onChange={(e) => setRequestForm({...requestForm, schoolId: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={createAdminRequest} disabled={loading}>
                                        Create Admin Request
                                    </Button>
                                    <Button onClick={getPendingAdminRequests} variant="outline" disabled={loading}>
                                        Get Pending Requests
                                    </Button>
                                </div>

                                <div className="border-t pt-4 space-y-4">
                                    <h4 className="font-medium">Update Request</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label>Request ID</Label>
                                            <Input
                                                value={requestForm.requestId}
                                                onChange={(e) => setRequestForm({...requestForm, requestId: e.target.value})}
                                                placeholder="Request ID to update"
                                            />
                                        </div>
                                        <div>
                                            <Label>Action</Label>
                                            <Select
                                                value={requestForm.action}
                                                onValueChange={(value) => setRequestForm({...requestForm, action: value})}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="approve">Approve</SelectItem>
                                                    <SelectItem value="reject">Reject</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {requestForm.action === "reject" && (
                                        <div>
                                            <Label>Rejection Reason</Label>
                                            <Textarea
                                                value={requestForm.rejectionReason}
                                                onChange={(e) => setRequestForm({...requestForm, rejectionReason: e.target.value})}
                                                placeholder="Reason for rejection"
                                            />
                                        </div>
                                    )}
                                    <Button onClick={updateAdminRequest} disabled={loading}>
                                        Update Request
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Scribe Requests Tab */}
                    <TabsContent value="scribe-requests">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Scribe Requests
                                </CardTitle>
                                <CardDescription>
                                    Test scribe matching workflow
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button onClick={createScribeRequest} disabled={loading}>
                                    Create Demo Scribe Request
                                </Button>
                                <Button
                                    onClick={() => handleApiCall("/api/scribe-requests?status=pending")}
                                    variant="outline"
                                    disabled={loading}
                                >
                                    Get Pending Scribe Requests
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Matches Tab */}
                    <TabsContent value="matches">
                        <Card>
                            <CardHeader>
                                <CardTitle>Auto-Matching</CardTitle>
                                <CardDescription>
                                    Test automatic scribe matching
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button onClick={findMatches} disabled={loading}>
                                    Find Matches for Demo Student
                                </Button>
                                <Button
                                    onClick={() => handleApiCall("/api/matches?studentId=demo-student-id")}
                                    variant="outline"
                                    disabled={loading}
                                >
                                    Get Student Matches
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Demo Data Tab */}
                    <TabsContent value="demo">
                        <Card>
                            <CardHeader>
                                <CardTitle>Demo Data</CardTitle>
                                <CardDescription>
                                    Create sample data for testing
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2 flex-wrap">
                                    <Button onClick={() => createDemoData("users")} disabled={loading}>
                                        Create Demo Users
                                    </Button>
                                    <Button onClick={() => createDemoData("admin-request")} variant="outline" disabled={loading}>
                                        Create Admin Request
                                    </Button>
                                    <Button onClick={() => createDemoData("scribe-request")} variant="outline" disabled={loading}>
                                        Create Scribe Request
                                    </Button>
                                </div>
                                <Button
                                    onClick={() => handleApiCall("/api/demo")}
                                    variant="secondary"
                                    disabled={loading}
                                >
                                    Get Demo Info
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Results Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            ) : error ? (
                                <AlertCircle className="h-5 w-5 text-red-600" />
                            ) : result ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : null}
                            API Response
                        </CardTitle>
                        {(result || error) && (
                            <Button onClick={clearResults} variant="outline" size="sm">
                                Clear
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {loading && (
                            <div className="flex items-center justify-center py-8">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                    <p className="text-gray-600">Making API call...</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Error
                                </div>
                                <pre className="text-sm text-red-700 whitespace-pre-wrap">{error}</pre>
                            </div>
                        )}

                        {result && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Success
                                </div>
                                <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-white p-3 rounded border overflow-auto">
                                    {JSON.stringify(result, null, 2)}
                                </pre>
                            </div>
                        )}

                        {!loading && !error && !result && (
                            <div className="text-center py-8 text-gray-500">
                                <p>API responses will appear here</p>
                                <p className="text-sm">Try making an API call using the tabs above</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Start Guide */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Start Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium mb-2">1. Create Demo Data</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                    Start by creating demo users to test the system
                                </p>
                                <Badge variant="outline">Demo Data → Create Demo Users</Badge>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">2. Test Admin Workflow</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                    Create and approve admin requests
                                </p>
                                <Badge variant="outline">Admin Requests → Create & Approve</Badge>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">3. Test Scribe Matching</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                    Create scribe requests and find matches
                                </p>
                                <Badge variant="outline">Matches → Find Matches</Badge>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">4. View Components</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                    Check the admin dashboards to see the UI components
                                </p>
                                <Badge variant="outline">Visit /dashboard/admin or /dashboard/superadmin</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
