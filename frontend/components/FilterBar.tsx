import { useReviewsStore } from "@/store/reviews";
import { CHANNEL_MAP } from "@/types/review";
import { Button } from "./ui/Button";

export const FilterBar = () => {
    const { filters, setFilters } = useReviewsStore();

    return (
        <div className="flex flex-wrap gap-4 items-center p-4 bg-white border border-gray-100 rounded-lg shadow-sm mb-6 text-gray-500">
            <span className="text-sm font-medium text-gray-700">Filters:</span>

            {/* Channel Filter */}
            <select
                className="h-9 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-black px-2"
                value={filters.channel_id || ""}
                onChange={(e) => setFilters({ channel_id: e.target.value ? Number(e.target.value) : undefined })}
            >
                <option value="">All Sources</option>
                {Object.entries(CHANNEL_MAP).map(([id, { label }]) => (
                    <option key={id} value={id}>{label}</option>
                ))}
            </select>

            {/* Rating Filter */}
            <select
                className="h-9 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-black px-2"
                value={filters.rating || ""}
                onChange={(e) => setFilters({ rating: e.target.value ? Number(e.target.value) : undefined })}
            >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
            </select>

            {/* Sort Order */}
            <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                    className="h-9 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-black px-2"
                    value={filters.sort_by}
                    onChange={(e) => setFilters({ sort_by: e.target.value as 'submitted_at' | 'rating' })}
                >
                    <option value="submitted_at">Date</option>
                    <option value="rating">Rating</option>
                </select>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters({ sort_desc: !filters.sort_desc })}
                >
                    {filters.sort_desc ? "Desc" : "Asc"}
                </Button>
            </div>
        </div>
    );
};
