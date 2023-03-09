from sqlalchemy import MetaData, create_engine
from sqlalchemy import Table, Column, Integer, String, Float, ForeignKey
from sqlalchemy import insert, select, update, func
import random

"""
This is where our database code goes. 
Controller (appserver.py) calls this.
"""

def get_gallery_page(start_id, end_id):
    """
    Gets a gallery page from the database based on start and end id

    returns: An iterator over SQLAlchemy row objects if there was a
             successful query
             None if the query caused an exception
    """
    s = select(gallery_table).where(gallery_table.c.id.between(start_id, end_id))
    
    rows = None
    try:
        rows = conn.execute(s)
    except:
        pass
    #TODO: what happens when the range from start to end is not full or empty
    return rows
    
def get_artist_page(start_id, end_id):
    """
    Gets an artist page from the database based on start and end id

    returns: An iterator over SQLAlchemy row objects if there was a
             successful query
             None if the query caused an exception
    """
    s = select(artist_table).where(artist_table.c.id.between(start_id, end_id))
    
    rows = None
    try:
        rows = conn.execute(s)
    except:
        pass
    
    return rows

def get_artwork_page(start_id, end_id):
    """
    Gets an artwork page from the database based on start and end id

    returns: An iterator over SQLAlchemy row objects if there was a
             successful query
             None if the query caused an exception
    """
    s = select(artwork_table).where(artwork_table.c.id.between(start_id, end_id))
    
    rows = None
    try:
        rows = conn.execute(s)
    except:
        pass
    
    return rows

def get_gallery(id):
    """
    Gets the gallery from the database with the given id

    returns: An iterator over SQLAlchemy row objects if there was a
             successful query
             None if the query caused an exception
    """
    s = select(gallery_table).where(gallery_table.c.id == id)

    rows = None
    try:
        rows = conn.execute(s)
    except:
        pass
    #TODO: what happens when we are given an id not in the database?
    return rows

def get_artist(id):
    """
    Gets the artist from the database with the given id

    returns: An iterator over SQLAlchemy row objects if there was a
             successful query
             None if the query caused an exception
    """
    s = select(artist_table).where(artist_table.c.id == id)

    rows = None
    try:
        rows = conn.execute(s)
    except:
        pass
    #TODO: what happens when we are given an id not in the database?
    return rows

def get_artwork(id):
    """
    Gets the artwork from the database with the given id

    returns: An iterator over SQLAlchemy row objects if there was a
             successful query
             None if the query caused an exception
    """
    s = select(artwork_table).where(artwork_table.c.id == id)

    rows = None
    try:
        rows = conn.execute(s)
    except:
        pass
    #TODO: what happens when we are given an id not in the database?
    return rows

def get_artist_artwork_pair():
    num_artists = 0
    try:
        num_artists = conn.execute(func.count(artist_table.c.id)).scalar()
    except:
        #Database error
        return ()
    

    lucky_artist_id = random.randrange(1, num_artists + 1)

    s = select(artist_table).where(artist_table.c.id == lucky_artist_id)
    try:
        lucky_artist = conn.execute(s).fetchone()
    except:
        #Database error
        return ()

    if lucky_artist is None:
        return ()
    
    num_artworks = lucky_artist._get_by_key_impl_mapping("num_artworks")
    lucky_artwork_id = random.randrange(1, num_artworks + 1)

    s = select(artwork_table).where(artwork_table.c.id == lucky_artwork_id)
    try:
        lucky_artwork = conn.execute(s).fetchone()
    except:
        #Database error
        return ()

    if lucky_artwork is None:
        return ()

    return (lucky_artist, lucky_artwork)


