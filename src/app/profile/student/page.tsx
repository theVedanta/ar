"use client";

import type React from "react";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, MapPin } from "lucide-react";

export default function StudentProfilePage() {
    const [formData, setFormData] = useState({
        name: "",
        class: "",
        age: "",
        subjects: [] as string[],
        examName: "",
        examType: [] as string[],
        language: [] as string[],
        genderPreference: "",
        examDate: "",
        examTime: "",
        location: "",
        additionalComments: "",
    });

    const subjects = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "History",
        "Geography",
        "Political Science",
        "Economics",
        "Computer Science",
        "Other",
    ];

    const examTypes = [
        { value: "descriptive", label: "Descriptive" },
        { value: "mcq", label: "MCQ" },
        { value: "computerised", label: "Computerised" },
        { value: "other", label: "Other" },
    ];

    const languages = [
        { value: "english", label: "English" },
        { value: "hindi", label: "Hindi" },
        { value: "bengali", label: "Bengali" },
        { value: "telugu", label: "Telugu" },
        { value: "marathi", label: "Marathi" },
        { value: "tamil", label: "Tamil" },
        { value: "urdu", label: "Urdu" },
        { value: "gujarati", label: "Gujarati" },
        { value: "regional", label: "Other" },
    ];

    const handleSubjectChange = (subject: string, checked: boolean) => {
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                subjects: [...prev.subjects, subject],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                subjects: prev.subjects.filter((s) => s !== subject),
            }));
        }
    };

    const handleExamTypeChange = (type: string, checked: boolean) => {
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                examType: [...prev.examType, type],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                examType: prev.examType.filter((t) => t !== type),
            }));
        }
    };

    const handleLanguageChange = (lang: string, checked: boolean) => {
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                language: [...prev.language, lang],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                language: prev.language.filter((l) => l !== lang),
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Student profile:", formData);
        // Redirect to dashboard
        window.location.href = "/dashboard/student";
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Student Profile Setup
                        </CardTitle>
                        <CardDescription>
                            Please provide your details to help us find the best
                            scribe match for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="class">Class/Grade *</Label>
                                    <Input
                                        id="class"
                                        value={formData.class}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                class: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="age">Age *</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                age: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* Subjects */}
                            <div>
                                <Label className="text-base font-medium mb-3 block">
                                    Subjects you need help with *
                                </Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {subjects.map((subject) => (
                                        <div
                                            key={subject}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={subject}
                                                checked={formData.subjects.includes(
                                                    subject
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleSubjectChange(
                                                        subject,
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={subject}
                                                className="text-sm"
                                            >
                                                {subject}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Exam Details */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="examName">
                                        Exam Name *
                                    </Label>
                                    <Input
                                        id="examName"
                                        placeholder="e.g., CBSE Board Exam, JEE, NEET"
                                        value={formData.examName}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                examName: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-medium">
                                        Exam Type *
                                    </Label>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {examTypes.map((type) => (
                                            <div
                                                key={type.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={`examType-${type.value}`}
                                                    checked={formData.examType.includes(
                                                        type.value
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleExamTypeChange(
                                                            type.value,
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`examType-${type.value}`}
                                                >
                                                    {type.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-base font-medium">
                                            Language Preference *
                                        </Label>
                                        <div className="flex flex-wrap gap-4 mt-2">
                                            {languages.map((lang) => (
                                                <div
                                                    key={lang.value}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Checkbox
                                                        id={`language-${lang.value}`}
                                                        checked={formData.language.includes(
                                                            lang.value
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleLanguageChange(
                                                                lang.value,
                                                                checked as boolean
                                                            )
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={`language-${lang.value}`}
                                                    >
                                                        {lang.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="genderPreference">
                                            Gender Preference (Optional)
                                        </Label>
                                        <Select
                                            value={formData.genderPreference}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    genderPreference: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="No preference" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="no-preference">
                                                    No Preference
                                                </SelectItem>
                                                <SelectItem value="male">
                                                    Male
                                                </SelectItem>
                                                <SelectItem value="female">
                                                    Female
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Schedule & Location */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="examDate">
                                            <CalendarDays className="inline h-4 w-4 mr-1" />
                                            Exam Date *
                                        </Label>
                                        <Input
                                            id="examDate"
                                            type="date"
                                            value={formData.examDate}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    examDate: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="examTime">
                                            Exam Time *
                                        </Label>
                                        <Input
                                            id="examTime"
                                            type="time"
                                            value={formData.examTime}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    examTime: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="location">
                                        <MapPin className="inline h-4 w-4 mr-1" />
                                        Exam Location & Centre *
                                    </Label>
                                    <Input
                                        id="location"
                                        placeholder="Enter exam centre address"
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                location: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* Additional Comments */}
                            <div>
                                <Label htmlFor="additionalComments">
                                    Additional Comments
                                </Label>
                                <Textarea
                                    id="additionalComments"
                                    placeholder="Any specific requirements or additional information..."
                                    value={formData.additionalComments}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            additionalComments: e.target.value,
                                        }))
                                    }
                                    rows={3}
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Complete Profile & Find Scribes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
