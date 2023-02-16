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

# @app.route("/about")
# def about():
#     return "<h1>Hello there</h1>"


if __name__ == "__main__":
    app.run(host='0.0.0.0')