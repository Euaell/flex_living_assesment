import { Wifi, Utensils, Waves, Car, Tv, Thermometer, Dumbbell, Wind, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const amenities = [
    { icon: Tv, label: "Cable TV" },
    { icon: Wifi, label: "Internet" },
    { icon: Wifi, label: "Wireless" }, // Icon duplicate but label specific
    { icon: Utensils, label: "Kitchen" },
    { icon: Waves, label: "Washing Machine" },
    { icon: CheckCircle, label: "24-Hour Checkin" },
    { icon: Wind, label: "Hair Dryer" },
    { icon: Thermometer, label: "Heating" },
    { icon: CheckCircle, label: "Smoke Detector" },
];

export function PropertyAmenities() {
    return (
        <div className="p-8 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold font-serif text-gray-900">Amenities</h3>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg">
                    View all amenities &gt;
                </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                        <item.icon size={20} className="text-gray-500 stroke-[1.5]" />
                        <span className="font-light text-sm md:text-base">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
