# From GeoJobs Fall 2022
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

URL = "localhost:3000"

class Test(unittest.TestCase):

  @classmethod
  def setUpClass(self) -> None:
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    self.driver.get(URL)

  @classmethod
  def tearDownClass(self):
    self.driver.quit()

  def test_galleries(self):
    self.driver.get(URL + "galleries")
    self.assertEqual(self.driver.current_url, URL + "galleries")
  
  def test_artists(self):
    self.driver.get(URL + "artists")
    self.assertEqual(self.driver.current_url, URL + "artists")

  def test_artworks(self):
    self.driver.get(URL + "artworks")
    self.assertEqual(self.driver.current_url, URL + "artworks")

if __name__ == '__main__':
    unittest.main()
