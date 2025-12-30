from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional
from review.schemas.review import ReviewListResponse, ReviewResponse, ReviewStatsResponse, VisibilityToggleRequest
from review.services import review_service
from core.database import get_db
from auth.services.auth_service import get_current_user
from user.models.user import User

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)

@router.post("/sync", status_code=status.HTTP_200_OK)
def sync_reviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Sync reviews from local mock data file.
    """
    result = review_service.sync_reviews(db)
    if result["status"] == "error":
        raise HTTPException(status_code=500, detail=result["message"])
    return result

@router.get("/", response_model=ReviewListResponse)
def list_reviews(
    skip: int = 0,
    limit: int = 100,
    channel_id: Optional[int] = None,
    rating: Optional[float] = None,
    is_displayed: Optional[bool] = None,
    sort_by: str = Query("submitted_at", enum=["submitted_at", "rating"]),
    sort_desc: bool = True,
    db: Session = Depends(get_db)
):
    """
    Get a list of reviews with optional filtering.
    """
    return review_service.get_reviews(
        db, skip, limit, channel_id, rating, is_displayed, sort_by, sort_desc
    )

@router.get("/stats", response_model=ReviewStatsResponse)
def get_stats(db: Session = Depends(get_db)):
    """
    Get review statistics.
    """
    return review_service.get_stats(db)

@router.patch("/{review_id}/visibility", response_model=ReviewResponse)
def update_visibility(
    review_id: int,
    body: VisibilityToggleRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Toggle the visibility of a review.
    """
    review = review_service.toggle_visibility(db, review_id, body.is_displayed)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review
