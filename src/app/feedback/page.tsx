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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle } from "lucide-react";

export default function FeedbackPage() {
    const [ratings, setRatings] = useState({
        onTime: 0,
        communication: 0,
        subjectUnderstanding: 0,
        writingSpeed: 0,
    });
    const [overallRating, setOverallRating] = useState(0);
    const [comments, setComments] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleRatingChange = (
        category: keyof typeof ratings,
        rating: number
    ) => {
        setRatings((prev) => ({ ...prev, [category]: rating }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ ratings, overallRating, comments });
        setSubmitted(true);
    };

    const RatingStars = ({
        rating,
        onRatingChange,
    }: {
        rating: number;
        onRatingChange: (rating: number) => void;
    }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRatingChange(star)}
                    className="focus:outline-none"
                >
                    <Star
                        className={`h-6 w-6 ${
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-400"
                        }`}
                    />
                </button>
            ))}
        </div>
    );

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                        <p className="text-gray-600 mb-4">
                            Your feedback has been submitted successfully. This
                            helps us improve our service quality.
                        </p>
                        <Button
                            onClick={() =>
                                (window.location.href = "/dashboard/student")
                            }
                        >
                            Back to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Rate Your Scribe Experience
                        </CardTitle>
                        <CardDescription>
                            Your feedback helps us maintain quality and improve
                            our matching system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Individual Ratings */}
                            <div className="space-y-6">
                                <div>
                                    <Label className="text-base font-medium mb-3 block">
                                        On Time
                                    </Label>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Did the scribe arrive on time?
                                    </p>
                                    <RatingStars
                                        rating={ratings.onTime}
                                        onRatingChange={(rating) =>
                                            handleRatingChange("onTime", rating)
                                        }
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-medium mb-3 block">
                                        Communication
                                    </Label>
                                    <p className="text-sm text-gray-600 mb-2">
                                        How well did the scribe communicate with
                                        you?
                                    </p>
                                    <RatingStars
                                        rating={ratings.communication}
                                        onRatingChange={(rating) =>
                                            handleRatingChange(
                                                "communication",
                                                rating
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-medium mb-3 block">
                                        Understanding of Subject
                                    </Label>
                                    <p className="text-sm text-gray-600 mb-2">
                                        How well did the scribe understand the
                                        subject matter?
                                    </p>
                                    <RatingStars
                                        rating={ratings.subjectUnderstanding}
                                        onRatingChange={(rating) =>
                                            handleRatingChange(
                                                "subjectUnderstanding",
                                                rating
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-medium mb-3 block">
                                        Writing/Typing Speed
                                    </Label>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Was the scribe&apos;s writing/typing
                                        speed adequate?
                                    </p>
                                    <RatingStars
                                        rating={ratings.writingSpeed}
                                        onRatingChange={(rating) =>
                                            handleRatingChange(
                                                "writingSpeed",
                                                rating
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Overall Rating */}
                            <div>
                                <Label className="text-base font-medium mb-3 block">
                                    Overall Experience
                                </Label>
                                <p className="text-sm text-gray-600 mb-2">
                                    How would you rate your overall experience?
                                </p>
                                <RatingStars
                                    rating={overallRating}
                                    onRatingChange={setOverallRating}
                                />
                            </div>

                            {/* Comments */}
                            <div>
                                <Label
                                    htmlFor="comments"
                                    className="text-base font-medium"
                                >
                                    Additional Comments
                                </Label>
                                <p className="text-sm text-gray-600 mb-2">
                                    Share any additional feedback or suggestions
                                </p>
                                <Textarea
                                    id="comments"
                                    placeholder="Your comments here..."
                                    value={comments}
                                    onChange={(e) =>
                                        setComments(e.target.value)
                                    }
                                    rows={4}
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Submit Feedback
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
