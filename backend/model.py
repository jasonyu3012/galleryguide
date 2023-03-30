from sqlalchemy import MetaData, create_engine
from sqlalchemy import Table, Column, Integer, String, Float, ForeignKey
from sqlalchemy import insert, select, update, func
from sqlalchemy import text, or_, cast, String
import random
import sys
import re

"""
This is where our database code goes. 
Controller (appserver.py) calls this.
"""

def search_records(table_name, keywords):
    # Load table schema again
    table = Table(table_name, metadata, autoload=True, autoload_with=engine)

    column_names = [c.name for c in table.columns]

    # list of search conditions
    search_conditions = []

    # Go through list of keywords, adds % to both sides of the keyword
    # Appends ilike conditions for specified columns. If it's a string, append the keyword directly, otherwise do a cast.
    for keyword in keywords:
        keyword = f"%{keyword}%"
        for column in table.columns:
            if isinstance(column.type, String):
                condition = column.ilike(keyword)
            else:
                condition = cast(column, String).ilike(keyword)
            search_conditions.append(condition)

    # the or_ function is used to combine all search conditions in the list
    query = table.select().where(or_(*search_conditions))
    result = conn.execute(query).fetchall()

    records_list = [row._asdict() for row in result]
    return records_list

def sort_records_list(records_list, sort_by, reverse=False) :
    # Note current implementation only works for artist table
    if sort_by == "name" or sort_by == "title":
        return sorted(records_list, key=lambda record: record[sort_by].lower(), reverse=reverse)
    elif sort_by == "date" :
        return sorted(records_list, key=lambda record: extract_year(record[sort_by]), reverse=reverse)
    else:
        return sorted(records_list, key=lambda record: sys.maxsize if record[sort_by] == None else record[sort_by], reverse=reverse)

def filter_records(sorted_records, filter_column, filter_value, filter_type = 'numeric', greater_than=True) :
    if filter_type == 'numeric':
        if greater_than:
            l = []
            for record in sorted_records:
                val = record[filter_column] if record[filter_column] != None else sys.maxsize
                if type(val) == str:
                    val = extract_year(val)
                    if val == None:
                        continue
                if val > filter_value:
                    l.append(record)
            return l
        else :
            l = []
            for record in sorted_records:
                val = record[filter_column] if record[filter_column] != None else sys.maxsize
                if type(val) == str:
                        val = extract_year(val)
                        if val == None:
                            continue
                if val < filter_value:
                    l.append(record)
            return l
    elif filter_type == 'string':
        return [record for record in sorted_records if record[filter_column].lower() == filter_value.lower()]
    else:
        raise ValueError("Invalid filter_type. It must be either 'numeric' or 'string'.")

def extract_year(str):
    if str.isdigit() and len(str) == 4:
        return int(str)
    
    century = re.search(r'(\d{1,2})[(rd)(st)(th)]', str)
    if century:
        century = int(century.group(1))
        return (century - 1) * 100

    probably = re.search(r'\d{4}', str)
    if probably:
        return(int(probably.group(0)))

def get_table(table_name):
    table = Table(table_name, metadata, autoload=True, autoload_with=engine)
    s = table.select()
    try:
        rows = conn.execute(s).fetchall()
        result = [row._asdict() for row in rows]
        return result
    except BaseException as e:
        raise e
    
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

def get_gallery_artists(gallery_id):
    """
    Gets all the artist ids associated with the given gallery_id

    returns: A list of artist ids or raises an exception if there was a database error
    """
    s = select(gallery_artist_rel_table.c.artist_id).where(gallery_artist_rel_table.c.gallery_id == gallery_id)

    try:
        rows = conn.execute(s)
        ids = []
        for row in rows:
            ids.append(row._mapping["artist_id"])
        return ids
    except BaseException as e:
        raise e

def get_gallery_artworks(gallery_id):
    """
    Gets all the artwork ids associated with the given gallery_id

    returns: A list of artwork ids or raises an exception if there was a database error
    """
    s = select(gallery_artwork_rel_table.c.artwork_id).where(gallery_artwork_rel_table.c.gallery_id == gallery_id)

    try:
        rows = conn.execute(s)
        ids = []
        for row in rows:
            ids.append(row._mapping["artwork_id"])
        return ids
    except BaseException as e:
        raise e

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

