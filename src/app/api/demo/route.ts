import { NextRequest, NextResponse } from "next/server";
import {
    createUser,
    createStudent,
    createScribe,
    createAdmin,
    createAdminRequest,
    createScribeRequest,
} from "@/lib/firebase/services";

// POST - Create demo data for testing
export async function POST(request: NextRequest) {
    try {
        const { type } = await request.json();

        if (type === "users") {
            // Create demo users
            const users = [];

            // Create a student
            const studentData = {
                id: "demo-student-1",
                email: "student1@example.com",
                name: "Arjun Mehta",
                role: "student" as const,
                isActive: true,
                class: "12th Grade",
                subjects: ["Mathematics", "Physics"],
                examDetails: {
                    examName: "CBSE Board Exam",
                    examType: "Written",
                    examDate: "2024-12-20",
                    examTime: "10:00 AM",
                    location: "Delhi Public School, Sector 12, Delhi",
                    language: "English",
                    genderPreference: "No Preference",
                },
                disability: {
                    type: "visual",
                    description: "Complete blindness",
                },
                schoolId: "school-001",
            };
            // const studentId = await createStudent(studentData);
            await createStudent(studentData);
            users.push({ type: "student", ...studentData });

            // Create a scribe
            const scribeData = {
                id: "demo-scribe-1",
                email: "scribe1@example.com",
                name: "Priya Sharma",
                role: "scribe" as const,
                isActive: true,
                subjects: ["Mathematics", "Physics", "Chemistry"],
                experience: "2 years",
                rating: 4.8,
                totalRatings: 25,
                examTypes: ["12th Grade", "JEE", "CBSE"],
                location: "Delhi",
                language: ["English", "Hindi"],
                availability: "available" as const,
                gender: "Female",
                age: 22,
            };
            // const scribeId = await createScribe(scribeData);
            await createScribe(scribeData);
            users.push({ type: "scribe", ...scribeData });

            // Create an admin
            const adminData = {
                id: "demo-admin-1",
                email: "admin1@example.com",
                name: "Principal Kumar",
                role: "admin" as const,
                isActive: true,
                schoolName: "Delhi Public School",
                schoolId: "school-001",
                isApproved: false,
            };
            // const adminId = await createAdmin(adminData);
            await createAdmin(adminData);
            users.push({ type: "admin", ...adminData });

            // Create a superadmin
            const superAdminData = {
                id: "demo-superadmin-1",
                email: "superadmin@example.com",
                name: "Super Admin",
                role: "superadmin" as const,
                isActive: true,
            };
            // const superAdminId = await createUser(superAdminData);
            await createUser(superAdminData);
            users.push({
                type: "superadmin",
                ...superAdminData,
            });

            return NextResponse.json({
                message: "Demo users created successfully",
                users,
            });
        } else if (type === "admin-request") {
            // Create demo admin request
            const adminRequestData = {
                userId: "demo-user-id",
                schoolName: "Modern Public School",
                schoolId: "school-002",
                status: "pending" as const,
                documents: {
                    schoolCertificate: "cert-url-1",
                    idProof: "id-proof-url-1",
                },
            };

            const requestId = await createAdminRequest(adminRequestData);

            return NextResponse.json({
                message: "Demo admin request created successfully",
                requestId,
                request: adminRequestData,
            });
        } else if (type === "scribe-request") {
            // Create demo scribe request
            const scribeRequestData = {
                studentId: "demo-student-id",
                scribeId: "demo-scribe-id",
                status: "pending" as const,
                examDetails: {
                    examName: "CBSE 12th Board Exam",
                    examType: "Written",
                    examDate: "2024-12-22",
                    examTime: "2:00 PM",
                    location: "St. Mary's School, Delhi",
                    subjects: ["Mathematics", "Physics"],
                },
                adminId: "demo-admin-id",
                matchScore: 92,
            };

            const requestId = await createScribeRequest(scribeRequestData);

            return NextResponse.json({
                message: "Demo scribe request created successfully",
                requestId,
                request: scribeRequestData,
            });
        } else {
            return NextResponse.json(
                {
                    error: "Invalid demo type. Use: users, admin-request, or scribe-request",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error creating demo data:", error);
        return NextResponse.json(
            { error: "Failed to create demo data" },
            { status: 500 }
        );
    }
}

// GET - Get demo data info
export async function GET() {
    return NextResponse.json({
        message: "Demo data API",
        availableTypes: ["users", "admin-request", "scribe-request"],
        usage: {
            "POST /api/demo": "Create demo data",
            body: { type: "users | admin-request | scribe-request" },
        },
    });
}
