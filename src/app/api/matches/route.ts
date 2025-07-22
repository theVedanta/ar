import { NextRequest, NextResponse } from "next/server";
import {
    createMatch,
    confirmMatch,
    completeMatch,
    getMatchesByStudent,
    getMatchesByScribe,
    getAvailableScribes,
    getStudentById,
    calculateMatchScore,
} from "@/lib/firebase/services";

// GET - Get matches by student or scribe
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get("studentId");
        const scribeId = searchParams.get("scribeId");

        let matches;

        if (studentId) {
            matches = await getMatchesByStudent(studentId);
        } else if (scribeId) {
            matches = await getMatchesByScribe(scribeId);
        } else {
            return NextResponse.json(
                { error: "Either studentId or scribeId is required" },
                { status: 400 }
            );
        }

        return NextResponse.json({ matches }, { status: 200 });
    } catch (error) {
        console.error("Error fetching matches:", error);
        return NextResponse.json(
            { error: "Failed to fetch matches" },
            { status: 500 }
        );
    }
}

// POST - Create a new match
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { studentId, examDetails, location } = body;

        if (!studentId || !examDetails) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get student details
        const student = await getStudentById(studentId);
        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        // Find available scribes
        const availableScribes = await getAvailableScribes(
            examDetails.subjects,
            location
        );

        if (availableScribes.length === 0) {
            return NextResponse.json(
                { error: "No available scribes found" },
                { status: 404 }
            );
        }

        // Calculate match scores and sort by best match
        const scribeMatches = availableScribes
            .map((scribe) => ({
                scribe,
                matchScore: calculateMatchScore(student, scribe),
            }))
            .sort((a, b) => b.matchScore - a.matchScore);

        // Create matches with top scribes (up to 3)
        const topMatches = scribeMatches.slice(0, 3);
        const createdMatches = [];

        for (const match of topMatches) {
            const matchData = {
                studentId,
                scribeId: match.scribe.id,
                examDetails,
                matchScore: match.matchScore,
                status: "matched" as const,
            };

            const matchId = await createMatch(matchData);
            createdMatches.push({
                id: matchId,
                ...matchData,
                scribe: match.scribe,
            });
        }

        return NextResponse.json(
            {
                message: "Matches created successfully",
                matches: createdMatches,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating matches:", error);
        return NextResponse.json(
            { error: "Failed to create matches" },
            { status: 500 }
        );
    }
}

// PUT - Update match status
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { matchId, action } = body;

        if (!matchId || !action) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (action === "confirm") {
            await confirmMatch(matchId);
            return NextResponse.json(
                { message: "Match confirmed successfully" },
                { status: 200 }
            );
        } else if (action === "complete") {
            await completeMatch(matchId);
            return NextResponse.json(
                { message: "Match completed successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Invalid action" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error updating match:", error);
        return NextResponse.json(
            { error: "Failed to update match" },
            { status: 500 }
        );
    }
}
