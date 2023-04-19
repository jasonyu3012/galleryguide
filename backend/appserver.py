from flask import Flask, request, jsonify
from flask.helpers import send_from_directory
import os
import model
from flask_cors import CORS
from urllib.parse import urlencode

app = Flask(__name__, static_folder='build')
CORS(app)

#check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

#Used hardcoded string to deploy on EC2, but I am testing so I am using env variable
model.db_init(os.getenv("DATABASE_URL"), echo=False)

# Jason's local postgres "postgresql://postgres:password@localhost:5432/ggdb"
PAGE_SIZE = 9

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    """
    Redirects urls with no routes back to the react-router in index.html
    """
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/galleries")
def gallery_endpoint():
    url_params = request.args.to_dict()
    table_name = "gallery"
    if "page" not in url_params:
        page = 1
    else:
        page = int(url_params["page"])


    if "query" in url_params:
        # Using dummy list of keywords until we decide on retrieval method
        keywords = url_params["query"].split()
        records = model.search_records(table_name, keywords)
    else:
        try:
            records = model.get_table(table_name)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving artists from database " + id, 500)

    # ?query&birth_year=value+true&death_year=value+true&sort, etc etc
    if "artworks" in url_params:
        artworks_value, greater_than_str = url_params["artworks"].split()
        records = model.filter_records(records, "num_artworks", int(artworks_value), "numeric", greater_than_str.lower() == "true")
    if "artists" in url_params:
        artists_value, greater_than_str = url_params["artists"].split()
        records = model.filter_records(records, "num_artists", int(artists_value), "numeric", greater_than_str.lower() == "true")
    if "region" in url_params:
        region_value = url_params["region"]
        records = model.filter_records(records, "region", region_value, "string")

    if "sort" in url_params:
        sort_by, reverse = url_params["sort"].split()
        records = model.sort_records_list(records, sort_by, reverse.lower() == "true")
    
    total = len(records)

    records = paginate_records(records, page, PAGE_SIZE)
    
    url_params["page"] = page + 1
    
    json = {}
    json["galleries"] = []
    for record in records:
        json["galleries"].append(record)
    if len(records) < PAGE_SIZE:
        json["next"] = None
    else :
        json["next"] = ("galleryguide.me/api/galleries?" + urlencode(url_params))
    json["total"] = total
    json["size"] = len(records)
    
    #add extra information
    return json

@app.route("/api/all_galleries")
def all_galleries():
    try:
        galleries = model.get_table("gallery")
        res = {"galleries": galleries, "total": len(galleries)}
        return res
    except BaseException as e:
        return ("Got " + str(e) + " while trying to get all galleries", 500)

@app.route("/api/galleries/<int:id>")
def gallery_id_endpoint(id):
    rows = model.get_gallery(id)
    if rows is None:
        #Do something, probably got bad id
        return "Bad gallery ID", 400
    
    gallery = rows.first()
    if gallery is None:
        #Do something, probably got bad id
        return "Bad gallery ID", 400
    
    gallery_obj = gallery._asdict()

    #Does this check need to be against 1 (int) or "1"
    if request.args.get("artist_ids") == "1":
        try: 
            gallery_obj["artist_ids"] = model.get_gallery_artists(id)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving artist ids of gallery " + id, 500)

    if request.args.get("artwork_ids") == "1":
        try:
            gallery_obj["artwork_ids"] = model.get_gallery_artworks(id)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving artwork ids of gallery " + id, 500)

    return gallery_obj

@app.route("/api/artists")
def artist_endpoint():
    url_params = request.args.to_dict()
    table_name = "artist"
    if "page" not in url_params:
        page = 1
    else:
        page = int(url_params["page"])

    if "query" in url_params:
        # Using dummy list of keywords until we decide on retrieval method
        keywords = url_params["query"].split()
        records = model.search_records(table_name, keywords)
    else:
        try:
            records = model.get_table(table_name)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving artists from database " + id, 500)

    # ?query&birth_year=value+true&death_year=value+true&sort, etc etc
    if "birth_year" in url_params:
        birth_year_value, greater_than_str = url_params["birth_year"].split()
        records = model.filter_records(records, "birth_year", int(birth_year_value), "numeric", greater_than_str.lower() == "true")
    if "death_year" in url_params:
        death_year_value, greater_than_str = url_params["death_year"].split()
        records = model.filter_records(records, "death_year", int(death_year_value), "numeric", greater_than_str.lower() == "true")
    if "num_artworks" in url_params:
        num_artworks_value, greater_than_str = url_params["num_artworks"].split()
        records = model.filter_records(records, "num_artworks", int(num_artworks_value), "numeric", greater_than_str.lower() == "true")

    if "sort" in url_params:
        sort_by, reverse = url_params["sort"].split()
        records = model.sort_records_list(records, sort_by, reverse.lower() == "true")
    
    total = len(records)

    records = paginate_records(records, page, PAGE_SIZE)
    
    url_params["page"] = page + 1
    json = {}
    json["artists"] = []
    for record in records:
        json["artists"].append(record)
    if len(records) < PAGE_SIZE:
        json["next"] = None
    else :
        json["next"] = ("galleryguide.me/api/artists?" + urlencode(url_params))
    json["total"] = total
    json["size"] = len(records)
    
    #add extra information
    return json

@app.route("/api/all_artists")
def all_artists():
    try:
        artist = model.get_table("artist")
        res = {"artists": artist, "total": len(artist)}
        return res
    except BaseException as e:
        return ("Got " + str(e) + " while trying to get all artists", 500)


