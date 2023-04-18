from appserver import app
import pytest
import json
import model

"""
Galleries endpoint
"""
def test_gallery_endpoint(small_db_init, client):
    response = client.get("/api/galleries")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == None
    assert data["galleries"][0]["id"] == 1
    assert data["galleries"][0]["name"] == "Test Gallery"

def test_gallery_endpoint_with_bad_page(small_db_init, client):
    response = client.get("/api/galleries?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == None

def test_gallery_query(medium_db_init,client):
    #Test gallery query with space seperated words 
    response = client.get("/api/galleries?query=more+artworks")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["galleries"][0]["id"] == 1

    #check query for partial string
    response = client.get("/api/galleries?query=South+GreatGallery")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 2
    assert data["galleries"][0]["id"] == 1
    assert data["galleries"][1]["id"] == 2

def test_gallery_filter(medium_db_init,client):
    #basic filter
    response = client.get("/api/galleries?region=South+America")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["galleries"][0]["id"] == 1

    #check exclusive
    response = client.get("/api/galleries?artworks=4+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0

    #check not exclusive
    response = client.get("/api/galleries?artworks=5+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["galleries"][0]["id"] == 2

    #check exlusion in true direction
    response = client.get("/api/galleries?artworks=4+true")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["galleries"][0]["id"] == 1

def test_query_and_sort(medium_db_init, client):
    response = client.get("/api/galleries?query=South+GreatGallery&sort=num_artworks+true")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 2
    assert data["galleries"][0]["id"] == 1
    assert data["galleries"][1]["id"] == 2

def test_query_and_filter(medium_db_init, client):
    response = client.get("/api/galleries?query=South+GreatGallery&region=Antarctica")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["galleries"][0]["id"] == 2

def test_all(medium_db_init, client):
    #tests all three param, and page param and out of order param
    response = client.get("/api/galleries?query=South+GreatGallery&region=Antarctica&sort=num_artworks+true&page=1")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["galleries"][0]["id"] == 2


def test_gallery_sort(medium_db_init, client):
    response = client.get("/api/galleries?sort=num_artworks+true")
    data = json.loads(response.data.decode("utf-8"))
    assert response.status_code == 200
    assert data["size"] == 2
    assert data["galleries"][0]["id"] == 1
    assert data["galleries"][1]["id"] == 2

    #Filter other direction
    response = client.get("/api/galleries?sort=num_artworks+false")
    data = json.loads(response.data.decode("utf-8"))
    assert response.status_code == 200
    assert data["size"] == 2
    assert data["galleries"][0]["id"] == 2
    assert data["galleries"][1]["id"] == 1

"""
Galleries/<id> endpoint
"""
def test_gallery_id_endpoint(small_db_init, client):
    response = client.get("/api/galleries/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["name"] == "Test Gallery"

def test_gallery_id_with_bad_id(small_db_init, client):
    response = client.get("/api/galleries/2")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad gallery ID"

def test_gallery_id_artist_param(small_db_init, client):
    response = client.get("/api/galleries/1?artist_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "artist_ids" in data
    assert data["artist_ids"] == [1]

def test_gallery_id_artwork_param(small_db_init, client):
    response = client.get("/api/galleries/1?artwork_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "artwork_ids" in data
    assert data["artwork_ids"] == [1]

"""
Artists endpoint
"""
def test_artist_endpoint(small_db_init, client):
    response = client.get("/api/artists")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == None
    assert data["artists"][0]["id"] == 1
    assert data["artists"][0]["name"] == "Artist Name"

def test_artist_endpoint_with_bad_page(small_db_init, client):
    response = client.get("/api/artists?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == None

def test_query_artworks_param(medium_db_init, client):
    #basic query
    response = client.get("/api/artists?query=Alfred")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["artists"][0]["id"] == 2

def test_filter_artworks_param(medium_db_init, client):
    #basic filter
    response = client.get("/api/artists?death_year=1998+true")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 4
    assert data["artists"][0]["id"] == 2

    #check exclusive
    response = client.get("/api/artists?death_year=1999+true")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 3

    #check less than 
    response = client.get("/api/artists?death_year=1999+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 3
    assert data["artists"][0]["id"] == 1
    assert data["artists"][1]["id"] == 3

def test_sort_artworks_param(medium_db_init, client):
    #standard sort
    response = client.get("/api/artists?sort=death_year+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 7
    assert data["artists"][0]["id"] == 1
    assert data["artists"][1]["id"] == 6
    assert data["artists"][2]["id"] == 3

    #backward sort
    response = client.get("/api/artists?sort=death_year+true")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 7
    assert data["artists"][0]["id"] == 7
    assert data["artists"][1]["id"] == 5
    assert data["artists"][2]["id"] == 4

def test_sort_filter_and_sort(medium_db_init, client):
    response = client.get("/api/artists?sort=death_year+true&birth_year=1+false")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 2
    assert data["artists"][0]["id"] == 2
    assert data["artists"][1]["id"] == 1

    #statements should work in any order
    response = client.get("/api/artists?birth_year=1+false&sort=death_year+true")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 2
    assert data["artists"][0]["id"] == 2
    assert data["artists"][1]["id"] == 1

"""
Artists/<id> endpoint
"""
def test_artist_id_galllery_param(small_db_init, client):
    response = client.get("/api/artists/1?gallery_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "gallery_ids" in data
    assert data["gallery_ids"] == [1]

def test_artist_id_artwork_param(small_db_init, client):
    response = client.get("/api/artists/1?artwork_ids=1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "artwork_ids" in data
    assert data["artwork_ids"] == [1]

def test_artist_id_endpoint(small_db_init, client):
    response = client.get("/api/artists/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["name"] == "Artist Name"

def test_artist_id_with_bad_id(small_db_init, client):
    response = client.get("/api/artists/4")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad artist ID"

"""
Artworks endpoint
"""
def test_artwork_endpoint(small_db_init, client):
    response = client.get("/api/artworks")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["next"] == None
    assert data["artworks"][0]["id"] == 1
    assert data["artworks"][0]["title"] == "Artwork"

def test_artwork_endpoint_with_bad_page(small_db_init, client):
    response = client.get("/api/artworks?page=2")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 0
    assert data["next"] == None

def test_artwork_query_param(medium_db_init, client):
    response = client.get("/api/artworks?query=iPhone")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["artworks"][0]["id"] == 9
    assert data["size"] == 1
    assert data["next"] == None

def test_artwork_iconicity_param(medium_db_init, client):
    response = client.get("/api/artworks?iconicity=1.1+true&sort=iconicity+false")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 9
    assert data["total"] == 10
    assert data["next"] == "galleryguide.me/api/artworks?iconicity=1.1+true&sort=iconicity+false&page=2"
    assert data["artworks"][0]["id"] == 1
    assert data["artworks"][0]["iconicity"] == 1.5
    assert data["artworks"][8]["id"] == 10
    assert data["artworks"][8]["iconicity"] == 79.435

def test_artwork_iconicity_param2(medium_db_init, client):
    response = client.get("/api/artworks?iconicity=1.6+true&sort=iconicity+false")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 9
    assert data["total"] == 9
    assert data["next"] == "galleryguide.me/api/artworks?iconicity=1.6+true&sort=iconicity+false&page=2"
    assert data["artworks"][0]["id"] == 3
    assert data["artworks"][0]["iconicity"] == 4.83
    assert data["artworks"][8]["id"] == 7
    assert data["artworks"][8]["iconicity"] == 1000.321592

def test_artwork_date_param(medium_db_init, client):
    response = client.get("/api/artworks?date=2300+true&sort=date+true")
    assert response.status_code == 200
    
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 1
    assert data["total"] == 1
    assert data["next"] == None
    assert data["artworks"][0]["id"] == 6

def test_artwork_date_param2(medium_db_init, client):
    response = client.get("/api/artworks?date=2023+false&sort=date+true")
    assert response.status_code == 200
    
    data = json.loads(response.data.decode("utf-8"))
    assert data["size"] == 8
    assert data["total"] == 8
    assert data["next"] == None
    assert data["artworks"][0]["id"] == 10
    assert data["artworks"][1]["id"] == 9
    assert data["artworks"][2]["id"] == 1
    assert data["artworks"][3]["id"] == 2
    assert data["artworks"][4]["id"] == 3
    assert data["artworks"][5]["id"] == 8
    assert data["artworks"][6]["id"] == 7
    assert data["artworks"][7]["id"] == 5

"""
Artworks/<id> endpoint
"""
def test_artwork_id_endpoint(small_db_init, client):
    response = client.get("/api/artworks/1")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert data["id"] == 1
    assert data["title"] == "Artwork"

def test_artowrk_id_with_bad_id(small_db_init, client):
    response = client.get("/api/artworks/2")
    assert response.status_code == 400
    assert response.data.decode("utf-8") == "Bad artwork ID"


"""
All_artworks
"""
def test_all_artworks(medium_db_init, client):
    response = client.get("/api/all_artworks")
    assert response.status_code == 200

    data = json.loads(response.data.decode("utf-8"))
    assert "artworks" in data
    assert len(data["artworks"]) == 10


"""
Spotlight endpoint
"""
def test_spotlight(small_db_init, client):
    response = client.get("/api/spotlight")
    assert response.status_code == 200
    data = json.loads(response.data.decode("utf-8"))

    assert "artist" in data and data["artist"] is not None
    assert "artwork" in data and data["artwork"] is not None

    assert data["artwork"]["artist_id"] == data["artist"]["id"]



@pytest.fixture
def small_db_init():
    model.setup_test_db()

@pytest.fixture
def medium_db_init():
    model.setup_test_medium_db()

@pytest.fixture
def client():
    return app.test_client()


