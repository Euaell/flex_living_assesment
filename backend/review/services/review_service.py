from sqlalchemy.orm import Session
from sqlalchemy import func, case, desc
from review.models.review import Review
from review.schemas.review import ReviewCreate, ReviewListResponse, ReviewStatsResponse
import json
from pathlib import Path
from datetime import datetime
from typing import Optional, List

DATA_DIR = Path(__file__).parent.parent.parent / "data"
MOCK_FILE = DATA_DIR / "mock_reviews.json"

def sync_reviews(db: Session) -> dict:
    if not MOCK_FILE.exists():
        return {"status": "error", "message": "Mock data file not found"}
    
    with open(MOCK_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    added_count = 0
    updated_count = 0
    
    for item in data:
        # Map JSON fields to model fields
        review_data = {
            "external_id": str(item["id"]),
            "listing_id": item["listingMapId"],
            "channel_id": item["channelId"],
            "guest_name": item["guestName"],
            "rating": float(item["rating"]),
            "public_review": item.get("publicReview"),
            "arrival_date": datetime.fromisoformat(item["arrivalDate"].replace("Z", "+00:00")) if item.get("arrivalDate") else None,
            "departure_date": datetime.fromisoformat(item["departureDate"].replace("Z", "+00:00")) if item.get("departureDate") else None,
            "submitted_at": datetime.fromisoformat(item["submittedAt"].replace("Z", "+00:00")),
            "status": item["status"],
            "type": item["type"],
            "raw_data": item
        }
        
        # Check if exists
        existing = db.query(Review).filter(Review.external_id == review_data["external_id"]).first()
        
        if existing:
            # Update fields
            for key, value in review_data.items():
                setattr(existing, key, value)
            updated_count += 1
        else:
            # Create new
            new_review = Review(**review_data)
            db.add(new_review)
            added_count += 1
            
    db.commit()
    return {"status": "success", "added": added_count, "updated": updated_count}

def get_reviews(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    channel_id: Optional[int] = None,
    rating: Optional[float] = None,
    is_displayed: Optional[bool] = None,
    sort_by: str = "submitted_at",
    sort_desc: bool = True
) -> ReviewListResponse:
    query = db.query(Review)
    
    if channel_id:
        query = query.filter(Review.channel_id == channel_id)
    if rating:
        query = query.filter(Review.rating >= rating)
    if is_displayed is not None:
        query = query.filter(Review.is_displayed == is_displayed)
        
    # Sorting
    if sort_by == "rating":
        order = desc(Review.rating) if sort_desc else Review.rating
    else:
        order = desc(Review.submitted_at) if sort_desc else Review.submitted_at
    
    query = query.order_by(order)
    
    total = query.count()
    reviews = query.offset(skip).limit(limit).all()
    
    return ReviewListResponse(total=total, reviews=reviews)  # type: ignore

def toggle_visibility(db: Session, review_id: int, is_displayed: bool) -> Optional[Review]:
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        return None
    
    review.is_displayed = is_displayed
    db.commit()
    db.refresh(review)
    return review

def get_stats(db: Session) -> ReviewStatsResponse:
    total = db.query(Review).count()
    avg_rating = db.query(func.avg(Review.rating)).scalar() or 0.0
    
    # By Channel
    channels = db.query(Review.channel_id, func.count(Review.id)).group_by(Review.channel_id).all()
    by_channel = {str(c[0]): c[1] for c in channels}
    
    # By Rating (grouped by integer value)
    ratings = db.query(func.floor(Review.rating), func.count(Review.id)).group_by(func.floor(Review.rating)).all()
    by_rating = {str(int(r[0])): r[1] for r in ratings}
    
    return ReviewStatsResponse(
        total_reviews=total,
        average_rating=round(float(avg_rating), 2),
        by_channel=by_channel,
        by_rating=by_rating
    )
