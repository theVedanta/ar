import { Users, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Stats() {
    // Mock data for admin dashboard
    const stats = {
        totalStudents: 32,
        totalScribes: 14,
        activeMatches: 6,
        pendingRequests: 3,
    };

    const cardData = [
        {
            title: "Total Students",
            value: stats.totalStudents,
            icon: <Users className="h-6 w-6 text-amber-700" />,
            accent: "border-neutral-200",
        },
        {
            title: "Total Scribes",
            value: stats.totalScribes,
            icon: <BookOpen className="h-6 w-6 text-rose-700" />,
            accent: "border-neutral-200",
        },
        {
            title: "Active Matches",
            value: stats.activeMatches,
            icon: <CheckCircle className="h-6 w-6 text-emerald-700" />,
            accent: "border-green-100",
        },
        {
            title: "Pending Requests",
            value: stats.pendingRequests,
            icon: <AlertTriangle className="h-6 w-6 text-sky-700" />,
            accent: "border-yellow-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {cardData.map((card) => (
                <Card
                    key={card.title}
                    className={`shadow-sm border ${card.accent} bg-white rounded-xl transition hover:shadow-md`}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-neutral-100">
                        <CardTitle className="text-base font-semibold text-neutral-800 tracking-tight">
                            {card.title}
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-neutral-50 flex items-center justify-center">
                            {card.icon}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-neutral-900 pt-2 pb-1">
                            {card.value}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
                            {card.title}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
