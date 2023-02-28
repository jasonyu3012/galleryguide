import requests
import time
import logging
ARTSY_BASE_URL = "https://api.artsy.net/api"
PARTNER_PAGE_LIMIT = 100
LOG_LEVEL = logging.INFO

"""We need a better rate limiting solution."""

def kickoff(session):
    partners = get_artsy_partners(session)

    partner_page = partners
    i = 0
    while partner_page and i < PARTNER_PAGE_LIMIT:
        #iterate through pages 
        for partner in partner_page["_embedded"]["partners"]:
            #iterate over partners on a page
            profile = get_partner_profile(session, partner)
            if meets_gallery_requirement(profile):
                logging.info(profile)
                
                
        time.sleep(1)
        partner_page = get_next_partner_page(session, partner_page)
        i += 1
        



def get_artsy_partners(session):
    r = session.get(ARTSY_BASE_URL + "/partners")
    partners = r.json()
    return partners

def get_next_partner_page(session, current_page):
    logging.info("Getting next partners page")
    if current_page["_links"]["next"]["href"]:
        r = session.get(current_page["_links"]["next"]["href"])
        next = r.json()
    else:
        next = None
    return next

def get_partner_profile(session, partner):
    try:
        r = session.get(partner["_links"]["profile"]["href"])
        json = r.json()
    except requests.exceptions.JSONDecodeError:
        json = {"type": "other_error", "message": "Profile Not Found"}
    return json

def meets_gallery_requirement(profile):
    if "message" in profile and profile["message"] == "Profile Not Found":
        return False

    if "image_versions" not in profile:
        return False
    
    desc = profile["description"]
    loc = profile["location"]
    site = profile["_links"]["website"]["href"]
    image_versions = profile["image_versions"]
    logging.info("Desc: " + desc)
    logging.info("Loc: " + loc)
    logging.info("site: " + site)
    logging.info("image_versions: " + str(image_versions))
    return not desc == "" and not loc == "" and not site == "" and len(image_versions) > 1

if __name__ == "__main__":
    logging.basicConfig(level=LOG_LEVEL)
    f = open("artsy_token.txt", "r")
    ARTSY_TOKEN = f.readline()
    f.close()
    requests.Session 
    with requests.Session() as session:
        session.headers = {"X-Xapp-Token": ARTSY_TOKEN}
        kickoff(session)