import { ReviewStats, CHANNEL_MAP } from "@/types/review";
import { Card } from "@/components/ui/Card";
import { Star, MessageSquare, Globe } from "lucide-react";

interface StatsCardsProps {
    stats: ReviewStats | null;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Reviews</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.total_reviews}</h3>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 text-yellow-500 rounded-full">
                        <Star size={24} className="fill-current" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Average Rating</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.average_rating.toFixed(1)}</h3>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                        <Globe size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Sources</p>
                        <div className="flex gap-2 text-sm text-gray-600 mt-1">
                            {Object.entries(stats.by_channel).map(([id, count]) => (
                                <span key={id} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                                    {CHANNEL_MAP[parseInt(id)]?.label || `Channel ${id}`}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
