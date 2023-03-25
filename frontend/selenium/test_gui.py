# code adapted from City Scoop
import sys
import time
import pytest
import unittest
import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import Remote
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

URL = "https://www.galleryguide.me/"
PATH = "./chromedriver"

global driver, wait

class TestNavbar(unittest.TestCase):
    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        ops = Options()
        ops.add_argument("--headless")
        ops.add_argument("--disable-gpu")
        ops.add_argument("--window-size=1280,800")
        ops.add_argument("--allow-insecure-localhost")
        ops.add_argument("--log-level=3")
        ops.add_argument("--no-sandbox")
        ops.add_argument("--disable-dev-shm-usage")

        cls.driver = webdriver.Chrome(PATH, options=ops)
        cls.driver.get(URL)


    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    '''
    Basic Tests
    '''
    def test_1_home_page(self):
        # at home page
        print("starting test_navbar_home")
        print("driver", self.driver.current_url)
        self.assertEqual(self.driver.current_url, URL)
    

if __name__ == "__main__":
    unittest.main()
