"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <SignIn
                path="/login"
                routing="path"
                fallbackRedirectUrl="/choose-role"
                forceRedirectUrl="/choose-role"
            />
        </div>
    );
}
