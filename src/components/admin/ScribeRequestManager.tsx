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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    CheckCircle,
    XCircle,
    Clock,
    User,
    Calendar,
    MapPin,
    BookOpen,
    Star,
    AlertCircle,
} from "lucide-react";
import { useScribeRequests } from "@/hooks/api/useScribeRequests";
import { ScribeRequest } from "@/lib/firebase/types";

interface ScribeRequestManagerProps {
    adminId: string;
}

export default function ScribeRequestManager({
    adminId,
}: ScribeRequestManagerProps) {
    const {
        requests,
        loading,
        error,
        refetch,
        approveRequest,
        rejectRequest,
    } = useScribeRequests({
        adminId,
        autoFetch: true,
    });

    const [selectedRequest, setSelectedRequest] = useState<ScribeRequest | null>(
        null
    );
    const [rejectionReason, setRejectionReason] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    const handleApprove = async (requestId: string) => {
        setActionLoading(true);
        try {
            await approveRequest(requestId, adminId);
            // Success feedback could be added here
        } catch (error) {
            console.error("Error approving scribe request:", error);
            // Error feedback could be added here
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedRequest || !rejectionReason.trim()) return;

        setActionLoading(true);
        try {
            await rejectRequest(selectedRequest.id, adminId, rejectionReason);
            setShowRejectDialog(false);
            setSelectedRequest(null);
            setRejectionReason("");
            // Success feedback could be added here
        } catch (error) {
            console.error("Error rejecting scribe request:", error);
            // Error feedback could be added here
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (date: Date | string) => {
        const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            case "completed":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getMatchScoreColor = (score: number) => {
        if (score >= 90) return "text-green-600";
        if (score >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Scribe Requests</h2>
                    <Badge variant="secondary">Loading...</Badge>
                </div>
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardContent className="pt-6">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Scribe Requests</h2>
                    <Button onClick={refetch} variant="outline">
                        Retry
                    </Button>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="h-5 w-5" />
                            <span>Error: {error}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const pendingRequests = requests.filter(req => req.status === 'pending');
    const processedRequests = requests.filter(req => req.status !== 'pending');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Scribe Match Requests
                </h2>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                        {pendingRequests.length} pending
                    </Badge>
                    <Button onClick={refetch} variant="outline" size="sm">
                        Refresh
                    </Button>
                </div>
            </div>

            {pendingRequests.length === 0 && processedRequests.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                            No requests yet
                        </h3>
                        <p className="text-gray-600">
                            Scribe requests will appear here when students request matches.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-8">
                    {/* Pending Requests */}
                    {pendingRequests.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-orange-600">
                                Pending Approval ({pendingRequests.length})
                            </h3>
                            <div className="grid gap-6">
                                {pendingRequests.map((request) => (
                                    <RequestCard
                                        key={request.id}
                                        request={request}
                                        onApprove={handleApprove}
                                        onReject={(req) => {
                                            setSelectedRequest(req);
                                            setShowRejectDialog(true);
                                        }}
                                        actionLoading={actionLoading}
                                        getStatusColor={getStatusColor}
                                        getMatchScoreColor={getMatchScoreColor}
                                        formatDate={formatDate}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Processed Requests */}
                    {processedRequests.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-600">
                                Processed Requests ({processedRequests.length})
                            </h3>
                            <div className="grid gap-6">
                                {processedRequests.map((request) => (
                                    <RequestCard
                                        key={request.id}
                                        request={request}
                                        onApprove={() => {}}
                                        onReject={() => {}}
                                        actionLoading={false}
                                        getStatusColor={getStatusColor}
                                        getMatchScoreColor={getMatchScoreColor}
                                        formatDate={formatDate}
                                        readonly
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Reject Dialog */}
            <Dialog
                open={showRejectDialog}
                onOpenChange={(open) => {
                    setShowRejectDialog(open);
                    if (!open) {
                        setSelectedRequest(null);
                        setRejectionReason("");
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Scribe Request</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this scribe match request.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="reason">Rejection Reason</Label>
                            <Textarea
                                id="reason"
                                placeholder="Please explain why this request is being rejected..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowRejectDialog(false);
                                setSelectedRequest(null);
                                setRejectionReason("");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleReject}
                            disabled={!rejectionReason.trim() || actionLoading}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {actionLoading ? "Rejecting..." : "Reject Request"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

interface RequestCardProps {
    request: ScribeRequest;
    onApprove: (requestId: string) => void;
    onReject: (request: ScribeRequest) => void;
    actionLoading: boolean;
    getStatusColor: (status: string) => string;
    getMatchScoreColor: (score: number) => string;
    formatDate: (date: Date | string) => string;
    readonly?: boolean;
}

function RequestCard({
    request,
    onApprove,
    onReject,
    actionLoading,
    getStatusColor,
    getMatchScoreColor,
    formatDate,
    readonly = false,
}: RequestCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback>
                                <User className="h-6 w-6" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">
                                Student-Scribe Match Request
                            </CardTitle>
                            <CardDescription>
                                Match ID: {request.id.slice(0, 8)}...
                            </CardDescription>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className={getStatusColor(request.status)}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                        {request.matchScore && (
                            <p className={`text-sm font-medium mt-1 ${getMatchScoreColor(request.matchScore)}`}>
                                {request.matchScore}% match
                            </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                            Requested {formatDate(request.createdAt)}
                        </p>
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
                            <p className="text-sm font-medium">{request.examDetails.examName}</p>
                            <p className="text-xs text-gray-500">{request.examDetails.examType}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-sm text-gray-600 mb-2">
                                Subjects
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {request.examDetails.subjects.map((subject) => (
                                    <Badge key={subject} variant="outline" className="text-xs">
                                        {subject}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {request.examDetails.examDate}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {request.examDetails.examTime}
                        </div>
                    </div>

                    <div className="flex items-start gap-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{request.examDetails.location}</span>
                    </div>

                    {!readonly && request.status === "pending" && (
                        <div className="flex gap-2 pt-2">
                            <Button
                                onClick={() => onApprove(request.id)}
                                disabled={actionLoading}
                                className="flex items-center gap-2"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Approve Match
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => onReject(request)}
                                disabled={actionLoading}
                                className="flex items-center gap-2"
                            >
                                <XCircle className="h-4 w-4" />
                                Reject
                            </Button>
                        </div>
                    )}

                    {request.status === "approved" && request.approvedBy && (
                        <div className="text-sm text-green-600">
                            Approved by {request.approvedBy} on {request.approvedAt && formatDate(request.approvedAt)}
                        </div>
                    )}

                    {request.status === "rejected" && request.rejectedBy && (
                        <div className="space-y-1">
                            <div className="text-sm text-red-600">
                                Rejected by {request.rejectedBy} on {request.rejectedAt && formatDate(request.rejectedAt)}
                            </div>
                            {request.rejectionReason && (
                                <div className="text-sm text-gray-600">
                                    Reason: {request.rejectionReason}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
