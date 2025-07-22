"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    School,
    Upload,
    FileText,
    AlertCircle,
    CheckCircle,
    Clock,
} from "lucide-react";
import { useAdminRequests } from "@/hooks/api/useAdminRequests";
import { useUsers } from "@/hooks/api/useUsers";

export default function AdminProfilePage() {
    const { user } = useUser();
    const router = useRouter();
    const { createRequest, loading } = useAdminRequests();
    const { createUserIfNotExists, loading: userLoading } = useUsers();

    const [formData, setFormData] = useState({
        schoolName: "",
        schoolId: "",
        position: "",
        schoolType: "",
        address: "",
        phoneNumber: "",
        alternateEmail: "",
    });

    const [documents, setDocuments] = useState({
        schoolCertificate: "",
        idProof: "",
    });

    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDocumentUpload = (
        type: "schoolCertificate" | "idProof",
        file: File
    ) => {
        // In a real implementation, you would upload the file to cloud storage
        // and get back a URL. For now, we'll just use a placeholder
        const mockUrl = `https://storage.example.com/documents/${file.name}`;
        setDocuments((prev) => ({
            ...prev,
            [type]: mockUrl,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("USER ID", user?.id);

        if (!user?.id) {
            setErrorMessage("User authentication required");
            setSubmitStatus("error");
            return;
        }

        if (!formData.schoolName || !formData.schoolId || !formData.position) {
            setErrorMessage("Please fill in all required fields");
            setSubmitStatus("error");
            return;
        }

        setSubmitStatus("submitting");
        setErrorMessage("");

        try {
            // First create the user record if it doesn't exist
            await createUserIfNotExists({
                userId: user.id,
                name: user.fullName || user.firstName || "",
                role: "admin",
                schoolName: formData.schoolName,
                schoolId: formData.schoolId,
                isApproved: false,
            });

            // Then create the admin request
            await createRequest({
                userId: user.id,
                schoolName: formData.schoolName,
                schoolId: formData.schoolId,
                documents:
                    documents.schoolCertificate || documents.idProof
                        ? documents
                        : undefined,
            });

            setSubmitStatus("success");
        } catch (error) {
            console.error("Error submitting admin request:", error);
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to submit request"
            );
            setSubmitStatus("error");
        }
    };

    if (submitStatus === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Request Submitted!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Your admin access request has been submitted
                            successfully. A super administrator will review your
                            request and get back to you soon.
                        </p>
                        <Badge variant="secondary" className="mb-4">
                            <Clock className="h-4 w-4 mr-1" />
                            Pending Review
                        </Badge>
                        <div className="space-y-2">
                            <Button
                                onClick={() => router.push("/dashboard/admin")}
                                className="w-full"
                            >
                                Go to Dashboard
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/")}
                                className="w-full"
                            >
                                Return Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Request Admin Access
                    </h1>
                    <p className="text-gray-600">
                        Please provide your school details to request
                        administrator access
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <School className="h-5 w-5" />
                            School Information
                        </CardTitle>
                        <CardDescription>
                            Fill in your school details for verification
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="schoolName">
                                        School Name{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="schoolName"
                                        value={formData.schoolName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "schoolName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter school name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="schoolId">
                                        School ID/Code{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="schoolId"
                                        value={formData.schoolId}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "schoolId",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter school ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="position">
                                        Your Position{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        onValueChange={(value) =>
                                            handleInputChange("position", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your position" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="principal">
                                                Principal
                                            </SelectItem>
                                            <SelectItem value="vice-principal">
                                                Vice Principal
                                            </SelectItem>
                                            <SelectItem value="admin-officer">
                                                Administrative Officer
                                            </SelectItem>
                                            <SelectItem value="special-educator">
                                                Special Educator
                                            </SelectItem>
                                            <SelectItem value="counselor">
                                                Counselor
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="schoolType">
                                        School Type
                                    </Label>
                                    <Select
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "schoolType",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select school type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cbse">
                                                CBSE
                                            </SelectItem>
                                            <SelectItem value="icse">
                                                ICSE
                                            </SelectItem>
                                            <SelectItem value="state-board">
                                                State Board
                                            </SelectItem>
                                            <SelectItem value="international">
                                                International
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-2">
                                <Label htmlFor="address">School Address</Label>
                                <Textarea
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "address",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter complete school address"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phoneNumber",
                                                e.target.value
                                            )
                                        }
                                        placeholder="School phone number"
                                        type="tel"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="alternateEmail">
                                        Alternate Email
                                    </Label>
                                    <Input
                                        id="alternateEmail"
                                        value={formData.alternateEmail}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "alternateEmail",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Official school email"
                                        type="email"
                                    />
                                </div>
                            </div>

                            {/* Document Upload Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    <Label className="text-base font-medium">
                                        Supporting Documents
                                    </Label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>School Certificate/Letter</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-600">
                                                Upload school authorization
                                                letter
                                            </p>
                                            <Input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        handleDocumentUpload(
                                                            "schoolCertificate",
                                                            file
                                                        );
                                                    }
                                                }}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>ID Proof</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-600">
                                                Upload government ID
                                            </p>
                                            <Input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        handleDocumentUpload(
                                                            "idProof",
                                                            file
                                                        );
                                                    }
                                                }}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Error Display */}
                            {submitStatus === "error" && errorMessage && (
                                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm">
                                        {errorMessage}
                                    </span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        userLoading ||
                                        submitStatus === "submitting"
                                    }
                                    className="flex-1"
                                >
                                    {submitStatus === "submitting"
                                        ? "Submitting..."
                                        : "Submit Request"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
