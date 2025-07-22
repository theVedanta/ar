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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    CheckCircle,
    XCircle,
    Clock,
    School,
    User,
    FileText,
    AlertCircle,
} from "lucide-react";
import { useAdminRequests } from "@/hooks/api/useAdminRequests";
import { AdminRequest } from "@/lib/firebase/types";

interface AdminRequestManagerProps {
    superAdminId: string;
}

export default function AdminRequestManager({
    superAdminId,
}: AdminRequestManagerProps) {
    const { requests, loading, error, refetch, approveRequest, rejectRequest } =
        useAdminRequests({
            status: "pending",
            autoFetch: true,
        });

    const [selectedRequest, setSelectedRequest] = useState<AdminRequest | null>(
        null
    );
    const [rejectionReason, setRejectionReason] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    const handleApprove = async (requestId: string) => {
        setActionLoading(true);
        try {
            await approveRequest(requestId, superAdminId);
            // Success feedback could be added here
        } catch (error) {
            console.error("Error approving admin request:", error);
            // Error feedback could be added here
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedRequest || !rejectionReason.trim()) return;

        setActionLoading(true);
        try {
            await rejectRequest(
                selectedRequest.id,
                superAdminId,
                rejectionReason
            );
            setShowRejectDialog(false);
            setSelectedRequest(null);
            setRejectionReason("");
            // Success feedback could be added here
        } catch (error) {
            console.error("Error rejecting admin request:", error);
            // Error feedback could be added here
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (date: Date | string) => {
        const d = new Date();
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
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Admin Requests</h2>
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
                    <h2 className="text-xl font-semibold">Admin Requests</h2>
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Admin Approval Requests
                </h2>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                        {requests.length} pending requests
                    </Badge>
                    <Button onClick={refetch} variant="outline" size="sm">
                        Refresh
                    </Button>
                </div>
            </div>

            {requests.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                            All caught up!
                        </h3>
                        <p className="text-gray-600">
                            No pending admin requests at the moment.
                        </p>
                    </CardContent>
                </Card>
            ) : (
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
                                                <School className="h-6 w-6" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">
                                                {request.schoolName}
                                            </CardTitle>
                                            <CardDescription>
                                                School ID: {request.schoolId}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right">
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
                                        <p className="text-sm text-gray-500 mt-1">
                                            Requested{" "}
                                            {formatDate(request.requestedAt)}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <User className="h-4 w-4" />
                                            <span>
                                                User ID: {request.userId}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {formatDate(
                                                    request.requestedAt
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {request.documents && (
                                        <div className="space-y-2">
                                            <h4 className="font-medium text-sm text-gray-600">
                                                Documents
                                            </h4>
                                            <div className="flex gap-2">
                                                {request.documents
                                                    .schoolCertificate && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        <FileText className="h-3 w-3 mr-1" />
                                                        School Certificate
                                                    </Badge>
                                                )}
                                                {request.documents.idProof && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        <FileText className="h-3 w-3 mr-1" />
                                                        ID Proof
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {request.status === "pending" && (
                                        <div className="flex gap-2 pt-2">
                                            <Button
                                                onClick={() =>
                                                    handleApprove(request.id)
                                                }
                                                disabled={actionLoading}
                                                className="flex items-center gap-2"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                Approve Admin
                                            </Button>
                                            <Dialog
                                                open={
                                                    showRejectDialog &&
                                                    selectedRequest?.id ===
                                                        request.id
                                                }
                                                onOpenChange={(open) => {
                                                    setShowRejectDialog(open);
                                                    if (open) {
                                                        setSelectedRequest(
                                                            request
                                                        );
                                                    } else {
                                                        setSelectedRequest(
                                                            null
                                                        );
                                                        setRejectionReason("");
                                                    }
                                                }}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        disabled={actionLoading}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                        Reject
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Reject Admin Request
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Please provide a
                                                            reason for rejecting
                                                            the admin request
                                                            for{" "}
                                                            {request.schoolName}
                                                            .
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="reason">
                                                                Rejection Reason
                                                            </Label>
                                                            <Textarea
                                                                id="reason"
                                                                placeholder="Please explain why this request is being rejected..."
                                                                value={
                                                                    rejectionReason
                                                                }
                                                                onChange={(e) =>
                                                                    setRejectionReason(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="mt-1"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setShowRejectDialog(
                                                                    false
                                                                );
                                                                setSelectedRequest(
                                                                    null
                                                                );
                                                                setRejectionReason(
                                                                    ""
                                                                );
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                handleReject
                                                            }
                                                            disabled={
                                                                !rejectionReason.trim() ||
                                                                actionLoading
                                                            }
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            {actionLoading
                                                                ? "Rejecting..."
                                                                : "Reject Request"}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    )}

                                    {request.status === "approved" &&
                                        request.approvedBy && (
                                            <div className="text-sm text-green-600">
                                                Approved by {request.approvedBy}{" "}
                                                on{" "}
                                                {request.approvedAt &&
                                                    formatDate(
                                                        request.approvedAt
                                                    )}
                                            </div>
                                        )}

                                    {request.status === "rejected" &&
                                        request.rejectedBy && (
                                            <div className="space-y-1">
                                                <div className="text-sm text-red-600">
                                                    Rejected by{" "}
                                                    {request.rejectedBy} on{" "}
                                                    {request.rejectedAt &&
                                                        formatDate(
                                                            request.rejectedAt
                                                        )}
                                                </div>
                                                {request.rejectionReason && (
                                                    <div className="text-sm text-gray-600">
                                                        Reason:{" "}
                                                        {
                                                            request.rejectionReason
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
