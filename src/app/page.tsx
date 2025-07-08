import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, Star, Eye } from "lucide-react";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b bg-gray-100">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Eye className="h-8 w-8 text-blue-600" />
                        <h1 className="text-xl font-extrabold text-gray-800">
                            ScribeConnect
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="py-10 bg-white w-full">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-7xl font-extrabold text-gray-800 mb-2">
                        Bridging the Gap Between{" "}
                        <span className="text-blue-600">Students</span> and{" "}
                        <span className="text-blue-600">Volunteer Scribes</span>
                    </h2>
                    <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
                        Break free from traditional boundaries. Work from
                        anywhere, at the comfort of your own studio apartment.
                        Perfect for Nomads and Travellers.
                    </p>
                </div>
                <WorldMap
                    dots={[
                        {
                            start: {
                                lat: 64.2008,
                                lng: -149.4937,
                            }, // Alaska (Fairbanks)
                            end: {
                                lat: 34.0522,
                                lng: -118.2437,
                            }, // Los Angeles
                        },
                        {
                            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                        },
                        {
                            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                        },
                        {
                            start: { lat: 51.5074, lng: -0.1278 }, // London
                            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                        },
                    ]}
                />
            </div>

            {/* Hero Section */}
            {/* <section className="py-24 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-8">
                        Bridging the Gap Between{" "}
                        <span className="text-blue-600">Students</span> and{" "}
                        <span className="text-blue-600">Volunteer Scribes</span>
                    </h2>
                    <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                        ScribeConnect is dedicated to empowering visually
                        impaired students by connecting them with compassionate
                        volunteer scribes. Together, we make education
                        accessible for everyone.
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
            </section> */}

            {/* Features */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight">
                        How ScribeConnect Empowers You
                    </h3>
                    <div className="grid md:grid-cols-4 gap-10">
                        <Card className="shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-200 bg-white">
                            <CardHeader className="flex flex-col items-center text-center">
                                <Users className="h-14 w-14 text-blue-600 mb-5" />
                                <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                                    Personalized Matching
                                </CardTitle>
                                <CardDescription className="text-gray-700 text-base">
                                    We connect students and scribes using a
                                    smart algorithm that considers subject,
                                    language, time zone, and accessibility
                                    needs—ensuring the right fit for every
                                    session.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-200 bg-white">
                            <CardHeader className="flex flex-col items-center text-center">
                                <BookOpen className="h-14 w-14 text-green-600 mb-5" />
                                <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                                    Verified Expertise
                                </CardTitle>
                                <CardDescription className="text-gray-700 text-base">
                                    All scribes are vetted for subject knowledge
                                    and trained in exam protocols, so students
                                    receive accurate, confident support tailored
                                    to their academic needs.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-200 bg-white">
                            <CardHeader className="flex flex-col items-center text-center">
                                <Star className="h-14 w-14 text-yellow-500 mb-5" />
                                <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                                    Quality & Safety
                                </CardTitle>
                                <CardDescription className="text-gray-700 text-base">
                                    Every session is backed by a transparent
                                    feedback and rating system, with continuous
                                    monitoring to uphold safety, reliability,
                                    and the highest standards of service.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-200 bg-white">
                            <CardHeader className="flex flex-col items-center text-center">
                                <Eye className="h-14 w-14 text-purple-600 mb-5" />
                                <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                                    Accessible for All
                                </CardTitle>
                                <CardDescription className="text-gray-700 text-base">
                                    Designed with accessibility at its core, our
                                    platform supports screen readers, keyboard
                                    navigation, and offers resources for both
                                    students and scribes to ensure a seamless
                                    experience.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 justify-center mt-16">
                        <Button size="lg" asChild>
                            <Link href="/signup?role=student">
                                I Need a Scribe
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/signup?role=scribe">
                                I Want to Volunteer
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <div className="h-[60rem] w-full bg-neutral-950 relative flex items-center justify-center antialiased">
                <div className="absolute inset-0">
                    <BackgroundBeams />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full mx-auto p-4">
                    {/* Right Side: Text and Newsletter */}
                    <div className="flex-1 flex flex-col items-center md:items-start justify-center md:pl-12">
                        <h1 className="text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] text-white font-sans font-bold leading-none mb-2 text-center md:text-left drop-shadow-lg">
                            JOIN US.
                        </h1>
                        <form className="flex flex-col sm:flex-row items-center md:items-start gap-3 mt-2 w-full max-w-md">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="border border-gray-300 bg-neutral-900 text-white placeholder:text-neutral-400 focus:border-blue-500 w-96"
                                required
                            />
                            <Button type="submit" variant="outline">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-10 px-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">
                        &copy; 2024 ScribeConnect. Empowering education through
                        accessibility and inclusion.
                    </p>
                </div>
            </footer>
        </div>
    );
}
