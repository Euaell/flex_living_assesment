from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, Float, DateTime, Boolean, Text, Index
from sqlalchemy.dialects.postgresql import JSONB
from core.database import Base
from datetime import datetime


class Review(Base):
    __tablename__ = 'reviews'

    # Primary key
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    
    # Hostaway fields
    external_id: Mapped[str] = mapped_column(String(64), nullable=False, unique=True, comment="Hostaway review ID")
    listing_id: Mapped[int] = mapped_column(Integer, nullable=False, comment="Property/listing ID")
    channel_id: Mapped[int] = mapped_column(Integer, nullable=False, comment="Channel ID (2018=Airbnb, 2005=Booking.com, 2022=Google)")
    
    # Review content
    guest_name: Mapped[str] = mapped_column(String(128), nullable=False)
    rating: Mapped[float] = mapped_column(Float, nullable=False,comment="Rating 1-5 or 1-10, normalized")
    public_review: Mapped[str | None] = mapped_column(Text, nullable=True, comment="Review text content")
    
    # Dates
    arrival_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    departure_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, comment="When review was submitted")
    
    # Hostaway metadata
    status: Mapped[str] = mapped_column(String(32), nullable=False, comment="e.g., 'published', 'pending'")
    type: Mapped[str] = mapped_column(String(32), nullable=False, comment="e.g., 'guest-to-host'")
    
    # Internal management
    is_displayed: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, comment="Show on public site")
    raw_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True, comment="Original API payload")
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Indexes for efficient querying
    __table_args__ = (
        Index('ix_reviews_listing_id', 'listing_id'),
        Index('ix_reviews_channel_id', 'channel_id'),
        Index('ix_reviews_is_displayed', 'is_displayed'),
        Index('ix_reviews_rating', 'rating'),
        Index('ix_reviews_submitted_at', 'submitted_at'),
    )
