import { Badge } from "@/components/ui/Badge";
import { CHANNEL_MAP } from "@/types/review";
import { Home, MapPin, Globe } from "lucide-react";

interface SourceBadgeProps {
    channelId: number;
}

export const SourceBadge = ({ channelId }: SourceBadgeProps) => {
    const channel = CHANNEL_MAP[channelId] || { name: 'unknown', label: 'Unknown' };

    let icon = null;
    let variant: 'default' | 'secondary' | 'outline' = 'secondary';
    let className = "";

    switch (channel.name) {
        case 'airbnb':
            icon = <Home size={12} className="mr-1" />;
            className = "bg-[#FF5A5F]/10 text-[#FF5A5F] hover:bg-[#FF5A5F]/20 border-[#FF5A5F]/20";
            break;
        case 'booking':
            icon = <Globe size={12} className="mr-1" />;
            className = "bg-[#003580]/10 text-[#003580] hover:bg-[#003580]/20 border-[#003580]/20";
            break;
        case 'google':
            icon = <MapPin size={12} className="mr-1" />;
            className = "bg-[#4285F4]/10 text-[#4285F4] hover:bg-[#4285F4]/20 border-[#4285F4]/20";
            break;
        default:
            icon = <Home size={12} className="mr-1" />;
    }

    return (
        <Badge variant="outline" className={className}>
            {icon}
            {channel.label}
        </Badge>
    );
};
