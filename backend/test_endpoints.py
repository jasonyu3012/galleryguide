from appserver import app
import pytest
import json
import model

"""
Galleries endpoint
"""
def test_gallery_endpoint(db_init, client):
    response = client.get("/api/galleries")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == "galleryguide.me/api/galleries?page=2"
    assert data["galleries"][0]["id"] == 1
    assert data["galleries"][0]["name"] == "Test Gallery"

def test_gallery_endpoint_with_bad_page(db_init, client):
    response = client.get("/api/galleries?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == ""

"""
Galleries/<id> endpoint
"""
def test_gallery_id_endpoint(db_init, client):
    response = client.get("/api/galleries/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["name"] == "Test Gallery"

def test_gallery_id_with_bad_id(db_init, client):
    response = client.get("/api/galleries/2")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad gallery ID"

def test_gallery_id_artist_param(db_init, client):
    response = client.get("/api/galleries/1?artist_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "artist_ids" in data
    assert data["artist_ids"] == [1]

def test_gallery_id_artwork_param(db_init, client):
    response = client.get("/api/galleries/1?artwork_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "artwork_ids" in data
    assert data["artist_ids"] == [1,2,3]

"""
Artists endpoint
"""
def test_artist_endpoint(db_init, client):
    response = client.get("/api/artists")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == "galleryguide.me/api/artists?page=2"
    assert data["artists"][0]["id"] == 1
    assert data["artists"][0]["name"] == "Artist Name"

def test_artist_endpoint_with_bad_page(db_init, client):
    response = client.get("/api/artists?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == ""

def test_artist_id_galllery_param(db_init, client):
    response = client.get("/api/artists/1?gallery_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "gallery_ids" in data
    assert data["gallery_ids"] == [1]

def test_artist_id_artwork_param(db_init, client):
    response = client.get("/api/artists/1?artwork_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "artwork_ids" in data
    assert data["artwork_ids"] == [1]

def test_query_artworks_param(db_init, client):
    #basic query
    response = client.get("/api/artist?query=Alfred")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["artists"][0]["id"] == 2

def test_filter_artworks_param(db_init, client):
    #basic filter
    response = client.get("/api/artist?death_year=1998+true")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["artists"][0]["id"] == 2

    #check exclusive
    response = client.get("/api/artist?death_year=1999+true")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0

    #check less than 
    response = client.get("/api/artist?death_year=1999+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 2
    assert data["artists"][0]["id"] == 1
    assert data["artists"][1]["id"] == 3

def test_sort_artworks_param(db_init, client):
    #standard sort
    response = client.get("/api/artist?sort=death_year+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 3
    assert data["artists"][0]["id"] == 1
    assert data["artists"][1]["id"] == 3
    assert data["artists"][2]["id"] == 2

    #backward sort
    response = client.get("/api/artist?sort=death_year+true")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 3
    assert data["artists"][0]["id"] == 2
    assert data["artists"][1]["id"] == 3
    assert data["artists"][2]["id"] == 1

def test_sort_filter_and_sort(db_init, client):
    response = client.get("/api/artist?sort=death_year+true&birth_year=1+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 2
    assert data["artists"][0]["id"] == 2
    assert data["artists"][1]["id"] == 1

    #statements should work in any order
    response = client.get("/api/artist?birth_year=1+false&sort=death_year+true")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 2
    assert data["artists"][0]["id"] == 2
    assert data["artists"][1]["id"] == 1

"""
Artists/<id> endpoint
"""
def test_artist_id_endpoint(db_init, client):
    response = client.get("/api/artists/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["name"] == "Artist Name"

def test_artist_id_with_bad_id(db_init, client):
    response = client.get("/api/artists/4")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad artist ID"

"""
Artworks endpoint
"""
def test_artwork_endpoint(db_init, client):
    response = client.get("/api/artworks")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == "galleryguide.me/api/artworks?page=2"
    assert data["artworks"][0]["id"] == 1
    assert data["artworks"][0]["title"] == "Artwork"

def test_artwork_endpoint_with_bad_page(db_init, client):
    response = client.get("/api/artworks?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == ""


"""
Artworks/<id> endpoint
"""
def test_artwork_id_endpoint(db_init, client):
    response = client.get("/api/artworks/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["title"] == "Artwork"

def test_artowrk_id_with_bad_id(db_init, client):
    response = client.get("/api/artworks/2")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad artwork ID"


"""
Spotlight endpoint
"""
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


