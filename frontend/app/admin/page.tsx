"use client"

import { useEffect } from "react";
import { useReviewsStore } from "@/store/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { FilterBar } from "@/components/FilterBar";
import { StatsCards } from "@/components/admin/StatsCards";
import { TrendChart } from "@/components/admin/TrendChart";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";

export default function AdminDashboard() {
    const {
        reviews,
        total,
        stats,
        loading,
        error,
        fetchReviews,
        fetchStats,
        syncReviews,
        toggleVisibility
    } = useReviewsStore();

    useEffect(() => {
        fetchReviews();
        fetchStats();
    }, [fetchReviews, fetchStats]);

    const handleSync = async () => {
        await syncReviews();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Reviews Overview ({total})</h1>
                <Button onClick={handleSync} disabled={loading} variant="primary">
                    <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Syncing...' : 'Sync Reviews'}
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    Error: {error}
                </div>
            )}

            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <TrendChart stats={stats} />
                </div>
                <div className="lg:col-span-2">
                    <FilterBar />

                    <div className="space-y-4">
                        {reviews.length === 0 && !loading ? (
                            <p className="text-center text-gray-500 py-10">No reviews found. Try syncing.</p>
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
                </div>
            </div>
        </div>
    );
}
