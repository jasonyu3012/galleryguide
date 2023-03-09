import requests
import time
import logging
import json
WIKI_BASE_URL = "https://en.wikipedia.org/api/rest_v1"

def get_page_summary(page_title):
    r = requests.get(WIKI_BASE_URL + "/page/summary/" + page_title)
    info = r.json()
    return info

if __name__ == "__main__":
    get_page_summary("Pablo Picasso")