def db_init(db_string, echo):
    """
    Initializes the database tables and stuff
    """
    global metadata
    metadata = MetaData()

    global engine
    engine = create_engine(db_string, echo=echo, future=True)


    global gallery_table
    gallery_table = Table(
        "gallery",
        metadata,
        Column("id", Integer, primary_key=True, autoincrement=True),
        Column("name", String, unique=True, nullable=False),
        Column("region", String, nullable=False),
        Column("description", String, nullable=False),
        Column("thumbnail", String, nullable=False),
        Column("website", String, nullable=False),
        Column("num_artworks", Integer, nullable=False),
        Column("num_artists", Integer, nullable=False)
    )

    global artist_table
    artist_table = Table(
        "artist",
        metadata,
        Column("id", Integer, primary_key=True, autoincrement=True),
        Column("name", String, unique=True, nullable=False),
        Column("biography", String, nullable=False),
        Column("birth_year", Integer, nullable=False),
        Column("death_year", Integer),
        Column("thumbnail", String, nullable=False),
        Column("num_artworks", Integer, nullable=False),
        Column("num_galleries", Integer, nullable=False)
    )

    global artwork_table
    artwork_table = Table(
        "artwork",
        metadata,
        Column("id", Integer, primary_key=True, autoincrement=True),
        #We might not actually need the artwork to know about its artist id
        #or gallery id. Since the relationships are defined in separate tables
        #they can be found using the artwork id. This does mean an extra query
        #from the database though when we want to know the painter or gallery
        Column("artist_id", Integer, ForeignKey("artist.id"), nullable=False),
        Column("gallery_id", Integer, ForeignKey("gallery.id"), nullable=False),
        #It is possible that the title could be the same for some works,
        #we may consider removing this unique constraint. If we never
        #get duplicate artists, we will never see duplicate artworks.
        Column("title", String, unique=True, nullable=False),
        Column("date", String, nullable=False),
        Column("medium", String, nullable=False),
        Column("iconicity", Float, nullable=False),
        Column("image_rights", String, nullable=False),
        Column("image", String, nullable=False)
    )

    global gallery_artist_rel_table
    gallery_artist_rel_table = Table(
        "gallery artist relationship",
        metadata,
        Column("gallery_id", Integer, ForeignKey("gallery.id"), nullable=False),
        Column("artist_id", Integer, ForeignKey("artist.id"), nullable=False),
    )

    global gallery_artwork_rel_table
    gallery_artwork_rel_table = Table(
        "gallery artwork relationship",
        metadata,
        Column("gallery_id", Integer, ForeignKey("gallery.id"), nullable=False),
        Column("artwork_id", Integer, ForeignKey("artwork.id"), nullable=False),
    )

    global artist_artwork_rel_table
    artist_artwork_rel_table = Table(
        "artist artwork relationship",
        metadata,
        Column("artist_id", Integer, ForeignKey("artist.id"), nullable=False),
        Column("artwork_id", Integer, ForeignKey("artwork.id"), nullable=False),
    )

    global conn
    conn = engine.connect()


def setup_test_db():
    db_init("sqlite+pysqlite:///:memory:", False)
    metadata.create_all(engine)
    
    i = insert(gallery_table).values(
        name = "Test Gallery",
        region = "Antarctica",
        description = "Fake gallery.",
        thumbnail = "link",
        website = "link",
        num_artworks = 1,
        num_artists = 1,
    )
    conn.execute(i)

    i = insert(artist_table).values(
        name = "Artist Name",
        biography = "Not interesting.",
        birth_year = 0,
        death_year = 10,
        thumbnail = "link",
        num_artworks = 1,
        num_galleries = 1,
    )
    conn.execute(i)

    i = insert(artwork_table).values(
        artist_id = 1,
        gallery_id = 1,
        title = "Artwork",
        date = "2",
        medium = "Dirt.",
        iconicity = 1.23534,
        image_rights = "Do whatever you want with it.",
        image = "link",
    )
    conn.execute(i)

    i = insert(gallery_artist_rel_table).values(gallery_id = 1, artist_id = 1)
    conn.execute(i)

    i = insert(gallery_artwork_rel_table).values(gallery_id = 1, artwork_id = 1)
    conn.execute(i)

    i = insert(artist_artwork_rel_table).values(artist_id = 1, artwork_id = 1)
    conn.execute(i)
    conn.commit()
