import { NextRequest, NextResponse } from "next/server";
import { getAdminById, getAdminRequestByUserId } from "@/lib/firebase/services";

// GET - Check admin approval status for a user
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const adminRequest = await getAdminById(userId);

        if (!adminRequest) {
            return NextResponse.json(
                { error: "No admin request found for this user" },
                { status: 404 }
            );
        }

        const adminStatus = {
            isApproved: adminRequest.isApproved,
            isPending: !adminRequest.isApproved,
            isRejected: !adminRequest.isApproved,
            requestId: adminRequest.id,
            schoolName: adminRequest.schoolName,
        };

        return NextResponse.json({ adminStatus }, { status: 200 });
    } catch (error) {
        console.error("Error checking admin status:", error);
        return NextResponse.json(
            { error: "Failed to check admin status" },
            { status: 500 }
        );
    }
}
