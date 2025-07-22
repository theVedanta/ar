import { useState, useEffect, useCallback } from "react";
import { AdminRequest } from "@/lib/firebase/types";

interface UseAdminRequestsProps {
    status?: string;
    autoFetch?: boolean;
}

interface UseAdminRequestsReturn {
    requests: AdminRequest[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    createRequest: (requestData: {
        userId: string;
        schoolName: string;
        schoolId: string;
        documents?: {
            schoolCertificate?: string;
            idProof?: string;
        };
    }) => Promise<{ requestId: string }>;
    approveRequest: (requestId: string, superAdminId: string) => Promise<void>;
    rejectRequest: (
        requestId: string,
        superAdminId: string,
        reason: string
    ) => Promise<void>;
}

export const useAdminRequests = ({
    status = "pending",
    autoFetch = true,
}: UseAdminRequestsProps = {}): UseAdminRequestsReturn => {
    const [requests, setRequests] = useState<AdminRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        if (!autoFetch && !status) return;

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (status) params.append("status", status);

            const response = await fetch(
                `/api/admin-requests?${params.toString()}`
            );
            const data = await response.json();

            if (!response.ok)
                throw new Error(data.error || "Failed to fetch admin requests");

            setRequests(data.requests || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [status, autoFetch]);

    const createRequest = useCallback(
        async (requestData: {
            userId: string;
            schoolName: string;
            schoolId: string;
            documents?: {
                schoolCertificate?: string;
                idProof?: string;
            };
        }) => {
            setError(null);
            console.log("REQUEST DATA -------------------------", requestData);

            try {
                const response = await fetch("/api/admin-requests", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to create admin request"
                    );
                }

                // Refetch requests after creating
                await fetchRequests();

                return {
                    requestId: data.requestId,
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
        async (requestId: string, superAdminId: string) => {
            setError(null);

            try {
                const response = await fetch("/api/admin-requests", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestId,
                        action: "approve",
                        superAdminId,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to approve admin request"
                    );
                }

                // Update local state
                setRequests((prev) =>
                    prev.map((request) =>
                        request.id === requestId
                            ? {
                                  ...request,
                                  status: "approved",
                                  approvedBy: superAdminId,
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
        async (requestId: string, superAdminId: string, reason: string) => {
            setError(null);

            try {
                const response = await fetch("/api/admin-requests", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestId,
                        action: "reject",
                        superAdminId,
                        rejectionReason: reason,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to reject admin request"
                    );
                }

                // Update local state
                setRequests((prev) =>
                    prev.map((request) =>
                        request.id === requestId
                            ? {
                                  ...request,
                                  status: "rejected",
                                  rejectedBy: superAdminId,
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

export default useAdminRequests;
