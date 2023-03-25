# code adapted from City Scoop
import sys
import time
import pytest
import unittest
import os
import inspect # for function names
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import Remote
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set as False when pushing to GitLab/testing the server
local = True

URL = "https://www.galleryguide.me/"
if local:
    URL = "http://localhost:3000/"

global driver, wait

class TestNavbar(unittest.TestCase):
    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        ops = Options()
        ops.add_argument("--headless") # uncomment to view tests. Helpful for debugging.
        ops.add_argument("--disable-gpu")
        ops.add_argument("--window-size=1280,800")
        ops.add_argument("--allow-insecure-localhost")
        ops.add_argument("--disable-web-security")
        ops.add_argument("--log-level=3")
        ops.add_argument("--no-sandbox")
        ops.add_argument("--disable-dev-shm-usage")

        cls.driver = webdriver.Chrome(options=ops)
        cls.driver.get(URL)


    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    '''
    Basic Webpage Loading Test
    '''
    # check that we start at the correct URL for the home page (or else every other test will fail)
    def test_1_home_page(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3]) # print the function at top of stack
        print("driver", self.driver.current_url)
        self.assertEqual(self.driver.current_url, URL)

    '''
    Navbar Tests
    '''
    def test_2_home_page_navbar(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3])
        # Tara's note: it seems like the webdriver is 1-indexed
        self.driver.find_element(by=By.XPATH, value="//*[@id=\"root\"]/div/nav/div/div/a[1]").click()
        assert self.driver.current_url == URL

    # get correct URL for about page from navbar
    def test_3_about_page_navbar(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3])
        self.driver.find_element(by=By.XPATH, value="//*[@id=\"root\"]/div/nav/div/div/a[2]").click()
        assert self.driver.current_url == URL + "about"
    
    def test_4_artworks_page_navbar(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3])
        self.driver.find_element(by=By.XPATH, value="//*[@id=\"root\"]/div/nav/div/div/a[3]").click()
        assert self.driver.current_url == URL + "artworks"
    
    def test_5_artists_page_navbar(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3])
        self.driver.find_element(by=By.XPATH, value="//*[@id=\"root\"]/div/nav/div/div/a[4]").click()
        assert self.driver.current_url == URL + "artists"

    def test_6_galleries_page_navbar(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3])
        self.driver.find_element(by=By.XPATH, value="//*[@id=\"root\"]/div/nav/div/div/a[5]").click()
        assert self.driver.current_url == URL + "galleries"
    
    '''
    Homepage Model Card Tests
    '''
    def test_7_artworks_page_home_card(self):
        self.driver.get(URL)
        assert self.driver.current_url == URL
        print("starting ", inspect.stack()[0][3])
        self.driver.find_element(by=By.ID, value="artworks-link").click()
        assert self.driver.current_url == URL + "artworks"

    def test_8_artists_page_home_card(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3])
        self.driver.find_element(by=By.ID, value="artists-link").click()
        assert self.driver.current_url == URL + "artists"

    def test_9_galleries_page_home_card(self):
        self.driver.get(URL)
        print("starting ", inspect.stack()[0][3])
        self.driver.find_element(by=By.ID, value="galleries-link").click()
        assert self.driver.current_url == URL + "galleries"

    '''
    Instance Card Tests
    '''
    def test_10_artworks_page_instance_cards(self):
        self.driver.get(URL + "artworks")
        assert self.driver.current_url == URL + "artworks"
        print("starting ", inspect.stack()[0][3])
        WebDriverWait(self.driver, 5).until(EC.element_to_be_clickable((By.CLASS_NAME, "card")))
        self.driver.find_element(by=By.CLASS_NAME, value="card")
        # just check to see there's at least 1 instance card

    def test_11_artists_page_instance_cards(self):
        self.driver.get(URL + "artists")
        assert self.driver.current_url == URL + "artists"
        print("starting ", inspect.stack()[0][3])
        WebDriverWait(self.driver, 5).until(EC.element_to_be_clickable((By.CLASS_NAME, "card")))
        self.driver.find_element(by=By.CLASS_NAME, value="card")

    def test_12_galleries_page_instance_cards(self):
        self.driver.get(URL + "galleries")
        assert self.driver.current_url == URL + "galleries"
        print("starting ", inspect.stack()[0][3])
        WebDriverWait(self.driver, 5).until(EC.element_to_be_clickable((By.CLASS_NAME, "card")))
        self.driver.find_element(by=By.CLASS_NAME, value="card")

if __name__ == "__main__":
    unittest.main()
