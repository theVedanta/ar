import { NextRequest, NextResponse } from "next/server";
import {
    createUser,
    getUserById,
    updateUser,
    createStudent,
    createScribe,
    createAdmin,
    getStudentById,
    getScribeById,
    getAdminById,
} from "@/lib/firebase/services";

// GET - Get user by ID
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const role = searchParams.get("role");

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        let user;

        if (role === "student") {
            user = await getStudentById(userId);
        } else if (role === "scribe") {
            user = await getScribeById(userId);
        } else if (role === "admin") {
            user = await getAdminById(userId);
        } else {
            user = await getUserById(userId);
        }

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 }
        );
    }
}

// POST - Create new user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, name, role, ...additionalData } = body;

        console.log("BODY", body);

        if (!userId || !role) {
            return NextResponse.json(
                { error: "userId, name, and role are required" },
                { status: 400 }
            );
        }

        if (!["student", "scribe", "admin", "superadmin"].includes(role)) {
            return NextResponse.json(
                { error: "Invalid role" },
                { status: 400 }
            );
        }

        let createdUserId;

        // Create user based on role
        if (role === "student") {
            const studentData = {
                id: userId,
                name,
                role: "student" as const,
                isActive: true,
                class: additionalData.class || "",
                subjects: additionalData.subjects || [],
                examDetails: additionalData.examDetails,
                disability: additionalData.disability || { type: "visual" },
                schoolId: additionalData.schoolId,
            };
            createdUserId = await createStudent(studentData);
        } else if (role === "scribe") {
            const scribeData = {
                id: userId,
                name,
                role: "scribe" as const,
                isActive: true,
                subjects: additionalData.subjects || [],
                experience: additionalData.experience || "0 years",
                rating: 0,
                totalRatings: 0,
                examTypes: additionalData.examTypes || [],
                location: additionalData.location || "",
                language: additionalData.language || ["English"],
                availability: additionalData.availability || "available",
                gender: additionalData.gender || "",
                age: additionalData.age || 18,
            };
            createdUserId = await createScribe(scribeData);
        } else if (role === "admin") {
            const adminData = {
                id: userId,
                name,
                role: "admin" as const,
                isActive: true,
                schoolName: additionalData.schoolName || "",
                schoolId: additionalData.schoolId || "",
                isApproved: false,
            };
            createdUserId = await createAdmin(adminData);
        } else {
            // Create basic user (superadmin)
            const userData = {
                id: userId,
                name,
                role: role as "superadmin",
                isActive: true,
            };
            createdUserId = await createUser(userData);
        }

        return NextResponse.json(
            {
                message: "User created successfully",
                userId: createdUserId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, ...updateData } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        await updateUser(userId, updateData);

        return NextResponse.json(
            { message: "User updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}
