"use client"

import { useEffect, use } from "react";
import { useReviewsStore } from "@/store/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { FilterBar } from "@/components/FilterBar";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

// New Components
import { Navbar } from "@/components/Navbar";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { PropertyInfo } from "@/components/property/PropertyInfo";
import { PropertyAmenities } from "@/components/property/PropertyAmenities";
import { PropertyPolicies } from "@/components/property/PropertyPolicies";
import { PropertyLocation } from "@/components/property/PropertyLocation";
import { BookingCard } from "@/components/property/BookingCard";
import { ReviewsPagination } from "@/components/ReviewsPagination";

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
        setFilters({ is_displayed: true, page: 1, limit: 5 }); // Default to 5 per page
        fetchReviews(); // is_displayed is already in default filters? no, setFilters updates it.
        fetchStats();
    }, []);

    const averageRating = stats?.average_rating || 0;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-20 pt-28">

                {/* Hero Images */}
                <div className="mb-8">
                    <PropertyHero />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 relative">
                    {/* Left Column: Details & Reviews */}
                    <div>
                        <PropertyHeader />
                        <PropertyInfo />
                        <PropertyAmenities />

                        <PropertyPolicies />

                        {/* Reviews Section */}
                        <section id="reviews" className="scroll-mt-24 pt-12">
                            <div className="flex items-center gap-2 mb-8">
                                <Star size={24} className="fill-black text-black" />
                                <h2 className="text-2xl font-bold font-serif text-flex-green">
                                    {averageRating.toFixed(2)} · {total} Reviews
                                </h2>
                            </div>

                            <div className="mb-8">
                                <FilterBar />
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {loading ? (
                                    <div className="text-center py-12 text-gray-400">Loading reviews...</div>
                                ) : reviews.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        No reviews visible matching your criteria.
                                    </div>
                                ) : (
                                    <>
                                        {reviews.map(review => (
                                            <ReviewCard key={review.id} review={review} />
                                        ))}
                                    </>
                                )}
                            </div>

                            {/* Pagination */}
                            {!loading && reviews.length > 0 && (
                                <ReviewsPagination />
                            )}
                        </section>

                        <PropertyLocation />
                    </div>

                    {/* Right Column: Sticky Booking Card */}
                    <div className="hidden lg:block">
                        <BookingCard rating={averageRating} reviews={total} />
                    </div>
                </div>
            </main >
        </div >
    );
}
