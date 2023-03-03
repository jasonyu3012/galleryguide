from flask import Flask
from flask.helpers import send_from_directory

app = Flask(__name__, static_folder='build', static_url_path='/')

"""
Redirects urls with no routes back to the react-router in index.html
"""

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    print("serve")
    return app.send_static_file('index.html')

@app.route("/api/galleries")
def gallery_endpoint():
    pass

@app.route("/api/galleries/<int: id>")
def gallery_id_endpoint(id):
    pass

@app.route("/api/artists")
def artist_endpoint():
    pass

@app.route("/api/artists/<int: id>")
def artist_id_endpoint(id):
    pass

@app.route("/api/artworks")
def artwork_endpoint():
    pass

@app.route("/api/artworks/<int: id>")
def artwork_id_endpoint(id):
    pass

@app.route("/api/spotlight")
def spotlight_endpoint():
    pass

if __name__ == "__main__":
    app.run(host='0.0.0.0')