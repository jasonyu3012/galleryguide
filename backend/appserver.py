from flask import Flask


app = Flask(__name__, static_folder="mock_build", static_url_path="/mock_build")

"""
Redirects urls with no routes back to the react-router in index.html
"""
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0')