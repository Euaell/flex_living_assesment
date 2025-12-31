import { Button } from "@/components/ui/Button";

export function PropertyLocation() {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold font-serif text-flex-green mb-6">Location</h2>

            {/* Map Placeholder */}
            <div className="w-full h-[400px] bg-gray-100 rounded-xl relative overflow-hidden mb-6 flex items-center justify-center border border-gray-200">
                <div className="text-gray-400 font-medium">Map View Placeholder</div>
                {/* In a real app, this would be a Google Map or Leaflet instance */}
                <div className="absolute inset-0 bg-gray-200/50 flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-gray-500 max-w-md">
                        We can't show the exact location right now, but the property is located in the heart of Fulham, close to Parsons Green station.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Fulham</h3>
                <p className="text-gray-600 leading-relaxed max-w-3xl">
                    Fulham is a leafy, affluent area in Southwest London. It's known for its trendy cafes, boutique shops, and excellent restaurants.
                    The area is popular with families and young professionals alike, offering a village-like atmosphere with easy access to the city center.
                    You'll find plenty of green spaces nearby, including Bishops Park and the Fulham Palace Gardens.
                </p>
                <Button variant="ghost" className="text-black font-semibold underline decoration-black p-0 hover:bg-transparent h-auto">
                    Show more
                </Button>
            </div>
        </div>
    );
}
