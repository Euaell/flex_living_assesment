"use client"

import { useEffect } from "react";
import { useReviewsStore } from "@/store/reviews";
import { StatsCards } from "@/components/admin/StatsCards";
import { TrendChart } from "@/components/admin/TrendChart";
import { MonthlyTrendChart } from "@/components/admin/MonthlyTrendChart";
import { ChannelComparisonChart } from "@/components/admin/ChannelComparisonChart";
import { RatingTrendChart } from "@/components/admin/RatingTrendChart";
import { VisibilityByChannelChart } from "@/components/admin/VisibilityByChannelChart";

export default function AdminInsights() {
    const {
        stats,
        error,
        fetchStats
    } = useReviewsStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    Error: {error}
                </div>
            )}

            <StatsCards stats={stats} />

            {/* Rating Distribution and Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="lg:col-span-1 h-96">
                    <TrendChart stats={stats} />
                </div>
                <div className="lg:col-span-1 h-96">
                    <RatingTrendChart stats={stats} />
                </div>
            </div>

            {/* Monthly Trends and Channel Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="lg:col-span-1 h-96">
                    <MonthlyTrendChart stats={stats} />
                </div>
                <div className="lg:col-span-1 h-96">
                    <ChannelComparisonChart stats={stats} />
                </div>
            </div>

            {/* Visibility Analysis */}
            <div className="h-96 mb-8">
                <VisibilityByChannelChart stats={stats} />
            </div>
        </div>
    );
}