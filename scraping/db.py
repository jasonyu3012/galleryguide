from sqlalchemy.exc import IntegrityError
from sqlalchemy import MetaData, create_engine
from sqlalchemy import Table, Column, Integer, String, Float, ForeignKey
from sqlalchemy import insert, select, update

def db_init():
    """
    Initializes the database tables and stuff
    """
    global metadata_obj
    metadata = MetaData()

    global engine
    engine = create_engine("sqlite+pysqlite:///:memory:", echo=True, future=True)

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
        #It is possible that the title could be the same for some works,
        #we may consider removing this unique constraint. If we never
        #get duplicate artists, we will never see duplicate artworks.
        Column("artist_id", Integer, ForeignKey("artist.id") nullable=False),
        Column("gallery_id", Integer, ForeignKey("gallery.id"), nullable=False),
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
        thumbnail = profile["_links"]["thumbnail"]["href"],
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
        #get gallery id
        #add relationships
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
        num_artworks = 0,
        num_galleries = 0 #TODO:
    )

    try:
        result = conn.execute(s)
        id = result.inserted_primary_key[0]
        for work_id in artwork_ids:
            add_artist_artwork_rel(id, work_id)
        return id
    except IntegrityError:
        #get artist id from database
        rows = select(artist_table.c.id).where(artwork_table.c.name == artist["name"])
        print(rows)
        assert len(rows) == 1
        id = rows.c.id[0]
        #add artist artwork relationship for artworks
        for work_id in artwork_ids:
            add_artist_artwork_rel(id, work_id)
        
        if len(artwork_ids) > 0:
            return id    
        return -1

def add_artwork(artwork):
    """
    Adds an artwork entry to the database

    returns: positive work id or -1 if the work was not inserted 
    """
    s = insert(artwork_table).values(
        artist_id = ,
        gallery_id = ,
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
    i = insert(gallery_artist_rel_table).values(
        gallery_id = gallery_id,
        artist_id = artist_id
    )

    conn.execute(i)
    #increment the num_galleries field of the artist

    update_num_galleries_of_artist(artist_id)

def update_num_galleries_of_artist(artist_id):
    #select the artist and get the previous num_galleries
    s = select(artist_table.c.num_galleries).where(artist_table.c.id == artist_id)
    rows = conn.execute(s)
    row = rows.first()
    assert row is not None 
    num_galleries = row["num_galleries"]
    #update num_galleries
    u = update(artist_table).where(artist_table.c.id == artist_id).values(num_galleries = num_galleries + 1)
    conn.execute(u)

def add_gallery_artwork_rel(gallery_id, artwork_id):
    i = insert(gallery_artwork_rel_table).values(
        gallery_id = gallery_id,
        artwork_id = artwork_id
    )

    conn.execute(i)

    #could set artwork's gallery_id here
    s = update(artwork_table).where(artwork_table.c.id == artwork_id).values(gallery_id = gallery_id)
    conn.execute(s)
    


def add_artist_artwork_rel(artist_id, artwork_id):
    i = insert(artist_artwork_rel_table).values(
        artist_id = artist_id,
        artwork_id = artwork_id
    )

    conn.execute(i)
    #increment the num_galleries field of the artist
    update_num_artworks_of_artist(artist_id)

    #could set artwork's artist id here
    s = update(artwork_table).where(artwork_table.c.id == artwork_id).values(artist_id = artist_id)
    conn.execute(s)
    

def update_num_artworks_of_artist(artist_id):
    #get old num_artworks
    s = select(artist_table.c.num_artworks).where(artist_table.c.id == artist_id)
    rows = conn.execute(s)
    row = rows.first()
    assert row is not None 
    num_artworks = row["num_artworks"]

    #update num_artworks
    u = update(artist_table).where(artist_table.c.id == artist_id).values(num_artworks = num_artworks + 1)
    conn.execute(u)

def commit():
    conn.commit()

def test():
    s_artist = select(artist_table)
    s_galleries = select(gallery_table)
    s_artworks = select(artwork_table)

    artworks = conn.execute(s_artworks)
    galleries = conn.execute(s_galleries)
    artists = conn.execute(s_artist)

    print("----------Artworks----------")
    for artwork in artworks:
        print(artwork)
    
    print("----------Artists-----------")
    for artists in artists:
        print(artists)

    print("----------Galleries---------")
    for gallery in galleries:
        print(gallery)