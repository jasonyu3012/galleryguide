from sqlalchemy.exc import IntegrityError
from sqlalchemy import MetaData, create_engine
from sqlalchemy import Table, Column, Integer, String, Float, ForeignKey
from sqlalchemy import insert

def db_init():
    """
    Initializes the database tables and stuff
    """
    global metadata_obj
    metadata = MetaData()

    global engine
    engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)

    """
    TODO: Add all necessary elements, just testing these for now.
    Also add nullable=false where possible to the columns
    """
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

    metadata.create_all(engine)

    global conn
    conn = engine.connect()

def add_gallery(gallery, profile, artist_ids, artwork_ids):
    """
    Adds a gallery entry to the database and adds relationships
    to the provided artist and artwork ids

    returns: positive gallery id or -1 if the gallery was not inserted 
    """
    s = insert(gallery_table).values(
        name = gallery["name"],
        region = gallery["region"],
        description = profile["description"],
        thumbnail = gallery["_links"]["thumbnail"]["href"],
        website = gallery["_links"]["website"]["href"],
        num_artworks = len(artwork_ids),
        num_artists = len(artist_ids)
    )


    try: 
        result = conn.execute(s)
        id = result.inserted_primary_key[0]
        
        for work_id in artwork_ids:
            add_gallery_artwork_rel(id, work_id)

        for artist_id in artist_ids:
            add_gallery_artist_rel(id, artist_id)

        return id
    except IntegrityError:
        return -1
    

def add_artist(artist, artwork_ids):
    """
    Adds an artist entry to the database and adds relationships
    to the provided artwork ids

    returns: positive artist id or -1 if the artist was not inserted 
    """
    s = insert(artist_table).values(
        name = artist["name"],
        biography = artist["biography"],
        birth_year = artist["birthday"],
        death_year = artist["deathday"],
        thumbnail = artist["_links"]["thumbnail"]["href"],
        num_artworks = len(artwork_ids),
        num_galleries = 0 #TODO:
    )

    try:
        result = conn.execute(s)
        id = result.inserted_primary_key[0]
        for work_id in artwork_ids:
            add_artist_artwork_rel(id, work_id)
        return id
    except IntegrityError:
        return -1

def add_artwork(artwork):
    """
    Adds an artwork entry to the database

    returns: positive work id or -1 if the work was not inserted 
    """
    s = insert(artwork_table).values(
        image = artwork["_links"]["thumbnail"]["href"],
        title= artwork["title"],
        date = artwork["date"],
        medium = artwork["medium"],
        iconicity = artwork["iconicity"],
        image_rights = artwork["image_rights"]
    )

    
    try:
        result = conn.execute(s)
        return result.inserted_primary_key[0]
    except IntegrityError:
        return -1    


def add_gallery_artist_rel(gallery_id, artist_id):
    pass

def add_gallery_artwork_rel(gallery_id, artwork_id):
    pass

def add_artist_artwork_rel(artist_id, artwork_id):
    pass

def commit():
    conn.commit()

#TODO: add duplicate checking function some how?