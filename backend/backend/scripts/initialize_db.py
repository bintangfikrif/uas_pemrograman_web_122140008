import transaction
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config
from ..models import get_tm_session, get_session_factory, Base
from ..models.media import Media # Assuming your Media model is in ..models/media.py
from ..models.user import User # Assuming your User model is in ..models/user.py (from the reference)
import bcrypt # For hashing passwords if you have users

def main():
    config_uri = 'development.ini' # Or your appropriate configuration file
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')

    # Create all tables defined in Base
    Base.metadata.create_all(engine)

    session_factory = get_session_factory(engine)

    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)

        # --- Optional: Add initial user data (if you want to keep the user seeding from the reference) ---
        # Tambahkan user biasa
        existing_user = dbsession.query(User).filter_by(username='budi').first()
        if not existing_user:
            user1 = User(
                username='budi',
                password=bcrypt.hashpw('budi1234'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='user'
            )
            dbsession.add(user1)
        else:
            user1 = existing_user

        # Tambahkan admin
        existing_admin = dbsession.query(User).filter_by(username='admin').first()
        if not existing_admin:
            admin = User(
                username='admin',
                password=bcrypt.hashpw('admin1234'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='admin'
            )
            dbsession.add(admin)

        dbsession.flush() # Flush to ensure users get IDs if needed for media relationships

        # --- Media Data Seeding ---
        media_data_entries = [
            {
                "title": "Inception",
                "year": 2010,
                "type": "Movie",
                "director": "Christopher Nolan",
                "genre": "Sci-Fi, Action, Thriller",
                "status": "Completed",
                "rating": 4.8,
                "synopsis": "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "notes": "Mind-bending plot!",
                "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
            },
            {
                "title": "Breaking Bad",
                "year": 2008,
                "type": "Series",
                "director": "Vince Gilligan",
                "genre": "Crime, Drama, Thriller",
                "status": "Completed",
                "rating": 4.9,
                "synopsis": "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
                "notes": "One of the best series ever.",
                "poster": "https://m.media-amazon.com/images/M/MV5BYTU3NWI2ODctZGk2MS00NzFyLTlmZTctMmVkYjlkMmRjMjQxXkEyXkFqcGdeQXVyMTE0MzQwMDgy._V1_SX300.jpg"
            },
            {
                "title": "Attack on Titan",
                "year": 2013,
                "type": "Anime",
                "director": "Tetsuro Araki",
                "genre": "Animation, Action, Adventure",
                "status": "Completed",
                "rating": 4.7,
                "synopsis": "After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.",
                "notes": "Epic storyline and animation.",
                "poster": "https://m.media-amazon.com/images/M/MV5BNDY0ODA1YjAtZTAxYS00YzA4LWJjZTgtZTNjNDQyMGIzM2RjXkEyXkFqcGdeQXVyNTY2MzY5MzI@._V1_SX300.jpg"
            },
            {
                "title": "Planet Earth II",
                "year": 2016,
                "type": "Documentary",
                "director": "David Attenborough", # Narrator, often credited as director figure for documentaries
                "genre": "Documentary, Nature",
                "status": "Completed",
                "rating": 4.9,
                "synopsis": "David Attenborough returns to present a follow-up to the acclaimed nature documentary series Planet Earth.",
                "notes": "Stunning visuals and incredible wildlife.",
                "poster": "https://m.media-amazon.com/images/M/MV5BMzMyYjc0ZmQtOGIwYS00ODlkLWJhYmItZTVkMGEzMzYyYmFjXkEyXkFqcGdeQXVyNjcyMDgyMTY@._V1_SX300.jpg"
            },
            {
                "title": "Dune",
                "year": 2021,
                "type": "Movie",
                "director": "Denis Villeneuve",
                "genre": "Sci-Fi, Adventure, Drama",
                "status": "Completed",
                "rating": 4.5,
                "synopsis": "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
                "notes": "Visually spectacular adaptation.",
                "poster": "https://m.media-amazon.com/images/M/MV5BMGFmZjYxMmMtNWIzNC00MmE3LTgzMWYtYjIzYzUzOGQxYjBjXkEyXkFqcGdeQXVyODk4ODE3MTQ@._V1_SX300.jpg"
            },
            {
                "title": "The Queen's Gambit",
                "year": 2020,
                "type": "Series",
                "director": "Scott Frank",
                "genre": "Drama",
                "status": "Completed",
                "rating": 4.6,
                "synopsis": "Orphaned at 9, Beth Harmon is sent to a Kentucky orphanage, where she discovers an astonishing talent for chess and a penchant for addiction.",
                "notes": "Engaging story and great performances.",
                "poster": "https://m.media-amazon.com/images/M/MV5BM2Y2OGY1YjYtYjA4Ni00ZGU2LWEwZmUtYjZkMjY0MDcyMTUxXkEyXkFqcGdeQXVyMTE0NzExNTIw._V1_SX300.jpg"
            },
            {
                "title": "Spirited Away",
                "year": 2001,
                "type": "Anime",
                "director": "Hayao Miyazaki",
                "genre": "Animation, Adventure, Family",
                "status": "Completed",
                "rating": 4.8,
                "synopsis": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, monsters, and spirits, and is forced to take a job to save her parents who have been transformed into pigs.",
                "notes": "A timeless masterpiece.",
                "poster": "https://m.media-amazon.com/images/M/MV5BMjlmZmY0MzMtMjRjZS00Y2MyLWI2MDYtN2IyOGI2NTg0NTA2XkEyXkFqcGdeQXVyMTcwNzE4Mjg4._V1_SX300.jpg"
            },
            {
                "title": "Our Planet",
                "year": 2019,
                "type": "Documentary",
                "director": "David Attenborough",
                "genre": "Documentary, Nature",
                "status": "Completed",
                "rating": 4.7,
                "synopsis": "Witness the planet's most majestic creatures and fragile habitats. From the creators of Planet Earth.",
                "notes": "Crucial for understanding environmental impact.",
                "poster": "https://m.media-amazon.com/images/M/MV5BN2U5MThlOTUtM2I0Mi00MTlhLTg4NzEtZjQ5ODk5NDgxNTQxXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_SX300.jpg"
            },
            {
                "title": "Interstellar",
                "year": 2014,
                "type": "Movie",
                "director": "Christopher Nolan",
                "genre": "Sci-Fi, Drama, Adventure",
                "status": "Completed",
                "rating": 4.7,
                "synopsis": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "notes": "Emotionally powerful and intellectually stimulating.",
                "poster": "https://m.media-amazon.com/images/M/MV5BMjExZTliZmQtYTE2Yy00MjAxLWJjMTAtYjI2YjQ2MjFhZjY3XkEyXkFqcGdeQXVyNjcyMDgyMTY@._V1_SX300.jpg"
            },
            {
                "title": "The Mandalorian",
                "year": 2019,
                "type": "Series",
                "director": "Jon Favreau",
                "genre": "Action, Adventure, Sci-Fi",
                "status": "Watching",
                "rating": 4.5,
                "synopsis": "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
                "notes": "This is the way.",
                "poster": "https://m.media-amazon.com/images/M/MV5BMjM5MTkxNzQ5OF5BMl5BanBnXkFtZTgwNTU5OTg1MjI@._V1_SX300.jpg"
            },
        ]

        # Add media data if not already existing
        for data in media_data_entries:
            existing_media = dbsession.query(Media).filter_by(title=data['title'], year=data['year']).first()
            if not existing_media:
                new_media = Media(**data)
                dbsession.add(new_media)

        print("Database initialized successfully with sample data!")

if __name__ == '__main__':
    main()