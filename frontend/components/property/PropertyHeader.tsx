import { MapPin, Users, BedDouble, Bath } from "lucide-react";

export function PropertyHeader() {
    return (
        <div className="mb-8 border-b border-gray-100 pb-8">
            <h1 className="text-4xl md:text-5xl font-serif text-flex-green mb-4">
                Spacious 2 Bed Apartment with Garden in Fulham
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                    <span className="font-medium">Fulham</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <Users size={20} className="text-gray-400" />
                    <span>4 guests</span>
                </div>
                <div className="flex items-center gap-2">
                    <BedDouble size={20} className="text-gray-400" />
                    <span>2 bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                    <BedDouble size={20} className="text-gray-400" />
                    <span>2 beds</span>
                </div>
                <div className="flex items-center gap-2">
                    <Bath size={20} className="text-gray-400" />
                    <span>2 bathrooms</span>
                </div>
            </div>
        </div>
    );
}
