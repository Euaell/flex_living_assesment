from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ReviewBase(BaseModel):
    external_id: str
    listing_id: int
    channel_id: int
    guest_name: str
    rating: float = Field(ge=0, le=10)
    public_review: Optional[str] = None
    arrival_date: Optional[datetime] = None
    departure_date: Optional[datetime] = None
    submitted_at: datetime
    status: str
    type: str
    is_displayed: bool = True
    raw_data: Optional[dict] = None


class ReviewCreate(ReviewBase):
    pass


class ReviewResponse(ReviewBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ReviewListResponse(BaseModel):
    total: int
    reviews: list[ReviewResponse]


class ReviewStatsResponse(BaseModel):
    total_reviews: int
    average_rating: float
    by_channel: dict[str, int]  # channel_id -> count
    by_rating: dict[str, int]  # rating -> count
    # New trend analysis fields
    by_date: dict[str, int]  # date -> count
    by_month: dict[str, int]  # month -> count
    by_channel_rating: dict[str, float]  # channel_id -> average rating
    rating_trend: list[dict]  # list of {date: str, avg_rating: float}
    visibility_by_channel: dict[str, dict[str, int]]  # channel_id -> {visible: count, hidden: count}


class VisibilityToggleRequest(BaseModel):
    is_displayed: bool
