"use client";

import type React from "react";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, Users, Shield } from "lucide-react";

export default function SignUpPage() {
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") || "";

    const [role, setRole] = useState(initialRole);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic here
        console.log({ role, email, phone, password });
        // Redirect to profile setup based on role
        if (role === "student") {
            window.location.href = "/profile/student";
        } else if (role === "scribe") {
            window.location.href = "/profile/scribe";
        } else if (role === "admin") {
            window.location.href = "/dashboard/admin";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <CardDescription>
                        Join ScribeConnect to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">
                                I am a:
                            </Label>
                            <RadioGroup
                                value={role}
                                onValueChange={setRole}
                                className="space-y-3"
                            >
                                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                    <RadioGroupItem
                                        value="student"
                                        id="student"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-5 w-5 text-blue-600" />
                                        <Label
                                            htmlFor="student"
                                            className="cursor-pointer"
                                        >
                                            Visually Impaired Student
                                        </Label>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                    <RadioGroupItem
                                        value="scribe"
                                        id="scribe"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-green-600" />
                                        <Label
                                            htmlFor="scribe"
                                            className="cursor-pointer"
                                        >
                                            Volunteer Scribe
                                        </Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!role}
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-600 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
