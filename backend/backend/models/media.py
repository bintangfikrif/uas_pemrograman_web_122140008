from sqlalchemy import Column, Integer, String, Text, Enum, Float
from .base import BaseModel

class Media(BaseModel):
    __tablename__ = 'media'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    year = Column(Integer, nullable=False)
    type = Column(Enum('Movie', 'Series', 'Anime', 'Documentary', name='type_enum'), nullable=False)
    director = Column(String(255), nullable=True)
    genre = Column(String(255), nullable=True)  # Comma-separated genres
    status = Column(Enum('Planned', 'Watching', 'Completed', name='status_enum'), nullable=False)
    rating = Column(Float, nullable=True)  # 1.0 - 5.0
    synopsis = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    poster = Column(String(512), nullable=True)  # URL to poster image

    def __repr__(self):
        return f"<Media(title='{self.title}', year={self.year}, type='{self.type}', status='{self.status}')>"