import Image from "next/image";
import { Button } from "@/components/ui/Button"; // Assuming generic button exists or I'll use raw button
import { Grid } from "lucide-react";

export function PropertyHero() {
    return (
        <div className="relative rounded-xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px]">
            <div className="col-span-2 row-span-2 relative bg-gray-200">
                {/* Main Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Main Image</div>
            </div>
            <div className="relative bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image 2</div>
            </div>
            <div className="relative bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image 3</div>
            </div>
            <div className="relative bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image 4</div>
            </div>
            <div className="relative bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image 5</div>
            </div>

            <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-black px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
                <Grid size={16} />
                Show all photos
            </button>
        </div>
    );
}
