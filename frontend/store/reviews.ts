import { create } from 'zustand';
import { apiRequest } from '@/utils/api';
import { Review, ReviewFilters, ReviewResponse, ReviewStats } from '@/types/review';

interface ReviewsState {
    reviews: Review[];
    total: number;
    stats: ReviewStats | null;
    loading: boolean;
    error: string | null;
    filters: ReviewFilters;
    page: number;
    limit: number;

    // Auth
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;

    // Actions
    fetchReviews: (params?: ReviewFilters) => Promise<void>;
    fetchStats: () => Promise<void>;
    syncReviews: () => Promise<void>;
    toggleVisibility: (id: number, is_displayed: boolean) => Promise<void>;
    setFilters: (filters: Partial<ReviewFilters>) => void;
    setPage: (page: number) => void;
}

export const useReviewsStore = create<ReviewsState>((set, get) => ({
    reviews: [],
    total: 0,
    stats: null,
    loading: false,
    error: null,
    filters: {
        sort_by: 'submitted_at',
        sort_desc: true,
    },
    page: 1,
    limit: 5,

    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,

    login: (token: string) => {
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, isAuthenticated: false });
    },

    setFilters: (newFilters) => {
        set((state) => ({ filters: { ...state.filters, ...newFilters }, page: 1 })); // Reset to page 1 on filter change
        get().fetchReviews();
    },

    setPage: (page) => {
        set({ page });
        get().fetchReviews();
    },

    fetchReviews: async (params) => {
        set({ loading: true, error: null });
        const currentFilters = params || get().filters;
        const { token } = get();

        try {
            // Build query string
            const searchParams = new URLSearchParams();
            if (currentFilters.channel_id) searchParams.append('channel_id', String(currentFilters.channel_id));
            if (currentFilters.rating) searchParams.append('rating', String(currentFilters.rating));
            if (currentFilters.is_displayed !== undefined) searchParams.append('is_displayed', String(currentFilters.is_displayed));
            if (currentFilters.sort_by) searchParams.append('sort_by', currentFilters.sort_by);
            if (currentFilters.sort_desc !== undefined) searchParams.append('sort_desc', String(currentFilters.sort_desc));

            const page = get().page;
            const limit = get().limit;
            const skip = (page - 1) * limit;

            searchParams.append('skip', String(skip));
            searchParams.append('limit', String(limit));

            const response = await apiRequest<ReviewResponse>(`/reviews/?${searchParams.toString()}`, {
                token: token || undefined
            });

            set({ reviews: response.reviews, total: response.total, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    fetchStats: async () => {
        try {
            const response = await apiRequest<ReviewStats>('/reviews/stats');
            set({ stats: response });
        } catch (err: any) {
            console.error("Failed to fetch stats", err);
        }
    },

    syncReviews: async () => {
        set({ loading: true });
        const { token } = get();
        if (!token) {
            set({ error: "Authentication required", loading: false });
            return;
        }
        try {
            await apiRequest('/reviews/sync', { method: 'POST', token });
            await get().fetchReviews();
            await get().fetchStats();
            set({ loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    toggleVisibility: async (id, is_displayed) => {
        // Optimistic update
        set((state) => ({
            reviews: state.reviews.map(r => r.id === id ? { ...r, is_displayed } : r)
        }));

        const { token } = get();
        if (!token) return;

        try {
            await apiRequest(`/reviews/${id}/visibility`, {
                method: 'PATCH',
                body: { is_displayed },
                token
            });
            // Refresh stats as they might depend on visibility? No, stats are total.
        } catch (err: any) {
            // Revert on error
            set((state) => ({
                reviews: state.reviews.map(r => r.id === id ? { ...r, is_displayed: !is_displayed } : r),
                error: err.message
            }));
        }
    }
}));
