"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useUsers } from "@/hooks/api/useUsers";

export default function Loading() {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { getUser } = useUsers();

    // Check if user already has a profile and redirect accordingly
    useEffect(() => {
        const checkExistingProfile = async () => {
            if (!user?.id || !isLoaded) return;

            const roles = ["student", "scribe", "admin", "superadmin"];

            for (const role of roles) {
                try {
                    const profile = await getUser(user.id, role);
                    if (profile) {
                        // User already has a profile, redirect to appropriate dashboard
                        router.push(`/dashboard/${role}`);
                        return;
                    }
                } catch {
                    // Continue checking other roles
                }
            }
        };

        checkExistingProfile();
    }, [user?.id, isLoaded, router, getUser]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
    );
}
