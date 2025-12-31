import { Review } from "@/types/review";
import { StarRating } from "./StarRating";
import { SourceBadge } from "./SourceBadge";
import { formatDate } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import Switch from "./ui/Switch";

interface ReviewCardProps {
    review: Review;
    isAdmin?: boolean;
    onToggleVisibility?: (id: number, current: boolean) => void;
}

export const ReviewCard = ({ review, isAdmin, onToggleVisibility }: ReviewCardProps) => {
    const handleVisibilityChange = (checked: boolean) => {
        if (onToggleVisibility) {
            onToggleVisibility(review.id, checked);
        }
    };

    return (
        <div className={`py-8 border-b border-gray-100`}>
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
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end gap-1">
                        <StarRating rating={review.rating} size={14} />
                        <SourceBadge channelId={review.channel_id} />
                    </div>
                    {isAdmin && onToggleVisibility && (
                        <div className="flex flex-col items-center">
                            <span className="text-xs mr-2 text-gray-500">
                                {review.is_displayed ? 'Visible' : 'Hidden'}
                            </span>
                            <Switch
                                checked={review.is_displayed}
                                onChange={handleVisibilityChange}
                            />
                        </div>
                    )}
                </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm mt-4">
                {review.public_review || "No written review provided."}
            </p>
        </div>
    );
};
