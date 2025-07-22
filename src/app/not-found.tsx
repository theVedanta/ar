import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            <Card className="w-full bg-white max-w-xl shadow-2xl border-none">
                <CardContent className="flex flex-col items-center py-16">
                    <span className="text-[7rem] font-extrabold mb-6 tracking-tighter drop-shadow-lg select-none">
                        404
                    </span>
                    <p className="text-2xl mb-4 font-medium italic">
                        Redirecting you...
                    </p>
                    <div className="w-16 h-16 rounded-full bg-black/10 animate-spin border-4 border-black/30 border-t-transparent mt-2" />
                </CardContent>
            </Card>
        </div>
    );
}
