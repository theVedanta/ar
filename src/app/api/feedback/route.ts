import { NextRequest, NextResponse } from "next/server";
import { createFeedback, getFeedbackByScribe } from "@/lib/firebase/services";

// GET - Get feedback for a scribe
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const scribeId = searchParams.get("scribeId");

        if (!scribeId) {
            return NextResponse.json(
                { error: "scribeId is required" },
                { status: 400 }
            );
        }

        const feedback = await getFeedbackByScribe(scribeId);
        return NextResponse.json({ feedback }, { status: 200 });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json(
            { error: "Failed to fetch feedback" },
            { status: 500 }
        );
    }
}

// POST - Create new feedback
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { matchId, studentId, scribeId, rating, feedback, isAnonymous } =
            body;

        if (!matchId || !studentId || !scribeId || !rating || !feedback) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        const feedbackData = {
            matchId,
            studentId,
            scribeId,
            rating,
            feedback,
            isAnonymous: isAnonymous || false,
        };

        const feedbackId = await createFeedback(feedbackData);

        return NextResponse.json(
            {
                message: "Feedback created successfully",
                feedbackId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating feedback:", error);
        return NextResponse.json(
            { error: "Failed to create feedback" },
            { status: 500 }
        );
    }
}
