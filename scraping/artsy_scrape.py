import requests
import time
import logging
import json
ARTSY_BASE_URL = "https://api.artsy.net/api"
PARTNER_PAGE_LIMIT = 100
LOG_LEVEL = logging.INFO

"""We need a better rate limiting solution."""

def kickoff(session):
    partners = get_artsy_partners(session)

    partner_page = partners
    total_commitable_partners = 0
    total_commitable_artists = 0
    total_commitable_artworks = 0
    for partner in iterate_over_partners(session, partner_page):
        #for every good partner profile
        num_commitable_artists = 0
        logging.info("Found good partner: " + partner["name"])
        #logging.info(json.dumps(partner, indent=4))
        artist_page = get_artists_from_partner(session, partner)
        for artist in iterate_over_artists(session, artist_page):
            #for every good artist
            num_commitable_artworks = 0
            time.sleep(.5)
            logging.info("Found good artist: " + artist["name"])
            #logging.info(json.dumps(artist, indent=4))
            artwork_page = get_artworks_from_artist(session, artist)
            for artwork in iterate_over_artworks(session, artwork_page):
                #for every good artwork
                logging.info("Found good artwork: " + artwork["title"])
                #logging.info(json.dumps(artwork, indent=4))
                num_commitable_artworks += 1
                total_commitable_artworks += 1
            if num_commitable_artworks > 0:
                num_commitable_artists += 1
                total_commitable_artists += 1
        if num_commitable_artists > 0:
            total_commitable_partners += 1
            logging.info("Commitable partners: " + str(total_commitable_partners) + 
                         "\tartists: " + str(total_commitable_artists) + 
                         "\tartworks: " + str(total_commitable_artworks))
            
        



def get_artsy_partners(session):
    r = session.get(ARTSY_BASE_URL + "/partners")
    partners = r.json()
    return partners

def get_partner_profile(session, partner):
    try:
        r = session.get(partner["_links"]["profile"]["href"])
        json = r.json()
        if r.status_code >= 400:
            logging.info("Error type: " + json["type"] + "\tMessage: " + json["message"])
    except requests.exceptions.JSONDecodeError as e:
        
        json = {"type": "other_error", "message": "Profile Not Found"}
    return json

def get_artists_from_partner(session, partner):
    r = session.get(partner["_links"]["artists"]["href"])
    json = r.json()
    return json

def get_artworks_from_artist(session, artist):
    r = session.get(artist["_links"]["artworks"]["href"])
    json = r.json()
    return json

def get_next_partner_page(session, current_page):
    logging.info("Getting next partners page")
    links = current_page["_links"]
    if "next" in links and current_page["_links"]["next"]["href"]:
        r = session.get(current_page["_links"]["next"]["href"])
        next = r.json()
    else:
        next = None
    return next

def get_next_artist_page(session, current_page):
    logging.info("Getting next artist page")
    links = current_page["_links"]
    if "next" in links and current_page["_links"]["next"]["href"]:
        r = session.get(current_page["_links"]["next"]["href"])
        next = r.json()
    else:
        next = None
    return next

def get_next_artwork_page(session, current_page):
    logging.info("Getting next artwork page")
    links = current_page["_links"]
    if "next" in links and current_page["_links"]["next"]["href"]:
        r = session.get(current_page["_links"]["next"]["href"])
        next = r.json()
    else:
        next = None
    return next

def iterate_over_partners(session, partners_page):
    i = 0
    while partners_page and i < 100:
        #iterate through pages
        time.sleep(1)
        logging.info(i) 
        for partner in partners_page["_embedded"]["partners"]:
            #iterate over partners on a page
            time.sleep(.3)
            profile = get_partner_profile(session, partner)
            if meets_gallery_requirement(partner, profile):
                yield partner
        partners_page = get_next_partner_page(session, partners_page)
        i += 1

def iterate_over_artists(session, artists_page):
    while artists_page:
        for artist in artists_page["_embedded"]["artists"]:
            if meets_artist_requirements(artist):
                yield artist
        time.sleep(1)
        artists_page = get_next_artist_page(session, artists_page)

def iterate_over_artworks(session, artwork_page):
    while artwork_page:
        for artwork in artwork_page["_embedded"]["artworks"]:
            if meets_artwork_requirements(artwork):
                yield artwork
        time.sleep(1)
        artwork_page = get_next_artwork_page(session, artwork_page)

def meets_artwork_requirements(artwork):
    #We should already know the artist name
    if not "title" in artwork or artwork["title"] == "" or artwork["title"] == None:
        return False
    if not "date" in artwork or artwork["date"] == "" or artwork["date"] == None:
        return False
    if not "medium" in artwork or artwork["medium"] == "" or artwork["medium"] == None:
        return False
    if not "iconicity" in artwork:
        return False
    if not "image_rights" in artwork or artwork["image_rights"] == "" or artwork["image_rights"] == None:
        return False
    if not "_links" in artwork:
        return False
    if artwork["_links"]["thumbnail"]["href"] == "" or artwork["_links"]["image"]["href"] == "":
        return False
    return True 

"""
Takes an Artsy artist json object and determines whether it has the
required attributes, checks for an artworks link.
"""
def meets_artist_requirements(artist):
    if not "name" in artist or artist["name"] == "":
        return False
    if not "biography" in artist or artist["biography"] == "" or artist["biography"] == None:
        return False
    if not "birthday" in artist or artist["birthday"] == "":
        return False
    if not "hometown" in artist or artist["hometown"] == "" or artist["hometown"] == None:
        return False
    if not "_links" in artist:
        return False
    if artist["_links"]["thumbnail"]["href"] == "" or artist["_links"]["image"]["href"] == "":
        return False
    if artist["_links"]["artworks"]["href"] == "":
        return False
    return True

def meets_gallery_requirement(partner, profile):
    if "message" in profile and profile["message"] == "Profile Not Found":
        return False

    if "name" not in partner or partner["name"] == "":
        logging.info("No partner name field")
        return False
    if "description" not in profile or profile["description"] == "":
        logging.info("No profile description field")
        return False
    if "region" not in partner or partner["region"] == "":
        logging.info("No partner region field")
        return False
    
    if "_links" not in partner:
        return False
    links = partner["_links"]
    if "website" not in links:
        return False
    if "artists" not in links:
        return False
    return True


    # name = profile["name"]
    # desc = profile["description"]
    # loc = profile["location"]
    # site = profile["_links"]["website"]["href"]
    # image_versions = profile["image_versions"]
    # artist_link = not profile["_links"]["artists"]["href"] == ""
    # return artist_link and not name == "" and not desc == "" and not loc == "" and not site == "" and len(image_versions) > 1

if __name__ == "__main__":
    logging.basicConfig(level=LOG_LEVEL)
    f = open("artsy_token.txt", "r")
    ARTSY_TOKEN = f.readline()
    f.close()
    requests.Session 
    with requests.Session() as session:
        session.headers = {"X-Xapp-Token": ARTSY_TOKEN}
        kickoff(session)