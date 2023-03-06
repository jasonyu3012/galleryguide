import re
from typing import ParamSpec
from flask import Flask, request
from flask.helpers import send_from_directory
import model

app = Flask(__name__, static_folder='build', static_url_path='/')
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
    #pagination handled here by ? parameter
    page_num = 1
    if request.args.get("page"):
        page_num = int(request.args.get("page"))

    start_id = ((page_num - 1) * PAGE_SIZE) + 1
    end_id = start_id + PAGE_SIZE - 1  

    rows = model.get_gallery_page(start_id, end_id)
    if rows is None:
        #Do something, probably out of galleries
        return
    
    #handle whatever this returns, make it json or something
    #then return it
    next_url = "galleryguide.me/api/galleries?page=" + str((end_id // PAGE_SIZE) + 1)
    json = {"size": 0, "next": next_url, "galleries": []}
    for gallery in rows:
        #does it do it recursivley?
        json["galleries"].append(gallery._asdict())
    json["size"] = len(json["galleries"])
    #Flask takes a returned python dict and converts it to
    #a proper json format. 
    # https://stackoverflow.com/questions/13081532/return-json-response-from-flask-view
    return json

@app.route("/api/galleries/<int: id>")
def gallery_id_endpoint(id):
    rows = model.get_gallery(id)
    if rows is None:
        #Do something, probably got bad id
        return
    
    #handle and reutrn
    gallery = rows.first()
    if gallery is None:
        #Do something, probably got bad id
        return

    return gallery._asdict()

@app.route("/api/artists")
def artist_endpoint():
    page_num = 1
    if request.args.get("page"):
        page_num = int(request.args.get("page"))

    rows = model.get_artist_page(page_num)
    if rows is None:
        #database error
        return

    start_id = ((page_num - 1) * PAGE_SIZE) + 1
    end_id = start_id + PAGE_SIZE - 1  
    
    next_url = "galleryguide.me/api/artists?page=" + str((end_id // PAGE_SIZE) + 1)
    json = {"size": 0, "next": next_url, "artists": []}
    for artist in rows:
        json["artists"].append(artist._asdict())
    json["size"] = len(json["artists"])
    
    return json

@app.route("/api/artists/<int: id>")
def artist_id_endpoint(id):
    rows = model.get_artist(id)
    if rows is None:
        #Do something, probably got bad id
        return
    
    #handle and reutrn
    artist = rows.first()
    if artist is None:
        #Do something, probably got bad id
        return

    return artist._asdict()
    pass

@app.route("/api/artworks")
def artwork_endpoint():
    page_num = 1
    if request.args.get("page"):
        page_num = int(request.args.get("page"))
    
    rows = model.get_artwork_page(page_num)
    if rows is None:
        #Database error
        return
    
    start_id = ((page_num - 1) * PAGE_SIZE) + 1
    end_id = start_id + PAGE_SIZE - 1

    next_url = "galleryguide.me/api/artworks?page=" + str((end_id // PAGE_SIZE) + 1)
    json = {"size": 0, "next": next_url, "artworks": []}
    for artist in rows:
        json["artworks"].append(artist._asdict())
    json["size"] = len(json["artworks"])
    
    return json

@app.route("/api/artworks/<int: id>")
def artwork_id_endpoint(id):
    rows = model.get_artwork(id)
    if rows is None:
        #Do something, probably got bad id
        return
    
    #handle and reutrn
    artwork = rows.first()
    if artwork is None:
        #Do something, probably got bad id
        return

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