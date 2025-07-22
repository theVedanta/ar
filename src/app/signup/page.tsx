"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <SignUp
                path="/signup"
                routing="path"
                fallbackRedirectUrl="/choose-role"
                forceRedirectUrl="/choose-role"
            />
        </div>
    );
}
