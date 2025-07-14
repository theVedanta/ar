import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HelpCircle, Mail, Phone, MessageSquare } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
                    <p className="text-gray-600">
                        Find answers to common questions or get in touch with
                        our support team
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Frequently Asked Questions
                                </CardTitle>
                                <CardDescription>
                                    Find quick answers to common questions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            How does the matching system work?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            Our intelligent matching system
                                            considers multiple factors including
                                            subject expertise, language
                                            preference, location, availability,
                                            and gender preference (if specified)
                                            to find the best scribe match for
                                            each student.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>
                                            What are the requirements to become
                                            a scribe?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            To become a volunteer scribe, you
                                            need to be confident in the subjects
                                            you want to help with, have good
                                            handwriting (for written exams),
                                            agree to our ethics guidelines, and
                                            be available during exam times. We
                                            also require a handwriting sample
                                            for written exam scribes.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>
                                            How far in advance should I request
                                            a scribe?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            We recommend requesting a scribe at
                                            least 2-3 weeks before your exam
                                            date to ensure we can find the best
                                            match and allow time for
                                            coordination. However, we do our
                                            best to accommodate last-minute
                                            requests when possible.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>
                                            What if I&apos;m not satisfied with
                                            my assigned scribe?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            If you have concerns about your
                                            assigned scribe, please contact our
                                            support team immediately. We can
                                            help resolve issues or find an
                                            alternative scribe if necessary.
                                            Your feedback is important to us.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>
                                            Is there any cost for using this
                                            service?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            No, our service is completely free
                                            for students. Our volunteer scribes
                                            donate their time to help visually
                                            impaired students succeed in their
                                            exams. This is a community-driven
                                            initiative.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-6">
                                        <AccordionTrigger>
                                            What accessibility features are
                                            available?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            Our platform is designed with
                                            accessibility in mind. We support
                                            screen readers, keyboard navigation,
                                            and high contrast modes. We also
                                            provide voice guidance for key
                                            features and can assist with
                                            phone-based registration if needed.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-7">
                                        <AccordionTrigger>
                                            How do I cancel or reschedule a
                                            scribe request?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            You can cancel or reschedule through
                                            your dashboard or by contacting
                                            support. Please provide as much
                                            notice as possible to respect your
                                            scribe&apos;s time. For emergency
                                            changes, call our support hotline.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-8">
                                        <AccordionTrigger>
                                            What training do scribes receive?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            All our scribes go through an
                                            orientation covering exam ethics,
                                            confidentiality, proper scribing
                                            techniques, and how to assist
                                            visually impaired students
                                            effectively. They also agree to our
                                            code of conduct.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Support */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Support</CardTitle>
                                <CardDescription>
                                    Get personalized help from our team
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium">
                                            Email Support
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            support@subscribescribe.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Phone className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">
                                            Phone Support
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            +91 1800-123-4567
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Mon-Fri, 9 AM - 6 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <MessageSquare className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="font-medium">Live Chat</p>
                                        <p className="text-sm text-gray-600">
                                            Available 24/7
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Contact Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Describe your issue or question..."
                                            rows={4}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
