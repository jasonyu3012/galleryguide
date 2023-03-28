import re
from typing import ParamSpec
from flask import Flask, request, jsonify
from flask.helpers import send_from_directory
# from flask_sqlalchemy import SQLAlchemy
import os
import model
from flask_cors import CORS

app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)

# check for environment variable
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
    return app.send_static_file('index.html')

@app.route("/api/galleries")
def gallery_endpoint():
    page_num = 1
    if request.args.get("page"):
        page_num = int(request.args.get("page"))

    start_id = ((page_num - 1) * PAGE_SIZE) + 1
    end_id = start_id + PAGE_SIZE - 1  

    rows = model.get_gallery_page(start_id, end_id)
    if rows is None:
        #Do something, probably out of galleries
        return
    
    
    next_url = "galleryguide.me/api/galleries?page=" + str((end_id // PAGE_SIZE) + 1)
    json = {"size": 0, "next": next_url, "galleries": []}
    for gallery in rows:
        json["galleries"].append(gallery._asdict())
    
    json["size"] = len(json["galleries"])
    if json["size"] == 0:
        json["next"] = ""

    return json

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
    page_num = 1
    if request.args.get("page"):
        page_num = int(request.args.get("page"))

    start_id = ((page_num - 1) * PAGE_SIZE) + 1
    end_id = start_id + PAGE_SIZE - 1  
    
    rows = model.get_artist_page(start_id, end_id)
    if rows is None:
        #database error
        return

    next_url = "galleryguide.me/api/artists?page=" + str((end_id // PAGE_SIZE) + 1)
    json = {"size": 0, "next": next_url, "artists": []}
    for artist in rows:
        json["artists"].append(artist._asdict())
    
    json["size"] = len(json["artists"])
    if json["size"] == 0:
        json["next"] = ""

    return json

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
    page_num = 1
    if request.args.get("page"):
        page_num = int(request.args.get("page"))
    
    start_id = ((page_num - 1) * PAGE_SIZE) + 1
    end_id = start_id + PAGE_SIZE - 1
    
    rows = model.get_artwork_page(start_id, end_id)
    if rows is None:
        #Database error
        return

    next_url = "galleryguide.me/api/artworks?page=" + str((end_id // PAGE_SIZE) + 1)
    json = {"size": 0, "next": next_url, "artworks": []}
    for artist in rows:
        json["artworks"].append(artist._asdict())
    
    json["size"] = len(json["artworks"])
    if json["size"] == 0:
        json["next"] = ""
    
    return json

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
    table_name = "artist" # for testing, just using artist table
    keywords = ["dummy", "keywords", "pablo", "VINCENT"] # Using dummy list of keywords until we decide on retrieval method
    search = True
    sort = True
    if (search):
        records = model.search_records(table_name, keywords)
    # else just grab all records? Might be slow
    if (sort):
        records = model.sort_records_list(records, "name", True)

    return jsonify(records)
    
if __name__ == "__main__":
    app.run(host='0.0.0.0')
