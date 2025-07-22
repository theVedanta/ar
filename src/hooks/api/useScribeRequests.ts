import { useState, useEffect, useCallback } from "react";
import { ScribeRequest } from "@/lib/firebase/types";

interface UseScribeRequestsProps {
    adminId?: string;
    status?: string;
    autoFetch?: boolean;
}

interface UseScribeRequestsReturn {
    requests: ScribeRequest[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    createRequest: (requestData: {
        studentId: string;
        scribeId: string;
        examDetails: unknown;
        adminId?: string;
    }) => Promise<{ requestId: string; matchScore: number }>;
    approveRequest: (requestId: string, userId: string) => Promise<void>;
    rejectRequest: (
        requestId: string,
        userId: string,
        reason: string
    ) => Promise<void>;
}

export const useScribeRequests = ({
    adminId,
    status = "pending",
    autoFetch = true,
}: UseScribeRequestsProps = {}): UseScribeRequestsReturn => {
    const [requests, setRequests] = useState<ScribeRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        if (!autoFetch && !adminId && !status) return;

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (adminId) params.append("adminId", adminId);
            if (status) params.append("status", status);

            const response = await fetch(
                `/api/scribe-requests?${params.toString()}`
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to fetch scribe requests"
                );
            }

            setRequests(data.requests || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [adminId, status, autoFetch]);

    const createRequest = useCallback(
        async (requestData: {
            studentId: string;
            scribeId: string;
            examDetails: unknown;
            adminId?: string;
        }) => {
            setError(null);

            try {
                const response = await fetch("/api/scribe-requests", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to create scribe request"
                    );
                }

                // Refetch requests after creating
                await fetchRequests();

                return {
                    requestId: data.requestId,
                    matchScore: data.matchScore,
                };
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                throw new Error(errorMessage);
            }
        },
        [fetchRequests]
    );

    const approveRequest = useCallback(
        async (requestId: string, userId: string) => {
            setError(null);

            try {
                const response = await fetch("/api/scribe-requests", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestId,
                        action: "approve",
                        userId,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to approve scribe request"
                    );
                }

                // Update local state
                setRequests((prev) =>
                    prev.map((request) =>
                        request.id === requestId
                            ? {
                                  ...request,
                                  status: "approved",
                                  approvedBy: userId,
                                  approvedAt: new Date(),
                              }
                            : request
                    )
                );
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                throw new Error(errorMessage);
            }
        },
        []
    );

    const rejectRequest = useCallback(
        async (requestId: string, userId: string, reason: string) => {
            setError(null);

            try {
                const response = await fetch("/api/scribe-requests", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestId,
                        action: "reject",
                        userId,
                        rejectionReason: reason,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to reject scribe request"
                    );
                }

                // Update local state
                setRequests((prev) =>
                    prev.map((request) =>
                        request.id === requestId
                            ? {
                                  ...request,
                                  status: "rejected",
                                  rejectedBy: userId,
                                  rejectedAt: new Date(),
                                  rejectionReason: reason,
                              }
                            : request
                    )
                );
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                throw new Error(errorMessage);
            }
        },
        []
    );

    useEffect(() => {
        if (autoFetch) {
            fetchRequests();
        }
    }, [fetchRequests, autoFetch]);

    return {
        requests,
        loading,
        error,
        refetch: fetchRequests,
        createRequest,
        approveRequest,
        rejectRequest,
    };
};

export default useScribeRequests;
