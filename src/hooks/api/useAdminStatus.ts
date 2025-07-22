import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface AdminStatus {
    isApproved: boolean;
    isPending: boolean;
    isRejected: boolean;
    requestId?: string;
    rejectionReason?: string;
    schoolName?: string;
}

interface UseAdminStatusReturn {
    adminStatus: AdminStatus | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useAdminStatus = (): UseAdminStatusReturn => {
    const { user } = useUser();
    const [adminStatus, setAdminStatus] = useState<AdminStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAdminStatus = useCallback(async () => {
        if (!user?.id) {
            setAdminStatus(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/admin-status?userId=${user.id}`);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 404) {
                    // No admin request found - user hasn't requested admin access
                    setAdminStatus({
                        isApproved: false,
                        isPending: false,
                        isRejected: false,
                    });
                } else {
                    throw new Error(
                        data.error || "Failed to fetch admin status"
                    );
                }
            } else {
                setAdminStatus(data.adminStatus);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchAdminStatus();
    }, [fetchAdminStatus]);

    return {
        adminStatus,
        loading,
        error,
        refetch: fetchAdminStatus,
    };
};

export default useAdminStatus;
