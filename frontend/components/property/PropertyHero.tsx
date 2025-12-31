"use client";

import { useState } from "react";
import { Grid, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const images = [
    { src: "/placeholder-1.jpg", alt: "Main Image" }, // Replace with real paths or placeholders
    { src: "/placeholder-2.jpg", alt: "Living Room" },
    { src: "/placeholder-3.jpg", alt: "Kitchen" },
    { src: "/placeholder-4.jpg", alt: "Bedroom" },
    { src: "/placeholder-5.jpg", alt: "Bathroom" },
];

export function PropertyHero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative rounded-xl overflow-hidden h-75 lg:h-125">
            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-full">
                <div className="col-span-2 row-span-2 relative bg-gray-200">
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

            {/* Mobile Slideshow */}
            <div className="lg:hidden relative h-full bg-gray-200 group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                    {/* Placeholder for actual image */}
                    Image {currentSlide + 1}
                </div>

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevSlide}
                        className="bg-white/80 hover:bg-white rounded-full shadow-sm w-8 h-8"
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextSlide}
                        className="bg-white/80 hover:bg-white rounded-full shadow-sm w-8 h-8"
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
                    {currentSlide + 1} / {images.length}
                </div>
            </div>
        </div>
    );
}
