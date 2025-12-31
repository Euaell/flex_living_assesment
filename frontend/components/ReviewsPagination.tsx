import { useReviewsStore } from "@/store/reviews";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ReviewsPagination() {
    const { total, page, limit, setPage } = useReviewsStore();
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const renderPageNumbers = () => {
        // Simple simplified pagination for now: 1 2 ... last
        // Or just prev/next and current
        // Let's do simple previous/next with page count for simplicity and robustness
        return (
            <span className="text-sm font-medium text-gray-700">
                Page {page} of {totalPages}
            </span>
        );
    };

    return (
        <div className="flex items-center gap-4 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={page === 1}
                className="rounded-full w-10 h-10 border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 text-black cursor-pointer"
            >
                <ChevronLeft size={16} />
            </Button>

            {renderPageNumbers()}

            <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={page === totalPages}
                className="rounded-full w-10 h-10 border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 text-black cursor-pointer"
            >
                <ChevronRight size={16} />
            </Button>
        </div>
    );
}
