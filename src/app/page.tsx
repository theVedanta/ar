import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, Users, BookOpen, Star } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Eye className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            ScribeConnect
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Connecting Students with{" "}
                        <span className="text-blue-600">Volunteer Scribes</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Empowering visually impaired students to excel in their
                        exams through our intelligent matching platform that
                        connects them with dedicated volunteer scribes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/signup?role=student">
                                I Need a Scribe
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/signup?role=scribe">
                                I Want to Help
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        How It Works
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <Users className="h-12 w-12 text-blue-600 mb-4" />
                                <CardTitle>Smart Matching</CardTitle>
                                <CardDescription>
                                    Our algorithm matches students with scribes
                                    based on subject expertise, language
                                    preference, and availability.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                                <CardTitle>Subject Expertise</CardTitle>
                                <CardDescription>
                                    Scribes are matched based on their
                                    confidence and knowledge in specific
                                    subjects and exam types.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Star className="h-12 w-12 text-yellow-600 mb-4" />
                                <CardTitle>Quality Assurance</CardTitle>
                                <CardDescription>
                                    Feedback and rating system ensures
                                    continuous improvement and maintains high
                                    service quality.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-4">
                <div className="container mx-auto text-center">
                    <p>
                        &copy; 2024 ScribeConnect. Empowering education through
                        accessibility.
                    </p>
                </div>
            </footer>
        </div>
    );
}
