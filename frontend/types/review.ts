export interface Review {
    id: number;
    external_id: string;
    listing_id: number;
    channel_id: number;
    guest_name: string;
    rating: number;
    public_review?: string;
    arrival_date?: string;
    departure_date?: string;
    submitted_at: string;
    status: string;
    type: string;
    is_displayed: boolean;
    created_at: string;
    updated_at: string;
}

export interface ReviewResponse {
    total: number;
    reviews: Review[];
}

export interface ReviewStats {
    total_reviews: number;
    average_rating: number;
    by_channel: Record<string, number>;
    by_rating: Record<string, number>;
}

export interface ReviewFilters {
    channel_id?: number;
    rating?: number;
    is_displayed?: boolean;
    sort_by?: 'submitted_at' | 'rating';
    sort_desc?: boolean;
}

export const CHANNEL_MAP: Record<number, { name: string; label: string }> = {
    2018: { name: 'airbnb', label: 'Airbnb' },
    2005: { name: 'booking', label: 'Booking.com' },
    2022: { name: 'google', label: 'Google' },
    2000: { name: 'direct', label: 'Direct' },
};
