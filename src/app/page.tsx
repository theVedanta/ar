import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, Star, Eye, ArrowRight } from "lucide-react";
import WorldMap from "@/components/ui/world-map";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Stats from "@/components/stats";
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b bg-gray-100">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Eye className="h-8 w-8 text-blue-600" />
                        <h1 className="text-xl font-extrabold text-gray-800">
                            SubscribeScribe
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <SignedOut>
                            <Button variant="outline" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <SignOutButton>
                                <Button variant="outline">Logout</Button>
                            </SignOutButton>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
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
                    <p className="text-xl font-semibold md:text-2xl text-neutral-500 max-w-2xl mx-auto py-4">
                        Become the pen behind their vision
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

            <section className="px-20">
                <Stats />
            </section>

            <div className="py-20 w-full bg-neutral-950 relative flex items-center justify-center antialiased">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full mx-auto p-4">
                    <div className="flex-1 flex flex-col items-center md:items-start justify-center md:pl-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-sans font-bold leading-none mb-8 text-center md:text-justify drop-shadow-lg">
                            About SubscribeScribe
                        </h1>
                        <div className="max-w-3xl text-lg md:text-xl text-neutral-200 mb-8 text-center md:text-justify space-y-6">
                            <p>
                                SubscribeScribe is dedicated to bridging the gap
                                between visually impaired students and
                                compassionate volunteer scribes. Our mission is
                                to make education accessible, inclusive, and
                                empowering for everyone, regardless of visual
                                ability.
                            </p>
                            <p>
                                We connect students who need assistance with
                                reading, writing, and exam-taking to trained
                                scribes from around the world. By leveraging
                                smart matching algorithms, we ensure that every
                                student is paired with a scribe who understands
                                their academic needs, language preferences, and
                                accessibility requirements.
                            </p>
                            <p>
                                Our platform is built with accessibility at its
                                core, supporting screen readers, keyboard
                                navigation, and providing resources for both
                                students and volunteers. Every scribe is vetted
                                for expertise and trained in exam protocols,
                                ensuring a safe, reliable, and high-quality
                                experience.
                            </p>
                            <p>
                                Whether you are a student seeking support or a
                                volunteer wanting to make a difference,
                                SubscribeScribe is here to empower your journey.
                                Together, we are transforming education—one
                                session, one connection, one story at a time.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/signup?role=student">
                                <Button variant="outline">
                                    I Need a Scribe
                                </Button>
                            </Link>
                            <Link href="/signup?role=scribe">
                                <Button variant="link" className="text-white">
                                    I Want to Volunteer
                                    <ArrowRight size={28} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center md:pl-12 mt-10 md:mt-0">
                        <Image
                            src="https://images.unsplash.com/photo-1632753133168-fbd6a64c796b?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="A visually impaired person being helped by a scribe"
                            className="rounded-xl shadow-2xl object-cover w-full max-w-md h-auto"
                            width={400}
                            height={300}
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight">
                        How SubscribeScribe Empowers You
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
                        <h1 className="text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] text-white font-sans font-bold leading-none mb-2 text-center md:text-justify drop-shadow-lg">
                            JOIN US...
                        </h1>
                        <Link href="/signup?role=scribe">
                            <Button
                                variant="link"
                                className="text-2xl md:text-4xl px-12 py-12 font-extrabold shadow-2xl text-white rounded-3xl"
                            >
                                Get Started
                                <ArrowRight size={36} className="text-3xl" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-neutral-950 text-white py-10 px-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">
                        &copy; 2025 SubscribeScribe. Empowering education
                        through accessibility and inclusion.
                    </p>
                </div>
            </footer>
        </div>
    );
}
