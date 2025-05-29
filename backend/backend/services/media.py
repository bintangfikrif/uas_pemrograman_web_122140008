from typing import List, Optional
from sqlalchemy.orm import Session
from marshmallow import ValidationError
from ..models.media import Media
from ..schema.media import MediaCreateSchema, MediaUpdateSchema

class MediaService:
    """Service for media operations."""

    @staticmethod
    def get_all_media(db: Session) -> List[Media]:
        return db.query(Media).all()

    @staticmethod
    def get_media_by_id(db: Session, media_id: int) -> Optional[Media]:
        return db.query(Media).get(media_id)

    @staticmethod
    def get_media_by_title_and_year(db: Session, title: str, year: int) -> Optional[Media]:
        return db.query(Media).filter(Media.title == title, Media.year == year).first()

    @staticmethod
    def create_media(db: Session, media_data: dict) -> Media:
        try:
            validated_data = MediaCreateSchema().load(media_data)
        except ValidationError as err:
            raise err

        media = Media(**validated_data)
        db.add(media)
        db.flush()  # flush to DB, but don't commit; transaction manager handles commit
        return media

    @staticmethod
    def update_media(db: Session, media: Media, update_data: dict) -> Media:
        try:
            validated_data = MediaUpdateSchema().load(update_data, partial=True)
            for key, value in validated_data.items():
                setattr(media, key, value)
            db.flush()  # flush changes but do NOT commit here
            db.refresh(media)
            return media
        except ValidationError as e:
            raise ValueError(e.messages)

    @staticmethod
    def delete_media(db: Session, media: Media) -> None:
        db.delete(media)
        db.flush()  # flush delete but no commit here
