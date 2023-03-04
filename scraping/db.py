from sqlalchemy import MetaData, create_engine
from sqlalchemy import Table, Column, Integer, String, Float
from sqlalchemy import insert

def db_init():
    """
    Initializes the database tables and stuff
    """
    global metadata_obj
    metadata_obj = MetaData()

    global engine
    engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)

    """
    TODO: Add all necessary elements, just testing these for now.
    Also add nullable=false where possible to the columns
    """
    global gallery_table
    gallery_table = Table(
        "gallery",
        metadata_obj,
        Column("id", Integer, primary_key=True),
        Column("name", String),
        Column("region", String),
        Column("description", String),
        Column("thumbnail", String),
        Column("website", String)
    )

    global artist_table
    artist_table = Table(
        "artist",
        metadata_obj,
        Column("id", Integer, primary_key=True),
        Column("name", String),
        Column("biography", String),
        Column("birth_year", Integer),
        Column("death_year", Integer),
        Column("thumbnail", String)
    )

    global artwork_table
    artwork_table = Table(
        "artwork",
        metadata_obj,
        Column("id", Integer, primary_key=True),
        Column("image", String),
        Column("title", String),
        Column("date", String),
        Column("medium", String),
        Column("iconicity", Float),
        Column("image_rights", String)
    )

    metadata_obj.create_all(engine)

    global conn
    conn = engine.connect()

def add_gallery(gallery):
    s = insert(gallery_table).values(
        name=name,
        region=region,
        description=description,
        thumbnail=thumbnail,
        website=website
    )

    conn.execute(s)

def add_artist(artist):
    s = insert(artist_table).values(
        name=name,
        biography=biography,
        birth_year=birth_year,
        death_year=death_year,
        thumbnail=thumbnail
    )

    conn.execute(s)

def add_artwork(artwork):
    s = insert(artwork_table).values(
        image=image,
        title=title,
        date=date,
        medium=medium,
        iconicity=icon,
        image_rights=rights
    )

    conn.exectue(s)

def commit():
    conn.commit()

#TODO: add duplicate checking function some how?