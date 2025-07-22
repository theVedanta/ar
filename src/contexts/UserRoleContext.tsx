"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useUsers } from "@/hooks/api/useUsers";

type UserRole = "student" | "scribe" | "admin" | "superadmin" | null;

interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    profileComplete: boolean;
    // Additional fields based on role
    [key: string]: any;
}

interface UserRoleContextType {
    userProfile: UserProfile | null;
    role: UserRole;
    loading: boolean;
    error: string | null;
    refreshProfile: () => Promise<void>;
    setRole: (role: UserRole) => void;
    isProfileComplete: boolean;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
    undefined
);

export function useUserRole() {
    const context = useContext(UserRoleContext);
    if (context === undefined) {
        throw new Error("useUserRole must be used within a UserRoleProvider");
    }
    return context;
}

interface UserRoleProviderProps {
    children: React.ReactNode;
}

export function UserRoleProvider({ children }: UserRoleProviderProps) {
    const { user, isLoaded } = useUser();
    const { getUser } = useUsers();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkProfileCompleteness = (profile: any, userRole: UserRole): boolean => {
        if (!profile || !userRole) return false;

        switch (userRole) {
            case "student":
                return !!(
                    profile.name &&
                    profile.class &&
                    profile.subjects &&
                    profile.subjects.length > 0 &&
                    profile.examDetails
                );
            case "scribe":
                return !!(
                    profile.name &&
                    profile.subjects &&
                    profile.subjects.length > 0 &&
                    profile.examTypes &&
                    profile.examTypes.length > 0 &&
                    profile.availability
                );
            case "admin":
                return !!(profile.name && profile.schoolName && profile.schoolId);
            case "superadmin":
                return !!(profile.name);
            default:
                return false;
        }
    };

    const refreshProfile = async () => {
        if (!user?.id || !isLoaded) return;

        setLoading(true);
        setError(null);

        try {
            // Try to fetch user with different roles
            const roles: UserRole[] = ["student", "scribe", "admin", "superadmin"];
            let foundProfile = null;
            let foundRole = null;

            for (const testRole of roles) {
                try {
                    const profile = await getUser(user.id, testRole);
                    if (profile) {
                        foundProfile = profile;
                        foundRole = testRole;
                        break;
                    }
                } catch (err) {
                    // Continue to next role
                }
            }

            if (foundProfile && foundRole) {
                const profileComplete = checkProfileCompleteness(foundProfile, foundRole);
                setUserProfile({
                    ...foundProfile,
                    profileComplete,
                });
                setRole(foundRole);
            } else {
                // No profile found, user needs to choose role and create profile
                setUserProfile(null);
                setRole(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoaded && user?.id) {
            refreshProfile();
        }
    }, [user?.id, isLoaded]);

    const value: UserRoleContextType = {
        userProfile,
        role,
        loading,
        error,
        refreshProfile,
        setRole,
        isProfileComplete: userProfile?.profileComplete ?? false,
    };

    return (
        <UserRoleContext.Provider value={value}>
            {children}
        </UserRoleContext.Provider>
    );
}
