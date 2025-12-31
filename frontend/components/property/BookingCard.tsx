import { Button } from "@/components/ui/Button";
import { ChevronDown, Calendar, User, MessageCircle, ShieldCheck } from "lucide-react";

export function BookingCard({ price = 250, rating = 4.92, reviews = 42 }) {
    return (
        <div className="sticky top-24 bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="bg-flex-green p-6 text-white">
                <h2 className="text-xl font-bold font-serif mb-1">Book Your Stay</h2>
                <p className="text-sm opacity-90">Select dates to see prices</p>
            </div>

            <div className="p-6">
                {/* Inputs Grid */}
                <div className="space-y-4 mb-6">
                    {/* Date Selector */}
                    <div className="bg-[#F3F4F6] rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-colors">
                        <Calendar size={18} className="text-gray-500" />
                        <span className="text-gray-600 text-sm font-medium">Select dates</span>
                    </div>

                    {/* Guest Selector */}
                    <div className="bg-[#F3F4F6] rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors">
                        <div className="flex items-center gap-3">
                            <User size={18} className="text-gray-500" />
                            <span className="text-gray-900 text-sm font-medium">1</span>
                        </div>
                        <ChevronDown size={18} className="text-gray-400" />
                    </div>
                </div>

                {/* Primary Action */}
                <Button className="w-full bg-[#8E9B9A] hover:bg-[#7D8A89] text-white rounded-lg py-6 text-base font-semibold mb-4 cursor-pointer gap-2">
                    <Calendar size={18} />
                    Check availability
                </Button>

                {/* Secondary Action */}
                <div className="text-center">
                    <Button variant="outline" className="w-full border-gray-300 py-6 text-gray-700 hover:bg-gray-50 gap-2 font-medium">
                        <MessageCircle size={18} />
                        Send Inquiry
                    </Button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck size={14} />
                    <span>Instant booking confirmation</span>
                </div>
            </div>
        </div>
    );
}
