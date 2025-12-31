import { Button } from "@/components/ui/Button";
import { ChevronDown, Star } from "lucide-react";

export function BookingCard({ price = 250, rating = 4.92, reviews = 42 }) {
    return (
        <div className="sticky top-24 bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-2xl font-bold font-serif text-flex-green">£{price}</span>
                    <span className="text-gray-500"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                    <Star size={14} className="fill-black text-black" />
                    <span>{rating}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500 underlined">{reviews} reviews</span>
                </div>
            </div>

            <div className="border border-gray-400 rounded-lg mb-4 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-gray-400">
                    <div className="p-3 border-r border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="text-[10px] uppercase font-bold text-gray-800">Check-in</div>
                        <div className="text-sm text-gray-600">Add date</div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="text-[10px] uppercase font-bold text-gray-800">Checkout</div>
                        <div className="text-sm text-gray-600">Add date</div>
                    </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center">
                    <div>
                        <div className="text-[10px] uppercase font-bold text-gray-800">Guests</div>
                        <div className="text-sm text-gray-600">1 guest</div>
                    </div>
                    <ChevronDown size={16} className="text-gray-500" />
                </div>
            </div>

            <Button className="w-full bg-flex-green hover:bg-flex-green/90 text-white rounded-lg py-6 text-lg font-medium mb-4 cursor-pointer">
                Check availability
            </Button>

            <div className="text-center">
                <Button variant="ghost" className="text-gray-500 underline decoration-gray-300 hover:text-gray-800 hover:decoration-gray-800">
                    Send inquiry
                </Button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">?</div>
                <span>Free cancellation for 48 hours</span>
            </div>
        </div>
    );
}
