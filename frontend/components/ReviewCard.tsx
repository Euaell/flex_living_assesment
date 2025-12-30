import { Review } from "@/types/review";
import { StarRating } from "./StarRating";
import { SourceBadge } from "./SourceBadge";
import { formatDate } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/Button";

interface ReviewCardProps {
    review: Review;
    isAdmin?: boolean;
    onToggleVisibility?: (id: number, current: boolean) => void;
}

export const ReviewCard = ({ review, isAdmin, onToggleVisibility }: ReviewCardProps) => {
    return (
        <div className={`py-8 border-b border-gray-100 ${!review.is_displayed && isAdmin ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm">
                        {review.guest_name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{review.guest_name}</h3>
                        <p className="text-xs text-gray-500">{formatDate(review.submitted_at)}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <StarRating rating={review.rating} size={14} />
                    <SourceBadge channelId={review.channel_id} />
                </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm mt-4">
                {review.public_review || "No written review provided."}
            </p>

            {isAdmin && onToggleVisibility && (
                <div className="flex justify-end mt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleVisibility(review.id, review.is_displayed)}
                        className={review.is_displayed ? "text-green-600 hover:text-green-700 hover:bg-green-50" : "text-gray-400 hover:text-gray-500"}
                    >
                        {review.is_displayed ? (
                            <>
                                <Eye size={14} className="mr-1.5" /> Visible
                            </>
                        ) : (
                            <>
                                <EyeOff size={14} className="mr-1.5" /> Hidden
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};
