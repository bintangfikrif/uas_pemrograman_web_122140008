from typing import List, Optional
from sqlalchemy.orm import Session
from marshmallow import ValidationError
from ..models.media import Media
from ..schema.media import MediaCreateSchema, MediaUpdateSchema, MediaSchema

class MediaService:
    """Service for media operations."""

    @staticmethod
    def get_all_media(db: Session) -> List[Media]:
        """Get all media entries."""
        return db.query(Media).all()

    @staticmethod
    def get_media_by_id(db: Session, media_id: int) -> Optional[Media]:
        """Get a media entry by its ID."""
        return db.query(Media).get(media_id)

    @staticmethod
    def get_media_by_title_and_year(db: Session, title: str, year: int) -> Optional[Media]:
        """Get a media entry by its title and year."""
        return db.query(Media).filter(Media.title == title, Media.year == year).first()

    @staticmethod
    def create_media(db: Session, media_data: dict) -> Media:
        """Validate and create a new media entry."""
        try:
            validated_data = MediaCreateSchema().load(media_data)
        except ValidationError as err:
            raise err

        media = Media(**validated_data)
        db.add(media)
        db.flush()
        return media

    @staticmethod
    def update_media(db: Session, media: Media, update_data: dict) -> Media:
        """Update an existing media entry."""
        try:
            validated_data = MediaUpdateSchema().load(update_data, partial=True)
            for key, value in validated_data.items():
                setattr(media, key, value)
            db.commit()
            db.refresh(media)
            return media
        except ValidationError as e:
            raise ValueError(e.messages)

    @staticmethod
    def delete_media(db: Session, media: Media) -> None:
        """Delete a media entry."""
        db.delete(media)
        db.commit()