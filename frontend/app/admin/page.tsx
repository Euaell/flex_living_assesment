"use client"

import { useEffect } from "react";
import { useReviewsStore } from "@/store/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { FilterBar } from "@/components/FilterBar";
import { StatsCards } from "@/components/admin/StatsCards";
import { RatingTrendChart } from "@/components/admin/RatingTrendChart";
import { ReviewsPagination } from "@/components/ReviewsPagination";

export default function AdminDashboard() {
    const {
        reviews,
        total,
        stats,
        loading,
        error,
        fetchReviews,
        fetchStats,
        toggleVisibility
    } = useReviewsStore();

    useEffect(() => {
        fetchReviews();
        fetchStats();
    }, [fetchReviews, fetchStats]);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Reviews Overview ({total})</h1>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    Error: {error}
                </div>
            )}

            <StatsCards stats={stats} />

            {/* Chart and Review List Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:col-span-1 h-96">
                    <RatingTrendChart stats={stats} />
                </div>

                {/* Review Management Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Review Management ({total})</h2>
                        </div>

                        <div className="mb-6 flex-1">
                            <FilterBar />
                        </div>

                        <div className="space-y-4 mb-4 flex-1 overflow-y-auto max-h-96">
                            {reviews.length === 0 && !loading ? (
                                <p className="text-center text-gray-500 py-10">No reviews found.</p>
                            ) : (
                                reviews.map(review => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        isAdmin
                                        onToggleVisibility={toggleVisibility}
                                    />
                                ))
                            )}
                        </div>

                        <div className="mt-auto">
                            <div className="flex justify-center">
                                <ReviewsPagination />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
