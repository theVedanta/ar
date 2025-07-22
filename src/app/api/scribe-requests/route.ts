import { NextRequest, NextResponse } from "next/server";
import {
    createScribeRequest,
    getPendingScribeRequests,
    getScribeRequestsByAdmin,
    approveScribeRequest,
    rejectScribeRequest,
    getStudentById,
    getScribeById,
    calculateMatchScore,
} from "@/lib/firebase/services";

// GET - Get scribe requests (pending or by admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const adminId = searchParams.get("adminId");
        const status = searchParams.get("status");

        let requests;

        if (adminId) {
            requests = await getScribeRequestsByAdmin(adminId);
        } else if (status === "pending") {
            requests = await getPendingScribeRequests();
        } else {
            return NextResponse.json(
                { error: "Invalid query parameters" },
                { status: 400 }
            );
        }

        return NextResponse.json({ requests }, { status: 200 });
    } catch (error) {
        console.error("Error fetching scribe requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch scribe requests" },
            { status: 500 }
        );
    }
}

// POST - Create a new scribe request
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { studentId, scribeId, examDetails, adminId } = body;

        if (!studentId || !scribeId || !examDetails) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get student and scribe details for match score calculation
        const student = await getStudentById(studentId);
        const scribe = await getScribeById(scribeId);

        if (!student || !scribe) {
            return NextResponse.json(
                { error: "Student or scribe not found" },
                { status: 404 }
            );
        }

        // Calculate match score
        const matchScore = calculateMatchScore(student, scribe);

        const requestData = {
            studentId,
            scribeId,
            examDetails,
            adminId,
            matchScore,
            status: "pending" as const,
        };

        const requestId = await createScribeRequest(requestData);

        return NextResponse.json(
            {
                message: "Scribe request created successfully",
                requestId,
                matchScore,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating scribe request:", error);
        return NextResponse.json(
            { error: "Failed to create scribe request" },
            { status: 500 }
        );
    }
}

// PUT - Update scribe request (approve/reject)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { requestId, action, userId, rejectionReason } = body;

        if (!requestId || !action || !userId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (action === "approve") {
            await approveScribeRequest(requestId, userId);
            return NextResponse.json(
                { message: "Scribe request approved successfully" },
                { status: 200 }
            );
        } else if (action === "reject") {
            if (!rejectionReason) {
                return NextResponse.json(
                    { error: "Rejection reason is required" },
                    { status: 400 }
                );
            }
            await rejectScribeRequest(requestId, userId, rejectionReason);
            return NextResponse.json(
                { message: "Scribe request rejected successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Invalid action" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error updating scribe request:", error);
        return NextResponse.json(
            { error: "Failed to update scribe request" },
            { status: 500 }
        );
    }
}
