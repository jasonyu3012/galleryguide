from appserver import app
import pytest
import json
import model


def test_gallery_endpoint(db_init, client):
    response = client.get("/api/galleries")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == "galleryguide.me/api/galleries?page=2"
    assert data["galleries"][0]["id"] == 1
    assert data["galleries"][0]["name"] == "Test Gallery"

def test_gallery_id_endpoint(db_init, client):
    response = client.get("/api/galleries/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["name"] == "Test Gallery"


def test_artist_endpoint(db_init, client):
    response = client.get("/api/artists")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == "galleryguide.me/api/artists?page=2"
    assert data["artists"][0]["id"] == 1
    assert data["artists"][0]["name"] == "Artist Name"


def test_artist_id_endpoint(db_init, client):
    response = client.get("/api/artists/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["name"] == "Artist Name"


def test_artwork_endpoint(db_init, client):
    response = client.get("/api/artworks")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == "galleryguide.me/api/artworks?page=2"
    assert data["artworks"][0]["id"] == 1
    assert data["artworks"][0]["title"] == "Artwork"


def test_artwork_id_endpoint(db_init, client):
    response = client.get("/api/artworks/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["title"] == "Artwork"

def test_gallery_endpoint_with_bad_page(db_init, client):
    response = client.get("/api/galleries?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == ""
    
def test_artist_endpoint_with_bad_page(db_init, client):
    response = client.get("/api/artists?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == ""

def test_artwork_endpoint_with_bad_page(db_init, client):
    response = client.get("/api/artworks?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == ""

def test_gallery_id_with_bad_id(db_init, client):
    response = client.get("/api/galleries/2")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad gallery ID"

def test_artist_id_with_bad_id(db_init, client):
    response = client.get("/api/artists/2")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad artist ID"

def test_artowrk_id_with_bad_id(db_init, client):
    response = client.get("/api/artworks/2")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad artwork ID"

def test_spotlight(db_init, client):
    response = client.get("/api/spotlight")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))

    assert "artist" in data and data["artist"] is not None
    assert "artwork" in data and data["artwork"] is not None

    assert data["artwork"]["artist_id"] == data["artist"]["id"]

@pytest.fixture
def db_init():
    model.setup_test_db()

@pytest.fixture
def client():
    return app.test_client()


