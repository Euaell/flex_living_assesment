"use client"

import { useEffect, use } from "react";
import { useReviewsStore } from "@/store/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { FilterBar } from "@/components/FilterBar";
import { StarRating } from "@/components/StarRating";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, BedDouble, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);

    const {
        reviews,
        total,
        loading,
        fetchReviews,
        stats,
        fetchStats,
        setFilters
    } = useReviewsStore();

    useEffect(() => {
        setFilters({ is_displayed: true });
        fetchReviews({ is_displayed: true });
        fetchStats();
    }, []);

    const averageRating = stats?.average_rating || 0;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <nav className="border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="text-xl font-bold tracking-tight">flex living</div>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                        <a href="#" className="hover:text-black">Locations</a>
                        <a href="#" className="hover:text-black">About</a>
                        <a href="#" className="hover:text-black">Corporate</a>
                        <a href="#" className="hover:text-black">Blog</a>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/admin">
                            <Button variant="ghost" size="sm">Admin</Button>
                        </Link>
                        <Button className="rounded-full px-6">Book Now</Button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6">
                        <div>
                            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-4">
                                <ArrowLeft size={16} className="mr-2" /> Back to search
                            </Link>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Elegant Apartment in Fulham</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center"><MapPin size={16} className="mr-1" /> London, UK</span>
                                <span className="flex items-center"><Users size={16} className="mr-1" /> 4 Guests</span>
                                <span className="flex items-center"><BedDouble size={16} className="mr-1" /> 2 Bedrooms</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Experience the best of London living in this beautifully designed apartment.
                            Located in the heart of Fulham, you're just steps away from trendy cafes,
                            boutique shops, and excellent transport links. The space features modern amenities,
                            luxury furnishings, and everything you need for a comfortable stay.
                        </p>

                        <div className="flex items-center gap-4 py-6 border-y border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold">{averageRating.toFixed(2)}</span>
                                <div className="flex flex-col">
                                    <StarRating rating={averageRating} />
                                    <span className="text-sm text-gray-500">{total} reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 h-[400px]">
                        <div className="bg-gray-100 rounded-lg col-span-2 h-full w-full flex items-center justify-center text-gray-400">
                            Property Image Main
                        </div>
                    </div>
                </div>

                <section id="reviews" className="scroll-mt-24 pt-12 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-8">
                        <Star size={24} className="fill-black text-black" />
                        <h2 className="text-2xl font-bold">{averageRating.toFixed(2)} · {total} Reviews</h2>
                    </div>

                    <div className="mb-8">
                        <FilterBar />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {loading ? (
                            <div className="col-span-2 text-center py-12 text-gray-400">Loading reviews...</div>
                        ) : reviews.length === 0 ? (
                            <div className="col-span-2 text-center py-12 text-gray-500">
                                No reviews visible matching your criteria.
                            </div>
                        ) : (
                            reviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
