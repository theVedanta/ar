import { useState, useCallback } from "react";

interface CreateUserData {
    userId: string;
    name: string;
    role: "student" | "scribe" | "admin" | "superadmin";
    // Additional data for specific roles
    class?: string;
    subjects?: string[];
    examDetails?: any;
    disability?: { type: "visual" };
    schoolId?: string;
    experience?: string;
    examTypes?: string[];
    location?: string;
    language?: string[];
    availability?: string;
    gender?: string;
    age?: number;
    schoolName?: string;
    isApproved?: boolean;
}

interface UseUsersReturn {
    loading: boolean;
    error: string | null;
    createUser: (userData: CreateUserData) => Promise<{ userId: string }>;
    createUserIfNotExists: (
        userData: CreateUserData
    ) => Promise<{ userId: string; created: boolean }>;
    getUser: (userId: string, role?: string) => Promise<any>;
    updateUser: (userId: string, updateData: any) => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = useCallback(async (userData: CreateUserData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create user");
            }

            return {
                userId: data.userId,
            };
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const getUser = useCallback(async (userId: string, role?: string) => {
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("userId", userId);
            if (role) params.append("role", role);

            const response = await fetch(`/api/users?${params.toString()}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch user");
            }

            return data.user;
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, []);

    const createUserIfNotExists = useCallback(
        async (userData: CreateUserData) => {
            setLoading(true);
            setError(null);

            try {
                // First check if user already exists
                try {
                    const existingUser = await getUser(
                        userData.userId,
                        userData.role
                    );
                    if (existingUser) {
                        return {
                            userId: userData.userId,
                            created: false,
                        };
                    }
                } catch (err) {
                    // User doesn't exist, continue with creation
                }

                // Create the user since they don't exist
                const result = await createUser(userData);
                return {
                    userId: result.userId,
                    created: true,
                };
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                throw new Error(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [createUser, getUser]
    );

    const updateUser = useCallback(async (userId: string, updateData: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    ...updateData,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update user");
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        createUser,
        createUserIfNotExists,
        getUser,
        updateUser,
    };
};

export default useUsers;
