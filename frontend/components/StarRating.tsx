import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
    rating: number;
    max?: number;
    size?: number;
}

export const StarRating = ({ rating, max = 5, size = 16 }: StarRatingProps) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= max; i++) {
        if (i <= fullStars) {
            stars.push(
                <Star
                    key={i}
                    size={size}
                    className="fill-yellow-400 text-yellow-400"
                />
            );
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(
                <div key={i} className="relative">
                    <Star size={size} className="text-gray-300 fill-gray-300" />
                    <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                        <Star size={size} className="text-yellow-400 fill-yellow-400" />
                    </div>
                </div>
            );
        } else {
            stars.push(
                <Star
                    key={i}
                    size={size}
                    className="fill-gray-200 text-gray-200"
                />
            );
        }
    }

    return <div className="flex items-center gap-0.5">{stars}</div>;
};
