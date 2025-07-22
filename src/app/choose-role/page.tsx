"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Eye, Users, Loader2 } from "lucide-react";
import { useUsers } from "@/hooks/api/useUsers";

export default function ChooseRolePage() {
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
                } catch (err) {
                    // Continue checking other roles
                }
            }
        };

        checkExistingProfile();
    }, [user?.id, isLoaded, router, getUser]);

    const handleChoose = (role: string) => {
        if (role === "student") {
            router.push("/profile/student");
        } else if (role === "scribe") {
            router.push("/profile/scribe");
        } else {
            router.push("/profile/admin");
        }
    };

    // Show loading state while checking for existing profile
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Checking your profile...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    I am a...
                </h2>
                <div className="space-y-4">
                    <Button
                        className="w-full flex items-center justify-center gap-2"
                        variant="outline"
                        onClick={() => handleChoose("student")}
                    >
                        <Eye className="h-5 w-5 text-sky-600" />
                        Visually Impaired Student
                    </Button>
                    <Button
                        className="w-full flex items-center justify-center gap-2"
                        variant="outline"
                        onClick={() => handleChoose("scribe")}
                    >
                        <Users className="h-5 w-5 text-emerald-600" />
                        Volunteer Scribe
                    </Button>
                    <Button
                        className="w-full flex items-center justify-center gap-2"
                        variant="outline"
                        onClick={() => handleChoose("admin")}
                    >
                        <Users className="h-5 w-5 text-rose-600" />
                        Admin
                    </Button>
                </div>
            </div>
        </div>
    );
}
