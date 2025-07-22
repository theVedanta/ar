"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, Users } from "lucide-react";

export default function ChooseRolePage() {
    const router = useRouter();

    const handleChoose = (role: string) => {
        if (role === "student") {
            router.push("/profile/student");
        } else if (role === "scribe") {
            router.push("/profile/scribe");
        } else {
            router.push("/admin");
        }
    };

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
