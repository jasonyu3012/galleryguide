import re
from typing import ParamSpec
from flask import Flask, request
from flask.helpers import send_from_directory
# from flask_sqlalchemy import SQLAlchemy
import os
import model

app = Flask(__name__, static_folder='build', static_url_path='/')

# check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

dialect = "postgresql"
driver = "psycopg2"
# app.config["SQLALCHEMY_DATABASE_URI"] = dialect + '+' + driver + "://" + os.getenv("DATABASE_URL")
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)
# conn = db.make_connector()

model.db_init(dialect + "+" + driver + "://" + os.getenv("DATABASE_URL"), echo=False)

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

    return gallery._asdict()

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

    return artist._asdict()


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
    if len(artist_artwork_pair) == 0:
        #Database error, do something
        return
    
    return {"artist": artist_artwork_pair[0]._asdict(), "artwork": artist_artwork_pair[1]._asdict()}

if __name__ == "__main__":
    app.run(host='0.0.0.0')