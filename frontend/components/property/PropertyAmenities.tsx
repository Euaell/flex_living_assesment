import { Wifi, Utensils, Waves, Car, Tv, Thermometer, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/Button";

const amenities = [
    { icon: Wifi, label: "Fast wifi" },
    { icon: Utensils, label: "Kitchen" },
    { icon: Waves, label: "Washing machine" },
    { icon: Car, label: "Free parking on premises" },
    { icon: Tv, label: "TV" },
    { icon: Thermometer, label: "Heating" },
    { icon: Dumbbell, label: "Gym" },
];

export function PropertyAmenities() {
    return (
        <div className="py-8 border-b border-gray-100">
            <h3 className="text-xl font-serif text-flex-green mb-6">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                        <item.icon size={20} className="text-gray-500" />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-50">
                Show all 32 amenities
            </Button>
        </div>
    );
}