def get_artist_artworks(artist_id):
    """
    Gets all the artwork ids associated with the given artist_id

    returns: A list of artwork ids or raises an exception if there was a database error
    """
    s = select(artist_artwork_rel_table.c.artwork_id).where(artist_artwork_rel_table.c.artist_id == artist_id)

    try:
        rows = conn.execute(s)
        ids = []
        for row in rows:
            ids.append(row._mapping["artwork_id"])
        return ids
    except BaseException as e:
        raise e
    
def get_artist_galleries(artist_id):
    """
    Gets all the gallery ids associated with the given artist_id

    returns: A list of gallery ids or raises an exception if there was a database error
    """
    s = select(gallery_artist_rel_table.c.gallery_id).where(gallery_artist_rel_table.c.artist_id == artist_id)
    try:
        rows = conn.execute(s)
        ids = []
        for row in rows:
            ids.append(row._mapping["gallery_id"])
        return ids
    except BaseException as e:
        raise e

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

def setup_test_medium_db():
    db_init("sqlite+pysqlite:///:memory:", False)
    metadata.create_all(engine)
    #Search/Filter/Sort tests
    """
    Building 'More Artworks' gallery and associated items
    """

    #ID: 1
    i = insert(gallery_table).values(
        name = "More artworks",
        region = "South America",
        description = "Real gallery.",
        thumbnail = "link",
        website = "link",
        num_artworks = 6,
        num_artists = 5,
    )
    conn.execute(i)
    #insert in new Artists

    #ID: 2
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

    #ID: 3
    i = insert(artist_table).values(
        name = "Alfred",
        biography = "Bruce Waynes Butler",
        birth_year = 0,
        death_year = 1999,
        thumbnail = "link",
        num_artworks = 2,
        num_galleries = 1,
    )
    conn.execute(i)

    #ID: 4
    i = insert(artist_table).values(
        name = "Bob",
        biography = "Professional Builder",
        birth_year = 1950,
        death_year = 1980,
        thumbnail = "link",
        num_artworks = 1,
        num_galleries = 1,
    )
    conn.execute(i)

    #ID: 5
    i = insert(artist_table).values(
        name = "Carmen",
        biography = "Women from San Diego",
        birth_year = 1900,
        death_year = 2000,
        thumbnail = "link",
        num_artworks = 1,
        num_galleries = 1,
    )
    conn.execute(i)

    #ID: 6
    i = insert(artist_table).values(
        name = "Daenerys",
        biography = "Queen of the dragons",
        birth_year = 1984,
        death_year = 2010,
        thumbnail = "link",
        num_artworks = 1,
        num_galleries = 1,
    )
    conn.execute(i)
    
    #ID: 1
    i = insert(artwork_table).values(
        artist_id = 1,
        gallery_id = 1,
        title = "Name work 1",
        date = 1992,
        medium = "Dirt.",
        iconicity = 1.5,
        image_rights = "Do whatever you want with it.",
        image = "link",
    )
    conn.execute(i)

    #ID: 2
    i = insert(artwork_table).values(
        artist_id = 2,
        gallery_id = 1,
        title = "Alfred work 1",
        date = 1922,
        medium = "Dirt.",
        iconicity = 11.23,
        image_rights = "Do whatever you want with it.",
        image = "link",
    )
    conn.execute(i)

    #ID: 3
    i = insert(artwork_table).values(
        artist_id = 2,
        gallery_id = 1,
        title = "Alfred work 2",
        date = 1804,
        medium = "Dirt.",
        iconicity = 4.83,
        image_rights = "Do whatever you want with it.",
        image = "link",
    )
    conn.execute(i)

    #ID: 4
    i = insert(artwork_table).values(
        artist_id = 3,
        gallery_id = 1,
        title = "Bob work 1",
        date = 2025,
        medium = "Dirt.",
        iconicity = 6.23,
        image_rights = "Do whatever you want with it.",
        image = "link",
    )
    conn.execute(i)
    
    #ID: 5
    i = insert(artwork_table).values(
        artist_id = 4,
        gallery_id = 1,
        title = "Carmen work 1",
        date = 1434,
        medium = "Dirt.",
        iconicity = 20.31,
        image_rights = "Do whatever you want with it.",
        image = "link",
    )
    conn.execute(i)
    
    #ID: 6
    i = insert(artwork_table).values(
        artist_id = 5,
        gallery_id = 1,
        title = "Daenerys work 1",
        date = 23456,
        medium = "Dirt.",
        iconicity = 31.234,
        image_rights = "Do whatever you want with it.",
        image = "link",
    )
    conn.execute(i)


    # #insert in new gallery_artist relations
    i = insert(gallery_artist_rel_table).values(gallery_id = 1, artist_id = 1)
    conn.execute(i)
    i = insert(gallery_artist_rel_table).values(gallery_id = 1, artist_id = 2)
    conn.execute(i)
    i = insert(gallery_artist_rel_table).values(gallery_id = 1, artist_id = 3)
    conn.execute(i)
    i = insert(gallery_artist_rel_table).values(gallery_id = 1, artist_id = 4)
    conn.execute(i)
    i = insert(gallery_artist_rel_table).values(gallery_id = 1, artist_id = 5)
    conn.execute(i)

    #insert in new gallery_artworks relations
    i = insert(gallery_artwork_rel_table).values(gallery_id = 1, artwork_id = 1)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 1, artwork_id = 2)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 1, artwork_id = 3)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 1, artwork_id = 4)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 1, artwork_id = 5)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 1, artwork_id = 6)
    conn.execute(i)

    #insert in new artist_artwork relations
    i = insert(artist_artwork_rel_table).values(artist_id = 1, artwork_id = 1)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 2, artwork_id = 2)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 2, artwork_id = 3)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 3, artwork_id = 4)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 4, artwork_id = 5)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 5, artwork_id = 6)
    conn.execute(i)

    """
    Building 'GreatGallery' and associated items
    """
    #ID: 2
    i = insert(gallery_table).values(
        name = "GreatGallery",
        region = "Antarctica",
        description = "Greatest gallery ever",
        thumbnail = "link",
        website = "link",
        num_artworks = 4,
        num_artists = 2,
    )
    conn.execute(i)

    #ID: 6
    i = insert(artist_table).values(
        name = "Steven",
        biography = "A normal guy",
        birth_year = 1600,
        death_year = 1650,
        thumbnail = "link",
        num_artworks = 2,
        num_galleries = 1,
    )
    conn.execute(i)

    #ID: 7
    i = insert(artist_table).values(
        name = "Joe",
        biography = "Paints things",
        birth_year = 2000,
        death_year = None,
        thumbnail = "link",
        num_artworks = 2,
        num_galleries = 1,
    )
    conn.execute(i)

    #ID: 7
    i = insert(artwork_table).values(
        artist_id = 6,
        gallery_id = 2,
        title = "Interpolate",
        date = "1630",
        medium = "Melted marshmallow on the ground",
        iconicity = 1000.321592,
        image_rights = "Have it for free",
        image = "link",
    )
    conn.execute(i)
    
    #ID: 8
    i = insert(artwork_table).values(
        artist_id = 6,
        gallery_id = 2,
        title = "Inquire",
        date = "1645-1646",
        medium = "sticks",
        iconicity = 5.12354,
        image_rights = "None",
        image = "link",
    )
    conn.execute(i)

    #ID: 9
    i = insert(artwork_table).values(
        artist_id = 7,
        gallery_id = 2,
        title = "Self-portrait of Joe",
        date = "21st century",
        medium = "iPhone",
        iconicity = 30.123,
        image_rights = "Posted on Instagram",
        image = "link",
    )
    conn.execute(i)

    #ID: 10
    i = insert(artwork_table).values(
        artist_id = 7,
        gallery_id = 2,
        title = "Musings on COVID",
        date = "ca. 2020",
        medium = "Canon DSLR",
        iconicity = 79.435,
        image_rights = "Public",
        image = "link",
    )
    conn.execute(i)

    #Relations for GreatGallery
    i = insert(gallery_artist_rel_table).values(gallery_id = 2, artist_id = 6)
    conn.execute(i)
    i = insert(gallery_artist_rel_table).values(gallery_id = 2, artist_id = 7)
    conn.execute(i)

    
    i = insert(gallery_artwork_rel_table).values(gallery_id = 2, artwork_id = 7)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 2, artwork_id = 8)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 2, artwork_id = 9)
    conn.execute(i)
    i = insert(gallery_artwork_rel_table).values(gallery_id = 2, artwork_id = 10)
    conn.execute(i)


     
    i = insert(artist_artwork_rel_table).values(artist_id = 6, artwork_id = 7)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 6, artwork_id = 8)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 7, artwork_id = 9)
    conn.execute(i)
    i = insert(artist_artwork_rel_table).values(artist_id = 7, artwork_id = 10)
    conn.execute(i)


    conn.commit()
    