@app.route("/api/artists/<int:id>")
def artist_id_endpoint(id):
    rows = model.get_artist(id)
    if rows is None:
        #Do something, probably got bad id
        return
    
    #handle and reutrn
    artist = rows.first()
    if artist is None:
        #Do something, probably got bad id
        return "Bad artist ID", 400
    
    artist_obj = artist._asdict()

    if request.args.get("artwork_ids") == "1":
        try:
            artist_obj["artwork_ids"] = model.get_artist_artworks(id)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving artworks of artist " + id, 500)

    if request.args.get("gallery_ids") == "1":
        try:
            artist_obj["gallery_ids"] = model.get_artist_galleries(id)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving galleries of artist " + id, 500)

    return artist_obj


@app.route("/api/artworks")
def artwork_endpoint():

    url_params = request.args.to_dict()
    table_name = "artwork"
    if "page" not in url_params:
        page = 1
    else:
        page = int(url_params["page"])

    if "query" in url_params:
        # Using dummy list of keywords until we decide on retrieval method
        keywords = url_params["query"].split()
        records = model.search_records(table_name, keywords)
    else:
        try:
            records = model.get_table(table_name)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving artwork from database " + id, 500)


    # ?query&birth_year=value+true&death_year=value+true&sort, etc etc
    if "date" in url_params:
        date_value, greater_than_str = url_params["date"].split()
        records = model.filter_records(records, "date", int(date_value), "numeric", greater_than_str.lower() == "true")
    if "iconicity" in url_params:
        iconicity_value, greater_than_str = url_params["iconicity"].split()
        records = model.filter_records(records, "iconicity", float(iconicity_value), "numeric", greater_than_str.lower() == "true")

    if "sort" in url_params:
        sort_by, reverse = url_params["sort"].split()
        records = model.sort_records_list(records, sort_by, reverse.lower() == "true")
    
    total = len(records)

    records = paginate_records(records, page, PAGE_SIZE)
    
    url_params["page"] = page + 1
    json = {}
    json["artworks"] = []
    for record in records:
        json["artworks"].append(record)
    if len(records) < PAGE_SIZE:
        json["next"] = None
    else :
        json["next"] = ("galleryguide.me/api/artworks?" + urlencode(url_params))
    json["total"] = total
    json["size"] = len(records)

    return json

@app.route("/api/all_artworks")
def all_artworks():
    try:
        artworks = model.get_table("artwork")
        res = {"artworks": artworks, "total": len(artworks)}
        return res
    except BaseException as e:
        return ("Got " + str(e) + " while trying to get all artworks", 500)

@app.route("/api/artworks/<int:id>")
def artwork_id_endpoint(id):
    rows = model.get_artwork(id)
    if rows is None:
        #Do something, probably got bad id
        return
    
    #handle and reutrn
    artwork = rows.first()
    if artwork is None:
        #Do something, probably got bad id
        return "Bad artwork ID", 400

    return artwork._asdict()

#BUGGED, meant to return random artists/artwork pair
@app.route("/api/spotlight")
def spotlight_endpoint():
    artist_artwork_pair = model.get_artist_artwork_pair()
    if len(artist_artwork_pair) != 2:
        #Database error, do something
        return "Had trouble getting a spotlight pair", 500
    
    return {"artist": artist_artwork_pair[0]._asdict(), "artwork": artist_artwork_pair[1]._asdict()}

# Currently just used for testing and prototyping
@app.route("/searchdummy")
def search():
    url_params = request.args.to_dict()

    print(url_params)
    
    table_name = "artist" # for testing, just using artist table
    #need to split by whatever we decide 

    page = 1 # Get page number from request.args
    page_size = 9
    
    if "query" in url_params:
        # Using dummy list of keywords until we decide on retrieval method
        keywords = url_params["query"].split()
        print(keywords)
        records = model.search_records(table_name, keywords)
    else:
        try:
            records = model.get_table(table_name)
        except BaseException as e:
            return ("Got " + str(e) + " while retrieving artists from database " + id, 500)
    # else just grab all records? Might be slow

    # ?query&birth_year=value+true&death_year=value+true&sort, etc etc
    if "birth_year" in url_params:
        birth_year_value, greater_than_str = url_params["birth_year"].split()
        records = model.filter_records(records, "birth_year", int(birth_year_value), "numeric", greater_than_str.lower() == "true")
    if "death_year" in url_params:
        death_year_value, greater_than_str = url_params["death_year"].split()
        records = model.filter_records(records, "death_year", int(death_year_value), "numeric", greater_than_str.lower() == "true")
    if "num_artworks" in url_params:
        num_artworks_value, greater_than_str = url_params["num_artworks"].split()
        records = model.filter_records(records, "num_artworks", int(num_artworks_value), "numeric", greater_than_str.lower() == "true")

    if "sort" in url_params:
        sort_by, reverse = url_params["sort"].split()
        records = model.sort_records_list(records, sort_by, reverse.lower() == "true")
    
    total = len(records)

    if "page" in url_params:
        page = url_params["page"]

    records = paginate_records(records, int(page), page_size)
    
    url_params["page"] = int(page) + 1
    json = {}
    json["artists"] = []
    for record in records:
        json["artists"].append(record)
    if len(records) < PAGE_SIZE:
        json["next"] = None
    else :
        json["next"] = ("galleryguide.me/api/artworks?" + urlencode(url_params))
    json["total"] = total
    json["size"] = len(records)
    
    #add extra information
    return json

#return subset of records based on page size and desired page
def paginate_records(records, page, page_size):
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return records[start_index:end_index]
    
if __name__ == "__main__":
    app.run(host='0.0.0.0')
