import { NextRequest, NextResponse } from "next/server";
import {
    createAdminRequest,
    getPendingAdminRequests,
    approveAdminRequest,
    rejectAdminRequest,
    getUserById,
} from "@/lib/firebase/services";

// GET - Get pending admin requests (for superadmin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");

        if (status === "pending") {
            const requests = await getPendingAdminRequests();
            return NextResponse.json({ requests }, { status: 200 });
        }

        return NextResponse.json(
            { error: "Invalid query parameters" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error fetching admin requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch admin requests" },
            { status: 500 }
        );
    }
}

// POST - Create a new admin request
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, schoolName, schoolId, documents } = body;

        if (!userId || !schoolName || !schoolId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const requestData = {
            userId,
            schoolName,
            schoolId,
            documents,
            status: "pending" as const,
        };

        const requestId = await createAdminRequest(requestData);

        console.log("ADMIN REQUEST CREATED");
        return NextResponse.json(
            {
                message: "Admin request created successfully",
                requestId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating admin request:", error);
        return NextResponse.json(
            { error: "Failed to create admin request" },
            { status: 500 }
        );
    }
}

// PUT - Update admin request (approve/reject)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { requestId, action, superAdminId, rejectionReason } = body;

        if (!requestId || !action || !superAdminId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (action === "approve") {
            await approveAdminRequest(requestId, superAdminId);
            return NextResponse.json(
                { message: "Admin request approved successfully" },
                { status: 200 }
            );
        } else if (action === "reject") {
            if (!rejectionReason) {
                return NextResponse.json(
                    { error: "Rejection reason is required" },
                    { status: 400 }
                );
            }
            await rejectAdminRequest(requestId, superAdminId, rejectionReason);
            return NextResponse.json(
                { message: "Admin request rejected successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Invalid action" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error updating admin request:", error);
        return NextResponse.json(
            { error: "Failed to update admin request" },
            { status: 500 }
        );
    }
}
